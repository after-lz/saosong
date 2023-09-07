<template>
	<view class="gt_content">
		<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
			swiperWidth="750" height="80"></u-tabs-swiper>
		<swiper :current="current" @animationfinish="animationfinish" class="main">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y @scrolltolower="loadingMore(0)" style="height: 100%;">
					<template v-if="list0.length">
						<view class="card" v-for="item in list0" :key="item.id">
							<view class="card_title">
								<view class="card_title_name">{{ item.line_name }}</view>
								<!-- <view class="card_title_status">{{ item.pay_status }}</view> -->
								<view class="card_title_status">已充值押金</view>
							</view>
							<view class="card_content">
								<view class="row">
									<view class="row_label">充值金额</view>
									<view class="row_value money">￥{{ item.money }}</view>
								</view>
								<view class="row">
									<view class="row_label">充值时间</view>
									<view class="row_value">{{ gtCommon.formateTime(item.pay_time, 'YYYY-MM-DD HH:mm:ss') }}</view>
								</view>
								<view class="row">
									<view class="row_label">充值方式</view>
									<view class="row_value">{{ methodStatus(item.pay_method) }}</view>
								</view>
								<view class="row">
									<view class="row_label">充值单号</view>
									<view class="row_value">{{ item.order_sn }}</view>
								</view>
							</view>
						</view>
						<u-loadmore :status="status0" />
					</template>
					<view class="con_empty" v-else>
						<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
							margin-top="200" font-size="32"></u-empty>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y @scrolltolower="loadingMore(1)" style="height: 100%;">
					<template v-if="list1.length">
						<view class="card" v-for="item in list1" :key="item.id">
							<view class="card_title">
								<view class="card_title_name">{{ item.line_name }}</view>
								<view class="card_title_status">{{ judgeStatus(item.refund_status) }}</view>
							</view>
							<view class="card_content">
								<view class="row">
									<view class="row_label">充值金额</view>
									<view class="row_value money">￥{{ item.pay_money }}</view>
								</view>
								<view class="row">
									<view class="row_label">退款时间</view>
									<view class="row_value">{{ gtCommon.formateTime(item.refund_time, 'YYYY-MM-DD HH:mm:ss') }}</view>
								</view>
								<view class="row">
									<view class="row_label">充值方式</view>
									<view class="row_value">{{ methodStatus(item.pay_method) }}</view>
								</view>
								<view class="row">
									<view class="row_label">充值单号</view>
									<view class="row_value">{{ item.order_sn }}</view>
								</view>
							</view>
						</view>
						<u-loadmore :status="status1" />
					</template>
					<view class="con_empty" v-else>
						<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
							margin-top="200" font-size="32"></u-empty>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// import myScroll from "@/components/myScroll.vue"
	export default {
		// components: { myScroll },
		data() {
			return {
				tabs: [
					{ name: '充值记录' },
					{ name: '退还记录' }
				],
				current: 0,
				list0: [],
				params0: {
					page: 1,
					limit: 10
				},
				status0: 'loading',
				list1: [],
				params1: {
					page: 1,
					limit: 10
				},
				status1: 'loading',
			}
		},
		onLoad() {
			let gt = this
			gt.getList0()
			gt.getList1()
		},
		methods: {
			tabsChange(index) {
				let gt = this
				gt.current = index
			},
			animationfinish(e) {
				let gt = this
				let current = e.detail.current
				gt.$refs.uTabs.setFinishCurrent(current)
				gt.current = current
			},
			getList0() {
				let gt = this
				gt.gtRequest.post('/logistics/Specialline/deposit_list', gt.params0).then(res => {
					gt.list0 = [...gt.list0, ...res.list]
					gt.status0 = gt.params0.page >= res.total_page ? 'nomore' : 'loading'
				})
			},
			getList1() {
				let gt = this
				gt.gtRequest.post('/logistics/Specialline/refund_list', gt.params1).then(res => {
					gt.list1 = [...gt.list1, ...res.list]
					gt.status1 = gt.params1.page >= res.total_page ? 'nomore' : 'loading'
				})
			},
			loadingMore(i) {
				let gt = this
				if(gt[`status${i}`] === 'nomore') return
				++gt[`params${i}`].page
				if(i) {
					gt.getList1()
				} else {
					gt.getList0()
				}
			},
			methodStatus(type) {
				let str = ''
				switch (type) {
					case '1':
						str = '余额支付'
						break;
					case '2':
						str = '微信小程序'
						break;
					case '3':
						str = '微信app'
						break;
					default:
						break;
				}
				return str
			},
			judgeStatus(type) {
				let str = ''
				switch (type) {
					case '0':
						str = '未退款'
						break;
					case '1':
						str = '审核中'
						break;
					case '2':
						str = '打款中'
						break;
					case '3':
						str = '已退款'
						break;
					case '4':
						str = '已拒绝'
						break;
					default:
						break;
				}
				return str
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.main {
				height: calc(100vh - 82rpx);
			}
			.card {
				background-color: #fff;
				border-radius: 16rpx;
				padding: 20rpx 32rpx;
				margin: 20rpx 16rpx 0 16rpx;
				.card_title {
					height: 70rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 2rpx solid #dfdfdf;
					.card_title_name {
						font-family: PingFangSC-Medium, PingFang SC;
						color: #000;
						font-weight: 400;
						font-size: 32rpx;
					}
				}
				.card_content {
					.row {
						height: 60rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.row_label {
							color: #909399;
						}
						.row_value {
							color: #000;
						}
						.money {
							color: $gtProjectColor;
						}
					}	
				}
			}
			.u-more {
				margin: 36rpx 0;
			}
		}
	}
	
</style>
