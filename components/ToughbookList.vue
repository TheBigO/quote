<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();
storeBuilder.fetchToughbooks();

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
				<th class="text-left">Device</th>
				<th class="text-left">MSRP</th>
				<th class="text-left">SKU</th>
				<th class="text-center">CPU</th>
				<th class="text-center">RAM</th>
				<th class="text-center">GPS</th>
				<th class="text-center">Screen</th>
				<th class="text-center">Inventory</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="product in storeBuilder.toughbooks" :key="product._id">
				<td>{{ product.name }}</td>
				<td>
					<div v-if="product.price === 0">---</div>
					<div v-else>{{ convertToCurrency(product.price) }}</div>
				</td>
				<td>{{ product.sku }}</td>
				<td class="text-center">{{ product.cpu }}</td>
				<td class="text-center">{{ product.ram }}</td>
				<td class="text-center">
					<v-icon :color="product.gps === 'No 4G LTE/GPS' ? 'red' : 'green'">{{
						product.gps === 'No GPS' ? 'mdi-close' : 'mdi-check'
					}}</v-icon>
				</td>
				<td class="text-center">
					<v-icon :color="product.screen === 'Standard' ? 'red' : 'green'">{{
						product.screen === 'Standard' ? 'mdi-close' : 'mdi-check'
					}}</v-icon>
				</td>
				<td class="text-center">
					<v-chip v-if="product.inventory === true" color="green" label
						>In Stock</v-chip
					>
				</td>
			</tr>
		</tbody>
	</v-table>
</template>
