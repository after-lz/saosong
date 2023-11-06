<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_search">
			<u-search placeholder="请输入公司名称搜索" v-model="searchVal" bg-color="#F3F4F6" height="72" :clearabled="false"
				:show-action="false" @search="searchCompany"></u-search>
		</view>
		<view class="con_dataList" v-if="dataShow">
			<view class="con_empty" v-if="dataList.length == 0">
				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view>
			<view class="con_list" v-else>
				<view class="con_item" v-for="(item,index) in dataList" :key="index">
					<view class="con_imgs_baseInfo">
						<view class="con_imgs">
							<image :src="item.company_pic" mode="widthFix"></image>
						</view>
						<view class="con_baseInfo">
							<view class="con_name_officelAuth">
								<view class="con_name u-line-1">
									<text>{{item.company_name}}</text>
								</view>
								<view class="con_officelAuth">
									<image :src="gtCommon.getOssImg('sansong/officelAuth.png')" mode="widthFix"></image>
								</view>
							</view>
							<view class="con_from_to">
								<view class="con_from">
									<text>{{item.line_info.start_city}}</text>
								</view>
								<view class="con_fromTo">
									<view class="con_text">
										<text v-if="item.line_info.line_type == 1">直达</text>
										<text v-if="item.line_info.line_type == 2">中转</text>
									</view>
									<view class="con_img">
										<image :src="gtCommon.getOssImg('sansong/cooperateFromTo.png')" mode="widthFix">
										</image>
									</view>
								</view>
								<view class="con_to">
									<text>{{item.line_info.end_city}}</text>
								</view>
							</view>
							<view class="con_address_distance">
								<view class="con_address u-line-1">
									<text>{{item.address}}</text>
								</view>
								<!-- <view class="con_distance">
										<text>3.4km</text>
									</view> -->
							</view>
							<view class="con_nums">
								<view class="con_numItem">
									<text>浏览量：</text>
									<text>{{item.visitor_count}}</text>
								</view>
								<view class="con_numItem">
									<text>下单量：</text>
									<text>{{item.order_count}}</text>
								</view>
								<view class="con_numItem">
									<text>收藏量：</text>
									<text>{{item.collect_count}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="con_notice">
						<u-notice-bar mode="horizontal" type="none" padding="8rpx 18rpx" volume-size="24" font-size="24"
							:list="[item.public_notice]"></u-notice-bar>
					</view>
					<view class="con_status_btns">
						<view class="con_status">
							<!-- <text>申请添加</text> -->
						</view>
						<view class="con_btns">
							<!-- gtCommon.callMobile(item.mobile) -->
							<view class="con_btnItem" @click="openPhoneCallPop(item)">
								<text>即刻联系</text>
							</view>
							<view class="con_btnItem" @click="showLine(item)">
								<text>立即添加</text>
							</view>
						</view>
					</view>
				</view>
			</view>
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
					<view class="con_confirmBtn" @click="addCooperate">
						<text>确定</text>
					</view>
				</u-popup>
			</view>
		</view>
		<!-- 电话弹层 -->
		<u-popup v-model="showCall" @close="showCall = false" mode="bottom" border-radius="14">
		    <view class="call_view">
		       <view class="call_item" v-if="targetItem.mobile" @click="callPhoneFn(targetItem.mobile)">
					<view class="item_name">
						<text>负责人</text>
					</view>
					<view class="item_val">
						<text>{{targetItem.mobile}}</text>
					</view>
		       </view>
			   <view class="call_item" v-if="targetItem.fixed_telephone" @click="callPhone()">
					<view class="item_name">
						<text>座机</text>
					</view>
					<view class="item_val">
						<text>{{targetItem.fixed_telephone}}</text>
					</view>
			   </view>
			   <view class="call_item" v-if="targetItem.line_info && targetItem.line_info.line_mobile" @click="callPhoneFn(targetItem.line_info.line_mobile)">
					<view class="item_name">
						<text>专线经理</text>
					</view>
					<view class="item_val">
						<text>{{targetItem.line_info && targetItem.line_info.line_mobile}}</text>
					</view>
			   </view>
			   <view class="call_item" @click="showCall = false">
					<view class="item_name">
						<text>取消</text>
					</view>			
			   </view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: '',
				lng: '',
				lat: '',
				dataShow: false,
				dataList: [],
				companyId: 0,
				lineShow: false,
				lineList: [],
				lineId: 0,
				showAddressStatus: true,
				showCall: false,
				targetItem: {}
			}
		},
		onLoad() {
			let gt = this;
			var lng = uni.getStorageSync('lng');
			var lat = uni.getStorageSync('lat');
			if (lng) {
				gt.lng = lng;
			}
			if (lat) {
				gt.lat = lat;
			}
			gt.getLinelist();
		},
		methods: {
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
			openPhoneCallPop(item) {
				let gt = this
				gt.showCall = true
				gt.targetItem = item
			},
			callPhoneFn(phone) {
				let gt = this
				gt.calll_company()
				gt.gtCommon.callMobile(phone)
			},
			calll_company() {
				let gt = this
				gt.gtRequest.post("/logistics/Company/company_calll_company", {
					logistics_id: gt.targetItem.logistics_id
				}).then(res => {})
			},
			callPhone() {
				let gt = this
				if(gt.gtCommon.isTel(gt.targetItem.fixed_telephone)) {
					gt.calll_company()
					uni.makePhoneCall({
						phoneNumber: gt.targetItem.fixed_telephone,
					});
				} else {
					uni.showToast({
						title: '手机号格式错误',
						icon: "error"
					})
				}
			},
			searchCompany() {
				let gt = this;
				var url = "/logistics/collaborate/get_logistics_company_list";
				var data = {
					search_key: gt.searchVal,
					page: 1,
					limit: 9999,
				};
				if (gt.lng) {
					data.user_lng = gt.lng;
				}
				if (gt.lat) {
					data.user_lat = gt.lat;
				}
				gt.gtRequest.post(url, data).then(res => {
					gt.dataList = res.list;
					gt.dataShow = true;
				});
			},
			showLine(item) {
				let gt = this;
				gt.companyId = item.logistics_id;
				gt.lineShow = true;
			},
			addCooperate() {
				let gt = this;
				if (gt.lineId == 0) {
					gt.$refs.uToast.show({
						title: '请选择专线！',
						type: 'error',
					});
					return false;
				}
				var url = "/logistics/collaborate/apply_collaborate";
				var data = {
					to_logistics_id: gt.companyId,
					line_id: gt.lineId,
					is_show_address: gt.showAddressStatus ? 1 : 0,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.lineShow = false;
					gt.$refs.uToast.show({
						title: '申请成功！',
						type: 'success',
						back:true,
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		.gt_content {
			.con_search {
				margin: 8rpx 16rpx;
			}

			.con_dataList {
				.con_empty {
					text-align: center;
				}

				.con_list {
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
									min-height: 40rpx;

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
									background: #30A265;
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
		
			.call_view {
				padding-top: 8rpx;
				.call_item {
					padding: 32rpx 0;
					border-bottom: 1rpx solid #e5e5e5;
					&:last-child {
						border-bottom: none;
					}
					.item_name {
						text-align: center;
					}
					.item_val {
						text-align: center;
						color: $gtProjectColor;
					}
				}
			}
		}
	}
</style>