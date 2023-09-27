<template>
	<view class="charts_box" :style="{'height': height + 'rpx'}">
		<qiun-data-charts
		      :type="type"
		      :opts="opts"
		      :chartData="chartData"
			  :tooltipFormat="pieDemo"
		    />
	</view>
</template>

<script>
	export default {
		props: {
			height: {
				type: String || Number,
				default: 0
			},
			type: {
				type: String,
				default: 'line'
			},
			opts: {
				type: Object,
				default: ()=> {
					return {}
				}
			},
			chartData: {
				type: Object,
				default: ()=> {
					return {}
				}
			},
			pieDemo: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.charts_box {
		width: 100%;
	}
</style>