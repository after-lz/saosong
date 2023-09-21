<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_form">
			<view class="con_upload">
				<image :src="imgPath" mode="widthFix" v-if="checkStatus != -1" @click="previewImg(imgPath)"></image>
				<u-upload ref="uUpload" :auto-upload="false" max-count="1" :file-list="fileList" upload-text="上传营业执照"
					@on-choose="chooseImg" @on-remove="removeImg" v-else></u-upload>
			</view>
			<view class="con_keyVal">
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>公司名称</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="name" type="text" height="40" input-align="right"
								:disabled="checkStatus != -1" :clearable="false" placeholder="输入姓名" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 0 0 34rpx"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>联系人</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="contact" type="text" height="40" input-align="right"
								:disabled="checkStatus != -1" :clearable="false" placeholder="请输入联系人姓名" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 0 0 34rpx"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>联系电话</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="mobile" type="number" height="40" input-align="right"
								:disabled="checkStatus != -1" :clearable="false" placeholder="请输入联系电话" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 0 0 34rpx"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>公司地址</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input u-line-1">
							<u-input v-model="address" type="text" height="40" input-align="right"
								:disabled="checkStatus != -1" :clearable="false" placeholder="请输入公司地址" />
						</view>
						<view class="con_icon" @click="chooseLocation">
							<u-icon name="map-fill" color="#485EF4"></u-icon>
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 0 0 34rpx"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>所在城市</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input" style="margin-top: -16rpx;">

							<u-select v-model="areaShow" mode="mutil-column-auto" :list="provinceCityAreaList"
								value-name="city_code" label-name="city_name" child-name="children"
								:default-value="[provinceIndex,cityIndex,areaIndex]" @confirm="confirmArea"></u-select>
							<u-input v-model="pca" type="select" input-align="right" placeholder="请选择所在城市" disabled
								:clearable="false" @click="showPCA"></u-input>
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 0 0 34rpx"></u-line>
				</view>

			</view>
		</view>

		<view class="con_checkRemark" v-if="checkStatus > 1">
			<text>{{checkRemark}}</text>
		</view>

		<view class="con_submitBtn" @click="$u.throttle(submitForm,1000)">
			<text v-if="checkStatus == -1">提交认证</text>
			<text v-if="checkStatus == 0">认证审核中</text>
			<text v-if="checkStatus == 1">认证通过</text>
			<text v-if="checkStatus == 2">认证失败,重新认证</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkStatus: -1,
				checkRemark: '',
				fileList: [],
				imgPath: '',
				licenceSn: '',
				inchargeName: '',
				name: '',
				contact: '',
				mobile: '',
				address: '',
				lng: '',
				lat: '',

				provinceCityAreaList: [],
				pca: '',
				areaShow: false,
				provinceIndex: 0,
				cityIndex: 0,
				areaIndex: 0,
				provinceStr: '',
				provinceCode: '',
				cityStr: '',
				cityCode: '',
				areaStr: '',
				areaCode: '',
			}
		},
		onLoad(option) {
			let gt = this;
			gt.getCity()
			// var list = uni.getStorageSync('pcaList')
			// gt.provinceCityAreaList = list;
			if(option.flag) gt.getAuthInfo();
		},
		methods: {
			getAuthInfo() {
				let gt = this;
				var url = "/logistics/company/get_company_approve_info";
				gt.gtRequest.post(url).then(res => {
					if (res.company_approve_info.status !== undefined) {
						gt.checkStatus = res.company_approve_info.status;
						gt.checkRemark = res.company_approve_info.audit_remark;
						gt.fileList = [{
							url: res.company_approve_info.license_pic
						}];
						gt.imgPath = res.company_approve_info.license_pic;
						gt.name = res.company_approve_info.company_name;
						gt.contact = res.company_approve_info.contact;
						gt.mobile = res.company_approve_info.mobile;
						gt.address = res.company_approve_info.address;
						gt.lng = res.company_approve_info.longitude;
						gt.lat = res.company_approve_info.latitude;
						gt.pca = res.company_approve_info.province + '-' + res.company_approve_info.city + '-' +
							res.company_approve_info.county;
					}
				});
			},
			getCity() {
				let gt = this
				gt.gtRequest.post('/api/appgobal/get_city_data').then(data => {
					for (var i = 0; i < data.city_china.length; i++) {
						for (var j = 0; j < data.city_china[i].children.length; j++) {
							for (var k = 0; k < data.city_china[i].children[j].children.length; k++) {
								data.city_china[i].children[j].children[k].selected = false
							}
							data.city_china[i].children[j].selected = false
						}
						data.city_china[i].selected = false
					}
					gt.provinceCityAreaList = data.city_china
				})
			},
			previewImg(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			chooseImg(item) {
				let gt = this;
				var file = item.fileInfo;
				gt.gtRequest.upload(file).then(res => {
					if (res.src) {
						gt.imgPath = res.src;
						gt.licenceOcr(res.src);
					} else {
						gt.removeImg();
					}
				}).catch(res => {
					gt.$refs.uUpload.remove(0);
					gt.$refs.uToast.show({
						title: res,
						type: 'error',
					});
					return false;
				});
			},
			licenceOcr(path) {
				let gt = this;
				var url = "/logistics/company/identify_business_license";
				var data = {
					license_pic: path,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.name = res.license_info.company_name;
					gt.licenceSn = res.license_info.license_no;
					gt.inchargeName = res.license_info.legal_truename;
					gt.contact = res.license_info.legal_truename;
				}).catch(res => {
					gt.$refs.uToast.show({
						title: '营业执照识别失败',
						type: 'error',
					});
					return false;
				});
			},
			removeImg() {
				let gt = this;
				gt.imgPath = '';
				gt.fileList = [];
			},
			chooseLocation() {
				let gt = this;
				if (gt.checkStatus != -1) {
					uni.openLocation({
						latitude: Number(gt.lat),
						longitude: Number(gt.lng),
						complete(res) {}
					});
				} else {
					uni.chooseLocation({
						success: function(res) {
							if (res.errMsg == 'chooseLocation:ok') {
								gt.address = res.address;
								gt.lng = res.longitude;
								gt.lat = res.latitude;
							}
						}
					})
				}
			},
			showPCA() {
				let gt = this;
				if (gt.checkStatus != -1) {
					return false;
				}
				gt.areaShow = true;
			},
			confirmArea(e) {
				let gt = this;
				gt.provinceStr = e[0].label;
				gt.provinceCode = e[0].value;
				gt.cityStr = e[1].label;
				gt.cityCode = e[1].value;
				gt.areaStr = e[2].label;
				gt.areaCode = e[2].value;
				gt.pca = e[0].label + '-' + e[1].label + '-' + e[2].label;
				var provinceList = gt.provinceCityAreaList;
				for (var i = 0; i < provinceList.length; i++) {
					if (provinceList[i].city_code == e[0].value) {
						var cityList = provinceList[i].children;
						gt.provinceIndex = i;
						break;
					}
				}
				for (var j = 0; j < cityList.length; j++) {
					if (cityList[j].city_code == e[1].value) {
						var areaList = cityList[j].children;
						gt.cityIndex = j;
						break;
					}
				}
				for (var m = 0; m < areaList.length; m++) {
					if (areaList[m].city_code == e[2].value) {
						gt.areaIndex = m;
						break;
					}
				}
			},
			submitForm() {
				let gt = this;
				if (gt.checkStatus == 2) {
					gt.checkStatus = -1;
					return false;
				}
				if (gt.checkStatus != -1) {
					return false;
				}
				if (gt.$u.test.isEmpty(gt.imgPath)) {
					gt.$refs.uToast.show({
						title: '请上传营业执照',
						type: 'error',
					});
					return false;
				}
				if (gt.$u.test.isEmpty(gt.name)) {
					gt.$refs.uToast.show({
						title: '公司名称不能为空',
						type: 'error',
					});
					return false;
				}
				if (gt.$u.test.isEmpty(gt.contact)) {
					gt.$refs.uToast.show({
						title: '联系人姓名不能为空',
						type: 'error',
					});
					return false;
				}
				if (gt.$u.test.isEmpty(gt.mobile)) {
					gt.$refs.uToast.show({
						title: '联系电话不能为空',
						type: 'error',
					});
					return false;
				}
				if (!gt.$u.test.mobile(gt.mobile)) {
					gt.$refs.uToast.show({
						title: '联系电话格式不正确',
						type: 'error',
					});
					return false;
				}
				if (gt.$u.test.isEmpty(gt.address)) {
					gt.$refs.uToast.show({
						title: '公司地址不能为空',
						type: 'error',
					});
					return false;
				}
				if (gt.$u.test.isEmpty(gt.pca)) {
					gt.$refs.uToast.show({
						title: '所在城市不能为空',
						type: 'error',
					});
					return false;
				}

				var url = "/logistics/company/apply_company_approve";
				var data = {
					license_pic: gt.imgPath,
					company_name: gt.name,
					license_no: gt.licenceSn,
					legal_truename: gt.inchargeName,
					contact: gt.contact,
					mobile: gt.mobile,
					province: gt.provinceStr,
					city: gt.cityStr,
					county: gt.areaStr,
					address: gt.address,
					latitude: gt.lat,
					longitude: gt.lng,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.checkStatus = 0;
					// uni.setStorageSync('companyAuth', 1);
					var pages = getCurrentPages();
					var url = pages[0].$page.fullPath;
					gt.$refs.uToast.show({
						title: '申请完成，等待审核',
						type: 'success',
						url: url,
						isTab: true,
					});
					return false;
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_form {
				.con_upload {
					width: 230rpx;
					height: 230rpx;
					margin: 84rpx 260rpx;
					border-radius: 16rpx;
					border: 2rpx dashed #D6D6D6;
					overflow: hidden;
				}

				.con_keyVal {
					width: 750rpx;
					// height: 520rpx;
					background: #FFFFFF;

					.con_key_val {
						display: flex;
						justify-content: space-between;

						.con_key {
							display: flex;
							margin: 32rpx 0 0 24rpx;

							.con_required {
								width: 16rpx;
								height: 40rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #FF6067;
								line-height: 40rpx;
							}

							.con_text {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
							}
						}

						.con_val {
							display: flex;
							margin: 32rpx 40rpx 0 0;

							.con_input {
								width: 450rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
							}

							.con_icon {
								margin-left: 16rpx;
							}
						}
					}
				}
			}

			.con_checkRemark {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FF6067;
				line-height: 34rpx;
				margin: 20rpx 40rpx;
			}

			.con_submitBtn {
				width: 640rpx;
				height: 100rpx;
				background: $gtProjectColor;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 100rpx;
				margin: 210rpx auto;
				text-align: center;
			}
		}
	}
</style>