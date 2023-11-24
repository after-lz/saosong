<template>
	 <mescroll-uni @init="mescrollInit" :height="height" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<view class="card">
			<view class="card_title">
				<view class="title_left">
					<view class="label">已收款：￥</view>
					<view class="label_info">{{ jiesuan_money }}</view>
				</view>
				<view class="title_right" @click="show = true">
					<text>{{ year }}-{{ month }}</text>
					<u-icon name="arrow-right" color="#AAAAAA" size="20"></u-icon>
				</view>
			</view>
			<view class="card_content">
				<view class="item" v-for="(item, index) in goods" :key="index">
					<view class="item_left">
						<u-avatar :src="item.headerpic" size='80'></u-avatar>
						<view class="item_info">
							<view class="info_name">{{item.nickname}}</view>
							<view class="info_time">{{gtCommon.formateTime(item.time, 'YYYY-MM-DD HH:mm:ss')}}</view>
						</view>
					</view>
					<view class="item_right">
						<view class="item_status" v-if="item.pay_method == 1">平台打款</view>
						<view class="item_status" v-if="item.pay_method == 2">现金付款</view>
						<view class="item_type">
							<view class="item_paytype" v-if="item.pay_method == 1">现付</view>
							<view class="item_paytype1" v-if="item.pay_method == 2">到付</view>
							<view class="item_num">￥{{item.pay_to_logistics_money}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-picker v-model="show" mode="time" :params="param" @confirm="confirm"
				:end-year='endYear' :end-month='endMonth' :default-time='defaultTime'></u-picker>
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		props:{
			i: Number,
			height: [Number, String]
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
						size: 15 // 每页数据的数量
					},
					noMoreSize: 12, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
						btnText: ''
					}
				},
				goods: [], //列表数据
				jiesuan_money: 0,
				params: {
					jiesuan_status: 1,
					stime: '',
					etime: '',
					page: 1,
					limit: 15
				},
				show: false,
				year: '',
				month: '',
				endYear: '',
				endMonth: '',
				param: {
					year: true,
					month: true
				},
				date: new Date(),
				lastDay: '',
			}
		},
		computed: {
			defaultTime() {
				let gt = this
				if(!gt.year || !gt.month) {
					let year = gt.date.getFullYear()
					let month = gt.date.getMonth() + 1
					return year + '-' + month + '-01 00:00:00'
				} else {
					return gt.year + '-' + gt.month + '-01 00:00:00'
				}
			}
		},
		mounted() {
			let gt = this
			gt.year = gt.date.getFullYear()
			gt.endYear = gt.year
			gt.month = gt.date.getMonth() + 1
			gt.endMonth = gt.month
			let firstDay = +new Date(gt.date.getFullYear(), gt.date.getMonth(), 1) / 1000
			let nextMonth = new Date(gt.date.getFullYear(), gt.date.getMonth() + 1, 1)
			gt.lastDay = +new Date(nextMonth.getTime() - 1000 * 60 * 60 * 24) / 1000
			gt.lastDay = gt.lastDay > ((+new Date()) / 1000) ? (+new Date()) / 1000 : gt.lastDay
			gt.params.stime = firstDay
			gt.params.etime = gt.lastDay
			gt.downCallback()
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let gt = this
				if(!gt.params.stime || !gt.params.etime) return
				gt.params.page = page.num
				gt.params.limit = page.size
				gt.params.jiesuan_status = gt.i ? 0 : 1
				gt.gtRequest.post('/logistics/User/my_income_list', gt.params).then(res => {
					if(page.num == 1) gt.goods = []
					gt.jiesuan_money = res.jiesuan_money
					gt.goods = gt.goods.concat(res.list)
					gt.mescroll.endSuccess(res.list.length)
				}).catch(()=>{
					gt.mescroll.endErr()
				})
			},
			confirm(e) {
				let gt = this
				gt.year = e.year
				gt.month = e.month
				let firstDay = +new Date(gt.year, gt.month - 1, 1) / 1000
				let nextMonth = new Date(gt.year, gt.month, 1)
				gt.lastDay = +new Date(nextMonth.getTime() - 1000 * 60 * 60 * 24) / 1000
				gt.lastDay = gt.lastDay > ((+new Date()) / 1000) ? (+new Date()) / 1000 : gt.lastDay
				gt.params.stime = firstDay
				gt.params.etime = gt.lastDay
				gt.downCallback()
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.card {
			border-radius: 16rpx;
			background-color: #fff;
			padding: 30rpx;
			margin: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			.card_title {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				padding: 0 0 16rpx;
				border-bottom: 1rpx solid #e9e9e9;
				.title_left {
					display: flex;
					align-items: flex-end;
					.label {
						
					}
					.label_info {
						font-size: 32rpx;
						font-weight: 700;
						margin-left: 10rpx;
					}
				}
				.title_right {
					height: 40rpx;
					border: 1rpx solid #cacaca;
					font-size: 24rpx;
					display: flex;
					align-items: center;
					padding: 0 10rpx;
					border-radius: 10rpx;
				}
			}
			.card_content {
				.item {
					height: 140rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid #e9e9e9;
					&:nth-last-child(1) {
						border-bottom: 0;
					}
					.item_left {
						display: flex;
						align-items: center;
						.item_info {
							margin-left: 12rpx;
							.info_name {
								color: #000;
								font-weight: 500;
								margin-bottom: 10rpx;
							}
							.info_time {
								color: #777777;
								font-size: 24rpx;
							}
						}
					}
					.item_right {
						.item_status {
							text-align: right;
							margin-bottom: 10rpx;
						}
						.item_type {
							display: flex;
							.item_paytype,
							.item_paytype1 {
								height: 40rpx;
								line-height: 40rpx;
								color: #fff;
								font-size: 24rpx;
								padding: 0 10rpx;
								background-color: #4A5FF4;
								margin-right: 10rpx;
								border-radius: 10rpx;
							}
							.item_paytype1 {
								background-color: #FFBF2D;
							}
							.item_num {
								font-size: 34rpx;
								font-weight: 700;
							}
						}
					}
				}
			}
		}
	}
</style>