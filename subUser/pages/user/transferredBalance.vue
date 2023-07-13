<template>
	<view class="gt_content">
		<view class="money">￥888.88</view>
		<view class="description">可转红包金额</view>
		<view class="rules">
			<view class="rules_item">
				<view class="label">满足金额</view>
				<view class="info">
					<text>8000/8000</text>
					<icon type="success" size="20"/>
					</view>
			</view>
			<view class="rules_item">
				<view class="label">注册时长</view>
				<view class="info">
					<text>30天/30天</text>
					<icon type="warn" size="20"/>
				</view>
			</view>
		</view>
		<view class="transferred" @click="transferred">转余额</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			transferred() {
				uni.showToast({
					title: '转余额成功',
					icon: "success",
					duration: 2000
				})
			}
		}
	}
</script>

<style lang="scss">
	.gt_content {
		background-color: #fff;
	}
	.money,
	.description {
		text-align: center;
		font-size: 34rpx;
		font-weight: 700;
	}
	.money {
		font-size: 58rpx;
		margin-top: 80rpx;
	}
	.rules {
		background-color: #f2f2f2;
		margin: 120rpx 30rpx 460rpx 30rpx;
		.rules_item {
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid #d7d7d7;
			padding: 0 20rpx;
			.info {
				color: #868686;
				display: flex;
				justify-content: space-between;
				align-items: center;
				icon {
					margin-left: 50rpx;
				}
			}
		}
	}
	.transferred {
		width: 94%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		margin: 0 auto;
		border-radius: 10rpx;
		color: #fff;
		background-color: #2461f1;
	}
</style>