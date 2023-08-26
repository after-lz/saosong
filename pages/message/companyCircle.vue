<template>
	<view class="">
		<circle-box :unid='unid'></circle-box>
	</view>
</template>

<script>
	import CircleBox from './circleBox.vue'
	export default {
		components: { CircleBox },
		data() {
			return {
				unid: ''
			}
		},
		onLoad(option) {
			let gt = this
			gt.unid = option.unid
		}
	}
</script>

<style>
</style>