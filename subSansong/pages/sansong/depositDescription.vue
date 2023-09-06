<template>
	<view class="gt_content">
		{{ data }}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: ''
			}
		},
		onLoad(option) {
			let gt = this
			gt.data = option.repositRemark
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding: 16rpx;
		}
	}
</style>