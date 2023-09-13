<template>
	<view class="gt_content">
		<view class="card_bg"></view>
		<view class="card_bg1"></view>
		<view class="title">
			<text>{{ title }}</text>
		</view>
		<view class="title1">
			<text>{{ title1 }}</text>
		</view>
		<view class="card">
			<view class="card_type">
				<view class="type_item" @click="changeType(1)" :class="active === 1 ? 'active' : ''" v-if="data.company_member !== '1'">
					<view class="type_item_title">会员专线</view>
					<view class="type_item_num">{{ data.lineMember }}元/年</view>
					<view class="type_item_msg">指定专线开通会员</view>
				</view>
				<view class="type_item" @click="changeType(-1)" :class="active === -1 ? 'active' : ''" v-if="data.company_member === '1' || list.length">
					<view class="type_item_title">全线会员</view>
					<view class="type_item_num" v-if="data.company_member === '1'">剩余时间：{{ computedDay(data.company_member_time) }}天</view>
					<view class="type_item_num" v-else>{{ data.companyMember }}元/年</view>
					<view class="type_item_msg">全部专线开通会员</view>
				</view>
			</view>
			<view class="card_content">
				<!-- 未升级全线 -->
				<template v-if="data.company_member === '0'">
					<view class="unUpdateLine" v-if="list.length || active === -1">
						<view class="unUpdateLine_title">未开通专线</view>
						<view class="unUpdateLine_lines" v-if="active === 1">
							<view class="line" v-for="item in list" :key="item.line_id" @click="changeSelect(item)">
								<view class="line_select" :style="{backgroundImage:
								`url(${gtCommon.getOssImg(item.selected ?'sansong/selected.png' : 'sansong/unSelected.png')})`}"></view>
								<view class="line_name">
									<view class="">{{ item.start_city }}</view>
									<view class="">——</view>
									<view class="">{{ item.end_city }}</view>
								</view>
							</view>
						</view>
						<view class="unUpdateLine_lines" v-else>
							<view class="line">全部专线</view>
						</view>
					</view>
					<view class="unUpdateLine updateLine" v-if="list1.length && active === 1">
						<view class="unUpdateLine_title">已开通专线</view>
						<view class="unUpdateLine_lines" v-if="active === 1">
							<view class="line" v-for="item in list1" :key="item.line_id">
								<view class="line_name">
									<view class="">{{ item.start_city }}</view>
									<view class="">——</view>
									<view class="">{{ item.end_city }}</view>
								</view>
							</view>
						</view>
						<view class="unUpdateLine_lines" v-else>
							<view class="line">全部专线</view>
						</view>
					</view>
				</template>
				<!-- 已升级全线 -->
				<template v-if="data.company_member === '1'">
					<view class="unUpdateLine">
						<view class="unUpdateLine_title">已开通专线</view>
						<view class="unUpdateLine_lines">
							<view class="line">全部专线</view>
						</view>
					</view>
				</template>
			</view>
			<!-- <view class="unUpdateLine">
				<view class="unUpdateLine_title">会员专线权益</view>
				<view class="unUpdateLine_lines">
					<text class="explain">
						1、专线升级为会员线路
						2、会员线路佣金提点低
						3、会员路线优先推送精准货源
						4、会员线路优先抢单
					</text>
				</view>
			</view> -->
		</view>
		<view class="authorization">
			<view class="radio" @click="flag = !flag" :style="{backgroundImage:
				  `url(${gtCommon.getOssImg(flag ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
			</view>
			<view @click="flag = !flag">我已阅读并同意</view>
			<view class="agreement" @click="read">《会员推广协议》</view>
		</view>
		<view class="footer">
			<u-button type="primary" v-if="list.length" @click="goTopup">
				<text>立即充值{{ num }}元</text>
			</u-button>
		</view>
		<u-toast ref="uToast" />
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
				flag: false
			}
		},
		onShow() {
			let gt = this
			gt.flag = false
			gt.getData()
		},
		computed: {
			num() {
				let gt = this
				let str = 0
				if(gt.active === 1) {
					gt.list.forEach(item=> {
						if(item.selected) str += gt.data.lineMember
					})
					return str
				} else {
					return gt.data.companyMember
				}
			},
			title() {
				let gt = this
				let str = ''
				if(gt.data.company_member === '1') {
					str = '全线会员'
				} else {
					if(!gt.list.length) {
						str = '会员专线'
					} else {
						str = '开通会员专线'
					}
				}
				return str
			},
			title1() {
				let gt = this
				let str = ''
				if(gt.data.company_member === '1') {
					str = '已开通全线会员'
				} else {
					if(!gt.list.length) {
						str = '已开通会员专线'
					} else {
						str = '优先匹配货源'
					}
				}
				return str
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
					gt.list = res.list.filter(item=> item.member_status === '0')
					gt.list.map(item=> {
						return item.selected = false
					})
					gt.list1 = res.list.filter(item=> item.member_status === '1')
				})
				gt.gtRequest.post('/logistics/Specialline/get_member_config_info').then(res => {
					gt.data = res
					if(res.company_member === '1') gt.active = -1
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
			goTopup() {
				let gt = this
				if(!gt.flag) return gt.$refs.uToast.show({
						title: '请勾选同意会员推广协议'
					})
				let ids = []
				if(gt.active === 1) {
					gt.list.forEach(item=> {
						if(item.selected) ids.push(item.line_id)
					})
					if(!ids.length) return gt.$refs.uToast.show({
						title: '请选择充值专线'
					})
				} else {
					ids = ['-1']
				}
				gt.gtRequest.post('/logistics/Specialline/create_member_order', {
					line_ids: ids.join(',')
				}).then(res => {
					uni.navigateTo({
						url: "./settleAccounts?type=2&num=" + gt.num + '&order_id=' + res.order_id
					})
				})
			},
			computedDay(str) {
				let num = str - (+new Date() / 1000)
				return Math.trunc(num / (24 * 60 * 60))
			},
			read() {
				let gt = this
				gt.gtCommon.goLicence('https://saasdemo.sansongkeji.com/adminsite/#/agreement/member')
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $gtBackgroundColor;
		.gt_content {
			font-family: PingFangSC-Medium, PingFang SC;
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
			.title {
				color: #FFFFFF;
				font-size: 40rpx;
				font-weight: 500;
				position: absolute;
				right: 50%;
				top: 80rpx;
				transform: translate(50%, 0%);
			}
			.title1 {
				color: #FFFFFF;
				font-size: 48rpx;
				font-weight: 500;
				position: absolute;
				right: 50%;
				top: 144rpx;
				transform: translate(50%, 0%);
			}
			.card {
				width: calc(100% - 32rpx);
				height: calc(100% - 290rpx - 122rpx - 80rpx);
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
				.card_content {
					// max-height: calc(100% - 262rpx - 236rpx - 32rpx);
					max-height: calc(100% - 262rpx - 32rpx);
					overflow: auto;
					margin: 40rpx 0;
				}
				.unUpdateLine {
					// margin-top: 40rpx;
					.unUpdateLine_title {
						color: #485EF4;
					}
					.unUpdateLine_lines {
						display: flex;
						flex-wrap: wrap;
						.line {
							width: 50%;
							margin-top: 24rpx;
							display: flex;
							align-items: center;
							.line_select {
								width: 32rpx;
								height: 32rpx;
								display: inline-block;
								vertical-align: middle;
								background-size: cover;
								margin-right: 20rpx;
							}
							.line_name {
								width: calc(100% - 52rpx);
								display: flex;
								align-items: center;
								&>view:nth-child(1),
								&>view:nth-child(3) {
									min-width: 80rpx;
								}
							}
						}
						.explain {
							margin-top: 24rpx;
						}
					}
				}
				.updateLine {
					margin-top: 40rpx;
					.unUpdateLine_lines {
						.line {
							.line_name {
								width: 100%;
							}
						}
					}
				}
			}
			.authorization {
				display: flex;
				align-items: center;
				position: absolute;
				bottom: 142rpx;
				left: 16rpx;
				color: #909399;
				.radio {
					width: 32rpx;
					height: 32rpx;
					background-size: cover;
					background-repeat: no-repeat;
					margin-right: 16rpx;
				}
				.agreement {
					color: $gtProjectColor;
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