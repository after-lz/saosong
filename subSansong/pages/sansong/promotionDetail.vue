<template>
	<view class="gt_content">
		<scroll-view scroll-y @scrolltolower="loadingMore">
			<template v-if="list.length">
				<view class="card" v-for="item in list" :key="item.id">
					<view class="card_type" :style="{backgroundImage: `url(${item.promote_type === '1' || item.promote_type === '2'
					 || item.promote_type === '3' ? gold_type : silver_type})`}"></view>
					<view class="card_content">
						<view class="row">
							<view class="time">{{ gtCommon.formateTime(item.end_time, 'YYYY-MM-DD HH:mm:ss') }}</view>
							<view class="status">交易成功</view>
						</view>
						<view class="row">
							<view class="address">{{ item.line_name + `(${judgeType(item.promote_type)})` }}</view>
							<view class="payType">{{ judgeMethod(item.pay_method) }}</view>
						</view>
						<view class="row">
							<view class="orderNum">缴纳单号：{{ item.order_sn }}</view>
							<view class="payNum">实付金额：<text class="num">￥{{ item.money }}</text> </view>
						</view>
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
				gold_type: this.gtCommon.getOssImg('sansong/gold_type.png'),
				silver_type: this.gtCommon.getOssImg('sansong/silver_type.png'),
				list: [],
				status: 'loading',
				params: {
					page: 1,
					limit: 10
				}
			}
		},
		onLoad() {
			let gt = this
			gt.getList()
		},
		methods: {
			getList() {
				let gt = this
				gt.gtRequest.post('/logistics/Specialline/promote_list', gt.params).then(res => {
					gt.list = [...gt.list, ...res.list]
					gt.status = gt.params.page >= res.total_page ? 'nomore' : 'loading'
				})
			},
			loadingMore() {
				let gt = this
				if(gt.status === 'nomore') return
				++gt.params.page
				gt.getList()
			},
			judgeType(type) {
				let str = ''
				switch (type){
					case '1':
						str = '金卡-年卡'
						break;
					case '2':
						str = '金卡-半年卡'
						break;
					case '3':
						str = '金卡-季卡'
						break;
					case '6':
						str = '银卡-年卡'
						break;
					case '7':
						str = '银卡-半年卡'
						break;
					case '8':
						str = '银卡-季卡'
						break;
					default:
						break;
				}
				return str
			},
			judgeMethod(type) {
				let str = ''
				switch (type){
					case '1':
						str = '余额'
						break;
					case '2':
						str = '微信小程序'
						break;
					case '3':
						str = '微信app'
						break;
					default:
						break;
				}
				return str
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			font-family: PingFangSC-Medium, PingFang SC;
			.card {
				position: relative;
				height: 172rpx;
				margin: 30rpx 28rpx 0;
				padding: 20rpx 30rpx;
				background-color: #fff;
				border-radius: 16rpx;
				.card_type {
					position: absolute;
					left: 0;
					top: 14rpx;
					width: 8rpx;
					height: 144rpx;
					background-size: cover;
					background-repeat: no-repeat;
				}
				.card_content {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.row {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.time {
							color: #777777;
							font-size: 24rpx;
						}
						.status {
							color: #00B98E;
						}
						.address {
							color: #000000;
							font-size: 32rpx;
						}
						.payType {
							color: #000000;
						}
						.orderNum {
							color: #777777;
							font-size: 24rpx;
						}
						.payNum {
							color: #000000;
							.num {
								font-size: 32rpx;
							}
						}
					}
				}
			}
			.u-more {
				margin: 36rpx 0;
			}
		}
	}
</style>