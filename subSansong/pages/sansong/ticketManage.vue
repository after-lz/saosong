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
								<view class="card_title">
									<text>{{ item.title }}</text>
									<text>明细</text>
								</view>
								<view class="row">
									<view class="label">发券金额</view>
									<view class="label_info">￥{{ item.money }}</view>
								</view>
								<view class="row">
									<view class="label">发券数量</view>
									<view class="label_info">{{ item.total }}</view>
								</view>
								<view class="card_time">
									有效期至{{ item.time }}
								</view>
								<view class="row_3">
									<view class="col">
										<view class="label">已领取</view>
										<view class="label_info">{{ item.alreadyOrder }}张</view>
									</view>
									<view class="col">
										<view class="label">已使用</view>
										<view class="label_info">{{ item.haveorder }}张</view>
									</view>
									<view class="col">
										<view class="label">未领取</view>
										<view class="label_info">{{ item.unclaimedOrder }}张</view>
									</view>
								</view>
							</view>
						</view>
							
					</scroll-view>
					<view class="btn" @click="goInstantCoupon">立即发券</view>
				</swiper-item>
				<swiper-item class="swiper-item" id="down">
					<scroll-view scroll-y="true">
						
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
				list: [
					{
						id: 1,
						title: '满100减50券',
						money: 1000,
						total: 4,
						time: '2023.01.01-2023.02.01',
						alreadyOrder: 3,
						haveorder: 1,
						unclaimedOrder: 0
					}
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			tabsChange(index) {
				let gt = this
				gt.currentTab = index
			},
			animationfinish(item) {
				let gt = this
				gt.currentTab = item.detail.current
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
					width: 170rpx;
					height: 230rpx;
					display: flex;
					align-items: center;
					background-color: #e4e4e4;
				}
				.card_right {
					.card_title {
						display: flex;
						justify-content: space-between;
					}
					.row {
						display: flex;
					}
					.row_3 {
						display: flex;
						.col {
							display: flex;
						}
					}
				}
			}
		}
	}
</style>