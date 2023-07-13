<template>
	<view class="gt_content">
		<view class="con_header">
			<view class="con_searchIcon">
				<view class="con_search">
					<u-search placeholder="输入运单号/订单号/车牌号" v-model="searchVal" bg-color="#F3F4F6" :clearabled="false"
						:show-action="false" height="72" @search="reGetDataList"></u-search>
				</view>
				<view class="con_icon" @click="scan">
					<u-icon name="scan" color="#303133" size="40"></u-icon>
				</view>
			</view>
		</view>
		<view class="con_history" v-if="searchVal == ''">
			<view class="con_title_btn">
				<view class="con_title">
					<text>历史搜索</text>
				</view>
				<view class="con_btn" @click="clearHistory">
					<view class="con_icon">
						<u-icon name="trash-fill" size="26" color="#909399"></u-icon>
					</view>
					<view class="con_text">
						<text>清空</text>
					</view>
				</view>
			</view>
			<view class="con_list">
				<view class="con_item u-line-1" v-for="(item,index) in historyList" :key="index"  @click="searcList(item)">
					<text>{{item}}</text>
				</view>
			</view>
		</view>

		<view class="con_dataList" v-if="searchVal != ''">
			<view class="con_order" v-if="type == 1">
				<view class="con_empty" v-if="dataList.length == 0">
					<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
						margin-top="200" font-size="32"></u-empty>

				</view>
				<view class="con_list" v-else>
					<scroll-view class="con_scrollView" scroll-y @scrolltolower="loadMore">
						<view class="con_item" v-for="(item,index) in dataList" :key="index" @click="goOrderInfo(item)">
							<view class="con_typeSn_status">
								<view class="con_typeSn">
									<view class="con_type orderType1" v-if="item.order_type == 1">
										<text>指派</text>
									</view>
									<view class="con_type orderType2" v-if="item.order_type == 2">
										<text>极速</text>
									</view>
									<view class="con_type orderType3" v-if="item.is_yuyue == 1">
										<text>预约</text>
									</view>

									<view class="con_sn">
										<view class="con_text">
											<text>订单号：{{item.deliver_sn}}</text>
										</view>
										<view class="con_copyIcon" @click.stop="gtCommon.copyStr(item.deliver_sn)">
											<!-- <text class="custom-icon custom-icon-copy"></text> -->
											<image :src="gtCommon.getOssImg('order/copy.png')" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="con_status">
									<text>{{item.status_msg}}</text>
								</view>
								<!-- <view class="con_status orderStatus2" v-if="item.status == 2">
									<text>待交货</text>
								</view> -->

							</view>

							<view class="con_fromTo">
								<view class="con_from">
									<view class="con_city">
										<text>{{item.pickup_city}}</text>
									</view>
									<view class="con_address_type">
										<view class="con_address">
											<text>{{item.pickup_address}}</text>
										</view>
										<view class="con_type">
											<text v-if="item.jiaohuo_type == 1">自送专线</text>
											<text v-if="item.jiaohuo_type == 2">上门自提</text>
										</view>
									</view>

								</view>
								<view class="con_lineFT"></view>

								<view class="con_to">
									<view class="con_city">
										<text>{{item.receive_city}}</text>
									</view>
									<view class="con_address_type">
										<view class="con_address">
											<text>{{item.receive_address}}</text>
										</view>

										<view class="con_type">
											<text v-if="item.peisong_type == 1">送货上门</text>
											<text v-if="item.peisong_type == 2">自提</text>
										</view>
									</view>
								</view>


							</view>

							<view class="con_keyVal">

								<view class="con_key_val">
									<view class="con_key">
										<text>运输时效：</text>
									</view>
									<view class="con_val">
										<text v-if="item.transport_day_max == 0">面议</text>
										<text v-else>{{item.transport_day_min}} - {{item.transport_day_max}}天</text>
									</view>
								</view>

								<view class="con_key_val">
									<view class="con_key">
										<text>货物信息：</text>
									</view>
									<view class="con_val">
										<text>{{item.goods_name}}/{{item.goods_weight}}吨/{{item.goods_volume}}方</text>
									</view>
								</view>
								<view class="con_key_val">
									<view class="con_key">
										<text>增值服务：</text>
									</view>
									<view class="con_val">
										<text v-if="item.receipt_type == 1">无需回单</text>
										<text v-if="item.receipt_type == 2">回单</text>
										<text v-if="item.receipt_type == 3">收条</text>
										<!-- <text>/</text>
										<text v-if="item.is_invoice == 0">不开发票</text>
										<text v-if="item.is_invoice == 1">开发票</text> -->
									</view>
								</view>
							</view>

							<view class="con_time_price">
								<view class="con_time">
									<text style="color: #485EF4;"
										v-if="item.is_yuyue == 1">预约时间：{{$u.timeFormat(item.yuyue_time, 'mm月dd日 hh:MM')}}</text>
									<text v-else>下单时间：{{$u.timeFormat(item.create_time, 'mm月dd日 hh:MM')}}</text>
								</view>
								<view class="con_price">
									<text>￥{{item.last_price}}(</text>
									<text v-if="item.deliver_type == 3">货主出价</text>
									<text v-else-if="item.pay_status == 2">已支付</text>
									<text v-else-if="item.pay_status == 0">待支付</text>

									<text>)</text>
								</view>
							</view>
							<view class="con_line">
							</view>
							<view class="con_btns">
								<!-- <view class="con_btnItem" @click.stop="showRefuse(item)"
									v-if="item.id > 1">
									<text>电子面单</text>
								</view>
								<view class="con_btnItem" @click.stop="showRefuse(item)"
									v-if="item.id > 1">
									<text>修改订单</text>
								</view> -->
								<view class="con_btnItem" @click.stop="addMoney(item)"
									v-if="item.status == 5 || item.status == 9 || item.status == 11">
									<text>增加费用</text>
								</view>
								<view class="con_btnItem" @click.stop="confirmCollect(item)" v-if="item.status == 5">
									<text>确认揽收</text>
								</view>
								<!-- <view class="con_btnItem" @click.stop="confirmStart(item)" v-if="item.status == 7">
									<text>打印标签</text>
								</view> -->
								<view class="con_btnItem" @click.stop="confirmStart(item)" v-if="item.status == 7">
									<text>确认发车</text>
								</view>
								<view class="con_btnItem" @click.stop="confirmStart(item)"
									v-if="item.cancel_status == 1">
									<text>取消确认</text>
								</view>
								<view class="con_btnItem" @click.stop="confirmArriva(item)" v-if="item.status == 9">
									<text>确认到达</text>
								</view>
								<view class="con_btnItem" @click.stop="confirmSign(item)" v-if="item.status == 11">
									<text>签收</text>
								</view>
								<view class="con_btnItem" @click.stop="uploadReceipt(item)" v-if="item.status == 13">
									<text>上传回单</text>
								</view>
								<!-- <view class="con_btnItem" @click.stop="confirmStart(item)" v-if="item.status == 7">
									<text>查看回单</text>
								</view> -->
								<view class="con_btnItem" @click.stop="confirmStart(item)" v-if="item.status == 99">
									<text>查看取消</text>
								</view>

							</view>


						</view>
					</scroll-view>
				</view>

			</view>
			<view class="con_wayBill" v-if="type == 2">
				<view class="con_empty" v-if="dataList.length == 0">

					<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
						margin-top="200" font-size="32"></u-empty>
				</view>
				<view class="con_list">
					<scroll-view class="scroll_view" scroll-y="true" @scrolltolower="loadMore">
						<view class="con_item" v-for="(item,index) in dataList" :key="index">
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
									<view class="con_copyIcon" @click="gtCommon.copyStr(item.waybill_sn)">
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
									<u-line color="#F2F2F2 " length="80rpx" margin="56rpx 32rpx 0 32rpx" />
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
							</view>
							<view class="con_line">
								<u-line color="#F2F2F2 " length="670rpx" margin="24rpx" />
							</view>
							<view class="con_timeBtn">
								<view class="con_time">
									<text>发车时间：{{gtCommon.formateTime(item.create_time,'MM月DD日 HH:mm')}}</text>
								</view>
								<view class="con_btn" @click="confirmArrive(item)" v-if="item.status != 1">
									<text>确认到达</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: '',
				historyList: [],

				type: 0,
				dataList: [],
				page: 1,
				size: 10,
				end: false,
			}
		},
		onLoad() {
			let gt = this;
			var historyList = uni.getStorageSync('wayBillHistory');
			// console.log(historyList);
			if (!historyList) {
				historyList = [];
			}
			gt.historyList = historyList;
		},
		methods: {
			searcList(item){
				let gt = this;
				gt.searchVal = item;
				gt.orderSearch();
				// gt.historyShow = false;
				// gt.reGetOrderList();
			},
			orderSearch() {
				let gt = this;
				gt.historyShow = false;
				gt.updateHistory();
				gt.reGetDataList();
			},
			scan(){
				let gt = this;
				uni.scanCode({
					success(res) {
						console.log(res);
						if(res.errMsg == 'scanCode:ok'){
							gt.searchVal = res.result;
							gt.reGetDataList();
						}
					}
				})
			},
			clearHistory() {
				let gt = this;
				gt.historyList = [];
				uni.setStorageSync('wayBillHistory', []);
			},
			reGetDataList() {
				let gt = this;
				if (gt.searchVal == '') {
					return false;
				}

				gt.dataList = [];
				gt.page = 1;
				gt.size = 10;
				gt.end = false;
				gt.updateHistory();
				gt.getDataList();
			},
			updateHistory() {
				let gt = this;
				var historyList = uni.getStorageSync('wayBillHistory');
				// console.log(historyList);
				if (!historyList) {
					historyList = [];
				}
				// console.log(historyList);
				if(gt.searchVal == ''){
					return false;
				}
				
				historyList = historyList.filter(item => item != gt.searchVal);
				historyList.unshift(gt.searchVal);
				// console.log(historyList);
				gt.historyList = historyList;
				uni.setStorageSync('wayBillHistory', historyList);

			},
			getDataList() {
				let gt = this;
				var type = 0;
				if (gt.end) {
					return false;
				}

				if (gt.searchVal != '') {
					var typeStr = gt.searchVal.substr(0, 2);

					if (typeStr == 'SS') {
						type = 1;
					}
					if (typeStr == 'SY') {
						type = 2;
					}
					if (gt.$u.test.carNo(gt.searchVal)) {
						type = 2
					}
				}
				gt.type = type;
				console.log(type);
				if (type == 1) {
					var url = "/logistics/order/get_order_list";
					var data = {
						search_key: gt.searchVal,
						page: gt.page,
						limit: gt.size,
					};
					gt.gtRequest.post(url, data).then(res => {
						gt.dataList = gt.dataList.concat(res.list);
						if (res.list.length == gt.size) {
							gt.page = gt.page + 1;
						} else {
							gt.end = true;
						}
					});
				}

				if (type == 2) {
					var url = "/logistics/waybill/get_waybill_list";
					var data = {
						search_key: gt.searchVal,
						page: gt.page,
						limit: gt.size,
					};
					gt.gtRequest.post(url, data).then(res => {
						gt.dataList = gt.dataList.concat(res.list);
						if (res.list.length == gt.size) {
							gt.page = gt.page + 1;
						} else {
							gt.end = true;
						}
					});
				}

			},

			loadMore() {
				console.log('loadMore');
				let gt = this;
				gt.getDataList();
			},
			goOrderInfo(item) {
				let gt = this;

				uni.navigateTo({
					url: './orderInfo?orderSn=' + item.deliver_sn
				})
			},
			addMoney(item) {
				uni.navigateTo({
					url: '../sansong/addMoney?orderSn=' + item.deliver_sn,
				});
				return false;
			},
			confirmCollect(item) {
				let gt = this;
				var url = "/logistics/order/confirm_revenue";
				var data = {
					deliver_sn: item.deliver_sn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.$refs.uToast.show({
						title: '揽收成功！',
						type: 'success',
						url: 'pages/order/orderInfo?orderSn=' + item.deliver_sn,
					});
				});
			},
			confirmStart(item) {
				console.log(item);
				let gt = this;
				uni.navigateTo({
					url: '../sansong/loadSend?orderSn=' + item.deliver_sn,
				});
				return false;
			},
			confirmArriva(item) {
				let gt = this;
				var url = "/logistics/order/confirm_arrival";
				var data = {
					deliver_sn: item.deliver_sn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.$refs.uToast.show({
						title: '到达成功！',
						type: 'success',
						url: 'pages/order/orderInfo?orderSn=' + item.deliver_sn,
					});
				});
			},
			confirmSign(item) {
				uni.navigateTo({
					url: '../sansong/sign?orderSn=' + item.deliver_sn,
				});
				return false;
			},
			uploadReceipt(item) {
				uni.navigateTo({
					url: '../sansong/receipt?orderSn=' + item.deliver_sn,
				});
				return false;
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_header {
				width: 750rpx;
				height: 88rpx;
				background: #FFFFFF;
				padding: 8rpx 16rpx;

				.con_searchIcon {
					display: flex;
					justify-content: space-between;
					width: 718rpx;
					height: 72rpx;
					background: #F3F4F6;
					border-radius: 36rpx;

					.con_search {
						width: 630rpx;
					}

					.con_icon {
						margin: 16rpx 24rpx;
					}
				}
			}

			.con_history {
				margin-top: 40rpx;

				.con_title_btn {
					display: flex;
					justify-content: space-between;
					margin-left: 16rpx;
					margin-right: 40rpx;

					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
					}

					.con_btn {
						display: flex;

						.con_icon {
							margin-top: 2rpx;
						}

						.con_text {
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 44rpx;
							margin-left: 8rpx;
						}
					}
				}

				.con_list {
					display: flex;
					flex-wrap: wrap;
					margin: 0 4rpx;
					margin-top: 28rpx;

					.con_item {
						height: 64rpx;
						border-radius: 33rpx;
						border: 2rpx solid #979797;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 64rpx;
						padding: 0 24rpx;
						margin: 12rpx;
						max-width: 700rpx;
						
					}
				}
			}

			.con_dataList {
				.con_order {
					.con_list {
						.con_scrollView {
							height: calc(100vh - 80rpx);

							.con_item {
								width: 718rpx;
								// height: 692rpx;
								background: #FFFFFF;
								border-radius: 20rpx;
								margin: 20rpx 16rpx 0 16rpx;
								padding: 24rpx;

								.con_typeSn_status {
									display: flex;
									justify-content: space-between;

									.con_typeSn {
										display: flex;

										.con_type {
											width: 68rpx;
											height: 40rpx;
											background: #485EF4;
											border-radius: 6rpx;
											font-size: 24rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #FFFFFF;
											line-height: 40rpx;
											text-align: center;
										}

										.orderType1 {
											background: $gtProjectColor;
										}

										.orderType2 {
											background: #FFBF27;
										}

										.orderType3 {
											background: #FF6067;
											margin-left: 20rpx;
										}

										.con_sn {
											display: flex;
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #909399;
											line-height: 40rpx;
											margin-left: 22rpx;

											.con_text {}

											.con_copyIcon {
												width:24rpx;
												height: 24rpx;
												margin: 6rpx 8rpx;
												font-size: 24rpx;
												color: #0C0C0C;
											}
										}
									}

									.con_status {
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: $gtProjectColor;
										line-height: 40rpx;
									}
								}


								.orderType1 {
									background: $gtProjectColor;
								}

								.orderType2 {
									background: #FF6067;
								}

								.con_fromTo {
									margin-top: 24rpx;

									.con_from {
										display: flex;

										.con_city {
											font-size: 28rpx;
											font-family: PingFangSC-Medium, PingFang SC;
											font-weight: 500;
											color: #000000;
											line-height: 40rpx;
										}

										.con_address_type {
											margin-left: 20rpx;

											.con_address {
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #909399;
												line-height: 40rpx;
											}

											.con_type {
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #909399;
												line-height: 40rpx;
												margin-top: 4rpx;
											}
										}
									}

									.con_lineFT {
										margin: -26rpx 0 0 42rpx;
										width: 2rpx;
										height: 60rpx;
										border: 2rpx dashed #DFDFDF;
									}

									.con_to {
										display: flex;
										margin-top: 24rpx;

										.con_city {
											font-size: 28rpx;
											font-family: PingFangSC-Medium, PingFang SC;
											font-weight: 500;
											color: #000000;
											line-height: 40rpx;
										}

										.con_address_type {
											margin-left: 20rpx;

											.con_address {
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #909399;
												line-height: 40rpx;
											}

											.con_type {
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #909399;
												line-height: 40rpx;
												margin-top: 4rpx;
											}
										}
									}
								}

								.con_keyVal {
									margin-top: 12rpx;
									margin-left: 10rpx;

									.con_key_val {
										display: flex;
										margin-top: 20rpx;

										.con_key {
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #909399;
											line-height: 40rpx;
										}

										.con_val {
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #000;
											line-height: 40rpx;

											text:nth-child(3) {
												color: #FF6067;
											}
										}
									}
								}

								.con_time_price {
									display: flex;
									justify-content: space-between;
									margin-top: 32rpx;

									.con_time {
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #909399;
										line-height: 40rpx;
									}

									.con_price {
										font-size: 28rpx;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 500;
										color: #FF6067;
										line-height: 40rpx;
									}
								}

								.con_line {
									width: 670rpx;
									height: 2rpx;
									opacity: 0.1;
									border: 1rpx solid #000000;
									margin-top: 20rpx;
								}

								.con_btns {
									display: flex;
									justify-content: flex-end;
									padding: 20rpx 12rpx;

									.con_btnItem {
										text-align: center;
										margin: 0 12rpx;
										width: 136rpx;
										height: 64rpx;
										border-radius: 10rpx;
										border: 2rpx solid #000000;
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #000000;
										line-height: 64rpx;
									}


								}
							}
						}
					}


				}

				.con_wayBill {
					.con_empty {
						width: 750rpx;
						text-align: center;
					}

					.con_list {
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

										// .con_icon {
										// 	margin-left: 8rpx;
										// 	margin-top: 6rpx;
										// }
										.con_copyIcon {
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
								}

								.con_timeBtn {
									display: flex;
									justify-content: space-between;

									.con_time {
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #909399;
										line-height: 40rpx;
										margin-top: 6rpx;
									}

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
										margin-top: -6rpx;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>