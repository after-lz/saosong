<template>
	<view class="gt_content">
		<view class="card">
			<view class="record" @click="goDetail">反馈记录</view>
			<text>我的意见是关于：</text>
			<view class="suggest">
				<view class="suggest_item" v-for="(item, index) in suggestList" :key="index"
					:class="type === item ? 'active' : ''" @click="type = item">
					{{ item }}
				</view>
			</view>
			<text class="suggest_title">我的意见/建议是：</text>
			<view class="remark">
				<view class="remark_content">
					<textarea v-model.trim="content" auto-height :maxlength="300" placeholder="请将您宝贵意见在这里告诉我们吧~"></textarea>
					<view class="remark_num">
						<text style="color: #909399;">{{ content.length }}</text>
						<text>/300</text>
					</view>
				</view>
				<view class="upload">
					<u-upload ref="uUpload" :auto-upload="false" max-count='3' :custom-btn="true"
							@on-choose='uploadImg' @on-remove='del'>
						<view class="upload_item" slot="addBtn" hover-class="slot-btn__hover" hover-stay-time="150">
							<view class="none">
								<image :src="gtCommon.getOssImg('message/upload.png')" mode="widthFix"></image>
								<text class="msg1">照片</text>
							</view>
						</view>
					</u-upload>
				</view>
			</view>
		</view>
		<view class="msg">
			<view>
				<text style="color: #909399;">下单操作、收费标准、电子面单等问题查看</text>
				<text style="color: #485ef4;" @click="goProblem">常见问题</text>
				<u-icon name="arrow-right" color="#485ef4"></u-icon>
			</view>
			<view>
				<text style="color: #909399;">如需客服协助，请联系</text>
				<text style="color: #485ef4;" @click="dial">在线客服</text>
				<u-icon name="arrow-right" color="#485ef4"></u-icon>
			</view>
		</view>
		<view class="footer">
			<u-button type='primary' @click="submit" :disabled="_disabled">提交</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				suggestList: ['新功能建议', '功能问题', '平台规则', '其他'],
				content: '',
				fileList: [],
				type: undefined
			}
		},
		computed: {
			_disabled() {
				let gt = this
				return !gt.content.length || gt.type === undefined
			}
		},
		methods: {
			uploadImg(file) {
				let gt = this
				gt.gtRequest.upload(file.fileInfo).then(res => {
					gt.fileList.push(res.src)
				})
			},
			del(index) {
				let gt = this
				gt.fileList.splice(index, 1)
			},
			goProblem() {
				uni.navigateTo({
					url: './commonProblem'
				})
			},
			dial() {
				uni.makePhoneCall({
					phoneNumber: '4008899050'
				})
			},
			submit() {
				let gt = this
				gt.gtRequest.post("/api/applogin/advice_report", {
					platform: 'logistics',
					type: gt.type,
					content: gt.content,
					imgs: gt.fileList.join(',')
				}).then(res => {
					gt.$refs.uToast.show({
						title: '提交成功',
						type: 'success',
						back: true
					})
				})
			},
			goDetail() {
				uni.navigateTo({
					url: './feedBackRecording'
				})
			}
		}
		// onNavigationBarButtonTap(event) {
		// 	if(event.text === '反馈记录') {
		// 		let gt = this
		// 		console.log(111)
		// 	}
		// },
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding: 20rpx 16rpx;
			color: #000;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			.card {
				position: relative;
				padding: 36rpx 24rpx 24rpx;
				border-radius: 16rpx;
				background-color: #fff;
				.record {
					position: absolute;
					right: 24rpx;
					top: 18rpx;
				}
				.suggest {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					margin-top: 10rpx;
					.suggest_item {
						height: 64rpx;
						line-height: 64rpx;
						padding: 0 32rpx;
						border: 2rpx solid #909399;
						border-radius: 8rpx;
						margin-top: 14rpx;
						margin-right: 16rpx;
					}
					.active {
						border: 2rpx solid #485EF4;
						background-color: #eceefd;
					}
				}
				.suggest_title {
					display: block;
					margin: 40rpx 0 34rpx 0;
				}
				.remark {
					background-color: #F4F4F4;
					border-radius: 8rpx;
					padding: 24rpx 24rpx 32rpx 24rpx;
					.remark_content {
						textarea {
							width: 100%;
						}
					}
					.remark_num {
						border-bottom: 2rpx solid #e8e8e8;
						padding: 16rpx 0;
						text-align: right;
					}
					.upload {
						margin-top: 20rpx;
						.u-list-item {
							width: 160rpx !important;
							height: 160rpx !important;
						}
						.upload_item {
							width: 160rpx;
							height: 160rpx;
							position: relative;
							border-radius: 16rpx;
							border: 2rpx dashed #D6D6D6;
							margin: 10rpx;
							.none {
								display: flex;
								justify-content: center;
								flex-wrap: wrap;
								margin-top: 36rpx;
								image {
									width: 48rpx;
									height: 48rpx;
								}
								.msg1 {
									display: block;
									text-align: center;
									color: #909399;
									margin-top: 16rpx;
									font-size: 24rpx;
								}
							}
						}
					}
				}
			}
			.msg {
				padding: 24rpx;
				font-size: 24rpx;
				&>view {
					margin-top: 18rpx;
				}
			}
			.footer {
				margin-top: 120rpx;
			}
		}
	}
</style>