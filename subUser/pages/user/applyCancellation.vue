<template>
	<view class="gt_content">
		<view class="con_list">
			<view v-for="item in list" :key="item.title">
				<view class="con_item">
					<view class="con_text">
						<text>{{ item.title }}</text>
					</view>
					<view class="con_icon">
						<view style="color: #909399;">{{ item.words }}</view>
						<u-icon name="checkmark-circle-fill" color="#0ac220" v-if="item.checked"></u-icon>
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
				list: [],
				canLogout: false,
				show: false,
				content: ''
			}
		},
		onLoad() {
			let gt = this
			gt.getData()
		},
		methods: {
			getData() {
				let gt = this
				gt.gtRequest.post('/logistics/User/logoutData').then(res => {
					gt.list = res.list
					gt.canLogout = res.canLogout ? false : true
					gt.content = gt.canLogout ? '账户暂不满足注销条件！' : '注销账户之后数据将被清除，确定要注销账户吗？'
				})
			},
			confirm() {
				let gt = this
				if(gt.canLogout) return
				gt.gtRequest.post('/logistics/User/logout').then(res => {
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
						title: "注销成功",
						type: 'success',
						url: "pages/login/login"
					})
				}).catch(e=> {
					gt.$refs.uToast.show({
						title: "注销失败",
						type: 'error'
					})
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
				text-align: center;
			}
		}
	}
</style>