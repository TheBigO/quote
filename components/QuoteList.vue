<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();
storeBuilder.fetchQuotes();

function convertShortDate(date) {
	return new Date(date).toLocaleDateString('en-us', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}
</script>

<template>
	<v-table>
		<thead>
			<tr>
				<th class="text-left">Quote</th>
				<th class="text-left">Contact</th>
				<th class="text-left">Date</th>
				<th class="text-left">Total</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="quote in storeBuilder.quotes" :key="quote._id">
				<td class="text-left">QA-{{ quote.quoteNumber }}</td>
				<td class="text-left">
					{{ quote.contact.firstName }} {{ quote.contact.lastName }}
				</td>
				<td class="text-left">{{ convertShortDate(quote.createdAt) }}</td>
				<td class="text-left">${{ quote.quoteTotal }}</td>
			</tr>
		</tbody>
	</v-table>
</template>
