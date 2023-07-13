<template>
	<view class="gt_content">
		<view class="con_card">
			<view class="con_totalMoney_orderType">
				<view class="con_totalMoney">
					<text>{{totalMoney}}元</text>
				</view>
				<view class="con_orderType">
					<text v-if="dataInfo.order_type == 1">指派单</text>
					<text v-if="dataInfo.order_type == 2">极速单</text>
				</view>
			</view>
			<view class="con_tip">
				<text>若产生进仓费、停车费和搬运费等，请与货主及时沟通额外支付。</text>
			</view>
		</view>
		<view class="con_card">
			<view class="con_unPay" v-if="unPayTotalMoney > 0">
				<view class="con_title">
					<text>待支付费用(新增费用)</text>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0" />
				</view>
				<view class="con_list">
					<view class="con_item">
						<view class="con_type">
							<text>合计</text>
						</view>
						<view class="con_money">
							<text>{{unPayTotalMoney}}元</text>
						</view>
					</view>
					<view class="con_item" v-for="(item,index) in unPayBillList" :key="index">
						<view class="con_type">
							<text>{{item.fee_notice}}</text>
						</view>
						<view class="con_money">
							<text>{{item.money}}元</text>
						</view>
					</view>
				</view>
			</view>
			<view class="con_pay" >
				<view class="con_title">
					<text>已支付费用</text>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0" />
				</view>
				<view class="con_list">
					<view class="con_item">
						<view class="con_type">
							<text>合计</text>
						</view>
						<view class="con_money">
							<text>{{payTotalMoney}}元</text>
						</view>
					</view>
					<view class="con_item" v-for="(item,index) in payBillList" :key="index">
						<view class="con_type">
							<text>{{item.fee_notice}}</text>
						</view>
						<view class="con_money">
							<text>{{item.money}}元</text>
						</view>
					</view>
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
				payBillList: [],
				unPayBillList: [],
				payTotalMoney: 0,
				unPayTotalMoney: 0,
				totalMoney:0,
			}
		},
		onLoad(options) {
			let gt = this;
			gt.orderSn = options.orderSn;
			gt.getDataInfo();
		},
		methods: {
			getDataInfo() {
				let gt = this;
				var url = "/logistics/order/get_order_detail";
				var data = {
					deliver_sn: gt.orderSn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.cargoInfo = res.cargo_info;
					if (res.order_info.pack_imgs) {
						res.order_info.pack_imgs = res.order_info.pack_imgs.split('||');
					}
					gt.dataInfo = res.order_info;
					gt.sendInfo = res.waybill_info;

					var payBillList = [];
					var unPayBillList = [];
					var payTotalMoney = 0;
					var unPayTotalMoney = 0;
					for (var i = 0; i < res.fee_detail.length; i++) {
						if (res.fee_detail[i].status == 2) {
							payBillList.push(res.fee_detail[i]);
							payTotalMoney = ((payTotalMoney * 100 + res.fee_detail[i].money * 100) / 100).toFixed(
								2);
						} else {
							unPayBillList.push(res.fee_detail[i]);
							unPayTotalMoney = ((unPayTotalMoney * 100 + res.fee_detail[i].money * 100) / 100)
								.toFixed(2);
						}
					}
					payBillList.sort((x, y) => {
						return y.create_time - x.create_time;
					});
					unPayBillList.sort((x, y) => {
						return y.create_time - x.create_time;
					});
					gt.payBillList = payBillList;
					gt.unPayBillList = unPayBillList;
					gt.unPayTotalMoney = unPayTotalMoney;
					gt.payTotalMoney = payTotalMoney;
					gt.totalMoney = ((unPayTotalMoney * 100 + payTotalMoney * 100)/100).toFixed(2);


				});
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $gtBackgroundColor;
		.gt_content{
			.con_card{
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;
				.con_totalMoney_orderType{
					display: flex;
					justify-content: space-between;
					.con_totalMoney{
						font-size: 40rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 56rpx;
					}
					.con_orderType{
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: $gtProjectColor;
						line-height: 40rpx;
						margin-top: 8rpx;
					}
				}
				.con_tip{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					line-height: 40rpx;
					margin-top: 16rpx;
				}
				
				.con_unPay{
					.con_title{
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
					}
					.con_list{
						margin-bottom: 40rpx;
						.con_item{
							display: flex;
							justify-content: space-between;
							margin: 12rpx 0;
							.con_type{
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
							}
							.con_money{
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
							}
						}
						.con_item:nth-child(1){
							.con_type{
								color: #FF6067;
							}
							.con_money{
								color: #FF6067;
							}
						}
					}
				}
				.con_pay{
					.con_title{
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
					}
					.con_list{
						.con_item{
							display: flex;
							justify-content: space-between;
							margin: 12rpx 0;
							.con_type{
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
							}
							.con_money{
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
							}
						}
						.con_item:nth-child(1){
							.con_type{
								color: #FF6067;
							}
							.con_money{
								color: #FF6067;
							}
						}
					}
				}
			}
		}
	}
</style>