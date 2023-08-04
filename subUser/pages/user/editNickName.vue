<template>
	<view class="gt_content">
		<u-input v-model.trim="value" type="textarea" height="36" :auto-height="true" />
		<view class="msg">输入新的名字</view>
		<u-button type="primary" @click="save">保存</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		onLoad(option) {
			let gt = this
			gt.value = option.name
		},
		methods: {
			async save() {
				let gt = this
				let pages = getCurrentPages()  //获取所有页面栈实例列表
				let nowPage = pages[ pages.length - 1]  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ]  //上一页页面实例
				await prevPage.$vm.updateUserInfo({
					update_type: 'nickname',
					value: gt.value
				})
				prevPage.$vm.userInfo.nickname = gt.value   //修改上一页data里面的数据
				prevPage.$vm.updateStorage()
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.gt_content {
		padding: 30rpx 20rpx;
	}
	.msg {
		margin: 16rpx 0 30rpx;
		color: #ddd;
	}
	.u-input__input {
		border-bottom: 2rpx solid #ddd;
		padding: 10rpx 18rpx !important;
	}
</style>