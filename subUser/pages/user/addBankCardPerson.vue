<template>
	<view class="gt_content">

		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>

		<view class="con_title">
			<text>请绑定持卡人本人的银行卡</text>
		</view>
		<view class="con_card">
			<view class="con_key_val">
				<view class="con_key">
					<view class="con_text">
						<text>持卡人</text>
					</view>
				</view>
				<view class="con_val">
					<view class="con_input">
						<u-input v-model="name" placeholder="请输入持卡人姓名" height="40" :clearable="false" />
					</view>
				</view>
			</view>
			<view class="con_line">
				<u-line length="670rpx" color="#F2F2F2" margin="24rpx 0"></u-line>
			</view>
			<view class="con_key_val">
				<view class="con_key">
					<view class="con_text">
						<text>卡号</text>
					</view>
				</view>
				<view class="con_val">
					<view class="con_input">
						<u-input v-model="num" type="number" placeholder="请输入银行卡号" height="40" :clearable="false" />
					</view>
				</view>
			</view>
		</view>
		<view class="con_btn" @click="submitBankCard">
			<text>提交</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				num: '',
			}
		},
		methods: {

			submitBankCard() {
				let gt = this;
				if (gt.name == '') {
					gt.$refs.uToast.show({
						title: '持卡人姓名不能为空',
						type: 'error',
					});
					return false;
				}

				if (gt.num == '') {
					gt.$refs.uToast.show({
						title: '银行卡号不能为空',
						type: 'error',
					});
					return false;
				}

				var bin = require('bankcardinfo');
				bin.getBankBin(gt.num).then(res => {
					// console.log('76:',res);
					// return false;

					var cardType = 0;
					if (res.cardType == 'DC') {
						cardType = 1;
					}
					if (res.cardType == 'CC') {
						cardType = 2;
					}

					var url = "/logistics/userbank/add_bank";
					var data = {
						bank_card_type: cardType,
						bank_type: 1,
						bank_name: res.bankName,
						bank_truename: gt.name,
						bank_number: gt.num,

					};
					gt.gtRequest.post(url, data).then(res => {
						gt.$refs.uToast.show({
							title: '添加成功',
							type: 'success',
							back: true,
						});
					});


				}).catch(res => {
					console.log(res);
					gt.$refs.uToast.show({
						title: '银行卡号异常',
						type: 'error',
					});
					return false;
				});




			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.con_title {
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 44rpx;
			margin-top: 60rpx;
			text-align: center;
		}

		.con_card {
			width: 718rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin: 60rpx 16rpx;
			padding: 32rpx 24rpx;

			.con_key_val {
				display: flex;

				.con_key {
					width: 100rpx;

					.con_text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 40rpx;
					}
				}

				.con_val {
					margin-left: 40rpx;
				}
			}
		}

		.con_btn {
			margin-top: 180rpx;
			margin-left: 16rpx;
			width: 718rpx;
			height: 100rpx;
			background: $gtProjectColor;
			border-radius: 16rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 100rpx;
			text-align: center;
		}
	}
</style>