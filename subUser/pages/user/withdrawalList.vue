<template>
	<view class="gt_content">
		<view class="con_list">
			<view class="con_empty" v-if="dataList.length == 0">

				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view>
			<view class="con_scroll" v-else>
				<scroll-view class="scroll_view" scroll-y="true" @scrolltolower="loadMore">
					<view class="con_item" v-for="(item,index) in dataList" :key="index" @click="goDetail(item)">
						<view class="con_status_date">
							<view class="con_status">
								<text>{{item.status_msg}}</text>
							</view>
							<!-- <view class="con_line">
								<u-line length="20rpx" color="#C8C9CC" margin="10rpx 14rpx" direction="col"></u-line>
							</view>
							<view class="con_date">
								<text>预计2022-12-29到账</text>
							</view> -->
						</view>
						<view class="con_line">
							<u-line length="670rpx" color="#F2F2F2" margin="16rpx 0"></u-line>
						</view>
						<view class="con_key_val">
							<view class="con_key">
								<text>提现金额</text>
							</view>
							<view class="con_val">
								<text>￥{{item.money}}</text>
							</view>
						</view>
						<view class="con_key_val">
							<view class="con_key">
								<text>提现方式</text>
							</view>
							<view class="con_val">
								<text>{{item.bank_name}}</text>
								<text v-if="item.bank_id > 2"> (尾号{{item.bank_number.substr(-4)}})</text>
							</view>
						</view>
						<view class="con_key_val">
							<view class="con_key">
								<text>申请提现时间</text>
							</view>
							<view class="con_val">
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
				dataList: [],

				page: 1,
				size: 10,
				end: false,

			}
		},
		onLoad() {
			let gt = this;
			gt.reGetDataList();
		},
		onPullDownRefresh() {
			let gt = this;
			gt.reGetDataList();
			uni.stopPullDownRefresh();
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
				var url = "/logistics/companywallet/get_withdraw_log";
				var data = {
					// search_key: gt.searchVal,
					wallet_type:'money01',
					page: gt.page,
					limit: gt.size,
				};
				gt.gtRequest.post(url, data).then(res => {
					console.log(res);
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
			goDetail(item) {
				let gt = this;
				uni.navigateTo({
					url: './withdrawalDetail?withdraw_id=' + item.withdraw_id,
				});
				return false;
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $gtBackgroundColor;
		.gt_content{
			.con_list{
				.con_scroll{
					.scroll_view{
						.con_item{
							width: 718rpx;
							background: #FFFFFF;
							border-radius: 16rpx;
							margin: 20rpx 16rpx;
							padding: 32rpx 24rpx;
							.con_status_date{
								display: flex;
								justify-content: flex-end;
							}
							.con_key_val{
								display: flex;
								justify-content: space-between;
								margin-top: 32rpx;
								.con_key{
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #909399;
									line-height: 40rpx;
								}
								.con_val{
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 40rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>