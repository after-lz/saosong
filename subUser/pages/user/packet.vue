<template>
	<view class="gt_content">
		<view class="info">
			<view class="info_left">
				<view class="balance">100.00</view>
				<view class="balanceMsg">红包余额(元)</view>
				<view class="con_btnItem" @click="goBalance">
					<text>转到余额</text>
				</view>
			</view>
			<view class="info_right" @click="goRecord">红包记录</view>
		</view>
		<view class="card">
			<view class="card_title">做任务赢红包</view>
			<view class="card_content">
				<view class="card_item" v-for="item in list" :key='item.id'>
					<template v-if="item.type === 1">
						<text>完成企业入驻信息，得</text>
						<text class="color_red">{{item.money}}元</text>
						<text>红包</text>
						<view class="btn bg_red">领取</view>
					</template>
					<template v-if="item.type === 2">
						<text>发布专线，得</text>
						<text class="color_red">{{item.money}}元</text>
						<text>红包</text>
						<view class="btn">去发布</view>
					</template>
					<template v-if="item.type === 3">
						<text>接单赢红包，单单有</text>
						<text class="color_red">{{item.money}}元</text>
						<text>红包</text>
						<view class="btn">去接单</view>
					</template>
				</view>
			</view>
		</view>
		<view class="msg">
			<text>使用须知：</text><br/>
			<text>1、可用于专线推广费用抵扣</text><br/>
			<text>2、红包可转到余额进行提现，进行转余额操作时需要满足转余额条件。</text><br/>
			<text>3、红包会定时进行清空，请及时使用以免逾期清零。</text><br/>
			<text>4、红包可以通过一下方式进行获取：完结订单得红包、分享得红包、邀请新人得红包以及新人注册红包</text><br/>
			<text>详细规则请阅读<text class="more" @click="goRules">《红包使用规则》</text></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						id: 1,
						type: 1,
						money: 10
					},
					{
						id: 2,
						type: 2,
						money: 10
					},
					{
						id: 3,
						type: 3,
						money: 5
					},
				]
			}
		},
		methods: {
			goBalance() {
				uni.navigateTo({
					url: './transferredBalance'
				})
			},
			goRecord() {
				uni.navigateTo({
					url: './packetRecord'
				})
			},
			goRules() {
				uni.navigateTo({
					url: './packetRules'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
		.info {
			display: flex;
			justify-content: space-between;
			background-color: #d7d7d7;
			.info_right {
				text-align: right;
				color: #169bd5;
				padding-right: 40rpx;
			}
			.info_left {
				padding: 20rpx;
				.balance {
					font-size: 42rpx;
					font-weight: 700;
				}
				.balanceMsg {
					margin: 10rpx 0;
				}
				.con_btnItem {
					width: 150rpx;
					height: 66rpx;
					border-radius: 10rpx;
					color: #7f7f7f;
					line-height: 66rpx;
					text-align: center;
					border: 2rpx solid #aaaaaa;
					background-color: #f2f2f2;
				}
			}
		}
		.card {
			width: 94%;
			background-color: #f3f5f7;
			margin-top: 80rpx;
			.card_title {
				font-size: 34rpx;
				font-weight: 700;
				padding: 10rpx;
			}
			.card_content {
				display: flex;
				flex-wrap: wrap;
				padding-bottom: 20rpx;
				.card_item {
					width: 100%;
					height: 80rpx;
					background-color: #ffffff;
					margin: 10rpx 10rpx 0 10rpx;
					border-radius: 10rpx;
					line-height: 80rpx;
					position: relative;
					.btn {
						width: 140rpx;
						height: 52rpx;
						line-height: 52rpx;
						text-align: center;
						border-radius: 10rpx;
						display: inline-block;
						position: absolute;
						right: 20rpx;
						top: 50%;
						transform: translate(0, -50%);
						background-color: $gtProjectColor;
						color: #dfebfc;
					}
				}
			}
		}
		.color_red {
			color: #eb5d63;
		}
		.bg_red {
			background-color: #eb5d63 !important;
		}
		.msg {
			padding: 20rpx;
			>text {
				display: inline-block;
				margin-top: 20rpx;
			}
			.more {
				color: $gtProjectColor;
			}
		}
	}
</style>