<template>
	<view class="gt_content">
		<view class="con_text">
			<text>扫一扫发货/取货</text>
		</view>
		<view class="con_qrcode">
			<image :src="url" mode="widthFix"></image>
		</view>
		<view class="con_companyName">
			<text>{{companyName}}</text>
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
	export default {
		data() {
			return {
				apiDomain:'',
				url:'',
				text:'',
				companyName:'',
			}
		},
		onLoad() {
			let gt = this;
			var apiDomain = uni.getStorageSync('apiDomain');
			gt.apiDomain = apiDomain;
			var companyInfo = uni.getStorageSync('companyInfo');
			gt.companyName= companyInfo.company_name;
			gt.text = companyInfo.logistics_id
			gt.url = apiDomain + '/api/qrcode/qrcode?text=https://saasdemo.sansongkeji.com/order?logistics_id=' + gt.text
		},
		methods: {
			saveImage() {
				let gt = this;
				uni.downloadFile({
				    url: gt.url,
				    success(res) {
				        uni.saveImageToPhotosAlbum({
				            filePath: res.tempFilePath,
				            success(res) {
				                uni.showToast({
				                	title: '已保存到相册',
				                	duration: 2000
				                })
				            }
				        })
				    }
				})
			},
			share() {
				let gt = this;
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 2,
					imageUrl: gt.url,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
		},
		onShareAppMessage(res) {
			let gt = this;
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
			  title: '扫一扫发货/取货',
			  path: '/subSansong/pages/sansong/shipPickup'
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #fff;
		.gt_content{
			.con_text{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 44rpx;
				text-align: center;
				margin-top: 164rpx;
			}
			.con_qrcode{
				width: 480rpx;
				margin-top: 20rpx;
				margin-left: 135rpx;
			}
			.con_companyName{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #485EF4;
				line-height: 44rpx;
				text-align: center;
				margin-top: 20rpx;
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
