<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>

		<view class="con_form">
			<view class="con_formItem">
				<view class="con_title">
					<text>公司照片</text>
				</view>
				<view class="con_upload">
					<u-upload :auto-upload="false" max-count="9" width="230" height="230" :file-list="companyImgs"
						upload-text="上传照片" index="companyImgArr" @on-choose="chooseImg"
						@on-remove="removeImg"></u-upload>
				</view>
			</view>
			<view class="con_formItem">
				<view class="con_title">
					<text>员工风采</text>
				</view>
				<view class="con_upload">
					<u-upload :auto-upload="false" max-count="9" width="230" height="230" :file-list="staffImgs"
						upload-text="上传照片" index="staffImgArr" @on-choose="chooseImg" @on-remove="removeImg"></u-upload>
				</view>
			</view>
			<view class="con_formItem">
				<view class="con_title">
					<text>运力展示</text>
				</view>
				<view class="con_upload">
					<u-upload :auto-upload="false" max-count="9" width="230" height="230" :file-list="capacityImgs"
						upload-text="上传照片" index="capacityImgArr" @on-choose="chooseImg"
						@on-remove="removeImg"></u-upload>
				</view>
			</view>
			<view class="con_formItem">
				<view class="con_title">
					<text>资质证书</text>
				</view>
				<view class="con_upload">
					<u-upload :auto-upload="false" max-count="9" width="230" height="230"
						:file-list="qualificationsImgs" upload-text="上传照片" index="qualificationsImgArr"
						@on-choose="chooseImg" @on-remove="removeImg"></u-upload>
				</view>
			</view>
		</view>



		<view class="con_btn" @click="submitForm">
			<text>立即保存</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refresh: true,
				companyImgs: [],
				staffImgs: [],
				capacityImgs: [],
				qualificationsImgs: [],

				companyImgArr: [],
				staffImgArr: [],
				capacityImgArr: [],
				qualificationsImgArr: [],
			}
		},
		onShow() {
			let gt = this;
			if (gt.refresh) {
				gt.getDataList();
			}
		},
		methods: {
			getDataList() {
				let gt = this;

				var url = "/logistics/company/get_company_img";

				gt.gtRequest.post(url).then(res => {
					res = res.company_imgs;
					gt.companyImgArr = res.company_pics;
					gt.staffImgArr = res.staff_pics;
					gt.capacityImgArr = res.capacity_pics;
					gt.qualificationsImgArr = res.credentials_pics;

					for (var i = 0; i < res.company_pics.length; i++) {
						gt.companyImgs.push({
							url: res.company_pics[i]
						})
					}
					for (var i = 0; i < res.staff_pics.length; i++) {
						gt.staffImgs.push({
							url: res.staff_pics[i]
						})
					}
					for (var i = 0; i < res.capacity_pics.length; i++) {
						gt.capacityImgs.push({
							url: res.capacity_pics[i]
						})
					}
					for (var i = 0; i < res.credentials_pics.length; i++) {
						gt.qualificationsImgs.push({
							url: res.credentials_pics[i]
						})
					}

				});
			},
			chooseImg(item) {
				console.log(item);
				let gt = this;
				
				gt.refresh = false;
				var file = item.fileInfo;

				gt.gtRequest.upload(file).then(res => {
					gt[item.index].push(res.src);
				});
			},
			removeImg(index, list, ind) {
				console.log(index);
				console.log(list);
				console.log(ind);
				// return false;
				let gt = this;

				gt[ind].splice(index, 1);
			},

			submitForm() {
				let gt = this;
				var url = "/logistics/company/upload_company_img";
				var data = {
					company_pics: gt.companyImgArr.join('||'),
					staff_pics: gt.staffImgArr.join('||'),
					capacity_pics: gt.capacityImgArr.join('||'),
					credentials_pics: gt.qualificationsImgArr.join('||'),
				};
				console.log(data);
				// return false;


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
</style>