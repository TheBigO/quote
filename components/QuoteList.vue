<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();
storeBuilder.fetchQuotes();

const hovered = ref(null);

function convertShortDate(date) {
	return new Date(date).toLocaleDateString('en-us', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

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
	<v-table>
		<thead>
			<tr>
				<th></th>
				<th class="text-left">Quote</th>
				<th class="text-left">Contact</th>
				<th class="text-left">Date</th>
				<th class="text-left">Total</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="quote in storeBuilder.quotes"
				:key="quote._id"
				@mouseover="hovered = quote._id"
				@mouseleave="hovered = null"
				:class="hovered === quote._id ? 'bg-grey-lighten-5' : ''"
			>
				<td style="width: 80px">
					<div v-if="hovered === quote._id">
						<v-btn
							variant="plain"
							icon="mdi-text-box-multiple-outline"
							:to="`/quote/${quote._id}`"
						></v-btn>
					</div>
					<div v-else></div>
				</td>

				<td class="text-left">QA-{{ quote.quoteNumber }}</td>
				<td class="text-left">
					{{ quote.contact.firstName }} {{ quote.contact.lastName }}
				</td>
				<td class="text-left">{{ convertShortDate(quote.createdAt) }}</td>
				<td class="text-left">{{ convertToCurrency(quote.quoteTotal) }}</td>
			</tr>
		</tbody>
	</v-table>
</template>
