<template>
	<view class="gt_content">
		<view class="card">
			<view class="analyse">
				<view class="label">营收分析</view>
				<view class="value" @click="show = true">
					<view class="month">{{month}}月</view>
					<view class="year">
						<text>{{year}}年</text>
						<u-icon name="arrow-down" color="#b2aabd" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="earning">
				<view class="statistics">
					<text>总收入：￥</text>
					<text>{{ data.total_money }}</text>
				</view>
				<view class="subtotal">
					<view class="subtotal_item">
						<view class="">已结算收入</view>
						<view class="">
							￥{{ data.settlement_money }}
						</view>
					</view>
					<view class="subtotal_item">
						<view class="">未结算收入</view>
						<view class="">
							￥{{ data.onway_money }}
						</view>
					</view>
				</view>
				<view class="earning_time">
					<text>数据更新至</text>
					<text>{{ updataTime }}</text>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="analyse">
				<view class="label">交易订单</view>
				<view class="value" @click="goDetail">
					<text style="color: #b2aabd;">订单明细</text>
					<u-icon name="arrow-right" color="#b2aabd" size="28"></u-icon>
				</view>
			</view>
			<view class="earning">
				<view class="earning_time">
					<text>数据更新至</text>
					<text>{{ updataTime1 }}</text>
				</view>
				<view class="btns">
					<u-button size="mini" @click="getData1(7)" :type="recent_days == 7? 'primary' : 'default'">近7日</u-button>
					<u-button size="mini" @click="getData1(30)" :type="recent_days == 30? 'primary' : 'default'" style="margin-left: 40rpx;">近30日</u-button>
				</view>
				<view class="subtotal">
					<view class="subtotal_item">
						<view class="">已完成运输的订单</view>
						<view class="">
							{{ data1.complete_num }}单
						</view>
					</view>
					<view class="subtotal_item">
						<view class="">未完成运输的订单</view>
						<view class="">
							{{ data1.onway_num }}单
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
				return gt.gtCommon.formateTime(gt.lastDay, 'YYYY.MM.DD')
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
				return gt.gtCommon.formateTime((+new Date()) / 1000, 'YYYY.MM.DD')
			}
		},
		methods: {
			getNowDate() {
				let gt = this
				gt.year = gt.date.getFullYear()
				gt.endYear = gt.year
				gt.month = gt.date.getMonth() + 1
				gt.endMonth = gt.month
				let firstDay = +new Date(gt.date.getFullYear(), gt.date.getMonth(), 1) / 1000
				let nextMonth = new Date(gt.date.getFullYear(), gt.date.getMonth() + 1, 1)
				gt.lastDay = +new Date(nextMonth.getTime() - 1000 * 60 * 60 * 24) / 1000
				gt.lastDay = gt.lastDay > ((+new Date()) / 1000) ? (+new Date()) / 1000 : gt.lastDay
				gt.getData(firstDay, gt.lastDay)
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
				let firstDay = +new Date(gt.year, gt.month - 1, 1) / 1000
				let nextMonth = new Date(gt.year, gt.month, 1)
				gt.lastDay = +new Date(nextMonth.getTime() - 1000 * 60 * 60 * 24) / 1000
				gt.lastDay = gt.lastDay > ((+new Date()) / 1000) ? (+new Date()) / 1000 : gt.lastDay
				gt.getData(firstDay, gt.lastDay)
			},
			goDetail() {
				uni.switchTab({
					url: '/pages/order/order'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding: 10rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			.card {
				background-color: #fff;
				padding: 30rpx;
				.analyse {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 60rpx;
					.label {
						
					}
					.value {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.year {
							margin-left: 10rpx;
						}
						.month {
							font-size: 42rpx;
						}
					}
				}
				.earning {
					.statistics {
						margin-bottom: 16rpx;
					}
					.subtotal {
						.subtotal_item {
							width: calc((100% - 20rpx) / 2);
							display: inline-block;
							background-color: #f2f2f2;
							padding: 26rpx 16rpx;
							&:nth-child(1) {
								margin-right: 20rpx;
							}
						}
					}
					.earning_time {
						color: #b2aabd;
						font-size: 24rpx;
						margin: 16rpx 0;
					}
					.btns {
						margin-bottom: 20rpx;
					}
				}
				&:nth-child(2) {
					margin-top: 20rpx;
					.analyse {
						margin-bottom: 20rpx;
					}
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