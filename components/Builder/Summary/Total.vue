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
	<v-card flat class="d-flex flex-column rounded-lg pa-6">
		<div class="text-overline mb-3">Sales Quote Totals</div>
		<section
			v-if="storeBuilder.quote.contact"
			class="d-flex flex-column px-3 py-3"
		>
			<div class="d-flex justify-space-between mb-1">
				<div class="text-subtitle-2 text-grey-darken-2 mr-3">Shipping</div>
				<div class="text-body-2">Additional Fee</div>
			</div>
			<div class="d-flex justify-space-between mb-1">
				<div class="text-subtitle-2 text-grey-darken-2 mr-3">Taxes</div>
				<div class="text-body-2">Not Calculated</div>
			</div>
			<div class="d-flex justify-space-between">
				<div class="text-subtitle-2 text-grey-darken-2 mr-3">SubTotal</div>
				<div class="text-h5 font-weight-bold">
					{{ storeBuilder.getQuoteTotal }}
				</div>
			</div>
		</section>
		<div class="mt-4">
			<v-btn variant="tonal" block color="blue-darken-2" @click="sendQuote"
				>Send Quote</v-btn
			>
		</div>
	</v-card>
</template>
