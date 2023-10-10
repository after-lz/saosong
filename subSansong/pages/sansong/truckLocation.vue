<template>
	<view class="gt_content">
		<view class="con_map" :style="{'margin-top': top}">
			<map id="myMap" style="width:750rpx;height:100%;" :markers="covers" :polyline="polyline"
				:longitude="longitude" :latitude="latitude" :show-location="false">
				<cover-view slot="callout">
					<cover-view class="con_cover" :marker-id="item.id" v-for="(item,index) in covers" :key="index">
						<cover-view class="con_item" style="padding-left: 20rpx;z-index:-99" v-if="item.text">
							<cover-view class="con_text">{{ item.text }}</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
			</map>
		</view>
		<view class="card">
			<view class="card_tabs">
				<view class="card_tab" @click="onChange(1)" :class="active === 1 ? 'active':''">货车定位</view>
				<view class="card_tab" @click="onChange(2)" :class="active === 2 ? 'active':''">货车轨迹</view>
			</view>
			<view class="card_parmas">
				<u-search shape="square" :show-action="false" height="88" bg-color="#fff" border-color="#e5e5e5"
					placeholder="请输入货车车牌查询定位" v-model="value" disabled @click='keyboard_show = true'></u-search>
			</view>
			<view class="card_parmas" v-if="active === 2">
				<u-search shape="square" :show-action="false" height="88" bg-color="#fff" border-color="#e5e5e5"
					placeholder="请选择起始时间" v-model="time" search-icon="clock" disabled @click='calendar_show = true'></u-search>
			</view>
			<view class="card_btns">
				<u-button type="primary" :custom-style="btnStyle" @click="searchLocation" :disabled="_disabled">查询定位</u-button>
			</view>
		</view>
		<cover-view class="card_info" v-show="show">
			<cover-view class="card_title">
				<cover-view class="info_status">运输中</cover-view>
				<cover-view class="info_num">皖A·AV56413</cover-view>
				<cover-image class="info_close" :src="gtCommon.getOssImg('sansong/close.png')" @click="show = false"></cover-image>
			</cover-view>
			<cover-view class="card_row">
				<cover-view>更新时间：2023-09-26 09:00</cover-view>
			</cover-view>
			<cover-view class="card_row">
				<cover-view>当前车速：60.0Km/h &nbsp; 行驶方向：西南</cover-view>
			</cover-view>
			<cover-view class="card_row">
				<cover-view>位置信息：安徽省合肥市***</cover-view>
			</cover-view>
		</cover-view>
		<u-calendar v-model="calendar_show" mode="range" @change="change"></u-calendar>
		<u-keyboard ref="uKeyboard" mode="car" v-model="keyboard_show" :mask='false' @change='valChange' @backspace='backspace'></u-keyboard>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	// #ifdef MP-WEIXIN
	import QQMapWX from '@/static/qqmap/qqmap-wx-jssdk.js'
	const tMap = new QQMapWX({
		key: 'OLGBZ-PMQ64-TVHUY-DDVGK-42GOF-Z5FP4' //腾讯地图开发者密钥
	})
	// #endif
	// #ifdef APP-PLUS
	import amapWX from '@/static/amap/amap-wx.130.js'
	const myAmapFun = new amapWX.AMapWX({
		key: '816b0fff1e1e3278798c2e12247a7948'
	})
	// #endif
	export default {
		data() {
			return {
				screenHeight: '',
				covers: [],
				latitude: 31.574729, // 纬度
				longitude: 120.301663, // 经度
				polyline: [],
				show: false,
				keyboard_show: false,
				active: 1,
				value: '',
				btnStyle: {
					height: '100rpx'
				},
				calendar_show: false,
				startDate: '',
				endDate: '',
				time: ''
			}
		},
		onLoad() {
			let gt = this
			uni.getSystemInfo({
				success(res) {
					gt.screenHeight = res.screenHeight
				}
			})
		},
		computed: {
			_disabled() {
				let gt = this
				if(gt.active === 1) {
					return gt.value === ''
				} else if(gt.active === 2) {
					return gt.value === '' || gt.time === ''
				}
			},
			top() {
				let gt = this
				let str = 0
				if(gt.calendar_show) {
					str = '-100vh'
				}
				if(gt.keyboard_show) {
					str = '-200rpx'
				}
				return str
			}
		},
		methods: {
			getDate() {
				let gt = this
				// #ifdef MP-WEIXIN
				/* 小程序纬度+经度 */
				let from = '31.59851500,120.13024100'
				let to = '39.15664000,117.16780000'
				tMap.direction({
					mode: 'driving', // driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving'(可不填)
					from: from, // 起点经纬度
					to: to, // 终点经纬度
					success: function(res) {
						let coors = res.result.routes[0].polyline
						let pl = []
						//坐标解压（返回的点串坐标，通过前向差分进行压缩）
						let kr = 1000000
						for (let i = 2; i < coors.length; i++) {
							coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr
						}
						//将解压后的坐标放入点串数组pl中
						for (let i = 0; i < coors.length; i += 2) {
							pl.push({
								latitude: coors[i],
								longitude: coors[i + 1]
							})
						}
						gt.latitude = pl[0].latitude // 纬度
						gt.longitude = pl[0].longitude // 经度
						gt.polyline.push({
							points: pl,
							color: '#30A265', // 线的填充色
							width: 6, // 折现宽度
							dottedLine: false, // 是否是 虚线
							arrowLine: true // 沿线路方向显示箭头
						})
						var MapContext = wx.createMapContext('myMap')
						MapContext.includePoints({
							points: pl,
							// 缩放视野展示所有经纬度 [上, 右, 下, 左]  
							padding: [40, 40, gt.screenHeight * 0.4, 40]
						})
					}
				})
				// #endif
				// #ifdef APP-PLUS
				/* 手机端经度+纬度 */
				let from = '120.13024100,31.59851500'
				let to = '117.16780000,39.15664000'
				myAmapFun.getDrivingRoute({
					origin: from,
					destination: to,
					success: function(data) {
						let points = []
						if (data.paths && data.paths[0] && data.paths[0].steps) {
							let steps = data.paths[0].steps
							for (let i = 0; i < steps.length; i++) {
								let poLen = steps[i].polyline.split(';')
								for (let j = 0; j < poLen.length; j++) {
									points.push({
										longitude: parseFloat(poLen[j].split(',')[0]),
										latitude: parseFloat(poLen[j].split(',')[1])
									})
								}
							}
						}
						gt.latitude = points[0].latitude // 纬度
						gt.longitude = points[0].longitude // 经度
						gt.polyline.push({
							points: points,
							color: '#30A265', // 线的填充色
							width: 6, // 折现宽度
							dottedLine: false, // 是否是 虚线
							arrowLine: true // 沿线路方向显示箭头
						})
						let MapContext = wx.createMapContext('myMap')
						MapContext.includePoints({
							points: points,
							padding: [60, 40, gt.screenHeight * 0.4, 40]
						})
					}
				})
				// #endif
			},
			change(e) {
				let gt = this
				gt.startDate = e.startDate
				gt.endDate = e.endDate
				gt.time = gt.startDate + '~' + gt.endDate
			},
			onChange(type) {
				let gt = this
				gt.active = type
				gt.value = ""
				gt.time = ""
				gt.startDate = ''
				gt.endDate = ''
				gt.covers = []
				gt.show = false
				gt.polyline = []
			},
			searchLocation() {
				let gt = this
				if (!gt.$u.test.carNo(gt.value)) {
					return gt.$refs.uToast.show({
						title: '车牌号不正确',
						type: 'error'
					})
				}
				if(gt.active === 1) {
					gt.polyline = []
					let coverItem = {
						id: 3,
						latitude: 31.574729,
						longitude: 120.301663,
						iconPath: gt.gtCommon.getOssImg('order/card.png'),
						width: 30,
						height: 16,
						customCallout: {
							display: 'ALWAYS',
							anchorX: 0,
							anchorY: -10,
						},
						// img: '',
						text: '在这里'
					}
					gt.covers.push(coverItem)
					gt.show = true
				} else if(gt.active === 2) {
					gt.covers = []
					gt.getDate()
				}
			},
			valChange(val) {
				let gt = this
				gt.value += val
			},
			backspace() {
				let gt = this
				if(gt.value.length) gt.value = gt.value.substr(0, gt.value.length - 1)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			position: relative;
			height: 100vh;
			.con_map {
				height: calc(100% - 540rpx);
				.con_cover {
					display: flex;
					box-shadow: 4rpx 4rpx 8rpx 4rpx rgba(0, 0, 0, 0.2);
					width: auto;
					min-width: 100rpx;
					min-height: 100rpx;
					justify-content: center;
					align-items: center;
					.con_item {
						background: #fff;
						border-radius: 16rpx;
						.con_img {
							width: 80rpx;
							height: 80rpx;
							border-radius: 16rpx;
							margin: 10rpx;
							overflow: hidden;
						}
						.con_text {
							font-size: 32rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 100rpx;
							padding-right: 20rpx;
						}
					}
				}
			}
			.card_info {
				position: absolute;
				top: 0;
				width: 100%;
				color: #000000;
				box-sizing: border-box;
				background-color: #fff;
				font-family: PingFangSC-Regular, PingFang SC;
				.card_title {
					position: relative;
					display: flex;
					align-items: center;
					margin: 0 24rpx 24rpx;
					.info_status {
						width: 96rpx;
						height: 48rpx;
						text-align: center;
						line-height: 48rpx;
						font-size: 24rpx;
						color: #fff;
						border-radius: 10rpx;
						background-color: #485EF4;
						margin-right: 24rpx;
						box-sizing: border-box;
					}
					.info_num {
						font-size: 36rpx;
						font-weight: 700;
					}
					.info_close {
						position: absolute;
						right: 0;
						width: 32rpx;
						height: 32rpx;
					}
				}
				.card_row {
					font-weight: 400;
					margin: 0 24rpx 10rpx;
					&:nth-last-child(1) {
						margin-bottom: 34rpx;
					}
				}
			}
			.card {
				width: 100%;
				height: 540rpx;
			    border-radius: 32rpx 32rpx 0 0;
			    background-color: #fff;
				.card_tabs {
					height: 100rpx;
					display: flex;
					background-color: #D9DEFF;
					.card_tab {
						flex: 1;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
						color: #000000;
						font-size: 32rpx;
						font-weight: 500;
						font-family: PingFangSC-Regular, PingFang SC;
					}
					.active {
						background-color: #fff;
						border-radius: 32rpx 32rpx 0 0;
					}
				}
				.card_parmas {
					margin: 34rpx 40rpx 0;
				}
				.card_btns {
					margin: 40rpx 40rpx 0;
				}
			}
		}
	}
</style>