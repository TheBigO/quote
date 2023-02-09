<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();

// storeQuote.resetProduct();
</script>

<template>
	<h1 class="text-h3 text-center mb-6">All the essentials. And then some.</h1>
	<div class="d-flex justify-center mb-12">
		<v-btn
			variant="tonal"
			color="grey"
			prepend-icon="mdi-chevron-left"
			class="mx-2"
			to="/"
		>
			Add Another Product
		</v-btn>
		<v-btn
			variant="tonal"
			color="blue"
			prepend-icon="mdi-file-sign"
			class="mx-2"
			to="/builder/summary"
		>
			View Quote Summary
		</v-btn>
	</div>
	<section v-if="storeBuilder.toughbook.accessories">
		<div class="text-overline my-6">
			Accessories that are compatible with your
			{{ storeBuilder.toughbook.name }}
		</div>

		<div class="d-flex align-stretch flex-wrap">
			<div
				v-for="accessory in storeBuilder.toughbook.accessories"
				:key="accessory._id"
			>
				<v-card
					width="360px"
					min-height="500"
					flat
					class="d-flex flex-column align-center justify-space-between bg-grey-lighten-5 rounded-xl pa-12 ma-3"
				>
					<div class="d-flex align-center flex-column">
						<div><v-img :src="accessory.image" width="180px" /></div>
						<h3 class="text-center">{{ accessory.name }}</h3>
						<div class="text-subtitle-1 mb-3 text-center text-blue-darken-2">
							${{ accessory.price }}
						</div>
						<div>
							<span class="text-body-2 text-grey">{{
								accessory.description
							}}</span>
						</div>
					</div>

					<div>
						<v-btn
							variant="tonal"
							color="blue-darken-2"
							@click="storeBuilder.addAccessory(accessory)"
							>Add to quote</v-btn
						>
					</div>
				</v-card>
			</div>
		</div>
	</section>
	<section v-else>
		<div class="text-overline my-6">
			There are no accessories that are compatible with this model
		</div>
	</section>
</template>
