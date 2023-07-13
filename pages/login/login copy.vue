<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		
		<!-- #ifdef MP-WEIXIN -->
		<view class="con_type1" v-if="type == 1">
			
			<view class="con_logo">
				<image :src="gtCommon.getOssImg('login/logo.png')" mode="widthFix"></image>
			</view>
			<view class="con_tip">
				<text>发货 找物流 就上 伞送</text>
			</view>
			<view class="con_btns">
				<!-- <view class="con_loginBtn"> -->
				<!-- <text>一键登录</text> -->
				<button class="con_loginBtn" :open-type="agree ? 'getPhoneNumber':''" @getphonenumber="getPhoneNumberCode"
					:style="agree ? '' : 'opacity:0.5'" @click="showAgreeTip">一键登录</button>
				<!-- </view> -->
				<view class="con_mobileBtn" @click="goMobileLogin">
					<text>切换手机号登录</text>
				</view>
			</view>
			<view class="con_agreement">
				<u-checkbox v-model="agree" active-color="#485EF4">
					<text>我已阅读并同意</text>
					<text style="color:#485EF4;"
						@click.stop="gtCommon.goLicence(licencesObj.logistics_yonghu_xieyi_url)">《用户协议》</text>
					<text>和</text>
					<text style="color:#485EF4;"
						@click.stop="gtCommon.goLicence(licencesObj.logistics_yinsi_xieyi_url)">《隐私协议》</text>
					<text>并授权伞送获得本机号码</text>
				</u-checkbox>
			</view>
			
			
			
		</view>
		<view class="con_type2" v-if="type == 2">
			<view class="con_title">
				<text>手机号登录</text>
			</view>
			<view class="con_areaCode_mobile">
				<view class="con_areaCode">
					<view class="con_text_icon">
						<view class="con_text">
							<text>+86</text>
						</view>
						<view class="con_icon">
							<u-icon name="arrow-down-fill" color="#909399" size="24"></u-icon>
						</view>
					</view>
				</view>
				<view class="con_mobile">
					<u-input v-model="mobile" type="number" height="50" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="con_code_sendBtn">
				<view class="con_code">
					<u-input v-model="code" type="number" height="50" placeholder="请输入验证码或密码" />
				</view>
				<view class="con_sendBtn" @click="sendCode">
					<text v-if="second == 60">获取验证码</text>
					<text v-else>{{second}}s后重发</text>
				</view>
			</view>
			
			<view class="con_loginBtn" :style="agree ? '' : 'background:#A3AEF9'" @click="submitForm">
				<text>登录</text>
			</view>
			<view class="con_agreement">
				<u-checkbox v-model="agree" active-color="#485EF4">
					<text>我已阅读并同意</text><text style="color:#485EF4;"@click.stop="gtCommon.goLicence(licencesObj.logistics_yonghu_xieyi_url)">《用户协议》</text>
					<text>和</text>
					<text style="color:#485EF4;"@click.stop="gtCommon.goLicence(licencesObj.logistics_yinsi_xieyi_url)">《隐私协议》</text>
					<text>并授权伞送获得本机号码</text>
				</u-checkbox>
			</view>
			
		</view>
		<!-- #endif -->
		
		
		<!-- #ifdef APP-PLUS -->
		
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// agree: false,
				// licencesObj: {},
				
				type:1,
				
				mobile: '',
				code: '',
				second: 60,
				agree: false,
				licencesObj: {},
			}
		},
		onLoad() {
			let gt = this;

			// #ifdef APP-PLUS
			gt.goMobileLogin();
			// #endif
			gt.licencesObj = uni.getStorageSync('licencesObj');
		},
		methods: {
			showAgreeTip() {
				console.log('showAgreeTip');

				let gt = this;
				if (!gt.agree) {
					uni.showModal({
						title: '请先同意协议',
						content: '使用本系统前请先同意协议',
						showCancel: true,
						cancelText: '不同意',
						confirmText: '我同意',
						success(res) {
							console.log(res);
							if (res.confirm) {
								gt.agree = true;
							}
						}
					})
					return false;
				}
			},
			getPhoneNumberCode(e) {
				console.log(e)

				let gt = this;
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					var code = e.detail.code;

					var url = "/api/wechat/get_miniprogram_phone";
					var data = {
						platform: 'logistics',
						code: code,
					};
					gt.gtRequest.post(url, data).then(res => {
						// console.log(res);

						var url = "/api/applogin/login_post";
						var data = {
							platform: 'logistics',
							login_type: 1,
							mobile: res.result.phone_info.phoneNumber,
						};

						// #ifdef MP-WEIXIN
						data.openid = uni.getStorageSync('openId');
						// #endif
						gt.gtRequest.post(url, data).then(rs => {
							// console.log(rs);

							var tokenStr = 'token_d';
							var tokenValidStr = 'tokenValid_d';

							var environment = uni.getStorageSync('environment');

							if (environment == 'prod') {
								tokenStr = 'token';
								tokenValidStr = 'tokenValid';
							}

							uni.setStorageSync(tokenStr, rs.user.login_token);


							uni.setStorageSync('mobile', rs.user.mobile);
							uni.setStorageSync('userAuth', rs.user.is_approve);
							uni.setStorageSync('companyAuth', rs.user.is_company_approve);
							// uni.setStorageSync('token', rs.user.login_token);
							uni.setStorageSync('userInfo', rs.user);

							var url = "/logistics/company/get_company_info";

							gt.gtRequest.post(url).then(r => {
								uni.setStorageSync('companyInfo', r.company_info);
							});
							
							
							var environment = uni.getStorageSync('environment');
							var url = '';
							if (environment == 'prod') {
								url = 'wss://orderapi.sansongkeji.com/wss';
							} else {
								url = 'wss://sansong.yingjiezj.com/wss';
							}

							gt.gtWSS.init(url);


							if (rs.user.is_approve == 0) {
								gt.$refs.uToast.show({
									title: '登录成功！',
									type: 'success',
									url: 'pages/login/peopleAuth',
								});
							} else {
								if (rs.user.is_company_approve == 0) {
									gt.$refs.uToast.show({
										title: '登录成功！',
										type: 'success',
										url: 'pages/login/companyAuth',
									});
								} else {
									gt.$refs.uToast.show({
										title: '登录成功！',
										type: 'success',
									});
									var pages = getCurrentPages();

									console.log(pages);
									uni.reLaunch({
										url: pages[0].$page.fullPath
									});
								}
							}
						});
					});
				}
			},
			goMobileLogin() {
				// uni.navigateTo({
				// 	url: './mobileLogin',
				// });
				// return false;
				
				let gt = this;
				gt.type = 2;
			},
			
			sendCode() {
				let gt = this;
				if (gt.second != 60) {
					return false;
				}
				
				
			
				if (!gt.$u.test.mobile(gt.mobile)) {
					gt.$refs.uToast.show({
						title: '手机号格式不正确！',
						type: 'error',
					});
					return false;
				}
			
				var url = "/api/applogin/get_verify_code";
				var data = {
					type:1,
					mobile: gt.mobile,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.timeOut();
				});
			},
			timeOut() {
				let gt = this;
				var sid = setInterval(function() {
					gt.second--;
					if (gt.second == 0) {
						gt.second = 60;
						clearInterval(sid);
					}
				}, 1000);
			},
			submitForm(){
				let gt = this;
				
				if(!gt.agree){
					uni.showModal({
						title:'请先同意协议',
						content:'使用本系统前请先同意协议',
						showCancel:true,
						cancelText:'不同意',
						confirmText:'我同意',
						success(res) {
							console.log(res);
							if(res.confirm){
								gt.agree = true;
							}
						}
					})
					return false;
				}
				if (!gt.$u.test.mobile(gt.mobile)) {
					gt.$refs.uToast.show({
						title: '手机号格式不正确！',
						type: 'error',
					});
					return false;
				}
				if (!gt.$u.test.code(gt.code,4)) {
					gt.$refs.uToast.show({
						title: '验证码格式不正确！',
						type: 'error',
					});
					return false;
				}
				
				var url = "/api/applogin/login_post";
				var data = {
					platform: 'logistics',
					login_type: 2,
					mobile: gt.mobile,
					verify_code:gt.code,
				};
				// #ifdef MP-WEIXIN
				data.openid = uni.getStorageSync('openId');
				// #endif
				gt.gtRequest.post(url,data).then(rs=>{
					var tokenStr = 'token_d';
					var tokenValidStr = 'tokenValid_d';
					
					var environment = uni.getStorageSync('environment');
					
					if (environment == 'prod') {
						tokenStr = 'token';
						tokenValidStr = 'tokenValid';
					}
					
					uni.setStorageSync(tokenStr, rs.user.login_token);
					// uni.setStorageSync(tokenStr, rs.user.unid);
					
					
					uni.setStorageSync('mobile', rs.user.mobile);
					uni.setStorageSync('userAuth', rs.user.is_approve);
					uni.setStorageSync('companyAuth', rs.user.is_company_approve);
					// uni.setStorageSync('token', rs.user.login_token);
					uni.setStorageSync('userInfo', rs.user);
					
					if(rs.user.logistics_id){
						var url = "/logistics/company/get_company_info";
						
						gt.gtRequest.post(url).then(r=>{
							uni.setStorageSync('companyInfo', r.company_info);
						});
					}
					var environment = uni.getStorageSync('environment');
					var url = '';
					if (environment == 'prod') {
						url = 'wss://orderapi.sansongkeji.com/wss';
					} else {
						url = 'wss://sansong.yingjiezj.com/wss';
					}
					gt.gtWSS.init(url);
					
					if (rs.user.is_approve == 0) {
						gt.$refs.uToast.show({
							title: '登录成功！',
							type: 'success',
							url: 'pages/login/peopleAuth',
						});
					} else {
						if (rs.user.is_company_approve == 0) {
							gt.$refs.uToast.show({
								title: '登录成功！',
								type: 'success',
								url: 'pages/login/companyAuth',
							});
						} else {
							gt.$refs.uToast.show({
								title: '登录成功！',
								type: 'success',
							});
							var pages = getCurrentPages();
					
							console.log(pages);
							uni.reLaunch({
								url: pages[0].$page.fullPath
							});
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;

		.gt_content {
			.con_type1{
				.con_logo {
					width: 284rpx;
					height: 130rpx;
					margin: 276rpx auto 0 auto;
				}
				
				.con_tip {
					font-size: 40rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #303133;
					line-height: 56rpx;
					margin-top: 16rpx;
					text-align: center;
				}
				
				.con_btns {
					margin-top: 408rpx;
				
					.con_loginBtn {
						width: 650rpx;
						height: 108rpx;
						background: $gtProjectColor;
						border-radius: 16rpx;
						font-size: 36rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 108rpx;
						text-align: center;
						margin-left: 50rpx;
					}
				
					.con_mobileBtn {
						width: 650rpx;
						height: 108rpx;
						background: #F3F4F6;
						border-radius: 16rpx;
						font-size: 36rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #909399;
						line-height: 108rpx;
						text-align: center;
						margin: 40rpx 50rpx 0 50rpx;
					}
				}
				
				.con_agreement {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					line-height: 34rpx;
					margin: 44rpx 50rpx;
				}
			}
			.con_type2{
				.con_title {
						font-size: 44rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 60rpx;
						margin-top: 248rpx;
						margin-left: 56rpx;
					}
				
					.con_areaCode_mobile {
						display: flex;
						width: 640rpx;
						height: 108rpx;
						background: #F6F6F6;
						border-radius: 16rpx;
						margin-top: 70rpx;
						margin-left: 56rpx;
				
						.con_areaCode {
							.con_text_icon {
								display: flex;
				
								.con_text {
									font-size: 36rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #000000;
									line-height: 50rpx;
									margin-top: 30rpx;
									margin-left: 40rpx;
								}
				
								.con_icon {
									margin-top: 34rpx;
									margin-left: 16rpx;
								}
							}
						}
				
						.con_mobile {
							margin-top: 30rpx;
							margin-left: 40rpx;
							font-size: 36rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							line-height: 50rpx;
						}
					}
				
					.con_code_sendBtn {
						display: flex;
						justify-content: space-between;
						width: 640rpx;
						height: 108rpx;
						background: #F6F6F6;
						border-radius: 16rpx;
						margin-top: 30rpx;
						margin-left: 56rpx;
				
						.con_code {
							font-size: 36rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							line-height: 50rpx;
							margin-top: 30rpx;
							margin-left: 40rpx;
						}
				
						.con_sendBtn {
							width: 160rpx;
							font-size: 32rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 44rpx;
							margin-top: 32rpx;
							margin-right: 32rpx;
						}
					}
				
					.con_loginBtn {
						width: 640rpx;
						height: 108rpx;
						background: $gtProjectColor;
						border-radius: 16rpx;
						font-size: 36rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 108rpx;
						text-align: center;
						margin-top: 132rpx;
						margin-left: 55rpx;
					}
				
					.con_agreement {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 34rpx;
						margin: 44rpx 55rpx;
					}
				
			}
			
		}
	}
</style>