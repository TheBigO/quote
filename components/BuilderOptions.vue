<script setup>
import { useBuilderStore } from '@/store/builder';
const router = useRouter();

const storeBuilder = useBuilderStore();

const dialog = ref(false);

function addProductToQuote() {
	storeBuilder.addToQuote();
	router.push({ path: '/builder/accessories' });
}
</script>

<template>
	<div>
		<v-row>
			<v-col>
				<div>
					<v-btn
						variant="text"
						color="blue-darken-2"
						prepend-icon="mdi-chevron-left"
						to="/builder"
					>
						Add Another Product
					</v-btn>
				</div>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" md="7" class="d-flex flex-column justify-start">
				<div>
					<v-card flat class="bg-grey-lighten-4 rounded-xl pa-16">
						<v-img :src="storeBuilder.product.image" />
					</v-card>
				</div>

				<div class="px-16 mt-12 short-description">
					<div v-html="storeBuilder.product.extendedDescription"></div>
				</div>
			</v-col>
			<v-col cols="12" md="5" class="d-flex flex-column pa-6">
				<div class="text-h4 font-weight-bold">
					{{ storeBuilder.product.name }}
				</div>
				<div class="d-flex align-center mt-2 pointer">
					<img style="width: 16px" src="/images/pdf_icon.png" />

					<div class="text-caption text-grey-darken-3 font-weight-bold ml-2">
						<a
							:href="storeBuilder.product.specSheet"
							target="_blank"
							class="text-decoration-none text-overline text-grey-darken-3 font-weight-bold"
							>View {{ storeBuilder.product.name }} Specifications</a
						>
					</div>
				</div>
				<v-divider class="mt-4 mb-6"></v-divider>

				<div class="d-flex flex-column">
					<div
						v-for="(option, index) in storeBuilder.product.options"
						:key="option._id"
					>
						<section class="d-flex flex-column">
							<div class="text-subtitle-1 font-weight-bold">
								{{ option.name }}
							</div>
							<div class="pointer">
								<span class="text-blue-darken-4 text-subtitle-2"
									>{{ option.tooltipQuestion }}

									<v-dialog activator="parent">
										<v-container
											fluid
											class="d-flex justify-center align-center"
										>
											<v-card width="420px" class="py-4 px-6">
												<v-card-text>
													<h3>{{ option.tooltipTitle }}</h3>
													<div v-html="option.tooltipContent"></div>
												</v-card-text>
											</v-card>
										</v-container>
									</v-dialog>
								</span>
							</div>

							<div class="d-flex">
								<div
									v-for="variation in option.variations"
									:key="variation._id"
									class="card-pointer"
								>
									<v-card
										width="200px"
										height="72px"
										variant="outlined"
										color="blue-darken-2"
										@click.stop="
											storeBuilder.updateModel(option.name, variation)
										"
										class="d-flex flex-column justify-center align-center ma-2 rounded-lg py-3"
										:class="[
											storeBuilder.toughbook.cpu === variation.name
												? 'active-card-bg'
												: '',
											storeBuilder.toughbook.gps === variation.name
												? 'active-card-bg'
												: '',
											storeBuilder.toughbook.screen === variation.name
												? 'active-card-bg'
												: '',
											storeBuilder.toughbook.ram === variation.name
												? 'active-card-bg'
												: '',
										]"
										><div
											class="text-subtitle-1 font-weight-bold text-grey-darken-3"
										>
											{{ variation.name }}
											<span
												v-if="variation.price"
												class="text-body-2 text-grey-darken-3 ml-1"
												>+ ${{ variation.price }}</span
											>
										</div>
									</v-card>
								</div>
							</div>

							<v-divider class="my-6" />
						</section>
					</div>
				</div>
				<section>
					<v-card
						flat
						class="d-flex flex-column bg-grey-lighten-5 rounded-xl pa-12"
					>
						<div class="text-overline mb-3">Product Details</div>
						<div class="d-flex align-end">
							<div class="text-body-2 text-grey-darken-2 mr-3">Total</div>
							<div class="text-h4 font-weight-bold mr-3">
								{{ storeBuilder.getProductTotal }}
							</div>
							<div>
								<v-chip
									v-if="storeBuilder.toughbook.inventory === true"
									color="green"
									label
									>In Stock</v-chip
								>
							</div>
						</div>
						<div class="d-flex mb-6">
							<div class="text-body-2 text-grey-darken-2 mr-5">SKU</div>
							<div class="text-body-2 text-grey-darken-2">
								{{ storeBuilder.toughbook.sku }}
							</div>
						</div>
						<div v-if="storeBuilder.toughbook.sku != '---'">
							<v-btn
								variant="tonal"
								block
								color="blue-darken-2"
								@click="addProductToQuote"
								>Add To Quote</v-btn
							>
						</div>

						<div class="d-flex mt-5">
							<v-icon color="grey-darken-3" class="mr-3"
								>mdi-truck-outline</v-icon
							><span
								v-if="storeBuilder.toughbook.inventory === true"
								class="text-body-2"
								>In Stock & Shipping</span
							><span v-else class="text-body-2"
								>This item is not in stock, delivery times very</span
							>
						</div>
					</v-card>
				</section>
			</v-col>
		</v-row>
	</div>
</template>

<style scoped>
.pointer :hover {
	cursor: pointer;
}

.card-pointer :hover {
	cursor: pointer;
	background-color: #f4f4f4;
}

.short-description ul li {
	padding-bottom: 10px;
}

.active-card-bg {
	background-color: rgb(242, 248, 255);
}
</style>
