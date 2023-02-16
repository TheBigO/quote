<script setup>
import { useBuilderStore } from '@/store/builder';
const router = useRouter();

const storeBuilder = useBuilderStore();

function sendQuote() {
	storeBuilder.sendQuote();
	router.push({ path: '/' });
}
</script>

<template>
	<v-card flat class="d-flex flex-column rounded-lg pa-4">
		<div class="text-overline mb-3">Sales Quote Details</div>
		<section v-if="storeBuilder.quote.contact" class="d-flex flex-column py-3">
			<div class="d-flex">
				<div class="text-subtitle-2 text-grey-darken-2 mr-3">Shipping</div>
				<div>Not Included</div>
			</div>
			<div class="d-flex">
				<div class="text-subtitle-2 text-grey-darken-2 mr-3">Taxes</div>
				<div>Not Included</div>
			</div>
			<div class="d-flex">
				<div class="text-subtitle-2 text-grey-darken-2 mr-3">SubTotal</div>
				<div class="font-weight-bold">$5,000</div>
			</div>
		</section>
		<div class="mt-6">
			<v-btn variant="tonal" block color="blue-darken-2" @click="sendQuote"
				>Send Quote</v-btn
			>
		</div>
	</v-card>
</template>
