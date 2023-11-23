<template>
	<view class="gt_content">
		<view class="con_item" @click="changeMobile">
			<view class="con_text">
				<text>更换手机换</text>
			</view>
			<view class="con_icon">
				<view>{{ mobile }}</view>
				<u-icon name="arrow-right" color="#000"></u-icon>
			</view>
		</view>
		<view class="con_line">
			<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
		</view>
		<view class="con_item" @click="cancelAccount">
			<view class="con_text">
				<text>注销账号</text>
			</view>
			<view class="con_icon">
				<view style="color: #FF6067;">注销后无法恢复，请谨慎操作</view>
				<u-icon name="arrow-right" color="#000"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: {},
				mobile: ''
			}
		},
		onLoad() {
			let gt = this
			gt.user_info = uni.getStorageSync('user_info')
			gt.mobile = gt.encryptionMobile(gt.user_info.mobile)
		},
		methods: {
			encryptionMobile(str) {
				let list = str.split('')
				list[3] = '*'
				list[4] = '*'
				list[5] = '*'
				list[6] = '*'
				return list.join('')
			},
			changeMobile() {
				uni.navigateTo({
					url: './changeMobile'
				})
			},
			cancelAccount() {
				uni.navigateTo({
					url: './applyWarning'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			background: #fff;
			color: #000000;
			margin-top: 20rpx;
			.con_item {
				display: flex;
				justify-content: space-between;
				padding: 0 40rpx;
				.con_text {
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					line-height: 108rpx;
				}
				.con_icon {
					display: flex;
					line-height: 108rpx;
					.u-icon {
						margin-left: 16rpx;
					}
				}
			}
		}
	}
</style>