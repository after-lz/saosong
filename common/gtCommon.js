function getOssImg(path) {
	var imgPath = 'https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/' + path;
	return imgPath;
}

function formateTime(datetime, formatStr = 'YYYY-MM-DD') {
	var dat = new Date(datetime * 1000);
	var str = formatStr;
	var Week = ['日', '一', '二', '三', '四', '五', '六'];
	str = str.replace(/yyyy|YYYY/, dat.getFullYear());
	str = str.replace(/yy|YY/, (dat.getYear() % 100) > 9 ? (dat.getYear() % 100).toString() : '0' + (dat.getYear() %
		100));
	str = str.replace(/MM/, dat.getMonth() >= 9 ? (dat.getMonth() + 1).toString() : '0' + (dat.getMonth() + 1));
	str = str.replace(/M/g, (dat.getMonth() + 1));
	str = str.replace(/w|W/g, Week[dat.getDay()]);
	str = str.replace(/dd|DD/, dat.getDate() > 9 ? dat.getDate().toString() : '0' + dat.getDate());
	str = str.replace(/d|D/g, dat.getDate());
	str = str.replace(/hh|HH/, dat.getHours() > 9 ? dat.getHours().toString() : '0' + dat.getHours());
	str = str.replace(/h|H/g, dat.getHours());
	str = str.replace(/mm/, dat.getMinutes() > 9 ? dat.getMinutes().toString() : '0' + dat.getMinutes());
	str = str.replace(/m/g, dat.getMinutes());
	str = str.replace(/ss|SS/, dat.getSeconds() > 9 ? dat.getSeconds().toString() : '0' + dat.getSeconds());
	str = str.replace(/s|S/g, dat.getSeconds());
	return str
}

function getPreMonthDay(date) {
	var arr = date.split('-');
	var year = arr[0]; //获取当前日期的年份  
	var month = arr[1]; //获取当前日期的月份  
	var day = arr[2]; //获取当前日期的日  
	var days = new Date(year, month, 0);
	days = days.getDate(); //获取当前日期中月的天数  
	var year2 = year;
	var month2 = parseInt(month) - 1;
	if (month2 == 0) {
		year2 = parseInt(year2) - 1;
		month2 = 12;
	}
	var day2 = day;
	var days2 = new Date(year2, month2, 0);
	days2 = days2.getDate();
	if (day2 > days2) {
		day2 = days2;
	}
	if (month2 < 10) {
		month2 = '0' + month2;
	}
	var t2 = year2 + '-' + month2 + '-' + day2;

	var t3 = this.formateTime(new Date(t2).getTime() + 86400 * 1000, 'YYYY-MM-DD');
	return t3;
}

function arrToStr(arr) {
	var res = arr.toString();
	//    console.log(res);
}

function gtToFixex(num, length) {
	var res = num.toFixed(length);
	//    console.log(res);
	return res;
}

function arrSort(arr, sort) {
	for (var i = 0; i < arr.length - 1; i++) {
		for (var j = 0; j < arr.length - i - 1; j++) {
			if (parseInt(arr[j + 1][sort]) > parseInt(arr[j][sort])) {
				// //    console.log(arr[j][sort], arr[j + 1][sort])
				var c = arr[j + 1]
				arr[j] = arr[j]
				arr[j + 1] = c
			}
		}
	}
	// //    console.log(arr);
	return arr;
}


function formatnumber(value, num) {
	var a, b, c, i;
	a = value.toString();
	b = a.indexOf(".");
	c = a.length;
	if (num == 0) {
		if (b != -1) {
			a = a.substring(0, b);
		}
	} else { //如果没有小数点
		if (b == -1) {
			a = a + ".";
			for (i = 1; i <= num; i++) {
				a = a + "0";
			}
		} else { //有小数点，超出位数自动截取，否则补0
			a = a.substring(0, b + num + 1);
			for (i = c; i <= b + num; i++) {
				a = a + "0";
			}
		}
	}
	return a;
}

//秒数转化为时分秒
function formatSeconds(value) {
	// console.log(value);
	var secondTime = parseInt(value); // 秒
	var minuteTime = 0; // 分
	var hourTime = 0; // 小时
	if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60);
		//获取秒数，秒数取余，得到整数秒数
		secondTime = parseInt(secondTime % 60);
		//如果分钟大于60，将分钟转换成小时
		if (minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60);
			//获取小时后取余的分，获取分钟除以60取余的分
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	var result = "";
	if (secondTime > 0) {
		result = "" + parseInt(secondTime) + "秒";
	}
	if (minuteTime > 0) {
		result = "" + parseInt(minuteTime) + "分钟" + result;
	}
	if (hourTime > 0) {
		result = "" + parseInt(hourTime) + "小时" + result;
	}
	// console.log('result',result);
	return result;
}

function gtLog(pargam) {
	console.log(pargam);
}

function hiddenMobile4to7(mobile) {
	if (mobile) {
		var mobile2 = mobile.substr(0, 3) + "****" + mobile.substr(7);
	}
	return mobile2;
}

function getDistance(lat1, lng1, lat2, lng2) {
	// lat1 = Number(lat1);
	// lng1 = Number(lng1);
	// lat2 = Number(lat2);
	// lng2 = Number(lng2);
	// console.log(lat1);
	// console.log(lng1);
	// console.log(lat2);
	// console.log(lng2);

	lat1 = lat1 || 0;

	lng1 = lng1 || 0;

	lat2 = lat2 || 0;

	lng2 = lng2 || 0;

	var rad1 = lat1 * Math.PI / 180.0;

	var rad2 = lat2 * Math.PI / 180.0;

	var a = rad1 - rad2;

	var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

	var r = 6378137;
	var res = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(
		Math.sin(b / 2), 2)));

	return (res / 1000).toFixed(2);

}

