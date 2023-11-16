<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_card">
			<view class="con_title">
				<text>充值金额</text>
			</view>
			<view class="con_iconInput">
				<view class="con_icon">
					<text>￥</text>
				</view>
				<view class="con_input">
					<u-input v-model="money" type="digit" placeholder="请输入充值金额" height="40" />
				</view>
			</view>
		</view>
		<view class="con_card">
			<view class="con_title">
				<text>充值方式</text>
			</view>
			<view class="con_iconInput" @click="showPayType = true">
				<view class="con_icon">
					<u-icon name="weixin-circle-fill" color="#43c93e" size="50" v-if="pay_type == 4"></u-icon>
					<u-icon name="zhifubao-circle-fill" color="#2979ff" size="50" v-else></u-icon>
				</view>
				<view class="con_input">
					<text>{{ payTypeName }}</text>
				</view>
			</view>
		</view>
		<view class="con_btn" @click="$u.debounce(submitCharge, 500)">
			<text>确认充值</text>
		</view>
		<u-popup v-model="showPayType" @close="showPayType = false" mode="bottom" border-radius="14">
		    <view class="call_view">
				<view class="call_item" @click="onSelect(4)">
					<view class="item_name">
						<u-icon name="weixin-circle-fill" color="#43c93e" size="50"></u-icon>
					</view>
					<view class="item_val">
						<text>微信</text>
					</view>
				</view>
				<!-- #ifdef APP-PLUS -->
				<view class="call_item" @click="onSelect(3)">
					<view class="item_name">
						<u-icon name="zhifubao-circle-fill" color="#2979ff" size="50"></u-icon>
					</view>
					<view class="item_val">
						<text>支付宝</text>
					</view>
				</view>
				<!-- #endif -->
				<view class="call_item" @click="showPayType = false">
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
				money: '',
				openId: '',
				showPayType: false,
				pay_type: 4,
				payTypeName: '微信充值'
			}
		},
		onLoad() {
			let gt = this
			gt.openId = uni.getStorageSync('openId')
		},
		methods: {
			onSelect(type) {
				let gt = this
				gt.pay_type = type
				gt.payTypeName = type == 4 ? '微信充值' : '支付宝充值'
				gt.showPayType = false
			},
			submitCharge() {
				let gt = this
				gt.gtRequest.post("/logistics/companywallet/apply_recharge", {
					number: gt.money
				}).then(res => {
					// #ifdef MP-WEIXIN
					gt.gtRequest.post("/logistics/pay/go_pay", {
						pay_sn: res.pay_sn,
						pay_type: gt.pay_type,
						requet_type: 'wxminapp',
						openid: gt.openId,
						platform: 'logistics'
					}).then(rs => {
						if(gt.pay_type == 4) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: rs.pay_params.timeStamp,
								nonceStr: rs.pay_params.nonceStr,
								package: rs.pay_params.package,
								signType: rs.pay_params.signType,
								paySign: rs.pay_params.paySign,
								success(r) {
									if (r.errMsg == 'requestPayment:ok') {
										gt.$refs.uToast.show({
											title: '支付成功',
											type: 'success',
											back: true
										})
									}
								},
								fail(err) {
									gt.$refs.uToast.show({
										title: '支付失败',
										type: 'error'
									})
								},
								complete(r) {}
							})
						}
					})
					// #endif

					// #ifdef APP-PLUS
					gt.gtRequest.post("/logistics/pay/go_pay", {
						pay_sn: res.pay_sn,
						pay_type: gt.pay_type,
						requet_type: 'app',
						platform: 'logistics'
					}).then(rs => {
						if(gt.pay_type == 4) {
							uni.getProvider({
								service: 'payment',
								success: function(res) {
									uni.requestPayment({
										provider: "wxpay", //固定值为"wxpay"
										orderInfo: {
											appid: rs.pay_params.appid, // 应用ID（AppID）
											partnerid: rs.pay_params.partnerid + "", // 商户号（PartnerID）
											prepayid: rs.pay_params.prepayid, // 预支付交易会话ID
											package: rs.pay_params.package, // 固定值
											noncestr: rs.pay_params.noncestr, // 随机字符串
											timestamp: rs.pay_params.timestamp, // 时间戳（单位：秒）
											sign: rs.pay_params.sign, // 签名，这里用的 MD5 签名
										},
										success: function(res) {
											gt.$refs.uToast.show({
												title: '支付成功',
												type: 'success',
												back: true
											})
										},
										fail: function(err) {
											gt.$refs.uToast.show({
												title: '支付失败',
												type: 'error'
											})
										}
									})
								},
								fail: function(res) {}
							})
						} else if(gt.pay_type == 3) {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: rs.orderInfo,
								success: function(res) {
									gt.$refs.uToast.show({
										title: '支付成功',
										type: 'success',
										back: true
									})
								},
								// 参数有问题则抛出错误
								fail: function(err) {
									gt.$refs.uToast.show({
										title: '支付失败',
										type: 'error'
									})
								}
							})
						}
					})
					// #endif
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding: 0 16rpx;
			.con_card {
				background: #FFFFFF;
				border-radius: 16rpx;
				padding: 32rpx 40rpx;
				margin-top: 20rpx;
				.con_title {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 40rpx;
				}

				.con_iconInput {
					display: flex;
					align-items: center;
					margin-top: 48rpx;
					border-bottom: 2rpx soild #000;

					.con_icon {
						font-size: 40rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 40rpx;
					}

					.con_input {
						// width: 600rpx;
						margin-left: 10rpx;
					}
				}
			}

			.con_btn {
				// width: 718rpx;
				height: 100rpx;
				background: #485EF4;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 100rpx;
				text-align: center;
				margin-top: 286rpx;
			}
			.call_view {
				padding-top: 8rpx;
				.call_item {
					display: flex;
					justify-content: center;
					align-items: center;
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
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>