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
					<u-input v-model="money" type="digit" placeholder="请输入提现金额" height="40" />
				</view>
			</view>
			<view class="con_line">
				<u-line length="640rpx" color="#F2F2F2" margin="24rpx 0"></u-line>
			</view>
			<view class="con_tip">
				<text>可提现金额为{{totalMoney}}元</text>
				<text @click="allWithdrawal">全部提现</text>
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
						<text v-if="withdrawalMethod == 2">支付宝账户</text>
						<text v-if="withdrawalMethod == 3">{{bankNameNum}}</text>
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
				<text>预计7天到账，实际到账时间可以收款银行时间为准，如遇周末和节假日会顺延至下一个工作日</text>
			</view>
		</view>

		<view class="con_btn" @click="submitWithdrawal">
			<text>确认提现</text>
		</view>

		<view class="con_tex" @click="goWithdrawalList">
			<text>提现记录</text>
		</view>

		<view class="con_popup">
			<view class="con_method">
				<u-popup v-model="methodShow" mode="bottom" height="330" border-radius="24rpx 24rpx 0 0">
					<view class="con_list">
						<view class="con_methodItem" @click="confirmMethod(1)">
							<view class="con_icon">
								<image :src="gtCommon.getOssImg('user/wechatPayIcon.png')" mode="widthFix"></image>
							</view>
							<view class="con_text">
								<text>微信</text>
							</view>
						</view>
						<view class="con_line">
							<u-line length="750rpx" color="#EFEFEF"></u-line>
						</view>
						<!-- <view class="con_methodItem">
							<view class="con_icon">
								<image :src="gtCommon.getOssImg('user/alipayIcon.png')" mode="widthFix"></image>
							</view>
							<view class="con_text">
								<text>支付宝</text>
							</view>
						</view>
						<view class="con_line">
							<u-line length="750rpx" color="#EFEFEF"></u-line>
						</view> -->
						<view class="con_methodItem" @click="confirmMethod(3)">
							<view class="con_icon">
								<image :src="gtCommon.getOssImg('user/bankCardIcon.png')" mode="widthFix"></image>
							</view>
							<view class="con_text">
								<text>银行卡</text>
							</view>
						</view><!-- 
						<view class="con_line">
							<u-line length="750rpx" color="#EFEFEF"></u-line>
						</view> -->

						<!-- <view class="con_methodItem">
							<view class="con_text">
								<text>取消</text>
							</view>
						</view> -->
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
				money: '',
				totalMoney: 0,

				withdrawalMethod: 1,
				bankNameNum: '',
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
			gt.totalMoney = options.totalMoney;

			gt.getBankList();
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
						res.list[i].bankNameNum = res.list[i].bank_name + '(' + res.list[i].bank_number.substr(-
							4) + ')';
					}
					gt.bankList = res.list;
				});

			},
			allWithdrawal() {
				let gt = this;
				gt.money = gt.totalMoney;
			},
			showMethod() {
				let gt = this;
				gt.methodShow = true;
			},
			confirmMethod(index) {
				let gt = this;
				if (index != 3) {
					gt.withdrawalMethod = index;
				}
				if (index == 3) {
					if(gt.bankList.length == 0){
						gt.$refs.uToast.show({
							title: '请先添加银行卡',
							type: 'error',
							back: true,
						})
						return false;
					}else{
						gt.bankListShow = true;
					}
				}

				gt.methodShow = false;

			},
			bankCardConfirm(res) {
				console.log(res);
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
						back: true,
					})
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
							line-height: 44rpx;
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