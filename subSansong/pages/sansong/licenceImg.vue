<template>
	<view class="gt_content">
		<view class="con_img" @click="previewImg">
			<image :src="imgPath" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgPath:''
			}
		},
		onLoad(options) {
			let gt = this;
			if(options.img) {
				gt.imgPath = options.img
			} else {
				gt.getDataInfo()
			}
		},
		methods: {
			getDataInfo(){
				let gt = this;
				var url = "/logistics/company/get_company_img";
				
				gt.gtRequest.post(url).then(res=>{
					gt.imgPath = res.company_imgs.license_pic[0];
				});
			},
			previewImg(){
				let gt = this;
				uni.previewImage({
					urls:[gt.imgPath]
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $gtBackgroundColor;
		.gt_content{
			.con_img{
				width: 718rpx;
				margin: 20rpx 16rpx;
			}
		}
	}
</style>
