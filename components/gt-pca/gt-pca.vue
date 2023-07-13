<template>
	<view class="gt_content">
		<!-- {{height}} -->
		<view class="con_search">
			<u-search placeholder="请输入市县区" v-model="searchVal" shape="round" :clearabled="false" :show-action="false"
				height="72" margin="32rpx 16rpx" @change="searchPCA"></u-search>
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

		<view class="con_list" :style="[listStyle]">
			<!-- {{pcaList}} -->

			<view class="con_pca">
				<scroll-view :scroll-y="true" :scroll-into-view="provinceScrollInto">
					<view class="con_item u-line-1" :class="item.selected ? 'item_selected' : ''"
						v-for="(item,index) in provinceList" :key="index" :id="'pScroll_' + item.cityCode"
						@click="selectItem(item)">
						<view class="con_icon_text">
							<view class="con_icon" v-if="item.selected">
								<u-icon name="checkbox-mark" color="#485EF4"></u-icon>
							</view>
							<view class="con_text">
								{{item.cityName}}
							</view>
						</view>
					</view>

					<!-- <u-checkbox-group max="1">
						<u-checkbox v-model="item.checked" v-for="(item, index) in provinceList" :key="index"
							:name="item.city_name">
							<view class="con_text">
								{{item.city_name}}
							</view>
						</u-checkbox>
					</u-checkbox-group> -->


				</scroll-view>
			</view>
			<view class="con_pca">
				<scroll-view :scroll-y="true" :scroll-into-view="cityScrollInto">
					<view class="con_item u-line-1" :class="item.selected ? 'item_selected' : ''"
						v-for="(item,index) in cityList" :key="index" :id="'cScroll_' + item.cityCode"
						@click="selectItem(item)">
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
						@click="selectItem(item)">
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
		name: "gt-pca",
		props: {
			pcaList2: {
				type: Array,
				default () {
					return [];
				}
			},
			height: {
				type: String,
				default: '100vh'
			},
			show: {
				type: Boolean,
				default: false
			},
			allArea: {
				type: Boolean,
				default: false
			},
			selectedList: {
				type: Array,
				default () {
					return [];
				}
			},
		},
		data() {
			return {
				pcaList: [],
				searchVal: '',

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
			};
		},
		watch: {
			show(newVal, oldVal) {
				
				console.log(newVal);
				
				
				let gt = this;

				if (newVal) {
					if (gt.selectedList.length > 0 && gt.selectedList.length != 3) {
						var cityList = gt.getChildren(gt.selectedList[0][0]);
						gt.cityList = cityList;
						var areaList = gt.getChildren(gt.selectedList[1][0]);
						gt.areaList = areaList;


						setTimeout(function() {
							for (var i = 0; i < gt.selectedList[2].length; i++) {
								var item = {};
								for (var j = 0; j < gt.areaList.length; j++) {
									if (gt.selectedList[2][i].cityCode == gt.areaList[j].cityCode) {
										item = gt.areaList[j];
										gt.selectdPCA(item, true);
									}
								}
							}

						}, 400);
					}
				} else {

					var provinceSelected = [];
					var citySelected = [];
					var areaSelected = [];
					for (var i = 0; i < gt.provinceList.length; i++) {
						if (gt.provinceList[i].selected) {
							provinceSelected.push(gt.provinceList[i]);
						}
					}
					for (var i = 0; i < gt.cityList.length; i++) {
						if (gt.cityList[i].selected) {
							citySelected.push(gt.cityList[i]);
						}
					}
					for (var i = 0; i < gt.areaList.length; i++) {
						if (gt.areaList[i].selected) {
							areaSelected.push(gt.areaList[i]);
						}
					}
					gt.provinceSelected = provinceSelected;
					gt.citySelected = citySelected;
					gt.areaSelected = areaSelected;

					gt.$emit('gtPCASelect', JSON.stringify([provinceSelected, citySelected, areaSelected]));
				}
			},

			pcaList2(newVal, oldVal) {

				let gt = this;
				console.log(newVal);
				var pcaList = [];
				for (var i = 0; i < newVal.length; i++) {
					var item1 = {};
					item1.city_name = newVal[i].name;
					item1.children = [];
					for (var j = 0; j < newVal[i].child.length; j++) {
						var item2 = {};
						item2.city_name = newVal[i].child[j].name;
						item2.children = [];
							for (var k = 0; k < newVal[i].child[j].child.length; k++) {
								var item3 = {};
								item3.city_name = newVal[i].child[j].child[k].name;
								// console.log(item3);
								item2.children.push(item3);
							}
						item1.children.push(item2);
					}
					pcaList.push(item1);
				}
				console.log(pcaList);
				
				gt.pcaList = pcaList;
				
				// console.log('pcaList:', gt.pcaList2);
				// return false;
				
				gt.init();
				
			}
		},
		mounted() {
			let gt = this;
			// if(pcaList == []){
				var pcaList = uni.getStorageSync('pcaList');
			// }
			gt.pcaList = pcaList;
			
			gt.init();
			
			
			// uni.getStorage({
			// 	key: 'pcaList',
			// 	success: function(res) {
			// 		console.log('pcaList:', res);
			// 		gt.pcaList = res.data;
					
			// 		gt.init();
			// 	},
			
			// });

			// console.log('pcaList:', gt.pcaList2);
			// return false;




		},
		computed: {
			listStyle() {
				let gt = this;

				let style = {};
				style.height = `calc(${gt.height} - 212rpx)`;
				return style;
			}
		},
		methods: {
			init() {
				let gt = this;
				var provinceList = gt.pcaList;
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
			selectdPCA(item, selected) {
				let gt = this;


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
	.gt_content {
		.con_search {}

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
</style>