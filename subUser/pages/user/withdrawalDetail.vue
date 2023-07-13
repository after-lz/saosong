<template>
	<view class="gt_content">
		<view class="con_icon">
			<u-icon name="clock-fill" color="#FFBF27" size="200" v-if="dataInfo.status == 0"></u-icon>
			<u-icon name="close-circle-fill" color="#FF6067" size="200" v-if="dataInfo.status == 5"></u-icon>
			<u-icon name="checkmark-circle-fill" color="#485EF4" size="200" v-if="dataInfo.status == 3"></u-icon>
		</view>
		<view class="con_text">
			<text>{{dataInfo.status_msg}}</text>
		</view>
		<view class="con_timeLine">

		</view>
		<view class="con_line">
			<u-line length="670rpx" color="#F2F2F2"></u-line>
		</view>

		<view class="con_key_val">
			<view class="con_key">
				<text>提现金额</text>
			</view>
			<view class="con_val">
				<text>￥{{dataInfo.money}}</text>
			</view>
		</view>
		<view class="con_key_val">
			<view class="con_key">
				<text>提现方式</text>
			</view>
			<view class="con_val">
				<text>{{dataInfo.bank_name}}</text>
				<text v-if="dataInfo.bank_id > 2"> (尾号{{item.bank_number.substr(-4)}})</text>
			</view>
		</view>
		<view class="con_key_val">
			<view class="con_key">
				<text>申请提现时间</text>
			</view>
			<view class="con_val">
				<text>{{gtCommon.formateTime(dataInfo.create_time,'YYYY-MM-DD HH:mm:SS')}}</text>
			</view>
		</view><view class="con_key_val" v-if="dataInfo.audit_time">
			<view class="con_key">
				<text>审核时间</text>
			</view>
			<view class="con_val">
				<text>{{gtCommon.formateTime(dataInfo.audit_time,'YYYY-MM-DD HH:mm:SS')}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				withdraw_id:0,
				dataInfo:{},
			}
		},
		onLoad(options) {
			let gt = this;
			gt.withdraw_id = options.withdraw_id;
		},
		onShow(){
			let gt = this;
			gt.getDataInfo();
		},
		methods: {
			getDataInfo(){
				let gt = this;
				var url = "/logistics/companywallet/get_withdraw_log_detail";
				var data = {
					withdraw_id:gt.withdraw_id,
				};
				gt.gtRequest.post(url,data).then(res=>{
					gt.dataInfo = res;
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;

		.gt_content {
			.con_icon {
				margin-top: 125rpx;
				margin-left: 275rpx;
			}
			.con_text{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 44rpx;
				margin-top: 32rpx;
				text-align: center;
			}
			
			.con_timeLine{
				height: 50rpx;
			}
			
			.con_key_val{
				display: flex;
				justify-content: space-between;
				margin-top: 32rpx;
				padding: 0 40rpx;
				.con_key{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					line-height: 40rpx;
				}
				.con_val{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 40rpx;
				}
			}
			
			
		}
	}
</style>