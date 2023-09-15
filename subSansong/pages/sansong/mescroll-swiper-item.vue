<template>
	 <mescroll-uni @init="mescrollInit" :height="height" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<view class="card" v-for="item in goods" :key="item.id">
			<view class="card_title">
				<view class="card_title_left">
					<template v-if="item.status === '7'">
						<view class="card_title_icon" :style="{backgroundImage: `url(${gtCommon.getOssImg('sansong/order_status2.png')})`}"></view>
						<view class="card_title_status">已处理</view>
					</template>
					<template v-else-if="item.status === '9'">
						<view class="card_title_icon" :style="{backgroundImage: `url(${gtCommon.getOssImg('sansong/order_status3.png')})`}"></view>
						<view class="card_title_status">已撤销</view>
					</template>
					<template v-else>
						<view class="card_title_icon" :style="{backgroundImage: `url(${gtCommon.getOssImg('sansong/order_status1.png')})`}"></view>
						<view class="card_title_status">{{ judgeStatus(item.status) }}</view>
					</template>
				</view>
				<view class="card_title_right">异常单号：{{ item.order_sn }}</view>
			</view>
			<view class="card_content">
				<view class="address">
					<view class="address_strat">{{ item.deliver_info.pickup_city }}</view>
					<view class="address_line" :style="{backgroundImage: `url(${gtCommon.getOssImg('sansong/line.png')})`}"></view>
					<view class="address_icon" :style="{backgroundImage: `url(${gtCommon.getOssImg('sansong/order_car.png')})`}"></view>
					<view class="address_line" :style="{backgroundImage: `url(${gtCommon.getOssImg('sansong/line.png')})`}"></view>
					<view class="address_end">{{ item.deliver_info.receive_city }}</view>
				</view>
				<view class="row">
					货物信息：{{item.deliver_info.goods_name}}/{{item.deliver_info.goods_number}}件/
					{{parseFloat(item.deliver_info.goods_weight)}}吨/{{parseFloat(item.deliver_info.goods_volume)}}方
				</view>
				<view class="row">投诉类型：{{ item.type }}</view>
				<view class="row">投诉时间：{{ gtCommon.formateTime(item.create_time, 'YYYY-MM-DD HH:mm') }}</view>
				<view class="row">
					<view class="">客户电话：{{ item.cargo_info.mobile }}</view>
					<view class="phone" :style="{backgroundImage: `url(${gtCommon.getOssImg('sansong/Vector.png')})`}"
						 @click="gtCommon.callMobile(item.cargo_info.mobile)"></view>
				</view>
			</view>
			<view class="card_btns">
				<view class="btn" v-if="item.status === '1'" @click="goNext(item)">去处理</view>
				<view class="btn1" v-else @click="goDetail(item)">查看详情</view>
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
					statuss: '1,2,3,5',
					page: 1,
					limit: 10
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
				if(gt.i === 0) gt.params.statuss = '1,2,3,5'
				if(gt.i === 1) gt.params.statuss = '7'
				if(gt.i === 2) gt.params.statuss = '9'
				gt.gtRequest.post('/logistics/Abnormal/get_abnormal_list', gt.params).then(res => {
					if(page.num == 1) gt.goods = []
					gt.goods = gt.goods.concat(res.list)
					gt.mescroll.endSuccess(res.list.length)
				}).catch(()=>{
					gt.mescroll.endErr()
				})
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			},
			goDetail(record) {
				uni.navigateTo({
					url: "./abnormalBillDetail?id=" + record.id
				})
			},
			goNext(record) {
				uni.navigateTo({
					url: "./abnormalBillDispose?record=" + encodeURIComponent(JSON.stringify(record))
				})
			},
			judgeStatus(type) {
				let str = ''
				switch (type) {
					case '1':
						str = '待处理'
						break;
					case '2':
						str = '处理中'
						break;
					case '3':
						str = '已驳回'
						break;
					case '5':
						str = '已同意'
						break;
					case '7':
						str = '已处理'
						break;
					case '9':
						str = '已撤销'
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
		// .gt_content {
			.card {
				height: 560rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin: 31rpx 28rpx 0;
				padding: 30rpx;
				background-color: #fff;
				border-radius: 16rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				.card_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.card_title_left {
						display: flex;
						align-items: center;
						.card_title_icon {
							width: 34rpx;
							height: 34rpx;
							background-size: cover;
							background-repeat: no-repeat;
							margin-right: 10rpx;
						}
						.card_title_status {
							color: #000000;
							font-weight: 700;
						}
					}
					.card_title_right {
						font-size: 24rpx;
					}
				}
				.card_content {
					height: 345rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					background-color: #F6F7FF;
					border-radius: 16rpx;
					padding: 30rpx 25rpx;
					.address {
						display: flex;
						align-items: center;
						justify-content: center;
						.address_strat,
						.address_end {
							width: calc((100% - 48rpx - 88rpx - 108rpx) / 2);
							font-size: 30rpx;
							color: #000000;
							font-weight: 700;
							text-align: center;
						}
						.address_icon {
							width: 48rpx;
							height: 31rpx;
							background-size: cover;
							background-repeat: no-repeat;
						}
						.address_line {
							width: 44rpx;
							height: 2rpx;
							background-size: cover;
							background-repeat: no-repeat;
							margin: 0 27rpx;
						}
					}
					.row {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						.phone {
							width: 34rpx;
							height: 34rpx;
							margin-left: 15rpx;
							background-size: cover;
							background-repeat: no-repeat;
						}
					}
				}
				.card_btns {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.btn {
						width: 178rpx;
						height: 59rpx;
						text-align: center;
						line-height: 59rpx;
						color: #FFFFFF;
						border-radius: 10rpx;
						background-color: $gtProjectColor;
					}
					.btn1 {
						width: 178rpx;
						height: 59rpx;
						text-align: center;
						line-height: 59rpx;
						color: #495EF4;
						border-radius: 10rpx;
						background-color: #D9DDFF;
						border: 2rpx solid #495EF4;
					}
				}
			}
		// }
	}
</style>