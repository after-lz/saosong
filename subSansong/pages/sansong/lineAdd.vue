<template>
	<view class="gt_content">

		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>

		<view class="con_step1" v-show="step == 1">

			<view class="con_title">
				<text>专线信息</text>
			</view>
			<view class="con_item">
				<view class="con_fromTo">
					<view class="con_from">
						<view class="con_select">
							<u-input v-model="fromPca[1][0].cityName" type="select" height="80" input-align="center"
								placeholder="出发地" @click="showGTPCA('s')" />

						</view>
					</view>
					<view class="con_icon">
						<image :src="gtCommon.getOssImg('sansong/fromTo.png')" mode="widthFix"></image>
					</view>
					<view class="con_to">
						<view class="con_select">
							<u-input v-model="toPca[1][0].cityName" type="select" height="80" input-align="center"
								placeholder="目的地" @click="showGTPCA('e')" />
						</view>
					</view>

					<!-- {{GTPCAShow}} -->
				</view>
				<view class="con_keyVal">
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>专线经理</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="manageName" type="text" height="80" placeholder="请输入名称" />
							</view>
						</view>
					</view>
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>经理手机</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="manageMobile" type="number" height="80" placeholder="请输入手机号码" />
							</view>
						</view>
					</view>
				</view>

				<view class="con_radio">
					<u-radio-group v-model="lineType" width="300rpx">
						<u-radio name="1">直达专线</u-radio>
						<u-radio name="2">中转专线</u-radio>
					</u-radio-group>
				</view>
			</view>

			<view class="con_title">
				<text>到站信息</text>
			</view>
			<view class="con_item" v-for="(item,index) in arriveStationList" :key="index">
				<!-- <view class="con_removeBtn" @click="removeArriveStation(index)" v-if="index != 0"> -->
				<!-- 20230704测试要求第一个也能删除 -->
				<view class="con_removeBtn" @click="removeArriveStation(index)">
					<u-icon name="close-circle-fill" color="#FF6067" size="48"></u-icon>
				</view>
				<view class="con_keyVal">
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>到站公司</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="item.company" type="text" height="80" placeholder="请输入名称" />
							</view>
						</view>
					</view>
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>专线经理</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="item.manage" type="text" height="80" placeholder="输入姓名" />
							</view>
						</view>
					</view>
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>到站电话</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="item.mobile" type="number" height="80" placeholder="请输入手机号码" />
							</view>
						</view>
					</view>
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>到站地区</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">

								<u-input v-model="item.pca" type="select" height="80" placeholder="请选择所在城市" disabled
									:clearable="false" @click="showGTPCA2(index)"></u-input>
							</view>
						</view>
					</view>

					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>到站地址</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="item.address" type="textarea" placeholder="请输入地址" />
							</view>
							<view class="con_icon" style="border: 1rpx soild red;" @click="chooseAddress(index)">
								<u-icon name="map-fill" color="#485EF4" size="40"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="con_addBtn" @click="addArriveStation">
				<text>+增加到站信息</text>
			</view>
		</view>

		<view class="con_step2" v-show="step == 2">
			<view class="con_title_switch">
				<view class="con_title">
					<text>报价信息</text>
				</view>
				<view class="con_switch">
					<text>报价开关</text>
					<u-switch v-model="quotationSwitch" size="40"></u-switch>
				</view>
			</view>

			<view class="con_item">
				<view class="con_keyLabel">
					<view class="con_key_label">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>物流方式</text>
							</view>
						</view>
						<view class="con_label">
							<text>普运</text>
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line length="718rpx" color="#E5E5E5"></u-line>
				</view>
				<view class="con_keyNunUnit">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>时效</text>
						</view>
					</view>
					<view class="con_num">
						<u-input v-model="minDay1" type="digit" input-align="center" height="80" placeholder="天数" />
					</view>
					<view class="con_line">
						<u-line length="90rpx" color="#000"></u-line>
					</view>
					<view class="con_num">
						<u-input v-model="maxDay1" type="digit" input-align="center" height="80" placeholder="天数" />
					</view>
					<view class="con_unit">
						<text>天</text>
					</view>
				</view>

				<view class="con_line">
					<u-line length="718rpx" color="#E5E5E5"></u-line>
				</view>

				<view class="con_keyVal">
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>纯重1:1单价</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="price1_1" type="digit" heigth="80" placeholder="输入价格" />
							</view>
							<view class="con_unit">
								<text>元/吨</text>
							</view>
						</view>
					</view>
					<view class="con_line">
						<u-line length="718rpx" color="#E5E5E5"></u-line>
					</view>
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>重泡1:3单价</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="price3_1" type="digit" heigth="80" placeholder="输入价格" />
							</view>
							<view class="con_unit">
								<text>元/吨</text>
							</view>
						</view>
					</view>
					<view class="con_line">
						<u-line length="718rpx" color="#E5E5E5"></u-line>
					</view>
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>重泡1:6单价</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="price6_1" type="digit" heigth="80" placeholder="输入价格" />
							</view>
							<view class="con_unit">
								<text>元/立方</text>
							</view>
						</view>
					</view>
					<view class="con_line">
						<u-line length="718rpx" color="#E5E5E5"></u-line>
					</view>
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>重泡1:10单价</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="price10_1" type="digit" heigth="80" placeholder="输入价格" />
							</view>
							<view class="con_unit">
								<text>元/立方</text>
							</view>
						</view>
					</view>
				</view>
			</view>


			<view class="con_item">
				<view class="con_keyLabel">
					<view class="con_key_label">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>物流方式</text>
							</view>
						</view>
						<view class="con_label" style="background: #FFBF27;">
							<text>快运</text>
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line length="718rpx" color="#E5E5E5"></u-line>
				</view>
				<view class="con_keyNunUnit">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>时效</text>
						</view>
					</view>
					<view class="con_num">
						<u-input v-model="minDay2" type="digit" input-align="center" height="80" placeholder="天数" />
					</view>
					<view class="con_line">
						<u-line length="90rpx" color="#000"></u-line>
					</view>
					<view class="con_num">
						<u-input v-model="maxDay2" type="digit" input-align="center" height="80" placeholder="天数" />
					</view>
					<view class="con_unit">
						<text>天</text>
					</view>
				</view>

				<view class="con_line">
					<u-line length="718rpx" color="#E5E5E5"></u-line>
				</view>

				<view class="con_keyVal">
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>纯重1:1单价</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="price1_2" type="digit" heigth="80" placeholder="输入价格" />
							</view>
							<view class="con_unit">
								<text>元/吨</text>
							</view>
						</view>
					</view>
					<view class="con_line">
						<u-line length="718rpx" color="#E5E5E5"></u-line>
					</view>
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>重泡1:3单价</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="price3_2" type="digit" heigth="80" placeholder="输入价格" />
							</view>
							<view class="con_unit">
								<text>元/吨</text>
							</view>
						</view>
					</view>
					<view class="con_line">
						<u-line length="718rpx" color="#E5E5E5"></u-line>
					</view>
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>重泡1:6单价</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="price6_2" type="digit" heigth="80" placeholder="输入价格" />
							</view>
							<view class="con_unit">
								<text>元/立方</text>
							</view>
						</view>
					</view>
					<view class="con_line">
						<u-line length="718rpx" color="#E5E5E5"></u-line>
					</view>
					<view class="con_key_val">
						<view class="con_key">
							<view class="con_required">
								<text>*</text>
							</view>
							<view class="con_text">
								<text>重泡1:10单价</text>
							</view>
						</view>
						<view class="con_val">
							<view class="con_input">
								<u-input v-model="price10_2" type="digit" heigth="80" placeholder="输入价格" />
							</view>
							<view class="con_unit">
								<text>元/立方</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="con_item">
				<view class="con_shTh">
					<view class="con_title">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>提货/配送方式</text>
						</view>
					</view>
					<view class="con_line">
						<u-line length="718rpx" color="#E5E5E5"></u-line>
					</view>
					<view class="con_checkbox">
						<u-checkbox-group shape="circle">
							<u-checkbox v-model="th_status" name="th">
								<view class="con_label_keyVal">
									<view class="con_label">
										<text>上门提货</text>
									</view>
									<view class="con_keyVal">
										<view class="con_key">
											<view class="con_required">
												<text>*</text>
											</view>
											<view class="con_text">
												<text>提货费</text>
											</view>
										</view>
										<view class="con_val">
											<view class="con_input">
												<u-input v-model="th_price" type="digit" heigth="60" placeholder="单价" />
											</view>
											<view class="con_unit">
												<text>元</text>
											</view>
										</view>
									</view>
								</view>
							</u-checkbox>
							<u-checkbox v-model="sh_status" name="th">
								<view class="con_label_keyVal">
									<view class="con_label">
										<text>送货上门</text>
									</view>
									<view class="con_keyVal">
										<view class="con_key">
											<view class="con_required">
												<text>*</text>
											</view>
											<view class="con_text">
												<text>送货费</text>
											</view>
										</view>
										<view class="con_val">
											<view class="con_input">
												<u-input v-model="sh_price" type="digit" heigth="60" placeholder="单价" />
											</view>
											<view class="con_unit">
												<text>元</text>
											</view>
										</view>
									</view>
								</view>
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>

			</view>
		</view>



		<view class="con_nextSaveBtn" @click="nextSave">
			<text v-if="step == 1">下一步</text>
			<text v-if="step == 2">保存</text>
		</view>

		<!-- <view class="con_PcaSelect">
			<u-select v-model="areaShow" mode="mutil-column-auto" :list="provinceCityAreaList" value-name="city_code"
				label-name="city_name" child-name="children" :default-value="[provinceIndex,cityIndex,areaIndex]"
				@confirm="confirmArea"></u-select>
		</view> -->

		<view class="con_popup">
			<view class="con_GTPCA">
				<u-popup v-model="GTPCAShowS" mode="bottom" height="600">
					<gtPCA :pcaList="provinceCityAreaList" :height="height" :show="GTPCAShowS" :selectedList="fromPca"
						:allArea="false" @gtPCASelect="gtPCASelect"></gtPCA>
				</u-popup>
			</view>
			<view class="con_GTPCA">
				<u-popup v-model="GTPCAShowE" mode="bottom" height="600">
					<gtPCA :pcaList="provinceCityAreaList" :height="height" :show="GTPCAShowE" :selectedList="toPca"
						:allArea="true" @gtPCASelect="gtPCASelect"></gtPCA>
				</u-popup>
			</view>
			<view class="con_GTPCA">
				<u-popup v-model="GTPCAShow" mode="bottom" height="600">
					<gtPCA :pcaList="provinceCityAreaList" :height="height" :show="GTPCAShow" :selectedList="arrivePca"
						:allArea="false" @gtPCASelect="confirmArea"></gtPCA>
				</u-popup>
			</view>
		</view>


	</view>
