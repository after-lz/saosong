<template>
	<view class="gt_content">


		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_tabs">
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"
				swiperWidth="750"></u-tabs-swiper>
		</view>

		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" id="type1">
					<view class="con_empty" v-if="dataList.length == 0">
						<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
							margin-top="200" font-size="32"></u-empty>
					</view>
					<view class="con_list" v-else>
						<scroll-view class="con_scrollView" scroll-y @scrolltolower="loadMore">
							<view class="con_item" v-for="(item,index) in dataList" :key="index"
								@click="goOrderInfo(item)">
								<view class="con_typeSn_status">
									<view class="con_typeSn">
										<view class="con_type orderType1" v-if="item.order_type == 1">
											<text>指派</text>
										</view>
										<view class="con_type orderType2" v-if="item.order_type == 2">
											<text>极速</text>
										</view>
										<view class="con_sn">
											<view class="con_text">
												<text>订单号：{{item.deliver_sn}}</text>
											</view>
											<view class="con_copyIcon" @click="copyStr(item.deliver_sn)">
												<!-- <text class="custom-icon custom-icon-copy"></text> -->
												<image :src="gtCommon.getOssImg('sansong/copy.png')" mode="widthFix">
												</image>
											</view>
										</view>
									</view>
									<!-- 20230627测试要求去除未知 -->
									<view class="con_status" v-if="item.status_msg != '未知'">
										<text>{{item.status_msg}}</text>
									</view>

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
									<view class="con_line"></view>

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
											<view v-else>{{item.transport_day_min}} - {{item.transport_day_max}}天</view>
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
										<text>下单时间：{{$u.timeFormat(item.create_time, 'mm-dd hh:MM:ss')}}</text>
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
								<view class="con_viewBtn" @click.stop="showQuotation(item)">
									<text>查看报价</text>
								</view>

							</view>
						</scroll-view>
					</view>

				</swiper-item>
				<swiper-item class="swiper-item" id="type2">
					<view class="con_empty" v-if="dataList.length == 0">
						<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
							margin-top="200" font-size="32"></u-empty>
					</view>
					<view class="con_list" v-else>
						<scroll-view class="con_scrollView" scroll-y @scrolltolower="loadMore">
							<view class="con_item" v-for="(item,index) in dataList" :key="index"
								@click="goOrderInfo(item)">
								<view class="con_typeSn_status">
									<view class="con_typeSn">
										<view class="con_type orderType1" v-if="item.order_type == 1">
											<text>指派</text>
										</view>
										<view class="con_type orderType2" v-if="item.order_type == 2">
											<text>极速</text>
										</view>
										<view class="con_sn">
											<view class="con_text">
												<text>订单号：{{item.deliver_sn}}</text>
											</view>
											<view class="con_copyIcon" @click="copyStr(item.deliver_sn)">
												<!-- <text class="custom-icon custom-icon-copy"></text> -->
												<image :src="gtCommon.getOssImg('sansong/copy.png')" mode="widthFix">
												</image>
											</view>
										</view>
									</view>
									<!-- 20230627测试要求去除未知 -->
									<view class="con_status" v-if="item.status_msg != '未知'">
										<text>{{item.status_msg}}</text>
									</view>

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
									<view class="con_line"></view>

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
											<view v-else>{{item.transport_day_min}} - {{item.transport_day_max}}天</view>
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
										<text>下单时间：{{$u.timeFormat(item.create_time, 'mm-dd hh:MM:ss')}}</text>
									</view>
									<view class="con_price">
										<text>￥{{item.last_price}}(</text>
										<text v-if="item.deliver_type == 3">货主出价</text>
										<text v-else-if="item.pay_status == 2">已支付</text>
										<text v-else-if="item.pay_status == 0">待支付</text>

										<text>)</text>
									</view>
								</view>

								<!-- 	<view class="con_line">
									
								</view>
								<view class="con_viewBtn" @click="showQuotation(item)">
									<text>查看报价</text>
								</view>
								 -->
							</view>
						</scroll-view>
					</view>


				</swiper-item>
			</swiper>
		</view>



		<view class="con_popup">
			<view class="con_quotation">
				<u-popup v-model="quotationShow" mode="center" width="718" height="426" border-radius="22">
					<view class="con_title">
						<text>报价</text>
					</view>
					<view class="con_ownerQuotation_contact">
						<view class="con_ownerWuotation">
							<text>货主出价：</text>
							<text>{{ownerQuotation}}元</text>
						</view>
						<view class="con_contact" @click="contactOwner">
							<view class="con_icon">
								<u-icon name="phone-fill" color="#485EF4" size="32"></u-icon>
							</view>
							<view class="con_text">
								<text>联系货主</text>
							</view>
						</view>
					</view>
					<view class="con_myQuotation">
						<view class="con_text">
							<text>我的报价：</text>
						</view>
						<view class="con_input">
							<u-input v-model="myQuotation" type="digit" height="64" disabled />
						</view>
						<view class="con_unit">
							<text>元</text>
						</view>

					</view>
					<view class="con_tip">
						<text>注：建议电话联系货主商谈后再报价</text>
					</view>
					<view class="con_time">
						<text>报价时间：{{quotationTime}}</text>
					</view>
				</u-popup>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {

				companyInfo: {},
				tabList: [{
					name: '报价记录'
				}, {
					name: '拒绝记录'
				}],
				currentTab: 0,

				dataList: [],
				page: 1,
				size: 10,
				end: false,

				orderSn: '',


				quotationShow: false,
				ownerQuotation: '',
				ownerMobile: '',
				myQuotation: '',
				quotationStatus: false,
				quotationTime: '',

			}
		},
		onLoad() {
			let gt = this;
			var companyInfo = uni.getStorageSync('companyInfo');
			gt.companyInfo = companyInfo;
			gt.reGetDataList();
		},
		onShow() {
			// let gt = this;
			// gt.reGetDataList();
		},
		methods: {
			tabsChange(index) {
				let gt = this;
				gt.currentTab = index;
				gt.getLineList();
				gt.reGetOrderList();
			},

			animationfinish(item) {
				let gt = this;
				var currentTab = gt.currentTab;
				gt.currentTab = item.detail.current;

				if (currentTab != gt.currentTab) {
					gt.getLineList();
					gt.reGetOrderList();
				}
			},
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
				if (gt.currentTab == 0) {
					var url = "/logistics/order/get_quoted_price_list";
				}
				if (gt.currentTab == 1) {
					var url = "/logistics/order/get_order_list";
				}

				var data = {
					page: gt.page,
					limit: gt.size,
				};
				if (gt.currentTab == 1) {
					data.status = 80;
				}
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
			copyStr(str) {
				uni.setClipboardData({
					data: str,
					success: function() {
						console.log('success');
					}
				});
			},
			goOrderInfo(item) {
				console.log('-------')
				let gt = this;
				if (item.status > 20) {
					gt.$refs.uToast.show({
						title: '订单已消失',
						type: 'error',
					});
					return false;
				}
				if (item.logistics_id != gt.companyInfo.logistics_id) {
					gt.$refs.uToast.show({
						title: '订单已被抢',
						type: 'error',
					});
					return false;
				}
				uni.navigateTo({
					url: './orderInfo?orderSn=' + item.deliver_sn
				})
			},

			showQuotation(item) {
				console.log(item);
				let gt = this;

				gt.orderSn = item.deliver_sn;
				gt.ownerQuotation = item.last_price;
				gt.ownerMobile = item.pickup_mobile;
				gt.myQuotation = item.quoted_price;
				gt.quotationTime = gt.$u.timeFormat(item.quoted_time, 'yyyy-mm-dd hh:MM');
				if (item.quoted_price) {
					gt.quotationStatus = true;
				} else {
					gt.quotationStatus = false;
				}


				gt.quotationShow = true;
			},
			contactOwner() {
				let gt = this;

				uni.makePhoneCall({
					phoneNumber: gt.ownerMobile
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_swiper {
				swiper {
					height: calc(100vh - 80rpx);


					.swiper-item {
						.con_empty {
							width: 750rpx;
							text-align: center;
						}

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
													width: 24rpx;
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

									.con_fromTo {


										.con_from {
											display: flex;
											margin-top: 24rpx;

											.con_city {
												font-size: 28rpx;
												font-family: PingFangSC-Medium, PingFang SC;
												font-weight: 500;
												color: #000000;
												line-height: 40rpx;
												white-space: nowrap;
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

										.con_line {
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
												white-space: nowrap;
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

									.con_viewBtn {
										width: 144rpx;
										height: 64rpx;
										border-radius: 10rpx;
										border: 2rpx solid #000000;
										text-align: center;
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #000000;
										line-height: 64rpx;
										margin-top: 18rpx;
										margin-left: 526rpx;
									}



								}
							}
						}
					}
				}
			}

			.con_popup {
				.con_quotation {
					// padding: 34rpx;

					.con_title {
						font-size: 40rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 56rpx;
						letter-spacing: 1px;
						text-align: center;
						margin-top: 34rpx;
					}

					.con_ownerQuotation_contact {
						display: flex;
						justify-content: space-between;
						margin: 14rpx 0 0 34rpx;

						.con_ownerWuotation {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 40rpx;

							text:nth-child(2) {
								color: $gtProjectColor;
							}
						}

						.con_contact {
							display: flex;

							.con_icon {
								margin-top: 16rpx;
								margin-right: 8rpx;
							}

							.con_text {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #485EF4;
								line-height: 40rpx;
								margin: 14rpx 68rpx 0 0;
							}
						}
					}

					.con_myQuotation {
						display: flex;
						margin: 40rpx 68rpx 0 34rpx;

						.con_text {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 64rpx;

						}

						.con_input {
							width: 440rpx;
							height: 64rpx;
							background: #F4F4F4;
							border-radius: 8rpx;
							padding: 0 10rpx;
						}

						.con_unit {
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 64rpx;
							margin-left: 10rpx;
						}
					}

					.con_tip {
						width: 384rpx;
						height: 34rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 34rpx;
						margin: 16rpx 0 0 34rpx;
					}

					.con_time {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 40rpx;
						margin: 40rpx 0 50rpx 34rpx;
					}
				}
			}
		}
	}
</style>