<template>
	<view class="gt_content">
		<view class="content">
			<template v-if="list.length">
				<view class="card" v-for="item in list" :key="item.id" @click="onSelect(item)">
					<view class="card_left" :style="{backgroundImage:
					  `url(${gtCommon.getOssImg(item.selected ?'sansong/selected.png' : 'sansong/unSelected.png')})`}"></view>
					<view class="card_right">
						<view class="card_title">{{ item.line_name }}</view>
						<view class="card_num">{{ item.money }}元</view>
					</view>
				</view>
			</template>
			<view class="con_empty" v-else>
				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view>
		</view>
		<view class="footer">
			<text class="msg">tips：退还押金需经过平台审核通过后进行退还，具体到账时间以页面显示为准</text>
			<view class="btns">
				<view class="selectAll" @click="selectedAllFn" :style="{backgroundImage:
				  `url(${gtCommon.getOssImg(selectedAll ?'sansong/selected.png' : 'sansong/unSelected.png')})`}"></view>
				<view class="selectAll_name" @click="selectedAllFn">全部</view>
				<u-button type='primary' class="btn" @click="applyReturn" :disabled="_disabled">申请退还</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				selectedAll: false
			}
		},
		onLoad() {
			let gt = this
			gt.getList()
		},
		computed: {
			_disabled() {
				let gt = this
				return gt.list.every(item=> !item.selected)
			}
		},
		methods: {
			getList() {
				let gt = this
				gt.gtRequest.post('/logistics/Specialline/deposit_list', {
					page: 1,
					limit: 999,
					refund_status: '0,4'
				}).then(res => {
					res.list.map(item=> {
						item.selected = false
					})
					gt.list = res.list
				})
			},
			onSelect(item) {
				let gt = this
				item.selected = !item.selected
				gt.list = [...gt.list]
			},
			selectedAllFn() {
				let gt = this
				gt.selectedAll = !gt.selectedAll
				gt.list.map(item=> {
					return item.selected = gt.selectedAll
				})
			},
			applyReturn() {
				let gt = this
				let ids = []
				gt.list.forEach(item=> {
					if(item.selected) ids.push(item.id)
				})
				gt.gtRequest.post('/logistics/Specialline/refund_deposit_order', {
					order_ids: ids.join(',')
				}).then(res => {
					uni.redirectTo({
						url: './applySuccess?status=1'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			font-family: PingFangSC-Medium, PingFang SC;
			.content {
				height: calc(100vh - 228rpx);
				overflow: auto;
			}
			.card {
				background-color: #fff;
				border-radius: 16rpx;
				display: flex;
				align-items: center;
				margin: 20rpx 16rpx 0;
				padding: 16rpx 20rpx;
				.card_left {
					width: 32rpx;
					height: 32rpx;
					background-size: cover;
					margin-right: 20rpx;
				}
			}
			.footer {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 220rpx;
				padding: 20rpx 16rpx;
				background-color: #fff;
				.msg {
					display: block;
					color: #909399;
					margin-bottom: 20rpx;
				}
				.btns {
					display: flex;
					// justify-content: space-between;
					align-items: center;
					.selectAll {
						width: 32rpx;
						height: 32rpx;
						background-size: cover;
					}
					.selectAll_name {
						margin: 0 16rpx;
					}
					.btn {
						width: calc(100% - 120rpx);
					}
				}
			}
		}
	}
</style>