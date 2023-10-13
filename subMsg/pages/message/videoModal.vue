<template>
	<view class="videoModal">
		<view v-if="showPage">
			<page-container :show="showPage" :duration="false" :overlay="false" @beforeleave="beforeleave('showPage')"></page-container>
		</view>
		<video :src="src" class="myVideo" autoplay :show-mute-btn="true"></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPage: true,
				src: ''
			}
		},
		onLoad(options) {
			this.src = options.src
		},
		methods: {
			beforeleave() {
				let that = this
				that.showPage = false  //这个很重要，一定要先把弹框删除掉
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.videoModal {
		height: 100vh;
		.myVideo {
			width: 100%;
			height: 100%;
		}
	}
</style>