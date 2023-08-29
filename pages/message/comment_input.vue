<template>
	<u-popup v-model="show" mode="bottom" :mask='false' :closeable="true" :safe-area-inset-bottom='true' :duration="0" @close='close' :height="height"
	:mask-close-able='false'>
		<view class="input_box" :style="{ bottom: height+'px' }">
			<textarea v-model.trim="val" class="box_input" placeholder="评论" :focus='input_focus'
				:adjust-position="false" :show-confirm-bar="false" :fixed="true" :cursor-spacing="0" 
				@focus="focusFn" @blur="show=false"></textarea>
			<view class="box_btn">
				<u-button type="primary" @click="send">发送</u-button>
			</view>
		</view>
	</u-popup>
</template>
<script>
	export default {
		data() {
			return {
				show: false,
				val: '',
				input_focus: false,
				height: '0',
				flag: false
			}
		},
		methods: {
			open(type) {
				let gt = this
				gt.flag = type
				gt.val = ''
				gt.show = true
				gt.$nextTick(()=> {
					gt.input_focus = true
				})
			},
			close() {
				let gt = this
				gt.show = false
				gt.input_focus = false
				gt.height = '0'
			},
			send() {
				let gt = this
				if(gt.val === '') return gt.close()
				gt.$emit("submit", gt.val)
				gt.close()
			},
			focusFn(e) {
				let gt = this
				let num = gt.flag ? 0 : 50
				// #ifdef MP-WEIXIN
				gt.height = (e.detail.height - 10 - num > 0) ? (e.detail.height - 10 - num + '') : '0'
				// #endif
				// #ifdef APP-PLUS
				gt.height = (e.detail.height - 50 - num > 0) ? (e.detail.height - 50 - num + '') : '0'
				// #endif
			}
		}
	}
</script>
<style lang="scss">
	.input_box {
		position: fixed;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		background-color: $gtBackgroundColor;
		.box_input {
			width: 100%;
			height: 80rpx;
			background-color: #fff;
			border-radius: 12rpx;
			padding: 10rpx 20rpx;
		}
		.box_btn {
			margin: 0 20rpx 0 40rpx;
		}
	}
</style>