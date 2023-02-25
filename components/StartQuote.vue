<script setup>
import { useBuilderStore } from '@/store/builder';
const storeBuilder = useBuilderStore();
const router = useRouter();

storeBuilder.resetQuote();
storeBuilder.fetchProducts();
// storeBuilder.fetchSalesReps();

const rules = {
	required: (value) => !!value || 'Required.',
	email: (value) => {
		const pattern =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return pattern.test(value) || 'Invalid e-mail.';
	},
};

function createQuote() {
	const required = {
		firstName: storeBuilder.contact.firstName,
		laststName: storeBuilder.contact.lastName,
		company: storeBuilder.contact.company,
		email: storeBuilder.contact.email,
	};

	const complete = Object.values(required).every((value) => value);

	if (complete) {
		storeBuilder.createNewQuote();
		router.push({ path: '/builder' });
	}
}
</script>

<template>
	<div>
		<h1 class="text-h3 text-center mb-6">Sales Quote</h1>
		<div class="d-flex justify-center align-center">
			<v-card
				flat
				class="d-flex flex-column rounded-lg px-8 py-10"
				width="480px"
			>
				<div class="text-overline mb-3">Customer Information</div>
				<v-row>
					<v-col>
						<v-text-field
							v-model="storeBuilder.contact.firstName"
							type="text"
							label="FirstName"
							hide-details="true"
							required
							:rules="[rules.required]"
						></v-text-field
					></v-col>
					<v-col>
						<v-text-field
							v-model="storeBuilder.contact.lastName"
							type="text"
							label="Last Name"
							hide-details="true"
							required
							:rules="[rules.required]"
						></v-text-field
					></v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model="storeBuilder.contact.company"
							type="text"
							label="Company"
							hide-details="true"
							required
							:rules="[rules.required]"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model="storeBuilder.contact.email"
							type="email"
							label="Email"
							hide-details="true"
							required
							:rules="[rules.required, rules.email]"
						></v-text-field> </v-col
				></v-row>
				<!-- <v-row>
					<v-col>
						<v-select
							v-model="storeBuilder.contact.salesRep"
							label="Account Manager"
							:items="storeBuilder.salesReps"
							item-title="fullName"
							item-value="_id"
							hide-details="true"
						></v-select></v-col
				></v-row> -->
				<v-row>
					<v-col>
						<v-btn
							block
							size="large"
							variant="tonal"
							color="blue-darken-1"
							@click="createQuote"
							>Start Quote</v-btn
						></v-col
					>
				</v-row>
			</v-card>
		</div>
		<!-- <section>
			<form
				action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
				method="POST"
			>
				<input type="hidden" name="oid" value="00D5e000002FKJk" />
				<input
					type="hidden"
					id="lead_source"
					name="lead_source"
					value="Quote App"
				/>
				<div class="input-container">
					<input
						name="first_name"
						type="hidden"
						:value="storeBuilder.contact.firstName"
					/>
					<input
						id="last_name"
						name="last_name"
						type="hidden"
						:value="storeBuilder.contact.lastName"
					/><br />

					<input
						id="email"
						name="email"
						type="hidden"
						:value="storeBuilder.contact.email"
					/><br />

					<input
						id="company"
						name="company"
						type="hidden"
						:value="storeBuilder.contact.company"
					/>
				</div>
				<div class="my-2">
					<input type="submit" name="submit" value="GET A QUOTE" />
				</div>
			</form>
		</section> -->
	</div>
</template>
