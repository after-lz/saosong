<template>
	<view class="gt_content">
		<view class="con_swiper">
			<u-swiper :list="swiperList" name="picurl" height="380"></u-swiper>
		</view>
		<view class="con_menu">
			<view class="con_menuTitle">
				<text>我的企业</text>
			</view>
			<view class="con_list">
				<view class="con_item" @click="goJoin">
					<view class="con_title_status">
						<view class="con_title">
							<text>企业入驻</text>
						</view>
						<view class="con_status">
							<text v-if="parkId">已入驻</text>
							<text v-else>未入驻</text>
						</view>
					</view>
					<view class="con_descript">
						<view class="con_text">
							<text style="color: #485EF4;font-size: 28rpx;margin-right: 10rpx;">免费入驻</text>
							<text> 展示您的公司信息</text>
						</view>
					</view>
				</view>
				<view class="con_item" @click="goCompanyInfo" v-if="parkId">
					<view class="con_title_status">
						<view class="con_title">
							<text>浏览公司详情</text>
						</view>
						<view class="con_status">
							<text></text>
						</view>
					</view>
					<view class="con_descript">
						<view class="con_text">
							<text>查看公司详情信息</text>
						</view>
					</view>
				</view>
				<view class="con_item" @click="goLineManage">
					<view class="con_title_status">
						<view class="con_title">
							<text>专线管理</text>
						</view>
						<view class="con_status">
							<text>{{lineNum}}条</text>
						</view>
					</view>
					<view class="con_descript">
						<view class="con_text">
							<text style="color: #485EF4;font-size: 28rpx;margin-right: 10rpx;">免费展示</text>
							<text> 您的专线信息</text>
						</view>
					</view>
				</view>
				<view class="con_item" style="display: none;">
					<view class="con_title_status">
						<view class="con_title">
							<text>企业视频</text>
						</view>
						<view class="con_status">
							<text></text>
						</view>
					</view>
					<view class="con_descript">
						<view class="con_text">
							<text>上传视频 展示</text>
							<text style="color: #485EF4;font-size: 28rpx;">企业风采</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="con_menu">
			<view class="con_menuTitle">
				<text>企业营销</text>
			</view>
			<view class="con_list">
				<view class="con_item" style="display: none;">
					<view class="con_title_status">
						<view class="con_title">
							<text>品质专线</text>
						</view>
						<view class="con_status">
							<text>已缴纳</text>
						</view>
					</view>
					<view class="con_descript">
						<view class="con_text">
							<text> 缴纳平台押金</text>
							<text style="color: #485EF4;font-size: 28rpx;margin-left: 10rpx;">无限抢单</text>
						</view>
					</view>
				</view>
				<view class="con_item" style="display: none;">
					<view class="con_title_status">
						<view class="con_title">
							<text>会员专线</text>
						</view>
						<view class="con_status">
							<text></text>
						</view>
					</view>
					<view class="con_descript">
						<view class="con_text">
							<text> 购买会员</text>
							<text style="color: #485EF4;font-size: 28rpx;margin-left: 10rpx;">优先抢单</text>
						</view>
					</view>
				</view>
				<view class="con_item" style="background-color: #485EF4;display: none;">
					<view class="con_title_status">
						<view class="con_title" style="color: #fff;">
							<text>专线推广</text>
						</view>
						<view class="con_status">
							<text></text>
						</view>
					</view>
					<view class="con_descript">
						<view class="con_text" style="color: #fff;">
							<text> 马上付费享</text>
							<text style="font-size: 28rpx;margin-left: 10rpx;">置顶推广</text>
						</view>
					</view>
				</view>
				<view class="con_item" @click="goTicketManage">
					<view class="con_title_status">
						<view class="con_title">
							<text>发券管理</text>
						</view>
						<view class="con_status">
							<text></text>
						</view>
					</view>
					<view class="con_descript">
						<view class="con_text">
							<text>发放优惠券</text>
							<text style="color: #485EF4;font-size: 28rpx;">获取更多货主</text>
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
				parkId: 0,
				lineNum: 0,
				startArea:'',
			}
		},
		onLoad() {
			let gt = this;

			// #ifdef MP-WEIXIN
			var adType = 'AppletLogisticsManage';
			// #endif
			// #ifdef APP-PLUS
			var adType = 'AppLogisticsManage';
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
		onShow() {
			let gt = this;
			gt.getCompanyInfo();
			gt.getIndexInfo();
		},
		methods: {
			getCompanyInfo() {
				let gt = this;
				var url = "/logistics/company/get_company_info";

				gt.gtRequest.post(url).then(res => {
					gt.parkId = res.company_info.park_id;
				});
			},
			getIndexInfo() {
				let gt = this;
				var url = "/logistics/company/get_index_info";

				gt.gtRequest.post(url).then(res => {
					gt.lineNum = res.line_num;
					gt.startArea = {
						city: res.company_info.city,
						county: res.company_info.county,
						province: res.company_info.province
					}
				});
			},
			goCompanyInfo() {
				uni.navigateTo({
					url: './companyInfo',
				});
				return false;
			},
			goJoin() {
				let gt = this;
				uni.navigateTo({
					url: './companyJoin'
				});
			},
			goLineManage() {
				let gt = this;
				console.log(JSON.stringify(gt.startArea))
				uni.navigateTo({
					url: './lineManage?startArea='+JSON.stringify(gt.startArea)
				});
			},
			goTicketManage() {
				let gt = this;
				uni.navigateTo({
					url: './ticketManage'
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;

		.gt_content {
			.con_menu {
				margin: 40rpx 16rpx 0 16rpx;

				.con_menuTitle {
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 50rpx;
				}

				.con_list {
					display: flex;
					flex-wrap: wrap;
					margin: 8rpx -10rpx 0 -10rpx;

					.con_item {
						width: 348rpx;
						// height: 140rpx;
						background: #FFFFFF;
						box-shadow: 4rpx 4rpx 8rpx 4rpx rgba(0, 0, 0, 0.1);
						border-radius: 16rpx;
						margin: 10rpx;

						.con_title_status {
							display: flex;
							justify-content: space-between;

							.con_title {
								font-size: 28rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #000000;
								line-height: 40rpx;
								margin: 20rpx 0 0 24rpx;
							}

							.con_status {
								height: 34rpx;
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: $gtProjectColor;
								line-height: 40rpx;
								margin: 20rpx 24rpx 0 0;
							}
						}

						.con_descript {
							.con_text {
								font-size: 24rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #909399;
								line-height: 40rpx;
								margin: 22rpx 0 18rpx 24rpx;
							}

						}
					}
				}
			}
		}
	}
</style>