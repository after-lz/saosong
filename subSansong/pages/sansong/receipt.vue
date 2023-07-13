<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>

		<view class="con_imgs">
			<view class="con_title">
				<text style="color: #FF6067;">*</text>
				<text>上传回单照片</text>
			</view>
			<view class="con_upload">
				<u-upload ref="uUpload" :auto-upload="false" max-count="3" width="230" height="230" :file-list="staffImgs"
					upload-text="上传照片" index="staffImgArr" @on-choose="chooseImg" @on-remove="removeImg"></u-upload>
			</view>
		</view>
		<view class="con_btn" @click="submitForm">
			<text>确认上传</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderSn: '',
				imgArr: [],
			}
		},
		onLoad(options) {
			let gt = this;
			gt.orderSn = options.orderSn;
		},
		methods: {

			chooseImg(item) {
				console.log(item);
				let gt = this;

				var file = item.fileInfo;

				gt.gtRequest.upload(file).then(res => {
					gt.imgArr.push(res.src);
				});
			},
			removeImg(index) {
				let gt = this;

				gt.imgArr.splice(index, 1);
			},
			submitForm() {
				let gt = this;
				// if (gt.stationIndex == 9999) {
				// 	gt.$refs.uToast.show({
				// 		title: '请选择到站网点',
				// 		type: 'error',
				// 	});
				// 	return false;
				// }

				var url = "/logistics/order/upload_receipt";
				var data = {
					deliver_sn: gt.orderSn,
					images: gt.imgArr.join('||'),

				};
				gt.gtRequest.post(url, data).then(res => {
					gt.$refs.uToast.show({
						title: '上传成功',
						type: 'success',
						back: true,
					});
				});
			},

		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {

			.con_imgs {
				width: 718rpx;
				// height: 284rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
					// margin: 24rpx;
				}
			}

			.con_btn {
				width: 718rpx;
				height: 100rpx;
				background: $gtProjectColor;
				border-radius: 16rpx;
				margin: 450rpx 16rpx 100rpx 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 100rpx;
				text-align: center;
			}

		}
	}
</style>