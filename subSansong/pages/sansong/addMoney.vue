<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_money">
			<view class="con_select_input">
				<view class="con_select">
					<view class="con_text" @click="showFeeType">
						<text>{{feeType}}</text>
					</view>
					<view class="con_icon">
						<u-icon name="arrow-down"></u-icon>
					</view>

				</view>
				<view class="con_input_unit">
					<view class="con_input">
						<u-input v-model="money" type="digit" :clearable="false" placeholder="请输入实际产生费用"
							height="60" />
					</view>
					<view class="con_unit">
						<text>元</text>
					</view>
				</view>
			</view>
			<view class="con_imgs">
				<view class="con_upload">
					<u-upload ref="uUpload" :auto-upload="false" max-count="3" width="200" height="200"
						upload-text="上传照片" index="staffImgArr" @on-choose="chooseImg" @on-remove="removeImg"></u-upload>
				</view>
			</view>
		</view>

		<view class="con_btn" @click="submitForm">
			<text>确认增加</text>
		</view>


		<view class="con_popup">
			<view class="con_refuse">
				<u-popup v-model="feeTypeShow" mode="bottom" height="700" border-radius="22">
					<view class="con_title">
						<text>费用类目</text>
					</view>
					<view class="con_radio">
						<u-radio-group v-model="feeType" :wrap="true">
							<u-radio v-for="(item, index) in feeTypeList" :key="index" :name="item.name">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
					<!-- <view class="con_textarea">
						<u-input v-model="otherFeeType" type="textarea " placeholder="请输入费用类目" />
					</view> -->
					<view class="con_confirmBtn" @click="confirmFeeType">
						<text>确定</text>
					</view>
				</u-popup>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderSn: '',
				feeType: '搬运费',
				money: '',
				imgArr: [],

				feeTypeShow: false,
				feeTypeList: [{
					id: 1,
					name: '搬运费',
					value: 1,
				}, {
					id: 1,
					name: '等待费',
					value: 1,
				}, {
					id: 1,
					name: '过路费',
					value: 1,
				}, {
					id: 1,
					name: '高速费',
					value: 1,
				}, {
					id: 1,
					name: '停车费',
					value: 1,
				}, {
					id: 1,
					name: '其他',
					value: 1,
				}],
				otherFeeType: '',

			}
		},
		onLoad(options) {
			let gt = this;
			gt.orderSn = options.orderSn;
		},
		methods: {
			showFeeType() {
				let gt = this;
				gt.feeTypeShow = true;
			},
			confirmFeeType() {
				let gt = this;
				if (gt.feeType == '其他') {

				}
				// gt.feeType = gt.otherFeeType;
				gt.feeTypeShow = false;
			},
			chooseImg(item,index) {
				console.log(item);
				console.log(index);
				let gt = this;

				var file = item.fileInfo;

				gt.gtRequest.upload(file).then(res => {
					gt.imgArr.push(res.src);
				});
			},
			removeImg(index) {
				let gt = this;

				gt.imgArr.splice(index, 1);
			},
			submitForm(){
				let gt = this;
				if (!gt.$u.test.amount(gt.money)) {
					gt.$refs.uToast.show({
						title: '费用不能为空',
						type: 'error',
					});
					return false;
				}
				
				var url = "/logistics/order/add_order_fee";
				var data = {
					deliver_sn:gt.orderSn,
					money:gt.money,
					// fee_notice:gt.feeType == '其他'?gt.otherFeeType:gt.feeType,
					fee_notice:gt.feeType,
					fee_pic:gt.imgArr.join('||'),
				};
				console.log(data);
				// return false;
				gt.gtRequest.post(url,data).then(res=>{
					gt.$refs.uToast.show({
						title: '增加成功',
						type: 'success',
						back:true,
					});
				});
			},

		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_money {
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_select_input {
					display: flex;

					.con_select {
						display: flex;

						.con_text {
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 60rpx;
						}

						.con_icon {
							margin: 12rpx 0 0 12rpx;
						}
					}

					.con_input_unit {
						display: flex;
						margin-left: 24rpx;

						.con_input {
							width: 310rpx;
							height: 60rpx;
							background: #F4F4F4;
							border-radius: 8rpx;
							padding: 0 16rpx;
						}

						.con_unit {
							margin-left: 16rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 60rpx;
						}
					}
				}

				.con_imgs {
					margin-top: 32rpx;
					width: 718rpx;
					// height: 284rpx;
					background: #FFFFFF;
					border-radius: 16rpx;
				}
			}

			.con_btn {
				width: 718rpx;
				height: 100rpx;
				background: $gtProjectColor;
				border-radius: 16rpx;
				margin: 450rpx 16rpx 100rpx 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 100rpx;
				text-align: center;
			}

			.con_popup {
				.con_refuse {
					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						margin-top: 40rpx;
						text-align: center;
					}

					.con_radio {
						margin: 20rpx 32rpx 0 40rpx;

						.u-radio {
							flex-direction: row-reverse;
							justify-content: space-between;

							.u-radio__label {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
								margin: 16rpx 0;
								width: 600rpx;
							}
						}
					}

					.con_textarea {
						width: 678rpx;
						height: 132rpx;
						background: #F4F4F4;
						border-radius: 20rpx;
						margin: 0 32rpx 0 40rpx;
						padding: 0 20rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						line-height: 40rpx;
					}

					.con_confirmBtn {
						width: 718rpx;
						height: 100rpx;
						background: $gtProjectColor;
						border-radius: 16rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 100rpx;
						margin: 38rpx 16rpx 32rpx 16rpx;
						text-align: center;
					}
				}

			}
		}
	}
</style>