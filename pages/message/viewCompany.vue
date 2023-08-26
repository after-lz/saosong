<template>
	<view class="gt_content">
		<view class="head">
			<u-avatar :src="headerpic" :size="120"></u-avatar>
			<view class="company_info">
				<view class="nickname">
					{{ nickname }}
				</view>
				<view class="company_name">
					<text>公司：</text>
					<text>{{ company_name }}</text>
				</view>
				<view class="company_address">
					<text>地址：</text>
					<text>{{ company_address }}</text>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="row" @click="goCircle">
				<view class="row_name">圈子</view>
				<view class="row_cot">
					<view class="image" v-for="s in list" :key="s" :style="{'backgroundImage': `url(${s})`}"></view>
				</view>
				<view class="row_icon">
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="row" @click="goCompanyDetail" v-if="logistics_id == userId">
				<view class="row_name">公司详情</view>
				<view class="row_icon">
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				unid: '',
				headerpic: '',
				company_name: '',
				company_address: '',
				nickname: '',
				logistics_id: '',
				list: []
			}
		},
		onLoad(option) {
			let gt = this
			gt.userId = uni.getStorageSync('companyInfo').logistics_id
			gt.unid = option.keyword_unid
			gt.headerpic = option.headerpic
			gt.company_name = option.company_name
			gt.company_address = option.company_address
			gt.nickname = option.nickname
			gt.logistics_id = option.logistics_id
			gt.getList()
		},
		methods: {
			getList() {
				let gt = this
				gt.gtRequest.post('/logistics/circle/list', {
					page: 1,
					limit: 10,
					keyword_unid: gt.unid
				}).then(res => {
					for (let i = 0; i < res.list.length; i++) {
						if(res.list[i].cover) {
							gt.list.push(res.list[i].cover)
						} else {
							for (let k = 0; k < res.list[i].resource.length; k++) {
								gt.list.push(res.list[i].resource[k])
								if(gt.list.length === 4) break
							}
						}
						if(gt.list.length === 4) break
					}
				})
			},
			goCircle() {
				let gt = this
				uni.navigateTo({
					url: "./companyCircle?unid=" + gt.unid
				})
			},
			goCompanyDetail() {
				let gt = this
				uni.navigateTo({
					url: "../../subSansong/pages/sansong/companyInfo?logistics_id=" + gt.logistics_id
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $gtBackgroundColor;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #000;
		.gt_content {
			.head {
				height: 216rpx;
				display: flex;
				align-items: center;
				background-color: #fff;
				padding: 0 24rpx;
				.company_info {
					margin-left: 20rpx;
					.nickname {
						font-size: 32rpx;
						font-weight: 700;
					}
					.company_name,
					.company_address {
						font-size: 28rpx;
						margin: 8rpx 0;
					}
				}
			}
			.main {
				margin-top: 20rpx;
				background-color: #fff;
				padding: 0 24rpx;
				.row {
					height: 156rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 2rpx solid #f5f5f5;
					.row_name {
						width: 120rpx;
					}
					.row_cot {
						display: flex;
						// width: calc(100%-140rpx);
						width: 60%;
						margin: 0 24rpx;
						.image {
							width: 100rpx;
							height: 100rpx;
							margin-right: 10rpx;
							border-radius: 16rpx;
							background-repeat: no-repeat;
							background-size: cover;
							&:nth-last-child(1) {
								margin-right: 0;
							}
						}
					}
				}
			}
			
		}
	}
</style>