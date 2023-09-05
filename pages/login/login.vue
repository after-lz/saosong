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
				<button class="con_loginBtn" :open-type="agree ? 'getPhoneNumber':''"
					@getphonenumber="getPhoneNumberCode" :style="agree ? '' : 'opacity:0.5'"
					@click="showAgreeTip">一键登录</button>
				<!-- </view> -->
				<view class="con_mobileBtn" @click="goMobileLogin">
					<text>切换手机号登录</text>
				</view>
			</view>
			<view class="con_agreement">
				<button open-type="agreePrivacyAuthorization" @click="agree = !agree" class="authorBtn" plain="true">
					<u-checkbox v-model="agree" active-color="#485EF4"></u-checkbox>
				</button>
				<view class="con_agreement_msg">
					<text>我已阅读并同意</text>
					<text style="color:#485EF4;" @click.stop="gtCommon.goLicence(licencesObj.logistics_yonghu_xieyi_url)">《用户协议》</text>
					<text>和</text>
					<text style="color:#485EF4;" @click.stop="gtCommon.goLicence(licencesObj.logistics_yinsi_xieyi_url)">《隐私协议》</text>
					<text>并授权伞送获得本机号码</text>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<view class="con_type2" v-if="type == 2">
			<view class="con_title">
				<text @longpress="envVersion_show = true">手机号登录</text>
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
				<button open-type="agreePrivacyAuthorization" @click="agree = !agree" class="authorBtn" plain="true">
					<u-checkbox v-model="agree" active-color="#485EF4"></u-checkbox>
				</button>
				<view class="con_agreement_msg">
					<text>我已阅读并同意</text>
					<text style="color:#485EF4;" @click.stop="gtCommon.goLicence(licencesObj.logistics_yonghu_xieyi_url)">《用户协议》</text>
					<text>和</text>
					<text style="color:#485EF4;" @click.stop="gtCommon.goLicence(licencesObj.logistics_yinsi_xieyi_url)">《隐私协议》</text>
					<text>并授权伞送获得本机号码</text>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="con_type_3">
			<!-- <text>手机号一键登录</text> -->
		</view>
		<!-- #endif -->
		<u-select v-model="envVersion_show" :list="list" @confirm="onChange"></u-select>
	</view>
</template>

