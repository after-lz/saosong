<template>
	<view class="gt_content">
		<view>
			<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper :style="{height: height}" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<view class="orderProgress">
					<view class="card">
						<template v-if="record.status === '2'">
							<u-icon name="clock-fill" color="#485EF4" size="150"></u-icon>
							<view class="card_status">等待客户处理结果</view>
						</template>
						<template v-if="record.status === '3'">
							<u-icon name="error-circle-fill" color="#F04646" size="150"></u-icon>
							<view class="card_status">客户驳回处理结果</view>
							<view class="btn" style="background-color: #495EF4" @click="goNext">去处理</view>
						</template>
						<template v-if="record.status === '5'">
							<u-icon name="more-circle-fill" color="#FFBB55" size="150"></u-icon>
							<view class="card_status">客户已同意赔偿</view>
							<view class="btn" style="background-color: #00AA3A" @click="goPayment">立即支付</view>
						</template>
						<template v-if="record.status === '7'">
							<u-icon name="checkmark-circle-fill" color="#485EF4" size="150"></u-icon>
							<view class="card_status">客户投诉已处理</view>
						</template>
						<template v-if="record.status === '9'">
							<u-icon name="close-circle-fill" color="#D6D6D6" size="150"></u-icon>
							<view class="card_status">客户投诉已撤销</view>
						</template>
					</view>
					<view class="options">
						<view class="option" v-for="(item, index) in list" :key="item.handle_time">
							<view class="option_left">
								<view class="circle">
									<view class="circle_circle"></view>
								</view>
								<view class="line" v-if="index !== (list.length-1)">
									<u-line class="u-line" direction='col'></u-line>
								</view>
							</view>
							<view class="option_right">
								<view class="row">
									<view class="row_left">
										<view class="row_label">处理人：</view>
										<view class="row_value">{{ item.handle_people }}</view>
									</view>
									<view class="row_right">
										{{ gtCommon.formateTime(item.handle_time, 'YYYY-MM-DD HH:mm') }}
									</view>
								</view>
								<view class="row">
									<view class="row_left">
										<view class="row_label">赔偿金额：</view>
										<view class="row_value">{{ item.handle_money }}元</view>
									</view>
									<view class="row_right statusName">
										<text v-if="item.status === '3'" style="color: #D9001B">驳回</text>
										<text v-else-if="item.status === '5' || item.status === '7'" style="color: #00AA3A">同意</text>
									</view>
								</view>
								<view class="row">
									<view class="row_left row_textarea">
										<view class="row_label">处理内容：</view>
										<view class="row_value">
											<text>{{ item.handle_content }}</text>
										</view>
									</view>
								</view>
								<view class="imgs">
									<view class="img" v-for="src in item.imgs" :key="src" :style="{backgroundImage: `url(${src})`}"
											@click="gtCommon.previewImgs(item.imgs, src)"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view style="height: 100%; overflow: auto;">
					<abnormal-bill-base-detail :record='record' :imgs='imgs'></abnormal-bill-base-detail>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import AbnormalBillBaseDetail from './abnormalBillBaseDetail'
	export default {
		components: { AbnormalBillBaseDetail },
		data() {
			return {
				id: '',
				record: {},
				imgs: [],
				tabs: [
					{name: '处理进度'},
					{name: '订单详情'}
				],
				height: '',
				current: 0,
				swiperCurrent: 0,
				list: []
			}
		},
		onLoad(option) {
			let gt = this
			gt.id = option.id
			gt.height = uni.getSystemInfoSync().windowHeight - 41 + 'px'
		},
		onShow() {
			let gt = this
			gt.getData()
		},
		methods: {
			getData() {
				let gt = this
				gt.gtRequest.post('/logistics/Abnormal/get_abnormal_info', {
					id: gt.id
				}).then(res => {
					gt.record = res
					gt.imgs = gt.record.imgs ? gt.record.imgs.split('||') : []
					gt.list = JSON.parse(gt.record.handle_log)
					gt.list.forEach((item, index)=> {
						item.imgs = item.handle_imgs ? item.handle_imgs.split(',') : []
						if(index === 0) {
							item.status = gt.record.status
						} else {
							item.status = '3'
						}
					})
				})
			},
			tabsChange(index) {
				let gt = this
				gt.swiperCurrent = index
			},
			transition(e) {
				let gt = this
				let dx = e.detail.dx
				gt.$refs.uTabs.setDx(dx)
			},
			animationfinish(e) {
				let gt = this
				let current = e.detail.current
				gt.$refs.uTabs.setFinishCurrent(current)
				gt.swiperCurrent = current
				gt.current = current
			},
			goNext() {
				let gt = this
				uni.navigateTo({
					url: "./abnormalBillDispose?record=" + encodeURIComponent(JSON.stringify(gt.record))
				})
			},
			goPayment() {
				let gt = this
				uni.navigateTo({
					url: "./settleAccounts?type=5" + "&num=" + gt.record.handle_money + '&order_id=' + gt.record.id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.orderProgress {
				height: 100%;
				overflow: auto;
				font-family: PingFangSC-Medium, PingFang SC;
				color: #000;
				.card {
					height: 338rpx;
					background-color: #fff;
					border-radius: 16rpx;
					margin: 30rpx 28rpx 0;
					padding: 30rpx 0 20rpx 0;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: wrap;
					.card_status {
						width: 100%;
						font-weight: 700;
						margin: 20rpx 0;
						text-align: center;
					}
					.btn {
						width: 178rpx;
						height: 59rpx;
						text-align: center;
						line-height: 59rpx;
						color: #FFFFFF;
						border-radius: 10rpx;
					}
				}
				.options {
					margin: 30rpx 28rpx 0;
					.option {
						display: flex;
						.option_left {
							width: 42rpx;
							display: flex;
							justify-content: center;
							flex-wrap: wrap;
							.circle {
								width: 100%;
								height: 42rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								border-radius: 50%;
								background-color: #D9DDFF;
								.circle_circle {
									width: 22rpx;
									height: 22rpx;
									border-radius: 50%;
									background-color: #495EF4;
								}
							}
							.line {
								height: calc(100% - 42rpx);
							}
						}
						.option_right {
							width: calc(100% - 42rpx);
							// min-height: 212rpx;
							// max-height: 352rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							background-color: #fff;
							border-radius: 16rpx;
							padding: 30rpx 25rpx 20rpx;
							margin-left: 20rpx;
							margin-bottom: 30rpx;
							.row {
								display: flex;
								justify-content: space-between;
								align-items: center;
								margin-bottom: 20rpx;
								.row_left {
									display: flex;
									align-items: center;
									.row_label {
										color: #777777;
										margin-right: 10rpx;
										white-space: nowrap;
									}
									.row_value {
										width: 100%;
									}
								}
								.row_right {
									color: #777777;
									font-size: 24rpx;
								}
								.statusName {
									font-size: 30rpx;
									font-weight: 500;
								}
								.row_textarea {
									align-items: flex-start;
								}
							}
							.imgs {
								display: flex;
								align-items: center;
								.img {
									width: 134rpx;
									height: 134rpx;
									background-size: cover;
									background-repeat: no-repeat;
									border-radius: 14rpx;
									margin-right: 20rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>