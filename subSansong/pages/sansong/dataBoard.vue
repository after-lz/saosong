<template>
	<view class="gt_content">
		<view class="head">
			<view class="tabs">
				<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
				 swiperWidth="750" bar-width="120" font-size="28" :active-item-style="activeStyle" :bold="false"></u-tabs-swiper>
			</view>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%">
					<view class="card">
						<view class="card_title">总单量</view>
						<data-chart height="500" :opts='opts' :chartData='chartData_user' :pieDemo="pieDemo"></data-chart>
					</view>
					<view class="card">
						<view class="card_title">工作简报</view>
						<view class="card_options">
							<view class="option" v-for="(item, index) in list" :key="index" @click="goNext(index)"
								:style="{display: index === 5 ? 'none' : ''}">
								<view class="option_icon">
									<u-image :src="gtCommon.getOssImg(`sansong/board0${index+1}.png`)" mode="widthFix" :fade="true" duration="450"></u-image>
								</view>
								<view class="option_info">
									<view class="info_num">{{ item.num }}</view>
									<view class="info_msg">{{ item.name }}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%">
					<!-- <view class="card card0">
						<view class="card_title">下单量</view>
						<data-chart height="500" :opts='opts' :chartData='chartData' :pieDemo="pieDemo"></data-chart>
					</view> -->
					<view class="row">
						<view class="card">
							<view class="label">平台活跃</view>
							<view class="value">
								<view class="value_num">{{ data.active_num }}</view>
								<view>人</view>
							</view>
						</view>
						<view class="card">
							<view class="label">签约专线</view>
							<view class="value">
								<view class="value_num">{{ data.line_num }}</view>
								<view>条</view>
							</view>
						</view>
					</view>
					<view class="card card1">
						<board-component :active_list='data.active_list' :logistics_list='data.logistics_list'></board-component>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import DataChart from '@/components/dataChart.vue'
