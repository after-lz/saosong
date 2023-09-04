<template>
	<view class="gt_content">
		<scroll-view class="con_scrollView" scroll-y @scrolltolower="loadMore" style="height: 100vh;">
			<template v-if="list.length">
				<view class="con_item" v-for="(item,index) in list" :key="index">
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
									<image :src="gtCommon.getOssImg('order/copy.png')" mode="widthFix"></image>
								</view>
							</view>
						</view>
						<view class="con_status">
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
								<view v-else>{{item.transport_day_min}} - {{item.transport_day_max}}天</view>
							</view>
						</view>
						<view class="con_key_val">
							<view class="con_key">
								<text>货物信息：</text>
							</view>
							<view class="con_val">
								<text>{{item.goods_name}}/{{item.goods_number}}件/{{parseFloat(item.goods_weight)}}吨/{{parseFloat(item.goods_volume)}}方</text>
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
							<text>￥{{item.pay_to_logistics_money}}</text>
						</view>
					</view>
					<view class="con_line"></view>
					<view class="con_btns">
						<text>运费：</text>
						<text style="color: #FF6067;">￥{{item.pay_to_logistics_money}}元</text>
						<text>{{judgeStatus(item, 'order')}}</text>
						<text class="await">打款中</text>
					</view>
				</view>
				<u-loadmore :status="status" />
			</template>
			<view class="con_empty" v-else>
				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				params: {},
				status: 'loading',
			}
		},
		onLoad() {
			let gt = this
			gt.params = {
				page: 1,
				limit: 10
			}
			gt.getList()
		},
		methods: {
			getList() {
				let gt = this
				gt.gtRequest.post('/logistics/User/onway_money_list', gt.params).then(res => {
					gt.list = [...gt.list, ...res.list]
					gt.status = gt.params.page >= res.total_page ? 'nomore' : 'loading'
				})
			},
			loadMore() {
				let gt = this
				if(gt.status === 'nomore') return
				++gt.params.page
				gt.getList()
			},
			judgeStatus(orderInfo, from="index") {
				orderInfo.pay_status = parseInt(orderInfo.pay_status)
				switch (orderInfo.pay_status) {
					case 0:
						if(from == 'index'){
							if (orderInfo.pay_method == 1) {
								return "(待支付)"
							} else {
								return "(到付)"
							}
						}else{
							if (orderInfo.pay_method == 1) {
								return "(待支付)"
							} else {
								return "(到付)"
							}
						}
					case 1:
						return "(货主已申请支付)";
					case 2:
						return "(支付完成)"
					default:
						return "(异常或取消)";
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		// .gt_content {
		// 	height: 100vh;
		// }
	}
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
			margin-left: 10rpx;
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
			padding: 20rpx 12rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			.await {
				color: #909399;
				font-size: 24rpx;
				margin-left: 20rpx;
			}
		}
	}
	.u-more {
		margin: 36rpx 0;
	}
</style>