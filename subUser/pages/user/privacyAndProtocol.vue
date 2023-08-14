<template>
	<view class="gt_content">
		<view class="con_list">
			<view class="con_item" @click="gtCommon.goLicence(protocol)">
				<view class="con_text">
					<text>用户服务协议</text>
				</view>
				<view class="con_icon">
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item" @click="gtCommon.goLicence(privacy)">
				<view class="con_text">
					<text>隐私权保护政策</text>
				</view>
				<view class="con_icon">
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				protocol: 'https://saasdemo.sansongkeji.com/adminsite/#/agreement/userProtocol',
				privacy: 'https://saasdemo.sansongkeji.com/adminsite/#/agreement/privacyPolicy'
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #000;
			.con_list {
				margin-top: 20rpx;
				background: #fff;
				.con_item {
					height: 108rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 40rpx;
				}
			}
		}
	}
</style>