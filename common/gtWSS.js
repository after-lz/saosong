import gtRequest from "./gtRequest.js";

//是否已经连接上ws
let isOpenSocket = false
//心跳间隔，单位毫秒
let heartBeatDelay = 50000
let heartBeatInterval = null
//心跳时发送的消息文本
let heartBeatText = "gtPING"
//最大重连次数
let reconnectTimes = 10
let reconnectInterval = null
//重连间隔，单位毫秒
let reconnectDelay = 3000

// var environment = uni.getStorageSync('environment');
// var url = '';
// if (environment == 'prod') {
// 	url = 'wss://orderapi.sansongkeji.com/wss';
// } else {
// 	url = 'wss://sansong.yingjiezj.com/wss';
// }

// let wsUrl = url

let socketTask = null

//这个参数是防止重连失败之后onClose方法会重复执行reconnect方法，导致重连定时器出问题
//连接并打开之后可重连，且只执行重连方法一次
let canReconnect = false

//封装的对象，最后以模块化向外暴露，
//init方法 初始化socketTask对象
//completeClose方法 完全将socketTask关闭（不重连）
//其他关于socketTask的方法与uniapp的socketTask api一致
let ws = {
	socketTask: null,
	init,
	completeClose
}
const innerAudioContext = uni.createInnerAudioContext();

let companyInfo = uni.getStorageSync('companyInfo');

let logisticsId = companyInfo.logistics_id;

function init(wsUrl) {
	socketTask = uni.connectSocket({
		url: wsUrl,
		complete: () => {}
	})
	console.log(socketTask);

	socketTask.onOpen((res) => {
		console.log("ws连接成功")
		clearInterval(heartBeatInterval)
		clearInterval(reconnectInterval)
		isOpenSocket = true
		canReconnect = true
		//开启心跳机制
		heartBeat()
	})
	socketTask.onMessage((res) => {
		//自定义处理onMessage方法
		console.log(res);
		let gt = this;
		// 	var pages = getCurrentPages();
		// 	var currentRoute = pages[pages.length-1].route;
		// 	console.log(currentRoute);
		var data = res.data;
		var obj = JSON.parse(data);
		var type = obj.type;
		// 	uni.setStorageSync('client_id',obj.client_id);
		if (type == 'init') {
			var url = "/api/applogin/bind_client_id";
			var data = {
				client_id: obj.client_id,
			};
			uni.setStorageSync('clientId',obj.client_id);
			gtRequest.post(url, data).then(res => {

			});
		}
		var audioStatus = uni.getStorageSync('audioStatus');
		if (!audioStatus) {
			return false;
		}
		if (type == 'order_new_order') {
			// var orderInfo = obj.data;
			// orderInfo = orderInfo.order_info;
			innerAudioContext.stop();
			// innerAudioContext.autoplay = true;
			innerAudioContext.src = 'https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/index/new_order.mp3';
			innerAudioContext.play();
		}

		if (type == 'order_rob_result') {
			// var orderInfo = obj.data;
			// orderInfo = orderInfo.order_info;
			// if (orderInfo.logistics_id == logisticsId) {
			// 	innerAudioContext.stop();
			// 	innerAudioContext.src = 'https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/index/seizeOrderSuccess.mp3';
			// 	innerAudioContext.play();
			// }
		}

		// if (type == 'order_receive_success') {
		// 	var orderInfo = obj.data;
		// 	// console.log(orderInfo);
		// 	var orderInfo = orderInfo.order_info;
		// 	// console.log(orderInfo);
		// 	// return false;
		// 	innerAudioContext.stop();
		// 	innerAudioContext.src =
		// 		'https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/index/seizeOrderSuccess.mp3';
		// 	innerAudioContext.play();
		// }
		// 	// uni.showModal({
		// 	// 	title:'有新订单'+type
		// 	// })
	})
	socketTask.onClose(() => {
		if (isOpenSocket) {
			console.log("ws与服务器断开")
			// uni.showModal({
			// 	title:'ws与服务器断开',
			// 	content:'gtWss',
			// })
		} else {
			console.log("连接失败")
			// uni.showModal({
			// 	title:'链接失败',
			// 	content:'gtWss',
			// })
		}
		isOpenSocket = false
		if (canReconnect) {
			reconnect()
			canReconnect = false
		}
	})
	ws.socketTask = socketTask
}

function heartBeat() {
	heartBeatInterval = setInterval(() => {
		console.log(heartBeatText)
		send(JSON.stringify(heartBeatText));
	}, heartBeatDelay)
}

function send(value) {
	ws.socketTask.send({
		data: value,
		async success() {
			console.log("消息发送成功")
		}
	});
}

function reconnect() {
	//停止发送心跳
	clearInterval(heartBeatInterval)
	//如果不是人为关闭的话，进行重连
	if (!isOpenSocket) {
		let count = 0;
		reconnectInterval = setInterval(() => {
			console.log("正在尝试重连")
			init();
			count++
			//重连一定次数后就不再重连
			if (count >= reconnectTimes) {
				clearInterval(reconnectInterval)
				console.log("网络异常或服务器错误")
			}
		}, reconnectDelay)
	}
}

function completeClose() {
	//先将心跳与重连的定时器清除
	clearInterval(heartBeatInterval)
	clearInterval(reconnectInterval)
	canReconnect = false
	ws.socketTask.close()
}

module.exports = ws