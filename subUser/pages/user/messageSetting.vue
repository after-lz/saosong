<template>
	<view class="gt_content">
		<view class="con_item">
			<view class="name">聊天提示音</view>
			<u-switch v-model="activity"></u-switch>
		</view>
		<view class="con_line">
			<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
		</view>
		<view class="con_item">
			<view class="name">系统推送</view>
			<u-switch v-model="sysPush"></u-switch>
		</view>
		<view class="con_line">
			<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
		</view>
		<view class="con_item">
			<view class="name">活动推送</view>
			<u-switch v-model="activityPush"></u-switch>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activity: false,
				sysPush: false,
				activityPush: false
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding-top: 20rpx;
			.con_item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 108rpx;
				background-color: #fff;
				padding: 0 40rpx;
				.name {
					font-size: 32rpx;
					color: #000;
					font-family: PingFangSC-Regular, PingFang SC;
				}
			}
		}
	}
</style>