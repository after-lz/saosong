<template>
	<view class="gt_content">
		<view class="con_item" @click="goBind">
			<view class="item_left">
				<view class="con_text">
					<text>支付宝收款账户</text>
				</view>
				<view class="con_mark">
					<text v-if='alipay'>{{ alipay }}</text>
					<text v-else>请前往绑定收款账户</text>
				</view>
			</view>
			<view class="item_right">
				<view class="con_mark">
					<text v-if='alipay' style="color: #485EF4">换绑</text>
					<text v-else>待绑定</text>
				</view>
				<view class="con_icon">
					<u-icon name="arrow-right" color="#909399"></u-icon>
				</view>
			</view>
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
				aut_show: false,
				alipay: ''
			}
		},
		onLoad() {
			
		},
		onShow() {
			let gt = this
			let user_info = uni.getStorageSync("user_info")
			gt.alipay = user_info.alipay
		},
		methods: {
			goBind() {
				let gt = this
				let userAuth = uni.getStorageSync('userAuth')
				if(userAuth) {
					uni.navigateTo({
						url: './bindingAccount'
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
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding: 16rpx;
			.con_item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				background-color: #fff;
				border-radius: 16rpx;
				.item_right {
					display: flex;
				}
				.con_text {
					font-size: 32rpx;
					font-weight: 700;
					color: #000000;
					margin-bottom: 10rpx;
				}
				.con_mark {
					color: #909399;
				}
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