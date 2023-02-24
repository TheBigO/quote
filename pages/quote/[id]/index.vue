<script setup>
definePageMeta({
	layout: 'summary',
});
const route = useRoute();

const { data: quote } = await useFetch(`/api/quote/${route.params.id}`);

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
		<v-row class="d-flex flex-column justify-center align-center mb-6">
			<h1 class="text-h3 text-center">Sales Quote</h1>
			<div class="text-overline text-center">
				Quote# {{ quote.quoteNumber }}
			</div>
		</v-row>
		<v-row>
			<v-col cols="12" md="8">
				<v-card flat class="d-flex flex-column rounded-lg pa-6">
					<section v-if="quote != 0">
						<div
							v-for="item in quote.toughbooks"
							:key="item._id"
							class="d-flex flex-column"
						>
							<v-card flat class="mb-2 pa-3">
								<div class="d-flex justify-space-between align-center">
									<div class="d-flex align-center">
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

										<div>{{ item.qty }}</div>
									</div>
								</div>
							</v-card>
						</div>
					</section>

					<section v-if="quote != 0">
						<div
							v-for="item in quote.accessories"
							:key="item._id"
							class="d-flex flex-column"
						>
							<v-card flat class="mb-2 pa-3">
								<div class="d-flex justify-space-between align-center">
									<div class="d-flex align-center">
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

										<div>{{ item.qty }}</div>
									</div>
								</div>
							</v-card>
						</div>
					</section>
				</v-card>
				<QuoteTotal :quote="quote" class="mt-6" />
			</v-col>
			<v-col cols="12" md="4">
				<div class="d-flex flex-column">
					<QuoteCustomer :quote="quote" class="mb-6" />
					<QuoteSalesPerson :quote="quote" />
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>
