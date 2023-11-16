<template>
	<view class="gt_content">
		<view class="con_webView">
			<web-view :src="url" @message="handlerMessage"></web-view>
		</view>
		<view class="" style="display: none;">
			<button open-type="share" data-name="shareBtn"></button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'http://192.168.1.21:8080/#/?deliver_sn=SS2310310000004&type=uni&hiden=false&down=true'
			}
		},
		onLoad(options) {
			let gt = this
			// if(options.type === 'share') onShareAppMessage()
			if(options.type === 'download') this.download()
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
			  title: '电子面单',
			  path: gt.url + '&hiden=false'
			}
		},
		methods: {
			share(params) {
				let gt = this
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: gt.url + '&hiden=false',
					imageUrl: params.company_pic,
					title: '电子面单',
					summary: params.company_name
				})
			},
			download() {
				plus.runtime.openURL(this.url + '&hiden=false&down=true')
			}
		}
	}
</script>

<style>

</style>
