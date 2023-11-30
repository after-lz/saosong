<template>
	<view class="gt_content">
		<view class="con_switch">邀请码</view>
		<!-- <view class="con_label">
			<text>邀请码：{{code}}</text>
		</view> -->
		<view class="con_qrcode">
			<!-- <image :src="url" mode="widthFix"></image> -->
			<canvas canvas-id="qrcode" :style="{ width: qrWidth + 'px', height: qrWidth + 'px' }" class="canvas"></canvas>
		</view>
		<view class="con_text">
			<text>推荐下载并成功认证，可<text style="color: #ff646b;">领取红包</text></text>
		</view>
		<view class="con_btn">
			<view class="saveLocation" @click="saveImage">保存本地</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="printLabel">
				<button open-type="share" class="share">分享好友</button>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<view class="printLabel" @click="share">分享好友</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/common/uqrcode.js'
	export default {
		data() {
			return {
				code: '',
				apiDomain: '',
				text: '',
				url: '',
				QRurl: '',
				qrWidth: 0,
				imgUrl: ''
			}
		},
		onLoad() {
			let gt = this
			// 获取手机屏幕大小
			uni.getSystemInfo({
				success: (res)=> {
					if(res.windowWidth < 375) {
						this.qrWidth = 175
					} else {
						this.qrWidth = res.windowWidth / 1.8
					}
				}
			})
			gt.code = uni.getStorageSync('user_info').invite_code
			gt.apiDomain = uni.getStorageSync('apiDomain')
			gt.text = uni.getStorageSync('environment') == 'dev' ?
				'https://test.sansongkeji.com/adminsite/#/agreement/register' : 
				'https://saasdemo.sansongkeji.com/adminsite/#/agreement/register'
			// #ifdef MP-WEIXIN
			let from_plat = '小程序'
			// #endif
			// #ifdef APP-PLUS
			let from_plat = 'APP'
			// #endif
			let params = '?code=' + gt.code + '&from_plat=' + from_plat
			gt.url = gt.apiDomain + '/api/qrcode/qrcode?text=' + gt.text + params
			gt.QRurl = gt.text + params
			gt.qrFun(gt.QRurl)
		},
		onShareAppMessage(res) {
			let gt = this;
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
			  title: '邀请码',
			  path: '/subUser/pages/user/qrcode'
			}
		},
		methods: {
			qrFun(text) {
				let gt = this
				uQRCode.make({
					canvasId: 'qrcode',  // 必须与上面canvas-id="qrcode"值一致
					componentInstance: gt,
					text: text,  // 二维码内容
					size: gt.qrWidth,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',  // 前景颜色
					fileType: 'jpg',  // 二维码图片类型
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,  // 容错级别
					success: res => {
						gt.imgUrl = res // base64
					}
				})
			},
			saveImage() {
				let gt = this
				uni.showLoading({
				    title: '加载中',
				    mask: true
				})
				// #ifdef MP-WEIXIN
				let base64 = gt.imgUrl.replace(/^data:image\/\w+;base64,/, "") // 去掉data:image/png;base64
				let filePath = wx.env.USER_DATA_PATH + '/ph_fit_qrcode.png'	// 路径文件名
				uni.getFileSystemManager().writeFile({
				    filePath: filePath,
				    data: base64,
				    encoding: 'base64',
				    success: res => {
				        uni.saveImageToPhotosAlbum({
				            filePath: filePath,
				            success: function(res2) {
				                uni.hideLoading()
				                uni.showToast({
				                    title: '保存成功',
				                    duration: 2000
				                })
				            }
				        })
				    }
				})
				// #endif
				// #ifdef APP-PLUS
				let base64 = gt.imgUrl.replace(/[\r\n]/g, "")
				const bitmap = new plus.nativeObj.Bitmap('base64')
				bitmap.loadBase64Data(base64, () => {
					const url = '_doc/' + new Date().getTime() + '.png'
					bitmap.save(
						url,
						{
							overwrite: true // 是否覆盖
							// quality: 'quality'  // 图片清晰度
						},
						(i) => {
							uni.saveImageToPhotosAlbum({
								filePath: url,
								success: () => {
									uni.showToast({
									    title: '保存成功',
									    duration: 2000
									})
									bitmap.clear()
								}
							})
						},
						(e) => {
							uni.showToast({
							    title: '图片保存失败',
							    duration: 2000
							})
							bitmap.clear()
						}
					)},
					(e) => {
						uni.showToast({
						    title: '图片保存失败',
						    duration: 2000
						})
						bitmap.clear()
					}
				)
				// #endif
			},
			share() {
				let gt = this;
				let base64 = gt.imgUrl.replace(/[\r\n]/g, "")
				const bitmap = new plus.nativeObj.Bitmap('base64')
				bitmap.loadBase64Data(base64, () => {
					const url = '_doc/' + new Date().getTime() + '.png'
					bitmap.save(
						url,
						{
							overwrite: true // 是否覆盖
							// quality: 'quality'  // 图片清晰度
						},
						(i) => {
							uni.saveImageToPhotosAlbum({
								filePath: url,
								success: () => {
									uni.share({
										provider: "weixin",
										scene: "WXSceneSession",
										type: 2,
										imageUrl: url,
										success: function (res) {
											bitmap.clear()
										},
										fail: function (err) {
											uni.showToast({
											    title: '图片分享失败',
											    duration: 2000
											})
											bitmap.clear()
										}
									});
								}
							})
						},
						(e) => {
							uni.showToast({
							    title: '图片分享失败',
							    duration: 2000
							})
							bitmap.clear()
						}
					)},
					(e) => {
						uni.showToast({
						    title: '图片分享失败',
						    duration: 2000
						})
						bitmap.clear()
					}
				)
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
				text-align: center;
				font-size: 32rpx;
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
				// width: 480rpx;
				// height: 480rpx;
				// margin: 20rpx auto;
				.canvas {
					margin: 20rpx auto;
				}
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
				align-items: center;
				color: #909399;
				margin-top: 100rpx;
				.saveLocation {
					flex: 1;
					height: 80rpx;
					line-height: 80rpx;
					border-right: 2rpx solid #e5e5e5;
					font-size: 32rpx;
					text-align: center;
				}
				.printLabel {
					flex: 1;
					font-size: 32rpx;
					text-align: center;
				}
				.share {
					// display: contents;
					color: #909399;
					font-size: 32rpx;
					background: transparent;
				}
				.share::after {
				  border: none;
				}
			}
		}
	}
</style>