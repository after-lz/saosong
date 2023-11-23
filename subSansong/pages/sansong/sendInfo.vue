<template>
	<view class="gt_content">
		<view class="con_toast" v-if="dataInfo.waybill_info">
			<u-toast ref="uToast" />
		</view>
		<view class="con_driverInfo" v-if="dataInfo.waybill_info">
			<view class="con_leftRight">
				<view class="con_left">
					<view class="con_textBtn">
						<view class="con_text">
							<text>运单号：</text>
							<text>{{dataInfo.waybill_info.waybill_sn}}</text>
						</view>
						<view class="con_btn" @click="gtCommon.copyStr(dataInfo.waybill_info.waybill_sn)">
							<image :src="gtCommon.getOssImg('sansong/copy.png')" mode="widthFix"></image>
						</view>
					</view>
					<view class="con_textBtn">
						<view class="con_text">
							<text>发车时间：</text>
							<!-- <text>{{dataInfo.waybill_info.create_time}}</text> -->
							<text>{{gtCommon.formateTime(sendTime,'YYYY-MM-DD HH:mm')}}</text>
						</view>
					</view>
					<view class="con_textBtn">
						<view class="con_text">
							<text>车牌号：</text>
							<text style="color: #000;">{{dataInfo.waybill_info.license_plate}}</text>
						</view>
					</view>
					<view class="con_textBtn">
						<view class="con_text">
							<text>司机：</text>
							<text>{{dataInfo.waybill_info.driver_name}}</text>
						</view>
					</view>
					<view class="con_textBtn">
						<view class="con_text">
							<text>手机：</text>
							<text>{{dataInfo.waybill_info.driver_mobile}}</text>
						</view>
					</view>
				</view>
				<view class="con_right">
					<view class="con_status">
						<text v-if="dataInfo.waybill_info.status == 0">运输中</text>
						<text v-if="dataInfo.waybill_info.status == 1">已到达</text>
					</view>
				</view>
			</view>
		</view>

		<view class="con_lineInfo" v-if="dataInfo.waybill_info">
			<view class="con_keyVal">
				<view class="con_key">
					<view class="con_required">
						<text>*</text>
					</view>
					<view class="con_text">
						<text>选择专线</text>
					</view>
				</view>
				<view class="con_val">
					<view class="con_text">
						<text>{{dataInfo.waybill_info.line_start_city}}-{{dataInfo.waybill_info.line_end_city}}</text>
						<text style="color:#485EF4;">(共{{dataInfo.deliver_order_count}}单)</text>
					</view>
					<view class="con_icon">
						<u-icon name="arrow-right" size="30" color="#909399"></u-icon>
					</view>
				</view>

			</view>
			<view class="con_line">
				<u-line length="670rpx" color="#F2F2F2" margin="32rpx 24rpx"></u-line>
			</view>
			<view class="con_keyVal">
				<view class="con_key">
					<view class="con_required">
						<text>*</text>
					</view>
					<view class="con_text">
						<text>到站网点</text>
					</view>
				</view>
				<view class="con_val">
					<view class="con_text">
						<view class="con_textItem">
							<text>到站公司：{{dataInfo.waybill_info.outlets_name}}</text>
						</view>
						<view class="con_textItem">
							<text>线路经理：{{dataInfo.waybill_info.outlets_contact}}</text>
						</view>
						<view class="con_textItem">
							<text>到站电话：{{dataInfo.waybill_info.outlets_mobile}}</text>
						</view>
						<view class="con_textItem">
							<text>到站地址：{{dataInfo.waybill_info.outlets_address}}</text>
						</view>
					</view>
					<view class="con_icon">
						<u-icon name="arrow-right" size="30" color="#909399"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<view class="con_orderInfo">
			<view class="con_list">
				<view class="con_item" v-for="(item,index) in dataInfo.deliver_order_list" :key="index">
					<text>订单号:</text>
					<text @click="goOrderInfo(item.deliver_sn)">{{item.deliver_sn}}</text>
					<text>{{item.goods_name}}</text>
					<text>/{{item.goods_number}}件/{{item.goods_weight}}吨/{{item.goods_volume}}方</text>
					<text v-if="item.peisong_type == 1">送货上门</text>
					<text v-if="item.peisong_type == 2">自提</text>
				</view>
			</view>
		</view>

		<view class="con_imgs">
			<view class="con_title">
				<text>装车照片</text>
			</view>
			<view class="con_list">
				<view class="con_item" v-for="(item,index) in imgList" :key="index"
					@click="gtCommon.previewImg(item + '?x-oss-process=style/sansong_app')">
					<image :src="item + '?x-oss-process=style/sansong_app'" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<view class="con_startInfo" v-if="dataInfo.logistics_info">
			<view class="con_title">
				<text>发站信息</text>
			</view>
			<view class="con_info">
				<view class="con_item">
					<text>发站公司：{{dataInfo.logistics_info.company_name}}</text>
				</view>
				<view class="con_item">
					<text>专线经理：{{dataInfo.line_info.line_contact}}</text>
				</view>
				<view class="con_item">
					<text>经理手机：{{dataInfo.line_info.line_mobile}}</text>
				</view>
				<view class="con_item">
					<text>发站地址：{{dataInfo.logistics_info.address}}</text>
				</view>
			</view>
		</view>

		<view class="con_actionList">
			<view class="con_title">
				<text>操作记录</text>
			</view>
			<view class="con_timeLine">
				<view class="con_item" v-for="(item,index) in actionList" :key="index">
					<view class="con_icon_title">
						<view class="con_icon">
						</view>
						<view class="con_text">
							<text>{{item.log_remark}}</text>
						</view>
					</view>
					<view class="con_line_time">
						<view class="con_line">
							<u-line length="84rpx" color="#E5E5E5" direction="col" margin="16rpx"></u-line>
						</view>
						<view class="con_time">
							<text>{{gtCommon.formateTime(item.create_time,'YYYY-MM-DD HH:mm')}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="con_empty"></view>
		
		<view class="con_btns" v-if="dataInfo.waybill_info.status == 0">
			<view class="con_list">
				<view class="con_item" @click="goAdjust">
					<text>调整运单</text>
				</view>
				<!-- <view class="con_item">
					<text>导出</text>
				</view> -->
				<view class="con_item" @click="confirmArrive">
					<text>确认到达</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderSn: '',
				dataInfo: {},
				imgList: [],
				actionList: [],
				sendTime:0,
			}
		},
		onLoad(options) {
			let gt = this;
			gt.orderSn = options.orderSn;
		},
		onShow() {
			let gt = this;
			gt.getDataInfo();
		},
		methods: {
			confirmArrive() {
				let gt = this;
			
				var url = "/logistics/upwaybill/waybil_confirm_arrival";
				var data = {
					waybill_sn: gt.orderSn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.getDataInfo();
					gt.$refs.uToast.show({
						title: '到达成功！',
						type: 'success',
					});
				});
			},
			getDataInfo() {
				let gt = this;
				var url = "/logistics/waybill/get_waybill_detail";
				var data = {
					waybill_sn: gt.orderSn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.dataInfo = res;
					gt.imgList = res.waybill_info.images && res.waybill_info.images.split('||');
					gt.actionList = res.waybill_log_list;
					gt.sendTime = res.waybill_info.create_time;
				});
			},
			goOrderInfo(orderSn){
				uni.navigateTo({
					url: '/pages/order/orderInfo?orderSn=' + orderSn,
				});
				return false;
			},
			goAdjust(){
				let gt = this;
				uni.navigateTo({
					url:'./adjustSend?orderSn=' + gt.orderSn,
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
			margin-bottom: 20rpx;
			padding-bottom: 20rpx;
			image {
				width: 100%;
				height: 100% !important;
			}
			.con_driverInfo {
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_leftRight {
					display: flex;
					justify-content: space-between;

					.con_left {
						.con_textBtn {
							display: flex;

							.con_text {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #909399;
								line-height: 48rpx;
								white-space: nowrap;
							}

							.con_btn {
								width: 24rpx;
								height: 24rpx;
								margin-left: 8rpx;
								margin-top: 4rpx;
							}
						}
					}

					.con_right {
						.con_status {
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: $gtProjectColor;
							line-height: 44rpx;
						}
					}
				}
			}

			.con_lineInfo {
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_keyVal {
					display: flex;
					justify-content: space-between;

					.con_key {
						display: flex;

						.con_required {
							display: none;
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
							white-space: nowrap;
						}
					}

					.con_val {
						display: flex;
						.con_textItem {
							white-space: pre-wrap;
						}
						.con_text {
							// .con_textItem {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 48rpx;
							text-align: right;
							white-space: nowrap;
							// }

						}

						.con_icon {
							display: none;
							margin-top: 10rpx;
							margin-left: 10rpx;
						}
					}
				}
			}

			.con_orderInfo {
				width: 718rpx;

				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_list {
					margin-top: -24rpx;

					.con_item {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 40rpx;
						margin-top: 24rpx;

						text:nth-child(2) {
							color: $gtProjectColor;
						}

						text:nth-child(3) {
							margin-left: 20rpx;
						}
					}
				}
			}

			.con_imgs {
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_title {
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 50rpx;
				}


				.con_list {
					display: flex;
					margin-left: 10rpx;
					flex-wrap: wrap;

					.con_item {
						width: 160rpx;
						height: 160rpx;
						overflow: hidden;
						border-radius: 16rpx;
						margin: 20rpx;
					}
				}
			}

			.con_startInfo {
				width: 718rpx;
				// height: 324rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
				}

				.con_info {
					margin-top: 16rpx;

					.con_item {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 40rpx;
						margin: 8rpx 0;
					}
				}
			}

			.con_actionList {
				width: 718rpx;
				// height: 324rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
				}

				.con_timeLine {
					margin-top: 24rpx;

					.con_item {
						.con_icon_title {
							display: flex;

							.con_icon {
								width: 24rpx;
								height: 24rpx;
								background: #909399;
								border-radius: 50%;
								margin: 10rpx 0 0 24rpx;
							}

							.con_text {
								font-size: 32rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #000000;
								line-height: 44rpx;
								margin-left: 24rpx;
								white-space: nowrap;
							}
						}

						.con_line_time {
							display: flex;

							.con_line {
								margin-left: 16rpx;
							}

							.con_time {
								margin-top: 16rpx;
								margin-left: 32rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #909399;
								line-height: 40rpx;
							}
						}
					}

					.con_item:first-child {
						.con_icon {
							background: $gtProjectColor;
						}
					}

					// .con_item:last-child{
					// 	.con_line {
					// 		display: none;
					// 	}
					// }
				}
			}
		
			.con_empty {
				height: 112rpx;
			}
			
			.con_btns{
				// display: none;
				width: 750rpx;
				height: 112rpx;
				background: #FFFFFF;
				padding: 1rpx;
				position: fixed;
				bottom: 0;
				.con_list{
					display: flex;
					margin: 20rpx 0;
					padding-right: 10rpx;
					justify-content: flex-end;
					.con_item{
						width: 168rpx;
						height: 72rpx;
						border-radius: 10rpx;
						border: 2rpx solid #000000;
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 72rpx;
						text-align: center;
						margin: 0 10rpx;
					}
				}
			}
		}
	}
</style>