</template>

<script>
	import gtPCA from "@/components/gt-pca/gt-pca.vue";
	import find from "lodash/find";
	export default {
		components: {
			gtPCA: gtPCA,
		},
		data() {
			return {
				id: 0,
				startArea: '',

				step: 1,

				height: '',


				fromPca: [
					[{
						cityName: '',
					}],
					[{
						cityName: '',
					}],
					[{
						cityName: '',
					}],

				],

				toPca: [
					[{
						cityName: '',
					}],
					[{
						cityName: '',
					}],
					[{
						cityName: '',
					}],
				],

				arrivePca: [
					[{
						cityName: '',
					}],
					[{
						cityName: '',
					}],
					[{
						cityName: '',
					}],
				],


				GTPCAShowS: false,
				GTPCAShowE: false,
				fromTo: 's',

				GTPCAShow: false,








				manageName: '',
				manageMobile: '',
				lineType: 1,

				arriveStationList: [{
					id: '',
					company: '',
					manage: '',
					mobile: '',
					address: '',
					lng: '',
					lat: '',
					pca: '',
					provinceStr: '',
					// provinceCode: '',
					cityStr: '',
					// cityCode: '',
					areaStr: '',
					// areaCode: '',
				}],
				num: 0,
				break: false,



				quotationSwitch: true,

				minDay1: '',
				maxDay1: '',
				price1_1: '',
				price3_1: '',
				price6_1: '',
				price10_1: '',
				minDay2: '',
				maxDay2: '',
				price1_2: '',
				price3_2: '',
				price6_2: '',
				price10_2: '',

				th_status: true,
				th_price: '',
				sh_status: true,
				sh_price: '',


				// provinceCityAreaList: [],
				areaShow: false,
				provinceIndex: 0,
				cityIndex: 0,
				areaIndex: 0,
				currentItemArriveStation: 0,

				arriveStationArr: [],


			}
		},
		onLoad(options) {
			let gt = this;

			// var list = uni.getStorage('pcaList')
			uni.getStorage({
				key: 'pcaList',
				success: function(res) {
					gt.provinceCityAreaList = res.data;
					if (options.startArea) {
						var startArea = JSON.parse(options.startArea)
						console.log(startArea)
						gt.getStartArea(startArea)
					}
				},

			});
			if (options.id) {
				gt.id = options.id;
				gt.getDataInfo();
			}
		},
		methods: {

			manageMobileInput(res) {
				console.log(res);
				let gt = this;
				gt.manageMobile = res;
			},
			gtPCASelect(res) {
				console.log(res);
				console.log(res.length);
				if (res.length == 10) {
					return false;
				}

				let gt = this;
				if (gt.fromTo == 's') {
					if (res.length > 10) {
						gt.fromPca = JSON.parse(res);
					} else {
						gt.fromPca = [
							[],
							[{
								cityName: ''
							}],
							[]
						];
					}
				}
				if (gt.fromTo == 'e') {
					if (res.length > 10) {
						gt.toPca = JSON.parse(res);
						gt.arriveStationList = [{
							id: '',
							company: '',
							manage: '',
							mobile: '',
							address: '',
							lng: '',
							lat: '',
							pca: gt.toPca[0][0].cityName + '-' + gt.toPca[1][0].cityName + '-' + gt.toPca[2][0]
								.cityName,

							provinceStr: gt.toPca[0][0].cityName,
							// provinceCode: '',
							cityStr: gt.toPca[1][0].cityName,
							// cityCode: '',
							areaStr: gt.toPca[2][0].cityName,
							// areaCode: '',
						}]
					} else {
						gt.toPca = [
							[],
							[{
								cityName: ''
							}],
							[]
						];
					}
				}
			},
			getDataInfo() {
				let gt = this;
				var url = "/logistics/specialline/get_special_line_info";
				var data = {
					line_id: gt.id,
				};
				gt.gtRequest.post(url, data).then(res => {
					var info = res.info;
					gt.break = false;
					var fromPca = [];
					var provinceItem = find(gt.provinceCityAreaList, ['city_name', info.start_province])
					if (provinceItem) {
						fromPca.push([{
							cityCode: provinceItem.city_code,
							cityName: provinceItem.city_name,
							cityType: provinceItem.city_type,
							parentCode: provinceItem.parent_code,
							selected: true,
						}]);
						var cityItem = find(provinceItem.children, ['city_name', info.start_city])
						if (cityItem) {
							fromPca.push([{
								cityCode: cityItem.city_code,
								cityName: cityItem.city_name,
								cityType: cityItem.city_type,
								parentCode: cityItem.parent_code,
								selected: true,
							}]);
							var areaItem = find(cityItem.children, ['city_name', info.start_county])
							if (areaItem) {
								fromPca.push([{
									cityCode: areaItem.city_code,
									cityName: areaItem.city_name,
									cityType: areaItem.city_type,
									parentCode: areaItem.parent_code,
									selected: true,
								}])
							}
						}
					}
					gt.fromPca = fromPca;

					gt.break = false;
					var toPca = [];
					var toProvinceItem = find(gt.provinceCityAreaList, ['city_name', info.end_province])
					if (toProvinceItem) {
						toPca.push([{
							cityCode: toProvinceItem.city_code,
							cityName: toProvinceItem.city_name,
							cityType: toProvinceItem.city_type,
							parentCode: toProvinceItem.parent_code,
							selected: true,
						}]);
						var toCityItem = find(toProvinceItem.children, ['city_name', info.end_city])
						if (toCityItem) {
							toPca.push([{
								cityCode: toCityItem.city_code,
								cityName: toCityItem.city_name,
								cityType: toCityItem.city_type,
								parentCode: toCityItem.parent_code,
								selected: true,
							}]);
							var areaArr = info.end_county.split(',');
							var area2 = [];
							for (var m = 0; m < areaArr.length; m++) {
								var toAreaItem = find(toCityItem.children, ['city_name', areaArr[m]]);
								if (toAreaItem) {
									area2.push({
										cityCode: toAreaItem.city_code,
										cityName: toAreaItem.city_name,
										cityType: toAreaItem.city_type,
										parentCode: toAreaItem.parent_code,
										selected: true,
									});
								}

							}
							if (area2.length) {
								toPca.push(area2);
							}
							gt.break = true;
						}
					}
					gt.toPca = toPca;

					var arriveStationList = [];
					for (var i = 0; i < info.outlets_list.length; i++) {
						var item = {};
						item.id = info.outlets_list[i].outlets_id;
						item.company = info.outlets_list[i].outlets_name;
						item.manage = info.outlets_list[i].outlets_contact;
						item.mobile = info.outlets_list[i].outlets_mobile;
						item.address = info.outlets_list[i].outlets_address;
						item.lng = info.outlets_list[i].outlets_longitude;
						item.lat = info.outlets_list[i].outlets_latitude;
						item.pca = info.outlets_list[i].outlets_province + '-' + info.outlets_list[i]
							.outlets_city + '-' + info.outlets_list[i].outlets_county;
						item.provinceStr = info.outlets_list[i].outlets_province;
						item.cityStr = info.outlets_list[i].outlets_city;
						item.areaStr = info.outlets_list[i].outlets_county;

						arriveStationList.push(item);
					}

					var general_price_obj = JSON.parse(info.general_price_json);
					var fast_price_obj = JSON.parse(info.fast_price_json);

					gt.manageName = info.line_contact;
					gt.manageMobile = info.line_mobile;
					gt.lineType = info.line_type;
					gt.arriveStationList = arriveStationList;

					// gt.arriveStationArr = info.outlets_ids.split(',');

					gt.quotationSwitch = info.price_show_status == 1 ? true : false;
					gt.minDay1 = info.general_day_min;
					gt.maxDay1 = info.general_day_max;
					gt.price1_1 = general_price_obj.P1;
					gt.price3_1 = general_price_obj.P3;
					gt.price6_1 = general_price_obj.P6;
					gt.price10_1 = general_price_obj.P10;

					gt.minDay2 = info.fast_day_min;
					gt.maxDay2 = info.fast_day_max;
					gt.price1_2 = fast_price_obj.P1;
					gt.price3_2 = fast_price_obj.P3;
					gt.price6_2 = fast_price_obj.P6;
					gt.price10_2 = fast_price_obj.P10;

					gt.th_status = info.self_status == 1 ? true : false;
					gt.th_price = info.self_price;
					gt.sh_status = info.dispatch_status == 1 ? true : false;
					gt.sh_price = info.dispatch_price;
				});
			},
			getStartArea(startArea) {
				let gt = this;
				var fromPca = [];
				var provinceItem = find(gt.provinceCityAreaList, ['city_name', startArea.start_province])
				console.log(gt.provinceCityAreaList)
				if (provinceItem) {
					fromPca.push([{
						cityCode: provinceItem.city_code,
						cityName: provinceItem.city_name,
						cityType: provinceItem.city_type,
						parentCode: provinceItem.parent_code,
						selected: true,
					}]);
					var cityItem = find(provinceItem.children, ['city_name', startArea.start_city])
					if (cityItem) {
						fromPca.push([{
							cityCode: cityItem.city_code,
							cityName: cityItem.city_name,
							cityType: cityItem.city_type,
							parentCode: cityItem.parent_code,
							selected: true,
						}]);
						var areaItem = find(cityItem.children, ['city_name', startArea.start_county])
						if (areaItem) {
							fromPca.push([{
								cityCode: areaItem.city_code,
								cityName: areaItem.city_name,
								cityType: areaItem.city_type,
								parentCode: areaItem.parent_code,
								selected: true,
							}])
						}
					}
				}
				gt.fromPca = fromPca;
				console.log(gt.fromPca)
			},
			showGTPCA(str) {
				let gt = this;
				gt.fromTo = str;
				gt.allArea = str == 's' ? false : true;
				gt.height = '600rpx';
				gt.GTPCAShowS = str == 'e' ? false : true;
				gt.GTPCAShowE = str == 's' ? false : true;
			},

			addArriveStation() {
				let gt = this;
				var arriveStationItem = {
					id: '',
					company: '',
					manage: '',
					mobile: '',
					address: '',
					lng: '',
					lat: '',
					pca: gt.toPca[0][0].cityName + '-' + gt.toPca[1][0].cityName + '-' + gt.toPca[2][0].cityName,

					provinceStr: gt.toPca[0][0].cityName,
					// provinceCode: '',
					cityStr: gt.toPca[1][0].cityName,
					// cityCode: '',
					areaStr: gt.toPca[2][0].cityName,
					// areaCode: '',
				};
				gt.arriveStationList.push(arriveStationItem);
			},
			removeArriveStation(index) {
				let gt = this;
				uni.showModal({
					title: '提示',
					content: '确定删除该到站公司吗?',
					success: function(res) {
						if (res.confirm) {
							gt.arriveStationList.splice(index, 1);
							if (gt.arriveStationList[index].id) {
								gt.arriveStationArr.splice(index, 1);
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			showGTPCA2(index) {
				console.log(index);
				let gt = this;
				gt.currentItemArriveStation = index;

				gt.GTPCAShow = true;


				// if (gt.arriveStationList[index].areaStr) {

				// 	var provinceList = gt.provinceCityAreaList;
				// 	for (var i = 0; i < provinceList.length; i++) {
				// 		if (provinceList[i].city_name == gt.arriveStationList[index].provinceStr) {
				// 			var cityList = provinceList[i].children;
				// 			gt.provinceIndex = i;
				// 			break;
				// 		}
				// 	}
				// 	for (var j = 0; j < cityList.length; j++) {
				// 		if (cityList[j].city_name == gt.arriveStationList[index].cityStr) {
				// 			var areaList = cityList[j].children;
				// 			gt.cityIndex = j;
				// 			break;
				// 		}
				// 	}
				// 	for (var m = 0; m < areaList.length; m++) {
				// 		if (areaList[m].city_name == gt.arriveStationList[index].areaStr) {
				// 			gt.areaIndex = m;
				// 			break;
				// 		}
				// 	}
				// } else {
				// 	gt.provinceIndex = 0;
				// 	gt.cityIndex = 0;
				// 	gt.areaIndex = 0;
				// }
				// gt.areaShow = true;
			},
			confirmArea(e) {
				console.log(e);
				let gt = this;
				var index = gt.currentItemArriveStation;

				var arr = JSON.parse(e);
				console.log(arr);
				if (arr[0][0]) {
					gt.arriveStationList[index].provinceStr = arr[0][0].cityName;
					gt.arriveStationList[index].cityStr = arr[1][0].cityName;
					gt.arriveStationList[index].areaStr = arr[2][0].cityName;
					gt.arriveStationList[index].pca = arr[0][0].cityName + '-' + arr[1][0].cityName + '-' + arr[2][
						0
					].cityName;
				}
			},

			chooseAddress(index) {
				let gt = this;
				if (gt.arriveStationList[index].lng) {
					uni.chooseLocation({
						latitude: gt.arriveStationList[index].lat,
						longitude: gt.arriveStationList[index].lng,
						success: function(res) {
							if (res.errMsg == 'chooseLocation:ok') {
								gt.arriveStationList[index].address = res.address;
								gt.arriveStationList[index].lat = res.latitude;
								gt.arriveStationList[index].lng = res.longitude;
							}

						}
					});
				} else {
					uni.chooseLocation({
						success: function(res) {
							if (res.errMsg == 'chooseLocation:ok') {
								gt.arriveStationList[index].address = res.address;
								gt.arriveStationList[index].lat = res.latitude;
								gt.arriveStationList[index].lng = res.longitude;
							}

						}
					});
				}

			},
			async nextSave() {
				let gt = this;
				if (gt.step == 1) {

					if (gt.$u.test.isEmpty(gt.manageName)) {
						gt.$refs.uToast.show({
							title: '专线经理不能为空！',
							type: 'error',
						});
						return false;
					}

					if (gt.$u.test.isEmpty(gt.manageMobile)) {
						gt.$refs.uToast.show({
							title: '经理手机不能为空！',
							type: 'error',
						});
						return false;
					}
					if (!gt.$u.test.mobile(gt.manageMobile)) {
						gt.$refs.uToast.show({
							title: '经理手机格式不正确！',
							type: 'error',
						});
						return false;
					}

					// gt.step++;
					// return false;

					var url = "/logistics/specialline/add_outlets";
					gt.break = false;


					for (var i = 0; i < gt.arriveStationList.length; i++) {
						if (gt.break) {
							break;
						}
						var item = gt.arriveStationList[i];
						var data = {
							outlets_name: item.company,
							outlets_contact: item.manage,
							outlets_mobile: item.mobile,
							outlets_province: item.provinceStr,
							outlets_city: item.cityStr,
							outlets_county: item.areaStr,
							outlets_address: item.address,
							outlets_latitude: item.lat,
							outlets_longitude: item.lng,
						};
						await gt.gtRequest.post(url, data).then(res => {
							gt.arriveStationArr.push(res.outlets_id);
							gt.num++;
						}).catch(res => {
							gt.break = true;
							gt.$refs.uToast.show({
								title: res,
								type: 'error',
							});
							return false;

						});
					}
					if (gt.num == gt.arriveStationList.length) {
						gt.step++;
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 300
						});
					}


				} else {
					// gt.step--;

					if (gt.id) {
						var url = "/logistics/specialline/edit_special_line";
					} else {
						var url = "/logistics/specialline/add_special_line";
					}


					var price1 = '{"P1":"' + gt.price1_1 + '","P3":"' + gt.price3_1 + '","P6":"' + gt
						.price6_1 +
						'","P10":"' + gt.price10_1 + '"}';
					var price2 = '{"P1":"' + gt.price1_2 + '","P3":"' + gt.price3_2 + '","P6":"' + gt
						.price6_2 +
						'","P10":"' + gt.price10_2 + '"}';


					var toArea = '';
					for (var i = 0; i < gt.toPca[2].length; i++) {
						toArea += gt.toPca[2][i].cityName + ','
					}
					// toArea = 

					var data = {
						line_contact: gt.manageName,
						line_mobile: gt.manageMobile,
						start_province: gt.fromPca[0][0].cityName,
						start_city: gt.fromPca[1][0].cityName,
						start_county: gt.fromPca[2][0].cityName,
						end_province: gt.toPca[0][0].cityName,
						end_city: gt.toPca[1][0].cityName,
						end_county: toArea.substring(0, toArea.length - 1),
						general_day_min: gt.minDay1,
						general_day_max: gt.maxDay1,
						general_price_json: price1,
						fast_day_min: gt.minDay2,
						fast_day_max: gt.maxDay2,
						fast_price_json: price2,
						dispatch_status: gt.sh_status ? 1 : 0,
						dispatch_price: gt.sh_price,
						self_status: gt.th_status ? 1 : 0,
						self_price: gt.th_price,
						outlets_ids: gt.arriveStationArr.join(','),
						price_show_status: gt.quotationSwitch ? 1 : 0,
						line_type: gt.lineType,
					};

					if (gt.id) {
						data.line_id = gt.id;
					}
					// return false;
					gt.gtRequest.post(url, data).then(res => {
						gt.$refs.uToast.show({
							title: '保存成功！',
							type: 'success',
							back: true,
						});
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_step1 {

				.con_title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
					margin: 40rpx 0 0 16rpx;
				}

				.con_item {
					width: 718rpx;
					// height: 484rpx;
					background: #FFFFFF;
					border-radius: 16rpx;
					margin: 20rpx 0 0 16rpx;
					padding: 1rpx;

					.con_fromTo {
						display: flex;
						margin: 40rpx 24rpx 0 24rpx;

						.con_from {
							width: 272rpx;
							background: #F4F4F4;
							border-radius: 8rpx;
							padding: 6rpx 24rpx;

						}

						.con_icon {
							width: 60rpx;
							height: 24rpx;
							margin: 28rpx 32rpx 0 32rpx;
						}

						.con_to {
							width: 272rpx;
							background: #F4F4F4;
							border-radius: 8rpx;
							padding: 6rpx 24rpx;

						}
					}

					.con_removeBtn {

						float: right;
						margin-top: -24rpx;
					}

					.con_keyVal {
						margin: 44rpx 25rpx 0 25rpx;

						.con_key_val {
							display: flex;
							justify-content: space-between;
							margin: 16rpx 0;

							.con_key {
								display: flex;

								.con_required {
									font-size: 28rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #FF6067;
									line-height: 80rpx;
								}

								.con_text {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 80rpx;
								}
							}

							.con_val {
								display: flex;
								width: 500rpx;
								// height: 80rpx;
								background: #F4F4F4;
								border-radius: 8rpx;
								padding: 0 24rpx;

								.con_input {
									width: 480rpx;
								}

								.con_icon {
									margin-top: 30rpx;
								}
							}
						}
					}

					.con_radio {
						margin: 16rpx 25rpx 40rpx 25rpx;
					}
				}

				.con_addBtn {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #485EF4;
					line-height: 40rpx;
					margin-top: 40rpx;
					text-align: center;
				}


			}

			.con_step2 {
				.con_title_switch {
					display: flex;
					justify-content: space-between;
					margin: 40rpx 40rpx 0 16rpx;

					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 50rpx;
					}

					.con_switch {
						display: flex;

						text {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 50rpx;
							margin-right: 20rpx;
						}
					}
				}

				.con_item {
					width: 718rpx;
					background: #FFFFFF;
					border-radius: 16rpx;
					margin: 20rpx 16rpx 0 16rpx;
					padding: 1rpx;

					.con_keyLabel {
						margin: 22rpx 24rpx;

						.con_key_label {
							display: flex;

							.con_key {
								display: flex;

								.con_required {
									font-size: 28rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #FF6067;
									line-height: 44rpx;
								}

								.con_text {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 44rpx;
								}
							}

							.con_label {
								width: 78rpx;
								height: 44rpx;
								background: #485EF4;
								border-radius: 8rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #FFFFFF;
								line-height: 44rpx;
								margin-left: 40rpx;
								text-align: center;
							}
						}
					}

					.con_keyNunUnit {
						display: flex;

						margin: 22rpx 24rpx;

						.con_key {
							display: flex;

							.con_required {
								font-size: 28rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #FF6067;
								line-height: 80rpx;
							}

							.con_text {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 80rpx;
							}
						}

						.con_num {
							width: 200rpx;
							// height: 80rpx;
							background: #F4F4F4;
							border-radius: 8rpx;
							margin: 0 18rpx;
						}

						.con_line {
							margin-top: 40rpx;
						}

						.con_unit {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 80rpx;
							// margin-left: 20rpx;
						}

					}

					.con_keyVal {

						.con_key_val {
							margin: 22rpx 24rpx;

							display: flex;
							justify-content: space-between;

							.con_key {
								display: flex;

								.con_required {
									font-size: 28rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #FF6067;
									line-height: 80rpx;
								}

								.con_text {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 80rpx;
								}
							}

							.con_val {
								display: flex;

								.con_input {
									width: 314rpx;
									height: 80rpx;
									background: #F4F4F4;
									border-radius: 8rpx;
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #909399;
									line-height: 80rpx;
									padding: 0 20rpx;
								}

								.con_unit {
									width: 100rpx;
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 80rpx;
									margin-left: 48rpx;
									text-align: right;
								}
							}
						}
					}

					.con_shTh {
						padding: 1rpx;

						.con_title {
							display: flex;
							margin: 22rpx 24rpx;

							.con_required {
								font-size: 28rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #FF6067;
								line-height: 44rpx;
							}

							.con_text {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 44rpx;
							}
						}

						.con_checkbox {
							padding: 24rpx;

							.con_label_keyVal {
								display: flex;
								justify-content: space-between;
								width: 600rpx;

								.con_label {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 80rpx;
								}

								.con_keyVal {
									display: flex;

									.con_key {
										display: flex;

										.con_required {
											font-size: 28rpx;
											font-family: PingFangSC-Medium, PingFang SC;
											font-weight: 500;
											color: #FF6067;
											line-height: 80rpx;
										}

										.con_text {
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #000000;
											line-height: 80rpx;
										}
									}

									.con_val {
										display: flex;
										margin-left: 16rpx;

										.con_input {
											width: 250rpx;
											height: 60rpx;
											background: #F4F4F4;
											border-radius: 8rpx;
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #909399;
											line-height: 60rpx;
											padding: 0 20rpx;
										}

										.con_unit {
											width: 30rpx;
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #000000;
											line-height: 80rpx;
											margin-left: 8rpx;
											text-align: right;
										}
									}
								}
							}
						}
					}

				}

			}

			.con_nextSaveBtn {
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
				margin: 46rpx 16rpx 20rpx 16rpx;
			}

			.cancel_btn {
				position: absolute;
				display: inline-block;
				top: 5rpx;
				left: 30rpx;
			}

			.confirm_btn {
				position: absolute;
				display: inline-block;
				top: 5rpx;
				right: 30rpx;
			}
		}
	}
</style>