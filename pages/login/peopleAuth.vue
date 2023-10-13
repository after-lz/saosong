<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_gap">
			<u-gap height="20" bg-color="#F3F4F5"></u-gap>
		</view>
		<view class="con_form">
			<view class="con_keyVal">
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>真实姓名</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="name" type="text" height="40" input-align="right" :clearable="false"
								placeholder="请填写您的本人的真实姓名" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="682rpx" margin="32rpx 0 0 34rpx"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>身份证号</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="idSn" type="idcard" height="40" input-align="right" :clearable="false"
								placeholder="请填写您的本人的身份证号" />
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="con_tip">
			<text>请认真填写，若姓名与身份证不匹配，则验证失败！</text>
		</view>

		<view class="con_submitBtn" @click="$u.throttle(submitForm,1000)">
			<text>提交认证</text>
		</view>

		<view class="con_skipBtn" @click="skip" v-if="!flag">
			<text>跳过</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				idSn: '',
				flag: '',
				lyBDFaceAuthIOS: null,
				metaInfo: {},
				autherInfo: {}
			}
		},
		onLoad(option) {
			let gt = this
			gt.flag = option.flag
			// #ifdef APP-PLUS
			gt.lyBDFaceAuthIOS = uni.requireNativePlugin('AP-FaceDetectModule')
			gt.metaInfo = gt.lyBDFaceAuthIOS.getMetaInfo()
			// #endif
		},
		methods: {
			submitForm() {
				let gt = this
				if (gt.$u.test.isEmpty(gt.name)) {
					return gt.$refs.uToast.show({
						title: '真实姓名不能为空',
						type: 'error'
					})
				}
				if (gt.$u.test.isEmpty(gt.idSn)) {
					return gt.$refs.uToast.show({
						title: '身份证号码不能为空',
						type: 'error'
					})
				}
				if (!gt.$u.test.idCard(gt.idSn)) {
					return gt.$refs.uToast.show({
						title: '身份证号码格式不正确',
						type: 'error'
					})
				}
				let params = {
					unid: uni.getStorageSync('userInfo').unid,
					metaInfo: JSON.stringify(gt.metaInfo),
					truename: gt.name,
					cardno: gt.idSn,
					platform: 'logistics'
				}
				gt.gtRequest.post("/api/aliyun/get_init_face_verify", params).then(res => {
					this.autherInfo = res
					gt.verifyC(res.CertifyId)
				})
			},
			skip() {
				let pages = getCurrentPages()
				uni.reLaunch({
					url: pages[0].$page.fullPath
				})
			},
			verifyC(certifyId) {
				let gt = this
			    gt.lyBDFaceAuthIOS.verify({ certifyId }, function(res) {
					if(res.code === 1000) {
						gt.result()
					} else {
						gt.$refs.uToast.show({
							title: '实名认证失败',
							type: 'error'
						})
					}
			    })
			},
			result() {
				let gt = this
				gt.gtRequest.post("/api/aliyun/get_describe_face_verify", {
					unid: uni.getStorageSync('userInfo').unid,
					...gt.autherInfo
				}).then(res => {
					if(res.Code == 200) {
						uni.setStorageSync('userAuth', 1)
						let userInfo = uni.getStorageSync('userInfo')
						userInfo.truename = gt.name
						uni.setStorageSync('userInfo', userInfo)
						// let pages = getCurrentPages()
						// let url = pages[0].$page.fullPath
						gt.$refs.uToast.show({
							title: '实名认证成功',
							type: 'success',
							isTab: true,
							back: true,
							// url: url
						})
					} else {
						gt.$refs.uToast.show({
							title: '实名认证失败',
							type: 'error'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_form {
				.con_upload {
					width: 230rpx;
					height: 230rpx;
					margin: 84rpx 260rpx;
					border-radius: 16rpx;
					border: 2rpx dashed #D6D6D6;
				}

				.con_keyVal {
					width: 750rpx;
					// height: 520rpx;
					background: #FFFFFF;
					padding-bottom: 32rpx;

					.con_key_val {
						display: flex;
						justify-content: space-between;

						.con_key {
							display: flex;
							margin: 32rpx 0 0 24rpx;

							.con_required {
								width: 16rpx;
								height: 40rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #FF6067;
								line-height: 40rpx;
							}

							.con_text {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
							}
						}

						.con_val {
							display: flex;
							margin: 32rpx 40rpx 0 0;

							.con_input {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
								width: 500rpx;
							}

							.con_icon {
								margin-left: 16rpx;
							}
						}
					}
				}
			}

			.con_tip {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FF6067;
				line-height: 34rpx;
				margin: 20rpx 40rpx;
			}

			.con_submitBtn {
				width: 640rpx;
				height: 100rpx;
				background: $gtProjectColor;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 100rpx;
				margin: 210rpx auto 0 auto;
				text-align: center;
			}

			.con_skipBtn {
				// width: 640rpx;
				// height: 100rpx;
				// background: #9DA9F4;
				// border-radius: 16rpx;
				// font-size: 32rpx;
				// font-family: PingFangSC-Medium, PingFang SC;
				// font-weight: 500;
				// color: #FFFFFF;
				// line-height: 100rpx;
				margin: 40rpx auto;
				text-align: center;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #909399;
				line-height: 44rpx;
			}
		}
	}
</style>