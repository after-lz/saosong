<template>
	<view class="gt_content">
		<view class="con_switch">
			<selectSwitch :switchList="switchList" @change="changeSwitch" />
		</view>

		<view class="con_label">
			<text>邀请码：876588</text>
		</view>
		<view class="con_qrcode">
			<!-- <image :src="gtCommon.getOssImg('user/qrcode.png')" mode="widthFix"></image> -->
			<image :src="apiDomain + url + text" mode="widthFix"></image>
		</view>
		<view class="con_text">
			<text>推荐下载并成功认证，可领取红包</text>
		</view>
		<view class="con_btn">
			<u-button type="primary" size="medium" @click="saveImage">保存</u-button>
		</view>
	</view>
</template>

<script>
	import selectSwitch from "@/components/xuan-switch/xuan-switch.vue";

	export default {

		components: {
			selectSwitch,
		},
		data() {
			return {
				switchList: ['邀请码', '专线码'],
				apiDomain: '',
				// url: '/api/qrcode/qrcode?text=',
				url: '/api/qrcode/qrcode?text=',
				text: '876588',
			}
		},
		onLoad() {
			let gt = this;

			var apiDomain = uni.getStorageSync('apiDomain');
			gt.apiDomain = apiDomain;
		},
		methods: {
			changeSwitch(isSwitch) {
				console.log(isSwitch);
			},
			saveImage() {
				let gt = this;
				console.log(222)
				uni.downloadFile({
					url: gt.apiDomain + gt.url + gt.text,
					success: (res) => {
						console.log(res)
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								console.log('save success');
							}
						});
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;

		.gt_content {
			.con_switch {
				margin-top: 48rpx;

				.switch-container {
					width: 336rpx;
					height: 84rpx;
					margin: 0 auto;

					.switch-item {
						font-size: 28rpx;
					}
				}
			}

			.con_label {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #485EF4;
				line-height: 44rpx;
				margin-top: 32rpx;
				text-align: center;
			}

			.con_qrcode {
				width: 480rpx;
				height: 480rpx;
				margin: 20rpx auto;
			}

			.con_text {
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 44rpx;
				text-align: center;
			}

			.con_btn {
				display: flex;
				justify-content: center;
				margin-top: 20px;
			}
		}
	}
</style>