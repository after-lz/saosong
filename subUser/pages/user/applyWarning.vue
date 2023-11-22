<template>
	<view class="unsubscribe">
		<u-gap height="40"></u-gap>
		
		<view class="title">
			<text>注销后，你将放弃以下权益</text>
		</view>
		<view class="box-view">
			<view class="li-item">
				<text>1. 你的所有交易记录将被清空，请确保所有交易记录已完结且无纠纷，账号注销后因为历史交易可能产生的售后权益将视作自动放弃。</text>
			</view>
			<view class="li-item">
				<text>2. 你的身份信息、账号信息、红包、优惠券等权益将被清空且无法恢复。</text>
			</view>
		</view>
		
		<view class="title">
			<text>注销前，我们将进行以下验证</text>
		</view>
		
		<view class="box-view">
			<view class="li-item">
				<view>
					<text>1. 交易信息</text>
				</view>
				<view class="tip-view">
					<text>你的账号无未完成订单</text>
				</view>
			</view>
			
			<view class="li-item">
				<view>
					<text>2. 账号相关财产已结清</text>
				</view>
				<view class="tip-view">
					<text>你的账号不存在零钱余额等账户余额</text>
				</view>
			</view>
			
			
			<view class="li-item">
				<view>
					<text>3. 结算订单</text>
				</view>
				<view class="tip-view">
					<text>你的账号中无未结算的订单</text>
				</view>
			</view>	
			<view class="li-item">
				<view>
					<text>4. 异常订单</text>
				</view>
				<view class="tip-view">
					<text>你的账号中不存在未处理的异常单</text>
				</view>
			</view>	
		</view>
		
		<u-gap height="60"></u-gap>
		
		<view class="bot-view">
			<view class="but" @click="toRemoveAccounts">
				<text>申请注销</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		methods: {
			toRemoveAccounts() {
				uni.navigateTo({
					url: "./applyCancellation"
				})
			}
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
</style>
<style lang="scss" scoped>
	.unsubscribe{
		.title{
			padding: 0 16rpx;
			margin-bottom: 40rpx;
			color: #F59A23;
			font-size: 30rpx;
		}
		.box-view{
			margin: 0 16rpx 40rpx 16rpx;
			padding: 24rpx;
			border-radius: 16rpx;
			background-color: #f4f4f4;
			.li-item{
				width: 100%;
				margin-bottom: 20rpx;
				font-size: 28rpx;
				&:last-child{
					margin-bottom: 0;
				}
				.tip-view{
					font-size: 24rpx;
					color: #666666;
				}
			}
		}
		.bot-view{
			padding: 0 16rpx;
			height: 100rpx;
			.but{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 32rpx;
				color: #FFFFFF;
				background-color: #485EF4;
				border-radius: 16rpx;
			}
		}
	}
</style>