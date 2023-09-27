<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_headBackground"></view>
		<view class="con_baseInfo" :style="'margin-top:' + (headHeight + 140) + 'rpx'">
			<view class="con_headImg" @click="goUser">
				<u-avatar size="large" :src="gtCommon.getOssImg('user/defaultHeadImg.png') && userInfo.headerpic"></u-avatar>
			</view>
			<view class="con_name_mobile" @click="goUser">
				<view class="con_name u-line-1">
					<text v-if="userInfo.nickname">{{userInfo.nickname}}</text>
					<text style="color:#252222; line-height: 108rpx" @click="goLogin" v-else>请先登录</text>
				</view>
				<view class="con_mobile_auth" v-if="userInfo.nickname">
					<view class="con_mobile">
						<text>{{userInfo.mobile}}</text>
					</view>
					<!-- 20230628,根据Android提供的信息 -->
					<view class="con_auth" v-if="logisticsInfo.is_company_approve == 1">
						<image :src="gtCommon.getOssImg('user/auth.png')" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="con_btns">
				<view class="con_btnItem" @click="goQrcode">
					<image :src="gtCommon.getOssImg('user/qrcode.png')" mode="widthFix"></image>
				</view>
				<view class="con_btnItem" @click="goSetting">
					<image :src="gtCommon.getOssImg('user/setting.png')" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="con_nums1">
			<view class="con_item" @click="menuClick_1(0)">
				<view class="con_num1">
					<text>{{numArr1[0]}}</text>
				</view>
				<view class="con_text">
					<text>行为分</text>
				</view>
			</view>
			<view class="con_line">
				<u-line color="#F2F2F2" length="80rpx" direction="col" :hair-line="false"></u-line>
			</view>
			<view class="con_item" @click="menuClick_1(1)">
				<view class="con_num1">
					<text>{{numArr1[1]}}</text>
				</view>
				<view class="con_text">
					<text>访客量</text>
				</view>
			</view>
			<view class="con_line">
				<u-line color="#F2F2F2" length="80rpx" direction="col" :hair-line="false"></u-line>
			</view>
			<view class="con_item" @click="menuClick_1(2)">
				<view class="con_num1">
					<text>{{numArr1[2]}}</text>
				</view>
				<view class="con_text">
					<text>收藏我</text>
				</view>
			</view>
			<view class="con_line">
				<u-line color="#F2F2F2" length="80rpx" direction="col" :hair-line="false"></u-line>
			</view>
			<view class="con_item" @click="menuClick_1(3)">
				<view class="con_num1">
					<text>{{numArr1[3]}}</text>
				</view>
				<view class="con_text">
					<text>评分</text>
				</view>
			</view>
		</view>
		<view class="con_swiper">
			<u-swiper :list="swiperList" name="picurl" height="200"></u-swiper>
		</view>
		<view class="con_wallet">
			<view class="con_title">
				<text>我的钱包</text>
			</view>
			<view class="con_nums2">
				<view class="con_item" @click="menuClick_2(0)">
					<view class="con_num2">
						<text>{{numArr2[0]}}</text>
					</view>
					<view class="con_text">
						<text>在途资金</text>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="80rpx" direction="col" :hair-line="false"></u-line>
				</view>
				<view class="con_item" @click="menuClick_2(1)">
					<view class="con_num2">
						<text>{{numArr2[1]}}</text>
					</view>
					<view class="con_text">
						<text>余额(元)</text>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="80rpx" direction="col" :hair-line="false"></u-line>
				</view>
				<view class="con_item" @click="menuClick_2(2)">
					<view class="con_num2">
						<text>{{numArr2[2]}}</text>
					</view>
					<view class="con_text">
						<text>红包余额</text>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="80rpx" direction="col" :hair-line="false"></u-line>
				</view>
				<view class="con_item" @click="menuClick_2(3)">
					<view class="con_num2">
						<text>{{numArr2[3]}}</text>
					</view>
					<view class="con_text">
						<text>银行卡</text>
					</view>
				</view>
			</view>
		</view>
		<view class="con_menu">
			<view class="con_title">
				<text>便捷功能</text>
			</view>
			<view class="con_list">
				<view class="con_item" v-for="(item, index) in menuList1" :key="index" @click="menuClick_3(index)">
					<view class="con_icon">
						<image :src="gtCommon.getOssImg('user/' + item.name +'.png')" mode="widthFix">
						</image>
					</view>
					<view class="con_text">
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="con_menu">
			<view class="con_title">
				<text>帮助反馈</text>
			</view>
			<view class="con_list">
				<view class="con_item" v-for="(item, index) in menuList2" :key="index" @click="menuClick_4(index)">
					<view class="con_icon">
						<image :src="gtCommon.getOssImg('user/' + item.name +'.png')" mode="widthFix">
						</image>
					</view>
					<view class="con_text">
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loginStatus: false,
				headHeight: -60,
				swiperList: [],
				menuList1: [
					{ name: '我的营收' },
					{ name: '我的账单' },
					{ name: '发票管理' },
					{ name: '员工管理' }
				],
				menuList2: [
					{ name: '常见问题' },
					{ name: '联系客服' },
					{ name: '意见反馈' }
				],
				logisticsInfo: {},
				userInfo: {},
				numArr1: [0, 0, 0, 0],
				numArr2: [0, 0, 0, 0],
			}
		},
		onLoad() {
			let gt = this
			// #ifdef MP-WEIXIN
			var adType = 'AppletLogisticsPersonal'
			// #endif
			// #ifdef APP-PLUS
			var adType = 'AppLogisticsPersonal'
			// #endif
			gt.gtRequest.post("/api/appgobal/get_ad_data", {
				platform: 'logistics',
				city: '无锡',
				ad_sign: adType
			}).then(res => {
				gt.swiperList = res.list
			})
			// #ifdef MP-WEIXIN
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			gt.headHeight = menuButtonInfo.top + menuButtonInfo.height
			// #endif
		},
		onShow() {
			let gt = this
			gt.getUserInfo()
		},
		methods: {
			/* 行为分/访客量/收藏我/评分 */
			menuClick_1(type) {
				let gt = this
				if(!gt.goLogin()) return
				let url = ''
				switch (type) {
					case 0:
						url = '/subUser/pages/user/behaviorScore'
						break;
					case 1:
						url = ''
						break;
					case 2:
						url = ''
						break;
					case 3:
						url = ''
						break;
					default:
						break;
				}
				if(url) {
					uni.navigateTo({
						url: url
					})
				}
			},
			/* 在途资金/余额/红包/银行卡 */
			menuClick_2(type) {
				let gt = this
				if(!gt.goLogin()) return
				let url = ''
				switch (type) {
					case 0:
						url = '/subUser/pages/user/fundFloat'
						break;
					case 1:
						url = '/subUser/pages/user/wallet'
						break;
					case 2:
						url = '/subUser/pages/user/packet'
						break;
					case 3:
						url = '/subUser/pages/user/bankList'
						break;
					default:
						break;
				}
				if(url) {
					uni.navigateTo({
						url: url
					})
				}
			},
			/* 我的营收/我的账单/发票管理/员工管理 */
			menuClick_3(type) {
				let gt = this
				if(!gt.goLogin()) return
				let url = ''
				switch (type) {
					case 0:
						url = './revenue'
						break;
					case 1:
						url = '/subUser/pages/user/moneyList'
						break;
					case 2:
						url = './empty'
						break;
					case 3:
						url = './empty'
						break;
					default:
						break;
				}
				if(url) {
					uni.navigateTo({
						url: url
					})
				}
			},
			/* 常见问题/联系客服/意见反馈 */
			menuClick_4(type) {
				let gt = this
				if(!gt.goLogin()) return
				if(type === 0) {
					uni.navigateTo({
						url: '/subUser/pages/user/commonProblem',
					})
				} else if(type === 2) {
					uni.navigateTo({
						url: '/subUser/pages/user/feedBack',
					})
				} else if(type === 1) {
					uni.makePhoneCall({
						phoneNumber: '4008899050'
					})
				}
			},
			goLogin() {
				let gt = this
				if(!gt.loginStatus) {
					uni.showModal({
						title:'您还未登录',
						content:'登录后才能使用此功能',
						success(res) {
							if(res.confirm) {
								uni.navigateTo({
									url: '../login/login'
								})
							}
						}
					})
				}
				return gt.loginStatus
			},
			goQrcode() {
				let gt = this
				if(!gt.goLogin()) return
				uni.navigateTo({
					url: '/subUser/pages/user/qrcode'
				})
			},
			goSetting() {
				let gt = this
				if(!gt.goLogin()) return
				uni.navigateTo({
					url: '/subUser/pages/user/setting'
				})
			},
			goUser() {
				let gt = this
				if(!gt.goLogin()) return
				uni.navigateTo({
					url: '../../subUser/pages/user/personalInformation'
				})
			},
			async getUserInfo() {
				let gt = this
				let token = await gt.gtRequest.getToken()
				if (token) {
					gt.gtRequest.post("/logistics/user/get_user_info").then(res => {
						uni.setStorageSync('user_info', res.user_info)
						gt.userInfo = res.user_info
						if(res.logistics_info) {
							gt.logisticsInfo = res.logistics_info
							gt.numArr1[0] = res.logistics_info.credit_score
							gt.numArr1[1] = res.logistics_info.visitor_count
							gt.numArr1[2] = res.logistics_info.collect_count
							gt.numArr1[3] = gt.gtCommon.floatNum(parseFloat(res.logistics_info.grade_score) / res.logistics_info.comment_num, 1)
							gt.numArr2[0] = res.onway_money
							gt.numArr2[1] = res.logistics_info.money01
							gt.numArr2[2] = res.logistics_info.money02
							gt.numArr2[3] = res.bank_count
						}
						gt.loginStatus = true
					})
				} else {
					uni.showModal({
						title: '请先登录',
						showCancel: true,
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../login/login'
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_headBackground {
				width: 750rpx;
				height: 958rpx;
				background: linear-gradient(180deg, #7384FF 0%, rgba(216, 216, 216, 0) 100%);
				position: absolute;
				top: 0;
				z-index: -999;
			}

			.con_baseInfo {
				display: flex;

				.con_headImg {
					margin-left: 16rpx;
				}

				.con_name_mobile {
					width: 360rpx;

					.con_name {
						font-size: 40rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 56rpx;
						margin-left: 32rpx;
					}

					.con_mobile_auth {
						display: flex;
						justify-content: space-between;

						.con_mobile {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 42rpx;
							margin: 12rpx 0 0 32rpx;
						}

						.con_auth {
							width: 128rpx;
							height: 42rpx;
							margin-top: 12rpx;
						}
					}
				}

				.con_btns {
					display: flex;
					justify-content: space-around;
					width: 200rpx;
					margin-left: 40rpx;

					.con_btnItem {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			.con_nums1 {
				display: flex;
				justify-content: space-evenly;
				width: 718rpx;
				// height: 176rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 52rpx 16rpx 0 16rpx;
				padding-bottom: 32rpx;

				.con_item {
					width: 178rpx;

					.con_num1 {
						font-size: 40rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 56rpx;
						text-align: center;
						margin-top: 32rpx;
					}

					.con_text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 40rpx;
						text-align: center;
						margin-top: 24rpx;
					}
				}

				.con_line {
					margin-top: 48rpx;
				}

			}

			.con_swiper {
				margin: 22rpx 16rpx 22rpx 16rpx;
				width: 718rpx;
			}

			.con_wallet {
				width: 718rpx;
				// height: 256rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				padding: 1rpx;
				margin-left: 16rpx;
				padding-bottom: 32rpx;

				.con_title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
					margin: 20rpx 0 0 24rpx;
				}

				.con_nums2 {
					display: flex;
					justify-content: space-evenly;

					.con_item {
						width: 178rpx;

						.con_num2 {
							font-size: 40rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 56rpx;
							text-align: center;
							margin-top: 32rpx;
						}

						.con_text {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 40rpx;
							text-align: center;
							margin-top: 24rpx;
						}
					}

					.con_line {
						margin-top: 48rpx;
					}

				}
			}

			.con_menu {
				width: 718rpx;
				height: 252rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 22rpx 16rpx 0 16rpx;
				padding: 1rpx;

				.con_title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
					margin: 24rpx 0 0 24rpx;
				}

				.con_list {
					display: flex;
					flex-wrap: wrap;

					.con_item {
						width: 100rpx;
						height: 120rpx;
						margin: 34rpx 38rpx 0 38rpx;

						.con_icon {
							width: 64rpx;
							height: 64rpx;
							// margin-top: 34rpx;
							margin-left: 18rpx;
						}

						.con_text {
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 34rpx;
							margin-top: 20rpx;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>