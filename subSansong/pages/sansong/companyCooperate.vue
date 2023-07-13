<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_tabs_addBtn">
			<view class="con_tabs">
				<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"
					swiperWidth="750"></u-tabs-swiper>
			</view>
			<view class="con_addBtn" @click="addCooperate">
				<text>添加企业</text>
			</view>
		</view>

		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item,index) in tabList" :key="index">
					<view class="con_empty" v-if="dataList.length == 0">
						<view class="con_img">
							<image :src="gtCommon.getOssImg('index/empty.png')" mode="widthFix"></image>
						</view>
						<view class="con_text">
							<text>暂无数据</text>
						</view>
					</view>
					<view class="con_list" v-else>
						<scroll-view class="con_scrollView" scroll-y @scrolltolower="loadMore">
							<view class="con_item" v-for="(item1,index1) in dataList" :key="index1">
								<view class="con_imgs_baseInfo">
									<view class="con_imgs">
										<image :src="item1.show_logistics_info.company_pic" mode="widthFix"></image>
									</view>
									<view class="con_baseInfo">
										<view class="con_name_officelAuth">
											<view class="con_name u-line-1">
												<text>{{item1.show_logistics_info.company_name}}</text>
											</view>
											<view class="con_officelAuth">
												<image :src="gtCommon.getOssImg('sansong/officelAuth.png')"
													mode="widthFix"></image>
											</view>
										</view>
										<view class="con_from_to" v-if="item1.line_info">
											<view class="con_from">
												<text>{{item1.line_info.start_city}}</text>
											</view>
											<view class="con_fromTo">
												<view class="con_text">
													<text v-if="item1.line_info.line_type == 1">直达</text>
													<text v-if="item1.line_info.line_type == 2">中转</text>
												</view>
												<view class="con_img">
													<image :src="gtCommon.getOssImg('sansong/cooperateFromTo.png')"
														mode="widthFix">
													</image>
												</view>
											</view>
											<view class="con_to">
												<text>{{item1.line_info.end_city}}</text>
											</view>
										</view>
										<view class="con_address_distance">
											<view class="con_address u-line-1">
												<text>{{item1.show_logistics_info.address}}</text>
											</view>
											<view class="con_distance">
												<!-- <text>3.4km</text> -->
											</view>
										</view>
										<view class="con_nums">
											<view class="con_numItem">
												<text>浏览量：</text>
												<text>{{item1.show_logistics_info.visitor_count}}</text>
											</view>
											<view class="con_numItem">
												<text>下单量：</text>
												<text>{{item1.show_logistics_info.order_count}}</text>
											</view>
											<view class="con_numItem">
												<text>收藏量：</text>
												<text>{{item1.show_logistics_info.collect_count}}</text>
											</view>
										</view>
									</view>
								</view>
								<view class="con_notice" v-if="item1.show_logistics_info.public_notice">
									<u-notice-bar mode="horizontal" type="none" padding="8rpx 18rpx" volume-size="24"
										font-size="24" :list="[item1.show_logistics_info.public_notice]"></u-notice-bar>
								</view>
								<view class="con_status_btns">
									<view class="con_status" v-if="index == 0">
										<text></text>
									</view>
									<view class="con_status" v-if="index == 1">
										<text v-if="item1.logistics_id == companyId && item1.status == 0">待验证</text>
										<text v-if="item1.logistics_id != companyId && item1.status == 0">申请添加</text>
										<text v-if="item1.status == 1">已同意</text>
										<text v-if="item1.status == 2">已拒绝</text>
									</view>
									<view class="con_btns"
										v-if="currentTab == 1 && item1.logistics_id != companyId && item1.status == 0">
										<view class="con_btnItem" @click="submitCooperate(item1,3)">
											<text>拒绝</text>
										</view>
										<view class="con_btnItem" @click="submitCooperate(item1,2)">
											<text>同意</text>
										</view>
									</view>
									<view class="con_btns" v-if="currentTab == 0">
										<view class="con_btnItem" @click="cancelCooperate(item1,index1)">
											<text>解除协作</text>
										</view>
										<!-- <view class="con_btnItem" @click="submitCooperate(item1,2)">
											<text>同意</text>
										</view> -->
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="con_popup">
			<view class="con_line">
				<u-popup v-model="lineShow" mode="bottom" height="682rpx" border-radius="24rpx 24rpx 0 0">
					<view class="con_title">
						<text>选择专线</text>
					</view>
					<view class="con_lineList">
						<u-radio-group v-model="lineId" :wrap="true">
							<scroll-view scroll-y="true">
								<u-radio v-for="(item, index) in lineList" :key="index" :name="item.line_id">
									<view class="con_lineItem">
										<text>{{item.start_city}}</text>
										<text>——</text>
										<text>{{item.end_city}}</text>
									</view>
								</u-radio>
							</scroll-view>
						</u-radio-group>
					</view>
					<view class="con_showAddress">
						<u-checkbox v-model="showAddressStatus" shape="square">是否将对方设置为选择专线的到站网点</u-checkbox>
					</view>
					<view class="con_confirmBtn" @click="agreeCooperate">
						<text>确定</text>
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
				companyId: 0,

				tabList: [{
					name: '企业列表',
					val: 0,
				}, {
					name: '协作通知',
					val: 1,
				}],
				currentTab: 0,

				page: 1,
				size: 10,
				end: false,

				dataList: [],

				actionItem: {},
				lineShow: false,
				lineList: [],
				lineId: 0,
				showAddressStatus: true,
			}
		},
		onLoad() {
			let gt = this;
			var companyInfo = uni.getStorageSync('companyInfo');
			gt.companyId = companyInfo.logistics_id;
			gt.getLinelist();
		},
		onShow() {
			let gt = this;
			gt.reGetDataList();
		},
		methods: {
			tabsChange(index) {
				let gt = this;
				gt.currentTab = index;
				gt.reGetDataList();
			},

			animationfinish(item) {
				let gt = this;
				
				var currentTab = gt.currentTab;
				gt.currentTab = item.detail.current;
				
				if(currentTab != gt.currentTab){
					gt.reGetDataList();
				}
			},
			getLinelist() {
				let gt = this;
				var url = "/logistics/specialline/get_special_line_list";
				var data = {
					page: 1,
					limit: 9999,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.lineList = res.list
				});
			},

			reGetDataList() {
				let gt = this;


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
					var url = "/logistics/collaborate/get_collaborate_list";
				} else {
					var url = "/logistics/collaborate/get_collaborate_notice_list";
				}

				var data = {
					page: gt.page,
					limit: gt.size,
				};

				gt.gtRequest.post(url, data).then(res => {
					console.log(res);
					if(gt.page == 1){
						gt.dataList = [];
					}
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
			addCooperate() {
				let gt = this;
				uni.navigateTo({
					url: './addCooperate',
				});
				return false;
			},
			cancelCooperate(item1, index) {
				let gt = this;
				uni.showModal({
					title: '提示',
					content: '确定解除协作吗?',
					showCancel: true,
					success(res) {
						if (res.confirm) {
							var url = "/logistics/collaborate/delete_collaborate";
							var data = {
								collaborate_id: item1.collaborate_id,
							};
							gt.gtRequest.post(url, data).then(res => {
								gt.dataList.splice(index, 1);
								gt.$refs.uToast.show({
									title: '操作成功！',
									type: 'success',
									// back:true,
								});
							});
						}
					}

				})

			},
			submitCooperate(item1, status) {
				let gt = this;
				if (status == 2) {
					uni.showModal({
						title: '提示',
						content: '是否将' + item1.show_logistics_info.company_name + '添加至专线(' + item1.line_info
							.start_city + '-' + item1.line_info.end_city + ')到站网点',
						showCancel: true,
						success(res) {
							if (res.confirm) {
								gt.actionItem = item1;
								gt.lineShow = true;
							}
						}
					})
				}
				if (status == 3) {
					uni.showModal({
						title: '提示',
						content: '确定拒绝吗?',
						showCancel: true,
						success(res) {
							if (res.confirm) {
								var url = "/logistics/collaborate/audit_collaborate";
								var data = {
									notice_id: item1.notice_id,
									audit_status: 2,
								};
								gt.gtRequest.post(url, data).then(res => {
									item1.status = 2;
									gt.$refs.uToast.show({
										title: '操作成功！',
										type: 'success',
									});
								});
							}
						}
					})
				}
			},
			agreeCooperate() {
				let gt = this;
				var url = "/logistics/collaborate/audit_collaborate";
				var data = {
					notice_id: gt.actionItem.notice_id,
					audit_status: 1,
					to_is_show_address: gt.showAddressStatus ? 1 : 0,
					to_line_id: gt.lineId,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.actionItem.status = 1;
					gt.lineShow = false;
					gt.reGetDataList();
					gt.$refs.uToast.show({
						title: '操作成功！',
						type: 'success',
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
			.con_tabs_addBtn {
				display: flex;
				justify-content: space-between;
				background: #fff;

				.con_tabs {
					width: 300rpx;
					margin-left: 48rpx;
				}

				.con_addBtn {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: $gtProjectColor;
					line-height: 80rpx;
					margin-right: 24rpx;
				}
			}

			.con_swiper {
				swiper {
					height: calc(100vh - 80rpx);

					.swiper-item {
						.con_empty {
							.con_img {
								width: 528rpx;
								margin: 200rpx auto 0 auto;
							}

							.con_text {
								font-size: 32rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 44rpx;
								margin-top: 16rpx;
								text-align: center;
							}

							.con_historyBtn {
								width: 240rpx;
								height: 76rpx;
								border-radius: 10rpx;
								border: 2rpx solid #485EF4;
								font-size: 32rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #485EF4;
								line-height: 76rpx;
								margin: 70rpx auto 0 auto;
								text-align: center;

							}
						}


						.con_list {
							.con_scrollView {
								height: calc(100vh - 80rpx);

								.con_item {
									margin: 20rpx 16rpx 0 16rpx;
									padding: 20rpx;

									width: 718rpx;
									background: #FFFFFF;
									border-radius: 20rpx;
									border: 4rpx solid #FFF700;

									.con_imgs_baseInfo {
										display: flex;

										.con_imgs {
											width: 176rpx;
											height: 176rpx;
											border-radius: 10rpx;
											overflow: hidden;
										}

										.con_baseInfo {
											margin-left: 20rpx;
											width: 485rpx;

											.con_name_officelAuth {
												display: flex;
												justify-content: space-between;

												.con_name {
													font-size: 32rpx;
													font-family: PingFangSC-Medium, PingFang SC;
													font-weight: 500;
													color: #000000;
													line-height: 44rpx;
												}

												.con_officelAuth {
													width: 128rpx;
													height: 42rpx;
												}
											}

											.con_from_to {
												display: flex;
												margin-top: 6rpx;

												.con_from {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #000000;
													line-height: 40rpx;
												}

												.con_fromTo {
													margin: 0 10rpx;
													width: 72rpx;
													margin-top: -10rpx;

													.con_text {
														text-align: center;
														font-size: 20rpx;
														font-family: PingFangSC-Regular, PingFang SC;
														font-weight: 400;
														color: $gtProjectColor;
														line-height: 28rpx;
													}

													.con_img {
														margin-top: -25rpx;
													}
												}

												.con_to {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #000000;
													line-height: 40rpx;
												}
											}

											.con_address_distance {
												margin-top: 6rpx;
												display: flex;
												justify-content: space-between;

												.con_address {
													width: 354rpx;
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 40rpx;
												}

												.con_distance {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 40rpx;
												}
											}

											.con_nums {
												display: flex;
												justify-content: space-between;
												margin-top: 6rpx;

												.con_numItem {
													font-size: 24rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 34rpx;

													text:nth-child(2) {
														color: #000;
														font-family: PingFangSC-Medium, PingFang SC;
													}
												}
											}
										}
									}

									.con_notice {
										width: 678rpx;
										height: 48rpx;
										border-radius: 8rpx;
										border: 1rpx solid #909399;
										margin-top: 16rpx;
									}

									.con_status_btns {
										display: flex;
										justify-content: space-between;
										margin-top: 20rpx;

										.con_status {
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: $gtProjectColor;
											line-height: 40rpx;
											margin-top: 8rpx;
										}

										.con_btns {
											display: flex;

											.con_btnItem {
												width: 160rpx;
												height: 48rpx;
												background: #FF6067;
												border-radius: 6rpx;
												font-size: 24rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #FFFFFF;
												line-height: 48rpx;
												text-align: center;
											}

											.con_btnItem:nth-child(2) {
												background: $gtProjectColor;
												margin-left: 20rpx;
											}

										}
									}
								}
							}
						}
					}
				}
			}


			.con_popup {
				.con_line {
					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						margin-top: 50rpx;
						text-align: center;
					}

					.con_lineList {
						// border: 1rpx solid red;
						height: 360rpx;

						scroll-view {
							height: 360rpx;
							padding: 0 32rpx;

							.u-radio {
								justify-content: space-between;
								flex-direction: row-reverse;
								width: 670rpx !important;
								// border-bottom: 2rpx solid #F2F2F2;

								.u-radio__icon-wrap {
									margin-right: 16rpx;
								}

								.con_lineItem {
									width: 560rpx;
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 40rpx;
									margin: 30rpx 16rpx;

								}
							}
						}
					}

					.con_showAddress {
						margin: 20rpx 32rpx;

					}

					.con_confirmBtn {
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
						margin-left: 16rpx;
					}
				}
			}

		}
	}
</style>