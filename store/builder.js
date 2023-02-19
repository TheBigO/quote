export const useBuilderStore = defineStore('builder', {
	state: () => ({
		products: [],
		product: {},
		toughbooks: [],
		toughbook: {},
		quotes: [],
		quote: {},
		accessories: [],
		productTotal: {
			base: 0,
			cpu: 0,
			gps: 0,
			screen: 0,
			ram: 0,
		},
		customer: {},
		quantity: 1,

		cart: [],
		cartTotal: 0,
		salesReps: [],
		drawer: false,
		contact: {
			firstName: '',
			lastName: '',
			company: '',
			email: '',
			salesRep: '',
		},
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
		async fetchQuotes() {
			this.quotes = await $fetch('/api/quote');
		},
		updateModel(o, v) {
			console.log(v.name);
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
		increaseCount() {
			this.quantity++;
		},
		decreaseCount() {
			this.quantity--;
		},
		async addToQuote() {
			this.drawer = true;
			this.toughbook = await $fetch(`/api/toughbook/${this.toughbook._id}`);

			const totalPrice =
				this.productTotal.base +
				this.productTotal.cpu +
				this.productTotal.gps +
				this.productTotal.screen;

			this.toughbook.price = totalPrice * this.quantity;

			this.toughbook = await $fetch(
				`/api/toughbook/${this.toughbook._id}/update`,
				{
					method: 'PUT',
					body: this.toughbook,
				}
			);

			this.quote = await $fetch(`/api/quote/${this.quote._id}/update`, {
				method: 'PATCH',
				body: this.toughbook._id,
			});

			// this.cart.push(this.toughbook);
		},

		async addAccessory(accessory) {
			this.quote = await $fetch(
				`/api/quote/${this.quote._id}/accessory/update`,
				{
					method: 'PATCH',
					body: accessory._id,
				}
			);
		},

		async updateQuote() {
			this.quote = await $fetch(
				`/api/quote/${this.quote._id}/toughbook/update`,
				{
					method: 'PATCH',
					body: this.quote,
				}
			);
		},

		/// Quote - Add Toughbook, Update QTY and Remove

		async addToughbookToQuote() {
			this.drawer = true;
			this.quote = await $fetch(`/api/quote/${this.quote._id}/toughbook/add`, {
				method: 'PATCH',
				body: { quote: this.quote, toughbook: this.toughbook },
			});
		},

		async updateToughbookQuantity(item) {
			this.quote.quoteTotal += item.model.price * item.qty;

			this.quote = await $fetch(
				`/api/quote/${this.quote._id}/toughbook/quantity`,
				{
					method: 'PATCH',
					body: this.quote,
				}
			);
		},

		async removeToughbookFromQuote(item) {
			this.quote.quoteTotal -= item.model.price * item.qty;

			this.quote = await $fetch(
				`/api/quote/${this.quote._id}/toughbook/remove`,
				{
					method: 'PATCH',
					body: { total: this.quote.quoteTotal, toughbook: item },
				}
			);

			this.fetchQuote();
		},

		/// Quote - Add Accessory, Update QTY and Remove

		async addAccessoryToQuote(accessory) {
			this.quote = await $fetch(`/api/quote/${this.quote._id}/accessory/add`, {
				method: 'PATCH',
				body: { quote: this.quote, accessory: accessory },
			});

			this.fetchQuote();
		},

		async updateAccessoryQuantity(item) {
			const productTotal = item.model.price * item.qty;

			this.quote.quoteTotal += productTotal;

			this.quote = await $fetch(
				`/api/quote/${this.quote._id}/accessory/quantity`,
				{
					method: 'PATCH',
					body: this.quote,
				}
			);

			this.fetchQuote();
		},

		async removeAccessoryFromQuote(id) {
			this.quote = await $fetch(
				`/api/quote/${this.quote._id}/accessory/remove`,
				{
					method: 'PATCH',
					body: id,
				}
			);
		},
		async resetProducts() {
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
			this.quantity = 1;
			this.drawer = false;
		},

		async createNewQuote() {
			this.quote = await $fetch('/api/quote/create', {
				method: 'POST',
				body: this.contact,
			});
		},

		async fetchQuote() {
			this.quote = await $fetch(`/api/quote/${this.quote._id}`);
		},

		async saveQuote(contact) {
			this.customer = await $fetch('/api/quote/create', {
				method: 'POST',
				body: contact,
			});

			// await $fetch(
			// 	'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
			// 	{
			// 		method: 'POST',
			// 		lead: {
			// 			firstName: 'Rachel',
			// 			lastName: 'Adams',
			// 			phone: '012-345-6789',
			// 			email: 'rachel.adams@jpmc.com',
			// 			company: 'Salesforce',
			// 		},
			// 	}
			// );
		},

		async fetchSalesReps() {
			this.salesReps = await $fetch('/api/employees');
		},

		async sendQuote() {
			this.message = await $fetch(`/api/quote/${this.quote._id}/send`, {
				method: 'POST',
				body: this.quote,
			});

			console.log(this.message);
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
