<template>
	<u-modal v-model="_show" width='100%'
			:show-title='false' :show-confirm-button='false' :mask-close-able="true"><!--  :zoom='false' -->
		<view class="videoModal">
			<video :src="src" class="myVideo" :show-mute-btn="true"></video>
		</view>
	</u-modal>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			src: {
				type: String,
				default: ''
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
		}
	}
</script>

<style lang="scss" scoped>
	.videoModal {
		height: 700rpx;
		.myVideo {
			width: 100%;
			height: 100%;
		}
	}
</style>