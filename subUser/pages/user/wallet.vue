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
		<view class="con_btns">
			<view class="con_btnItem chargeBtn" @click="goCharge">
				<text>充值</text>
			</view>
			<view class="con_btnItem withdrawBtn" @click="goWithdrawal">
				<text>提现</text>
			</view>
		</view>
		<view class="con_tip">
			<text>本服务由伞送提供</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: 0,
			}
		},
		onShow() {
			let gt = this;
			gt.getUserInfo();
			
		},
		methods: {
			goCharge() {
				uni.navigateTo({
					url: './charge',
				});
				return false;
			},
			goWithdrawal(){
				let gt = this;
				
				uni.navigateTo({
					url: './withdrawal?totalMoney=' + gt.money,
				});
				return false;
			},
			getUserInfo(){
				let gt = this;
				var url = "/logistics/user/get_user_info";
				
				gt.gtRequest.post(url).then(res=>{
					gt.money = res.logistics_info.money01;
				});
			},
			goList(){
				let gt = this;
				uni.navigateTo({
					url:'./moneyList',
				});
				return false;
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

			.con_btns {
				width: 750rpx;
				padding-left: 200rpx;
				position: absolute;
				bottom: 210rpx;

				.con_btnItem {
					width: 350rpx;
					height: 100rpx;
					border-radius: 16rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 100rpx;
					text-align: center;
				}

				.chargeBtn {
					background: $gtProjectColor;
					color: #fff;
				}

				.withdrawBtn {
					color: $gtProjectColor;
					border: 2rpx solid #485EF4;
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
		}
	}
</style>