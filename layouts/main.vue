<template>
	<v-app>
		<NavMainBar />
		<Cart />
		<v-main>
			<v-container class="mt-12">
				<v-row>
					<v-col>
						<slot></slot>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
