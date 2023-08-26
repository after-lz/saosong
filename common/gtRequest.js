let navTo = function(url) {
	uni.navigateTo({
		url
	})
}
uni.navTo = navTo


function getToken() {
	// //    console.log('line2:getToken');

	const apiDomain = uni.getStorageSync('apiDomain');

	let tokenStr = 'token_d';

	var environment = uni.getStorageSync('environment');

	if (environment == 'prod') {
		tokenStr = 'token';
	}


	let token = uni.getStorageSync(tokenStr);

	return token;


}

function post(url, data = {}, rejectStatus = false) {
	// console.log('rejectStatus:', rejectStatus);
	const apiDomain = uni.getStorageSync('apiDomain');
	// //    console.log(apiDomain);

	// var tokenStr = 'token_d';
	// var tokenValidStr = 'tokenValid_d';

	// var environment = uni.getStorageSync('environment');

	// //    console.log(environment);

	// if (environment == 'prod') {
	// 	tokenStr = 'token';
	// 	tokenValidStr = 'tokenValid';
	// }


	var promise = new Promise(async function(resolve, reject) {
		var t = setTimeout(function() {
			uni.showLoading({
				title: '加载中……'
			});
		}, 800);
		// //    console.log(data);
		// return false;
		var token = await getToken();

		// console.log(url);
		// console.log(token);

		if (url != '/api/wechat/get_miniprogram_phone' && url != '/api/applogin/login_post' && url !=
			'/api/applogin/get_verify_code' && url != '/api/appgobal/get_ad_data' && url !=
			'/api/aliyun/get_mobile') {
			// if (token == '') {
			// 	clearTimeout(t);
			// 	uni.showModal({
			// 		title: '请您先登录',
			// 		showCancel: true,
			// 		success(res) {
			// 			if (res.confirm) {
			// 				uni.navTo('/pages/login/login');
			// 			}
			// 		}
			// 	})
			// 	return false;
			// } else {
				data.login_token = token;
			// }
		}


		uni.request({
			url: apiDomain + url,
			data: data,
			method: 'POST',
			success: function(res) {
				clearTimeout(t);
				uni.hideLoading();
				// console.log('接口返回：', res);



				var data = res.data;
				// var data = JSON.parse(data);
				// console.log(data);
				// console.log(data.code);

				if (data.status) {
					resolve(data.data);
				} else {
					if (data.code == '404') {
						uni.showModal({
							title: '提示',
							content: data.msg,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									// console.log('用户点击确定');
									uni.navTo('/pages/login/login')
								}
							}
						});
						return false;
					}
					if (data.code == '101') {
						uni.showModal({
							title: '提示',
							content: data.msg,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									// console.log('用户点击确定');
									uni.navTo('/pages/login/companyAuth')
								}
							}
						});
						return false;
					} else {
						if (rejectStatus) {
							reject(data.msg);
						} else {
							if(url == '/logistics/company/identify_business_license') {
								reject()
							} else {
								uni.showModal({
									title: '提示',
									content: data.msg || '服务器异常',
									showCancel: false,
								});
							}
							return false;
						}
					}
					return false;
				}
			},
			fail: function(res) {
				clearTimeout(t);
				uni.hideLoading();
				// console.log('失败', res);
				uni.showModal({
					title: '提示',
					content: "提交失败",
					showCancel: false
				});
				// reject("网络出错");
			}
		});
	});
	return promise;
}

function upload(file) {
	// console.log(file);
	const apiDomain = uni.getStorageSync('apiDomain');


	var t = setTimeout(function() {
		uni.showLoading({
			title: '上传中……'
		});
	}, 800);

	var promise = new Promise(function(resolve, reject) {

		var data = {
			// file: file.path,
			upload_file: 'customer',
			type: 'app',
			login_token: '',
			sign: file.sign,
		};
		// console.log(data);


		uni.uploadFile({
			url: apiDomain + '/api/upload/index',
			filePath: file.path,
			name: 'file',
			formData: data,
			success: function(res) {
				// console.log(res);
				clearTimeout(t);
				uni.hideLoading();

				var data = res.data;
				var data = JSON.parse(data);
				// console.log(data);
				// console.log(data.code);

				if (data.code == 1) {
					resolve(data.data);
				} else {
					reject(data.msg);
				}
			},
			fail: function(res) {
				// console.log(res);
				clearTimeout(t);
				uni.hideLoading();

				uni.showModal({
					title: '提示',
					content: "上传失败",
					showCancel: false
				});
			},
		});
	});
	return promise;
}



module.exports.getToken = getToken;
module.exports.post = post;
module.exports.upload = upload;