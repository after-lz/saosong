<template>
	<view class="gt_content">
		<view class="charts_box">
		    <qiun-data-charts 
		          type="line"
		          :opts="opts"
		          :chartData="chartData"
		        />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			chartData: {},
			opts: {
				color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
				padding: [15,10,0,15],
				enableScroll: false,
				legend: {},
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					gridType: "dash",
					dashLength: 2
				},
				extra: {
					line: {
						type: "straight",
						width: 2,
						activeType: "hollow"
					}
				}
			}
		}
	},
	onReady() {
		this.getServerData()
	},
	methods: {
		getServerData() {
			//模拟从服务器获取数据时的延时
			setTimeout(() => {
				//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				let res = {
					categories: ["2018","2019","2020","2021","2022","2023"],
					series: [
					{
						name: "成交量A",
						data: [35,8,25,37,4,20]
					},
					{
						name: "成交量B",
						data: [70,40,65,100,44,68]
					},
					{
						name: "成交量C",
						data: [100,80,95,150,112,132]
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
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.charts_box {
				width: 100%;
				height: 300px;
			}
		}
	}
</style>