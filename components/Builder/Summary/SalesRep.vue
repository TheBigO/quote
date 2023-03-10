<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();

function editContact() {
	console.log('editing');
}
</script>

<template>
	<v-card flat class="d-flex flex-column rounded-lg pa-6">
		<div class="d-flex justify-space-between">
			<div class="text-overline">Account Manager</div>
		</div>

		<section
			v-if="storeBuilder.quote.salesPerson"
			class="d-flex flex-column py-3"
		>
			<div class="text-left">
				<img
					:src="storeBuilder.quote.salesPerson.logo"
					:alt="storeBuilder.quote.salesPerson.brand"
					style="height: 24px"
				/>
			</div>
			<div class="font-weight-bold">
				{{ storeBuilder.quote.salesPerson.fullName }}
			</div>
			<div class="text-grey-darken-1">
				{{ storeBuilder.quote.salesPerson.email }}
			</div>
			<div class="text-grey-darken-1">
				{{ storeBuilder.quote.salesPerson.phone }}
			</div>
		</section>
	</v-card>
</template>
