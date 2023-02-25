<script setup>
const props = defineProps(['quote']);
</script>

<template>
	<v-card flat class="d-flex flex-column rounded-lg pa-6">
		<div class="text-overline mb-3">Customer Information</div>
		<section v-if="quote.contact" class="d-flex flex-column py-3">
			<div class="font-weight-bold">
				{{ quote.contact.firstName }} {{ quote.contact.lastName }}
			</div>
			<div class="text-grey-darken-1">
				{{ quote.contact.company }}
			</div>
			<div class="text-grey-darken-1">
				{{ quote.contact.email }}
			</div>
		</section>
	</v-card>
</template>
