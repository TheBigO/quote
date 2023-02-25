<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();

const hovered = ref(null);

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
							:key="item._id"
							class="d-flex flex-column"
						>
							<v-card
								flat
								class="mb-2 pa-3"
								@mouseover="hovered = item._id"
								@mouseleave="hovered = null"
								:class="hovered === item._id ? 'bg-grey-lighten-5' : ''"
							>
								<div class="d-flex justify-space-between align-center">
									<div class="d-flex align-center">
										<div
											v-if="hovered === item._id"
											class="mr-3"
											style="width: 40px"
										>
											<v-btn
												size="x-small"
												icon="mdi-close"
												variant="tonal"
												color="blue-lighten-2"
												@click="storeBuilder.removeToughbookFromQuote(item)"
											></v-btn>
										</div>
										<div v-else class="mr-3" style="width: 40px"></div>
										<div class="d-flex">
											<div class="mr-3">
												<v-img :src="item.model.image" width="72px"></v-img>
											</div>
											<div class="d-flex flex-column">
												<div class="text-body-2 text-blue-darken-2">
													{{ item.model.sku }}
												</div>
												<div class="text-subtitle-1">
													{{ item.model.device }}
												</div>

												<div
													class="text-body-2 text-grey-darken-2"
													v-if="
														item.model.cpu ||
														item.model.gps ||
														item.model.screen
													"
												>
													<span v-if="item.model.cpu">{{
														item.model.cpu
													}}</span>
													•
													<span v-if="item.model.gps">{{
														item.model.gps
													}}</span>
													•
													<span v-if="item.model.ram">{{
														item.model.ram
													}}</span>
												</div>
												<div
													v-if="item.screen"
													class="text-body-2 text-grey-darken-2"
												>
													{{ item.model.screen }}
												</div>
											</div>
										</div>
									</div>

									<div class="d-flex align-end font-weight-bold">
										<div class="mr-12">
											{{ convertToCurrency(item.model.price) }}
										</div>

										<div style="max-width: 50px">
											<v-text-field
												v-model="item.qty"
												type="number"
												variant="underlined"
												label="Qty"
												hide-details="true"
												required
												:rules="[(v) => !!v || 'A first name is required']"
												min="1"
												@change="storeBuilder.updateQuantity(item)"
											></v-text-field>
										</div>
									</div>
								</div>
							</v-card>
						</div>
					</section>

					<section v-if="storeBuilder.quote != 0">
						<div
							v-for="item in storeBuilder.quote.accessories"
							:key="item._id"
							class="d-flex flex-column"
						>
							<v-card
								flat
								class="mb-2 pa-3"
								@mouseover="hovered = item._id"
								@mouseleave="hovered = null"
								:class="hovered === item._id ? 'bg-grey-lighten-5' : ''"
							>
								<div class="d-flex justify-space-between align-center">
									<div class="d-flex align-center">
										<div
											v-if="hovered === item._id"
											class="mr-3"
											style="width: 40px"
										>
											<v-btn
												size="x-small"
												icon="mdi-close"
												variant="tonal"
												color="blue-lighten-2"
												@click="storeBuilder.removeAccessoryFromQuote(item)"
											></v-btn>
										</div>
										<div v-else class="mr-3" style="width: 40px"></div>
										<div class="d-flex">
											<div class="mr-3">
												<v-img :src="item.model.image" width="72px"></v-img>
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

									<div class="d-flex align-end font-weight-bold">
										<div class="mr-12">
											{{ convertToCurrency(item.model.price) }}
										</div>

										<div style="max-width: 50px">
											<v-text-field
												v-model="item.qty"
												type="number"
												variant="underlined"
												label="Qty"
												hide-details="true"
												required
												:rules="[(v) => !!v || 'A first name is required']"
												min="1"
												@change="storeBuilder.updateQuantity(item)"
											></v-text-field>
										</div>
									</div>
								</div>
							</v-card>
						</div>
					</section>
					<!-- <section class="d-flex justify-end mt-12">
						<div>
							<v-btn
								variant="tonal"
								color="blue-lighten-2"
								@click="storeBuilder.updateQuote"
								>Update Quote</v-btn
							>
						</div>
					</section> -->
				</v-card>
			</v-col>
			<v-col cols="12" md="4">
				<div class="d-flex flex-column">
					<SummaryDetails class="mb-6" />
					<SummarySalesRep class="mb-6" />
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
