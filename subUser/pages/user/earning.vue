<template>
	<view class="gt_content">
		<view class="tabs">
			<u-tabs :list="tabs" :is-scroll="false" :current="tabIndex" @change="change"></u-tabs>
		</view>
		<view class="tabs_option"></view>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab, i) in tabs" :key="i">
				<earning-view ref="earningView" :i="i" :index="tabIndex" :height="height"></earning-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import earningView from "./earningView.vue";
	export default {
		components: { earningView },
		data() {
			return {
				tabIndex: 0, // 当前tab的下标
				height: '',
				tabs: [
					{name: '已结算'},
					{name: '未结算'}
				],
				canReset: false
			}
		},
		onLoad(options) {
			this.tabIndex = parseInt(options.type) ? 0 : 1
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
				let earningView = this.$refs.earningView
				if(earningView) {
					let item = earningView[i]
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
			.u-column-item {
				.u-text {
					width: 0;
				}
			}
		}
	}
</style>