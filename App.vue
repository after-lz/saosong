
<script>
	export default {
		onLaunch: function(options) {
			console.log(options);
			//    console.log('App Launch');

			uni.loadFontFace({
				global: true,
				family: 'PingFangSC-Medium',
				source: 'url("https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/font/PingFangSC-Medium.ttf")',
				success() {
					console.log('success')
				},
				complete(res) {
					console.log(res);
				}
			});
			uni.loadFontFace({
				global: true,
				family: 'PingFangSC-Regular',
				source: 'url("https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/font/PingFangSC-Regular.ttf")',
				success() {
					console.log('success')
				},
				complete(res) {
					console.log(res);
				}
			});

			var environment = '';
			uni.setStorageSync('scene', options.scene);

			uni.setStorageSync('environment', 'dev');
			// uni.setStorageSync('environment', 'prod');

			// #ifdef MP-WEIXIN
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				//    console.log('update',res.hasUpdate);
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
				//    console.log('新的版本下载失败');
			});

			// #endif


			// #ifdef MP-WEIXIN
			var res = uni.getAccountInfoSync();
			console.log(res);

			var appId = res.miniProgram.appId;
			var envVersion = res.miniProgram.envVersion;
			var version = res.miniProgram.version;


			var apiDomain = '';
			if (envVersion == 'release') {
				//    console.log('正式版生产环境');
				apiDomain = 'https://saasdemo.sansongkeji.com';
				uni.setStorageSync('environment', 'prod');

			} else {
				environment = uni.getStorageSync('environment');
				if (environment == 'prod') {
					//    console.log('开发版生产环境');
					apiDomain = 'https://saasdemo.sansongkeji.com';
					uni.setStorageSync('environment', 'prod');
				} else {
					   console.log('开发版开发环境');
					apiDomain = 'https://saasdemo.sansongkeji.com';
					// apiDomain = 'http://192.168.2.16:9080';
				}
			}

			if (envVersion == 'develop') {
				   console.log('测试版生产环境');
				apiDomain = 'https://saasdemo.sansongkeji.com';
				uni.setStorageSync('environment', 'prod');
			}
			// #endif
			
			
			
			// #ifdef APP-PLUS
			// var apiDomain = 'https://sansong.yingjiezj.com';
			// var apiDomain = 'https://orderapi.sansongkeji.com';
			var apiDomain = 'https://saasdemo.sansongkeji.com';
			
			uni.setStorageSync('environment', 'prod');
			// #endif


			// var apiDomain = 'https://sansong.yingjiezj.com';

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

						// console.log('launch login e');
						// console.log(res);
						// return false;
						if (res.statusCode == 200) {
							let data = res.data.data;
							// console.log(data.city_china);
							for (var i = 0; i < data.city_china.length; i++) {
								for (var j = 0; j < data.city_china[i].children.length; j++) {
									// console.log(data.city_china[i].children[j].city_name);
									for (var k = 0; k < data.city_china[i].children[j].children
										.length; k++) {
										data.city_china[i].children[j].children[k].selected = false;
									}
									data.city_china[i].children[j].selected = false;
								}
								data.city_china[i].selected = false;
							}

							uni.setStorageSync('pcaList', data.city_china);

						} else {
							console.log('App.vue ,sync pcaList Fail');
						}

					}
				});
			}
			let gt = this;

			// uni.setStorageSync('audioStatus', false);
			




			// #ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary")
			// #endif



			var url = "/logistics/app/get_global_data";
			uni.request({
				url: apiDomain + url,
				method: 'POST',
				success: (res) => {

					// console.log('launch login e');
					// console.log(res);
					// return false;
					if (res.statusCode == 200) {
						var data = res.data.data;
						uni.setStorageSync('licencesObj', data.xieyi)
					}
				}
			})
			
			// #ifdef MP-WEIXIN
				var openId = uni.getStorageSync('openId');
				if(!openId){
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes);
							var jsCode = loginRes.code;
							var url = '/api/wechat/get_miniprogram_openid';
							var data = {
								platform: 'logistics',
								code: jsCode
							};
							//    console.log('launch login s');
							uni.request({
								url: apiDomain + url,
								data: data,
								method: 'POST',
								success: (res) => {
									if (res.statusCode == 200) {
										let data = res.data;
										// console.log(data);
					
										uni.setStorageSync('openId', data.data
											.result.openid);
									
									} else {
										//    console.log('App.vue ,login Fail');
									}
					
								}
							});
						}
					});
				}
			
				
				
			// #endif
			
			var system = uni.getSystemInfoSync();
			console.log(system);

		},
		onShow: function(options) {
			//    console.log('App Show');
			let gt = this;
			

			uni.onNetworkStatusChange(function(res) {
				//    console.log(res.isConnected);
				//    console.log(res.networkType);
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
			console.log(appAuthorizeSetting);
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
			
			
			var mobile = uni.getStorageSync('mobile');
			if (mobile) {
				
				var environment = uni.getStorageSync('environment');
				var url = '';
				if (environment == 'prod') {
					url = 'wss://saasdemo.sansongkeji.com:3021';
				} else {
					url = 'wss://saasdemo.sansongkeji.com:3021';
				}
				
				
				gt.gtWSS.init(url);
			}


		},


		onHide: function() {
			//    console.log('App Hide')

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