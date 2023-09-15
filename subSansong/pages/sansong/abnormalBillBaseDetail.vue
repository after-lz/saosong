<template>
	<view class="card">
		<view class="card_title">
			<view class="title_name">投诉信息</view>
			<view class="title_time">{{ gtCommon.formateTime(record.create_time, 'YYYY-MM-DD HH:mm') }}</view>
		</view>
		<view class="card_content">
			<view class="complaint_content">
				<text>{{ record.content }}</text>
			</view>
			<view class="complaint_imgs">
				<view class="img" v-for="src in imgs" :key="src" :style="{backgroundImage: `url(${src})`}" @click="gtCommon.previewImgs(imgs, src)"></view>
			</view>
		</view>
		<view class="card_title">
			<view class="title_name">基本信息</view>
		</view>
		<view class="card_content">
			<view class="row">
				<view class="row_label">投诉客户</view>
				<view class="row_value">{{ record.cargo_info.nickname }}</view>
			</view>
			<view class="row">
				<view class="row_label">客户电话</view>
				<view class="row_value">
					<view class="">{{ record.cargo_info.mobile }}</view>
					<view class="phone" :style="{backgroundImage: `url(${gtCommon.getOssImg('sansong/Vector.png')})`}"
						 @click="gtCommon.callMobile(record.cargo_info.mobile)"></view>
				</view>
			</view>
			<view class="row">
				<view class="row_label">投诉类型</view>
				<view class="row_value">{{ record.type }}</view>
			</view>
			<view class="row">
				<view class="row_label">货物信息</view>
				<view class="row_value" v-if="record.deliver_info">{{record.deliver_info.goods_name}}/{{record.deliver_info.goods_number}}件/
				{{parseFloat(record.deliver_info.goods_weight)}}吨/{{parseFloat(record.deliver_info.goods_volume)}}</view>
			</view>
			<view class="row">
				<view class="row_label">交货方式</view>
				<view class="row_value">
					<text v-if="record.deliver_info.jiaohuo_type == 1">自送专线</text>
					<text v-if="record.deliver_info.jiaohuo_type == 2">上门自提</text>
				</view>
			</view>
			<view class="row">
				<view class="row_label">配送方式</view>
				<view class="row_value">
					<text v-if="record.deliver_info.peisong_type == 1">送货上门</text>
					<text v-if="record.deliver_info.peisong_type == 2">自提</text>
				</view>
			</view>
			<view class="row">
				<view class="row_label">订单编号</view>
				<view class="row_value">{{ record.deliver_sn }}</view>
			</view>
		</view>
		<view class="card_title">
			<view class="title_name">收发地址</view>
		</view>
		<view class="card_content">
			<view class="con_fromTo">
				<view class="con_left">
					<view class="con_fromIcon">
						<text>发</text>
					</view>
					<view class="con_fromToLine"></view>
					<view class="con_toIcon">
						<text>收</text>
					</view>
				</view>
				<view class="con_right">
					<view class="con_fromAddress">
						<text>{{ record.deliver_info.pickup_province }}{{ record.deliver_info.pickup_city }}{{ record.deliver_info.pickup_county }}{{ record.deliver_info.pickup_address }}</text>
					</view>
					<view class="con_toAddress">
						<text>{{record.deliver_info.receive_province}}{{record.deliver_info.receive_city}}{{record.deliver_info.receive_county}}{{record.deliver_info.receive_address}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgs: {
				type: Array,
				default: ()=> {
					return []
				}
			},
			record: {
				type: Object,
				default: ()=> {
					return {}
				}
			}
		}
	}
</script>

<style lang="scss">
	.card {
		background-color: #fff;
		border-radius: 16rpx;
		margin: 30rpx 28rpx 0;
		padding: 30rpx 25rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: #000;
		.card_title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 15rpx;
			border-bottom: 2rpx solid #e9e9e9;
			.title_name {
				font-weight: 700;
			}
			.title_time {
				font-size: 24rpx;
			}
		}
		.card_content {
			padding: 10rpx 0;
			.row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 20rpx 0;
				.row_label {
					color: #777777;
				}
				.row_value {
					display: flex;
					align-items: center;
					.phone {
						width: 34rpx;
						height: 34rpx;
						margin-left: 10rpx;
						background-size: cover;
						background-repeat: no-repeat;
					}
				}
			}
			.complaint_content {
				margin: 20rpx 0;
			}
			.complaint_imgs {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
				.img {
					width: 198rpx;
					height: 198rpx;
					border-radius: 16rpx;
					background-size: cover;
					background-repeat: no-repeat;
					margin: 10rpx;
				}
			}
			.con_fromTo {
				display: flex;
				.con_left {
					width: 48rpx;
					.con_fromIcon {
						width: 48rpx;
						height: 48rpx;
						background: $gtProjectColor;
						border-radius: 50%;
						font-size: 24rpx;
						font-weight: 400;
						color: #FFFFFF;
						text-align: center;
						line-height: 48rpx;
						margin-top: 20rpx;
					}
					.con_fromToLine {
						width: 2rpx;
						height: 96rpx;
						border: 2rpx dashed #DFDFDF;
						margin: 10rpx 0 0 24rpx;
					}
					.con_toIcon {
						width: 48rpx;
						height: 48rpx;
						background: #FFBF27;
						border-radius: 50%;
						font-size: 24rpx;
						font-weight: 400;
						color: #FFFFFF;
						text-align: center;
						line-height: 48rpx;
						margin-top: 10rpx;
					}
				}
				.con_right {
					width: calc(100% - 48rpx);
					margin: 24rpx 0 0 40rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					-webkit-user-select: text;
					-khtml-user-select: text;
					-moz-user-select: text;
					-ms-user-select: text;
					user-select: text;
					.con_fromAddress {
						font-weight: 500;
						line-height: 40rpx;
					}
					.con_toAddress {
						font-weight: 500;
						line-height: 40rpx;
					}
				}
			}
		}
	}
</style>