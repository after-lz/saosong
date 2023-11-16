<template>
	<view class="gt_content">
		<view class="con_webView">
			<web-view :src="url" @message="handlerMessage"></web-view>
		</view>
		<canvas style="position: absolute; top: -1000px; left: -1000px; width: 875px; height: 700px;background: #fff;" canvas-id="canvas"></canvas>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(options) {
			let gt = this;
			gt.url = decodeURIComponent(options.url);
			// gt.url = options.url;
		},
		methods: {
			handlerMessage(data) {
				let params = data.detail.data[0].params
				if(params.type === 'share') this.share(params)
				if(params.type === 'download') this.download(params)
			},
			download(params) {
				plus.runtime.openURL(this.url + '&hiden=false&down=true')
			},
			share(params) {
				let gt = this
				gt.getShareImg(params.company_pic).then(res => {
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 0,
						href: gt.url + '&hiden=false',
						// imageUrl: params.company_pic,
						imageUrl: res,
						title: '电子面单',
						summary: params.company_name
					})
				})
			},
			getShareImg(imgUrl) {
				return new Promise((resolve) => {
					uni.getImageInfo({
						src: imgUrl, // 原图路径
						success: (res) => {
							this.ctx = uni.createCanvasContext("canvas", this)
							let canvasW =  res.width
							let canvasH = res.height
							// 把比例设置为 宽比高 5:4
							// canvasW = (res.height * 5) / 4
							// 为画框设置背景色，注意要放在画图前，图会覆盖在背景色上
							this.ctx.fillStyle = "#fff"
							this.ctx.fillRect(0, 0, canvasW, canvasH)
							this.ctx.drawImage(imgUrl, 0, 0, canvasW, canvasH)
							this.ctx.draw(false, () => {
								uni.canvasToTempFilePath({
									width: canvasW,
									height: canvasH,
									destWidth: 750, // 标准的iphone6尺寸的两倍，生成高清图
									destHeight: 600,
									canvasId: "canvas",
									fileType: "jpg", // 注意jpg默认背景为透明
									quality: 0.1,
									success: (re) => {
										// 设置分享图片路径
										resolve(re.tempFilePath)
									},
								})
							})	
						}
					})
				})
			},
		}
	}
</script>

<style>

</style>
