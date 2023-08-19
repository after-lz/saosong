<template>
	<view class="gt_content">
		<scroll-view scroll-y @scrolltolower="loadingMore" class="content">
			<template v-if="list.length">
				<view class="card" v-for="item in list" :key="item.about_id">
					<view class="card_time">{{ formatDate(item.create_time) }}</view>
					<view class="card_content">
						<view class="card_title">{{ item.title }}</view>
						<view class="card_info">{{ item.content }}</view>
					</view>
				</view>
				<u-loadmore :status="status" />
			</template>
			<view class="con_empty" v-else>
				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {},
				list: [],
				status: 'loading',
			}
		},
		onLoad() {
			let gt = this
			gt.params = {
				platform: 'logistics',
				type: 1,
				page: 1,
				limit: 20,
				isEnd: false
			}
			gt.readMsg()
			gt.getList()
		},
		methods: {
			getList() {
				let gt = this
				gt.gtRequest.post('/api/applogin/get_message_list', gt.params).then(res => {
					gt.list = [...gt.list, ...res.list]
					gt.status = +res.now_page >= res.total_page ? 'nomore' : 'loading'
				})
			},
			readMsg() {
				let gt = this
				gt.gtRequest.post('/api/applogin/type_read_message', {
					platform: 'logistics',
					type: 1
				})
			},
			loadingMore() {
				let gt = this
				if(gt.status === 'nomore') return
				++gt.params.page
				gt.getList()
			},
			formatDate(date) {
				let gt = this
				date = (date.toString()).length > 10 ? date : date * 1000
				let target = new Date(date)
				let year = target.getFullYear().toString()
				let month = target.getMonth() + 1
				let day = target.getDate()
				let hourse = target.getHours()
				let minu = target.getMinutes()
				month = month > 9 ? month : '0' + month
				day = day > 9 ? day : '0' + day
				return year + "年" + month + "月" + day + '日' + ' ' + hourse + ':' + minu
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $gtBackgroundColor;
		font-family: PingFangSC-Regular, PingFang SC;
		.gt_content {
			.content {
				height: 99vh;
			}
			.card {
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				margin: 0 16rpx;
				.card_time {
					display: inline-block;
					height: 48rpx;
					line-height: 48rpx;
					color: #000;
					background-color: #dddee0;
					border-radius: 8rpx;
					padding: 0 20rpx;
					margin: 40rpx 0 24rpx 0;
				}
				.card_content {
					width: 100%;
					padding: 32rpx;
					background-color: #fff;
					border-radius: 16rpx;
					.card_title {
						font-size: 32rpx;
						font-weight: 700;
						color: #000;
						margin-bottom: 24rpx;
					}
					.card_info {
						color: #909399;
					}
				}
			}
		}
		.u-more {
			margin: 36rpx 0;
		}
	}
</style>