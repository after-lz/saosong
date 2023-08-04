<template>
	<view class="gt_content">
		
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_list">
			<view class="con_item" @click="goPersonal">
				<view class="con_text">
					<text>个人信息</text>
				</view>
				<view class="con_icon">
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item" @click="goAccount">
				<view class="con_text">
					<text>账号安全</text>
				</view>
				<view class="con_icon">
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item" @click="goMessage">
				<view class="con_text">
					<text>消息设置</text>
				</view>
				<view class="con_icon">
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item" @click="goOrder">
				<view class="con_text">
					<text>新订单设置</text>
				</view>
				<view class="con_icon">
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
		</view>
		<view class="con_list">
			<view class="con_item" @click="checkUpdate">
				<view class="con_text">
					<text>关于伞送</text>
				</view>
				<view class="con_icon">
					<text v-if="version">V{{version}} </text>
					<text v-else>{{envVersion}}</text>
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
		</view>

		<view class="con_logout" @click="logout">
			<text>退出登录</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				appId: '',
				envVersion: '',
				version: '',
			}
		},
		onLoad() {
			let gt = this;
			// #ifdef MP-WEIXIN
			var res = uni.getAccountInfoSync();
			gt.appId = res.miniProgram.appId;
			gt.envVersion = res.miniProgram.envVersion;
			gt.version = res.miniProgram.version;
			// #endif
		},
		methods: {
			goPersonal() {
				uni.navigateTo({
					url: './personalInformation'
				})
			},
			goAccount() {
				uni.navigateTo({
					url: './accountSecurity'
				})
			},
			goMessage() {
				uni.navigateTo({
					url: './messageSetting'
				})
			},
			goOrder() {
				uni.navigateTo({
					url: './NewOrderSetting'
				})
			},
			checkUpdate() {
				const updateManager = uni.getUpdateManager();
				// console.log(updateManager);
				// updateManager.applyUpdate(function(res) {
				// 	console.log(res);
				// 	// 请求完新版本信息的回调
				// 	//    console.log('update',res.hasUpdate);
				// })
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					console.log('update', res.hasUpdate);
					if (res.hasUpdate == false) {
						uni.showModal({
							title: '已经是最新版了',
							showCancel: false,
						})
					}
				});
				updateManager.onUpdateReady(function(res) {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							}
						}
					});
				});
				// updateManager.onUpdateFailed(function(res) {
				// 	// 新的版本下载失败
				// 	//    console.log('新的版本下载失败');
				// });
			},
			logout() {
				let gt = this;
				uni.showModal({
					title: '确定退出吗？',
					success(res) {
						if (res.confirm) {
							uni.removeStorageSync('companyInfo');
							uni.removeStorageSync('userInfo');
							uni.removeStorageSync('companyAuth');
							uni.removeStorageSync('userAuth');
							uni.removeStorageSync('mobile');
							uni.removeStorageSync('openId');
							uni.removeStorageSync('audioStatus');
							uni.removeStorageSync('token_d');
							uni.removeStorageSync('tokenValid_d');
							uni.removeStorageSync('token');
							uni.removeStorageSync('tokenValid');
							gt.gtWSS.completeClose();
							gt.$refs.uToast.show({
								title: '退出成功',
								type: 'success',
								url: '/pages/login/login',
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_list {
				background: #fff;
				margin-top: 20rpx;

				.con_item {
					display: flex;
					justify-content: space-between;
					padding: 0 40rpx;

					.con_text {
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 108rpx;
					}

					.con_icon {
						line-height: 108rpx;
					}
				}
			}

			.con_logout {
				width: 718rpx;
				height: 100rpx;
				background: $gtProjectColor;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 100rpx;
				text-align: center;
				margin-top: 30rpx;
				margin-left: 16rpx;

				position: absolute;
				bottom: 160rpx;
			}
		}
	}
</style>