<template>
	<view class="gt_content">
		<view class="con_tabs">
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"/>
		</view>
		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" id="active">
					<u-empty text="您还没有发券" mode="list" v-if="!list.length"></u-empty>
					<scroll-view scroll-y="true" @scrolltolower="loadMore(1)" style="height: 80vh;overflow: auto" v-else>
						<view class="card" v-for="item in list" :key="item.id">
							<view class="card_top">
								<view class="card_left">
									<view class="money">{{ (+item.coupon_min_price).toFixed(0) }}元</view>
									<view class="money_des">{{ item.coupon_type_name }}</view>
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
									<u-row>
										<u-col span="12" text-align="left">
											<view class="label time">有效期至{{ item.date_end }}</view>
										</u-col>
									</u-row>
									<u-row class="black">
										<u-col span="12" text-align="left">
											<view class="label">发券总金额：{{ item.coupon_price }}元</view>
										</u-col>
									</u-row>
									<u-row class="black">
										<u-col span="12" text-align="left">
											<view class="label">发券数量：{{ item.coupon_num }}张</view>
										</u-col>
									</u-row>
								</view>
							</view>
							<u-row>
								<u-col span="3" text-align="left">
									<view class="label">已领取:{{ item.takeNum }}张</view>
								</u-col>
								<u-col span="3" text-align="left">
									<view class="label">已使用:{{ item.usedNum }}张</view>
								</u-col>
								<u-col span="3" text-align="left">
									<view class="label">未领取:{{ item.unTakeNum }}张</view>
								</u-col>
								<u-col span="3" text-align="left">
									<view class="btn1" @click="show = true, id = item.id">结束发券</view>
								</u-col>
							</u-row>
						</view>
					</scroll-view>
					<u-button class="btn" type="primary" @click="goInstantCoupon">立即发券</u-button>
				</swiper-item>
				<swiper-item class="swiper-item" id="down">
					<u-empty text="您还没有发券" mode="list" v-if="!list.length"></u-empty>
					<scroll-view scroll-y="true" @scrolltolower="loadMore(2)" style="height: 90vh;overflow: auto" v-else>
						<view class="card card_over" v-for="item in list" :key="item.id">
							<view class="card_top">
								<view class="card_left">
									<view class="money">{{ (+item.coupon_min_price).toFixed(0) }}元</view>
									<view class="money_des">{{ item.coupon_type_name }}</view>
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
									<u-row>
										<u-col span="12" text-align="left">
											<view class="label time">有效期至{{ item.date_end }}</view>
										</u-col>
									</u-row>
									<u-row class="black">
										<u-col span="12" text-align="left">
											<view class="label">发券总金额：{{ item.coupon_price }}元</view>
										</u-col>
									</u-row>
									<u-row class="black">
										<u-col span="12" text-align="left">
											<view class="label">发券数量：{{ item.coupon_num }}张</view>
										</u-col>
									</u-row>
									<image :src="gtCommon.getOssImg('sansong/status_end.png')" class="status_end"></image>
								</view>
							</view>
							<u-row>
								<u-col span="3" text-align="left">
									<view class="label">已领取:{{ item.takeNum }}张</view>
								</u-col>
								<u-col span="3" text-align="left">
									<view class="label">已使用:{{ item.usedNum }}张</view>
								</u-col>
								<u-col span="3" text-align="left">
									<view class="label">未领取:{{ item.unTakeNum }}张</view>
								</u-col>
							</u-row>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<u-modal v-model="show" content="确定要结束当前优惠券的发放吗？" title="结束提醒" @confirm="confirm" :show-cancel-button="true"></u-modal>
			<u-toast ref="uToast" />
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
				list: [],
				show: false,
				id: undefined,
				params: {},
				over: false
			}
		},
		onShow() {
			let gt = this
			gt.params = {
				page: 1,
				limit: 10,
				status: gt.currentTab === 0 ? 1 : 2
			}
			gt.over = false
			gt.list = []
			gt.getList()
		},
		methods: {
			tabsChange(index) {
				let gt = this
				gt.currentTab = index
				gt.params.status = gt.currentTab === 0 ? 1 : 2
				gt.params.page = 1
				gt.over = false
				gt.list = []
				gt.getList()
			},
			getList() {
				let gt = this
				gt.gtRequest.post('/logistics/coupon/list', gt.params).then(res=>{
					gt.list = [...gt.list, ...res.list]
					gt.over = res.list.length < gt.params.limit
				})
			},
			animationfinish(item) {
				let gt = this
				gt.currentTab = item.detail.current
			},
			confirm() {
				let gt = this
				gt.gtRequest.post('/logistics/coupon/endCoupon', {coupon_id: gt.id}).then(res=> {
					gt.params.page = 1
					gt.over = false
					gt.list = []
					gt.getList()
					gt.$refs.uToast.show({
						title: '结束发放优惠券成功'
					})
				})
			},
			loadMore() {
				let gt = this
				if(gt.over) return
				gt.params.page++
				gt.getList()
			},
			goCouponInfo(item) {
				uni.navigateTo({
					url: './useInfo?id='+item.id,
				})
				return false
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
		background: #F3F4F5;
		.gt_content {
			.con_swiper {
				swiper {
					height: calc(100vh - 80rpx);
				}
			}
			.u-empty {
				height: 80vh;
			}
			.card {
				padding: 24rpx;
				margin: 20rpx 16rpx;
				border: 2rpx solid #f2f2f2;
				background-color: #FFE7E8; 
				border-radius: 16rpx;
				color: #FF6067;
				.card_top {
					display: flex;
					.card_left {
						width: 180rpx;
						text-align: center;
						border-right: 2rpx solid #c8bdc0;
						margin: 30rpx 0;
						.money {
							font-size: 48rpx;
							width: 100%;
							text-align: center;
						}
						.money_des {
							margin-top: 16rpx;
						}
					}
					.card_right {
						width: calc(100% - 180rpx);
						padding-left: 22rpx;
						position: relative;
						.blod {
							color: #FF0524;
							font-size: 32rpx;
							font-weight: 700;
						}
						.row-info {
							.coupon_info {
								color: #485EF4;
								display: inline-block;
							}
						}
					}
				}
			}
			.card_over {
				background-color: #F9EDEE;
				color: #909399;
				.blod,
				.label {
					color: #909399 !important;
				}
			}
			.label {
				padding: 8rpx 0;
				font-size: 24rpx;
			}
			.black {
				color: #000;
			}
			.btn .u-btn {
				margin: 30rpx 16rpx;
			}
			.btn1 {
				width: 156rpx;
				height: 56rpx;
				line-height: 56rpx;
				text-align: center;
				background-color: #FF0524;
				color: #fff;
				border-radius: 10rpx;
			}
			.status_end {
				position: absolute;
				width: 132rpx;
				height: 132rpx;
				right: 12rpx;
				top: 50rpx;
			}
		}
	}
</style>