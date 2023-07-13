<template>
	<view class="gt_content">
		<view class="con_webView">
			<web-view :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(options) {
			console.log(options);
			let gt = this;
			gt.url = options.url;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
