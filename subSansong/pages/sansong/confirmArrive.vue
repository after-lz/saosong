<template>
	<view class="gt_content">
		<view class="con_item con_driveInfo">
			<view class="con_leftRight">
				<view class="con_left">
					<view class="con_keyVal">
						<view class="con_key">
							<text>运单号：</text>
						</view>
						<view class="con_val">
							<view class="con_textIcon">
								<view class="con_text">
									<text>SS2022120813</text>
								</view>
								<view class="con_icon">
									<!-- <text class="custom-icon custom-icon-copy"></text> -->
									<image :src="gtCommon.getOssImg('sansong/copy.png')" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="con_keyVal">
						<view class="con_key">
							<text>发车时间：</text>
						</view>
						<view class="con_val">
							<view class="con_textIcon">
								<view class="con_text">
									<text>2022-11-11 18:30</text>
								</view>

							</view>
						</view>
					</view>
					<view class="con_keyVal">
						<view class="con_key">
							<text>车牌号：</text>
						</view>
						<view class="con_val">
							<view class="con_textIcon">
								<view class="con_text" style="color: #000;">
									<text>沪A12345</text>
								</view>
								<view class="con_text">
									<text>查看定位</text>
								</view>
							</view>
						</view>
					</view>

					<view class="con_keyVal">
						<view class="con_key">
							<text>司机：</text>
						</view>
						<view class="con_val">
							<view class="con_textIcon">
								<view class="con_text">
									<text>张三</text>
								</view>

							</view>
						</view>
					</view>

					<view class="con_keyVal">
						<view class="con_key">
							<text>手机：</text>
						</view>
						<view class="con_val">
							<view class="con_textIcon">
								<view class="con_text">
									<text>SS2022120813</text>
								</view>
								<view class="con_icon">
									<u-icon name="phone-fill" color="#485EF4"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="con_right">
					<view class="con_icon">
						<image :src="gtCommon.getOssImg('sansong/qrcode.png')" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="con_item con_lineInfo">
			<view class="con_title">
				<text>无锡-上海</text>
			</view>
			<view class="con_keyVal">
				<view class="con_text">
					<text>到站地址：江苏省无锡市惠山区物流园</text>
				</view>
				<view class="con_text">
					<text>专线经理：张三</text>
				</view>
				<view class="con_text">
					<text>经理手机：13666666666</text>
				</view>
			</view>
		</view>
		<view class="con_item con_orderInfo">
			<u-checkbox-group :wrap="true" shape="circle">
				<u-checkbox v-model="item.checked" v-for="(item, index) in orderList" :key="index" :name="item.id">
					<view class="con_text u-line-1">
						<text>订单号：</text>
						<text style="color: #485EF4;">{{item.sn}}</text>
						<text style="margin-left: 20rpx;">蔬菜/10吨/100方 {{item.str}}</text>
					</view>
				</u-checkbox>
			</u-checkbox-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{
						id: 1,
						sn: 1187910264,
						str: '送货上门'
					},
					{
						id: 2,
						sn: 1187910264,
						str: '送货上门'
					},
					{
						id: 3,
						sn: 1187910264,
						str: '自提'
					},
					{
						id: 4,
						sn: 1187910264,
						str: '自提'
					},
					{
						id: 5,
						sn: 1187910264,
						str: '送货上门'
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			padding-top: 10rpx;

			.con_item {
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 16rpx 24rpx;
			}

			.con_driveInfo {
				.con_leftRight {
					display: flex;
					justify-content: space-between;

					.con_left {
						.con_keyVal {
							display: flex;
							margin: 8rpx 0;

							.con_key {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #909399;
								line-height: 40rpx;
							}

							.con_val {
								.con_textIcon {
									display: flex;

									.con_text {
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #909399;
										line-height: 40rpx;
									}

									.con_text:nth-child(2) {
										color: $gtProjectColor;
										margin-left: 24rpx;
									}

									.con_icon {
										width: 24rpx;
										height: 24rpx;
										margin-left: 8rpx;
									}
								}
							}
						}
					}

					.con_right {
						width: 48rpx;
						height: 48rpx;
						align-self: center;
					}
				}
			}

			.con_lineInfo {
				.con_title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
				}

				.con_keyVal {
					.con_text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 40rpx;
						margin: 8rpx 0;
					}
				}
			}

			.con_orderInfo {
				.u-checkbox {
					margin: 8rpx 0;

					.con_text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 40rpx;
						width: 650rpx;
					}
				}
			}
		}
	}
</style>