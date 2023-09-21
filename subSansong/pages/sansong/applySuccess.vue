<template>
	<view class="gt_content">
		<view class="logo">
			<u-image :src="gtCommon.getOssImg('sansong/operation.png')" mode="widthFix"></u-image>
		</view>
		<view class="content">
			<view class="msg">{{ msg }}</view>
			<view class="info">等待审核人员审核</view>
		</view>
		<view class="btn">
			<u-button type="primary" @click="goBack">返回押金</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: ''
			}
		},
		onLoad(option) {
			let title = ''
			if(option.status == 1) {
				title = '申请成功'
				this.msg = '操作成功'
			}
			uni.setNavigationBarTitle({
				title: title
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.logo {
				width: 360rpx;
				height: 254rpx;
				margin: 80rpx auto;
			}
			.content {
				.msg {
					text-align: center;
					font-size: 48rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					color: #000;
				}
				.info {
					text-align: center;
					font-size: 32rpx;
					color: #909399;
					margin: 24rpx 0 100rpx 0;
				}
			}
			.btn {
				margin: 16rpx;
				width: calc(100% - 32rpx);
			}
		}
	}
</style>