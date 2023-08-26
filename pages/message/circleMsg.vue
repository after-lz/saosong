<template>
	<view class="gt_content">
		<scroll-view scroll-y @scrolltolower="loadingMore" class="content">
			<template v-if="list.length">
				<view class="card" v-for="item in list" :key="item.create_time">
					<view class="card_headerpic">
						<u-avatar :src="item.headerpic" :size="90"></u-avatar>
					</view>
					<view class="card_info">
						<view class="info_name">
							{{ item.name }}
						</view>
						<view class="info_content">
							<text v-if="item.action_type === 1">
								{{ item.words }}
							</text>
							<u-icon v-if="item.action_type === 2" name="thumb-up" color="#485EF4" size="36"></u-icon>
						</view>
						<view class="info_time">
							{{ gtCommon.judgeTime(item.create_time) }}
						</view>
					</view>
					<view class="card_img" :style="{backgroundImage: `url(${item.resource})`}">
						
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
				limit: 10,
				page: 1
			}
			gt.getList()
		},
		onNavigationBarButtonTap(event) {
			if(event.text === '清空') {
				let gt = this
				gt.clearNotis()
			}
		},
		methods: {
			getList() {
				let gt = this
				gt.gtRequest.post('/logistics/circle/newsList', gt.params).then(res => {
					gt.list = [...gt.list, ...res.list]
					gt.status = gt.params.page >= res.totalPage ? 'nomore' : 'loading'
				}) 
			},
			loadingMore() {
				let gt = this
				if(gt.status === 'nomore') return
				++gt.params.page
				gt.getList()
			},
			async clearNotis() {
				let gt = this
				await gt.gtRequest.post('/logistics/circle/delNews')
				gt.list = []
				gt.status = 'nomore'
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $gtBackgroundColor;
		font-family: PingFangSC-Regular, PingFang SC;
		.gt_content {
			padding: 0 16rpx;
			.card {
				// height: 160rpx;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				background-color: #fff;
				border-radius: 16rpx;
				padding: 20rpx;
				margin-top: 20rpx;
				.card_headerpic {
					width: 90rpx;
				}
				.card_info {
					width: calc(100% - 210rpx);
					height: 100%;
					margin: 0 20rpx;
					.info_name {
						color: $gtProjectColor;
					}
					.info_time {
						font-size: 24rpx;
						color: #909399;
					}
				}
				.card_img {
					width: 120rpx;
					height: 120rpx;
					background-repeat: no-repeat;
					background-size: cover;
				}
			}
		}
		.u-more {
			margin: 36rpx 0;
		}
	}
</style>