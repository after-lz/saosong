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
								<text v-if="item.number > 0">+{{item.number}}</text>
								<text v-else>{{item.number}}</text>
							</view>
						</view>
						<view class="con_time">
							<text>{{gtCommon.formateTime(item.create_time,'YYYY-MM-DD HH:mm:SS')}}</text>
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
				size: 10,
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
				gt.size = 10;
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
					page: gt.page,
					limit: gt.size,
					wallet_type:'money01',
					data_type:1,
				};
				gt.gtRequest.post(url,data).then(res=>{
					gt.dataList = gt.dataList.concat(res.list);
					if (res.list.length == gt.size) {
						gt.page = gt.page + 1;
					} else {
						gt.end = true;
					}
				});
			},
			loadMore() {
				console.log('loadMore');
				let gt = this;
				gt.getDataList();
			},
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