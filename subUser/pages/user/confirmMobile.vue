<template>
	<view class="gt_content">
		<view class="con_list">
			<view class="con_item">
				<u-input v-model="mobile" type="number" placeholder="输入新手机号"></u-input>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item">
				<u-input v-model="value" type="number" placeholder="验证码"></u-input>
				<view class="msg" @click="getCode">{{ msg }}</view>
			</view>
		</view>
		<u-button type="primary" class="btn" @click="submit" :disabled="!value">确认</u-button>
		<view class="mark">
			说明：<br>
			1、更换新号码后，账户信息不变，原来的手机号作废，下次登录需要使用新手机登录。 <br>
			2、更换的新手机号 ，不能是已注册过的账号。 <br>
			3、更换手机号后，app和小程序同步更换
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				value: '',
				msg: '获取验证码',
				codeMsg: null
			}
		},
		methods: {
			getCode() {
				let gt = this
				if(gt.codeMsg) return
				if(!gt.$u.test.mobile(gt.mobile)) {
					return gt.$refs.uToast.show({
						title: '请输入正确的手机号'
					})
				}
				gt.gtRequest.post("/api/applogin/get_verify_code", {
					mobile: gt.mobile,
					type: 1
				}).then(res=> {
					let num = 60
					gt.codeMsg = setInterval(()=> {
						--num
						gt.msg = num + 's后重发'
						if(num === -1) {
							gt.msg = '重新获取验证码'
							clearInterval(gt.codeMsg)
							gt.codeMsg = null
						}
					}, 1000)
				})
			},
			submit() {
				let gt = this
				gt.gtRequest.post("/logistics/user/bind_new_mobile", {
					mobile: gt.mobile,
					verify_code: gt.value
				}).then(res=> {
					clearInterval(gt.codeMsg)
					gt.codeMsg = null
					gt.$refs.uToast.show({
						title: res.msg || '更换成功'
					})
				})
			}
		},
		onUnload() {
			let gt = this
			clearInterval(gt.codeMsg)
			gt.codeMsg = null
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.con_list {
				background: #fff;
				color: #000000;
				margin-top: 20rpx;
				.con_item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 40rpx;
					font-size: 32rpx;
					height: 108rpx;
					line-height: 108rpx;
				}
				.msg {
					color: #485EF4;
				}
			}
			.btn {
				width: calc(100% - 32rpx);
				margin: 314rpx auto 42rpx;
				.u-btn {
					width: calc(100% - 32rpx);
					margin: 314rpx auto 42rpx;
				}
			}
			.mark {
				color: #909399;
				padding: 0 40rpx;
			}
		}
	}
</style>