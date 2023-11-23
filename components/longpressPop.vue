<template>
	<view class="shade" v-show="showShade" @click.stop="hidePop">
		<view class="pop" :style="popStyle" :class="{'show': showPop}">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		// props: {
		// 	showShade: {
		// 		type: Boolean,
		// 		default: false
		// 	}
		// },
		data() {
			return {
				showShade: false,
				showPop: false,
				popStyle: "",
				winSize: {}, // 窗口尺寸
			}
		},
		// computed: {
		// 	_showShade: {
		// 		get() {
		// 			return this.showShade
		// 		},
		// 		set(val) {
		// 			this.$emit('updata:showShade', val)
		// 		}
		// 	}
		// },
		mounted() {
			this.getWindowSize()
		},
		methods: {
			/* 获取窗口尺寸 */
			getWindowSize() {
				let gt = this
				uni.getSystemInfo({
					success: (res) => {
						gt.winSize = {
							witdh: res.windowWidth,
							height: res.windowHeight
						}
					}
				})
			},
			/* 长触菜单 */
			longtap(e) {
				let [touches, style, index] = [e.touches[0], "", e.currentTarget.dataset.index]
				// 触屏点在下半屏，菜单往上展开
				if (touches.clientY > (this.winSize.height / 2)) {
					style = `bottom:${this.winSize.height-touches.clientY}px;`
				} else {
					style = `top:${touches.clientY}px;`
				}
				// 触屏点在右半屏，菜单往左展开
				if (touches.clientX > (this.winSize.witdh / 2)) {
					style += `right:${this.winSize.witdh-touches.clientX}px;`
				} else {
					style += `left:${touches.clientX}px;`
				}
				this.popStyle = style
				this._showShade = true
				this.$nextTick(() => {
					this.showPop = true
				})
			},
			hidePop() {
				this.showPop = false
				this._showShade = false
			}
		}
	}
</script>

<style lang="scss">
	.shade {
	 	position: fixed;
	 	z-index: 100;
	 	top: 0;
	 	right: 0;
	 	bottom: 0;
	 	left: 0;
	 	-webkit-touch-callout: none;
	 	.pop {
	 		position: fixed;
	 		z-index: 101;
	 		width: 188rpx;
	 		box-sizing: border-box;
	 		font-size: 28rpx;
	 		text-align: left;
	 		color: #333;
	 		background-color: #fff;
	 		box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	 		line-height: 80rpx;
	 		transition: transform 0.15s ease-in-out 0s;
	 		user-select: none;
	 		-webkit-touch-callout: none;
	 		transform: scale(0, 0);
	 		&.show {
	 			transform: scale(1, 1);
	 		}
	 	}
	}
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		// background-color: $uni-bg-color-grey;
		min-height: 100%;
		height: auto;
	}
	.uni-list-item__container:after {
		// left: $uni-img-size-xl+$uni-spacing-row-lg !important;
	}
	.uni-list-item__container {
		padding-left: 0 !important;
	}
	/* #endif */
</style>