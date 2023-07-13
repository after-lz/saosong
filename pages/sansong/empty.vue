<template>
	<view class="gt_content">
		<view class="con_empty">
			<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
				margin-top="200" font-size="32"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		.gt_content {
			.con_empty {
				width: 750rpx;
				text-align: center;
			}
		}
	}
</style>