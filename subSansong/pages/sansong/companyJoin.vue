<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_form">
			<view class="con_FormItem con_upload">
				<view class="con_swiper" v-if="companyImgs.length">
					<u-swiper :list="companyImgs" mode="number" indicator-pos="bottomRight" height="400"
						@click="goImg"></u-swiper>
				</view>
				<view class="con_uploadArea" @click="goImg" v-else>
					<view class="con_iconText">
						<view class="con_icon">
							<u-icon name="photo" size="70" color="#909399"></u-icon>
						</view>
						<view class="con_text">
							<text>上传公司照片</text>
						</view>
					</view>

				</view>
			</view>
			<view class="con_FormItem con_nameInvoiceNotice">
				<view class="con_name">
					<u-input v-model="companyName" placeholder="输入公司名称" height="92" />
				</view>
				<!-- <view class="con_invoiceSwitch">
					<view class="con_required">
						<text>*</text>
					</view>
					<view class="con_text">
						<text>是否提供增值发票</text>
					</view>
					<view class="con_switch">
						<u-switch v-model="invoiceSwitch" size="40"></u-switch>
					</view>
				</view>
				<view class="con_invoiceType" v-if="invoiceSwitch">
					<view class="con_required">
						<text>*</text>
					</view>
					<view class="con_text">
						<text>提供发票形式：</text>
					</view>
					<view class="con_radio">
					<u-radio-group v-model="invoiceType">
							<u-radio name="1">电子发票</u-radio>
							<u-radio name="2">纸质发票</u-radio>
						</u-radio-group>
					</view>
					<view class="con_checkbox">
						<u-checkbox-group @change="invoiceTypeChange">
							<u-checkbox v-model="fapiao_electron_status" name="电子发票">电子发票</u-checkbox>
							<u-checkbox v-model="fapiao_paper_status" name="纸质发票">纸质发票</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
				<view class="con_invoiceRate" v-if="invoiceSwitch">
					<view class="con_required">
						<text>*</text>
					</view>
					<view class="con_text">
						<text>税点</text>
					</view>
					<view class="con_input">
						<u-input v-model="invoiceRate" type="digital" height="56" input-align="center"
							placeholder="税率" />
					</view>
					<view class="con_unit">
						<text>%</text>
					</view>
				</view> -->
				<view class="con_notice">
					<view class="con_text">
						<text>公告板</text>
					</view>
					<view class="con_textarea">
						<u-input v-model="notice" type="textarea" placeholder="请输入公司公告" />
					</view>
				</view>
			</view>

			<view class="con_FormItem con_baseInfo">
				<view class="con_title">
					<text>基本资料</text>
				</view>
				<view class="con_keyVal">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>负责人</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="name" placeholder="输入姓名" height="40" input-align="right" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 34rpx" />
				</view>
				<view class="con_keyVal">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>手机号码</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="mobile" type="number" placeholder="输入电话" height="40" input-align="right" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 34rpx" />
				</view>
				<view class="con_keyVal">
					<view class="con_key">
						<view class="con_required">
							<!-- <text>*</text> -->
						</view>
						<view class="con_text">
							<text>座机号码</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="phone" type="number" placeholder="输入电话" height="40" input-align="right" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 34rpx" />
				</view>
				<view class="con_keyVal">
					<view class="con_key">
						<view class="con_required">
							<!-- <text>*</text> -->
						</view>
						<view class="con_text">
							<text>查货电话</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="queryNumber" type="number" placeholder="输入电话" height="40" input-align="right" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 34rpx" />
				</view>

				<view class="con_keyVal">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>所在城市</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-select v-model="areaShow" mode="mutil-column-auto" :list="provinceCityAreaList"
								value-name="city_code" label-name="city_name" child-name="children"
								:default-value="[provinceIndex,cityIndex,areaIndex]" @confirm="confirmArea"></u-select>
							<u-input v-model="pca" type="select" input-align="right" placeholder="请选择所在城市" disabled
								:clearable="false" @click="showPCA"></u-input>
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 34rpx" />
				</view>

				<view class="con_keyVal">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>公司地址</text>
						</view>
					</view>
					<view class="con_val" @click="chooseLocation">
						<view class="con_input">
							<u-input v-model="address" placeholder="输入公司地址" height="40" input-align="right" readonly />
						</view>
						<view class="con_icon">
							<u-icon name="map-fill" color="#485EF4" size="48"></u-icon>
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 34rpx" />
				</view>
				<view class="con_keyVal">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>所属园区</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-select v-model="parkShow" :list="parkList" value-name="park_id" label-name="park_name"
								:default-value="[parkIndex]" @confirm="parkConfirm"></u-select>
							<u-input v-model="parkStr" type="select" placeholder="选择物流园区" height="40"
								input-align="right" @click="showPark" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 34rpx" />
				</view>
				<view class="con_keyVal">
					<view class="con_key">
						<view class="con_required">
							<!-- <text>*</text> -->
						</view>
						<view class="con_text">
							<text>营业执照</text>
						</view>
					</view>
					<view class="con_val" @click="goLicence">
						<view class="con_btn" style="color: #485EF4;">
							<text>去查看</text>
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 34rpx" />
				</view>
				<view class="con_keyVal">
					<view class="con_key">
						<view class="con_required">
							<!-- <text>*</text> -->
						</view>
						<view class="con_text">
							<text>运输保单</text>
						</view>
					</view>
					<view class="con_val" @click="goInsure">
						<view class="con_btn" style="color: #485EF4;">
							<text>去上传</text>
						</view>
					</view>
				</view>
			</view>

			<view class="con_submitBtn">
				<view class="con_licence">
					<u-checkbox-group>
						<u-checkbox v-model="agreement">
							<text>我已阅读并同意</text>
							<text style="color: #485EF4;"
								@click.stop="gtCommon.goLicence(licencesObj.company_settled_xieyi_url)">《企业入驻协议》</text>
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="con_btn" @click="submitForm">
					<text v-if="flag">保存修改</text>
					<text v-else >立即入驻</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentCity: '',
				refresh: true,
				parkList: [],
				companyImgs: [],

				companyName: '',
				invoiceSwitch: true,
				invoiceType: 1,
				fapiao_electron_status: false,
				fapiao_paper_status: false,
				invoiceRate: 10.0,
				notice: '',

				name: '',
				mobile: '',
				phone: '',
				queryNumber: '',
				address: '',
				lng: '',
				lat: '',
				parkId: '',
				parkStr: '',
				parkShow: false,
				parkIndex: 0,

				agreement: false,

				flag: false,
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
				licencesObj: {},
			}
		},
		onLoad() {
			let gt = this;

			var list = uni.getStorageSync('pcaList')
			gt.provinceCityAreaList = list;
			gt.licencesObj = uni.getStorageSync('licencesObj');

		},

		onShow() {
			let gt = this;
			if (gt.refresh) {
				setTimeout(function() {
					gt.getCompanyInfo();
				}, 800);
			}
		},

		methods: {
			invoiceTypeChange(res) {
				console.log(res);
			},
			getParkList() {
				let gt = this;
				var url = "/api/appgobal/get_logistics_park_list";
				var data = {
					park_city: gt.cityStr,
					page: 1,
					limit: 999,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.parkList = res.list;
					gt.parkShow = true;
				});
			},
			// getImgList() {
			// 	let gt = this;

			// 	var url = "/logistics/company/get_company_img";

			// 	gt.gtRequest.post(url).then(res => {
			// 		gt.companyImgs = res.company_pics;
			// 	});
			// },
			getCompanyInfo() {
				let gt = this;
				var url = "/logistics/company/get_company_info";

				gt.gtRequest.post(url).then(res => {
					gt.companyImgs = res.company_imgs_all;
					if (res.company_info.company_name) {
						var companyInfo = res.company_info;
						gt.companyName = companyInfo.company_name;
						gt.invoiceSwitch = companyInfo.is_fapiao;
						gt.invoiceType = companyInfo.fapiao_type;
						gt.invoiceRate = companyInfo.fapiao_tax_point;
						gt.notice = companyInfo.public_notice;


						gt.name = companyInfo.contact;
						gt.mobile = companyInfo.mobile;

						gt.phone = companyInfo.fixed_telephone;
						gt.queryNumber = companyInfo.search_phone;

						gt.pca = companyInfo.province + '-' + companyInfo.city + '-' + companyInfo.county;

						gt.provinceStr = companyInfo.province;
						gt.cityStr = companyInfo.city;
						gt.areaStr = companyInfo.county;

						gt.address = companyInfo.address;
						gt.lng = companyInfo.longitude;
						gt.lat = companyInfo.latitude;

						gt.parkId = companyInfo.park_id;
						gt.flag = companyInfo.park_id
						if (companyInfo.park_id) {
							gt.parkStr = companyInfo.park_name;
							for (var i = 0; i < gt.parkList.length; i++) {
								if (companyInfo.park_id == gt.parkList[i].park_id) {
									gt.parkIndex = i;
									break;
								}
							}
						}

						var provinceList = gt.provinceCityAreaList;
						for (var i = 0; i < provinceList.length; i++) {
							// console.log(i);
							if (provinceList[i].city_name == companyInfo.province) {
								var cityList = provinceList[i].children;
								// console.log(i);
								gt.provinceIndex = i;
								break;
							}
						}
						// console.log(cityList);
						for (var j = 0; j < cityList.length; j++) {
							if (cityList[j].city_name == companyInfo.city) {
								var areaList = cityList[j].children;
								gt.cityIndex = j;
								break;
							}
						}
						for (var m = 0; m < areaList.length; m++) {
							// console.log(m);
							if (areaList[m].city_name == companyInfo.county) {
								gt.areaIndex = m;
								// console.log(m);
								break;
							}
						}


					}
				});
			},

			goImg() {
				let gt = this;
				uni.navigateTo({
					url: './companyImg',
				});
				return false;
			},

			chooseLocation() {
				let gt = this;
				gt.refresh = false;
				if (gt.lat) {
					uni.chooseLocation({
						latitude: Number(gt.lat),
						longitude: Number(gt.lng),
						success: function(res) {
							console.log(res);
							if (res.errMsg == 'chooseLocation:ok') {
								gt.address = res.address;
								gt.lng = res.longitude;
								gt.lat = res.latitude;
							}
							// gt.refresh = true;
						}
					})
				} else {
					uni.chooseLocation({
						success: function(res) {
							console.log(res);
							if (res.errMsg == 'chooseLocation:ok') {
								gt.address = res.address;
								gt.lng = res.longitude;
								gt.lat = res.latitude;
							}
							// gt.refresh = true;
						}
					})
				}

			},
			showPark() {
				let gt = this;
				if (gt.cityStr == '') {
					gt.$refs.uToast.show({
						title: '请先选择所在城市',
						type: 'error',
					});
					return false;
				}
				gt.getParkList();
			},
			parkConfirm(res) {
				console.log(res);
				let gt = this;
				if(res[0].value !== null) {
					gt.parkId = res[0].value;
					gt.parkStr = res[0].label;
					gt.parkIndex = res[0].index;
				}
			},

			showPCA() {
				let gt = this;
				gt.areaShow = true;
			},
			confirmArea(e) {
				// console.log(e);
				let gt = this;
				gt.parkId = '';
				gt.parkStr = '';
				gt.parkIndex = 0;
				gt.provinceStr = e[0].label;
				gt.provinceCode = e[0].value;
				gt.cityStr = e[1].label;
				gt.cityCode = e[1].value;
				gt.areaStr = e[2].label;
				gt.areaCode = e[2].value;
				gt.pca = e[0].label + '-' + e[1].label + '-' + e[2].label;

				var provinceList = gt.provinceCityAreaList;
				for (var i = 0; i < provinceList.length; i++) {
					// console.log(i);
					if (provinceList[i].city_code == e[0].value) {
						var cityList = provinceList[i].children;
						// console.log(i);
						gt.provinceIndex = i;
						break;
					}
				}
				// console.log(cityList);
				for (var j = 0; j < cityList.length; j++) {
					if (cityList[j].city_code == e[1].value) {
						var areaList = cityList[j].children;
						gt.cityIndex = j;
						break;
					}
				}
				for (var m = 0; m < areaList.length; m++) {
					// console.log(m);
					if (areaList[m].city_code == e[2].value) {
						gt.areaIndex = m;
						// console.log(m);
						break;
					}
				}



				// console.log(provinceList);
				// console.log(cityList);

			},

			goLicence() {
				let gt = this;
				gt.refresh = false;
				uni.navigateTo({
					url: './licenceImg'
				});
				return false;
			},
			goInsure() {
				uni.navigateTo({
					url: './insure?manageStatus=true',
				});
				return false;
			},
			submitForm() {
				let gt = this;
				if (!gt.agreement) {
					gt.$refs.uToast.show({
						title: '请先阅读并同意《入驻协议》！',
						type: 'error',
					});
					return false;
				}
				if (gt.$u.test.isEmpty(gt.name)) {
					gt.$refs.uToast.show({
						title: '负责人姓名不能为空',
						type: 'error',
					});
					return false;
				}
				if (!gt.$u.test.mobile(gt.mobile)) {
					gt.$refs.uToast.show({
						title: '手机号码不正确',
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
				if (gt.$u.test.isEmpty(gt.parkId)) {
					gt.$refs.uToast.show({
						title: '请选择物流园区',
						type: 'error',
					});
					return false;
				}


				var url = "/logistics/company/company_settled";
				var data = {
					company_name: gt.companyName,
					contact: gt.name,
					mobile: gt.mobile,
					province: gt.provinceStr,
					city: gt.cityStr,
					county: gt.areaStr,
					address: gt.address,
					latitude: gt.lat,
					longitude: gt.lng,
					is_fapiao: gt.invoiceSwitch ? 1 : 0,
					// fapiao_type: gt.invoiceType,
					fapiao_electron_status: gt.fapiao_electron_status ? 1 : 0,
					fapiao_paper_status: gt.fapiao_paper_status ? 1 : 0,
					
					fapiao_tax_point: gt.invoiceRate,
					public_notice: gt.notice,
					// fixed_telephone: gt.phone,
					search_phone: gt.queryNumber,
					park_id: gt.parkId ? gt.parkId : 0,
				};
				if (gt.phone) {
					data.fixed_telephone = gt.phone;
				}
				gt.gtRequest.post(url, data).then(res => {
					gt.$refs.uToast.show({
						title: '入驻成功',
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
			.con_form {
				.con_FormItem {
					background: #fff;
				}

				.con_upload {
					background: $gtBackgroundColor;

					.con_uploadArea {
						margin: 84rpx 260rpx;

						.con_iconText {
							width: 230rpx;
							height: 230rpx;
							border-radius: 16rpx;
							border: 2rpx dotted #D6D6D6;

							.con_icon {
								margin: 50rpx 80rpx 0 80rpx;
							}

							.con_text {
								font-size: 32rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #909399;
								line-height: 44rpx;
								margin-top: 16rpx;
								text-align: center;
							}
						}
					}
				}

				.con_nameInvoiceNotice {
					padding: 1rpx;

					.con_name {
						width: 718rpx;
						// height: 92rpx;
						background: #F4F4F4;
						border-radius: 16rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						line-height: 92rpx;
						padding: 0 24rpx;
						margin: 24rpx 16rpx 0 16rpx;
					}

					.con_invoiceSwitch {
						display: flex;
						margin: 42rpx 16rpx 0 16rpx;

						.con_required {
							color: #FF6067;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							line-height: 44rpx;
						}

						.con_text {
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000;
							line-height: 56rpx;
						}

						.con_switch {
							margin-left: 16rpx;
							margin-top: 10rpx;
						}
					}

					.con_invoiceType {
						display: flex;
						margin: 20rpx 16rpx 0 16rpx;

						.con_required {
							color: #FF6067;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							line-height: 56rpx;
						}

						.con_text {
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000;
							line-height: 56rpx;
						}

						.con_radio {
							margin-left: 16rpx;
						}

						.con_checkbox {
							margin-left: 16rpx;
						}
					}

					.con_invoiceRate {
						display: flex;
						margin: 20rpx 16rpx 0 16rpx;

						.con_required {
							color: #FF6067;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							line-height: 56rpx;
						}

						.con_text {
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000;
							line-height: 56rpx;
						}

						.con_input {
							width: 124rpx;
							margin-left: 16rpx;
							background: #F4F4F4;
							border-radius: 8rpx;
							border-radius: 6rpx;
						}

						.con_unit {
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 56rpx;
							margin-left: 8rpx;
						}
					}

					.con_notice {
						.con_text {
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 44rpx;
							margin: 32rpx 16rpx 0 16rpx;
						}

						.con_textarea {
							width: 718rpx;
							height: 160rpx;
							background: #F4F4F4;
							border-radius: 16rpx;
							border-radius: 16rpx;
							padding: 24rpx;
							margin: 8rpx 16rpx 60rpx 16rpx;
						}
					}
				}

				.con_baseInfo {
					padding: 1rpx;
					margin-top: 20rpx;
					padding-bottom: 30rpx;

					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						margin: 24rpx 0 24rpx 40rpx;
					}

					.con_keyVal {
						display: flex;
						justify-content: space-between;

						.con_key {
							display: flex;
							margin-left: 40rpx;

							.con_required {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
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
							margin-right: 40rpx;

							.con_input {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								line-height: 40rpx;
							}

							.con_icon {
								margin-right: -4rpx;
								margin-left: 20rpx;
							}

						}
					}
				}

				.con_submitBtn {
					margin-top: 100rpx;

					.con_licence {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 40rpx;
						margin-left: 142rpx;
					}

					.con_btn {
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
						margin-top: 24rpx;
						margin-left: 16rpx;
						// margin-bottom: 100rpx;
					}
				}

			}
		}
	}
</style>