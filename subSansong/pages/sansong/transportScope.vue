<template>
	<view class="gt_content">

		<view class="con_fromTo" v-if="fromTo">
			<text>{{fromTo}}</text>
		</view>


		<view class="con_title">
			<view class="con_item">
				<text>省份</text>
			</view>
			<view class="con_item">
				<text>城市</text>
			</view>
			<view class="con_item">
				<text>区县</text>
			</view>
		</view>


		<view class="con_list">
			<view class="con_pca">
				<scroll-view :scroll-y="true" :scroll-into-view="provinceScrollInto">
					<view class="con_item u-line-1" :class="item.selected ? 'item_selected' : ''"
						v-for="(item,index) in provinceList" :key="index" :id="'pScroll_' + item.cityCode"
						@click="selectItem2(item)">
						<view class="con_icon_text">
							<view class="con_icon" v-if="item.selected">
								<u-icon name="checkbox-mark" color="#485EF4"></u-icon>
							</view>
							<view class="con_text">
								{{item.cityName}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="con_pca">
				<scroll-view :scroll-y="true" :scroll-into-view="cityScrollInto">
					<view class="con_item u-line-1" :class="item.selected ? 'item_selected' : ''"
						v-for="(item,index) in cityList" :key="index" :id="'cScroll_' + item.cityCode"
						@click="selectItem2(item)">
						<view class="con_icon_text">
							<view class="con_icon" v-if="item.selected">
								<u-icon name="checkbox-mark" color="#485EF4"></u-icon>
							</view>
							<view class="con_text">
								{{item.cityName}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="con_pca">
				<scroll-view :scroll-y="true" :scroll-into-view="areaScrollInto">
					<view class="con_item u-line-1" :class="item.selected ? 'item_selected' : ''"
						v-for="(item,index) in areaList" :key="index" :id="'aScroll_' + item.cityCode"
						@click="selectItem2(item)">
						<view class="con_icon_text">
							<view class="con_icon" v-if="item.selected">
								<u-icon name="checkbox-mark" color="#485EF4"></u-icon>
							</view>
							<view class="con_text">
								{{item.cityName}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				lineId: 0,
				fromTo: '',
				
				allArea:false,

				pcaList: [],

				provinceList: [],
				cityList: [],
				areaList: [],

				provinceScrollInto: 0,
				cityScrollInto: 0,
				areaScrollInto: 0,

				provinceSelected: [],
				citySelected: [],
				areaSelected: [],

				break: false,

				selectedList: [],

			}
		},
		onLoad(options) {
			console.log(options.lineId);
			let gt = this;
			if (options.lineId) {
				gt.lineId = options.lineId;
				setTimeout(function() {
					gt.getLineInfo();
				}, 500);
			}



			gt.getDataList();
		},
		onShow() {
			let gt = this;


		},
		methods: {
			getLineInfo() {
				let gt = this;
				var url = "/logistics/specialline/get_special_line_info";
				var data = {
					line_id: gt.lineId,
				};
				gt.gtRequest.post(url, data).then(res => {
					// var info = res.info;
					gt.fromTo = res.info.start_city + ' - ' + res.info.end_city;

					for (var i = 0; i < gt.pcaList.length; i++) {
						// if(gt.pcaList[i].city_name == res.info.end_province){
						// 	gt.selectItem(gt.pcaList[i]);
						// }
						for (var j = 0; j < gt.pcaList[i].children.length; j++) {
							if (gt.pcaList[i].children[j].city_name == res.info.end_city) {
								gt.selectItem(gt.pcaList[i].children[j]);
							}
						}
					}
				})
			},
			getDataList() {
				let gt = this;
				var url = "/logistics/specialline/get_special_line_range";


				gt.gtRequest.post(url).then(res => {
					var list = [];
					for (var i = 0; i < res.range.length; i++) {
						var item1 = {
							city_code: '1_' + i,
							city_name: res.range[i].name,
							city_type: 1,
							parent_code: 0,
							selected: false,
						};
						var list2 = [];
						for (var j = 0; j < res.range[i].child.length; j++) {
							var item2 = {
								city_code: '2_' + i + '_' + j,
								city_name: res.range[i].child[j].name,
								city_type: 2,
								parent_code: '1_' + i,
								selected: false,
							};
							var list3 = [];
							for (var k = 0; k < res.range[i].child[j].child.length; k++) {
								var item3 = {
									city_code: '3_' + i + '_' + j + '_' + k,
									city_name: res.range[i].child[j].child[k].name,
									city_type: 3,
									parent_code: '2_' + i + '_' + j,
									selected: false,
								};
								list3.push(item3);
							}
							item2.children = list3;

							list2.push(item2);
						}
						item1.children = list2;
						list.push(item1);

					}
					// console.log(list);

					gt.pcaList = list;
					gt.init();
				});
			},

			init() {

				let gt = this;
				var provinceList = gt.pcaList;
				// console.log(provinceList);

				for (var i = 0; i < provinceList.length; i++) {
					var provinceItem = {
						cityCode: provinceList[i].city_code,
						cityName: provinceList[i].city_name,
						cityType: provinceList[i].city_type,
						parentCode: provinceList[i].parent_code,
						selected: false,
					};
					gt.provinceList.push(provinceItem);
				}

				if (gt.selectedList.length == 0 || gt.selectedList.length == 3) {
					var firstProvince = {
						cityCode: provinceList[0].city_code,
						cityName: provinceList[0].city_name,
						cityType: provinceList[0].city_type,
						parentCode: provinceList[0].parent_code,
						selected: false,
					};
					var firstCity = {
						cityCode: provinceList[0].children[0].city_code,
						cityName: provinceList[0].children[0].city_name,
						cityType: provinceList[0].children[0].city_type,
						parentCode: provinceList[0].children[0].parent_code,
						selected: false,
					};

					gt.cityList = gt.getChildren(firstProvince);
					gt.areaList = gt.getChildren(firstCity);
				} else {
					gt.cityList = gt.getChildren(gt.selectedList[0][0]);
					gt.areaList = gt.getChildren(gt.selectedList[1][0]);
				}
			},

			getChildren(item) {
				let gt = this;
				var children = [];
				if (item.cityType == 1) {
					for (var i = 0; i < gt.pcaList.length; i++) {
						if (gt.pcaList[i].city_code == item.cityCode) {
							for (var j = 0; j < gt.pcaList[i].children.length; j++) {
								var cityItem = {
									cityCode: gt.pcaList[i].children[j].city_code,
									cityName: gt.pcaList[i].children[j].city_name,
									cityType: gt.pcaList[i].children[j].city_type,
									parentCode: gt.pcaList[i].children[j].parent_code,
									selected: false,
								};
								children.push(cityItem);
							}

							return children;
						}
					}
				}
				if (item.cityType == 2) {
					for (var i = 0; i < gt.pcaList.length; i++) {
						for (var j = 0; j < gt.pcaList[i].children.length; j++) {
							if (gt.pcaList[i].children[j].city_code == item.cityCode) {
								if (gt.allArea) {
									children.push({
										cityCode: 0,
										cityName: '全市',
										cityType: 3,
										parentCode: item.cityCode,
										selected: false,
									});
								}
								for (var k = 0; k < gt.pcaList[i].children[j].children.length; k++) {
									var areaItem = {
										cityCode: gt.pcaList[i].children[j].children[k].city_code,
										cityName: gt.pcaList[i].children[j].children[k].city_name,
										cityType: gt.pcaList[i].children[j].children[k].city_type,
										parentCode: gt.pcaList[i].children[j].children[k].parent_code,
										selected: false,
									};
									children.push(areaItem);
								}
								return children;
							}
						}
					}
				}
			},
			getParent(item) {
				let gt = this;
				if (item.cityType == 2) {
					for (var i = 0; i < gt.provinceList.length; i++) {
						if (gt.provinceList[i].cityCode == item.parentCode) {
							return gt.provinceList[i];
						}
					}
				}
				if (item.cityType == 3) {
					for (var i = 0; i < gt.cityList.length; i++) {
						if (gt.cityList[i].cityCode == item.parentCode) {
							return gt.cityList[i];
						}
					}
				}
			},
			selectItem(item) {
				console.log(item);

				let gt = this;
				var selected = !item.selected;

				if (item.cityType == 1) {
					var cityList = gt.getChildren(item);
					gt.cityList = cityList;
					var areaList = gt.getChildren(cityList[0]);
					gt.areaList = areaList;

				}
				if (item.cityType == 2) {
					var areaList = gt.getChildren(item);
					gt.areaList = areaList;
				}

				gt.selectdPCA(item, selected);
			},
			selectItem2(item) {
				console.log(item);
				let gt = this;
				// var selected = !item.selected;

				if (item.cityType == 1) {
					var cityList = gt.getChildren(item);
					console.log(cityList);
					gt.cityList = cityList;
					var areaList = gt.getChildren(cityList[0]);
					console.log(areaList);
					gt.areaList = areaList;


				}
				if (item.cityType == 2) {
					var areaList = gt.getChildren(item);
					gt.areaList = areaList;
				}

				// gt.selectdPCA(item, selected);
			},
			selectdPCA(item, selected) {
				let gt = this;
				console.log(selected);


				gt.provinceList.map(ite => {
					ite.selected = false;
				});
				gt.cityList.map(ite => {
					ite.selected = false;
				});
				if (!gt.allArea) {
					gt.areaList.map(ite => {
						ite.selected = false;
					});
				}

				item.selected = selected;
				if (item.cityType == 1) {
					gt.cityList[0].selected = selected;
					if (gt.allArea) {
						gt.areaList[1].selected = selected;
					} else {
						gt.areaList[0].selected = selected;
					}
				}
				if (item.cityType == 2) {
					if (gt.allArea) {
						gt.areaList[1].selected = selected;
					} else {
						gt.areaList[0].selected = selected;
					}
					var provinceItem = gt.getParent(item);


					provinceItem.selected = selected;
				}
				if (item.cityType == 3) {
					var cityItem = gt.getParent(item);
					var provinceItem = gt.getParent(cityItem);
					if (gt.allArea) {
						if (item.cityCode == 0) {
							gt.areaList.map(ite => {
								ite.selected = selected;
							});
							cityItem.selected = selected;
							provinceItem.selected = selected;
						} else {
							var num = 0;
							for (var i = 0; i < gt.areaList.length; i++) {


								if (gt.areaList[i].cityCode && gt.areaList[i].selected) {
									num++;
								}
							}
							if (num == gt.areaList.length - 1) {
								gt.areaList[0].selected = true;
							} else {
								gt.areaList[0].selected = false;
							}
							if (num) {
								cityItem.selected = true;
								provinceItem.selected = true;
							} else {
								cityItem.selected = false;
								provinceItem.selected = false;
							}
						}

					} else {

						cityItem.selected = selected;
						provinceItem.selected = selected;
					}
				}
				console.log(item);

				gt.scrollPCA(item);
			},
			scrollPCA(item) {
				let gt = this;

				gt.provinceScrollInto = 'pScroll_0';
				gt.cityScrollInto = 'cScroll_0';
				gt.areaScrollInto = 'aScroll_0';


				setTimeout(function() {
					if (item.cityType == 1) {
						gt.provinceScrollInto = 'pScroll_' + item.cityCode;
						gt.cityScrollInto = 'cScroll_' + gt.cityList[0].cityCode;
						if (gt.allArea) {
							gt.areaScrollInto = 'aScroll_' + gt.areaList[1].cityCode;
						} else {
							gt.areaScrollInto = 'aScroll_' + gt.areaList[0].cityCode;
						}
					}
					if (item.cityType == 2) {
						var provinceItem = gt.getParent(item);
						gt.provinceScrollInto = 'pScroll_' + provinceItem.cityCode;
						gt.cityScrollInto = 'cScroll_' + item.cityCode;
						if (gt.allArea) {
							gt.areaScrollInto = 'aScroll_' + gt.areaList[1].cityCode;
						} else {
							gt.areaScrollInto = 'aScroll_' + gt.areaList[0].cityCode;
						}
					}
					if (item.cityType == 3) {
						var cityItem = gt.getParent(item);
						var provinceItem = gt.getParent(cityItem);
						gt.provinceScrollInto = 'pScroll_' + provinceItem.cityCode;
						gt.cityScrollInto = 'cScroll_' + cityItem.cityCode;
						gt.areaScrollInto = 'aScroll_' + item.cityCode;

					}
				}, 200);


			},
			searchPCA() {
				let gt = this;
				gt.break = false;

				if (gt.searchVal) {
					gt.provinceList.map(ite => {
						ite.selected = false;
					});
					gt.cityList.map(ite => {
						ite.selected = false;
					});
					gt.areaList.map(ite => {
						ite.selected = false;
					});
					for (var i = 0; i < gt.pcaList.length; i++) {
						if (gt.break) {
							break;
						}
						if (gt.pcaList[i].city_name.includes(gt.searchVal)) {
							var provinceItem = {
								cityCode: gt.pcaList[i].city_code,
								cityName: gt.pcaList[i].city_name,
								cityType: gt.pcaList[i].city_type,
								parentCode: gt.pcaList[i].parent_code,
								selected: false,
							};
							gt.cityList = gt.getChildren(provinceItem);
							gt.areaList = gt.getChildren(gt.cityList[0]);
							gt.scrollPCA(provinceItem);
							gt.break = true;
							break;
						}
						for (var j = 0; j < gt.pcaList[i].children.length; j++) {
							if (gt.break) {
								break;
							}
							if (gt.pcaList[i].children[j].city_name.includes(gt.searchVal)) {
								var provinceItem = {
									cityCode: gt.pcaList[i].city_code,
									cityName: gt.pcaList[i].city_name,
									cityType: gt.pcaList[i].city_type,
									parentCode: gt.pcaList[i].parent_code,
									selected: false,
								};
								var cityItem = {
									cityCode: gt.pcaList[i].children[j].city_code,
									cityName: gt.pcaList[i].children[j].city_name,
									cityType: gt.pcaList[i].children[j].city_type,
									parentCode: gt.pcaList[i].children[j].parent_code,
									selected: false,
								};
								gt.cityList = gt.getChildren(provinceItem);
								gt.areaList = gt.getChildren(cityItem);
								gt.scrollPCA(cityItem);
								gt.break = true;
								break;
							}
							for (var k = 0; k < gt.pcaList[i].children[j].children.length; k++) {
								if (gt.break) {
									break;
								}
								if (gt.pcaList[i].children[j].children[k].city_name.includes(gt.searchVal)) {
									var provinceItem = {
										cityCode: gt.pcaList[i].city_code,
										cityName: gt.pcaList[i].city_name,
										cityType: gt.pcaList[i].city_type,
										parentCode: gt.pcaList[i].parent_code,
										selected: false,
									};
									var cityItem = {
										cityCode: gt.pcaList[i].children[j].city_code,
										cityName: gt.pcaList[i].children[j].city_name,
										cityType: gt.pcaList[i].children[j].city_type,
										parentCode: gt.pcaList[i].children[j].parent_code,
										selected: false,
									};
									var areaItem = {
										cityCode: gt.pcaList[i].children[j].children[k].city_code,
										cityName: gt.pcaList[i].children[j].children[k].city_name,
										cityType: gt.pcaList[i].children[j].children[k].city_type,
										parentCode: gt.pcaList[i].children[j].children[k].parent_code,
										selected: false,
									};
									gt.cityList = gt.getChildren(provinceItem);
									gt.areaList = gt.getChildren(cityItem);
									gt.scrollPCA(areaItem, true);
									gt.break = true;
									break;
								}
							}
						}
					}
				} else {

				}


			}

		}
	}
</script>

<style lang="scss">
	page {
		.gt_content {

			.con_fromTo {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 44rpx;
				margin: 32rpx 0 50rpx 32rpx;
			}

			.con_title {
				display: flex;
				border-bottom: 2rpx solid #E5E5E5;

				.con_item {
					width: 250rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #909399;
					line-height: 44rpx;
					text-align: center;
				}
			}

			.con_list {
				display: flex;
				overflow: hidden;
				height: calc(100vh - 100rpx);

				.con_pca {
					width: 250rpx;

					scroll-view {
						height: 100%;

						.con_item {
							font-size: 28rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 80rpx;
							margin: 0 40rpx;
							width: 170rpx;

							// border: 1rpx solid red;
							.con_icon_text {
								display: flex;
							}
						}

						.item_selected {
							color: $gtProjectColor;
						}
					}
				}

				.con_pca:nth-child(2) {
					border-left: 2rpx solid #E5E5E5;
					border-right: 2rpx solid #E5E5E5;
				}
			}
		}
	}
</style>