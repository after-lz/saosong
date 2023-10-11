<template>
	<view class="gt_content">
		<view class="gt_title">
			<view class="gt_title_name" @click="clearUnread" :style="{'display': current === 0 ? '': 'none'}">清除未读</view>
			<view class="gt_title_name" @click="circleMsg" :style="{'display': current === 1 ? '': 'none'}">
				<view class="gt_title_icon">
					<u-badge type="error" absolute :is-dot="true" :offset='offset' :count='newMsgArr.length'></u-badge>
					<u-icon name="bell" size="36"></u-icon>
				</view>
			</view>
			<view class="gt_title_swiper">
				<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
					swiperWidth="750" height="80"></u-tabs-swiper>
			</view>
		</view>
		<swiper :current="current" @animationfinish="animationfinish" :disable-touch="true" class="main">
			<swiper-item class="swiper-item" id="message" catchtouchmove="stopTouchMove">
				<scroll-view scroll-y>
					<view class="line"></view>
					<view class="card" @click="goDetail(1)">
						<view class="card_left">
							<image :src="gtCommon.getOssImg('message/message01.png')" mode="widthFix" class="msgImg"></image>
						</view>
						<view class="card_right">
							<view class="right_title">
								<view class="right_name">访客记录</view>
								<view class="right_time" v-if="list.type_0.create_time">{{ formatDate(list.type_0.create_time) }}</view>
							</view>
							<view class="right_info">
								<text v-if="list.type_0.content">{{ list.type_0.content }}</text>
								<text v-else>暂无信息</text>
							</view>
						</view>
					</view>
					<view class="card" @click="goDetail(2)">
						<view class="card_left">
							<u-badge :is-dot="true" type="error" :count="list.type_1.num" :offset='offset'></u-badge>
							<image :src="gtCommon.getOssImg('message/message02.png')" mode="widthFix" class="msgImg"></image>
						</view>
						<view class="card_right">
							<view class="right_title">
								<view class="right_name">物流信息</view>
								<view class="right_time" v-if="list.type_1.create_time">{{ formatDate(list.type_1.create_time) }}</view>
							</view>
							<view class="right_info">
								<text v-if="list.type_1.content">{{ list.type_1.content }}</text>
								<text v-else>暂无信息</text>
							</view>
						</view>
					</view>
					<view class="card" @click="goDetail(3)">
						<view class="card_left">
							<u-badge :is-dot="true" type="error" :count="list.type_3.num" :offset='offset'></u-badge>
							<image :src="gtCommon.getOssImg('message/message03.png')" mode="widthFix" class="msgImg"></image>
						</view>
						<view class="card_right">
							<view class="right_title">
								<view class="right_name">红包福利</view>
								<view class="right_time" v-if="list.type_3.create_time">{{ formatDate(list.type_3.create_time) }}</view>
							</view>
							<view class="right_info">
								<text v-if="list.type_3.content">{{ list.type_3.content }}</text>
								<text v-else>暂无信息</text>
							</view>
						</view>
					</view>
					<view class="card" @click="goDetail(4)">
						<view class="card_left">
							<u-badge :is-dot="true" type="error" :count="list.type_2.num" :offset='offset'></u-badge>
							<image :src="gtCommon.getOssImg('message/message04.png')" mode="widthFix" class="msgImg"></image>
						</view>
						<view class="card_right">
							<view class="right_title">
								<view class="right_name">服务通知</view>
								<view class="right_time" v-if="list.type_2.create_time">{{ formatDate(list.type_2.create_time) }}</view>
							</view>
							<view class="right_info">
								<text v-if="list.type_2.content">{{ list.type_2.content }}</text>
								<text v-else>暂无信息</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item circle" id="circle" catchtouchmove="stopTouchMove">
				<circle-box ref="circleBox" :newMsgArr='newMsgArr'></circle-box>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import CircleBox from './circleBox.vue'
	export default {
		components: { CircleBox },
		data() {
			return {
				tabs: [{name: '消息'}, {name: '圈子'}],
				current: 0,
				offset: [0, 0],
				list: {
					type_0: {},
					type_1: {},
					type_2: {},
					type_3: {}
				},
				token: '',
				newMsgArr: [],
				offset: [10, 0]
			}
		},
		async onLoad() {
			let gt = this
			gt.token = await gt.gtRequest.getToken()
			if(gt.token) {
				gt.getList()
				gt.refreshCircle()
			} else {
				uni.showModal({
					title: '请先登录',
					showCancel: true,
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login'
							});
							return false
						}
					}
				})
			}
		},
		onShow() {
			let gt = this
			uni.hideTabBarRedDot({ //隐藏红点
				index: 3
			})
			gt.newMsgArr = JSON.parse(uni.getStorageSync('newMsgArr') || '[]')
			gt.$nextTick(()=> {
				gt.$refs.circleBox.companyInfo = uni.getStorageSync('companyInfo')
				gt.$refs.circleBox.userInfo = uni.getStorageSync('userInfo')
			})
		},
		// 下拉刷新
		// onPullDownRefresh() {
		//     let gt = this
		// 	gt.current ? gt.refreshCircle() : gt.getList()
		//     uni.stopPullDownRefresh() // 停止刷新
		// },
		methods: {
			refreshCircle() {
				let gt = this
				// gt.$nextTick(()=> {
					gt.$refs.circleBox.showFn()
				// })
			},
			getList() {
				let gt = this
				gt.gtRequest.post('/api/applogin/get_message_num', {
					platform: 'logistics'
				}).then(res => {
					gt.list = res
				})
			},
			tabsChange(index) {
				let gt = this
				if(gt.token) {
					gt.current = index
				} else {
					uni.showModal({
						title: '获取完整体验，请先登录',
						showCancel: true,
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../login/login'
								});
								return false
							}
						}
					})
				}
			},
			animationfinish(e) {
				let gt = this
				let current = e.detail.current
				gt.$refs.uTabs.setFinishCurrent(current)
				gt.current = current
			},
			clearUnread() {
				let gt = this
				if(gt.token) {
					gt.gtRequest.post('/api/applogin/lots_read_message', {
						platform: 'logistics'
					}).then(res => {
						gt.list.type_0.num = 0
						gt.list.type_1.num = 0
						gt.list.type_2.num = 0
						gt.list.type_3.num = 0
					})
				} else {
					uni.showModal({
						title: '请先登录',
						showCancel: true,
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../login/login'
								});
								return false
							}
						}
					})
				}
			},
			circleMsg() {
				uni.navigateTo({
					url: '../../subMsg/pages/message/circleMsg'
				})
			},
			goDetail(type) {
				let gt = this
				if(gt.token) {
					switch (type){
						case 1:
							uni.navigateTo({
								url: '../../subMsg/pages/message/visitorLog'
							})
							break;
						case 2:
							uni.navigateTo({
								url: '../../subMsg/pages/message/logisticsInfo'
							})
							break;
						case 3:
							uni.navigateTo({
								url: '../../subMsg/pages/message/redEnvelopeWelfare'
							})
							break;
						case 4:
							uni.navigateTo({
								url: '../../subMsg/pages/message/serviceNotice'
							})
							break;
						default:
							break;
					}
				} else {
					uni.showModal({
						title: '请先登录',
						showCancel: true,
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../login/login'
								});
								return false
							}
						}
					})
				}
			},
			formatDate(date) {
				let gt = this
				date = (date.toString()).length > 10 ? date : date * 1000
				let target = new Date(date)
				let now = +new Date()
				let threeDay = 24 * 60 * 60 * 1000 * 3
				if((now - date) > threeDay) {
					// 现在的时间超出传入时间3天就显示具体的年月日
					let year = target.getFullYear().toString().slice(-2)
					let month = target.getMonth() + 1
					let day = target.getDate()
					month = month > 9 ? month : '0' + month
					day = day > 9 ? day : '0' + day
					return year + "/" + month + "/" + day
				} else {
					// 显示周几
					return gt.judgeDay(target.getDay())
				}
			},
			judgeDay(type) {
				switch (type) {
					case 0:
						return '周日'
					case 1:
						return '周一'
					case 2:
						return '周二'
					case 3:
						return '周三'
					case 4:
						return '周四'
					case 5:
						return '周五'
					case 6:
						return '周六'
					default:
						return ''
				}
			},
			stopTouchMove() {
				return false
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $gtBackgroundColor;
		font-family: PingFangSC-Regular, PingFang SC;
		.gt_content {
			.gt_title {
				width: 100%;
				position: fixed;
				top: 0;
				display: flex;
				align-items: flex-end;
				padding-top: 90rpx;
				z-index: 999;
				background-color: #fff;
				.gt_title_name {
					position: relative;
					width: 120rpx;
					height: 80rpx;
					line-height: 80rpx;
					margin-left: 24rpx;
					white-space: nowrap;
				}
				.gt_title_icon {
					position: relative;
					width: 40rpx;
				}
				.gt_title_swiper {
					margin-left: 140rpx;
				}
			}
			.main {
				height: calc(100vh - 170rpx);
				margin-top: 170rpx;
				.line {
					height: 20rpx;
				}
				.swiper-item {
					overflow: auto;
					.card {
						height: 160rpx;
						display: flex;
						padding: 0 24rpx;
						background-color: #fff;
						.card_left {
							position: relative;
							width: 96rpx;
							height: 96rpx;
							margin: 32rpx 16rpx 32rpx 0;
						}
						.card_right {
							width: calc(100% - 96rpx);
							border-bottom: 2rpx solid #f2f2f2;
							padding: 32rpx 0;
							.right_title {
								display: flex;
								justify-content: space-between;
								align-items: flex-end;
								.right_name {
									font-size: 32rpx;
									color: #000;
									font-weight: 700;
									margin-bottom: 8rpx;
								}
								.right_time {
									font-size: 24rpx;
									color: #909399;
								}
							}
							.right_info {
								font-size: 24rpx;
								color: #909399;
							}
						}
					}
				}
			}
		}
	}
</style>