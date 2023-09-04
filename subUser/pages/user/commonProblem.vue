<template>
	<view class="gt_content">
		<view class="items">
			<view class="item" v-for="item in list" :key="item.id" @click="goDetail(item)">
				<view class="label">{{ item.title }}</view>
				<view class="con_icon">
					<u-icon name="arrow-right" color="#909399"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			let gt = this
			gt.getList()
		},
		methods: {
			getList() {
				let gt = this
				gt.gtRequest.post('/api/applogin/get_question_list', {
					platform: 'logistics',
					page: 1,
					limit: 999
				}).then(res => {
					gt.list = res.list
				})
			},
			goDetail(record) {
				let params = encodeURIComponent(JSON.stringify(record))
				uni.navigateTo({
					url: './problemDetail?params=' + params
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding: 20rpx 0;
			.items {
				padding: 0 40rpx;
				background-color: #fff;
			}
			.item {
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #000;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				border-bottom: 2rpx solid #f2f2f2;
				&:nth-last-child(1) {
					border-bottom: 0;
				}
			}
		}
	}
</style>