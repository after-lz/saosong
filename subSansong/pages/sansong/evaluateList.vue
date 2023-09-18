<template>
	<view class="evaluateList">
		<view class="head">
			<view class="grade_card">
				<view class="grade_card_left">
					<view class="grade">{{ data.grade_score }}</view>
					<view class="level">{{ computedLevel() }}</view>
				</view>
				<view class="grade_card_right">
					<view class="circle_progres" v-for="(item, index) in list" :key="index">
						<u-circle-progress active-color="#FA3534" inactive-color='#fff' bg-color="#FFDFE0"
							width="80" border-width="8" :percent="item.progres">
							<view class="circle_progres_msg">{{ item.num }}</view>
						</u-circle-progress>
						<view class="circle_msg">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tabs">
			<u-tabs :list="tabs" :is-scroll="false" :current="tabIndex" @change="change" bar-width="138"></u-tabs>
		</view>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab, i) in tabs" :key="i">
				<comments ref="mescrollItem" :i="i" :index="tabIndex" :height="height"></comments>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import comments from './comments'
	export default {
		components: { comments },
		data() {
			return {
				data: {},
				list: [],
				tabIndex: 0, // 当前tab的下标
				height: '',
				tabs: [
					{name: '全部'},
					{name: '好评'},
					{name: '中评'},
					{name: '差评'}
				],
			}
		},
		mounted() {
			let gt = this
			gt.height = uni.getSystemInfoSync().windowHeight - 41 - 117 + 'px'
			gt.data = uni.getStorageSync('companyInfo')
			gt.data.grade_score = parseFloat(gt.data.grade_score).toFixed(1)
			gt.computdProgres()
		},
		methods: {
			computdProgres() {
				let gt = this
				gt.list = [
					{
						name: '服务态度',
						num: parseFloat(gt.data.service).toFixed(1),
						progres: (parseFloat(gt.data.service) / 5).toFixed(2) * 100
					},
					{
						name: '运单质量',
						num: parseFloat(gt.data.waybill).toFixed(1),
						progres: (parseFloat(gt.data.waybill) / 5).toFixed(2) * 100
					},
					{
						name: '运输时效',
						num: parseFloat(gt.data.transport).toFixed(1),
						progres: (parseFloat(gt.data.transport) / 5).toFixed(2) * 100
					},
					{
						name: '回单时效',
						num: parseFloat(gt.data.receipt).toFixed(1),
						progres: (parseFloat(gt.data.receipt) / 5).toFixed(2) * 100
					}
				]
			},
			computedLevel() {
				let gt = this
				let score = gt.data.grade_score
				let str = ''
				if(score <= 1) str = "极差"
				if(score > 1 && score <= 2) str = "差"
				if(score > 2 && score <= 3) str = "一般"
				if(score > 3 && score <= 4) str ="好"
				if(score > 4) str = "很好"
				return str
			},
			change(index) {
				this.tabIndex = index
			},
			swiperChange(e){
				this.tabIndex = e.detail.current
			}
		}
	}
</script>

<style lang="scss">
	.evaluateList {
		background: $gtBackgroundColor;
		.head {
			background-color: #fff;
			margin-top: 20rpx;
			padding: 24rpx 44rpx;
			.grade_card {
				height: 160rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-radius: 16rpx;
				background-color: #FFDFE0;
				padding: 24rpx;
				.grade_card_left {
					display: flex;
					align-items: flex-end;
					color: #FF6067;
					.grade {
						font-size: 64rpx;
					}
					.level {
						margin-left: 8rpx;
					}
				}
				.grade_card_right {
					height: 100%;
					display: flex;
					.circle_progres {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						margin-left: 24rpx;
						.circle_progres_msg {
							font-size: 24rpx;
							color: #FF6067;
						}
						.circle_msg {
							color: #909399;
							font-size: 20rpx;
						}
					}
				}
			}
		}
		.tabs {
			color: #909399;
		}
	}
</style>