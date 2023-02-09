<script setup>
import Accessories from '@/components/AccessoryList.vue';
import Toughbooks from '@/components/ToughbookList.vue';
// import { useBuilderStore } from '@/store/builder';

// const storeBuilder = useBuilderStore();

const currentTab = ref('Toughbooks');

const tabs = {
	Toughbooks,
	Accessories,
};
</script>

<template>
	<div class="d-flex mb-8">
		<v-btn
			v-for="(_, tab) in tabs"
			:key="tab"
			variant="tonal"
			color="grey-darken-2"
			class="mx-2"
			:active="currentTab === tab"
			@click="currentTab = tab"
			>{{ tab }}</v-btn
		>
	</div>
	<section>
		<component :is="tabs[currentTab]"></component>
	</section>
</template>
