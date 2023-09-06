<template>
	<view class="gt_content">
		<view class="card_bg"></view>
		<view class="card_bg1"></view>
		<view class="more">
			<u-dropdown>
				<u-dropdown-item title="更多操作" :options="options" @change='changeMore'></u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="title">
			<text>升级品质专线</text>
		</view>
		<view class="title1">
			<text>无限制接单抢单</text>
		</view>
		<view class="card">
			<view class="card_type">
				<view class="type_item" @click="changeType(1)" :class="active === 1 ? 'active' : ''" v-if="list.length">
					<view class="type_item_title">专线押金</view>
					<view class="type_item_num">{{ data.lineDeposit }}元</view>
					<view class="type_item_msg">指定专线专项押金</view>
				</view>
				<view class="type_item" @click="changeType(-1)" :class="active === -1 ? 'active' : ''">
					<view class="type_item_title">全线押金</view>
					<view class="type_item_num">{{ data.companyDeposit }}元</view>
					<view class="type_item_msg">指定专线专项押金</view>
				</view>
			</view>
			<view class="unUpdateLine" v-if="list.length">
				<view class="unUpdateLine_title">未升级专线</view>
				<view class="unUpdateLine_lines" v-if="active === 1">
					<view class="line" v-for="item in list" :key="item.line_id" @click="changeSelect(item)">
						<!-- <u-image :src="gtCommon.getOssImg(item.selected ? 'sansong/selected.png' : 'sansong/unSelected.png')"
								mode="widthFix" class="line_select"></u-image> -->
						<view class="line_select" :style="{backgroundImage:
						  `url(${gtCommon.getOssImg(item.selected ?'sansong/selected.png' : 'sansong/unSelected.png')})`}"></view>
						<text>{{ item.start_city }}</text>
						<text>——</text>
						<text>{{ item.end_city }}</text>
					</view>
				</view>
				<view class="unUpdateLine_lines" v-else>
					<view class="line">全部专线</view>
				</view>
			</view>
			<view class="unUpdateLine" v-if="list1.length">
				<view class="unUpdateLine_title">已升级专线</view>
				<view class="unUpdateLine_lines" v-if="active === 1">
					<view class="line" v-for="item in list1" :key="item.line_id">
						<text>{{ item.start_city }}</text>
						<text>——</text>
						<text>{{ item.end_city }}</text>
					</view>
				</view>
				<view class="unUpdateLine_lines" v-else>
					<view class="line">全部专线</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<text class="msg">充值押金升级品质专线，升级可无限制接单抢单</text>
			<u-button type="primary" v-if="list.length" @click="goTopup">
				<text>立即充值{{ num }}元</text>
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {},
				list: [],
				list1: [],
				active: 1,
				options: [
					{
						label: '申请退还',
						value: 1,
					},
					{
						label: '缴纳记录',
						value: 2,
					},
					{
						label: '押金说明',
						value: 3,
					}
				],
			}
		},
		onLoad() {
			let gt = this
			gt.getData()
		},
		computed: {
			num() {
				let gt = this
				let str = 0
				if(gt.active === 1) {
					gt.list.forEach(item=> {
						if(item.selected) str += gt.data.lineDeposit
					})
					return str
				} else {
					return gt.data.companyDeposit
				}
			}
		},
		methods: {
			getData() {
				let gt = this
				gt.gtRequest.post('/logistics/specialline/get_special_line_list', {
					page: 1,
					limit: 999,
					logistics_id: uni.getStorageSync('companyInfo').logistics_id
				}).then(res => {
					gt.list = res.list.filter(item=> item.deposit_status === '0')
					gt.list.map(item=> {
						return item.selected = false
					})
					gt.list1 = res.list.filter(item=> item.deposit_status === '1')
					if(!gt.list.length) gt.active = -1
				})
				gt.gtRequest.post('/logistics/Specialline/get_deposit_config_info').then(res => {
					gt.data = res
				})
			},
			changeType(type) {
				let gt = this
				gt.active = type
			},
			changeSelect(record) {
				let gt = this
				record.selected = !record.selected
				gt.list = [...this.list]
			},
			changeMore(e) {
				let gt = this
				switch (e) {
					case 1:
						uni.navigateTo({
							url: './applyReturn'
						})
						break;
					case 2:
						uni.navigateTo({
							url: './paymentRecord'
						})
						break;
					case 3:
						uni.navigateTo({
							url: './depositDescription?repositRemark=' + gt.data.repositRemark
						})
						break;
					default:
						break;
				}
			},
			goTopup() {
				let gt = this
				let ids = []
				if(gt.active === 1) {
					gt.list.forEach(item=> {
						if(item.selected) ids.push(item.line_id)
					})
				} else {
					ids = ['-1']
				}
				uni.navigateTo({
					url: "./settleAccounts?ids=" + ids.join(',') + '&num=' + gt.num
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $gtBackgroundColor;
		.gt_content {
			.card_bg {
				width: 100%;
				height: 500rpx;
				border-radius: 0 0 200rpx 200rpx;
				background-color: #9da9f4;
				position: absolute;
				top: 60rpx;  
			}
			.card_bg1 {
				width: 100%;
				height: 500rpx;
				border-radius: 0 0 240rpx 240rpx;
				background-color: #485EF4;
				position: absolute;    
			}
			.more {
				position: absolute;
				right: 16rpx;
				top: 0;
			}
			.title {
				color: #FFFFFF;
				font-size: 40rpx;
				font-weight: 500;
				position: absolute;
				right: 50%;
				top: 80rpx;
				transform: translate(50%, 0%);
				font-family: PingFangSC-Medium, PingFang SC;
			}
			.title1 {
				color: #FFFFFF;
				font-size: 48rpx;
				font-weight: 500;
				position: absolute;
				right: 50%;
				top: 144rpx;
				transform: translate(50%, 0%);
				font-family: PingFangSC-Medium, PingFang SC;
			}
			.card {
				width: calc(100% - 32rpx);
				// height: 526rpx;
				background-color: #fff;
				border-radius: 20rpx 20rpx 0 0;
				position: absolute;
				top: 290rpx;
				left: 16rpx;
				padding: 40rpx 32rpx;
				.card_type {
					display: flex;
					justify-content: space-between;
					&>view:nth-child(2) {
						margin-left: 42rpx;
					}
					.type_item {
						// width: 303rpx;
						width: 100%;
						height: 238rpx;
						border: 2rpx solid #909399;
						border-radius: 16rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding-bottom: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						.type_item_title {
							width: 192rpx;
							height: 60rpx;
							color: #fff;
							font-size: 32rpx;
							text-align: center;
							line-height: 60rpx;
							background-color: #909399;
							border-radius: 10rpx 0 16rpx 0;
						}
						.type_item_num {
							text-align: center;
							color: #FF6067;
							font-size: 36rpx;
						}
						.type_item_msg {
							text-align: center;
							color: #909399;
						}
					}
					.active {
						border: 2rpx solid #485EF4;
						.type_item_title {
							background-color: #485EF4;
						}
					}
				}
				.unUpdateLine {
					margin-top: 40rpx;
					.unUpdateLine_title {
						color: #485EF4;
					}
					.unUpdateLine_lines {
						display: flex;
						flex-wrap: wrap;
						.line {
							width: 50%;
							margin-top: 24rpx;
							.line_select {
								width: 32rpx;
								height: 32rpx;
								display: inline-block;
								vertical-align: middle;
								background-size: cover;
								margin-right: 20rpx;
							}
						}
					}
				}
			}
			.footer {
				width: calc(100% - 32rpx);
				position: absolute;
				bottom: 40rpx;
				left: 16rpx;
				.msg {
					display: block;
					color: #909399;
					margin-bottom: 24rpx;
					text-align: center;
				}
			}
			.u-dropdown__menu__item__text {
				color: #FFFFFF !important;
			}
			.u-dropdown__content__popup {
				border-radius: 16rpx !important;
				.u-cell {
					padding: 6rpx 0rpx;
					.u-cell_title {
						width: 100% !important;
						text-align: center;
						font-size: 24rpx !important;
					}
				}
			}
			.u-dropdown__content__mask {
				display: none;
			}
		}
	}
</style>