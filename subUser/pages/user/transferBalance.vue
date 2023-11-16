<template>
	<view class="gt_content">
		<view class="info">
			<view class="info_num">￥<text class="money">{{ data.money02 }}</text></view>
			<view class="info_order">可转红包金额</view>
		</view>
		<view class="con_list">
			<view class="con_item">
				<view class="con_text">
					<text>满足金额</text>
				</view>
				<view class="con_icon">
					<view style="color: #909399;">{{ data.money02 }}/{{ data.minMoney }}</view>
					<u-icon name="checkmark-circle-fill" color="#0ac220" size='40' v-if="data.money02 >= data.minMoney"></u-icon>
					<u-icon name="error-circle-fill" color="#ff6067" size='40' v-else></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item">
				<view class="con_text">
					<text>完结订单</text>
				</view>
				<view class="con_icon">
					<view style="color: #909399;">{{ data.orderNumber }}/{{ data.minOrder }}</view>
					<u-icon name="checkmark-circle-fill" color="#0ac220" size='40' v-if="data.orderNumber >= data.minOrder"></u-icon>
					<u-icon name="error-circle-fill" color="#ff6067" size='40' v-else></u-icon>
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button type="primary" @click="submit" :disabled="_disabled">转余额</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	const apiDomain = uni.getStorageSync('apiDomain')
	export default {
		data() {
			return {
				token: '',
				data: {}
			}
		},
		onLoad(options) {
			let gt = this
			gt.token = gt.gtRequest.getToken()
			gt.data = JSON.parse(decodeURIComponent(options.params))
		},
		computed: {
			_disabled() {
				let gt = this
				return gt.data.money02 < gt.data.minMoney || gt.data.orderNumber < gt.data.minOrder
			}
		},
		methods: {
			submit() {
				let gt = this
				let params = {
					login_token: gt.token,
					number: gt.data.money02
				}
				return params
				uni.request({
					url: apiDomain + "/logistics/Companywallet/apply_zhuanyuee",
					data: params,
					method: 'GET',
					success: function(res) {	
						if(res.data.code == 1) {
							gt.$refs.uToast.show({
								title: res.data.msg,
								type: 'success',
								back: true
							})
						} else {
							gt.$refs.uToast.show({
								title: '转余额失败',
								type: 'error'
							})
						}
					},
					fail: function(res) {
						gt.$refs.uToast.show({
							title: '转余额失败',
							type: 'error'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.con_list {
				background: #fff;
				margin-top: 20rpx;
				.con_item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 40rpx;
					font-size: 32rpx;
					height: 108rpx;
					line-height: 108rpx;
				}
				.con_icon {
					display: flex;
					align-items: center;
					.u-icon {
						margin-left: 16rpx;
					}
				}
			}
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