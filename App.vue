
<script>
	export default {
		onLaunch: function(options) {
			let token = uni.getStorageSync('userInfo')
			if(!token.login_token){
				uni.reLaunch({
					url: "/pages/login/login"
				})
			}
			// uni.setInnerAudioOption({
			// 	obeyMuteSwitch: false
			// });
			uni.loadFontFace({
				global: true,
				family: 'PingFangSC-Medium',
				source: 'url("https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/font/PingFangSC-Medium.ttf")',
				success() {},
				complete(res) {}
			});
			uni.loadFontFace({
				global: true,
				family: 'PingFangSC-Regular',
				source: 'url("https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/font/PingFangSC-Regular.ttf")',
				success() {},
				complete(res) {}
			});
			var environment = '';
			uni.setStorageSync('scene', options.scene);
			// uni.setStorageSync('environment', 'dev');
			// uni.setStorageSync('environment', 'prod');
			
			
			// #ifdef MP-WEIXIN
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				// console.log('update', res.hasUpdate);
			});
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				// console.log('新的版本下载失败');
			});
			// #endif


			// #ifdef MP-WEIXIN
			var res = uni.getAccountInfoSync();
			var appId = res.miniProgram.appId;
			var envVersion = res.miniProgram.envVersion;
			var version = res.miniProgram.version;
			var apiDomain = '';
			if (envVersion == 'release') {
				// console.log('正式版生产环境');
				apiDomain = 'https://saasdemo.sansongkeji.com';
				// apiDomain = "http://test.sansongkeji.com";
				uni.setStorageSync('environment', 'prod');
			} 
			else {
				environment = uni.getStorageSync('environment');
				if (environment == 'prod') {
					// console.log('开发版生产环境');
					apiDomain = 'https://saasdemo.sansongkeji.com';
					// apiDomain = "http://test.sansongkeji.com";
					// uni.setStorageSync('environment', 'prod');
				} else {
					// console.log('开发版开发环境');
					apiDomain = 'https://saasdemo.sansongkeji.com';
					// apiDomain = "http://test.sansongkeji.com";
					// uni.setStorageSync('environment', 'dev');
				}
			}
			if (envVersion == 'develop') {
				// console.log('测试版生产环境');
				// apiDomain = 'https://saasdemo.sansongkeji.com';
				apiDomain = "http://test.sansongkeji.com";
				// uni.setStorageSync('environment', 'prod');
				uni.setStorageSync('environment', 'dev');
			}
			// #endif
			
			
			// #ifdef APP-PLUS
			// var apiDomain = 'http://test.sansongkeji.com';
			// uni.setStorageSync('environment', 'dev');
			var apiDomain = 'https://saasdemo.sansongkeji.com';
			uni.setStorageSync('environment', 'prod');
			// #endif

			var apiDomainStorage = uni.getStorageSync('apiDomain');
			if (!apiDomainStorage) {
				uni.setStorageSync('apiDomain', apiDomain);
			} else {
				if (apiDomainStorage != apiDomain) {
					uni.setStorageSync('apiDomain', apiDomain);
				}
			}
			var pcaList = uni.getStorageSync('pcaList');
			if (!pcaList) {
				var url = '/api/appgobal/get_city_data';
				uni.request({
					url: apiDomain + url,
					method: 'POST',
					success: (res) => {
						if (res.statusCode == 200) {
							let data = res.data.data;
							// console.log(data.city_china);
							for (var i = 0; i < data.city_china.length; i++) {
								for (var j = 0; j < data.city_china[i].children.length; j++) {
									// console.log(data.city_china[i].children[j].city_name);
									for (var k = 0; k < data.city_china[i].children[j].children.length; k++) {
										data.city_china[i].children[j].children[k].selected = false;
									}
									data.city_china[i].children[j].selected = false;
								}
								data.city_china[i].selected = false;
							}
							uni.setStorageSync('pcaList', data.city_china);
						} else {
							// console.log('App.vue ,sync pcaList Fail');
						}
					}
				});
			}
			let gt = this;
			// uni.setStorageSync('audioStatus', false);
			

			// #ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary")
			// #endif


			// var url = "/logistics/app/get_global_data";
			// uni.request({
			// 	url: apiDomain + url,
			// 	method: 'POST',
			// 	success: (res) => {
			// 		if (res.statusCode == 200) {
			// 			var data = res.data.data;
			// 			uni.setStorageSync('licencesObj', data.xieyi)
			// 		}
			// 	}
			// })
			
			// #ifdef MP-WEIXIN
				var openId = uni.getStorageSync('openId');
				if(!openId){
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							var jsCode = loginRes.code;
							var url = '/api/wechat/get_miniprogram_openid';
							var data = {
								platform: 'logistics',
								code: jsCode
							};
							uni.request({
								url: apiDomain + url,
								data: data,
								method: 'POST',
								success: (res) => {
									if (res.statusCode == 200) {
										let data = res.data;
										uni.setStorageSync('openId', data.data.result.openid);
									}
								}
							});
						}
					});
				}
			// #endif
			
			var system = uni.getSystemInfoSync();
			var mobile = uni.getStorageSync('mobile');
			if (mobile) {
				console.log("App")
				let ws_url = uni.getStorageSync('environment') == 'prod' ? 'wss://saasdemo.sansongkeji.com:3021' : 'wss://test.sansongkeji.com:8021'
				gt.gtWSS.setWsUrl(ws_url);
				gt.gtWSS.init();
			}
		},
		onShow: function(options) {
			let gt = this;
			uni.onNetworkStatusChange(function(res) {
				// console.log(res.isConnected);
				// console.log(res.networkType);
				if (res.networkType == 'none') {
					uni.showModal({
						title: '网络异常',
						content: '请确认您的设备网络连接状态！',
						showCancel: false
					})
				}
			});


			// #ifdef APP-PLUS
			const appAuthorizeSetting = uni.getAppAuthorizeSetting();
			// console.log(appAuthorizeSetting);
			if(appAuthorizeSetting.albumAuthorized == 'denied'){
				// uni.showModal({
				// 	title:'授权失败',
				// 	content:'请打开相册授权',
				// 	showCancel:false,
				// })
			}
			if(appAuthorizeSetting.cameraAuthorized == 'denied'){
				// uni.showModal({
				// 	title:'授权失败',
				// 	content:'请打开摄像头授权',
				// 	showCancel:false,
				// })
			}
			// #endif
			
			
			// var mobile = uni.getStorageSync('mobile');
			// if (mobile) {
			// 	console.log("App")
			// 	let ws_url = uni.getStorageSync('environment') == 'prod' ? 'wss://saasdemo.sansongkeji.com:3021' : 'wss://test.sansongkeji.com:8021'
			// 	gt.gtWSS.setWsUrl(ws_url);
			// 	gt.gtWSS.init();
			// }
		},
		onHide: function() {
			// 0'=>'创建订单货物图片
			// 9'=>'发车图片
			// 13'=>'回单图片
			// 15'=>'签收凭证图片
			// "16'=>'电子签名图片"
			// 体验版:1.1.1
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "static/uview/index.scss";
	// @import "static/iconfont/iconfont.css";
	// @font-face{
	// 	font-family:PingFangSC-Medium;
	// 	font-weight:normal;
	// 	font-style:normal;
	// 	src:url("/static/font/PingFangSC-Medium.ttf")format("truetype");
	// }
</style>