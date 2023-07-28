<template>
	<view class="gt_content">
		<!-- <view class="time" @click="show = true">
			{{ year }}年{{ month }}月
			<u-icon name="arrow-down"></u-icon>
		</view>
		<u-picker mode="time" v-model="show" :params="params" @confirm="confirm"></u-picker> -->
		<scroll-view class="scroll_view" scroll-y="true" @scrolltolower="loadMore">
			<view class="con_empty" v-if="dataList.length == 0">
				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view>
			<view v-for="item in dataList" :key='item.log_id' class="item">
				<view class="item_left">
					<view>{{ item.log_type_msg }}</view>
					<view class="item_time">{{ gtCommon.formateTime(item.create_time, 'YYYY-MM-DD HH:mm:SS') }}</view>
				</view>
				<view>
					<text v-if="item.number > 0">+{{ item.number }}</text>
					<text v-else>{{ item.number }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// params: {
				// 	year: true,
				// 	month: true,
				// 	day: false,
				// 	hour: false,
				// 	minute: false,
				// 	second: false
				// },
				// show: false,
				// year: '',
				// month: '',
				data: {},
				end: false,
				dataList: []
			}
		},
		mounted() {
			let gt = this
			// let date = new Date()
			// gt.year = date.getFullYear()
			// gt.month = date.getMonth() + 1
			gt.reGetDataList()
		},
		methods: {
			reGetDataList() {
				let gt = this
				gt.dataList = []
				gt.data = {
					page: 1,
					limit: 20,
					wallet_type: 'money02',
					data_type: 1
				}
				gt.end = false
				gt.getList()
			},
			getList() {
				let gt = this
				console.log(gt.data, gt.end)
				if (gt.end) {
					return false
				}
				gt.gtRequest.post("/logistics/companywallet/get_wallet_log", gt.data).then(res=> {
					// for (let i = 0; i < 20; i++) {
					// 	res.list.push({
					// 		id: i+1,
					// 		title: '红包收入（发布专线奖励）' + (i+1),
					// 		time: '2022-11-11 08:08:50',
					// 		money: '+50.00'
					// 	})
					// }
					gt.dataList = gt.dataList.concat(res.list)
					if (res.list.length == gt.data.limit) {
						gt.data.page += 1
					} else {
						gt.end = true
					}
				})
			},
			loadMore() {
				console.log('loadMore')
				let gt = this
				gt.getList()
			},
			confirm(date) {
				console.log(date.year, date.month)
			}
		}
	}
</script>

<style lang='scss'>
page {
	background: $gtBackgroundColor;
	.gt_content {
		/deep/.u-column-item {
			.u-text {
				width: 0;
			}
		}
		.time {
			font-weight: 700;
		}
		.con_empty{
			text-align: center;
		}
		.scroll_view {
			height: 94vh;
			overflow: auto;
		}
	}
	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #e9ebed;
		padding: 20rpx 40rpx;
		color: #000;
		margin: 0 8rpx;
		.item_left {
			.item_time {
				color: #909399;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
}
</style>