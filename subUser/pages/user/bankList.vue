<template>
	<view class="gt_content">
		<view class="con_list">
			<!-- <view class="con_empty" v-if="dataList.length == 0">

				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view> -->
			<view class="con_scroll">
				<scroll-view class="scroll_view" scroll-y="true" @scrolltolower="loadMore">
					<view class="con_item" v-for="(item,index) in dataList" :key="index">

						<view class="con_icon_bankName">
							<view class="con_icon">
								<view class="con_img">
									<image :src="gtCommon.getOssImg('user/bankCardIcon.png')" mode="widthFix"></image>
								</view>
							</view>
							<view class="con_bankName">
								<text>{{item.bank_name}}</text>
							</view>
						</view>

						<view class="con_typeName">
							<text v-if="item.bank_type == 1">储蓄卡</text>
							<text v-if="item.bank_type == 2">信用卡</text>
						</view>

						<view class="con_num">
							<text>**** **** **** {{item.bank_number.substr(-4)}}</text>
						</view>
					</view>
					<view class="con_btn" @click="showAddBankCard">
						<u-icon name="plus" size="38"></u-icon>
						<text>添加银行卡</text>			
						<u-select v-model="bankCardShow" :list="bankCardTypeList" @confirm="goAdd"></u-select>
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
				bankCardShow: false,
				bankCardTypeList: [{
						label: '个人账户',
						value: '1',
					},
					{
						label: '企业账户',
						value: '2',
					},
				]
			}
		},
		onShow() {
			let gt = this;
			gt.getDataList();
		},
		methods: {
			getDataList() {
				let gt = this;
				var url = "/logistics/userbank/get_bank_list";
				var data = {
					page: 1,
					limit: 9999,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.dataList = res.list;
				});
			},
			showAddBankCard() {
				let gt = this;
				gt.bankCardShow = true;
			},
			goAdd(res){
				console.log(res);
				if(res[0].value == 1){
					uni.navigateTo({
						url:'./addBankCardPerson',
					});
					return false;
				}
				
				if(res[0].value == 2){
					uni.navigateTo({
						url:'./addBankCardCompany',
					});
					return false;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_list {
				height: calc(100vh - 170rpx);
				// border: 1rpx solid red;

				.con_scroll {
					.scroll_view {
						.con_item {
							width: 718rpx;
							// height: 256rpx;
							background: #0080DC;
							border-radius: 16rpx;
							margin: 20rpx 16rpx;
							padding: 24rpx;

							.con_icon_bankName {
								display: flex;

								.con_icon {
									width: 80rpx;
									height: 80rpx;
									background: #fff;
									border-radius: 50%;
									
									.con_img{
										width: 40rpx;
										height: 40rpx;
										margin: 20rpx;
									}
									
								}

								.con_bankName {
									font-size: 32rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #FFFFFF;
									line-height: 44rpx;
									margin-top: 18rpx;
									margin-left: 20rpx;
								}
							}

							.con_typeName {
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #FFFFFF;
								line-height: 34rpx;
								margin-top: 12rpx;
							}

							.con_num {
								font-size: 48rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #FFFFFF;
								line-height: 66rpx;
								margin-top: 14rpx;
								text-align: center;
							}
						}
					}
				}

			}

			.con_btn {
				width: 718rpx;
				height: 120rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				font-size: 42rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 120rpx;
				text-align: center;
				margin-left: 16rpx;
			}
		}
	}
</style>