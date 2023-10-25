<template>
	<view class="gt_content">
		<view :style="{'height': tops + 'px'}"></view>
		<view class="navbar" :style="{'height': height + 'px'}">
			<u-icon name="arrow-left" color="#000" size="40" @click="back"></u-icon>
			<view class="navbar_name">行为分</view>
		</view>
		<view class="card_progress">
			<view class="progress">
				<data-chart height="560" type="arcbar" :opts='opts' :chartData='chartData'></data-chart>
			</view>
			<view class="remake" @click="viewDetail">规则</view>
			<cover-view class="progress_left progress_40">40</cover-view>
			<cover-view class="progress_left progress_50">较差</cover-view>
			<cover-view class="progress_left progress_60">60</cover-view>
			<cover-view class="progress_left progress_70">一般</cover-view>
			<cover-view class="progress_left progress_80">80</cover-view>
			<cover-view class="progress_right progress_90">良好</cover-view>
			<cover-view class="progress_right progress_100">100</cover-view>
			<cover-view class="progress_right progress_110">优秀</cover-view>
			<cover-view class="progress_right progress_120">120</cover-view>
		</view>
		
		<view class="card_info">
			<view class="info_title">所受影响</view>
			<view class="info_manifestation">-您当前表现{{ judgeInfo(score).manifestation }}</view>
			<view class="info_interests">-相应权益：{{ judgeInfo(score).interests }}</view>
		</view>
		
		<view class="card_record">
			<view class="record_title">
				<view class="record_title_name">行为分记录</view>
				<view class="record_title_more" @click="viewMore">查看更多</view>
			</view>
			<scroll-view scroll-y style="height: 582rpx">
				<view class="record_item" v-for="(item, index) in list" :key="index">
					<view class="item_row">
						<view class="item_left">
							<view class="item_title">{{ item.remark }}</view>
							<!-- <view :class="item.cancel_status ? 'item_status' : 'item_status1'">{{ item.cancel_status ? '指派' : '极速' }}</view> -->
						</view>
						<view :class="item.number > 0 ? 'item_type' : 'item_type1'">
							{{ item.number + '分' }}
						</view>
					</view>
					<view class="item_time">{{ gtCommon.formateTime(item.create_time, 'YYYY-MM-DD HH:mm:ss') }}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import DataChart from '@/components/dataChart.vue'
	export default {
		components: { DataChart },
		data() {
			return {
				chartData: {},
				opts: {},
				tops: 0,
				height: 0,
				list: [],
				score: 0
			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (e) => {
					this.tops = e.statusBarHeight
					// #ifdef MP-WEIXIN
					let custom = uni.getMenuButtonBoundingClientRect()
					this.height = custom.height + (custom.top - e.statusBarHeight) * 2
					// #endif
					// #ifdef APP-PLUS
					this.height = e.statusBarHeight + e.safeArea.top
					// #endif
				}
			})
		},
		onLoad(options) {
			this.score = parseInt(options.score) + ''
			// this.score = 30
			let name = this.judgeInfo(this.score).manifestation
			let progress = +this.score > 40 ? 1 / (120 - 40) * (this.score - 40) : 0
			this.getDate()
			this.chartData = {
				series: [
				  {
				    color: "#485EF4",
				    data: progress
				  }
				]
			}
			this.opts = {
				color: ["#485EF4"],
				padding: [0,0,0,0],
				title: {
				  name: this.score,
				  fontSize: 56,
				  offsetY: -15,
				  color: "#485EF4"
				},
				subtitle: {
				  name: name,
				  fontSize: 16,
				  offsetY: 10,
				  color: "#485EF4"
				},
				extra: {
				  arcbar: {
				    type: "default",
				    width: 25,
				    startAngle: 0.75,
				    endAngle: 0.25,
				    linearType: "none"
				  }
				}
			}
		},
		methods: {
			getDate() {
				this.gtRequest.post("/logistics/companywallet/get_wallet_log", {
					page: 1,
					limit: 10,
					wallet_type: 'money03',
					data_type:1
				}).then(res=>{
					res.list.forEach(item=> {
						item.number = +item.number
					})
					this.list = res.list
				})
			},
			viewMore() {
				uni.navigateTo({
					url: './behaviorSubrecord'
				})
			},
			viewDetail() {
				uni.navigateTo({
					url: './behaviorSubrule'
				})
			},
			back() {
				uni.navigateBack()
			},
			judgeInfo(num) {
				let obj = {
					manifestation: '',
					interests: ''
				}
				if(num === 0) {
					obj = {
						manifestation: '-',
						interests: '账户冻结'
					}
				} else if(num > 0 && num < 41) {
					obj = {
						manifestation: '极差',
						interests: '延长3至30天到账 | 每天限制5单 | 完成订单不再得到红包'
					}
				} else if(num >= 41 && num < 61) {
					obj = {
						manifestation: '较差',
						interests: '延长至7天到账 | 能接单能抢单 | 完成订单不再得到红包'
					}
				} else if(num >= 61 && num < 81) {
					obj = {
						manifestation: '一般',
						interests: '正常到账 | 正常接单正常抢单 | 不再得红包'
					}
				} else if(num >= 81 && num < 100) {
					obj = {
						manifestation: '良好',
						interests: '正常到账 | 正常接单正常抢单 | 正常得红包'
					}
				} else if(num >= 100) {
					obj = {
						manifestation: '优秀',
						interests: '正常到账 | 正常接单正常抢单 | 正常得红包'
					}
				}
				return obj
			}
		}
	}
