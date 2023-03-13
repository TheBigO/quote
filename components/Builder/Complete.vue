<script setup>
import { useBuilderStore } from '@/store/builder';

const storeBuilder = useBuilderStore();
</script>

<template>
	<div class="d-flex justify-center align-center" style="min-height: 80vh">
		<div class="d-flex flex-column align-center">
			<div class="checkmark">
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 161.2 161.2"
					enable-background="new 0 0 161.2 161.2"
					xml:space="preserve"
				>
					<path
						class="path"
						fill="none"
						stroke="#2c98f0"
						stroke-miterlimit="10"
						d="M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4
	c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4c0.7-0.3,1.4-0.8,2-1.5
	c0.3-0.3,0.5-0.6,0.7-0.9l46.3-50.1C427.7,57.5,427.7,54.2,425.9,52.1z"
					/>
					<circle
						class="path"
						fill="none"
						stroke="#4d9ede"
						stroke-width="4"
						stroke-miterlimit="10"
						cx="80.6"
						cy="80.6"
						r="62.1"
					/>
					<polyline
						class="path"
						fill="none"
						stroke="#2c98f0"
						stroke-width="6"
						stroke-linecap="round"
						stroke-miterlimit="10"
						points="113,52.8 
	74.1,108.4 48.2,86.4 "
					/>

					<circle
						class="spin"
						fill="none"
						stroke="#92b9d8"
						stroke-width="4"
						stroke-miterlimit="10"
						stroke-dasharray="12.2175,12.2175"
						cx="80.6"
						cy="80.6"
						r="73.9"
					/>
				</svg>
			</div>
			<div>
				<h2 class="text-blue text-h4 text-center mt-3">Success!</h2>
				<p class="text-h6 mt-2">
					The Sales Quote has been emailed to<br />
					{{ storeBuilder.quote.contact.email }}
				</p>
			</div>
			<div class="mt-3">
				<v-btn variant="tonal" color="blue" class="mx-2" to="/">
					Start A new Quote
				</v-btn>
			</div>
		</div>
	</div>
</template>

<style scoped>
.checkmark {
	width: 150px;
}

.path {
	stroke-dasharray: 1000;
	stroke-dashoffset: 0;
	animation: dash 2s ease-in-out;
	-webkit-animation: dash 2s ease-in-out;
}

.spin {
	animation: spin 2s;
	-webkit-animation: spin 2s;
	transform-origin: 50% 50%;
	-webkit-transform-origin: 50% 50%;
}

p {
	color: #474747;
	font-size: 1rem;
	text-align: center;
	animation: text 0.5s linear 0.4s;
	-webkit-animation: text 0.4s linear 0.3s;
}

@-webkit-keyframes dash {
	0% {
		stroke-dashoffset: 1000;
	}
	100% {
		stroke-dashoffset: 0;
	}
}

@keyframes dash {
	0% {
		stroke-dashoffset: 1000;
	}
	100% {
		stroke-dashoffset: 0;
	}
}

@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@-webkit-keyframes text {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes text {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
