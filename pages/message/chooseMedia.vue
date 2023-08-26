<template>
	<u-popup v-model="_show" mode="bottom" border-radius="24">
		<view class="label" @click="chooseMedia(0)">照片</view>
		<view class="con_line">
			<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
		</view>
		<view class="label" @click="chooseMedia(1)">视频</view>
		<view class="con_line">
			<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
		</view>
		<view class="label" @click="_show = false">取消</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			_show: {
				get() {
					return this.show
				},
				set(val) {
					this.$emit('update:show', val)
				}
			}
		},
		methods: {
			chooseMedia(type) {
				let gt = this
				gt._show = false
				gt.$emit('chooseMedia', type)
			}
		}
	}
</script>

<style lang="scss">
	.label {
		font-size: 32rpx;
		font-weight: 400;
		color: #000000;
		line-height: 108rpx;
		text-align: center;
	}
</style>