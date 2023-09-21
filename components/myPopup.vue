<template>
	<u-popup mode="center" v-model="_show" border-radius='16' width="540">
		<view class="content">
			<view class="title">{{ title }}</view>
			<slot></slot>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
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

		}
	}
</script>

<style lang="scss">
	.content {
		.title {
			height: 82rpx;
			line-height: 82rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 600;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #000;
			background: linear-gradient(
				to bottom,
				#7889FF,
				#BCE7FF
			);
		}
	}
	
</style>