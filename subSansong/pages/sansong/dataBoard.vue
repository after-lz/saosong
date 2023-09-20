<template>
	<view class="gt_content">
		<view class="card">
			<view class="card_title">总单量</view>
			<data-chart :height="500"></data-chart>
		</view>
	</view>
</template>

<script>
import DataChart from '@/components/dataChart.vue'
export default {
	components: { DataChart },
	data() {
		return {
			
		}
	},
	onReady() {
		
	},
	methods: {
		
	}
}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.card {
				background-color: #fff;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;
				.card_title {
					font-size: 32rpx;
					font-weight: 700;
					color: #000;
					font-family: PingFangSC-Medium, PingFang SC;
				}
			}
		}
	}
</style>