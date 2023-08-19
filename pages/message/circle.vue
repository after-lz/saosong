<template>
	<view class="circle">
		<scroll-view scroll-y @scrolltolower="loadingMore" style="height: 100%;">
			<view class="userInfo">
				<view class="userInfo_name">{{ companyInfo.company_name }}</view>
				<u-avatar :src="companyInfo.company_pic" :size="160"></u-avatar>
			</view>
			<view class="content">
				<view class="card" v-for="item in list" :key="item.circle_id">
					<view class="card_port">
						<u-avatar :src="item.headerpic" :size="80"></u-avatar>
					</view>
					<view class="card_content">
						<view class="card_head">
							<view class="company_name">{{ item.company_name }}</view>
							<view class="company_detail" @click="goCompanyDetail">公司详情</view>
						</view>
						<view class="card_info">
							{{ item.words }}
						</view>
						<!-- <view class="" v-if="item.circle_id == 180">
							<video :src="a.url" v-for="a in item.fileList" :key="a.url" class="video"></video>
						</view> -->
						<view class="card_footer">
							<view class="creat_time">
								
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" />
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyInfo: {},
				params: {},
				list: [],
				status: 'loading'
			}
		},
		mounted() {
			let gt = this
			gt.companyInfo = uni.getStorageSync('companyInfo')
			gt.params = {
				page: 1,
				limit: 10,
				keyword_role: 1
			}
			gt.getList()
		},
		methods: {
			getList() {
				let gt = this
				gt.gtRequest.post('/logistics/circle/list', gt.params).then(res => {
					res.list.forEach(obj=> {
						obj.fileList = []
						obj.resource.forEach(item=> {
							obj.fileList.push({url: item})
						})
					})
					gt.list = [...gt.list, ...res.list]
					gt.status = gt.params.page >= res.totalPage ? 'nomore' : 'loading'
				})
			},
			loadingMore() {
				let gt = this
				if(gt.status === 'nomore') return
				++gt.params.page
				gt.getList()
			},
			goCompanyDetail() {
				
			}
		}
	}
</script>

<style lang="scss">
	.circle {
		background-image: url('https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/message/groupBg.png');
		height: 100%;
		width: 100%;
		background-repeat: no-repeat;
		background-size: 750rpx 430rpx;
		background-color: #fff;
		font-family: PingFangSC-Regular, PingFang SC;
		.userInfo {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding-top: 350rpx;
			margin: 0 32rpx 60rpx 0;
			.userInfo_name {
				font-weight: 700;
				margin-right: 20rpx;
				margin-top: -60rpx;
			}
		}
		.video {
			display: block;
		}
		.u-more {
			margin: 36rpx 0;
		}
	}
</style>