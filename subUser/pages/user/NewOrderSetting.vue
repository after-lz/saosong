<template>
	<view class="gt_content">
		<view class="voice_notice card">
			<view class="notice_title">语音通知</view>
			<u-switch v-model="checked"></u-switch>
		</view>
		<view class="banner_notice card">
			<view class="notice_title">
				<view class="notice_title_title">横幅通知</view>
				<view class="notice_title_des">伞送打开时，抢单大厅外展示</view>
			</view>
			<view class="banner_main">
				<view class="model"></view>
				<view class="model" @click="setNewLocalNotification">
					<view class="model_banner"></view>
				</view>
				<view class="model_des">
					<view class="model_des_name">不通知</view>
					<view class="model_des_name">横幅通知</view>
				</view>
				<view class="banner_switch">
					<u-radio-group v-model="banner_flag">
						<u-radio name="false"></u-radio>
						<u-radio name="true"></u-radio>
					</u-radio-group>
				</view>
			</view>
		</view>
		<view class="floatWindow_notice card">
			<view class="notice_title">
				<view class="notice_title_title">悬浮窗通知</view>
				<view class="notice_title_des">伞送未打开开始展示</view>
			</view>
			<view class="banner_main">
				<view class="model"></view>
				<view class="model">
					<view class="model_ball"></view>
				</view>
				<view class="model_des">
					<view class="model_des_name">不通知</view>
					<view class="model_des_name model_des_name1">悬浮窗通知</view>
				</view>
				<view class="banner_switch">
					<u-radio-group v-model="floatWindow_flag">
						<u-radio name="false"></u-radio>
						<u-radio name="true"></u-radio>
					</u-radio-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				banner_flag: 'true',
				floatWindow_flag: 'true'
			}
		},
		methods: {
			setNewLocalNotification() {
				// console.debug(plus.ios)
				// // 配置通知内容
				// const content = {
				//   title: '通知标题',
				//   body: '通知内容',
				//   userInfo: {"key": "value"} // 附加数据
				// };
				// // 创建通知
				// const notification = {
				//   identifier: 'local-notification', // 首次显示时的标识符
				//   content: content,
				//   trigger: {
				//     repeats: false // 只显示一次
				//   }
				// };
				
				// // 添加通知
				// uni.addLocalNotification(notification);
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding: 20rpx 16rpx;
			.card {
				background-color: #fff;
				border-radius: 16rpx;
				margin-bottom: 20rpx;
				padding: 24rpx;
			}
			.voice_notice {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.notice_title {
					color: #000;
				}
			}
			.banner_notice,
			.floatWindow_notice {
				.notice_title {
					margin-bottom: 20rpx;
					.notice_title_title {
						color: #000;
						display: inline-block;
					}
					.notice_title_des {
						color: #909399;
						font-size: 24rpx;
						display: inline-block;
						margin-left: 20rpx;
					}
				}
				.banner_main {
					height: 460rpx;
					background-color: #F4F4F4;
					border-radius: 16rpx;
					padding: 78rpx 116rpx 0;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.model {
						position: relative;
						width: 120rpx;
						height: 200rpx;
						border: 2rpx solid #909399;
						border-radius: 16rpx;
						.model_banner {
							width: 108rpx;
							height: 40rpx;
							background-color: #485EF4;
							border-radius: 10rpx;
							margin: 6rpx auto 0;
						}
						.model_ball {
							position: absolute;
							right: 8rpx;
							bottom: 8rpx;
							width: 32rpx;
							height: 32rpx;
							border-radius: 50%;
							background-color: #485EF4;
						}
					}
					.model_des {
						width: 100%;
						height: 38rpx;
						display: flex;
						justify-content: space-between;
						margin-top: -40rpx;
						.model_des_name {
							width: 120rpx;
							text-align: center;
						}
						.model_des_name1 {
							width: 128rpx;
							white-space: nowrap;
						}
					}
					.banner_switch {
						width: 100%;
						position: relative;
						margin-top: -30rpx;
						.u-radio-group {
							display: flex;
							justify-content: space-between;
							.u-radio {
								width: 120rpx !important;
								display: flex !important;
								justify-content: center;
								.u-radio__label {
									display: none;
								}
							}
							&::after {
								display: none;
							}
						}
						
					}
				}
			}
		}
	}
</style>