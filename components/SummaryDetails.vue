<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();
</script>

<template>
	<v-card flat class="d-flex flex-column rounded-lg pa-6">
		<div class="text-overline mb-3">Customer Information</div>
		<section v-if="storeBuilder.quote.contact" class="d-flex flex-column py-3">
			<div class="font-weight-bold">
				{{ storeBuilder.quote.contact.firstName }}
				{{ storeBuilder.quote.contact.lastName }}
			</div>
			<div class="text-grey-darken-1">
				{{ storeBuilder.quote.contact.company }}
			</div>
			<div class="text-grey-darken-1">
				{{ storeBuilder.quote.contact.email }}
			</div>
		</section>
	</v-card>
</template>
