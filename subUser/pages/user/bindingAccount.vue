<template>
	<view class="gt_content">
		<u-toast ref="uToast" />
		<view class="top-view">
			<view class="item-li flex-left">
				<view class="left">
					<text>账号</text>
				</view>
				<view class="con">
					<u-input placeholder="请输入支付宝账号(仅限手机号)" type="number" v-model="formData.alipay"></u-input>
				</view>
			</view>
			<view class="item-li flex-left">
				<view class="left">
					<text>姓名</text>
				</view>
				<view class="con">
					<text>{{ formData.truename }}</text>
				</view>
			</view>
			<view class="item-li flex-left">
				<view class="left">
					<text>验证码</text>
				</view>
				<view class="con">
					<u-input placeholder="请输入验证码" v-model="formData.verify_code"></u-input>
				</view>
				<view class="right flex-con">
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange" start-text="获取验证码"></u-verification-code>
					<view @click="getCode" :text="tips"class="code-text">{{tips}}</view>
				</view>
			</view>
		</view>
		<view class="tip-view">
			<view class="tip-title">
				<text>温馨提示</text>
			</view>
			<view class="tip-li">
				<text>1. 支付宝账号为手机号，请勿填写银行卡号或者身份证号；</text>
			</view>
			<view class="tip-li">
				<text>2. 姓名为你的真实中文姓名，请勿填写数字或字母</text>
			</view>
		</view>
		<u-gap :height="90"></u-gap>
		<view class="bot-view safe-bottom">
			<view class="but-view flex-con" @click="bindClick">
				绑定支付宝账户
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "bindCollectionAccount",
		data() {
			return {
				data: {},
				formData: {
					alipay: "",
					truename: "",
					verify_code: ""
				},
				seconds: 60,
				tips: '获取验证码',
				refCode: null
			}
		},
		onLoad() {
			this.data = uni.getStorageSync("user_info")
			this.formData = {
				alipay: this.data.alipay,
				truename: this.data.truename,
				verify_code: ""
			}
		},
		onReady() {
			let that = this
			that.refCode = that.$refs.uCode
		},
		methods: {
			end() {
				console.log('倒计时结束')
			},
			start() {
				console.log('倒计时开始')
			},
			codeChange(text) {
				this.tips = text
			},
			// 获取验证码按钮
			getCode() {
				const isPhone = this.$u.test.mobile(this.formData.alipay)
				if(isPhone) {
					if (this.refCode.canGetCode){
						const info = {
							type: '1',
							mobile: this.formData.alipay
						}
						uni.showLoading({
							title: '正在获取验证码'
						})
						setTimeout(() => {
							uni.hideLoading()
							this.refCode.start()
							this.gtRequest.post("/api/applogin/get_verify_code", info).then(res=> {
								
							})
						}, 1000)		
					} else {
						this.$refs.uToast.show({
							title: '倒计时结束后再发送'
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '请正确输入支付宝账号'
					})
				}
			},
			
			bindClick() {
				if(!this.formData.alipay) return this.$refs.uToast.show({title: '支付宝账号不可为空'})
				const isPhone = this.$u.test.mobile(this.formData.alipay)
				if(!isPhone) return this.$refs.uToast.show({title: '请正确输入支付宝账号'})
				if(!this.formData.verify_code) return this.$refs.uToast.show({title: '验证码不可为空'})
				const info = {
					platform: "logistics",
					...this.formData
				}
				this.gtRequest.post("/api/applogin/bind_alipay", info).then(res=> {
					this.data.alipay = this.formData.alipay
					uni.setStorageSync("user_info", this.data)
					this.$refs.uToast.show({
						title: '绑定成功',
						type: 'success',
						back: true
					})
				})
				.catch(err => {
					this.$refs.uToast.show({title: err.msg})
					console.log("绑定失败！", err.msg)
				})
			}
		}
	}
</script>
<style lang="scss">
	page {
		background: $gtBackgroundColor;
	}
	.gt_content{
		.top-view{
			margin: 20rpx 16rpx;
			padding: 0 32rpx;
			border-radius: 16rpx;
			background-color: #FFFFFF;
			.item-li{
				width: 100%;
				height: 100rpx;
				border-bottom: 2rpx solid #e5e5e5;
				&:last-child{
					border-bottom: none !important;
				}
				.left {
					width: 120rpx;
				}
				.con{
					flex: 1;
				}
				.right{
					width: 200rpx;
					height: 100%;
					position: relative;
					font-size: 26rpx;
					color: #5A6EFD;
					&::before{
						content: "";
						position: absolute;
						width: 1px;
						height: 20px;
						left: 0;
						top: 15px;
						background-color: #e5e5e5;
					}
				}
			}
		}
		.tip-view{
			padding: 0 20rpx;
			.tip-title{
				width: 100%;
				font-weight: bold;
				font-size: 30rpx;
				color: #000000;
				margin-bottom: 10rpx;
			}
			.tip-li{
				font-size: 24rpx;
				color: #777777;
				margin-bottom: 10rpx;
			}
		}
		.bot-view{
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			width: 100%;
			z-index: 999;
			.but-view{
				margin: 20px 16rpx;
				border-radius: 16rpx;
				height: 50px;
				background-color: #5A6EFD;
				color: #FFFFFF;
				font-size: 28rpx;
			}
		}
		.flex-left {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}
		.flex-con {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>