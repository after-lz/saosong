<template>
	<u-popup mode="bottom" v-model="_show" border-radius='16'>
		<view class="content">
			<view class="title">选择续费或升级</view>
			<view class="title_msg">精选推广权益</view>
			<view class="items">
				<view class="item" @click="promote_type = type">
					<view class="item_left">
						￥{{num}}
					</view>
					<view class="item_right">
						<view class="name">{{name}}</view>
						<view class="icon" :style="{backgroundImage:
							  `url(${gtCommon.getOssImg(promote_type === type ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
						</view>
					</view>
				</view>
				<view class="item gold" @click="promote_type = 1" v-if="data.linePromote_gold_annual_switch">
					<view class="item_left">
						￥{{data.linePromote_gold_annual_nowMoney}}
					</view>
					<view class="item_right">
						<view class="name">升级金卡年度推广</view>
						<view class="icon" :style="{backgroundImage:
							  `url(${gtCommon.getOssImg(promote_type === 1 ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
						</view>
					</view>
				</view>
				<view class="item gold" @click="promote_type = 2" v-if="data.linePromote_gold_semi_switch">
					<view class="item_left">
						￥{{data.linePromote_gold_semi_nowMoney}}
					</view>
					<view class="item_right">
						<view class="name">升级金卡半年推广</view>
						<view class="icon" :style="{backgroundImage:
							  `url(${gtCommon.getOssImg(promote_type === 2 ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
						</view>
					</view>
				</view>
				<view class="item gold" @click="promote_type = 3" v-if="data.linePromote_gold_quarter_switch">
					<view class="item_left">
						￥{{data.linePromote_gold_quarter_nowMoney}}
					</view>
					<view class="item_right">
						<view class="name">升级金卡季度推广</view>
						<view class="icon" :style="{backgroundImage:
							  `url(${gtCommon.getOssImg(promote_type === 3 ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
						</view>
					</view>
				</view>
			</view>
			<view class="tips">
				<u-icon name="volume" size="28"></u-icon>
				<view class="tips_name">选择金卡服务将不退还已缴纳的费用</view>
			</view>
			<u-button type="primary" shape='circle' @click="confirm">立即支付</u-button>
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
			type: {
				type: Number,
				default: -1
			},
			data: {
				type: Object,
				default: ()=> {
					return {}
				}
			}
		},
		data() {
			return {
				promote_type: -1
			}
		},
		computed: {
			_show: {
				get() {
					return this.show
				},
				set(val) {
					if(val === true) this.promote_type = this.type
					this.$emit('update:show', val)
				}
			},
			num() {
				let gt = this
				let str = 0
				switch (parseInt(gt.type)) {
					case 6:
						str = gt.data.linePromote_silver_annual_nowMoney
						break;
					case 7:
						str = gt.data.linePromote_silver_semi_nowMoney
						break;
					case 8:
						str = gt.data.linePromote_silver_quarter_nowMoney
						break;
					default:
						break;
				}
				return str
			},
			name() {
				let gt = this
				let str = ''
				switch (parseInt(gt.type)) {
					case 6:
						str = '续费银卡年度推广'
						break;
					case 7:
						str = '续费银卡半年推广'
						break;
					case 8:
						str = '续费银卡季度推广'
						break;
					default:
						break;
				}
				return str
			}
		},
		methods: {
			confirm() {
				this._show = false
				this.$emit('confirm', this.promote_type)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.content {
			padding: 40rpx 78rpx 88rpx 78rpx;
			.title {
				font-size: 32rpx;
				text-align: center;
				font-weight: 700;
			}
			.title_msg {
				color: #696969;
				font-size: 24rpx;
				text-align: center;
				margin-top: 6rpx;
			}
			.items {
				.item {
					position: relative;
					height: 50rpx;
					line-height: 50rpx;
					margin-top: 38rpx;
					.item_left {
						width: 174rpx;
						padding-left: 40rpx;
						background: linear-gradient(
							to right,
							#C3CCE9,
							#fff
						);
						border-radius: 14rpx 0 0 14rpx;
					}
					.item_right {
						position: absolute;
						top: 0;
						left: 160rpx;
						width: 440rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 40rpx 0 60rpx;
						background: linear-gradient(
							to right,
							#F1F4FF,
							#F8F9FF
						);
						border-radius: 25rpx 14rpx 14rpx 25rpx;
						.name {
							color: #000;
						}
						.icon {
							width: 26rpx;
							height: 26rpx;
							background-size: cover;
							background-repeat: no-repeat;
						}
					}
				}
				.gold {
					.item_left {
						color: #745D00;
						background: linear-gradient(
							to right,
							#F4D1AC,
							#FFF9F2
						);
					}
					.item_right {
						background: linear-gradient(
							to right,
							#F4D1AB,
							#FFEBD4
						);
					}
				}
			}
			.tips {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 46rpx 0 14rpx 0;
				.tips_name {
					font-size: 24rpx;
					color: #777777;
					margin-left: 16rpx;
				}
			}
		}
	}
</style>