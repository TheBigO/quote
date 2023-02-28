<template>
	<v-app>
		<NavBuilderBar />
		<Cart />
		<v-main class="bg-grey-lighten-4">
			<v-container class="mt-12">
				<v-row>
					<v-col>
						<slot />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
