<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				second: 60,
				agree: false,
			}
		},
		onLoad() {
			let gt = this;
			const aLiSDKModule = uni.requireNativePlugin('AliCloud-NirvanaPns');
			aLiSDKModule.setAuthSDKInfo("nuSoCAyVUhncSswb4cw2uxSalCqa+zkg4MlGvgZCtOj0BIL4wUzfoVkaqb2N5CKnOr/zraacnhA7yC5lsD2Qd07KLFnRb/HIT0ZsF9+/p4iIypFpS1xop0bNgLkBRJTFjOaH+uNV4dPUYE676ltjw9MdI2P9qcB1cN9AKtMsNTzTkh0/pEAkiRyHXleUGoR54pEH3hYLU5uuaSXV5ZZ6iaa+6XxYT08LkYOqj9EBU6RJy7xVJqL3SBWP1qBIgZ7tRJl98wAbGCNvZX2tVq+AAA==");
			
			aLiSDKModule.accelerateLoginPage(5000, (result) => {
			  if ("600000" == result.resultCode) {
			    console.log("加速成功");
			  }
			});
		},
		methods: {
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
					let ws_url = uni.getStorageSync('environment') == 'prod' ? 'wss://saasdemo.sansongkeji.com:3021' : 'wss://test.sansongkeji.com:8021'
					gt.gtWSS.setWsUrl(ws_url);
					gt.gtWSS.init();
					
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
			.con_title {
				font-size: 44rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 60rpx;
				margin-top: 48rpx;
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
</style>