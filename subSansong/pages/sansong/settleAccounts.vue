<template>
	<view class="gt_content">
		<view class="info">
			<view class="info_num">￥<text class="money">{{ num }}</text></view>
			<view class="info_order">伞送科技-{{ order_id }}</view>
		</view>
		<view class="card" @click="type = 1">
			<view class="card_left">
				<view class="pay_logo" :style="{backgroundImage: `url(${gtCommon.getOssImg('user/walletIcon.png')})`}"></view>
				<view class="pay_info">
					<view class="pay_info_type">
						<text>余额抵扣</text>
					</view>
					<view class="pay_info_remark">
						<text>可用余额{{ totalNum }}元</text>
					</view>
				</view>
			</view>
			<view class="card_right" :style="{backgroundImage:
				  `url(${gtCommon.getOssImg(type === 1 ?'sansong/selected.png' : 'sansong/unSelected.png')})`}">
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="card" @click="type = 2">
			<view class="card_left">
				<view class="pay_logo" :style="{backgroundImage: `url(${gtCommon.getOssImg('user/wechatPayIcon.png')})`}"></view>
				<view class="pay_info">
					<view class="pay_info_type">
						<text>微信</text>
					</view>
				</view>
			</view>
			<view class="card_right" :style="{backgroundImage:
				  `url(${gtCommon.getOssImg(type === 2 ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="card" @click="type = 3">
			<view class="card_left">
				<view class="pay_logo" :style="{backgroundImage: `url(${gtCommon.getOssImg('user/wechatPayIcon.png')})`}"></view>
				<view class="pay_info">
					<view class="pay_info_type">
						<text>微信</text>
					</view>
				</view>
			</view>
			<view class="card_right" :style="{backgroundImage:
				  `url(${gtCommon.getOssImg(type === 3 ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
			</view>
		</view>
		<!-- #endif -->
		<view class="btn">
			<u-button type="primary" @click="submit">确定支付</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ids: '', // 充值押金的专线id
				order_id: '', // 生成支付订单的订单号
				num: 0, // 订单金额
				totalNum: 0, // 余额
				type: 0,
				_disabled: false
			}
		},
		onLoad(option) {
			let gt = this
			gt.ids = option.ids
			gt.num = option.num
			gt.totalNum = uni.getStorageSync('companyInfo').money01
			gt.creatdOrder()
		},
		methods: {
			creatdOrder() {
				let gt = this
				gt.gtRequest.post('/logistics/Specialline/create_deposit_order', {
					line_ids: gt.ids
				}).then(res => {
					gt.order_id = res.order_id
				})
			},
			submit() {
				let gt = this
				if(gt._disabled) return
				if(gt.type === 1 && +gt.num > +gt.totalNum) {
					return gt.$refs.uToast.show({
						title: '账户余额不足！'
					})
				}
				gt._disabled = true
				let Fn = gt.gtCommon.debounce(()=> {
					gt.gtRequest.post('/logistics/Specialline/pay_deposit_order', {
						order_id: gt.order_id,
						pay_method: gt.type // 1余额2微信小程序3微信app
					}).then(info => {
						if(gt.type === 1) {
							gt.$refs.uToast.show({
								title: '支付成功！',
								type: 'success',
								back: true
							})
						} else {
							// #ifdef MP-WEIXIN
							uni.getProvider({
							    service: 'payment',
							    success: function (res) {
							        uni.requestPayment({
							            provider: "wxpay",
							            ...info,
							            success(res) {
							                gt.$refs.uToast.show({
							                	title: '支付成功',
							                	type: 'success',
												back: true
							                })
							            },
							            fail(err) {
							                gt.$refs.uToast.show({
							                	title: '支付失败',
							                	type: 'error'
							                })
											gt._disabled = false
							            }
							        })
							    }
							})
							// #endif
							// #ifdef APP-PLUS
							uni.getProvider({
							    service: 'payment',
							    success: function (res) {
							        // if (~res.provider.indexOf('wxpay')) {
							            uni.requestPayment({
							                provider: "wxpay",
							                orderInfo: info,
							                success(res) {
							                    gt.$refs.uToast.show({
							                    	title: '支付成功',
							                    	type: 'success',
													back: true
							                    })
							                },
							                fail(err) {
							                    gt.$refs.uToast.show({
							                    	title: '支付失败',
							                    	type: 'error'
							                    })
												gt._disabled = false
							                }
							            })
							        // }
							    }
							})
							// #endif
						}
					}).catch(()=> {
						gt._disabled = false
					})
				}, 1000)
				Fn()
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.info {
				margin: 140rpx auto;
				.info_num {
					font-size: 40rpx;
					color: #000;
					font-weight: 500;
					font-family: PingFangSC-Medium, PingFang SC;
					text-align: center;
					.money {
						font-size: 90rpx;
					}
				}
				.info_order {
					color: #909399;
					font-size: 32rpx;
					margin-top: 20rpx;
					text-align: center;
				}
			}
			.card {
				height: 148rpx;
				background-color: #fff;
				border-radius: 16rpx;
				margin: 0 16rpx 20rpx 16rpx;
				padding: 0 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.card_left {
					display: flex;
					align-items: center;
					.pay_logo {
						width: 60rpx;
						height: 60rpx;
						background-size: cover;
						background-repeat: no-repeat;
						margin-right: 32rpx;
					}
					.pay_info {
						.pay_info_type {
							font-size: 32rpx;
						}
						.pay_info_remark {
							color: #909399;
							font-size: 24rpx;
							margin-top: 6rpx;
						}
					}
				}
				.card_right {
					width: 36rpx;
					height: 36rpx;
					background-size: cover;
					background-repeat: no-repeat;
				}
			}
			.btn {
				width: calc(100% - 32rpx);
				margin-left: 16rpx;
				margin-top: 160rpx;
			}
		}
	}
</style>