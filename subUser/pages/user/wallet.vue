<template>
	<view class="gt_content">
		<view class="con_text" @click="goList">
			<text>账单</text>
		</view>
		<view class="con_icon">
			<image :src="gtCommon.getOssImg('user/walletIcon.png')" mode="widthFix"></image>
		</view>
		<view class="con_title">
			<text>我的零钱</text>
		</view>
		<view class="con_num">
			<text>￥{{money}}</text>
		</view>
		<view class="warning" v-if="wallet_status">
			<text>你的账户异常，请联系平台客服!</text>
		</view>
		<view class="con_btns">
			<view class="con_btnItem chargeBtn">
				<u-button type="primary" :disabled='wallet_status ? true : false' @click="goCharge">充值</u-button>
			</view>
			<view class="con_btnItem withdrawBtn">
				<u-button :disabled='wallet_status ? true : false' @click="goWithdrawal">提现</u-button>
			</view>
		</view>
		<view class="con_tip">
			<text>本服务由伞送提供</text>
		</view>
		<!-- #ifdef APP-PLUS -->
		<u-modal v-model="aut_show" content="请先完成实名认证" @confirm="aut_confirm" :show-cancel-button="true" confirm-text='去认证'></u-modal>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<u-modal v-model="aut_show" :show-title='false' confirm-text='确认'>
			<view class="slot-content">
				<view class="aut_title">请下载伞送物流App</view>
				<view class="aut_content">为提供更好的服务,请下载伞送物流App</view>
			</view>
		</u-modal>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: 0,
				aut_show: false,
				wallet_status: 0
			}
		},
		onShow() {
			let gt = this
			gt.getUserInfo()
		},
		methods: {
			goCharge() {
				uni.navigateTo({
					url: './charge'
				})
			},
			goWithdrawal() {
				let gt = this
				let userAuth = uni.getStorageSync('userAuth')
				if(userAuth) {
					uni.navigateTo({
						url: './withdrawal?totalMoney=' + gt.money
					})
				} else {
					gt.aut_show = true
				}
			},
			aut_confirm() {
				uni.navigateTo({
					url: '../../../pages/login/peopleAuth?flag=' + true
				})
			},
			getUserInfo() {
				let gt = this
				gt.gtRequest.post("/logistics/user/get_user_info").then(res=>{
					gt.money = res.logistics_info.money01
					gt.wallet_status = res.logistics_info.wallet_status
				})
			},
			goList() {
				let gt = this
				uni.navigateTo({
					url:'./moneyList'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;

		.gt_content {
			.con_text{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 40rpx;
				margin: 24rpx 40rpx;
				text-align: right;
			}
			.con_icon {
				width: 100rpx;
				height: 100rpx;
				margin: 82rpx 325rpx;
			}

			.con_title {
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 44rpx;
				text-align: center;
			}

			.con_num {
				font-size: 86rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 122rpx;
				text-align: center;
				margin-top: 4rpx;
			}

			.warning {
				text-align: center;
				color: #fa3534;
			}
	
			.con_btns {
				width: 750rpx;
				padding-left: 200rpx;
				position: absolute;
				bottom: 210rpx;

				.con_btnItem {
					width: 350rpx;
				}

				.withdrawBtn {
					margin-top: 26rpx;
				}
			}

			.con_tip {
				width: 750rpx;
				font-size: 24rpx;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN;
				font-weight: 400;
				color: #909399;
				line-height: 36rpx;
				text-align: center;
				margin-top: 132rpx;
				position: absolute;
				bottom: 70rpx;
			}
			.slot-content {
				padding: 40rpx 40rpx 100rpx 40rpx;
			}
			.aut_title {
				font-size: 40rpx;
				text-align: center;
				font-weight: 700;
				font-family: PingFangSC-Medium, PingFang SC;
			}
			.aut_content {
				text-align: center;
				margin-top: 40rpx;
				font-family: PingFangSC-Medium, PingFang SC;
			}
		}
	}
</style>