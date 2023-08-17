<template>
	<view class="gt_content">
		<view class="gt_title">
			<view class="gt_title_name" @click="goBack"><u-icon name="arrow-left" size="36"></u-icon></view>
			<view class="gt_title_swiper">
				<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
					swiperWidth="750" height="80" bar-width="120"></u-tabs-swiper>
			</view>
		</view>
		<swiper :current="swiperCurrent" @animationfinish="animationfinish" class="main">
			<swiper-item class="swiper-item" id="message">
				<view class="statistics">
					<view class="statistics_l">
						<view class="statistics_name">今日访客</view>
						<view class="statistics_num">
							<text class="statistics_num_c" v-if="list1.count_info">{{ list1.count_info.today_num }}</text>
							<text class="statistics_num_c" v-else>0</text>次
						</view>
					</view>
					<view class="statistics_r">
						<view class="statistics_name">历史访客</view>
						<view class="statistics_num">
							<text class="statistics_num_c" v-if="list1.count_info">{{ list1.count_info.history_num }}</text>
							<text class="statistics_num_c" v-else>0</text>次
						</view>
					</view>
				</view>
				<scroll-view scroll-y @scrolltolower="onreachBottom(1)" class="content">
					<template v-if="list1.list">
						<view class="card" v-for="item in list1.list" :key="item.visitor_id">
							<view class="headPortrait">
								<u-avatar :src="item.headerpic"></u-avatar>
							</view>
							<view class="card_info">
								用户{{ item.nickname }}查看您的公司详情
							</view>
							<view class="card_time">
								{{ formatDate(item.create_time) }}
							</view>
						</view>
						<u-loadmore :status="status1" class="more" />
					</template>
					<view class="con_empty" v-else>
						<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
							margin-top="200" font-size="32"></u-empty>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item" id="circle">
				<view class="statistics">
					<view class="statistics_l">
						<view class="statistics_name">今日联系</view>
						<view class="statistics_num">
							<text class="statistics_num_c" v-if="list2.count_info">{{ list2.count_info.today_num }}</text>
							<text class="statistics_num_c" v-else>0</text>次
						</view>
					</view>
					<view class="statistics_r">
						<view class="statistics_name">历史联系</view>
						<view class="statistics_num">
							<text class="statistics_num_c" v-if="list2.count_info">{{ list2.count_info.history_num }}</text>
							<text class="statistics_num_c" v-else>0</text>次
						</view>
					</view>
				</view>
				<scroll-view scroll-y @scrolltolower="onreachBottom(2)" class="content">
					<template v-if="list2.list">
						<view class="card" v-for="item in list2.list" :key="item.visitor_id">
							<view class="headPortrait">
								<u-avatar :src="item.headerpic"></u-avatar>
							</view>
							<view class="card_info">
								用户{{ item.nickname }},通过伞送APP拨打了贵公司电话,请及时处理
							</view>
							<view class="card_time">
								{{ formatDate(item.create_time) }}
							</view>
						</view>
						<u-loadmore :status="status2" class="more" />
					</template>
					<view class="con_empty" v-else>
						<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
							margin-top="200" font-size="32"></u-empty>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{name: '访客记录'}, {name: '联系我的'}],
				current: 0,
				swiperCurrent: 0,
				params1: {},
				params2: {},
				list1: {},
				list2: {},
				status1: 'loading',
				status2: 'loading'
			}
		},
		onLoad() {
			let gt = this
			gt.params1 = {
				page: 1,
				limit: 20,
				visitor_type: 'look_detail'
			}
			gt.params2 = {
				page: 1,
				limit: 20,
				visitor_type: 'call_mobile'
			}
			gt.getList(1)
			gt.getList(2)
		},
		onShow() {
		},
		methods: {
			getList(type) {
				let gt = this
				gt.gtRequest.post('/logistics/user/get_visitor_record', gt['params'+type]).then(res => {
					let arr = gt['params'+type].page > 1 ? gt['list'+type].list : []
					gt['list'+type] = {
						count_info: res.count_info,
						list: [...arr, ...res.list],
						now_page: res.now_page,
						total_page: res.total_page
					}
					gt['status'+type] = +res.now_page >= res.total_page ? 'nomore' : 'loading'
				})
			},
			tabsChange(index) {
				let gt = this
				gt.swiperCurrent = index
			},
			animationfinish(e) {
				let gt = this
				let current = e.detail.current
				gt.$refs.uTabs.setFinishCurrent(current)
				gt.swiperCurrent = current
				gt.current = current
			},
			onreachBottom(type) {
				let gt = this
				if(gt['status'+type] === 'nomore') return
				++gt['params'+type].page
				gt.getList(type)
			},
			formatDate(date) {
				let gt = this
				date = (date.toString()).length > 10 ? date : date * 1000
				let target = new Date(date)
				let year = target.getFullYear().toString().slice(-2)
				let month = target.getMonth() + 1
				let day = target.getDate()
				month = month > 9 ? month : '0' + month
				day = day > 9 ? day : '0' + day
				return year + "/" + month + "/" + day
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $gtBackgroundColor;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #000;
		.gt_content {
			.gt_title {
				width: 100%;
				position: fixed;
				top: 0;
				display: flex;
				align-items: flex-end;
				padding-top: 90rpx;
				z-index: 999;
				background-color: #fff;
				.gt_title_name {
					line-height: 60rpx;
					margin-left: 24rpx;
				}
				.gt_title_swiper {
					margin-left: 140rpx;
				}
			}
			.main {
				height: calc(100vh - 200rpx);
				margin-top: 190rpx;
				.statistics {
					height: 160rpx;
					background-color: #fff;
					.statistics_l,
					.statistics_r{
						width: 50%;
						height: 100%;
						display: inline-flex;
						align-items: center;
						flex-wrap: wrap;
						justify-content: center;
						.statistics_name,
						.statistics_num {
							width: 100%;
							text-align: center;
						}
						.statistics_num {
							font-weight: 700;
							font-size: 40rpx;
							.statistics_num_c {
								color: $gtProjectColor;
							}
						}
					}
				}
				.swiper-item {
					.content {
						height: calc(100% - 160rpx);
						overflow: auto;
						margin-top: 20rpx;
						background-color: #fff;
						.card {
							height: 140rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							flex-wrap: nowrap;
							margin: 0 40rpx;
							border-bottom: 2rpx solid #f2f2f2;
							.card_info {
								width: 100%;
								margin: 0 20rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 3;
								-webkit-box-orient: vertical;
							}
						}
					}
				}
			}
			.u-more {
				margin: 36rpx 0;
			}
			.con_empty {
				width: 750rpx;
				text-align: center;
			}
		}
	}
</style>