<template>
	<view class="gt_content">
		<view class="tabs">
			<u-tabs :list="tabs" :is-scroll="false" :current="tabIndex" @change="change"></u-tabs>
		</view>
		<view class="tabs_option"></view>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab, i) in tabs" :key="i">
				<mescroll-item ref="mescrollItem" :i="i" :index="tabIndex" :height="height"></mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import mescrollItem from "./mescroll-swiper-item.vue";
	export default {
		components: { mescrollItem },
		data() {
			return {
				tabIndex: 0, // 当前tab的下标
				height: '',
				tabs: [
					{name: '处理中'},
					{name: '已处理'},
					{name: '已撤销'}
				],
				canReset: false
			}
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight - 41 + 'px'
		},
		onShow() {
			if(this.canReset) {
				let curMescroll = this.getMescroll(this.tabIndex)
				curMescroll && curMescroll.resetUpScroll()
			}
			this.canReset = true
		},
		methods: {
			change(index) {
				this.tabIndex = index
			},
			swiperChange(e){
				this.tabIndex = e.detail.current
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
			.tabs {
				width: 100%;
				position: fixed;
				z-index: 999;
			}
			.tabs_option {
				height: 82rpx;
			}
		}
	}
</style>