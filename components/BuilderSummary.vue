<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();

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
	<v-container>
		<v-row class="d-flex flex-column justify-center align-center">
			<h1 class="text-h3 text-center mb-6">Sales Quote Summary</h1>
			<div>
				<v-btn
					variant="text"
					color="blue-darken-2"
					prepend-icon="mdi-plus"
					class="mx-2 mb-12"
					to="/builder"
				>
					Add More Products
				</v-btn>
			</div>
		</v-row>
		<v-row> </v-row>
		<v-row>
			<v-col cols="12" md="8">
				<v-card flat class="d-flex flex-column rounded-lg pa-6">
					<div class="d-flex justify-space-between px-3 mb-8">
						<div class="text-overline">Sales Quote Details</div>
						<div class="text-overline">
							Quote# {{ storeBuilder.quote.quoteNumber }}
						</div>
					</div>

					<section v-if="storeBuilder.quote != 0">
						<div
							v-for="item in storeBuilder.quote.toughbooks"
							:key="item.sku"
							class="d-flex flex-column"
						>
							<v-card flat class="mb-8">
								<div class="d-flex justify-space-between">
									<div class="d-flex align-center">
										<div class="mr-3">
											<v-btn
												size="x-small"
												icon="mdi-close"
												variant="tonal"
												color="blue-lighten-2"
												@click="storeBuilder.removeToughbookFromQuote(item._id)"
											></v-btn>
										</div>
										<div class="d-flex">
											<div class="mr-3">
												<v-img :src="item.image" width="72px"></v-img>
											</div>
											<div class="d-flex flex-column">
												<div class="text-body-2 text-blue-darken-2">
													{{ item.sku }}
												</div>
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
												<div
													v-if="item.screen"
													class="text-body-2 text-grey-darken-2"
												>
													{{ item.screen }}
												</div>
											</div>
										</div>
									</div>

									<div class="d-flex align-center font-weight-bold me-1">
										<div class="mr-5">{{ convertToCurrency(item.price) }}</div>

										<div class="d-flex align-center mr-4">
											<v-btn
												size="x-small"
												icon="mdi-minus"
												variant="tonal"
												color="blue-lighten-2"
												@click="storeBuilder.decreaseCount()"
											></v-btn>
											<div class="mx-3">{{ storeBuilder.quantity }}</div>
											<v-btn
												size="x-small"
												icon="mdi-plus"
												variant="tonal"
												color="blue-lighten-2"
												@click="storeBuilder.increaseCount()"
											></v-btn>
										</div>
									</div>
								</div>
							</v-card>
						</div>
					</section>

					<section v-if="storeBuilder.quote != 0">
						<div
							v-for="item in storeBuilder.quote.accessories"
							:key="item.sku"
							class="d-flex flex-column"
						>
							<v-card flat class="mb-8">
								<div class="d-flex justify-space-between">
									<div class="d-flex align-center">
										<div class="mr-3">
											<v-btn
												size="x-small"
												icon="mdi-close"
												variant="tonal"
												color="blue-lighten-2"
												@click="storeBuilder.removeAccessoryFromQuote(item._id)"
											></v-btn>
										</div>
										<div class="d-flex">
											<div class="mr-3">
												<v-img :src="item.image" width="72px"></v-img>
											</div>
											<div class="d-flex flex-column">
												<div class="text-body-2 text-blue-darken-2">
													{{ item.sku }}
												</div>
												<div class="text-subtitle-2">
													{{ item.name }}
												</div>
											</div>
										</div>
									</div>

									<div class="d-flex align-center font-weight-bold">
										<div class="mr-5">{{ convertToCurrency(item.price) }}</div>

										<div class="d-flex align-center mr-4">
											<v-btn
												size="x-small"
												icon="mdi-minus"
												variant="tonal"
												color="blue-lighten-2"
												@click="storeBuilder.decreaseCount()"
											></v-btn>
											<div class="mx-3">{{ storeBuilder.quantity }}</div>
											<v-btn
												size="x-small"
												icon="mdi-plus"
												variant="tonal"
												color="blue-lighten-2"
												@click="storeBuilder.increaseCount()"
											></v-btn>
										</div>
									</div>
								</div>
							</v-card>
						</div>
					</section>
				</v-card>
			</v-col>
			<v-col cols="12" md="4">
				<div class="d-flex flex-column">
					<SummaryDetails class="mb-6" />
					<SummaryTotal />
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
body {
	background-color: red;
}
</style>
