<template>
	<view class="">
		<circle-box :unid='unid' :info='params' :personTop='personTop'></circle-box>
	</view>
</template>

<script>
	import CircleBox from './circleBox.vue'
	export default {
		components: { CircleBox },
		data() {
			return {
				unid: '',
				params: {},
				personTop: -50
			}
		},
		onLoad(option) {
			let gt = this
			gt.unid = option.unid
			gt.params = JSON.parse(decodeURIComponent(option.params))
		}
	}
</script>

<style>
</style>