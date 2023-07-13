<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		
		
		<view class="con_sign">
			<view class="con_title">
				<text>签收方式：</text>
				<text>电子签名</text>
			</view>
			<view class="con_esign">
				<signInput canvasId="oneDrowCanvas" canvasIds="oneRotateCanvas" @signComplete="signComplete" @delSign="delSign">
				</signInput>
			</view>
		</view>
		<view class="con_imgs">
			<view class="con_title">
				<text>上传签收凭证(托运单/现场照片)</text>
			</view>
			<view class="con_upload">
				<u-upload ref="uUpload" :auto-upload="false" max-count="3" width="200" height="200" :file-list="staffImgs"
					upload-text="上传照片" index="staffImgArr" @on-choose="chooseImg" @on-remove="removeImg"></u-upload>
			</view>
		</view>
		<view class="con_btn" @click="submitForm">
			<text>确认签收</text>
		</view>
	</view>
</template>


<script>
	import signInput from "@/components/am-sign-input/am-sign-input.vue";
	export default {
		components: {
			signInput
		},
		data() {
			return {
				orderSn:'',
				signImg: '',
				imgArr: [],
			}
		},
		onLoad(options) {
			let gt = this;
			gt.orderSn = options.orderSn;
		},
		methods: {
			signComplete(path) {
				console.log(path);
				let gt = this;
				var file = {
					path: path,
				};
				gt.gtRequest.upload(file).then(res => {
					gt.signImg = res.src;
				});
			},
			delSign(){
				let gt = this;
				gt.signImg = '';
			},
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
			submitForm(){
				let gt = this;
				// if (gt.stationIndex == 9999) {
				// 	gt.$refs.uToast.show({
				// 		title: '请选择到站网点',
				// 		type: 'error',
				// 	});
				// 	return false;
				// }
				
				if(gt.imgArr.length == 0){
					gt.$refs.uToast.show({
						title: '签收图片不能为空',
						type: 'error',
					});
					return false;
				}
				if(gt.signImg == ''){
					gt.$refs.uToast.show({
						title: '签名图片不能为空',
						type: 'error',
					});
					return false;
				}
				
				var url = "/logistics/order/confirm_sign";
				var data = {
					deliver_sn:gt.orderSn,
					images:gt.imgArr.join('||'),
					sign_img:gt.signImg
				};
				// return false;
				gt.gtRequest.post(url,data).then(res=>{
					gt.$refs.uToast.show({
						title: '签收成功',
						type: 'success',
						back:true,
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
			.con_sign {
				padding: 1rpx;
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;

				.con_title {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					margin: 24rpx;

					text:nth-child(2) {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						margin-left: 24rpx;
					}
				}
			}

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
				margin: 200rpx 16rpx 100rpx 16rpx;
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