</script>

<style lang="scss">
	page {
		.gt_content {
			background: linear-gradient(
				to bottom,
				#7586fe 0%,
				#f3f4f5 60%
			);
			.navbar {
				display: flex;
				align-items: center;
				padding-left: 28rpx;
				.navbar_name {
					margin-left: 278rpx;
					font-size: 32rpx;
					color: #000;
				}
			}
			.card_progress {
				height: 600rpx;
				position: relative;
				background-color: #fff;
				border-radius: 16rpx;
				margin: 20rpx 15rpx;
				display: flex;
				justify-content: center;
				// font-family: PingFangSC-Regular, PingFang SC;
				.progress {
					padding-top: 40rpx;
				}
				.remake {
					position: absolute;
					top: 32rpx;
					right: 32rpx;
					color: $gtProjectColor;
				}
				.progress_left {
					color: #909399;
					position: absolute;
					transform: translate(-50%, -50%);
					width: 60rpx;
					text-align: center;
				}
				.progress_right {
					color: #909399;
					position: absolute;
					transform: translate(50%, -50%);
					width: 60rpx;
					text-align: center;
				}
				.progress_40 {
					bottom: 80rpx;
					left: 235rpx;
				}
				.progress_50 {
					bottom: 205rpx;
					left: 185rpx;
				}
				.progress_60 {
					bottom: 330rpx;
					left: 190rpx;
				}
				.progress_70 {
					top: 150rpx;
					left: 260rpx;
				}
				.progress_80 {
					top: 120rpx;
					left: 50%;
				}
				.progress_90 {
					top: 150rpx;
					right: 270rpx;
				}
				.progress_100 {
					bottom: 330rpx;
					right: 200rpx;
				}
				.progress_110 {
					bottom: 205rpx;
					right: 185rpx;
				}
				.progress_120 {
					bottom: 80rpx;
					right: 245rpx;
				}
			}
			.card_record {
				background-color: #fff;
				border-radius: 16rpx;
				margin: 20rpx 15rpx;
				padding: 24rpx 0;
				// font-family: PingFangSC-Regular, PingFang SC;
				.record_title {
					padding-bottom: 40rpx;
					margin: 0 24rpx;
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					.record_title_name {
						width: 100%;
						text-align: center;
						padding-left: 112rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #000000;
					}
					.record_title_more {
						color: $gtProjectColor;
						white-space: nowrap;
					}
				}
				.record_item {
					height: 144rpx;
					border-top: 2rpx solid #f5f5f5;
					padding: 30rpx 0 32rpx 0;
					margin: 0 24rpx;
					.item_row {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.item_left {
							display: flex;
							align-items: center;
							.item_title {
								color: #000;
								margin-right: 20rpx;
							}
							.item_status {
								padding: 4rpx 10rpx;
								color: #FFFFFF;
								font-size: 24rpx;
								background-color: #485EF4;
								border-radius: 8rpx;
							}
							.item_status1 {
								padding: 4rpx 10rpx;
								color: #FFFFFF;
								font-size: 24rpx;
								background-color: #FFBF27;
								border-radius: 8rpx;
							}
						}
					}
					.item_type {
						color: #000;
					}
					.item_type1 {
						color: #FF6067;
					}
					.item_time {
						color: #909399;
						font-size: 24rpx;
						margin-top: 8rpx;
					}
				}
			}
			.card_info {
				background-color: #fff;
				border-radius: 16rpx;
				margin: 20rpx 15rpx;
				padding: 24rpx;
				.info_title {
					color: #000;
					margin-bottom: 20rpx;
					font-weight: 500;
				}
			}
		}
	}
</style>