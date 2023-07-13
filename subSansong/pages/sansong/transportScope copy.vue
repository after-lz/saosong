<template>
	<view class="gt_content">
		<view class="con_gtPCA">
			<gtPCA :pcaList="dataList" :show="GTPCAShowS" :selectedList="fromPca" :allArea="false"></gtPCA>
		</view>
	</view>
</template>

<script>
	import gtPCA from "@/components/gt-pca/gt-pca2.vue";
	export default {
		components: {
			gtPCA: gtPCA,
		},
		data() {
			return {
				dataList: [],
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

			}
		},
		onLoad() {
			let gt = this;
			gt.getDataList();
		},
		onShow() {
			let gt = this;

			// gt.getRangeInfo(gt.dataList,0,{});
		},
		methods: {
			getDataList() {
				let gt = this;
				var url = "/logistics/specialline/get_special_line_range";

				// cityCode: provinceList[i].city_code,
				// cityName: provinceList[i].city_name,
				// cityType: provinceList[i].city_type,
				// parentCode: provinceList[i].parent_code,
				// selected: false,

				gt.gtRequest.post(url).then(res => {
					var list = [];
					for (var i = 0; i < res.range.length; i++) {
						var item1 = {
							city_code: '1_' + i,
							city_name: res.range[i].name,
							city_type: 1,
							parent_code: 0,
						};
						var list2 = [];
						for (var j = 0; j < res.range[i].child.length; j++) {
							var item2 = {
								city_code: '2_' + j,
								city_name: res.range[i].child[j].name,
								city_type: 2,
								parent_code: '1_' + i,
							};
							var list3 = [];
							for (var k = 0; k < res.range[i].child[j].child.length; k++) {
								var item3 = {
									city_code: '3_' + k,
									city_name: res.range[i].child[j].child[k].name,
									city_type: 3,
									parent_code: '2_' + j,
								};
								list3.push(item3);
							}
							item2.children = list3;

							list2.push(item2);
						}
						item1.children = list2;
						list.push(item1);

					}
					console.log(list);

					gt.dataList = list;
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
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
	}
</style>