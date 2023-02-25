<script setup>
const props = defineProps(['quote']);

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
	<div>
		<v-card flat class="d-flex flex-column rounded-lg pa-6">
			<section v-if="quote.quoteTotal" class="d-flex justify-end px-3 py-3">
				<div class="mr-6">
					<div class="text-subtitle-2 text-grey-darken-2 mr-3 text-right">
						Shipping
					</div>
					<div class="text-subtitle-2 text-grey-darken-2 mr-3 text-right">
						Taxes
					</div>
					<div class="text-subtitle-2 text-grey-darken-2 mr-3 text-right">
						SubTotal
					</div>
				</div>
				<div>
					<div class="text-body-2">Additional Fee</div>
					<div class="text-body-2">Not Calculated</div>
					<div class="text-h5 font-weight-bold">
						{{ convertToCurrency(quote.quoteTotal) }}
					</div>
				</div>
			</section>
		</v-card>
	</div>
</template>
