<template>
	<view class="gt_content">
		<view class="card">
			<view class="analyse">
				<view class="analyse_left">
					<view class="label">营收分析</view>
					<view class="label_info">（数据更新至{{ updataTime }}）</view>
				</view>
				<view class="analyse_right" @click="show = true">
					<text>{{ year }}-{{ month }}</text>
					<u-icon name="arrow-right" color="#AAAAAA" size="20"></u-icon>
				</view>
			</view>
			<view class="earning">
				<view class="statistics">
					<text style="margin-right: 10rpx;">总收入：￥</text>
					<!-- <text>{{ data.total_money }}</text> -->
					<u-count-to :start-val="0" :end-val="data.total_money || 0" :decimals="2" font-size='36' :bold='true'></u-count-to>
				</view>
				<view class="subtotal">
					<view class="subtotal_item" @click="goView(1)">
						<view class="view_left">
							<view class="subtotal_label">已结算收入</view>
							<!-- <view class="subtotal_value">￥{{ data.settlement_money }}</view> -->
							<u-count-to :start-val="0" :end-val="data.settlement_money || 0" :decimals="2" font-size='32' :bold='true'></u-count-to>
						</view>
						<view class="view_right">
							<u-image :src="gtCommon.getOssImg('user/arrow.png')" mode="widthFix" width="28" height="28"></u-image>
						</view>
					</view>
					<view class="subtotal_item" @click="goView(0)">
						<view class="view_left">
							<view class="subtotal_label">未结算收入</view>
							<!-- <view class="subtotal_value">￥{{ data.onway_money }}</view> -->
							<u-count-to :start-val="0" :end-val="data.onway_money || 0" :decimals="2" font-size='32' :bold='true'></u-count-to>
						</view>
						<view class="view_right">
							<u-image :src="gtCommon.getOssImg('user/arrow.png')" mode="widthFix" width="28" height="28"></u-image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="analyse">
				<view class="analyse_left">
					<view class="label">交易订单</view>
					<view class="label_info">（数据更新至{{ updataTime1 }}）</view>
				</view>
				<view class="analyse_right1" @click="goDetail">
					<text>查看订单</text>
					<u-icon name="arrow-right" color="#AAAAAA" size="24"></u-icon>
				</view>
			</view>
			<view class="earning">
				<view class="btns">
					<u-button size="mini" @click="getData1(7)" :type="recent_days == 7? 'primary' : 'default'">近7日</u-button>
					<u-button size="mini" @click="getData1(30)" :type="recent_days == 30? 'primary' : 'default'" style="margin-left: 40rpx;">近30日</u-button>
				</view>
				<view class="subtotal">
					<view class="subtotal_item">
						<view class="analyse_left">
							<view class="subtotal_label">已完成运输的订单</view>
							<!-- <view class="subtotal_value">{{ data1.complete_num }}</view> -->
							<u-count-to :start-val="0" :end-val="data.complete_num || 0" font-size='32' :bold='true'></u-count-to>
						</view>
					</view>
					<view class="subtotal_item">
						<view class="analyse_left">
							<view class="subtotal_label">未完成运输的订单</view>
							<!-- <view class="subtotal_value">{{ data1.onway_num }}</view> -->
							<u-count-to :start-val="0" :end-val="data.onway_num || 0" font-size='32' :bold='true'></u-count-to>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-picker v-model="show" mode="time" :params="params" @confirm="confirm" 
				:end-year='endYear' :end-month='endMonth' :default-time='defaultTime'></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				params: {
					year: true,
					month: true
				},
				year: '',
				month: '',
				data: {},
				firstDay: '',
				lastDay: '',
				endYear: '',
				endMonth: '',
				data1: {},
				recent_days: 7,
				date: new Date()
			}
		},
		onLoad() {
			let gt = this
			gt.getNowDate()
			gt.getData1()
		},
		computed: {
			updataTime() {
				let gt = this
				return gt.gtCommon.formateTime(gt.lastDay, 'YYYY/MM/DD')
			},
			defaultTime() {
				let gt = this
				if(!gt.year || !gt.month) {
					let year = gt.date.getFullYear()
					let month = gt.date.getMonth() + 1
					return year + '-' + month + '-01 00:00:00'
				} else {
					return gt.year + '-' + gt.month + '-01 00:00:00'
				}
			},
			updataTime1() {
				let gt = this
				return gt.gtCommon.formateTime((+new Date()) / 1000, 'YYYY/MM/DD')
			}
		},
		methods: {
			getNowDate() {
				let gt = this
				gt.year = gt.date.getFullYear()
				gt.endYear = gt.year
				gt.month = gt.date.getMonth() + 1
				gt.endMonth = gt.month
				gt.firstDay = +new Date(gt.date.getFullYear(), gt.date.getMonth(), 1) / 1000
				let nextMonth = new Date(gt.date.getFullYear(), gt.date.getMonth() + 1, 1)
				gt.lastDay = +new Date(nextMonth.getTime() - 1000 * 60 * 60 * 24) / 1000
				gt.lastDay = gt.lastDay > ((+new Date()) / 1000) ? (+new Date()) / 1000 : gt.lastDay
				gt.getData(gt.firstDay, gt.lastDay)
			},
			getData(stime, etime) {
				let gt = this
				gt.gtRequest.post('/logistics/User/my_income_1', {
					stime,
					etime
				}).then(res => {
					gt.data = res
				})
			},
			getData1(recent_days=7) {
				let gt = this
				gt.recent_days = recent_days
				gt.gtRequest.post('/logistics/User/my_income_2', {
					recent_days
				}).then(res => {
					gt.data1 = res
				})
			},
			confirm(e) {
				let gt = this
				gt.year = e.year
				gt.month = e.month
				gt.firstDay = +new Date(gt.year, gt.month - 1, 1) / 1000
				let nextMonth = new Date(gt.year, gt.month, 1)
				gt.lastDay = +new Date(nextMonth.getTime() - 1000 * 60 * 60 * 24) / 1000
				gt.lastDay = gt.lastDay > ((+new Date()) / 1000) ? (+new Date()) / 1000 : gt.lastDay
				gt.getData(gt.firstDay, gt.lastDay)
			},
			goDetail() {
				let gt = this
				let stime = gt.gtCommon.formateTime((+new Date())/ 1000 - (60 * 60 * 24 * gt.recent_days), 'YYYY-MM-DD')
				let etime = gt.gtCommon.formateTime((+new Date()) / 1000, 'YYYY-MM-DD')
				uni.setStorageSync('stime', stime)
				uni.setStorageSync('etime', etime)
				uni.switchTab({
					url: '/pages/order/order'
				})
			},
			goView(type) {
				uni.navigateTo({
					url: '/subUser/pages/user/earning?type=' + type
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			.card {
				border-radius: 16rpx;
				background-color: #fff;
				padding: 30rpx;
				.analyse {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					padding: 0 0 16rpx;
					border-bottom: 1rpx solid #cacaca;
					.analyse_left {
						display: flex;
						align-items: flex-end;
						.label {
							font-size: 36rpx;
							font-weight: 700;
						}
						.label_info {
							font-size: 24rpx;
							margin-left: 10rpx;
						}
					}
					.analyse_right {
						height: 40rpx;
						border: 1rpx solid #cacaca;
						font-size: 24rpx;
						display: flex;
						align-items: center;
						padding: 0 10rpx;
						border-radius: 10rpx;
					}
					.analyse_right1 {
						color: #777777;
					}
				}
				.earning {
					.statistics {
						margin: 28rpx 0;
					}
					.subtotal {
						display: flex;
						justify-content: space-between;
						.subtotal_item {
							width: calc((100% - 20rpx) / 2);
							display: inline-block;
							background-color: #F6F7FF;
							border-radius: 10rpx;
							padding: 26rpx 38rpx 26rpx 16rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							&:nth-child(1) {
								margin-right: 20rpx;
							}
							.subtotal_label {
								color: #777777;
								margin-bottom: 18rpx;
							}
							.subtotal_value {
								font-size: 32rpx;
								font-weight: 700;
							}
						}
					}
					.btns {
						margin: 26rpx 0;
						text-align: right;
					}
				}
				&:nth-child(2) {
					margin-top: 20rpx;
				}
			}
			.u-column-item {
				.u-text {
					width: 0;
				}
			}
		}
	}
</style>