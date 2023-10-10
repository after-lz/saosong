<template>
	<view class="boardComponent">
		<view class="options">
			<view class="_tabs">
				<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
				:show-bar="false" font-size="28" :active-item-style="activeStyle" :bold="false" height="44"></u-tabs-swiper>
			</view>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="users">
			<swiper-item class="swiper-item">
				<view class="gt_title">
					<view>姓名</view>
					<view>手机号</view>
				</view>
				<scroll-view scroll-y class="gt_items">
					<view class="gt_item" v-for="(item, index) in active_list" :key="index">
						<view class="item_left">
							<u-avatar :src="item.headerpic" :size='64' mode="circle"></u-avatar>
							<view class="item_name">{{ item.nickname }}</view>
						</view>
						<view class="item_phone">{{ item.mobile | telHide }}</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view class="gt_title">
					<view>公司名称</view>
				</view>
				<scroll-view scroll-y class="gt_items">
					<view class="gt_item" v-for="(item, index) in logistics_list" :key="index">
						<view class="item_left">
							<u-avatar :src="item.company_pic" :size='64' mode="circle"></u-avatar>
							<view class="item_name">{{ item.company_name }}</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			active_list: {
				type: Object,
				default: ()=> {
					return {}
				}
			},
			logistics_list: {
				type: Object,
				default: ()=> {
					return {}
				}
			}
		},
		data() {
			return {
				tabs: [
					{name: '活跃货主'},
					{name: '入驻物流'}
				],
				current: 0,
				swiperCurrent: 0, 
				activeStyle: {
					fontSize: '32rpx',
					fontFamily: 'PingFangSC-Medium, PingFang SC'
				}
			}
		},
		methods: {
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
	.boardComponent {
		.options {
			background-color: #fff;
			font-family: PingFangSC-Medium, PingFang SC;
			padding: 24rpx;
			._tabs {
				width: 320rpx;
			}
		}
		.users {
			height: calc(880rpx - 92rpx);
			.gt_title {
				height: 64rpx;
				background-color: #a3aef9;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 66rpx 0 60rpx;
				view {
					color: #000;
				}
			}
			.gt_items {
				height: calc(880rpx - 156rpx);
				.gt_item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 24rpx;
					margin-top: 24rpx;
					.item_left {
						display: flex;
						align-items: center;
						.item_name {
							color: #000000;
							margin-left: 32rpx;
						}
					}
					.item_phone {
						color: #909399;
					}
				}
			}
		}
	}
</style>