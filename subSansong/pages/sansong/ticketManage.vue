<template>
	<view class="gt_content">
		<view class="con_tabs">
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"
				swiperWidth="750" height="88" :show-bar="false" :active-item-style="activeStyle"></u-tabs-swiper>
		</view>
		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" id="active">
					<u-empty text="您还没有发券" mode="list" v-if="!list.length"></u-empty>
					<scroll-view scroll-y="true" @scrolltolower="loadMore(1)" style="height: 79vh;overflow: auto" v-else>
						<view class="card" v-for="item in list" :key="item.id">
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
										<view class="label time">有效期至{{ item.date_from + '-' + item.date_end }}</view>
									</u-col>
								</u-row>
								<u-row class="row-info">
									<u-col span="4" text-align="left">
										<view class="label">已领取:{{ item.takeNum }}张</view>
									</u-col>
									<u-col span="4" text-align="left">
										<view class="label">已使用:{{ item.usedNum }}张</view>
									</u-col>
									<u-col span="4" text-align="left">
										<view class="label">未领取:{{ item.unTakeNum }}张</view>
									</u-col>
								</u-row>
								<view class="btn1" @click="show = true, id = item.id">结束发券</view>
								<view class="btn2" v-if="item.status == 4">{{ judgeStatus(item.status) }}</view>
							</view>
						</view>
					</scroll-view>
					<view class="btn" @click="goInstantCoupon">立即发券</view>
				</swiper-item>
				<swiper-item class="swiper-item" id="down">
					<u-empty text="您还没有发券" mode="list" v-if="!list.length"></u-empty>
					<scroll-view scroll-y="true" @scrolltolower="loadMore(2)" style="height: 90vh;overflow: auto" v-else>
						<view class="card" v-for="item in list" :key="item.id">
							<view class="card_left">
								<view class="money">{{ (+item.coupon_min_price).toFixed(0) }}元</view>
								<view class="money_des">{{ item.coupon_type_name }}</view>
							</view>
							<view class="card_right">
								<u-row class="row-info">
									<u-col span="6">
										<view class="blod">{{ item.coupon_title }}</view>
									</u-col>
									<u-col span="6" text-align="right">
										<view class="status">{{ judgeStatus(item.status) }}</view>
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
										<view class="label time">有效期至{{ item.date_from + '-' + item.date_end }}</view>
									</u-col>
								</u-row>
								<u-row class="row-info">
									<u-col span="4" text-align="left">
										<view class="label">已领取:{{ item.takeNum }}张</view>
									</u-col>
									<u-col span="4" text-align="left">
										<view class="label">已使用:{{ item.usedNum }}张</view>
									</u-col>
									<u-col span="4" text-align="left">
										<view class="label">未领取:{{ item.unTakeNum }}张</view>
									</u-col>
								</u-row>
							</view>				
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
				activeStyle: {'background-color': '#409eff', 'color': '#fff !important'},
				list: [],
				show: false,
				id: undefined,
				params: {},
				over: false
			}
		},
		mounted() {
			let gt = this
			gt.params = {
				page: 1,
				limit: 10,
				status: gt.currentTab === 0 ? 1 : 2
			}
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
			judgeStatus(type) {
				switch (type){
					case 0:
						return '未启用'
					case 1:
						return '已启用'
					case 2:
						return '已过期'
					case 3:
						return '已下架'
					case 4:
						return '已领完'
					default:
						return ''
				}
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
				//margin: 0 auto;
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				border-radius: 16rpx;
				background-color: #409eff;
				color: #fff;
				position: absolute;
				bottom: 5%;
				left: 5%;
			}
			.btn1 {
				position: absolute;
				background-color: #409eff;
				color: #fff;
				border-radius: 10rpx;
				padding: 6rpx;
				font-size: 24rpx;
				width: 130rpx;
				text-align: center;
				right: 20rpx;
				top: 70rpx;
			}
			.btn2 {
				position: absolute;
				right: 30rpx;
				top: 120rpx;
				color: #8080ff;
				font-weight: 700;
			}
			.card {
				position: relative;
				display: flex;
				padding: 20rpx;
				margin: 20rpx;
				border: 2rpx solid #f2f2f2;
				.card_left {
					display: flex;
					flex-wrap: wrap;
					width: 170rpx;
					height: 230rpx;
					justify-content: center;
					align-items: center;
					background-color: #e4e4e4;
					color: #fff;
					.money {
						font-size: 36rpx;
						font-weight: 700;
						width: 100%;
						text-align: center;
					}
				}
				.card_right {
					width: calc(100% - 170rpx);
					.row-info {
						.coupon_info {
							color: #409eff;
							display: inline-block;
						}
					}
				}
			}
			.blod {
				font-weight: 700;
			}
			.time {
				color: #999999;
			}
			.label {
				padding: 8rpx 0;
				font-size: 24rpx;
			}
			.status {
				color: #8080ff;
				display: inline-block;
				margin-right: 30rpx;
				font-weight: 700;
			}
		}
	}
</style>