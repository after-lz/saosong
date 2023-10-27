<template>
	<view class="gt_content">
		<view class="info" :style="{'background-image': `url(${gtCommon.getOssImg('user/card_bg.png')})`}">
			<view class="info_top">
				<view>清零时间：{{ gtCommon.formateTime(data.nextClearTime, 'YYYY-MM-DD') }}</view>
				<view @click="goRecord">红包记录</view>
			</view>
			<view class="info_bottom">
				<view class="balance">{{ data.money02.toFixed(2) }}</view>
				<view class="con_btnItem" @click="goBalance" :class="data.zhuanyueeSwitch ? '' : 'dis'" v-if="data.zhuanyueeSwitch">
					<text>转到余额</text>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="card_title">做任务赢红包</view>
			<view class="card_content">
				<view class="card_item" v-for="item in list" :key='item.id'>
					<template v-if="item.type === 1">
						<view class="item_msg">
							<image :src="gtCommon.getOssImg('user/task01.png')"></image>
							完成企业入驻信息，得红包
						</view>
						<view class="btn bg_red" v-if="is_company_approve">已完成</view>
						<view class="btn" @click="goNext(1)" v-else>领取</view>
					</template>
					<template v-if="item.type === 2">
						<view class="item_msg">
							<image :src="gtCommon.getOssImg('user/task02.png')"></image>
							发布专线，得红包
						</view>
						<view class="btn bg_red" v-if="flag">已完成</view>
						<view class="btn" @click="goNext(2)" v-else>去发布</view>
					</template>
					<template v-if="item.type === 3">
						<view class="item_msg">
							<image :src="gtCommon.getOssImg('user/task03.png')"></image>
							接单赢红包，单单有红包
						</view>
						<view class="btn" @click="goNext(3)">去接单</view>
					</template>
				</view>
			</view>
		</view>
		<view class="msg" v-html="data.ruleStr"></view>
		<view class="rule">
			<text>详细规则请阅读</text>
			<text class="ruleDetail" @click="read">《红包使用规则》</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						id: 1,
						type: 1
					},
					{
						id: 2,
						type: 2
					},
					{
						id: 3,
						type: 3
					}
				],
				data: {
					nextClearTime: '', // 下次清零时间
					money02: 0, // 红包金额
					zhuanyueeSwitch: 0, // 是否可以转余额
					ruleStr: '' // 规则
				},
				is_company_approve: false,
				flag: false
			}
		},
		onLoad() {
			let gt = this
			gt.is_company_approve = uni.getStorageSync("companyInfo").is_company_approve
			// 是否有专线
			gt.gtRequest.post("/logistics/specialline/get_special_line_list", {
				page: 1,
				limit: 9999
			}).then(res => {
				gt.flag = res.list.length
			})
		},
		onShow() {
			let gt = this
			gt.getList()
		},
		methods: {
			getList() {
				let gt = this
				let params = {
					platform: 'logistics'
				}
				gt.gtRequest.post("/api/applogin/get_redpack_config", params).then(res=> {
					gt.data = res
				})
			},
			goBalance() {
				uni.navigateTo({
					url: './transferBalance?params=' +encodeURIComponent(JSON.stringify(this.data))
				})
			},
			goNext(type) {
				switch (type){
					case 1:
						uni.navigateTo({
							url: '/subSansong/pages/sansong/companyJoin'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/subSansong/pages/sansong/lineAdd'
						})
						break;
					case 3:
						uni.switchTab({
							url: '/pages/index/index'
						})
						break;
					default:
						break;
				}
			},
			goRecord() {
				uni.navigateTo({
					url: './packetRecord'
				});
			},
			goRules() {
				uni.navigateTo({
					url: './packetRules'
				})
			},
			read() {
				let gt = this
				gt.gtCommon.goLicence('https://saasdemo.sansongkeji.com/adminsite/#/agreement/logistics')
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F3F4F5;
		.gt_content {
			padding: 16rpx;
		}
		.info {
			width: 100%;
			height: 368rpx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			background-repeat: no-repeat;
			background-size: 718rpx 368rpx;
			margin-left: calc((100% - 718rpx)/2);
			padding: 24rpx;
			color: #fff;
			.info_top {
				width: 100%;
				font-size: 28rpx;
				padding-right: 0 40rpx;
				display: flex;
				justify-content: space-between;
			}
			.info_bottom {
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				.balance {
					width: 100%;
					text-align: center;
					font-size: 80rpx;
				}
				.con_btnItem {
					width: 200rpx;
					height: 72rpx;
					border-radius: 16rpx;
					color: #485EF4;
					line-height: 72rpx;
					text-align: center;
					background-color: #fff;
					margin-top: 32rpx;
				}
			}
		}
		.card {
			.card_title {
				font-size: 34rpx;
				font-weight: 700;
				margin: 40rpx 0 24rpx 0;
			}
			.card_content {
				display: flex;
				flex-wrap: wrap;
				background-color: #ffffff;
				border-radius: 16rpx;
				.card_item {
					width: 100%;
					height: 139rpx;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 20rpx;
					border-bottom: 2rpx solid #f2f2f2;
					.item_msg {
						display: flex;
						align-items: center;
						image {
							width: 80rpx;
							height: 80rpx;
							margin-right: 24rpx;
						}
					}
					.btn {
						width: 144rpx;
						height: 64rpx;
						line-height: 64rpx;
						text-align: center;
						border-radius: 10rpx;
						background-color: $gtProjectColor;
						color: #dfebfc;
					}
				}
			}
		}
		.bg_red {
			background-color: #FF6067 !important;
		}
		.msg {
			margin-top: 40rpx;
			color: #909399;
		}
		.dis {
			color: #909399 !important;
		}
		.rule {
			margin-top: 40rpx;
			color: #909399;
			.ruleDetail {
				color: $gtProjectColor;
			}
		}
	}
</style>