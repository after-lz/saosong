<template>
	<view class="gt_content">
		<view class="con_list">
			<view v-for="item in list" :key="item.key">
				<view class="con_item">
					<view class="con_text">
						<text>{{ item.key }}</text>
					</view>
					<view class="con_icon">
						<view style="color: #909399;">{{ item.value }}</view>
						<u-icon name="checkmark-circle-fill" color="#0ac220" v-if="item.status"></u-icon>
						<u-icon name="error-circle-fill" color="#ff6067" v-else></u-icon>
					</view>
				</view>
				<view class="con_line">
					<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
				</view>
			</view>
		</view>
		<u-button type="primary" class="btn" @click="show = true">申请注销</u-button>
		<u-toast ref="uToast" />
		<u-modal v-model="show" :show-title="false" :show-cancel-button="true" @confirm="confirm">
			<view class="modalContent">{{ content }}</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						key: '账户余额',
						value: '您的账户余额已清零',
						status: true
					},
					{
						key: '应收应付',
						value: '您的账单已结算完成',
						status: false
					},
					{
						key: '订单信息',
						value: '您的订单均已完成',
						status: true
					},
					{
						key: '异常订单',
						value: '您的异常订单均已处理',
						status: true
					},
					{
						key: '发票管理',
						value: '您的发票开票已完成',
						status: true
					}
				],
				apiDomain: '',
				show: false,
				content: '',
				flag: false
			}
		},
		onLoad() {
			let gt = this
			gt.apiDomain = uni.getStorageSync('apiDomain')
			gt.flag = gt.list.every(item=> item.status)
			gt.content = gt.flag ? '注销账户之后数据将被清除，确定要注销账户吗？' : '注销条件不满足，不能申请注销!'
		},
		methods: {
			confirm() {
				let gt = this
				if(!gt.flag) return
				uni.request({
					url: gt.apiDomain + "/api/applogin/logoff",
					method: 'POST',
					success: function(res) {
						if(res.data.code === '1') {
							uni.removeStorageSync('companyInfo')
							uni.removeStorageSync('userInfo')
							uni.removeStorageSync('companyAuth')
							uni.removeStorageSync('userAuth')
							uni.removeStorageSync('mobile')
							uni.removeStorageSync('openId')
							uni.removeStorageSync('audioStatus')
							uni.removeStorageSync('token_d')
							uni.removeStorageSync('tokenValid_d')
							uni.removeStorageSync('token')
							uni.removeStorageSync('tokenValid')
							gt.gtWSS.completeClose()
							gt.$refs.uToast.show({
								title: res.data.msg,
								type: 'success',
								url: "pages/login/login"
							})
						} else {
							gt.$refs.uToast.show({
								title: res.data.msg,
								type: 'error'
							})
						}
					},
					fail: function(err) {
						gt.$refs.uToast.show({
							title: err.data.msg,
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
			.con_list {
				background: #fff;
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
				.con_icon {
					display: flex;
					align-items: center;
					.u-icon {
						margin-left: 16rpx;
					}
				}
			}
			.btn {
				width: calc(100% - 32rpx);
				margin: 80rpx auto 0;
				.u-btn {
					width: calc(100% - 32rpx);
					margin: 80rpx auto 0;
				}
			}
			.modalContent {
				color: #000000;
				padding: 80rpx 70rpx;
			}
		}
	}
</style>