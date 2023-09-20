<template>
	<view class="charts_box" :style="{'height': height + 'rpx'}">
		<qiun-data-charts
		      type="line"
		      :opts="opts"
		      :chartData="chartData"
		    />
	</view>
</template>

<script>
	export default {
		props: {
			height: {
				type: String || Number,
				default: 0
			}
		},
		data() {
			return {
				chartData: {},
				opts: {
					color: ["#909399"],
					padding: [15, 0, 0, 0],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true,
						fontSize: 12,
						fontColor: '#909399',
						marginTop: 10
					},
					yAxis: {
						gridType: "solid",
						data: [
							{
								axisLine: false,
								min: 0,
								fontSize: 12,
								textAlign: 'left',
								fontColor: '#909399'
							}
						]
					},
					extra: {
						tooltip: {
							bgColor: '#485EF4',
							borderRadius: 4,
							bgOpacity: 1,
							fontSize: 12,
							legendShow: false,
							splitLine: false
						}
					}
				}
			}
		},
		mounted() {
			this.getServerData()
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["12-14","12-15","12-16","12-17","12-18","12-19","12-20"],
						series: [
							{
								name: "总单量",
								data: [1800,2800,2500,2600,3800,3800,3800]
							}
						]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			}
		}
	}
</script>

<style lang="scss">
	.charts_box {
		width: 100%;
		// height: 300px;
	}
</style>