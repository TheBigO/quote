<script setup>
definePageMeta({
	layout: 'summary',
});
const route = useRoute();

const { data: quote } = await useFetch(`/api/quote/${route.params.id}`);
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
				<QuoteOverview :quote="quote" />
				<QuoteTotal :quote="quote" class="mt-6" />
			</v-col>
			<v-col cols="12" md="4">
				<div class="d-flex flex-column">
					<QuoteCustomer :quote="quote" class="mb-6" />
					<QuoteSalesRep :quote="quote" />
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>
