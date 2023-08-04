<template>
	<view class="gt_content">
		<view class="con_search">
			<u-search placeholder="输入订单号、车牌号" v-model="searchVal" height="72" bg-color="#F3F4F6" margin="8rpx 16rpx"
				:clearabled="false" :show-action="false" @search="reGetDataList"></u-search>
		</view>

		<view class="con_list">
			<view class="con_empty" v-if="dataList.length == 0">

				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view>
			<view class="con_scroll">
				<scroll-view class="scroll_view" scroll-y="true" @scrolltolower="loadMore">
					<view class="con_item" v-for="(item,index) in dataList" :key="index" @click="goDetail(item)">
						<view class="con_plateStatus">
							<view class="con_plate">
								<text>车牌号：{{item.license_plate}}</text>
							</view>
							<view class="con_status">
								<text>{{item.status_msg}}</text>
							</view>
						</view>
						<view class="con_line">
							<u-line color="#F2F2F2 " length="670rpx" margin="24rpx" />
						</view>
						<view class="con_snNum">
							<view class="con_sn">
								<view class="con_text">
									<text>运单号：{{item.waybill_sn}}</text>
								</view>
								<view class="con_icon" @click.stop="gtCommon.copyStr(item.waybill_sn)">
									<!-- <text class="custom-icon custom-icon-copy"></text> -->
									<image :src="gtCommon.getOssImg('sansong/copy.png')" mode="widthFix"></image>
								</view>
							</view>
							<view class="con_num">
								<text>订单数量：{{item.order_count}}</text>
							</view>
						</view>
						<view class="con_fromTo">
							<view class="con_text">
								<text>{{item.line_start_city}}</text>
							</view>
							<view class="con_fromToLine">
								<u-line color="#E5E5E5" length="80rpx" margin="56rpx 32rpx 0 32rpx" />
							</view>
							<view class="con_text">
								<text>{{item.line_end_city}}</text>
							</view>
						</view>
						<view class="con_keyVal">
							<view class="con_text">
								<text>发站公司：{{item.start_line_info.company_name}}</text>
							</view>
							<view class="con_text">
								<text>联系电话：{{item.start_line_info.line_mobile}}</text>
							</view>
							<view class="con_text">
								<text>到站公司：{{item.outlets_name}}</text>
							</view>
							<view class="con_text">
								<text>联系电话：{{item.outlets_mobile}}</text>
							</view>

							<view class="con_text">
								<text>发车时间：{{gtCommon.formateTime(item.create_time,'MM月DD日 HH:mm')}}</text>
							</view>
						</view>

						<view class="con_line">
							<u-line color="#F2F2F2 " length="670rpx" margin="24rpx" />
						</view>
						<view class="con_btns">
							<!-- <view class="con_btn">
								<text>调整</text>
							</view> -->
							<view class="con_btn" @click.stop="confirmArrive(item)" v-if="item.status == 0">
								<text>确认到达</text>
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
				searchVal: '',
				dataList: [],

				page: 1,
				size: 10,
				end: false,

			}
		},
		onShow() {
			let gt = this;
			gt.reGetDataList();
		},
		onPullDownRefresh() {
			let gt = this;
			gt.reGetDataList();
			uni.stopPullDownRefresh();
		},
		methods: {
			reGetDataList() {
				let gt = this;
				gt.dataList = [];
				gt.page = 1;
				gt.size = 10;
				gt.end = false;
				gt.getDataList();
			},
			getDataList() {
				let gt = this;
				if (gt.end) {
					return false;
				}
				var url = "/logistics/waybill/get_waybill_list";
				var data = {
					search_key: gt.searchVal,
					page: gt.page,
					limit: gt.size,
				};
				gt.gtRequest.post(url, data).then(res => {
					console.log(res);
					gt.dataList = gt.dataList.concat(res.list);
					if (res.list.length == gt.size) {
						gt.page = gt.page + 1;
					} else {
						gt.end = true;
					}
				});
			},

			loadMore() {
				console.log('loadMore');
				let gt = this;
				gt.getDataList();
			},
			goDetail(item){
				let gt = this;
				uni.navigateTo({
					url:'./sendInfo?orderSn=' + item.waybill_sn,
				});
				return false;
			},
			confirmArrive(item) {
				let gt = this;
				var url = "/logistics/upwaybill/waybil_confirm_arrival";
				var data = {
					waybill_sn: item.waybill_sn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.reGetDataList();
					gt.$refs.uToast.show({
						title: '到达成功！',
						type: 'success',
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_search {
				width: 750rpx;
				height: 88rpx;
				background: #FFFFFF;
				padding: 1rpx;
			}

			.con_list {
				.con_empty {
					text-align: center;
					
				}

				.con_scroll {
					.scroll_view {
						height: calc(100vh - 176rpx);

						.con_item {
							width: 718rpx;
							background: #FFFFFF;
							border-radius: 20rpx;
							padding: 20rpx 24rpx;
							margin: 20rpx 16rpx;

							.con_plateStatus {
								display: flex;
								justify-content: space-between;

								.con_plate {
									font-size: 28rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #000000;
									line-height: 40rpx;
								}

								.con_status {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #485EF4;
									line-height: 40rpx;
								}
							}

							.con_snNum {
								display: flex;
								justify-content: space-between;
								margin-top: 6rpx;

								.con_sn {
									display: flex;

									.con_text {
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #909399;
										line-height: 40rpx;
									}
									

									.con_icon {
										width:24rpx;
										height: 24rpx;
										margin: 6rpx 8rpx;
										font-size: 24rpx;
										color: #0C0C0C;
									}
								}

								.con_num {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 40rpx;
								}
							}

							.con_fromTo {
								margin-top: 32rpx;
								display: flex;

								.con_text {
									font-size: 32rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #000000;
									line-height: 44rpx;
								}

								.con_fromToLine {
									margin-top: -32rpx;
								}
							}

							.con_keyVal {
								margin-top: 16rpx;

								.con_text {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #909399;
									line-height: 40rpx;
									margin-top: 16rpx;
								}

								.con_text:nth-child(3) {
									margin-top: 32rpx;
								}

								.con_text:nth-child(5) {
									margin-top: 40rpx;
								}
							}

							.con_btns {
								display: flex;
								justify-content: flex-end;


								.con_btn {
									width: 160rpx;
									height: 64rpx;
									border-radius: 10rpx;
									border: 2rpx solid #485EF4;
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #485EF4;
									line-height: 64rpx;
									text-align: center;
									margin-left: 16rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>