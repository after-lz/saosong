<template>
	<view class="gt_content">
		<view class="await">
			<image :src="gtCommon.getOssImg('user/await.png')" mode="widthFix" v-if="!data.status"></image>
			<image :src="gtCommon.getOssImg('user/down.png')" mode="widthFix" v-if="data.status == 1 || data.status == 3"></image>
			<u-icon name="close-circle-fill" color="#FF6067" size="200" v-if="data.status == 5"></u-icon>
		</view>
		<view class="await_title" v-if="!data.status">处理中</view>
		<view class="await_title" v-if="data.status == 1">审核通过</view>
		<view class="await_title" v-if="data.status == 3">提现成功</view>
		<view class="await_title" v-if="data.status == 5">审核拒绝</view>
		<view class="steps">
			<view class="step_item" :style="data.status === 3 ? 'active' : ''">
				<view class="item_left"></view>
				<view class="item_point"></view>
				<view class="item_right">提现完成</view>
			</view>
			<view class="step_line"></view>
			<view class="step_item" :style="data.status === 1 ? 'active' : ''">
				<view class="item_left" :style="{color: data.status >= 1 ? '#909399' : 'transparent'}">
					{{ gtCommon.formateTime(data.audit_time, 'MM-DD HH:mm:ss') }}
				</view>
				<view class="item_point"></view>
				<view class="item_right">
					<text>审核通过</text>
				</view>
			</view>
			<view class="step_line"></view>
			<view class="step_item" :style="data.status === 0 ? 'active' : ''">
				<view class="item_left">{{ gtCommon.formateTime(data.create_time, 'MM-DD HH:mm:ss') }}</view>
				<view class="item_point"></view>
				<view class="item_right">
					<text>等待系统审核</text>
					<!-- <view class="item_mark" v-if="data.status === 0">
						预计{{ gtCommon.formateTime(data.create_date) }}审核通过
					</view> -->
				</view>
			</view>
			<view class="step_line"></view>
			<view class="step_item">
				<view class="item_left">{{ gtCommon.formateTime(data.create_time, 'MM-DD HH:mm:ss') }}</view>
				<view class="item_point"></view>
				<view class="item_right">提交提现申请</view>
			</view>
		</view>
		<view class="info">
			<view class="info_item">
				<view class="info_item_left">提现金额</view>
				<view class="info_item_right">￥{{ data.money }}</view>
			</view>
			<view class="info_item">
				<view class="info_item_left">提现到银行卡</view>
				<view class="info_item_right">{{ bankCard }}</view>
			</view>
			<view class="info_item">
				<view class="info_item_left">申请提现时间</view>
				<view class="info_item_right">{{ gtCommon.formateTime(data.create_time, 'YYYY-MM-DD HH:mm:ss') }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				data: {},
				bankCard: ''
			}
		},
		onLoad(option) {
			let gt = this
			gt.id = option.withdraw_id
			gt.getData()
		},
		methods: {
			getData() {
				let gt = this
				gt.gtRequest.post('/logistics/companywallet/get_withdraw_log_detail', {
					withdraw_id: gt.id
				}).then(res => {
					gt.data = res
					gt.bankCard = res.bank_name + '(' + res.bank_number.slice(-4) + ')'
				})
			}
		}
	}
</script>

<style lang="scss">
	.gt_content {
		background-color: #fff;
		padding: 0 40rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		.await {
			width: 192rpx;
			height: 192rpx;
			margin: 128rpx auto 36rpx;
		}
		.await_title {
			text-align: center;
			font-size: 32rpx;
			font-weight: 700;
			margin-bottom: 100rpx;
		}
		.steps {
			padding-bottom: 60rpx;
			border-bottom: 2rpx solid #f2f2f2;
			.step_item {
				display: flex;
				align-items: center;
				.item_left {
					width: 50%;
					font-size: 24rpx;
					color: #909399;
					text-align: right;
				}
				.item_point {
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					background-color: #909399;
					margin: 0 32rpx;
				}
				.item_right {
					position: relative;
					width: 50%;
					font-size: 32rpx;
					color: #909399;
					text-align: left;
					.item_mark {
						position: absolute;
						top: 46rpx;
						left: 0;
						font-size: 24rpx;
						color: #909399;
					}
				}
				
			}
			.step_line {
				width: 2rpx;
				height: 64rpx;
				background-color: #e5e5e5;
				margin: 0 auto;
			}
			.active {
				.item_left,
				.item_right {
					color: #000;
				}
				.item_point {
					color: $gtProjectColor;
				}
			}
		}
		.info {
			.info_item {
				display: flex;
				justify-content: space-between;
				margin-top: 32rpx;
				.info_item_left {
					color: #909399;
				}
				.info_item_right {
					
				}
			}
		}
	}
</style>