<script>
	import gtCommon from "../../common/gtCommon.js";
	// #ifdef APP-PLUS
	var aLiSDKModule = uni.requireNativePlugin('AliCloud-NirvanaPns')
	// console.log(101, aLiSDKModule);
	let platform = uni.getSystemInfoSync().platform
	// console.log(platform);
	// sdkInfo 是从阿里云控制台获取的秘钥
	if(platform == 'android'){
		var sdkInfo = 'XWWadiXN9QMYtCvhf1VpPHn8M/n6Sbi6ccumZdQ/DlLOQ6efO2q0x079orWTgxjz+911RkUFkGMrIY+WtUA5Njs4iAHds+HsU1HYNLTSOhnzBb9OsWeRjJGNrhr6H4iXwjDdyNyMV5QYyoFlBlui7+53D1n7lsyvrZwqGbua8zzbB2zf4xLZlMZhi26w6rbdK5iKwCC9lSUjM5lM7QOeNLiJqRZqWpuUfUyVVtsrpxNwk8ksOGLByWGu3Frg6/Iv9VAQEE7mv3PE0Bv0tGxTI+GFgt7smrfsDm7H36lImGapbB+P7jTela731ykDFhP4';
	}
	if(platform == 'ios'){
		var sdkInfo = 'nuSoCAyVUhncSswb4cw2uxSalCqa+zkg4MlGvgZCtOj0BIL4wUzfoVkaqb2N5CKnOr/zraacnhA7yC5lsD2Qd07KLFnRb/HIT0ZsF9+/p4iIypFpS1xop0bNgLkBRJTFjOaH+uNV4dPUYE676ltjw9MdI2P9qcB1cN9AKtMsNTzTkh0/pEAkiRyHXleUGoR54pEH3hYLU5uuaSXV5ZZ6iaa+6XxYT08LkYOqj9EBU6RJy7xVJqL3SBWP1qBIgZ7tRJl98wAbGCNvZX2tVq+AAA==';
	}
	aLiSDKModule.setAuthSDKInfo(sdkInfo);
	// #endif
	export default {
		data() {
			return {
				type: 1,
				mobile: '',
				code: '',
				second: 60,
				agree: false,
				licencesObj: {},
				authUiConfig: {
					uiConfig: {
						setNavHidden: true,
						// setNavUi: {
						// 	bgColor:'#fff',
						// 	returnImgHidden: true
						// },
						setLogoUi: {
							imgPath: 'static/img/logo.png',
							y: '80',
							// x:'85',
							// width:'200',
							// height:'100',
							// imgPath: gtCommon.getOssImg('login/logo.png')
						},
						setSloganUi: {
							text: '发货 找物流 就上 伞送',
							y: '160'
						}
					}
				},
				envVersion_show: false,
				list: [
					{value: "http://test.sansongkeji.com", label: 'dev' },
					{value: 'https://saasdemo.sansongkeji.com', label: 'prod' }
				]
			}
		},
		onLoad() {
			let gt = this;
			// gt.licencesObj = uni.getStorageSync('licencesObj');
			gt.licencesObj = {
				logistics_yinsi_xieyi_url: 'https://saasdemo.sansongkeji.com/adminsite/#/agreement/privacyPolicy',
				logistics_yonghu_xieyi_url: 'https://saasdemo.sansongkeji.com/adminsite/#/agreement/userProtocol'
			}
		},
		onShow(){
			// #ifdef APP-PLUS
			let gt = this;
			// gt.goMobileLogin();
			// gt.type = 3;
			gt.getLoginToken_ali();
			// #endif
		},
		methods: {
			onChange(e) {
				let gt = this
				uni.setStorageSync('environment', e[0].label)
				uni.setStorageSync('apiDomain', e[0].value);
			},
			getLoginToken_ali() {
				// 这里我是用了一个按钮触发这个方法，你也可以选择页面加载后就执行。
				let gt = this;
				// console.log('authUiConfig:', gt.authUiConfig);
				aLiSDKModule.accelerateLoginPage(5000, result => {
					if ("600000" == result.resultCode) {
						console.log("加速成功")
					}
				})
				aLiSDKModule.getLoginToken(5000,
					gt.authUiConfig,
					tokenResult => {
						// console.log(tokenResult, 'tokenResult');
						if ("600001" == tokenResult.resultCode) {
							// console.log("授权页拉起成功")
						} else if ("600000" == tokenResult.resultCode) {
							// console.log("获取Token成功，接下来拿着结果里面的Token去服务端换取手机号码，SDK服务到此结束")
							var url = "/api/aliyun/get_mobile";
							var data = {
								platform:'logistics',
								accessToken:tokenResult.token
							};
							gt.gtRequest.post(url,data).then(res=>{
								// console.log(res);
								var url = "/api/applogin/login_post";
								var data = {
									platform: 'logistics',
									login_type: 1,
									mobile: res.mobile,
								};
								gt.gtRequest.post(url, data).then(rs => {
									// console.log(rs);
									//手动关闭授权页
									aLiSDKModule.quitLoginPage()
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
									if (rs.user.logistics_id) {
										var url = "/logistics/company/get_company_info";
										gt.gtRequest.post(url).then(r => {
											uni.setStorageSync('companyInfo', r.company_info);
										});
									}
									let ws_url = uni.getStorageSync('environment') == 'prod' ? 'wss://saasdemo.sansongkeji.com:3021' : 'wss://test.sansongkeji.com:8021'
									gt.gtWSS.setWsUrl(ws_url);
									gt.gtWSS.init();
									// if (rs.user.is_approve == 0) {
									// 	gt.$refs.uToast.show({
									// 		title: '登录成功！',
									// 		type: 'success',
									// 		url: 'pages/login/peopleAuth',
									// 	});
									// } else {
										if (rs.user.is_company_approve == 0 || rs.user.is_company_approve == null) {
											gt.gtRequest.post("/logistics/company/get_company_approve_info").then(res => {
												if(Object.prototype.toString.call(res.company_approve_info) === '[object Array]' || res.company_approve_info.status) {
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
													uni.reLaunch({
														url: pages[0].$page.fullPath
													});
												}
											})
										} else {
											gt.$refs.uToast.show({
												title: '登录成功！',
												type: 'success',
											});
											var pages = getCurrentPages();
											uni.reLaunch({
												url: pages[0].$page.fullPath
											});
										}
									// }
								})
							})
						} else if ("600007" == tokenResult.resultCode) {
							gt.type = 2;
						} else {
							//其他失败情况，手动关闭授权页
							aLiSDKModule.quitLoginPage()
							gt.type = 2;
						}
					},
					clickResult => {
						switch (clickResult.resultCode) {
							case "700000":
								// console.log("用户点击返回按钮")
								break
							case "700001":
								// console.log("用户切换其他登录方式")
								gt.type = 2;
								aLiSDKModule.quitLoginPage()
								break
							case "700002":
								// console.log("用户点击登录按钮")
								// gt.showAgreeTip();
								break
							case "700003":
								// console.log("用户点击checkBox")
								break
							case "700004":
								// console.log("用户点击协议")
								break
						}
					},
					customUiResult => {
						//这里回调的是自定义控件的点击事件，通过 customUiResult.widgetId 来识别自定义控件，然后做一些自己的处理
					}
				)
			},
			showAgreeTip() {
				let gt = this;
				if (!gt.agree) {
					uni.showModal({
						title: '请先同意协议',
						content: '使用本系统前请先同意协议',
						showCancel: true,
						cancelText: '不同意',
						confirmText: '我同意',
						success(res) {
							if (res.confirm) {
								gt.agree = true;
							}
						}
					})
					return false;
				}
			},
			getPhoneNumberCode(e) {
				let gt = this;
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					var code = e.detail.code;
					var url = "/api/wechat/get_miniprogram_phone";
					var data = {
						platform: 'logistics',
						code: code,
					};
					gt.gtRequest.post(url, data).then(res => {
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
							uni.setStorageSync('userInfo', rs.user);
							if (rs.user.logistics_id) {
								var url = "/logistics/company/get_company_info";
								gt.gtRequest.post(url).then(r => {
									uni.setStorageSync('companyInfo', r.company_info);
								});
							}
							let ws_url = uni.getStorageSync('environment') == 'prod' ? 'wss://saasdemo.sansongkeji.com:3021' : 'wss://test.sansongkeji.com:8021'
							gt.gtWSS.setWsUrl(ws_url);
							gt.gtWSS.init();
							// if (rs.user.is_approve == 0) {
							// 	gt.$refs.uToast.show({
							// 		title: '登录成功！',
							// 		type: 'success',
							// 		url: 'pages/login/peopleAuth',
							// 	});
							// } else {
								if (rs.user.is_company_approve == 0 || rs.user.is_company_approve == null) {
									gt.gtRequest.post("/logistics/company/get_company_approve_info").then(res => {
										if(Object.prototype.toString.call(res.company_approve_info) === '[object Array]'|| res.company_approve_info.status) {
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
											uni.reLaunch({
												url: pages[0].$page.fullPath
											});
										}
									})
								} else {
									gt.$refs.uToast.show({
										title: '登录成功！',
										type: 'success',
									});
									var pages = getCurrentPages();
									uni.reLaunch({
										url: pages[0].$page.fullPath
									});
								}
							// }
						})
					})
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
					type: 1,
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
			submitForm() {
				let gt = this;
				if (!gt.agree) {
					uni.showModal({
						title: '请先同意协议',
						content: '使用本系统前请先同意协议',
						showCancel: true,
						cancelText: '不同意',
						confirmText: '我同意',
						success(res) {
							if (res.confirm) {
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
				if (!gt.$u.test.code(gt.code, 4)) {
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
					verify_code: gt.code,
				};
				// #ifdef MP-WEIXIN
				data.openid = uni.getStorageSync('openId');
				// #endif
				gt.gtRequest.post(url, data).then(rs => {
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
					uni.setStorageSync('userInfo', rs.user);
					if (rs.user.logistics_id) {
						var url = "/logistics/company/get_company_info";
						gt.gtRequest.post(url).then(r => {
							uni.setStorageSync('companyInfo', r.company_info);
						});
					}
					let ws_url = uni.getStorageSync('environment') == 'prod' ? 'wss://saasdemo.sansongkeji.com:3021' : 'wss://test.sansongkeji.com:8021'
					gt.gtWSS.setWsUrl(ws_url);
					gt.gtWSS.init();
					// if (rs.user.is_approve == 0) {
					// 	gt.$refs.uToast.show({
					// 		title: '登录成功！',
					// 		type: 'success',
					// 		url: 'pages/login/peopleAuth',
					// 	});
					// } else {
						if (rs.user.is_company_approve == 0 || rs.user.is_company_approve == null) {
							gt.gtRequest.post("/logistics/company/get_company_approve_info").then(res => {
								if(Object.prototype.toString.call(res.company_approve_info) === '[object Array]' || res.company_approve_info.status) {
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
									uni.reLaunch({
										url: pages[0].$page.fullPath
									});
								}
							})
						} else {
							gt.$refs.uToast.show({
								title: '登录成功！',
								type: 'success',
							});
							var pages = getCurrentPages();
							uni.reLaunch({
								url: pages[0].$page.fullPath
							});
						}
					// }
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;

		.gt_content {
			button[plain] {
				border: 0
			}
			.authorBtn {
				background-color: transparent;
				padding: 0;
				text-align: left;
			}
			.con_type1 {
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
					margin: 44rpx 50rpx;
					display: flex;
					align-items: center;
					font-size: 28rpx;
				}
			}

			.con_type2 {
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
					margin: 44rpx 55rpx;
					display: flex;
					align-items: center;
					font-size: 28rpx;
				}

			}

		}
	}
</style>