export const useBuilderStore = defineStore('builder', {
	state: () => ({
		products: [],
		product: {},
		toughbooks: [],
		toughbook: {},
		accessories: [],
		productTotal: {
			base: 0,
			cpu: 0,
			gps: 0,
			screen: 0,
			ram: 0,
		},
		cart: [],
		drawer: false,
		contact: {
			firstName: '',
			lastName: '',
			company: '',
			email: '',
			salesRep: '',
		},
		customer: {},
		salesReps: [],
		quotes: [],
		quote: {},
		message: null,
	}),
	actions: {
		async fetchProducts() {
			this.products = await $fetch('/api/product');
		},
		async fetchProduct(productID) {
			this.product = await $fetch(`/api/product/${productID}`);
			this.toughbook = this.product.toughbooks[0];
			this.productTotal.base = this.product.basePrice;
		},

		async fetchToughbooks() {
			this.toughbooks = await $fetch('/api/toughbook');
		},
		async fetchToughbook() {
			const name = this.toughbook.name;
			const cpu = this.toughbook.cpu;
			const gps = this.toughbook.gps;
			const screen = this.toughbook.screen;
			const ram = this.toughbook.ram;

			this.toughbook = await $fetch(
				`/api/toughbook/query?name=${name}&cpu=${cpu}&gps=${gps}&screen=${screen}&ram=${ram}`
			);
		},

		async fetchAccessories() {
			this.accessories = await $fetch('/api/accessory');
		},

		async fetchSalesReps() {
			this.salesReps = await $fetch('/api/employees');
		},

		async fetchQuotes() {
			this.quotes = await $fetch('/api/quote');
		},
		async fetchQuote() {
			this.quote = await $fetch(`/api/quote/${this.quote._id}`);
		},

		updateModel(o, v) {
			if (o === 'CPU') {
				this.toughbook.cpu = v.name;
				this.productTotal.cpu = v.price;
				this.fetchToughbook();
			}

			if (o === 'Screen') {
				this.toughbook.screen = v.name;
				this.productTotal.screen = v.price;
				this.fetchToughbook();
			}

			if (o === '4G LTE/GPS') {
				this.toughbook.gps = v.name;
				this.productTotal.gps = v.price;
				this.fetchToughbook();
			}

			if (o === 'RAM') {
				this.toughbook.ram = v.name;
				this.productTotal.ram = v.price;
				this.fetchToughbook();
			}
		},

		async updateQuantity(item) {
			const newTotal = item.model.price * item.qty;
			this.quote.quoteTotal += newTotal - item.total;

			item.total = newTotal;

			console.log('updated');
		},

		async addToughbookToQuote() {
			this.drawer = true;
			this.quote = await $fetch(`/api/quote/${this.quote._id}/toughbook/add`, {
				method: 'PATCH',
				body: { quote: this.quote, toughbook: this.toughbook },
			});
		},
		async removeToughbookFromQuote(item) {
			this.quote.quoteTotal -= item.total;

			this.quote = await $fetch(
				`/api/quote/${this.quote._id}/toughbook/remove`,
				{
					method: 'PATCH',
					body: { total: this.quote.quoteTotal, toughbook: item },
				}
			);

			this.fetchQuote();
		},

		async addAccessoryToQuote(accessory) {
			this.quote = await $fetch(`/api/quote/${this.quote._id}/accessory/add`, {
				method: 'PATCH',
				body: { quote: this.quote, accessory: accessory },
			});

			this.fetchQuote();
		},
		async removeAccessoryFromQuote(item) {
			this.quote.quoteTotal -= item.total;

			this.quote = await $fetch(
				`/api/quote/${this.quote._id}/accessory/remove`,
				{
					method: 'PATCH',
					body: { total: this.quote.quoteTotal, accessory: item },
				}
			);

			this.fetchQuote();
		},

		async createNewQuote() {
			this.quote = await $fetch('/api/quote/create', {
				method: 'POST',
				body: this.contact,
			});

			/// then send to Salesforce and create a lead

			const sfURL =
				'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';

			const formData = {
				formFieldsList: {
					formFields: [
						{ name: 'oid', value: '00D5e000002FKJk' },
						{ name: 'lead_source', value: 'QuoteApp' },
						{
							name: 'first_name',
							value: 'Walter',
						},
						{
							name: 'last_name',
							value: 'White',
						},
						{
							name: 'email',
							value: 'walter@test.com',
						},
						{
							name: 'company',
							value: 'RSA',
						},
					],
				},
			};

			await $fetch(sfURL, {
				method: 'POST',
				mode: 'cors',
				data: formData,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(formData),
			});
		},

		async updateQuote() {
			this.quote = await $fetch(`/api/quote/${this.quote._id}/update`, {
				method: 'PATCH',
				body: this.quote,
			});

			this.fetchQuote();
		},

		async sendQuote() {
			this.message = await $fetch(`/api/quote/${this.quote._id}/send`, {
				method: 'POST',
				body: this.quote,
			});

			console.log(this.message);
		},

		async resetQuote() {
			this.product = {};
			this.customer = {};
			this.contact = {};
			this.toughbooks = [];
			this.toughbook = {};
			this.quote = {};
			this.cart = [];
			this.productTotal = {
				base: 0,
				cpu: 0,
				gps: 0,
				screen: 0,
				ram: 0,
			};
			this.drawer = false;
		},
	},

	getters: {
		getProductTotal() {
			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				maximumFractionDigits: 0,
				minimumFractionDigits: 0,
			}).format(this.toughbook.price);
		},

		getQuoteTotal() {
			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				maximumFractionDigits: 0,
				minimumFractionDigits: 0,
			}).format(this.quote.quoteTotal);
		},

		getQuote(state) {
			state.quote;
		},
	},
});
