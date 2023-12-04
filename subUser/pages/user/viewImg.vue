<template>
	<view class="">
		<u-image :src="src" mode="widthFix">
			<u-loading slot="loading"></u-loading>
		</u-image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad(options) {
			let type = options.type
			if(type == 1) {
				this.src = this.gtCommon.getOssImg("user/yyzz.png")
				uni.setNavigationBarTitle({
					title: "营业执照"
				})
			}
			if(type == 2) {
				this.src = this.gtCommon.getOssImg("user/xkz.png")
				uni.setNavigationBarTitle({
					title: "平台资质"
				})
			}
		}
	}
</script>

<style>
</style>