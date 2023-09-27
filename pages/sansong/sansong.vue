<template>
	<view class="gt_content">
		<view class="con_swiper">
			<u-swiper :list="swiperList" name="picurl" height="360"></u-swiper>
		</view>

		<view class="con_order" style="display: none;">
			<view class="con_title">
				<text>即时单</text>
			</view>
			<view class="con_line">
				<u-line color="#545566" length="670rpx" margin="14rpx 24rpx 0 24rpx" />
			</view>
			<view class="con_from_distance">
				<view class="con_from u-line-1">
					<text class="con_dot"></text>
					<text>梁溪区-金桥商贸城副食品城</text>
				</view>
				<view class="con_distance">
					<text>距您8.8公里</text>
				</view>
			</view>
			<view class="con_to_price">
				<view class="con_to u-line-1">
					<text class="con_dot"></text>
					<text>梁溪区-广瑞路842</text>
				</view>
				<view class="con_price">
					<text>23.49</text>
					<text>元</text>
				</view>
			</view>
		</view>


		<view class="con_menu">
			<view class="con_list">
				<view class="con_item" v-for="(item,index) in menuList" :key="index" @click="menuClick(item)">
					<view class="con_iconText" v-if="item.name != '空白'">
						<view class="con_icon">
							<image :src="gtCommon.getOssImg('sansong/' + item.name +'.png')" mode="widthFix">
							</image>
						</view>
						<view class="con_text">
							<text v-if="item.name == '发货取货'">发货/取货</text>
							<text v-else>{{item.name}}</text>
						</view>
					</view>
					<view class="con_iconText" v-else>
						<view class="con_icon">
						</view>
						<view class="con_text">
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="con_notice">
			<view class="con_title">
				<text>最新公告</text>
			</view>
			<view class="con_empty" v-if="noticeList.length == 0">
				<view class="con_img">
					<image :src="gtCommon.getOssImg('index/empty.png')" mode="widthFix"></image>
				</view>
				<view class="con_text">
					<text>暂无公告</text>
				</view>
			</view>
			<view class="con_list">
				<view class="con_item" v-for="(item,index) in noticeList" :key="index">
					<view class="con_headImg">
						<image :src="gtCommon.getOssImg('index/empty.png')" mode="widthFix"></image>
					</view>
					<view class="con_title_time">
						<view class="con_title">
							<text>{{item.title}}</text>
						</view>
						<view class="con_time">
							<text>{{item.time}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				menuList: [{
						id: 1,
						name: '装车发货',
						url: '/subSansong/pages/sansong/loadSend'
					},
					{
						id: 1,
						name: '装车记录',
						url: '/subSansong/pages/sansong/sendList'
					},
					{
						id: 1,
						name: '异常订单',
						url: '/subSansong/pages/sansong/abnormalBill'
					},
					{
						id: 1,
						name: '企业管理',
						url: '/subSansong/pages/sansong/companyManage'
					},
					{
						id: 1,
						name: '上游来货',
						url: '/subSansong/pages/sansong/upArrive'
					},
					{
						id: 1,
						name: '企业协作',
						url: '/subSansong/pages/sansong/companyCooperate'
					},
					{
						id: 1,
						name: '空白',
					},
					{
						id: 1,
						name: '空白',
					},
					{
						id: 1,
						name: '发货取货',
						url: '/subSansong/pages/sansong/shipPickup'
					},
					{
						id: 1,
						name: '运单查询',
						url: '/subSansong/pages/sansong/waybillList'
					},
					{
						id: 1,
						name: '货车定位',
						// url: './empty',
						url: '/subSansong/pages/sansong/truckLocation'
					},
					{
						id: 1,
						name: '数据看板',
						url: '/subSansong/pages/sansong/dataBoard'
					},
				],

				noticeList: [],
				// noticeList: [{
				// 		id: 1,
				// 		headImg: '',
				// 		title: '上海伞送物流公司入驻平台',
				// 		time: '1分钟前',
				// 	},
				// 	{
				// 		id: 1,
				// 		headImg: '',
				// 		title: '尾号1324注册平台',
				// 		time: '1分钟前',
				// 	},
				// 	{
				// 		id: 1,
				// 		headImg: '',
				// 		title: '上海伞送物流公司入驻平台',
				// 		time: '1分钟前',
				// 	},
				// ],
			}
		},
		onLoad() {
			let gt = this;

			// #ifdef MP-WEIXIN
			var adType = 'AppletLogisticsDesk';
			// #endif
			// #ifdef APP-PLUS
			var adType = 'AppLogisticsDesk';
			// #endif

			var url = "/api/appgobal/get_ad_data";
			var data = {
				platform: 'logistics',
				city: '无锡',
				ad_sign: adType,
			};
			gt.gtRequest.post(url, data).then(res => {
				gt.swiperList = res.list;
			});
		},
		methods: {
			async menuClick(item) {
				let gt = this;

				var token = await gt.gtRequest.getToken();

				if (token == '') {
					uni.showModal({
						title: '请先登录',
						showCancel: true,
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../login/login',
								});
								return false;
							}
						}
					})
					return false;
				}

				uni.navigateTo({
					url: item.url
				});
				return false;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {

			.con_order {
				width: 718rpx;
				// height: 230rpx;
				background: #4B4C5E;
				border-radius: 16rpx;
				position: absolute;
				top: 240rpx;
				left: 16rpx;

				// padding: 0;
				.con_title {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 40rpx;
					margin: 16rpx 24rpx;
				}

				.con_from_distance {
					display: flex;
					justify-content: space-between;

					.con_from {
						width: 380rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 44rpx;

						.con_dot {
							width: 12rpx;
							height: 12rpx;
							background: #909399;
							margin: 38rpx 12rpx 0 24rpx;
						}
					}

					.con_distance {
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 44rpx;
						margin: 22rpx 24rpx 0 0;
					}
				}

				.con_to_price {
					display: flex;
					justify-content: space-between;
					margin: 24rpx;

					.con_to {
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 44rpx;
					}

					.con_price {
						font-size: 40rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FF6067;
						line-height: 56rpx;
						margin: 16rpx 26rpx 0 0;

						text:nth-child(2) {
							font-size: 32rpx;
						}
					}

				}

			}

			.con_menu {
				width: 728rpx;
				height: 592rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 11rpx;

				.con_list {
					display: flex;
					padding: 20rpx 4rpx;
					flex-wrap: wrap;

					.con_item {
						margin: 20rpx 39rpx;

						.con_icon {
							width: 100rpx;
							height: 100rpx;
						}

						.con_text {
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 34rpx;
							margin-top: 10rpx;
							text-align: center;
						}
					}
				}
			}

			.con_notice {
				width: 728rpx;
				// height: 592rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 0 11rpx 26rpx 11rpx;
				padding: 1rpx;


				.con_title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
					margin: 24rpx 0 0 24rpx;
				}

				.con_empty {
					.con_img {
						width: 528rpx;
						margin: 100rpx auto 0 auto;
					}

					.con_text {
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 44rpx;
						margin-top: 16rpx;
						text-align: center;
						margin-bottom: 100rpx;
					}
				}

				.con_list {
					.con_item {
						display: flex;

						.con_headImg {
							width: 80rpx;
							height: 80rpx;
							margin: 20rpx 0 0 24rpx;
						}

						.con_title_time {
							.con_title {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
								margin: 18rpx 0 0 20rpx;
							}

							.con_time {
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #FF6067;
								line-height: 34rpx;
								margin: 6rpx 0 0 20rpx;
							}
						}
					}
				}
			}
		}
	}
</style>