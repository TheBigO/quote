<script setup>
import { useBuilderStore } from '@/store/builder';
const router = useRouter();

const contact = ref({
	firstName: '',
	lastName: '',
	company: '',
	email: '',
	products: [],
});

const storeBuilder = useBuilderStore();

async function viewBuildSummary() {
	storeBuilder.drawer = false;
	router.push({ path: '/builder/summary' });
}
</script>

<template>
	<v-navigation-drawer
		v-model="storeBuilder.drawer"
		location="right"
		width="400"
		class="pa-6"
	>
		<div class="text-overline mb-3">Customer Information</div>
		<section v-if="storeBuilder.quote.contact" class="d-flex flex-column py-3">
			<div class="font-weight-bold">
				<span>{{ storeBuilder.quote.contact.firstName }}</span>
				<span>{{ storeBuilder.quote.contact.lastName }}</span>
			</div>
			<div class="text-grey-darken-1">
				{{ storeBuilder.quote.contact.company }}
			</div>
			<div class="text-grey-darken-1">
				{{ storeBuilder.quote.contact.email }}
			</div>
		</section>
		<!-- <section v-else class="py-3">
			<v-row>
				<v-col>
					<v-text-field
						v-model="contact.firstName"
						label="FirstName"
						hide-details="true"
						required
						:rules="[(v) => !!v || 'A first name is required']"
					></v-text-field
				></v-col>
				<v-col>
					<v-text-field
						v-model="contact.lastName"
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
						v-model="contact.company"
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
						v-model="contact.email"
						label="Email"
						hide-details="true"
						required
						:rules="[(v) => !!v || 'An email is required']"
					></v-text-field> </v-col
			></v-row>
			<div class="d-flex justify-end mt-5">
				<v-btn
					variant="tonal"
					color="blue-darken-1"
					@click="storeBuilder.saveQuote(contact)"
					>Save</v-btn
				>
			</div>
		</section> -->
		<v-divider class="my-4" />
		<section v-if="storeBuilder.quote != 0">
			<div class="text-overline mb-8">Products For Quote</div>
			<div
				v-for="item in storeBuilder.quote.toughbooks"
				:key="item.sku"
				class="d-flex flex-column"
			>
				<v-card flat width="400px" class="d-flex justify-space-between mb-8">
					<div class="d-flex align-center">
						<div class="d-flex">
							<div class="mr-3">
								<v-img :src="item.image" width="64px"></v-img>
							</div>
							<div class="d-flex flex-column">
								<div class="text-body-2 text-blue-darken-2">{{ item.sku }}</div>
								<div class="text-subtitle-1">
									{{ item.device }}
								</div>

								<div
									class="text-body-2 text-grey-darken-2"
									v-if="item.cpu || item.gps || item.screen"
								>
									<span v-if="item.cpu">{{ item.cpu }}</span> •
									<span v-if="item.gps">{{ item.gps }}</span> •
									<span v-if="item.ram">{{ item.ram }}</span>
								</div>
								<div v-if="item.screen" class="text-body-2 text-grey-darken-2">
									{{ item.screen }}
								</div>
							</div>
						</div>
					</div>

					<div class="d-flex justify-end font-weight-bold">
						${{ item.price }}
					</div>
				</v-card>
			</div>
		</section>

		<section v-if="storeBuilder.quote.accessories != 0">
			<div
				v-for="item in storeBuilder.quote.accessories"
				:key="item.sku"
				class="d-flex flex-column"
			>
				<v-card flat width="100%" class="d-flex justify-space-between mb-8">
					<div class="d-flex align-center">
						<div class="d-flex">
							<div class="mr-3">
								<v-img :src="item.image" width="64px"></v-img>
							</div>
							<div class="d-flex flex-column">
								<div class="text-body-2 text-blue-darken-2">{{ item.sku }}</div>
								<div class="text-subtitle-2">
									{{ item.name }}
								</div>
							</div>
						</div>
					</div>

					<div class="font-weight-bold">${{ item.price }}</div>
				</v-card>
			</div>
		</section>

		<v-footer v-if="storeBuilder.quote != 0" app style="width: 100%">
			<v-container class="d-flex justify-center align-center">
				<v-btn
					variant="tonal"
					color="blue"
					prepend-icon="mdi-file-sign"
					@click="viewBuildSummary"
				>
					View Quote Summary
				</v-btn></v-container
			>
		</v-footer>
	</v-navigation-drawer>
</template>
