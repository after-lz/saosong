<template>
	<view class="gt_content">
		<view v-for="item in list" :key='item.id' class="item">
			<view class="item_left">
				<view class="item_title">{{ item.title }}</view>
				<view class="item_time">{{ item.time }}</view>
			</view>
			<view class="item_right">
				{{ item.money }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						id: 1,
						title: '红包收入（发布专线奖励）',
						time: '2022-11-11 08:08:50',
						money: '+50.00'
					},
					{
						id: 2,
						title: '红包收入（下单奖励）',
						time: '2022-11-11 08:08:50',
						money: '+50.00'
					},
					{
						id: 3,
						title: '红包支出（专线推广）',
						time: '2022-11-11 08:08:50',
						money: '-100.00'
					},
				]
			}
		},
		mounted() {
			for (let i = 0; i < 20; i++) {
				this.list.push({
					id: i+1,
					title: '红包收入（发布专线奖励）',
					time: '2022-11-11 08:08:50',
					money: '+50.00'
				})
			}
		}
	}
</script>

<style lang='scss'>
	.gt_content {
		width: 94%;
		height: 94vh;
		margin: 20rpx auto;
		background-color: #fff;
		box-shadow: 10rpx 10rpx 10rpx 0rpx #ddd;
		border-radius: 20rpx;
		overflow: auto;
	}
	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #797979;
		padding: 20rpx 40rpx 20rpx 80rpx;
		color: #666666;
		margin: 0 8rpx;
		.item_left {
			.item_title {
				font-weight: 700;
			}
			.item_time {
				color: #a2a2a2;
				font-size: 26rpx;
				margin-top: 10rpx;
			}
		}
		.item_right {
			font-weight: 700;
		}
	}
</style>