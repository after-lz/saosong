<template>
	<view class="gt_content">
		<view class="con_tabs">
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false" />
		</view>
		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" id="already">
					<scroll-view scroll-y="true" @scrolltolower="loadMore(0)" style="height:90vh;overflow: auto">
						<view class="card" v-for="item in list0" :key="item.id">
							<u-avatar :src="item.user_img" mode="circle"></u-avatar>
							<view class="card_content">
								<view class="card_info">
									<view class="info_name">{{ item.nickname }}</view>
									<view class="des_time">领取时间：{{ item.update_time.slice(0, 16) }}</view>
								</view>
								<view class="info_phone">{{ item.phone }}</view>
								<view class="card_des">
									<view class="info_time">有效期至：{{ item.getCouponInfo && item.getCouponInfo.date_end }}</view>
									<view class="des_title">{{ item.coupon_title }}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" id="used">
					<scroll-view scroll-y="true" @scrolltolower="loadMore(1)" style="height:90vh;overflow: auto">
						<view class="card" v-for="item in list1" :key="item.id">
							<u-avatar :src="item.user_img" mode="circle"></u-avatar>
							<view class="card_content">
								<view class="card_info">
									<view class="info_name">{{ item.nickname }}</view>
									<view class="des_time">使用时间：{{ item.update_time.slice(0, 16) }}</view>
								</view>
								<view class="info_phone">{{ item.phone }}</view>
								<view class="card_des">
									<view class="info_time">有效期至：{{ item.getCouponInfo && item.getCouponInfo.date_end }}</view>
									<view class="des_title">{{ item.coupon_title }}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" id="overdue">
					<scroll-view scroll-y="true" @scrolltolower="loadMore(2)" style="height:90vh;overflow: auto">
						<view class="card" v-for="item in list2" :key="item.id">
							<u-avatar :src="item.user_img" mode="circle"></u-avatar>
							<view class="card_content">
								<view class="card_info">
									<view class="info_name">{{ item.nickname }}</view>
									<view class="des_time">领取时间：{{ item.update_time.slice(0, 16) }}</view>
								</view>
								<view class="info_phone">{{ item.phone }}</view>
								<view class="card_des">
									<view class="info_time">有效期至：{{ item.getCouponInfo && item.getCouponInfo.date_end }}</view>
									<view class="des_title des_title1">{{ item.coupon_title }}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [
					{
						name: '已领取'
					}, 
					{
						name: '已使用'
					}, 
					{
						name: '已过期'
					}
				],
				currentTab: 0,
				list0: [],
				list1: [],
				list2: [],
				params0: {
					page: 1,
					limit: 10,
					status: 0,
					coupon_id: undefined,
					over: false,
					total_count: 0
				},
				params1: {
					page: 1,
					limit: 10,
					status: 1,
					coupon_id: undefined,
					over: false,
					total_count: 0
				},
				params2: {
					page: 1,
					limit: 10,
					status: 2,
					coupon_id: undefined,
					over: false,
					total_count: 0
				}
			}
		},
		onLoad(option) {
			let gt = this
			gt.params0.coupon_id = option.id
			gt.params1.coupon_id = option.id
			gt.params2.coupon_id = option.id
		},
		onShow() {
			let gt = this
			gt.getList(0)
			gt.getList(1)
			gt.getList(2)
		},
		methods: {
			tabsChange(index) {
				let gt = this
				gt.currentTab = index
				// gt['params'+type].status = index
				// gt['params'+type].page = 1
				// gt['list'+type] = []
				// gt['params'+type].over = false
				// gt.getList(index)
			},
			getList(type) {
				let gt = this
				gt.gtRequest.post('/logistics/coupon/detailList', gt['params'+type]).then(res=>{
					gt['list'+type] = [...gt['list'+type], ...res.list]
					gt['params'+type].total_count = res.total_count || 0
					console.log(gt.params1.total_count)
					gt.tabList = [
						{
							name: `已领取(${gt.params0.total_count})`
						}, 
						{
							name: `已使用(${gt.params1.total_count})`
						}, 
						{
							name: `已过期(${gt.params2.total_count})`
						}
					]
					gt['params'+type].over = res.list.length < gt['params'+type].limit
					// gt.list = [...res.list, ...res.list, ...res.list, ...res.list, ...res.list, ...res.list]
				})
			},
			animationfinish(item) {
				let gt = this
				gt.currentTab = item.detail.current
			},
			loadMore(type) {
				let gt = this
				if(gt['params'+type].over) return
				gt['params'+type].page++
				gt.getList(type)
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F3F4F5;
		.gt_content {
			.con_swiper {
				swiper {
					height: calc(100vh - 80rpx);
					padding: 20rpx 16rpx;
				}
			}
			.card {
				border-radius: 16rpx;
				padding: 24rpx 16rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				display: flex;
				color: #000;
				.card_content {
					width: calc(100% - 90rpx);
					padding-left: 20rpx;
					.card_info {
						display: flex;
						justify-content: space-between;
						.info_name {
							font-size: 28rpx;
							font-weight: 700;
						}
						.des_time {
							font-size: 24rpx;
							color: #909399;
						}
					}
				}
				
				.card_des {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					.info_time {
						
					}
					.des_title {
						width: 218rpx;
						height: 64rpx;
						background-color: #485EF4;
						color: #fff;
						text-align: center;
						line-height: 64rpx;
						font-size: 28rpx;
						border-radius: 8rpx;
					}
					.des_title1 {
						background-color: #909399;
					}
				}
			}
		}
	}
</style>
