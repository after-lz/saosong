<template>
	<view class="gt_content">

fdf
		

	</view>
</template>

<script>
	import gtPCA from "@/components/gt-pca/gt-pca.vue";

	export default {
		data() {
			return {
				pcaList: [],
				height: '',
				val:[],
				
				touh: false,
				startX: 0,
				moveX: 0,
				btnStr: '滑动抢单',

				msg: '',
			}
		},
		components: {
			gtPCA: gtPCA,
		},
		onLoad() {
			let gt = this;
			var pcaList = uni.getStorageSync('pcaList');
			gt.pcaList = pcaList;
			gt.height = '600rpx';

			// gt.$nextTick(() => {
			// 	this.$refs.city.openModal();
			// })
		},
		onShow() {
			// setTimeout(function())
		},
		methods: {
			gtPCASelect(res){
				console.log(res);
				let gt = this;
				gt.val = res;
			},

			connectSocket() {
				let that = this;
				console.log('调用连接websocket')
				this.socketTask = uni.connectSocket({
						url: 'wss://sansong.yingjiezj.com/wss',
						data: {
							abc: 123
						},
						success(res) {
							console.log("websocket连接成功");
							// that.isSuccess = true
						},
						fail(err) {
							console.log("报错", err);
						}
					},


				);
				this.socketTask.onOpen(function(res) {
					console.log('WebSocket连接已打开！');
					that.isSuccess = true
					that.getStatus()
					that.heart()
				})
				this.socketTask.onMessage(function(res) {
					console.log('收到服务器内容：' + res.data);
					// that.handlerMsg(JSON.parse(res.data)) //这里是对获取到的数据进行操作
				});


				this.socketTask.onError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
					console.log(res);
					// this.isSuccess = false
					// that.connectSocket()

					//进入重新连接
					that.reconnect();

				})
				// // 监听连接关闭 -
				this.socketTask.onClose((e) => {
					console.log('WebSocket连接关闭！');
					clearInterval(that.timer)
					that.timer = ''
					if (!that.isClose) {
						that.reconnect()
					}
				})
				console.log(this.socketTask)
			},
			//进入重新连接
			reconnect() {
				console.log('进入断线重连');
				// this.socketTask.close();
				this.socketTask = null;
				this.connectSocket()

			},
			//发送消息
			sendSocketMessage() {
				console.log('发送信息')
				var msg = this.msg;
				console.log(msg)
				return new Promise((reslove, reject) => {
					this.socketTask.send({
						data: msg,
						success(res) {
							console.log('发送成功')
							reslove(res)
						},
						fail(res) {
							console.log('发送失败')
							console.log(res)
							reject(res)
						}
					});
				})

			},
			getStatus() {

			},
			//心跳
			heart() {
				let that = this;
				clearInterval(this.timer);
				this.timer = '';
				let msg = {
					"type": "heartbeat",
				}
				this.timer = setInterval(() => {
					that.sendSocketMessage(JSON.stringify(msg)).then(res => {
						console.log('心跳成功')
					}).catch(res => {
						console.log('发送失败')
						console.log((res))
					})

				}, 200000)
			},
		},
		// startTouch(e){
		// 	console.log(e);
		// 	let gt = this;
		// 	gt.touh = true;
		// 	gt.startX = e.changedTouches[0].clientX;
		// },
		// moveTouch(e){
		// 	console.log(e);
		// 	let gt = this;
		// 	var moveX = (e.changedTouches[0].clientX - gt.startX) * 2;
		// 	if(moveX < 0){
		// 		moveX = 0;
		// 	}
		// 	if(moveX > 580){
		// 		moveX = 718;
		// 	}
		// 	gt.moveX = moveX;
		// 	gt.btnStr = '';
		// },
		// endTouch(e){
		// 	console.log(e);
		// 	let gt = this;
		// 	gt.touh = false;
		// 	if(gt.moveX != 718){
		// 		gt.moveX = 0;
		// 		gt.btnStr = '滑动抢单'
		// 	}else{
		// 		gt.btnStr = '抢单中'
		// 		uni.showModal({
		// 			title:'枪弹中。。。'
		// 		})
		// 	}
		// },
	}
</script>

<style lang="scss">
	page {
		.gt_content {
			.con_seizeBtn {

				width: 718rpx;
				height: 100rpx;
				background: $gtProjectColor;
				border-radius: 16rpx;
				overflow: hidden;

				margin: 20rpx 16rpx;

				.con_icon {
					// margin: 0 20rpx;
					width: 140rpx;
					height: 100rpx;
					padding: 35rpx 20rpx;
					// border: 1rpx solid red;
					background: $gtProjectColor;
					border-radius: 16rpx;
				}

				.con_text {
					text-align: center;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 100rpx;
					margin-top: -100rpx;
					border-radius: 16rpx;
				}

				.con_background {
					// width: 50rpx;
					height: 100rpx;
					background: $gtProjectColor;
					margin-top: -100rpx;
					border-radius: 16rpx;
				}




			}

			.headImgs {
				display: flex;
				margin-left: 24rpx;
				width: 96rpx;
				overflow: hidden;
				animationDuration: 10s;
				animationPlayState: running;

				.con_item {
					width: 48rpx;
					height: 48rpx;
					border-radius: 50%;
					border: 1rpx solid #fff;
					overflow: hidden;
					margin-left: -24rpx;
				}
			}

		}
	}
</style>