<script setup>
import { useBuilderStore } from '@/store/builder';
const storeBuilder = useBuilderStore();
const router = useRouter();

storeBuilder.fetchProducts();

async function buildProduct(productID) {
	await storeBuilder.fetchProduct(productID);
	router.push({ path: '/builder/options' });
}
</script>

<style scoped>
.short-description ul li {
	list-style: none;
	padding-bottom: 10px;
}
</style>

<template>
	<h1 class="text-h3 text-center mb-12">Choose your TOUGHBOOK</h1>
	<v-row>
		<v-col
			cols="12"
			md="3"
			v-for="product in storeBuilder.products"
			:key="product._id"
		>
			<v-card
				flat
				class="d-flex flex-column bg-grey-lighten-4 rounded-xl pa-12"
			>
				<img :src="product.image" />
				<h2 class="text-center mb-2">{{ product.name }}</h2>
				<div
					class="text-body-2 mb-6 short-description"
					v-html="product.description"
				></div>
				<div class="d-flex align-center justify-center mb-4">
					<span class="text-body-2 text-grey mr-2">starting</span><sup>$</sup
					><span class="text-h4">{{ product.basePrice }}</span>
				</div>
				<div class="text-center">
					<v-btn
						flat
						block
						color="blue-darken-4"
						class="mb-3"
						@click="buildProduct(product._id)"
						>Select</v-btn
					>
				</div>
			</v-card>
			<div v-for="tb in product.options">
				<div>{{ tb.name }}</div>
			</div>
		</v-col>
	</v-row>
</template>
