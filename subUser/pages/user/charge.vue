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

		<view class="con_btn" @click="submitCharge">
			<text>确认充值</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '',
				openId: '',
			}
		},
		onLoad() {
			let gt = this;
			var openId = uni.getStorageSync('openId');
			gt.openId = openId;
		},
		methods: {
			submitCharge() {
				let gt = this;
				var url = "/logistics/companywallet/apply_recharge";
				var data = {
					number: gt.money,
				};
				gt.gtRequest.post(url, data).then(res => {
					// uni.showModal({
					// 	title: 'com1',
					// 	content: JSON.stringify(res)
					// })
					// #ifdef MP-WEIXIN
					var url = "/cargo/pay/go_pay";
					var data = {
						pay_sn: res.pay_sn,
						pay_type: 4,
						requet_type: 'wxminapp',
						openid: gt.openId,
						platform: 'logistics'
					};
					gt.gtRequest.post(url, data).then(rs => {
						console.log(rs);
						// return false;
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
										back: true,
									})
									return false;
								}
							},
							fail(rs) {
								console.log(rs);
								gt.$refs.uToast.show({
									title: '支付失败',
									type: 'error',
								});
							},
							complete(rs) {
								//    console.log(rs);
							}
						});


					});
					// #endif

					// #ifdef APP-PLUS
					var url = "/cargo/pay/go_pay";
					var data = {
						pay_sn: res.pay_sn,
						pay_type: 4,
						requet_type: 'app',
						platform: 'logistics'
					};
					gt.gtRequest.post(url, data).then(rs => {
						console.log(rs);
						// uni.showModal({
						// 	title: 'com2',
						// 	content: JSON.stringify(rs)
						// })

						//订单对象，从服务器获取
						var orderInfo = {
							appid: rs.pay_params.appid, // 应用ID（AppID）
							partnerid: rs.pay_params.partnerid + "", // 商户号（PartnerID）
							prepayid: rs.pay_params.prepayid, // 预支付交易会话ID
							package: rs.pay_params.package, // 固定值
							noncestr: rs.pay_params.noncestr, // 随机字符串
							timestamp: rs.pay_params.timestamp, // 时间戳（单位：秒）
							sign: rs.pay_params.sign, // 签名，这里用的 MD5 签名
						};
						// uni.showModal({
						// 	title: 'com3',
						// 	content: JSON.stringify(orderInfo)
						// })
						uni.getProvider({
							service: 'payment',
							success: function(res) {
								console.log(res.provider)
								console.log(orderInfo);
								// uni.showModal({
								// 	title: 'com4',
								// 	content: JSON.stringify(res)
								// })
								// if (~res.provider.indexOf('wxpay')) {
								uni.requestPayment({
									provider: "wxpay", //固定值为"wxpay"
									orderInfo: orderInfo,
									success: function(res) {
										gt.$refs.uToast.show({
											title: '支付成功',
											type: 'success',
											back: true,
										})
										return false;
									},
									fail: function(err) {
										console.log('支付失败:' + JSON.stringify(err));
										gt.$refs.uToast.show({
											title: '支付失败',
											type: 'error',
										});
									}
								});
								// }
							},
							fail: function(res) {
								console.log(res);
								// uni.showModal({
								// 	title: 'com5',
								// 	content: JSON.stringify(res)
								// })
							}
						});
					});
					// #endif

				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_card {
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				padding: 32rpx 40rpx;

				.con_title {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 40rpx;
				}

				.con_iconInput {
					display: flex;
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
						width: 600rpx;
					}
				}
			}

			.con_btn {
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
				margin-top: 286rpx;
				margin-left: 16rpx;
			}
		}
	}
</style>