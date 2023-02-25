<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();

const editing = ref(false);
</script>

<template>
	<v-card flat class="d-flex flex-column rounded-lg pa-6">
		<div class="d-flex justify-space-between">
			<div class="text-overline mb-3">Customer Information</div>
			<div>
				<v-btn
					variant="tonal"
					size="small"
					color="grey-lighten-1"
					icon="mdi-pencil-outline"
					@click="editing = !editing"
				></v-btn>
			</div>
		</div>

		<v-expand-x-transition v-if="!editing">
			<section
				v-if="storeBuilder.quote.contact"
				class="d-flex flex-column py-3"
			>
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
		</v-expand-x-transition>

		<v-expand-x-transition v-if="editing">
			<v-row>
				<v-col>
					<v-text-field
						v-model="storeBuilder.quote.contact.firstName"
						label="FirstName"
						required
						:rules="[(v) => !!v || 'A first name is required']"
					></v-text-field>
					<v-text-field
						v-model="storeBuilder.quote.contact.lastName"
						label="Last Name"
						required
						:rules="[(v) => !!v || 'A last name is required']"
					></v-text-field>
					<v-text-field
						v-model="storeBuilder.quote.contact.company"
						label="Company"
						required
						:rules="[(v) => !!v || 'A company is required']"
					></v-text-field>
					<v-text-field
						v-model="storeBuilder.quote.contact.email"
						label="Email"
						required
						:rules="[(v) => !!v || 'An email is required']"
					></v-text-field>
				</v-col>
			</v-row>
		</v-expand-x-transition>
	</v-card>
</template>
