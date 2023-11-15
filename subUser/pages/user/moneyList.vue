<template>
	<view class="gt_content">
		<view class="con_list">
			<view class="con_empty" v-if="dataList.length == 0">
				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view>
			<view class="con_scroll">
				<scroll-view class="scroll_view" scroll-y="true" @scrolltolower="loadMore">
					<view class="con_item" v-for="(item,index) in dataList" :key="index" @click="goDetail(item)">
						<view class="con_title_num">
							<view class="con_title">
								<text>{{item.remark}}</text>
							</view>
							<view class="con_num">
								<text v-if="item.num > 0">+{{item.num}}</text>
								<text v-else>{{item.num}}</text>
							</view>
						</view>
						<view class="con_title_num">
							<view class="con_time">
								<text>{{gtCommon.formateTime(item.create_time,'YYYY-MM-DD HH:mm:SS')}}</text>
							</view>
							<view class="con_time" style="color: #000;">{{ judgeType(item.type) }}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[],
				page: 1,
				size: 15,
				end: false,
			}
		},
		onLoad() {
			let gt = this;
			gt.reGetDataList();
		},
		methods: {
			reGetDataList() {
				let gt = this;
				gt.dataList = [];
				gt.page = 1;
				gt.size = 15;
				gt.end = false;
				gt.getDataList();
			},
			getDataList() {
				let gt = this;
				if (gt.end) {
					return false;
				}
				// var url = "/logistics/companywallet/get_wallet_log";
				// var data = {
				// 	page: gt.page,
				// 	limit: gt.size,
				// 	wallet_type:'money01',
				// 	data_type:1,
				// };
				var url = "/api/applogin/get_bill_list";
				var data = {
					platform: 'logistics',
					page: gt.page,
					limit: gt.size
				};
				gt.gtRequest.post(url,data).then(res=>{
					res.list.forEach(item=> item.num = +item.num)
					gt.dataList = gt.dataList.concat(res.list);
					gt.end = gt.page >= res.total_page
				});
			},
			goDetail(record) {
				return false
				let gt = this;
				uni.navigateTo({
					url: './balanceWithdrawal?withdraw_id=' + record.log_id
				})
			},
			loadMore() {
				let gt = this;
				if(gt.end) return
				++gt.page
				gt.getDataList();
			},
			judgeType(type) {
				let str = ''
				switch (type){
					case 'money01':
						str = '零钱'
						break;
					case 'money02':
						str = '红包'
						break;
					case 'money03':
						str = '行为分'
						break;
					case 'weipay':
						str = '微信支付'
						break;
					case 'weipay_mini':
						str = '微信小程序支付'
						break;
					case 'weipay_app':
						str = '微信APP支付'
						break;
					case 'alipay':
						str = '支付宝支付'
						break;
					case 'alipay_app':
						str = '支付宝APP支付'
						break;
					case 'coupon':
						str = '优惠券'
						break;
					case 'cash':
						str = '现金'
						break;
					default:
						break;
				}
				return str
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $gtBackgroundColor;
		.gt_content{
			.con_list{
				.con_empty{
					text-align: center;
				}
				.con_scroll{
					.scroll_view{
						height: 97vh;
						padding: 0 24rpx;
						.con_item{
							width: 718rpx;
							padding: 32rpx 0;
							border-bottom: 1rpx solid #E7E8E9;
							.con_title_num{
								display: flex;
								justify-content: space-between;
								.con_title{
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 40rpx;
								}
								.con_num{
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 40rpx;
								}
							}
							.con_time{
								display: flex;
								justify-content: space-between;
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #909399;
								line-height: 34rpx;
								margin-top: 8rpx;
							}
						}
					}
				}
			}
		}
	}
</style>