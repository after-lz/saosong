<template>
	<view class="gt_content">
		<view class="con_searchScreen">
			<view class="con_search">
				<u-search placeholder="输入订单号、车牌号" v-model="searchVal" height="72" bg-color="#F3F4F6" margin="8rpx 16rpx"
					:clearabled="false" :show-action="false" @search="onSearch"></u-search>
			</view>
			<view class="con_tabs">
				<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"
					swiperWidth="750"></u-tabs-swiper>
			</view>
		</view>
		<swiper :style="{height: height}" :current="currentTab" @change="swiperChange">
			<swiper-item v-for="(tab, i) in tabList" :key="i">
				<loading-record ref="mescrollItem" :i="i" :index="currentTab" :height="height"></loading-record>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import LoadingRecord from "./LoadingRecord.vue";
	export default {
		components: { LoadingRecord },
		data() {
			return {
				tabList: [
					{name: '运输中'},
					{name: '已到达'},
					{name: '已取消'}
				],
				currentTab: 0,
				height: 0,
				canReset: false,
				searchVal: ''
			}
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight - 86 + 'px'
		},
		onShow() {
			if(this.canReset) {
				let curMescroll = this.getMescroll(this.tabIndex)
				curMescroll && curMescroll.resetUpScroll()
			}
			this.canReset = true
		},
		methods: {
			onSearch() {
				this.$refs.mescrollItem[this.currentTab].params.search_key = this.searchVal
				this.$refs.mescrollItem[this.currentTab].downCallback()
			},
			tabsChange(index) {
				this.currentTab = index
			},
			swiperChange(e){
				this.currentTab = e.detail.current
			},
			getMescroll(i) {
				let mescrollItems = this.$refs.mescrollItem
				if(mescrollItems) {
					let item = mescrollItems[i]
					if(item) return item.mescroll
				}
				return null
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.con_search {
				width: 750rpx;
				height: 88rpx;
				background: #FFFFFF;
				padding: 1rpx;
			}
		}
	}
</style>