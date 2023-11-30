async function publicLogin() {
	await new Promise(function(resolve, reject){
		uni.login({
			"provider": "weixin",
			"onlyAuthorize": true, // 微信登录仅请求授权认证
			success: function(event){
				const {code} = event
				//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
				const apiDomain = uni.getStorageSync('apiDomain')
				uni.request({
				    url: apiDomain + '/api/applogin/wx_login', //仅为示例，并非真实接口地址。
				    data: {
				        code: event.code,
						platform: 'logistics'
				    },
				    success: (res) => {
				        //获得token完成登录
						let data = res.data.data.user
						let environment = uni.getStorageSync('environment')
						let tokenStr = environment == 'prod' ? 'token': 'token_d'
						uni.setStorageSync(tokenStr, data.login_token)
						uni.setStorageSync('user_info', data)
						uni.setStorageSync('userInfo', data)
						resolve(data)
				    }
				});
			},
			fail: function (err) {
		        // 登录授权失败  
		        // err.code是错误码
				reject(err)
		    }
		})
	}) 
}
module.exports.publicLogin = publicLogin