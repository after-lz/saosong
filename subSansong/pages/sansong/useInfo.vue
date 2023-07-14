<template>
	<view class="gt_content">
		<view class="con_tabs">
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"
				swiperWidth="750" height="88" :show-bar="false" :active-item-style="activeStyle"></u-tabs-swiper>
		</view>
		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" id="already">
					<scroll-view scroll-y="true" @scrolltolower="loadMore(1)" style="height:89vh;overflow: auto">
						<view class="card" v-for="item in list" :key="item.id">
							<view class="card_content">
								<view class="profile">
									<img :src="item.user_img" alt="">
								</view>
								<view class="card_info">
									<view class="info_name">{{ item.nickname }}</view>
									<view class="info_phone">{{ item.phone }}</view>
								</view>
								<view class="card_des">
									<view class="des_time">领取时间：{{ item.update_time.slice(0, 16) }}</view>
									<view class="des_title">{{ item.coupon_title }}</view>
								</view>
							</view>
							<view class="info_time">有效期至{{ item.date_range }}</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" id="used">
					<scroll-view scroll-y="true" @scrolltolower="loadMore(2)" style="height:89vh;overflow: auto">
						<view class="card" v-for="item in list" :key="item.id">
							<view class="card_content">
								<view class="profile">
									<img :src="item.user_img" alt="">
								</view>
								<view class="card_info">
									<view class="info_name">{{ item.nickname }}</view>
									<view class="info_phone">{{ item.phone }}</view>
								</view>
								<view class="card_des">
									<view class="des_time">使用时间：{{ item.update_time.slice(0, 16) }}</view>
									<view class="des_title">{{ item.coupon_title }}</view>
								</view>
							</view>
							<view class="info_time">有效期至{{ item.date_range }}</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" id="overdue">
					<scroll-view scroll-y="true" style="height:89vh;overflow: auto">
						<view class="card" v-for="item in list" :key="item.id">
							<view class="card_content">
								<view class="profile">
									<img :src="item.user_img" alt="">
								</view>
								<view class="card_info">
									<view class="info_name">{{ item.nickname }}</view>
									<view class="info_phone">{{ item.phone }}</view>
								</view>
								<view class="card_des">
									<view class="des_time">领取时间：{{ item.update_time.slice(0, 16) }}</view>
									<view class="des_title1">{{ item.coupon_title }}</view>
								</view>
							</view>
							<view class="info_time">有效期至{{ item.date_range }}</view>
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
				tabList: [{
					name: '已领取'
				}, {
					name: '已使用'
				}, {
					name: '已过期'
				}],
				currentTab: 0,
				activeStyle: {'background-color': '#409eff', 'color': '#fff !important'},
				list: [],
				params: {
					page: 1,
					limit: 10,
					status: 0,
					coupon_id: undefined
				},
				over: false
			}
		},
		onLoad(option) {
			let gt = this
			gt.params.id = decodeURIComponent(option.id)
		},
		mounted() {
			let gt = this
			gt.getList()
		},
		methods: {
			tabsChange(index) {
				let gt = this
				gt.currentTab = index
				gt.params.status = index
				gt.params.page = 1
				gt.list = []
				gt.over = false
				gt.getList()
			},
			getList() {
				let gt = this
				gt.gtRequest.post('/logistics/coupon/detailList', gt.params).then(res=>{
					gt.list = [...gt.list, ...res.list]
					gt.over = res.list.length < gt.params.limit
					//gt.list = [...res.list, ...res.list, ...res.list, ...res.list, ...res.list, ...res.list]
				})
			},
			animationfinish(item) {
				let gt = this
				gt.currentTab = item.detail.current
			},
			loadMore(type) {
				let gt = this
				if(gt.over) return
				gt.params.page++
				gt.getList()
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
		.gt_content {
			/deep/.u-scroll-view {
				height: 100rpx;
				border-top: 2rpx solid #e9e9e9;
				border-bottom: 2rpx solid #e9e9e9;
				box-sizing: border-box;
			}
			/deep/.u-tabs-scroll-box {
				width: 498rpx;
				height: 60rpx;
				margin: 20rpx auto;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #ffffff;
				border: 2rpx solid #7abbff;
				.u-tabs-item {
					height: 100% !important;
					line-height: 60rpx !important;
					font-weight: 300 !important;
					font-size: 24rpx !important;
					color: #409eff !important;
					border-right: 2rpx solid #7abbff;
					&:nth-child(3) {
						border-right: 0;
					}
				}
			}
			.con_swiper {
				swiper {
					height: calc(100vh - 88rpx);
				}
			}
			.card {
				width: 94%;
				//height: 160rpx;
				border: 2rpx solid #f2f2f2;
				border-radius: 10rpx;
				margin: 20rpx auto;
				padding: 10rpx;
				color: #999999;
				.card_content {
					//height: 80%;
					display: flex;
					justify-content: space-between;
				}
				.profile {
					width: 120rpx;
					//height: 120rpx;
					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}
				.card_info {
					display: flex;
					flex-wrap: wrap;
					margin-left: 20rpx;
					.info_name {
						font-size: 32rpx;
						font-weight: 700;
						color: #666666;
					}
				}
				.card_des {
					display: flex;
					justify-content: flex-end;
					align-items: flex-start;
					flex-wrap: wrap;
					.des_time {
						font-size: 24rpx;
					}
					.des_title {
						width: 184rpx;
						height: 64rpx;
						background-color: #8080ff;
						color: #fff;
						text-align: center;
						line-height: 64rpx;
						font-size: 24rpx;
					}
					.des_title1 {
						background-color: #d7d7d7;
					}
				}
				.info_time {
					margin-left: 100rpx;
				}
			}
		}
	}
</style>
