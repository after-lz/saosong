<template>
	<view>
		<movable-area class="movable-area" :scale-area="false" :style="getHeight">
			<movable-view class="movable-view" :class="!isRemove?'animation-info':''"
				@click="clickBtn" @touchstart="touchstart" @touchend="touchend" @change="onChange" direction="all"
				inertia="true" :x="x" :y="y" :disabled="disabled" :out-of-bounds="true" :damping="200" :friction="100"
				:style="{width: viewWidth+'px', height: viewHeight+'px'}">
				<slot></slot>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		props: {
			//是否禁用拖动
			disabled: {
				type: Boolean,
				default: false
			},
			//是否自动停靠
			canDocking: {
				type: Boolean,
				default: true
			},
			//按钮默认位置离底部距离（px）
			bottomPx: {
				type: Number,
				default: 400
			},
			//按钮默认位置离右边距离（px）
			rightPx: {
				type: Number,
				default: 5
			},
			viewWidth: {
				type: Number || String,
				default: 60
			},
			viewHeight: {
				type: Number || String,
				default: 60
			},
			viewTop: {
				type: Number || String,
				default: 0
			},
			other: {
				type: Number || String,
				default: 0
			}
		},
		data() {
			return {
				left: 0,
				top: 0,
				isRemove: true,
				windowWidth: 0,
				windowHeight: 0,
				btnWidth: 0,
				btnHeight: 100,
				x: 10000,
				y: 10000,
				old: {
					x: 0,
					y: 0
				}
			}
		},
		mounted() {
			this.getSysInfo()
		},
		computed: {
			getHeight() {
				let str = ''
				uni.getSystemInfo({
					success: (res) => {
						str = `height: ${res.windowHeight - this.viewTop - this.other}px;top: ${this.viewTop}px;`
					}
				})
				return str
			}
		},
		methods: {
			getSysInfo() {
				let sysInfo = uni.getSystemInfoSync()
				this.windowWidth = sysInfo.windowWidth
				this.windowHeight = sysInfo.windowHeight
				let view = uni.createSelectorQuery().in(this).select(".movable-view")
				view.boundingClientRect(rect => {
					this.btnWidth = 0 && rect.width
					this.btnHeight = 0 && rect.height
					this.x = this.old.x
					this.y = this.old.y
					this.$nextTick(res => {
						this.x = this.windowWidth - this.btnWidth - this.rightPx
						this.y = this.windowHeight - this.btnHeight - this.bottomPx
					})
				}).exec()
			},
			//移动按钮
			onChange(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			//开始移动
			touchstart(e) {
				this.isRemove = true
				this.$emit('touchstart')
			},
			//结束移动
			touchend(e) {
				if (this.canDocking && this.old.x) {
					this.x = this.old.x
					this.y = this.old.y
					let bWidth = (this.windowWidth - this.btnWidth) / 2
					if (this.x < 0 || (this.x > 0 && this.x <= bWidth)) {
						this.$nextTick(res => {
							this.x = 0
						})
					} else {
						this.$nextTick(res => {
							this.x = this.windowWidth - this.btnWidth
						})
					}
					this.isRemove = false
					this.$emit('touchend')
				}
			},
			//点击按钮
			clickBtn() {
				this.$emit('clickBtn')
			}
		}
	};
</script>

<style lang="scss" scoped>
	.animation-info {
		transition: left .25s ease;
	}

	.movable-area {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 8 !important;
		pointer-events: none;
		.movable-view {
			touch-action: none;
			pointer-events: auto;
		}
	}
</style>
