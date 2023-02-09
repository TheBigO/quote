<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();
storeBuilder.fetchAccessories();
</script>

<template>
	<v-table>
		<thead>
			<tr>
				<th></th>
				<th class="text-left">Device</th>
				<th class="text-left">SKU</th>
				<th class="text-left">Price</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="accessory in storeBuilder.accessories" :key="accessory._id">
				<td class="py-1" width="72px">
					<v-img :src="accessory.image" width="48px" :aspect-ratio="1"></v-img>
				</td>
				<td class="text-left">{{ accessory.name }}</td>
				<td class="text-left">{{ accessory.sku }}</td>
				<td class="text-left">${{ accessory.price }}</td>
			</tr>
		</tbody>
	</v-table>
</template>
