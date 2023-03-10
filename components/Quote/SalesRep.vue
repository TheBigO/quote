<script setup>
const props = defineProps(['quote']);
</script>

<template>
	<v-card flat class="d-flex flex-column rounded-lg pa-6">
		<div class="text-overline mb-3">Account Manager</div>
		<section v-if="quote.salesPerson" class="d-flex flex-column">
			<div class="text-left">
				<img
					:src="quote.salesPerson.logo"
					:alt="quote.salesPerson.brand"
					style="height: 24px"
				/>
			</div>
			<div class="font-weight-bold">
				{{ quote.salesPerson.fullName }}
			</div>
			<div class="text-grey-darken-1">
				{{ quote.salesPerson.email }}
			</div>
			<div class="text-grey-darken-1">
				{{ quote.salesPerson.phone }}
			</div>
		</section>
	</v-card>
</template>
