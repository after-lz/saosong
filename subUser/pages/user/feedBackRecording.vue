<template>
	<view class="gt_content">
		<scroll-view scroll-y @scrolltolower="loadMore" style="height: 100vh;">
			<template v-if="list.length">
				<view class="card" v-for="item in list" :key="item.id">
					<view class="title">{{ item.type }}</view>
					<text class="msg">{{ item.content }}</text>
					<view class="imgs" @click="previewImgs(item.urls)">
						<view v-for="s in item.urls" :key="s" class="img" :style="{backgroundImage: `url(${s})`}"></view>
					</view>
					<text class="time">{{ gtCommon.formateTime(item.create_time, 'YYYY-MM-DD HH:mm') }}</text>
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
				list: [],
				params: {},
				status: 'loading'
			}
		},
		onLoad() {
			let gt = this
			gt.params = {
				platform: 'logistics',
				page: 1,
				limit: 10
			}
			gt.getData()
		},
		methods: {
			getData() {
				let gt = this
				gt.gtRequest.post('/api/applogin/get_advice_list', gt.params).then(res => {
					res.list.forEach(item=> {
						item.urls = item.imgs ? item.imgs.split(',') : [] 
					})
					gt.list = [...gt.list, ...res.list]
					gt.status = gt.params.page >= res.total_page ? 'nomore' : 'loading'
				})
			},
			loadMore() {
				let gt = this
				if(gt.status === 'nomore') return
				++gt.params.page
				gt.getData()
			},
			previewImgs(urls) {
				uni.previewImage({
					urls
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			font-family: PingFangSC-Regular, PingFang SC;
			.card {
				padding: 32rpx 24rpx 24rpx;
				border-radius: 16rpx;
				background-color: #fff;
				margin: 20rpx 16rpx 0;
				.title {
					font-size: 32rpx;
					font-weight: 700;
					color: #000;
				}
				.msg {
					display: block;
					color: #909399;
					margin: 24rpx 0 16rpx 0;
				}
				.imgs {
					display: flex;
					.img {
						width: 160rpx;
						height: 160rpx;
						border-radius: 16rpx;
						margin-right: 24rpx;
						background-size: cover;
						background-repeat: no-repeat;
					}
				}
				.time {
					display: block;
					color: #909399;
					font-size: 24rpx;
					margin-top: 32rpx;
				}
			}
			.u-more {
				margin: 36rpx 0;
			}
		}
	}
</style>