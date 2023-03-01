<script setup>
import { useBuilderStore } from '@/store/builder';
const router = useRouter();
const storeBuilder = useBuilderStore();

async function viewBuildSummary() {
	storeBuilder.drawer = false;
	router.push({ path: '/builder/summary' });
}

function convertToCurrency(total) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	}).format(total);
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
				{{ storeBuilder.quote.contact.fullName }}
			</div>
			<div class="text-grey-darken-1">
				{{ storeBuilder.quote.contact.company }}
			</div>
			<div class="text-grey-darken-1">
				{{ storeBuilder.quote.contact.email }}
			</div>
		</section>
		<v-divider class="my-4" />
		<section v-if="storeBuilder.quote != 0">
			<div class="text-overline mb-8">Products For Quote</div>
			<div
				v-for="item in storeBuilder.quote.toughbooks"
				:key="item._id"
				class="d-flex flex-column"
			>
				<v-card flat class="mb-8">
					<div class="d-flex justify-space-between">
						<div class="d-flex align-center">
							<div class="d-flex">
								<div class="mr-3">
									<v-img :src="item.model.image" width="64px"></v-img>
								</div>
								<div class="d-flex flex-column">
									<div class="text-body-2 text-blue-darken-2">
										{{ item.model.sku }}
									</div>
									<div class="text-subtitle-2">
										{{ item.model.name }}
									</div>

									<div
										class="text-body-2 text-grey-darken-2"
										v-if="
											(item.model.cpu && item.model.cpu != 'None') ||
											(item.model.gps && item.model.gps != 'None') ||
											(item.model.ram && item.model.ram != 'None')
										"
									>
										<span v-if="item.model.cpu">{{ item.model.cpu }}</span> •
										<span v-if="item.model.gps">{{ item.model.gps }}</span> •
										<span v-if="item.model.ram">{{ item.model.ram }}</span>
									</div>
									<div
										v-if="item.model.screen && item.model.screen != 'None'"
										class="text-body-2 text-grey-darken-2"
									>
										{{ item.model.screen }}
									</div>
								</div>
							</div>
						</div>

						<div class="d-flex justify-end font-weight-bold">
							{{ convertToCurrency(item.model.price) }}
						</div>
					</div>
				</v-card>
			</div>
		</section>

		<section v-if="storeBuilder.quote.accessories != 0">
			<div
				v-for="item in storeBuilder.quote.accessories"
				:key="item._id"
				class="d-flex flex-column"
			>
				<v-card flat class="mb-8">
					<div class="d-flex justify-space-between">
						<div class="d-flex align-center">
							<div class="d-flex">
								<div class="mr-3">
									<v-img :src="item.model.image" width="64px"></v-img>
								</div>
								<div class="d-flex flex-column">
									<div class="text-body-2 text-blue-darken-2">
										{{ item.model.sku }}
									</div>
									<div class="text-subtitle-2">
										{{ item.model.name }}
									</div>
								</div>
							</div>
						</div>

						<div class="font-weight-bold">
							{{ convertToCurrency(item.model.price) }}
						</div>
					</div>
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
