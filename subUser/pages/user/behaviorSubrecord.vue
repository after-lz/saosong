<template>
	<view class="gt_content">
		<view class="con_empty" v-if="dataList.length == 0">
			<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
				margin-top="200" font-size="32"></u-empty>
		</view>
		<view class="con_scroll">
			<view class="scroll_time" @click="show = true">
				<view class="scroll_time_name">{{ year + '年' + month + '月' }}</view>
				<view :animation="animationData">
					<u-icon name="arrow-down-fill" size="28"></u-icon>
				</view>
			</view>
			<scroll-view class="scroll_view" scroll-y="true" @scrolltolower="loadMore">
				<view class="con_item" v-for="(item, index) in dataList" :key="index">
					<view class="con_title_num">
						<view class="con_title">
							<text>{{item.remark}}</text>
						</view>
						<view class="con_num">
							<text v-if="item.number > 0">+{{item.number}}</text>
							<text v-else>{{item.number}}</text>
						</view>
					</view>
					<view class="con_time">
						<text>{{gtCommon.formateTime(item.create_time, 'YYYY-MM-DD HH:mm:SS')}}</text>
					</view>
				</view>
				<u-loadmore :status="status" />	
			</scroll-view>
		</view>
		<u-picker v-model="show" mode="time" :params="options" @confirm="confirm"
				:end-year='endYear' :end-month='endMonth' :default-time='defaultTime'></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[],
				params: {},
				status: 'loading',
				show: false,
				year: '',
				month: '',
				date: new Date(),
				options: {
					year: true,
					month: true
				},
				endYear: '',
				endMonth: '',
				lastDay: '',
				animation: '',
				animationData: {}
			}
		},
		onLoad() {
			let gt = this
			gt.animation = uni.createAnimation({
				duration: 200
			})
			gt.getNowDate()
			gt.params = {
				page: 1,
				limit: 10,
				wallet_type: 'money03',
				data_type:1
			}
			gt.getList()
		},
		watch: {
			show(e) {
				let gt = this
				let rota = e ? -180 : 0
				gt.animation.rotate(rota).step()
				gt.animationData = gt.animation.export()
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
		methods: {
			getList() {
				let gt = this
				gt.gtRequest.post("/logistics/companywallet/get_wallet_log", gt.params).then(res=>{
					gt.dataList = gt.dataList.concat(res.list)
					gt.status = gt.params.page >= res.total_page ? 'nomore' : 'loading'
				})
			},
			loadMore() {
				let gt = this
				if(gt.status === 'nomore') return
				++gt.params.page
				gt.getList()
			},
			getNowDate() {
				let gt = this
				gt.year = gt.date.getFullYear()
				gt.endYear = gt.year
				gt.month = gt.date.getMonth() + 1
				gt.endMonth = gt.month
				let firstDay = +new Date(gt.date.getFullYear(), gt.date.getMonth(), 1) / 1000
				let nextMonth = new Date(gt.date.getFullYear(), gt.date.getMonth() + 1, 1)
				gt.lastDay = +new Date(nextMonth.getTime() - 1000 * 60 * 60 * 24) / 1000
				gt.lastDay = gt.lastDay > ((+new Date()) / 1000) ? (+new Date()) / 1000 : gt.lastDay
				// gt.getData(firstDay, gt.lastDay)
				console.log(firstDay, gt.lastDay)
			},
			confirm(e) {
				let gt = this
				gt.year = e.year
				gt.month = e.month
				let firstDay = +new Date(gt.year, gt.month - 1, 1) / 1000
				let nextMonth = new Date(gt.year, gt.month, 1)
				gt.lastDay = +new Date(nextMonth.getTime() - 1000 * 60 * 60 * 24) / 1000
				gt.lastDay = gt.lastDay > ((+new Date()) / 1000) ? (+new Date()) / 1000 : gt.lastDay
				// gt.getData(firstDay, gt.lastDay)
				console.log(firstDay, gt.lastDay)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $gtBackgroundColor;
		.gt_content{
			.con_empty{
				text-align: center;
			}
			.con_scroll{
				.scroll_time{
					display: flex;
					align-items: center;
					margin: 16rpx 24rpx 0;
					.scroll_time_name {
						font-size: 36rpx;
						margin-right: 10rpx;
					}
					@keyframes rotate {
						from {
							transform: rotate(0deg);
						}
						to {
							transform: rotate(180deg);
						}
					}
					.icon {
						transition: rotate 1s;
					}
				}
				.scroll_view{
					height: 97vh;
					.con_item{
						padding: 32rpx 0;
						margin: 0 24rpx;
						border-bottom: 1rpx solid #E7E8E9;
						.con_title_num{
							display: flex;
							justify-content: space-between;
							.con_title{
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
							}
							.con_num{
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
							}
						}
						.con_time{
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 34rpx;
							margin-top: 8rpx;
						}
					}
				}
			}
			.u-more {
				margin: 36rpx 0;
			}
			.u-column-item {
				.u-text {
					width: 0;
				}
			}
		}
	}
</style>