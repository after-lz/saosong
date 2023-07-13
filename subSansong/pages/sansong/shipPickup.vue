<template>
	<view class="gt_content">
		<view class="con_text">
			<text>扫一扫发货/取货</text>
		</view>
		<view class="con_qrcode">
			<image :src="apiDomain + url + text" mode="widthFix"></image>
		</view>
		<view class="con_companyName">
			<text>{{companyName}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				apiDomain:'',
				url:'/api/qrcode/qrcode?text=',
				text:'123',
				companyName:'',
			}
		},
		onLoad() {
			let gt = this;
			var apiDomain = uni.getStorageSync('apiDomain');
			gt.apiDomain = apiDomain;
			
			var companyInfo = uni.getStorageSync('companyInfo');
			gt.companyName= companyInfo.company_name;
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #fff;
		.gt_content{
			.con_text{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 44rpx;
				text-align: center;
				margin-top: 164rpx;
			}
			.con_qrcode{
				width: 480rpx;
				margin-top: 20rpx;
				margin-left: 135rpx;
			}
			
			.con_companyName{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #485EF4;
				line-height: 44rpx;
				text-align: center;
				margin-top: 20rpx;
			}
		}
	}
</style>
