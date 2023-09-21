<template>
	<mescroll-uni @init="mescrollInit" :height="height" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
		<view class="card" v-for="item in goods" :key="item.id">
			<view class="card_head">
				<view class="card_head_left">
					<u-avatar :src="item.cargo_info && item.cargo_info.headerpic" mode="circle" size="84"></u-avatar>
					<view class="name">{{ item.cargo_info.nickname }}</view>
				</view>
				<view class="card_head_right">
					<view class="">综合评价：</view>
					<view class="score">{{ item.average_score }}分</view>
				</view>
			</view>
			<view class="card_address" v-if="item.order_info">
				<view :class="item.order_info.order_type === 1 ? 'type' : 'type1'">
					{{ judgeType(item.order_info.order_type, item.order_info.deliver_type) }}
				</view>
				<view class="address">{{ item.order_info.pickup_city }}-{{ item.order_info.receive_city }}</view>
			</view>
			<view class="card_remark">
				<!-- <u-input v-model="item.content" auto-height disabled type="textarea" height='20' /> -->
				<text>{{ item.content }}</text>
			</view>
			<view class="card_imgs" v-if="item.imgList.length">
				<template v-if="item.imgList.length > 1">
					<view class="img" v-for="src in item.imgList" :key="src" :style="{backgroundImage: `url(${src})`}"
						@click="gtCommon.previewImgs(item.imgList, src)"></view>
				</template>
				<view class="oneImg" v-else>
					<u-image :src="item.imgList[0]" mode="widthFix" lazy-load @click="gtCommon.previewImg(item.imgList[0])"></u-image>
				</view>
			</view>
			<view class="card_footer">
				{{ gtCommon.judgeTime(item.create_time) }}评论
			</view>
		</view>
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		props:{
			i: Number,
			height: [Number, String],
			logistics_id: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
						btnText: ''
					}
				},
				goods: [], //列表数据
				params: {
					platform: 'logistics',
					page: 1,
					limit: 10,
					logistics_id: this.logistics_id,
					type: 0
				}
			}
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let gt = this
				gt.params.page = page.num
				gt.params.limit = page.size
				gt.params.type = gt.i
				gt.gtRequest.post('/api/applogin/get_comment_list', gt.params).then(res => {
					res.list.forEach(item=> {
						item.imgList = item.imgs ? item.imgs.split('||') : []
						if(item.average_score.length === 1) {
							item.average_score += '.0'
						} else if(item.average_score.length === 3) {
							item.average_score = item.average_score.slice(0, 3)
						}
					})
					if(page.num == 1) gt.goods = []
					gt.goods = gt.goods.concat(res.list)
					gt.mescroll.endSuccess(res.list.length)
				}).catch(()=>{
					gt.mescroll.endErr()
				})
			},
			judgeType(order_type, deliver_type) {
				let gt = this
				let order_str = ''
				let deliver_str = ''
				switch (order_type) {
					case 1:
						order_str = '指派'
						break;
					case 2:
						order_str = '极速'
						break;
					default:
						break;
				}
				switch (deliver_type) {
					case 1:
						deliver_str = '普运'
						break;
					case 2:
						deliver_str = '快运'
						break;
					case 3:
						deliver_str = '议价'
						break;
					default:
						break;
				}
				return order_str + deliver_str
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.card {
			background-color: #fff;
			border-radius: 16rpx;
			margin: 20rpx 16rpx 0;
			padding: 32rpx 24rpx;
			.card_head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.card_head_left {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.name {
						color: #000;
						font-size: 32rpx;
						margin-left: 16rpx;
					}
				}
				.card_head_right {
					display: flex;
					.score {
						color: #FF6067;
					}
				}
			}
			.card_address {
				display: flex;
				align-items: center;
				margin: 20rpx 0;
				.type {
					height: 40rpx;
					line-height: 40rpx;
					background-color: #485EF4;
					border-radius: 8rpx;
					padding: 0 12rpx;
					color: #fff;
					font-size: 24rpx;
				}
				.type1 {
					height: 40rpx;
					line-height: 40rpx;
					border-radius: 8rpx;
					padding: 0 12rpx;
					font-size: 24rpx;
					background-color: #FFBF27;
					color: #000;
				}
				.address {
					color: #000;
					margin-left: 24rpx;
				}
			}
			.card_remark {
				color: #909399;
			}
			.card_imgs {
				display: flex;
				margin: 20rpx 0;
				.img {
					width: 152rpx;
					height: 152rpx;
					border-radius: 8rpx;
					margin-right: 20rpx;
					background-size: cover;
					background-repeat: no-repeat;
					&:nth-last-child(1) {
						margin-right: 0;
					}
				}
				.oneImg {
					width: 320rpx;
				}
			}
			.card_footer {
				color: #909399;
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>