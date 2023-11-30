<template>
	<view class="gt_content">
		<view class="con_list">
			<view class="con_empty" v-if="dataList.length == 0">
				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view>
			<view class="con_scroll">
				<scroll-view class="scroll_view" scroll-y="true" @scrolltolower="loadMore">
					<view class="con_item" v-for="(item,index) in dataList" :key="index">
						<view class="con_title_num">
							<view class="con_title">
								<text>{{item.log_type_msg}}</text>
							</view>
							<view class="con_num">
								<text v-if="item.number > 0">+{{item.number}}</text>
								<text v-else>{{item.number}}</text>
							</view>
						</view>
						<view class="con_title_num">
							<view class="con_time">
								<text>{{gtCommon.formateTime(item.create_time,'YYYY-MM-DD HH:mm:SS')}}</text>
							</view>
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
				var url = "/logistics/companywallet/get_wallet_log";
				var data = {
					wallet_type: 'money01',
					data_type: 1,
					page: gt.page,
					limit: gt.size
				};
				gt.gtRequest.post(url,data).then(res=>{
					res.list.forEach(item=> item.num = +item.num)
					gt.dataList = gt.dataList.concat(res.list);
					gt.end = gt.page >= res.total_page
				})
			},
			loadMore() {
				let gt = this;
				if(gt.end) return
				++gt.page
				gt.getDataList();
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
						width: 100%;
						height: 97vh;
						box-sizing: border-box;
						.con_item{
							padding: 32rpx 24rpx;
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