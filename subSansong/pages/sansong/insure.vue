<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>

		<view class="con_manage" v-if="manageStatus">
			<view class="con_form">
				<view class="con_formItem">
					<view class="con_title">
						<text>运输保单及承诺书</text>
					</view>
					<view class="con_upload">
						<u-upload ref="uUpload" :auto-upload="false" max-count="9" width="230" height="230"
							:file-list="imgs" upload-text="上传照片"
							@on-choose="chooseImg" @on-remove="removeImg"></u-upload>
					</view>
				</view>
				<view class="con_btn" @click="submitForm">
					<text>立即保存</text>
				</view>
			</view>

		</view>
		<view class="con_preview" v-else>
			<!-- <view class="con_img" @click="previewImg">
				<image :src="imgPath" mode="widthFix"></image>
			</view> -->
			<view class="con_swiper">
				<u-swiper :list="imgArr" height="500"></u-swiper>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				manageStatus: false,
				imgs: [],
				imgArr: [],
			}
		},
		onLoad(options) {
			let gt = this;
			gt.manageStatus = JSON.parse(options.manageStatus);
			if(gt.manageStatus) {
				gt.getDataList()
			} else {
				gt.imgArr = JSON.parse(decodeURIComponent(options.imgs)).map(item=> {
					return item += '?x-oss-process=style/sansong_app'
				})
			}
		},
		methods: {
			getDataList() {
				let gt = this;
				var url = "/logistics/company/get_company_img";
				gt.gtRequest.post(url).then(res => {
					gt.imgArr = res.company_imgs.insurance_pics;
					for (var i = 0; i < res.company_imgs.insurance_pics.length; i++) {
						gt.imgs.push({
							url: res.company_imgs.insurance_pics[i] + '?x-oss-process=style/sansong_app'
						})
					}
				});
			},
			chooseImg(item) {
				let gt = this;
				var file = item.fileInfo;
				gt.gtRequest.upload(file).then(res => {
					gt.imgArr.push(res.src);
				});
			},
			removeImg(index, list, ind) {
				let gt = this;
				gt.imgArr.splice(index, 1);
			},
			submitForm() {
				let gt = this;
				var url = "/logistics/company/upload_insurance_img";
				var data = {
					insurance_pics: gt.imgArr.join('||'),
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.$refs.uToast.show({
						title: '保存成功！',
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
		background: #fff;

		.gt_content {
			.con_manage{
				.con_form {
					.con_formItem {
						.con_title {
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 44rpx;
							margin: 30rpx 0 0 16rpx;
						}
				
						.con_upload {
							margin: 10rpx auto;
						}
					}
					
					.con_btn {
						width: 718rpx;
						height: 100rpx;
						background: #485EF4;
						border-radius: 16rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 100rpx;
						text-align: center;
						margin: 122rpx 16rpx 100rpx 16rpx;
					}
				}
			}
			.con_preview{
				.con_swiper{
					margin: 20rpx 16rpx;
				}
			
			}
			
		}
	}
</style>