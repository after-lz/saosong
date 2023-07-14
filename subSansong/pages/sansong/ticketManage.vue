<template>
	<view class="gt_content">
		<view class="con_tabs">
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"
				swiperWidth="750" height="88" :show-bar="false" :active-item-style="activeStyle"></u-tabs-swiper>
		</view>
		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" id="active">
					<scroll-view scroll-y="true">
						<view class="card" v-for="item in list" :key="item.id">
							<view class="card_left">
								<view class="money">50元</view>
								<view class="money_des">满减券</view>
							</view>
							<view class="card_right">
								<u-row class="row-info">
									<u-col span="8">
										<view class="blod">{{ item.coupon_title }}</view>
									</u-col>
									<u-col span="4" text-align="right">
										<view class="coupon_info" @click="goCouponInfo(item)">明细</view>
									</u-col>
								</u-row>
								<u-row class="row-info">
									<u-col span="12" text-align="left">
										<view class="label">发券金额：￥{{ item.coupon_price }}</view>
									</u-col>
								</u-row>
								<u-row class="row-info">
									<u-col span="12" text-align="left">
										<view class="label">发券数量：{{ item.coupon_num }}张</view>
									</u-col>
								</u-row>
								<u-row class="row-info">
									<u-col span="12" text-align="left">
										<view class="label">有效期至{{ item.date_end }}</view>
									</u-col>
								</u-row>
								<u-row class="row-info">
									<u-col span="4" text-align="left">
										<view class="label">已领取{{ item.takeNum }}</view>
									</u-col>
									<u-col span="4" text-align="left">
										<view class="label">已使用{{ item.usedNum }}</view>
									</u-col>
									<u-col span="4" text-align="left">
										<view class="label">未领取{{ item.unTakeNum }}</view>
									</u-col>
								</u-row>
							</view>
							<!-- <view class="card_right">
								<view class="card_title">
									<text class="blod">{{ item.coupon_title }}</text>
									<text class="coupon_info">明细</text>
								</view>
								<view class="row">
									<view class="label">发券金额</view>
									<view class="label_info">￥{{ item.coupon_price }}</view>
								</view>
								<view class="row">
									<view class="label">发券数量</view>
									<view class="label_info">{{ item.coupon_num }}</view>
								</view>
								<view class="card_time">
									有效期至{{ item.date_end }}
								</view>
								<view class="row_3">
									<view class="col">
										<view class="label">已领取</view>
										<view class="label_info">{{ item.takeNum }}张</view>
									</view>
									<view class="col">
										<view class="label">已使用</view>
										<view class="label_info">{{ item.usedNum }}张</view>
									</view>
									<view class="col">
										<view class="label">未领取</view>
										<view class="label_info">{{ item.unTakeNum }}张</view>
									</view>
								</view>
							</view> -->
						</view>
							
					</scroll-view>
					<view class="btn" @click="goInstantCoupon">立即发券</view>
				</swiper-item>
				<swiper-item class="swiper-item" id="down">
					<scroll-view scroll-y="true">
						<view class="card" v-for="item in overList" :key="item.id">
							<view class="card_left">
								<view class="money">50元</view>
								<view class="money_des">满减券</view>
							</view>
							<view class="card_right">
								<u-row class="row-info">
									<u-col span="8">
										<view class="blod">{{ item.coupon_title }}</view>
									</u-col>
									<u-col span="4" text-align="right">
										<view class="coupon_info">明细</view>
									</u-col>
								</u-row>
								<u-row class="row-info">
									<u-col span="12" text-align="left">
										<view class="label">发券金额：￥{{ item.coupon_price }}</view>
									</u-col>
								</u-row>
								<u-row class="row-info">
									<u-col span="12" text-align="left">
										<view class="label">发券数量：{{ item.coupon_num }}张</view>
									</u-col>
								</u-row>
								<u-row class="row-info">
									<u-col span="12" text-align="left">
										<view class="label">有效期至{{ item.date_end }}</view>
									</u-col>
								</u-row>
								<u-row class="row-info">
									<u-col span="4" text-align="left">
										<view class="label">已领取{{ item.takeNum }}</view>
									</u-col>
									<u-col span="4" text-align="left">
										<view class="label">已使用{{ item.usedNum }}</view>
									</u-col>
									<u-col span="4" text-align="left">
										<view class="label">未领取{{ item.unTakeNum }}</view>
									</u-col>
								</u-row>
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
				tabList: [{
					name: '活动中'
				}, {
					name: '已结束'
				}],
				currentTab: 0,
				activeStyle: {'background-color': '#409eff', 'color': '#fff !important'},
				list: [],
				overList: []
			}
		},
		onLoad() {
			
		},
		mounted() {
			let gt = this;
			var url = '/logistics/coupon/list';
			var data= {
				page: 1,
				limit: 10,
				status: gt.currentTab===0?1:2
			};
			gt.gtRequest.post(url,data).then(res=>{
				gt.list = res.list
			});
		},
		methods: {
			tabsChange(index) {
				let gt = this
				gt.currentTab = index
				var url = '/logistics/coupon/list';
				var data= {
					page: 1,
					limit: 10,
					status: gt.currentTab===0?1:2
				};
				gt.gtRequest.post(url,data).then(res=>{
					gt.currentTab===0? gt.list = res.list:gt.overList = res.list
				});
			},
			animationfinish(item) {
				let gt = this
				gt.currentTab = item.detail.current
			},
			goCouponInfo(item) {
				uni.navigateTo({
					url: './useInfo?id='+item.id,
				})
			},
			goInstantCoupon() {
				uni.navigateTo({
					url: './instantCoupon',
				})
				return false
			}
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
				width: 332rpx;
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
				}
			}
			.con_swiper {
				swiper {
					height: calc(100vh - 88rpx);
					
				}
			}
			.btn {
				width: 90%;
				margin: 0 auto;
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				border-radius: 16rpx;
				background-color: #409eff;
				color: #fff;
			}
			.card {
				 display: flex;
				padding: 20rpx;
				margin: 20rpx;
				border: 2rpx solid #f2f2f2;
				.card_left {
					display: flex;
					width: 170rpx;
					height: 230rpx;
					align-items: center;
					background-color: #e4e4e4;
				}
				.card_right {
					width: 70%;
					.row-info {
						.coupon_info {
							color: #409eff;
						}
					}
				}
				// .card_right {
				// 	.card_title {
				// 		display: flex;
				// 		justify-content: space-between;
				// 	}
				// 	.coupon_info {
				// 		width: 130px;
				// 		display: flex;
				// 		justify-content:flex-end;
				// 	}
				// 	.row {
				// 		display: flex;
				// 	}
				// 	.row_3 {
				// 		display: flex;
				// 		.col {
				// 			display: flex;
				// 		}
				// 	}
				// }
			}
			.blod {
				font-weight: 700;
			}
		}
	}
</style>