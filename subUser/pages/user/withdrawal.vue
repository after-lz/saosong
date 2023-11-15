<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_card">
			<view class="con_title">
				<text>提现金额</text>
			</view>
			<view class="con_iconInput">
				<view class="con_icon">
					<text>￥</text>
				</view>
				<view class="con_input">
					<u-input v-model.number="money" type="digit" placeholder="最低提现金额20元" height="40" @blur="inputChange" />
				</view>
			</view>
			<view class="con_line">
				<u-line length="640rpx" color="#F2F2F2" margin="24rpx 0"></u-line>
			</view>
			<view class="warning" v-if="money > totalMoney">
				<text>输入金额超出零钱余额</text>
			</view>
			<view class="con_tip">
				<text>可提现金额为{{totalMoney}}元</text>
				<text @click="allWithdrawal" v-if="totalMoney >= 20">全部提现</text>
			</view>
		</view>
		<view class="con_card">
			<view class="con_title">
				<text>收款账户</text>
			</view>
			<view class="con_iconAccount_more" @click="showMethod">
				<view class="con_iconAccount">
					<view class="con_icon">
						<image :src="gtCommon.getOssImg('user/wechatPayIcon.png')" mode="widthFix"
							v-if="withdrawalMethod == 1"></image>
						<image :src="gtCommon.getOssImg('user/alipayIcon.png')" mode="widthFix"
							v-if="withdrawalMethod == 2"></image>
						<image :src="gtCommon.getOssImg('user/bankCardIcon.png')" mode="widthFix"
							v-if="withdrawalMethod == 3"></image>
					</view>
					<view class="con_account">
						<text v-if="withdrawalMethod == 1">微信账户</text>
						<text v-if="withdrawalMethod == 2">{{alipay||'支付宝账户'}}</text>
						<text v-if="withdrawalMethod == 3">{{bankNameNum||'请选择'}}</text>
					</view>
				</view>
				<view class="con_more">
					<u-icon name="arrow-right" color="#000" size="24"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="640rpx" color="#F2F2F2" margin="24rpx 0"></u-line>
			</view>
			<view class="con_tip">
				<text>预计次日到账，实际到账时间可以收款银行时间为准，如遇周末和节假日会顺延至下一个工作日</text>
			</view>
		</view>
		<view class="footer">
			<view class="left">
				<!-- <view class="left_item">
					<text>服务费：￥</text>
					<text v-if="money >= 20">{{ serviceCharge }}</text>
				</view>
				<view class="left_item">
					<text>预计到账：￥</text>
					<text v-if="money >= 20">{{ (money - serviceCharge).toFixed(2) || '' }}</text>
				</view> -->
				<view class="left_item">
					<text>预计到账：￥</text>
					<text v-if="withdrawalMethod == 2 && money >= 0.1">{{ money }}</text>
					<text v-if="withdrawalMethod == 3 && money >= 20">{{ money }}</text>
				</view> 
			</view>
			<view class="right">
				<u-button type="primary" :disabled="_disabled" @click="submitWithdrawal">立即提现</u-button>
			</view>
		</view>
		<!-- <view class="con_btn" @click="submitWithdrawal">
			<text>确认提现</text>
		</view>
		<view class="con_tex" @click="goWithdrawalList">
			<text>提现记录</text>
		</view> -->
		<view class="con_popup">
			<view class="con_method">
				<u-popup v-model="methodShow" mode="bottom" border-radius="24rpx 24rpx 0 0">
					<view class="con_list">
						<!-- <view class="con_methodItem" @click="confirmMethod(1)">
							<view class="con_icon">
								<image :src="gtCommon.getOssImg('user/wechatPayIcon.png')" mode="widthFix"></image>
							</view>
							<view class="con_text">
								<text>微信</text>
							</view>
						</view>
						<view class="con_line">
							<u-line length="750rpx" color="#EFEFEF"></u-line>
						</view> -->
						<view class="con_methodItem" @click="confirmMethod(2)">
							<view class="con_icon">
								<image :src="gtCommon.getOssImg('user/alipayIcon.png')" mode="widthFix"></image>
							</view>
							<view class="con_text">
								<text>支付宝</text>
							</view>
						</view>
						<view class="con_line">
							<u-line length="750rpx" color="#EFEFEF"></u-line>
						</view>
						<view class="con_methodItem" @click="confirmMethod(3)">
							<view class="con_icon">
								<image :src="gtCommon.getOssImg('user/bankCardIcon.png')" mode="widthFix"></image>
							</view>
							<view class="con_text">
								<text>银行卡</text>
							</view>
						</view>
						<view class="con_line">
							<u-line length="750rpx" color="#EFEFEF"></u-line>
						</view>
						<view class="con_methodItem" @click='methodShow = false'>
							<view class="con_text">
								<text>取消</text>
							</view>
						</view>
					</view>
				</u-popup>
			</view>
		</view>
		<view class="con_select">
			<u-select v-model="bankListShow" :list="bankList" label-name="bankNameNum" value-name="bank_id"
				@confirm="bankCardConfirm"></u-select>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: undefined,
				totalMoney: 0,
				withdrawalMethod: 3,
				bankNameNum: '',
				alipay: '',
				bankCardId: 0,
				openId: '',
				bankList: [],
				methodShow: false,
				bankListShow: false,
			}
		},
		onLoad(options) {
			let gt = this;
			// var openId = uni.getStorageSync('openId');
			// gt.openId = openId;
			gt.totalMoney = JSON.parse(options.totalMoney);
			gt.getBankList();
		},
		computed: {
			_disabled() {
				let gt = this
				if(gt.withdrawalMethod == 1) {
					return true
				} else if(gt.withdrawalMethod == 2) {
					let flag = !gt.money || gt.money < 0.1 || gt.totalMoney < 0.1 || gt.money > gt.totalMoney
					return flag || !gt.alipay
				} else {
					let flag = !gt.money || gt.money < 20 || gt.totalMoney < 20 || gt.money > gt.totalMoney
					return flag || !gt.bankCardId
				}
			},
			// serviceCharge() {
			// 	let gt = this
			// 	let num = gt.money || 0
			// 	let min = num * 0.001 >= 1 ? num * 0.001 : 1
			// 	return parseFloat((num * 0.01).toFixed(2)) + parseFloat(min.toFixed(2))
			// }
		},
		methods: {
			getBankList() {
				let gt = this;
				var url = "/logistics/userbank/get_bank_list";
				var data = {
					page: 1,
					limit: 9999,
				};
				gt.gtRequest.post(url, data).then(res => {
					for (var i = 0; i < res.list.length; i++) {
						res.list[i].bankNameNum = res.list[i].bank_name + '(' + res.list[i].bank_number.substr(-4) + ')';
					}
					gt.bankList = res.list;
				});
			},
			inputChange(e) {
				let gt = this
				if(+e > 0 && +e <= 9999999) {
					gt.money = e.match(/\d+\.?\d{0,2}/, '')[0]
				} else if(+e > 9999999) {
					gt.money = 9999999
				} else if(+e <= 0) {
					gt.money = 0
				}
			},
			allWithdrawal() {
				let gt = this;
				gt.money = gt.totalMoney;
			},
			showMethod() {
				let gt = this;
				gt.methodShow = true;
				// gt.confirmMethod(3)
			},
			confirmMethod(index) {
				let gt = this;
				if (index == 2) {
					let alipay = uni.getStorageSync("user_info").alipay
					if(!alipay) {
						return gt.$refs.uToast.show({
							title: '请先绑定支付宝',
							type: 'error'
						})
					} else {
						gt.withdrawalMethod = index;
						gt.alipay = alipay
					}
				}
				if (index == 3) {
					if(gt.bankList.length == 0){
						return gt.$refs.uToast.show({
							title: '请先添加银行卡',
							type: 'error',
							// back: true,
						})
					} else {
						gt.bankListShow = true;
					}
				}
				gt.methodShow = false;
			},
			bankCardConfirm(res) {
				let gt = this;
				gt.withdrawalMethod = 3;
				gt.bankNameNum = res[0].label;
				gt.bankCardId = res[0].value;
			},
			submitWithdrawal() {
				let gt = this;
				var url = "/logistics/companywallet/apply_withdraw";
				var data = {
					number: gt.money,
					wallet_type: 'money01',
					shoukuan_method: gt.withdrawalMethod != 3 ? gt.withdrawalMethod : gt.bankCardId,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.$refs.uToast.show({
						title: '提交成功',
						type: 'success',
						// back: true,
					})
					setTimeout(()=> {
						uni.redirectTo({
							url: './balanceWithdrawal?withdraw_id=' + res.withdraw_id
						})
					}, 1500)
					return false;
				});
			},
			goWithdrawalList() {
				let gt = this;
				uni.navigateTo({
					url: './withdrawalList',
				});
				return false;
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_card {
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				padding: 32rpx 40rpx;
				margin: 20rpx 16rpx;

				.con_title {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 40rpx;
				}

				.con_iconInput {
					display: flex;
					margin-top: 48rpx;

					.con_icon {
						font-size: 40rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 40rpx;
					}

					.con_input {
						width: 600rpx;
					}
				}

				.con_iconAccount_more {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.con_iconAccount {
						display: flex;
						margin-top: 40rpx;

						.con_icon {
							width: 60rpx;
							height: 60rpx;
						}

						.con_account {
							font-size: 32rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 60rpx;
							margin-left: 32rpx;
						}
					}

					.con_more {
						margin-top: 36rpx;
					}
				}

				.con_tip {
					margin-top: 18rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					line-height: 40rpx;

					text:nth-child(2) {
						margin-left: 20rpx;
						color: $gtProjectColor;
					}
				}
				
				.warning {
					color: #d9001b;
					margin-left: 35rpx;
				}
			}
			
			.footer {
				width: 100%;
				padding: 40rpx;
				position: fixed;
				bottom: 0;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				.left {
					.left_item {
						margin: 10rpx 0;
						&:nth-child(1) {
							color: #909399;
							font-size: 26rpx;
						}
					}
				}
				.right {
					width: 300rpx;
				}
			}
			
			.con_btn {
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
				margin-top: 286rpx;
				margin-left: 16rpx;
			}
			.con_tex{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 40rpx;
				margin-top: 32rpx;
				text-align: center;
			}

			.con_popup {
				.con_method {
					.con_list {
						.con_methodItem {
							display: flex;
							justify-content: center;
							height: 165rpx;

							.con_icon {
								width: 60rpx;
								height: 60rpx;
								// border: 1rpx solid red;
								margin-top: 52rpx;
							}

							.con_text {
								font-size: 32rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #333333;
								line-height: 44rpx;
								margin-left: 16rpx;
								margin-top: 60rpx;
							}
						}
					}
				}
			}
		}
	}
</style>