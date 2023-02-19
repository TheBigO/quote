<script setup>
import { useBuilderStore } from '@/store/builder';
const router = useRouter();

const storeBuilder = useBuilderStore();
</script>

<template>
	<v-app-bar flat color="#232323">
		<v-container class="d-flex align-center">
			<RSALogo height="32" width="80" /><span
				class="text-caption text-white ml-4"
				>v0.3.5</span
			>
			<v-spacer></v-spacer>
			<v-btn variant="tonal" color="yellow" nuxt to="/">New Quote</v-btn>
			<v-btn variant="text" color="white" nuxt to="/sku">SKU</v-btn>
			<v-btn variant="text" color="white" nuxt to="/quote">Quotes</v-btn>
			<v-btn
				icon="mdi-shopping-outline"
				color="white"
				@click="storeBuilder.drawer = !storeBuilder.drawer"
			></v-btn>
		</v-container>
	</v-app-bar>
</template>
