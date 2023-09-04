<template>
	<view class="gt_content">
		<rich-text :nodes="data"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: ''
			}
		},
		onLoad(option) {
			let gt = this
			let params = JSON.parse(decodeURIComponent(option.params))
		    uni.setNavigationBarTitle({
		    	title: params.title
		    })
		   	gt.getData(params.id)
		},
		methods: {
			getData(id) {
				let gt = this
				gt.gtRequest.post('/api/applogin/get_question_info', {
					platform: 'logistics',
					id
				}).then(res => {
					gt.data = res.content
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding: 40rpx;
		}
	}
</style>