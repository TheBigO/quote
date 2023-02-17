<script setup>
import { useBuilderStore } from '@/store/builder';
const storeBuilder = useBuilderStore();
const router = useRouter();

storeBuilder.resetProducts();
storeBuilder.fetchProducts();
// storeBuilder.fetchSalesReps();

function createQuote() {
	storeBuilder.createNewQuote();
	router.push({ path: '/builder' });
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
							label="FirstName"
							hide-details="true"
							required
							:rules="[(v) => !!v || 'A first name is required']"
						></v-text-field
					></v-col>
					<v-col>
						<v-text-field
							v-model="storeBuilder.contact.lastName"
							label="Last Name"
							hide-details="true"
							required
							:rules="[(v) => !!v || 'A last name is required']"
						></v-text-field
					></v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model="storeBuilder.contact.company"
							label="Company"
							hide-details="true"
							required
							:rules="[(v) => !!v || 'A company is required']"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model="storeBuilder.contact.email"
							label="Email"
							hide-details="true"
							required
							:rules="[(v) => !!v || 'An email is required']"
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
