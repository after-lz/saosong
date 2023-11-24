<template>
	<view class="gt_content">
		<view class="logo">
			<image :src="src" mode="widthFix"></image>
		</view>
		<view class="versions">
			<view class="logo_name">伞送物流</view>
			<view class="version" v-if="version">V{{ version }}</view>
		</view>
		<view class="con_list">
			<!-- #ifdef APP-PLUS -->
			<!-- <view class="con_item" @click="checkVersion">
				<view class="con_text">
					<text>检测新版本</text>
				</view>
				<view class="con_icon">
					<view v-if="version">V{{ version }}</view>
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view> -->
			<!-- #endif -->
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item" @click="dial">
				<view class="con_text">
					<text>客服电话</text>
				</view>
				<view class="con_icon">
					<view>{{ mobile }}</view>
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item" @click="viewProtocol">
				<view class="con_text">
					<text>隐私和用户协议</text>
				</view>
				<view class="con_icon">
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
		</view>
		<view class="con_footer">
			<text>苏ICP备18045543号-4A</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/unicargo/image/ssLogo.png',
				version: '',
				mobile: '4008899050'
			}
		},
		onLoad() {
			let gt = this
			let res = uni.getSystemInfoSync()
			gt.version = res.appVersion
		},
		methods: {
			checkVersion() {
				const updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate == false) {
						uni.showModal({
							title: '已经是最新版了',
							showCancel: false
						})
					}
				})
				updateManager.onUpdateReady(function(res) {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate()
							}
						}
					})
				})
			},
			dial() {
				let gt = this
				uni.makePhoneCall({
					phoneNumber: gt.mobile
				})
			},
			viewProtocol() {
				uni.navigateTo({
					url: './privacyAndProtocol'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
		.gt_content {
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #000;
			.logo {
				width: 104px;
				margin: 100rpx auto 50rpx;
			}
			.versions {
				text-align: center;
				.logo_name {
					font-weight: 700;
				}
				.version {
					margin: 20rpx 0 50rpx 0;
				}
			}
			.con_list {
				margin-top: 20rpx;
				.con_item {
					height: 108rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 40rpx;
					.con_icon {
						display: flex;
						align-items: center;
						.u-icon {
							margin-left: 10rpx;
						}
					}
				}
			}
			.con_footer {
				width: 100%;
				position: fixed;
				bottom: 0;
				text-align: center;
				font-size: 26rpx;
				padding-bottom: 40rpx;
				padding-bottom: constant(safe-area-inset-bottom);
				padding-bottom: env(safe-area-inset-bottom);
			}
		}
	}
</style>