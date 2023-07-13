<template>
	<view class="gt_content">
		<view class="con_driverInfo">
			<view class="con_key_val">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderSn:'',
				dataInfo: {},
				imgList: [],
				actionList: [],
				sendTime:0,
			}
		},
		onLoad(options) {
			let gt = this;
			gt.orderSn = options.orderSn;
		},
		onShow() {
			let gt = this;
			gt.getDataInfo();
		},
		methods: {
			getDataInfo() {
				let gt = this;
				var url = "/logistics/waybill/get_waybill_detail";
				var data = {
					waybill_sn: gt.orderSn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.dataInfo = res;
					gt.imgList = res.waybill_info.images.split('||');
					gt.actionList = res.waybill_log_list;
					gt.sendTime = res.waybill_info.create_time;
				});
			},
		}
	}
</script>

<style>

</style>