function getAppointmentTime(time) {
	var str = '';

	var tomorrow = (new Date(new Date().toLocaleDateString()).getTime() + 86400000) / 1000;
	if (time < tomorrow) {
		str = '今天';
	} else {
		var afterTomorrow = tomorrow + 86400;
		if (time < afterTomorrow) {
			str = '明天';
		} else {
			var after2Tomorrow = afterTomorrow + 86400;
			if (time < after2Tomorrow) {
				str = '后天';
			} else {
				str = formateTime(time, 'MM-DD');
			}
		}
	}

	return str + ' ' + formateTime(time, 'hh:mm');

}

function endMobile(mobile) {
	if (mobile) {
		return mobile.substr(-4);
	} else {
		return '';
	}
}

function callMobile(mobile) {
	if (/^1[3-9]\d{9}$/.test(mobile)) {
		uni.makePhoneCall({
			phoneNumber: mobile,
		});
	} else {
		uni.showToast({
			title: '手机号格式错误',
			icon: "error"
		})
	}
	return false;
}

/* 座机号 */
function isTel(str) {
	const reg = /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
	return reg.test(str);
}

function openLocation(lat, lng) {
	uni.openLocation({
		latitude: Number(lat),
		longitude: Number(lng),
		complete(res) {
			console.log(res);
		}
	});
}

function copyStr(str) {
	uni.setClipboardData({
		data: str
	});
	return false;
}

function previewImg(path) {
	uni.previewImage({
		urls: [path],
	});
	return false;
}

function previewImgs(path, count) {
	uni.previewImage({
		urls: path,
		current: count
	});
	return false;
}

function goLicence(url) {
	uni.navigateTo({
		url: '/pages/login/licence?url=' + url,
	})
	return false;
}

function getMoneyStatus(orderInfo,from="index") {
	orderInfo.pay_status = parseInt(orderInfo.pay_status);
	switch (orderInfo.pay_status) {
		case 0:
			if(from == 'index'){
				if (orderInfo.pay_method == 1) {
					return "¥" + orderInfo.last_price + "(待支付)"
				} else {
					return "¥" + orderInfo.last_price + "(到付)"
				}
			}else{
				if (orderInfo.pay_method == 1) {
					return "¥" + orderInfo.no_pay_total + "(待支付)"
				} else {
					return "¥" + orderInfo.no_pay_total + "(到付)"
				}
			}
		case 1:
			return "货主已申请支付";
		case 2:
			return "¥" + orderInfo.last_price + "(支付完成)"
		default:
			return "异常或取消";
	}
}

function debounce(func, wait=1000, immediate) {
    var timeout, result;
    function debounced () {
        var context = this, args = arguments;
        if (timeout)  clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function() {
                result = func.apply(context, args)
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                result = func.apply(context, args)
            }, wait);
        }
        return result;
    }
    debounced.cancel = function(){
        cleatTimeout(timeout);
        timeout = null;
    }
    return debounced;
}

function judgeTime(time) {
	let startTime = String(time).length === 10 ? time * 1000 : time
	let nowTime = +new Date(),
	    Day = 24 * 60 * 60 * 1000,
	    Hours = 60 * 60 * 1000,
	    Minutes = 60 * 1000,
	    diffDay = parseInt((nowTime - startTime) / Day),
	    diffHours = parseInt((nowTime - startTime) / Hours),
	    diffMinutes = Math.floor((nowTime - startTime) / Minutes)
	if(diffDay != 0 && diffDay < 7) {
	    return diffDay + "天前"
	}    
	else if(diffDay == 0 && diffHours != 0) {
	    return diffHours + "小时前"
	}
	else if(diffDay == 0 && diffHours == 0 && diffMinutes != 0) {
	    return diffMinutes + "分钟前"
	} 
	else if (diffDay == 0 && diffHours == 0 && diffMinutes == 0) {
	    return "刚刚"
	} 
	else {
	    return formateTime(time)
	}
}

function floatNum(num=0, few=2) {
	return (parseInt(num * 10) / 10).toFixed(few)
}

module.exports.getOssImg = getOssImg;
module.exports.formateTime = formateTime;
module.exports.getPreMonthDay = getPreMonthDay;
module.exports.arrToStr = arrToStr;
module.exports.gtToFixex = gtToFixex;
module.exports.arrSort = arrSort;
module.exports.formatnumber = formatnumber;
module.exports.formatSeconds = formatSeconds;
module.exports.gtLog = gtLog;
module.exports.hiddenMobile4to7 = hiddenMobile4to7;
module.exports.getDistance = getDistance;
module.exports.getAppointmentTime = getAppointmentTime;
module.exports.endMobile = endMobile;
module.exports.callMobile = callMobile;
module.exports.openLocation = openLocation;
module.exports.copyStr = copyStr;
module.exports.previewImg = previewImg;
module.exports.previewImgs = previewImgs;
module.exports.goLicence = goLicence;
module.exports.getMoneyStatus = getMoneyStatus;
module.exports.debounce = debounce;
module.exports.judgeTime = judgeTime;
module.exports.isTel = isTel;
module.exports.floatNum = floatNum;