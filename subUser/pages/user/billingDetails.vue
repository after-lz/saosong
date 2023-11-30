<template>
	<view class="myBillDetails">
		<view class="main-view">
			<view class="top flex-con">
				<text>{{ data.num }}</text>
			</view>
			<view class="info-top-view">
				<!-- 充值 -->
				<template v-if="data.type == 'logistics_company_wallet_recharge'">
					<view class="info-item flex-left">
						<view>
							<text>当前状态:</text>
						</view>
						<view class="right">
							<text>充值成功</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>账单类型:</text>
						</view>
						<view class="right">
							<text>充值</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>充值方式:</text>
						</view>
						<view class="right">
							<text>{{ judgePayType(data.method) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>充值时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>交易单号:</text>
						</view>
						<view class="right">
							<text>{{ data.sn }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>零钱余额:</text>
						</view>
						<view class="right">
							<text>¥{{ data.money }}</text>
						</view>
					</view>
				</template>
				<!-- 提现 -->
				<template v-if="data.type == 'logistics_company_wallet_withdraw'">
					<view class="info-item flex-left">
						<view>
							<text>当前状态:</text>
						</view>
						<view class="right green">
							<text>提现审核通过</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>提现金额:</text>
						</view>
						<view class="right">
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>提现方式:</text>
						</view>
						<view class="right">
							<text>{{ judgeWithdrawType(data.method) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>申请时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time1, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>到账时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time2, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>交易单号:</text>
						</view>
						<view class="right">
							<text>{{ data.sn }}</text>
						</view>
					</view>
				</template>
				<!-- 增值服务 -->
				<template v-if="data.type == 'line_deposit_temp' || data.type == 'line_promote' || data.type == 'line_member_temp'">
					<view class="info-item flex-left">
						<view>
							<text>当前状态:</text>
						</view>
						<view class="right">
							<text>支付成功</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>账单类型:</text>
						</view>
						<view class="right">
							<text v-if="data.type == 'line_deposit_temp'">押金</text>
							<text v-if="data.type == 'line_promote'">推广</text>
							<text v-if="data.type == 'line_member_temp'">会员</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>支付金额:</text>
						</view>
						<view class="right">
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>支付方式:</text>
						</view>
						<view class="right">
							<text>{{ judgePayType(data.method) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>支付时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>交易单号:</text>
						</view>
						<view class="right">
							<text>{{ data.sn }}</text>
						</view>
					</view>
				</template>
				<!-- 押金退款 -->
				<template v-if="data.type == 'line_deposit_refund'">
					<view class="info-item flex-left">
						<view>
							<text>当前状态:</text>
						</view>
						<view class="right">
							<text>退款成功</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>账单类型:</text>
						</view>
						<view class="right">
							<text>押金退款</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>退款金额:</text>
						</view>
						<view class="right">
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>退款方式:</text>
						</view>
						<view class="right">
							<text>{{ judgePayType(data.method) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>退款时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>交易单号:</text>
						</view>
						<view class="right">
							<text>{{ data.sn }}</text>
						</view>
					</view>
				</template>
				<!-- 异常单支付 -->
				<template v-if="data.type == 'deliver_order_abnormal'">
					<view class="info-item flex-left">
						<view>
							<text>当前状态:</text>
						</view>
						<view class="right">
							<text>支付成功</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>账单类型:</text>
						</view>
						<view class="right">
							<text>异常单支付</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>支付金额:</text>
						</view>
						<view class="right">
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>支付方式:</text>
						</view>
						<view class="right">
							<text>{{ judgePayType(data.method) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>支付时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>交易单号:</text>
						</view>
						<view class="right">
							<text>{{ data.sn }}</text>
						</view>
					</view>
				</template>
				<!-- 线下收款 -->
				<template v-if="data.type == 'deliver_order' && data.remark">
					<view class="info-item flex-left">
						<view>
							<text>当前状态:</text>
						</view>
						<view class="right">
							<text>线下收款成功</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>账单类型:</text>
						</view>
						<view class="right">
							<text>{{ data.remark }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>收款金额:</text>
						</view>
						<view class="right">
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>收款方式:</text>
						</view>
						<view class="right">
							<text>线下收款</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>收款时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>关联订单:</text>
						</view>
						<view class="right a" @click="goOrderDetail">
							<text>{{ data.sn }}</text>
						</view>
					</view>
				</template>
				<!-- 订单结算 -->
				<template v-if="data.type == 'deliver_order' && !data.remark">
					<view class="info-item flex-left">
						<view>
							<text>当前状态:</text>
						</view>
						<view class="right">
							<text>到账成功</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>账单类型:</text>
						</view>
						<view class="right">
							<text>完单结算</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>结算金额:</text>
						</view>
						<view class="right">
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>到账时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>关联订单:</text>
						</view>
						<view class="right a" @click="goOrderDetail">
							<text>{{ data.sn }}</text>
						</view>
					</view>
				</template>
				<!-- 红包转余额-通过 -->
				<template v-if="data.type == 'logistics_company_wallet_zhuanyuee'">
					<view class="info-item flex-left">
						<view>
							<text>当前状态:</text>
						</view>
						<view class="right">
							<text>转余额审核通过</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>转余额金额:</text>
						</view>
						<view class="right green">
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>申请时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time1, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>到账时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time2, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>交易单号:</text>
						</view>
						<view class="right">
							<text>{{ data.sn }}</text>
						</view>
					</view>
				</template>
				<!-- 红包 -->
				<template v-if="data.type == '完单红包' || data.type == '圈子任务奖励' || data.type == '推广红包' || data.type == '专线任务奖励' || data.type == '认证红包'">
					<view class="info-item flex-left">
						<view>
							<text>账单类型:</text>
						</view>
						<view class="right">
							<text>{{ data.type }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>奖励金额:</text>
						</view>
						<view class="right">
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="info-item flex-left">
						<view>
							<text>到账时间:</text>
						</view>
						<view class="right">
							<text>{{ gtCommon.formateTime(data.time, 'YYYY-MM-DD HH:mm:ss') }}</text>
						</view>
					</view>
					<view class="info-item flex-left" v-if="data.sn">
						<view>
							<text>关联订单:</text>
						</view>
						<view class="right a" @click="goOrderDetail">
							<text>{{ data.sn }}</text>
						</view>
					</view>
				</template>
			</view>
			
			<!-- 推广支付明细 -->
			<view class="box-view" v-if="data.type == 'line_deposit_temp' || data.type == 'line_promote' || data.type == 'line_member_temp'">
				<view class="title">
					<text>支付明细</text>
				</view>
				<view class="mx-view">
					<view class="mx-li flex-between">
						<view>
							<text>总金额</text>
						</view>
						<view>
							<text v-if="data.type == 'line_promote'">¥{{ Math.abs(data.num) + parseFloat(data.detail[0].money02) }}</text>
							<text v-else>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<!-- 只有推广才有红包 -->
					<view class="mx-li flex-between" v-if="data.type == 'line_promote'">
						<view>
							<text>红包抵扣</text>
						</view>
						<view>
							<!-- <text>{{ judgePayType(data.detail.money02) }}</text> -->
							<text v-if="data.detail.length">-¥{{ data.detail[0].money02 }}</text>
						</view>
					</view>
					<view class="mx-li flex-between">
						<view>
							<text>实付金额</text>
						</view>
						<view>
							<text class="green">¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 线下收款支付明细 -->
			<view class="box-view" v-if="data.type == 'deliver_order' && data.remark">
				<view class="title">
					<text>支付明细</text>
				</view>
				<view class="mx-view">
					<view class="mx-li flex-between">
						<view>
							<text>总金额</text>
						</view>
						<view>
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="mx-li flex-between">
						<view>
							<text>线下收款金额</text>
						</view>
						<view>
							<text class="green">¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 异常单支付明细 -->
			<view class="box-view" v-if="data.type == 'deliver_order_abnormal'">
				<view class="title">
					<text>支付明细</text>
				</view>
				<view class="mx-view">
					<view class="mx-li flex-between">
						<view>
							<text>总金额</text>
						</view>
						<view>
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="mx-li flex-between">
						<view>
							<text>实付金额</text>
						</view>
						<view>
							<text class="green">¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 订单结算支付明细 -->
			<view class="box-view" v-if="data.type == 'deliver_order' && !data.remark">
				<view class="title">
					<text>支付明细</text>
				</view>
				<view class="mx-view">
					<view class="mx-li flex-between">
						<view>
							<text>总金额</text>
						</view>
						<view>
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="mx-li flex-between" v-for="item in data.detail" :key="item.name">
						<view>
							<text>{{ item.name }}</text>
						</view>
						<view>
							<text class="green">¥{{ Math.abs(item.money) }}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 押金退款 -->
			<view class="box-view" v-if="data.type == 'line_deposit_refund'">
				<view class="title">
					<text>退款明细</text>
				</view>
				<view class="mx-view">
					<view class="mx-li flex-between">
						<view>
							<text>退款总金额</text>
						</view>
						<view>
							<text>¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
					<view class="mx-li flex-between">
						<view>
							<text>实际退款金额</text>
						</view>
						<view>
							<text class="green">¥{{ Math.abs(data.num) }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "myBillDetails",
		data() {
			return {
				data: {}
			}
		},
		onLoad(options) {
			let gt = this
			gt.getData(options.id)
		},
		methods: {
			getData(id) {
				let gt = this
				gt.gtRequest.post("/api/applogin/get_bill_info", {
					platform: "logistics",
					id
				}).then(res=>{
					res.num = parseFloat(res.num) > 0 ? "+" + parseFloat(res.num) : parseFloat(res.num)
					if(res.detail) res.detail = JSON.parse(res.detail)
					gt.data = res
					console.log(gt.data)
				})
			},
			goOrderDetail() {
				let gt = this
				uni.navigateTo({
					url: '/pages/order/orderInfo?orderSn=' + gt.data.sn
				})
			},
			/* 支付方式 */
			judgePayType(type) {
				let str = ''
				switch (type){
					case 'money01':
						str = '零钱'
						break;
					case 'money02':
						str = '红包'
						break;
					case 'money03':
						str = '行为分'
						break;
					case 'weipay':
						str = '微信支付'
						break;
					case 'weipay_mini':
						str = '微信支付'
						break;
					case 'weipay_app':
						str = '微信支付'
						break;
					case 'alipay':
						str = '支付宝支付'
						break;
					case 'alipay_app':
						str = '支付宝支付'
						break;
					case 'coupon':
						str = '优惠券'
						break;
					case 'cash':
						str = '现金'
						break;
					default:
						break;
				}
				return str
			},
			/* 提现方式 */
			judgeWithdrawType(type) {
			    // let str = ''
			    // switch (type) {
			    //     case 1:
			    //         str = '线下支付'
			    //         break;
			    //     case 2:
			    //         str = '余额支付'
			    //         break;
			    //     case 3:
			    //         str = '支付宝支付'
			    //         break;
			    //     case 4:
			    //         str = '微信支付'
			    //         break;
			    //     default:
			    //         break;
			    // }
			    // return str
				return type == 2 ? '支付宝提现' : '银行卡提现'
			}
		}
	}
</script>
<style lang="scss">
	.myBillDetails{
		width: 100%;
		height: 100vh;
		background-color: $gtBackgroundColor;
		.main-view {
			padding: 20rpx 16rpx;
			.top{
				padding: 35rpx 0;
				margin-bottom: 20rpx;
				background-color: #FFFFFF;
				border-radius: 16rpx;
				font-size: 90rpx;
				text-align: center;
			}
			.info-top-view{
				background-color: #FFFFFF;
				border-radius: 16rpx;
				padding: 24rpx;
				margin-bottom: 20rpx;
				.info-item{
					width: 100%;
					margin-bottom: 10rpx;
					&:last-child{
						margin-bottom: 0 !important;
					}
					.right{
						margin-left: 20rpx;
					}
				}
			}
			.box-view{
				background-color: #FFFFFF;
				border-radius: 16rpx;
				padding: 24rpx;
				margin-bottom: 20rpx;
				.title{
					width: 100%;
					font-size: 30rpx;
					font-weight: bold;
					color: #000000;
					margin-bottom: 20rpx;
				}
				.mx-view{
					width: 100%;
					.mx-li{
						width: 100%;
						margin-bottom: 10rpx;
						&:last-child{
							margin-bottom: 0 !important;
						}
					}
				}
			}
		
			.flex-left {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
			}
			.flex-con {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.flex-between {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.green {
				color: #70b603;
			}
			.a {
				color: $gtProjectColor;
			}
		}
	}
</style>