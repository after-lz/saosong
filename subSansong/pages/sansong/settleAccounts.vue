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
		<view class="deduction" @click="confimPacket" v-if="promote_type">
			<view class="deduction_select" :style="{backgroundImage:
				  `url(${gtCommon.getOssImg(isUsedPacket ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
			</view>
			<view class="deduction_msg">
				红包可抵扣金额：{{ packetNum }}元
			</view>
		</view>
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
				order_id: '', // 生成支付订单的订单号
				num: 0, // 订单金额
				totalNum: 0, // 余额
				type: 0, // 支付方式：1余额2微信小程序3微信app
				pay_url: '',
				promote_type: undefined, // 推广类型
				packetNum: 0, // 推广：可抵扣的红包金额数
				isUsedPacket: false, // 是否确认使用红包
				redpack_money: 0, // 推广确认使用了红包抵扣时的金额
			}
		},
		onLoad(option) {
			let gt = this
			gt.num = option.num
			gt.order_id = option.order_id
			gt.totalNum = uni.getStorageSync('companyInfo').money01
			if(option.type === '1') { // 专线押金
				gt.pay_url = '/logistics/Specialline/pay_deposit_order'
			} else if(option.type === '2') { // 会员
				gt.pay_url = '/logistics/Specialline/pay_member_order'
			} else if(option.type === '3') { // 推广
				gt.promote_type = option.promote_type
				gt.getPacketNum()
				gt.pay_url = '/logistics/Specialline/pay_promote_order'
			} else if(option.type === '4') { // 推广续费
				gt.promote_type = option.promote_type
				gt.getPacketNum()
				gt.pay_url = '/logistics/Specialline/pay_renew_promote_order'
			} else if(option.type === '5') {
				gt.pay_url = '/logistics/Abnormal/pay_abnormal_order'
			}
		},
		methods: {
			/* 推广：获取推广可抵扣的红包金额数 */
			getPacketNum() {
				let gt = this
				gt.gtRequest.post('/logistics/Specialline/get_promote_redpack_info', {
					promote_type: gt.promote_type
				}).then(res => {
					gt.packetNum = res.num
				})
			},
			/* 推广：确认是否使用红包抵扣 */
			confimPacket() {
				let gt = this
				gt.isUsedPacket = !gt.isUsedPacket
				if(gt.isUsedPacket) {
					gt.redpack_money = gt.packetNum
				} else {
					gt.redpack_money = 0
				}
			},
			submit() {
				let gt = this
				if(!gt.type) return gt.$refs.uToast.show({
						title: '请选择支付方式！'
					})
				if(gt.type === 1 && +gt.num > +gt.totalNum) {
					return gt.$refs.uToast.show({
						title: '账户余额不足！'
					})
				}
				// let Fn = gt.gtCommon.debounce(()=> {
					gt.gtRequest.post(gt.pay_url, {
						order_id: gt.order_id,
						pay_method: gt.type, // 1余额2微信小程序3微信app
						redpack_money: gt.redpack_money
					}).then(info => {
						if(gt.type === 1) {
							if(gt.promote_type) {
								gt.$refs.uToast.show({
									title: '支付成功！',
									type: 'success'
								})
								setTimeout(()=> {
									uni.navigateBack({
										delta: 2
									})
								}, 1500)
							} else {
								gt.$refs.uToast.show({
									title: '支付成功！',
									type: 'success',
									back: true
								})
							}
						} else {
							// #ifdef MP-WEIXIN
							uni.getProvider({
							    service: 'payment',
							    success: function (res) {
							        uni.requestPayment({
							            provider: "wxpay",
							            ...info,
							            success(res) {
											if(gt.promote_type) {
												gt.$refs.uToast.show({
													title: '支付成功',
													type: 'success'
												})
												setTimeout(()=> {
													uni.navigateBack({
														delta: 2
													})
												}, 1500)
											} else {
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
							                    if(gt.promote_type) {
							                    	gt.$refs.uToast.show({
							                    		title: '支付成功',
							                    		type: 'success'
							                    	})
							                    	setTimeout(()=> {
							                    		uni.navigateBack({
							                    			delta: 2
							                    		})
							                    	}, 1500)
							                    } else {
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
							                }
							            })
							        // }
							    }
							})
							// #endif
						}
					})
				// }, 1000)
				// Fn()
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
			.deduction {
				display: flex;
				align-items: center;
				margin: 20rpx 0 0 20rpx;
				.deduction_select {
					width: 36rpx;
					height: 36rpx;
					background-size: cover;
					background-repeat: no-repeat;
					margin-right: 16rpx;
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