import BoardComponent from './boardComponent.vue'
export default {
	components: { DataChart, BoardComponent },
	data() {
		return {
			tabs: [
				{name: '我的'},
				{name: '平台'}
			],
			current: 0,
			swiperCurrent: 0, 
			pieDemo: 'pieDemo',
			activeStyle: {
				fontSize: '36rpx',
			},
			list: [
				{
					num: 0,
					name: "接单总金额（元）"
				},
				{
					num: 0,
					name: "接单总数量（笔）"
				},
				{
					num: 0,
					name: "抢单总金额（元）"
				},
				{
					num: 0,
					name: "抢单总数量（笔）"
				},
				{
					num: 0,
					name: "拒绝（笔）"
				},
				{
					num: 0,
					name: "取消（笔）"
				},
				{
					num: 0,
					name: "访客记录"
				},
				{
					num: 0,
					name: "联系我"
				},
				{
					num: 0,
					name: "收藏我的"
				},
			],
			data: {},
			chartData: {},
			opts: {},
			chartData_user: {}
		}
	},
	onLoad() {
		this.getDate()
		this.chartData_user = {
			categories: [],
			series: [
				{
					name: "自定义1/总单量",
					data: [],
					sum: [],
					format: 'yAxisDemo1'
				}
			]
		}
		this.chartData = {
			categories: [],
			series: [
				{
					name: "自定义2/下单量",
					data: [],
					format: 'yAxisDemo1'
				}
			]
		}
		this.opts = {
			color: ["#909399"],
			padding: [15, 0, 0, 0],
			enableScroll: false,
			legend: {},
			xAxis: {
				disableGrid: true,
				fontSize: 12,
				fontColor: '#909399',
				marginTop: 10
			},
			yAxis: {
				gridType: "solid",
				data: [
					{
						axisLine: false,
						min: 0,
						fontSize: 12,
						textAlign: 'left',
						fontColor: '#909399'
					}
				]
			},
			extra: {
				tooltip: {
					bgColor: '#485EF4',
					borderRadius: 4,
					bgOpacity: 1,
					fontSize: 12,
					legendShow: false,
					splitLine: false
				}
			},
			legend: {
				show: false
			}
		}
	},
	methods: {
		getDate() {
			this.gtRequest.post("/api/applogin/get_logistics_company_report_nums").then(res => {
				res.order_list.forEach(item=> {
					this.chartData_user.categories.push(this.gtCommon.formateTime(item.date, 'MM-DD'))
					this.chartData_user.series[0].data.push(item.num)
					this.chartData_user.series[0].sum.push(item.money)
				})
				this.list[0].num = res.total_money
				this.list[1].num = res.total_num
				this.list[2].num = res.rob_money
				this.list[3].num = res.rob_num
				this.list[4].num = res.reject_num
				this.list[5].num = res.cancel_num
				this.list[6].num = res.visitor_num
				this.list[7].num = res.contact_num
				this.list[8].num = res.collect_num
			})
			this.gtRequest.post("/api/applogin/get_platform_report_nums").then(res => {
				this.data = res
				res.order_list.forEach(item=> {
					this.chartData.categories.push(this.gtCommon.formateTime(item.date, 'MM-DD'))
					this.chartData.series[0].data.push(item.num)
				})
			})
		},
		goNext(index) {
			if(index === 0) {
				uni.navigateTo({
					url: '../../../pages/user/revenue'
				})
			} else if(index === 4) {
				uni.navigateTo({
					// url: '../../../pages/index/historyList?active=1'
					url: "../../../subMsg/pages/message/historyList?active=1"
				})
			} else if(index === 5) {
				uni.setStorageSync('orderSearchStatus', 8)
				uni.switchTab({
					url: '../../../pages/order/order'
				})
			} else if(index === 6) {
				uni.navigateTo({
					url: '../../../subMsg/pages/message/visitorLog'
				})
			} else if(index === 7) {
				uni.navigateTo({
					url: '../../../subMsg/pages/message/visitorLog?active=1'
				})
			}
		},
		tabsChange(index) {
			this.swiperCurrent = index
		},
		transition(e) {
			let dx = e.detail.dx
			this.$refs.uTabs.setDx(dx)
		},
		animationfinish(e) {
			let current = e.detail.current
			this.$refs.uTabs.setFinishCurrent(current)
			this.swiperCurrent = current
			this.current = current
		}
	}
}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			font-family: PingFangSC-Medium, PingFang SC;
			.head {
				background-color: #fff;
				.tabs {
					width: 320rpx;
				}
			}
			.swiper {
				height: calc(100vh - 82rpx);
			}
			.row {
				display: flex;
				margin-top: 20rpx;
				.card {
					width: 50%;
					height: 144rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin: 0 16rpx;
				}
			}
			.card {
				background-color: #fff;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;
				overflow: hidden;
				.card_title {
					font-size: 32rpx;
					font-weight: 700;
					color: #000;
				}
				.card_options {
					display: flex;
					flex-wrap: wrap;
					margin-top: 20rpx;
					.option {
						width: 50%;
						display: flex;
						align-items: center;
						margin-bottom: 28rpx;
						&:nth-last-child(1) {
							margin-bottom: 0;
						}
						.option_icon {
							width: 92rpx;
							height: 92rpx;
							margin-right: 16rpx;
						}
						.option_info {
							.info_num {
								color: #000000;
								font-size: 32rpx;
							}
							.info_msg {
								color: #909399;
							}
						}
					}
				}
				.label {
					color: #909399;
					font-size: 24rpx;
					text-align: center;
				}
				.value {
					display: flex;
					justify-content: center;
					align-items: center;
					.value_num {
						color: #485EF4;
						font-size: 40rpx;
						font-weight: 500;
					}
				}
			}
			.card0 {
				padding-bottom: 36rpx;
			}
			.card1 {
				padding: 0 0 24rpx;
			}
		}
	}
</style>