<template>
	<view class="gt_content">
		<view class="con_map">
			<map id="myMap" style="width:750rpx;height:100vh;" :longitude="longitude" :latitude="latitude" scale='16'
				:markers="covers" :polyline="polyline" show-location>
			</map>
		</view>


		<view class="con_movable">
			<movable-area class="movable-area">
				<movable-view class="movable-view" :x="moveX" :y="moveY" direction="vertical" @change="movableViewChange">
					<view class="con_orderInfo">
						<scroll-view :scroll-y="scrollY" style="width:750rpx;height: 100vh;">

							<view class="con_billInfo" v-if="dataInfo.pay_status != 2">
								<view class="con_title_detailBtn">
									<view class="con_title">
										<text>费用信息</text>
									</view>
									<view class="con_detailBtn" @click="goBillDetail">
										<text>费用明细</text>
									</view>
								</view>
								<view class="con_line"></view>
								<view class="con_pay_price">
									<view class="con_pay">
										<text v-if="dataInfo.pay_status == 2">已支付</text>
										<text v-else>未支付</text>
									</view>
									<view class="con_price">
										<!-- <text>8888.88元</text> -->
									</view>
								</view>
								<view class="con_payMethod">
									<text style="margin-right: 10rpx;">付款方式</text>
									<u-icon name="arrow-down"></u-icon>
								</view>
								<view class="con_wechatPay">
									<view class="con_text">
										<text v-if="dataInfo.fee_pay_type == 1">线下支付</text>
										<text v-if="dataInfo.fee_pay_type == 2">余额支付</text>
										<text v-if="dataInfo.fee_pay_type == 3">支付宝支付</text>
										<text v-if="dataInfo.fee_pay_type == 4">微信支付</text>
									</view>
									<view class="con_payPrice">
										<text>{{dataInfo.last_price}}元</text>
									</view>
								</view>
								<view class="con_line"></view>
							</view>

							<view class="con_userInfo_contact">
								<view class="con_userInfo">
									<view class="con_headImg">
										<image :src="cargoInfo.headerpic" mode="widthFix"></image>
									</view>
									<view class="con_phone">
										<!-- <text>尾号{{gtCommon.endMobile(cargoInfo.mobile)}}</text> -->
										<text>{{cargoInfo.nickname}}</text>
									</view>
								</view>
								<view class="con_contact" v-if="dataInfo.deliver_type == 3">
									<view class="con_message">
										<u-icon name="chat-fill" color="#000000" size="40"></u-icon>
									</view>
									<view class="con_call">
										<u-icon name="phone-fill" color="#000000" size="40"></u-icon>
									</view>
								</view>
							</view>

							<view class="con_baseInfo" style="position:absolute;top:500rpx;">
								<view class="con_time_distance">
									<view class="con_time">
										<text
											v-if="dataInfo.is_yuyue">{{gtCommon.getAppointmentTime(dataInfo.yuyue_time)}}</text>
										<text v-else>即时</text>
									</view>
									<view class="con_distance">
										<text>距你12公里</text>
									</view>
								</view>
								<view class="con_line"></view>
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
										<view class="con_fromAddress u-line-1">
											<text>{{dataInfo.pickup_province}}-{{dataInfo.pickup_city}}-{{dataInfo.pickup_county}}{{dataInfo.pickup_address}}</text>
										</view>
										<view class="con_fromType">
											<text>{{dataInfo.pickup_remark}}</text>
										</view>
										<view class="con_fromNamePhone">
											<text>{{dataInfo.pickup_truename}}
												{{gtCommon.hiddenMobile4to7(dataInfo.pickup_mobile)}}</text>
										</view>

										<view class="con_toAddress u-line-1">
											<text>{{dataInfo.receive_province}}-{{dataInfo.receive_city}}-{{dataInfo.receive_county}}{{dataInfo.receive_address}}</text>
										</view>
										<view class="con_toType">
											<text>{{dataInfo.receive_remark}}</text>
										</view>
										<view class="con_toNamePhone">
											<text>{{dataInfo.receive_truename}}
												{{gtCommon.hiddenMobile4to7(dataInfo.receive_mobile)}}</text>
										</view>
									</view>
								</view>
								<view class="con_line"></view>

								<view class="con_keyVal" :style="!openStatus1 ? 'height:120rpx':''">
									<view class="con_key_val">
										<view class="con_key">
											<text>订单编号</text>
										</view>
										<view class="con_val">
											<text>{{dataInfo.deliver_sn}}</text>
											<text class="copyBtn" @click="copy(dataInfo.deliver_sn)">复制</text>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>订单时间</text>
										</view>
										<view class="con_val">
											<!-- <text>2022年12月08日 13:18</text> -->
											<text>{{gtCommon.formateTime(dataInfo.create_time,'YYYY年MM月DD日 HH:mm')}}</text>
										</view>
									</view>
									<view class="con_key_val" v-if="dataInfo.yuyue_time">
										<view class="con_key">
											<text>预约时间</text>
										</view>
										<view class="con_val">
											<text>{{gtCommon.formateTime(dataInfo.yuyue_time,'YYYY年MM月DD日 HH:mm')}}</text>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>订单类型</text>
										</view>
										<view class="con_val">
											<text v-if="dataInfo.order_type == 1">指派下单</text>
											<text v-if="dataInfo.order_type == 2">极速下单</text>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>是否开票</text>
										</view>
										<view class="con_val">
											<text v-if="dataInfo.is_invoice == 1">开票</text>
											<text v-else>不开票</text>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>物流方式</text>
										</view>
										<view class="con_val">
											<text v-if="dataInfo.deliver_type == 1">普运</text>
											<text v-if="dataInfo.deliver_type == 2">快运</text>
											<text v-if="dataInfo.deliver_type == 3">议价</text>
											<text>{{dataInfo.transport_day_min}}-{{dataInfo.transport_day_max}}天</text>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>回单收条</text>
										</view>
										<view class="con_val">
											<text v-if="dataInfo.receipt_type == 1">无需</text>
											<text v-if="dataInfo.receipt_type == 2">回单</text>
											<text v-if="dataInfo.receipt_type == 3">收条</text>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>备注</text>
										</view>
										<view class="con_val">
											<text v-if="dataInfo.remark">{{dataInfo.remark}}</text>
											<text v-else> - </text>
										</view>
									</view>

								</view>

								<view class="con_retract" @click="openStatus1 = !openStatus1">
									<text style="margin-right: 8rpx;" v-if="openStatus1">收起</text>
									<text style="margin-right: 8rpx;" v-else>展开</text>
									<u-icon name="arrow-up" v-if="openStatus1"></u-icon>
									<u-icon name="arrow-down" v-else></u-icon>
								</view>

							</view>

							<view class="con_goodsInfo">
								<view class="con_title">
									<text>货物信息</text>
								</view>
								<view class="con_line"></view>
								<view class="con_goodsImgs">
									<view class="con_text">
										<text>货物图片</text>
									</view>
									<view class="con_list">
										<view class="con_item" v-for="(item,index) in dataInfo.pack_imgs" :key="index">
											<image :src="item" mode="widthFix"></image>
										</view>
									</view>
								</view>
								<view class="con_nums">
									<view class="con_item">
										<view class="con_label">
											<text>数量</text>
										</view>
										<view class="con_num">
											<text>{{dataInfo.goods_number}}</text>
										</view>
									</view>
									<view class="con_item">
										<view class="con_label">
											<text>重量(T)</text>
										</view>
										<view class="con_num">
											<text>{{dataInfo.goods_weight}}</text>
										</view>
									</view>
									<view class="con_item">
										<view class="con_label">
											<text>体积(m²)</text>
										</view>
										<view class="con_num">
											<text>{{dataInfo.goods_volume}}</text>
										</view>
									</view>
								</view>

								<view class="con_keyVal" :style="!openStatus2 ? 'height:120rpx':''">
									<view class="con_key_val">
										<view class="con_key">
											<text>货物名称</text>
										</view>
										<view class="con_val">
											<text>{{dataInfo.goods_name}}</text>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>包装类型</text>
										</view>
										<view class="con_val">
											<text>{{dataInfo.pack_name}}</text>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>交货方式</text>
										</view>
										<view class="con_val">
											<text v-if="dataInfo.jiaohuo_type == 1">自送专线</text>
											<text v-if="dataInfo.jiaohuo_type == 2">上门自提</text>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>配送方式</text>
										</view>
										<view class="con_val">
											<text v-if="dataInfo.peisong_type == 1">送货上门</text>
											<text v-if="dataInfo.peisong_type == 2">自提</text>
										</view>
									</view>
									<view class="con_key_val" v-if="dataInfo.peisong_type == 2">
										<view class="con_key">
											<text>自提网点</text>
										</view>
										<view class="con_val">
											<view class="con_text">
												<text>公司名称：{{dataInfo.outlets_name}}</text>
											</view>
											<view class="con_text">
												<text>地址：{{dataInfo.outlets_province}}{{dataInfo.outlets_city}}{{dataInfo.outlets_county}}{{dataInfo.outlets_address}}</text>
											</view>
											<view class="con_text">
												<text>负责人：{{dataInfo.outlets_contact}}</text>
											</view>
											<view class="con_text">
												<text>电话：</text>
												<text style="color:#485EF4"
													@click="gtCommon.callMobile(dataInfo.outlets_mobile)">{{dataInfo.outlets_mobile}}</text>
											</view>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>是否异性件</text>
										</view>
										<view class="con_val">
											<text v-if="dataInfo.pack_is_special == 1">是</text>
											<text v-if="dataInfo.pack_is_special == 0">否</text>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>声明价值</text>
										</view>
										<view class="con_val">
											<text>{{dataInfo.goods_value_price}}元</text>
										</view>
									</view>
								</view>


								<view class="con_retract" @click="openStatus2 = !openStatus2">
									<text style="margin-right: 8rpx;" v-if="openStatus2">收起</text>
									<text style="margin-right: 8rpx;" v-else>展开</text>
									<u-icon name="arrow-up" v-if="openStatus2"></u-icon>
									<u-icon name="arrow-down" v-else></u-icon>
								</view>
							</view>


							<view class="con_billInfo" v-if="dataInfo.pay_status == 2">
								<view class="con_title_detailBtn">
									<view class="con_title">
										<text>费用信息</text>
									</view>
									<view class="con_detailBtn" @click="goBillDetail">
										<text>费用明细</text>
									</view>
								</view>
								<view class="con_line"></view>
								<view class="con_pay_price">
									<view class="con_pay">
										<text v-if="dataInfo.pay_status == 2">已支付</text>
										<text v-else>未支付</text>
									</view>
									<view class="con_price">
										<!-- <text>8888.88元</text> -->
									</view>
								</view>
								<view class="con_payMethod" v-if="dataInfo.pay_status == 2">
									<text style="margin-right: 10rpx;">付款方式</text>
									<u-icon name="arrow-down"></u-icon>
								</view>
								<view class="con_wechatPay" v-if="dataInfo.pay_status == 2">
									<view class="con_text">
										<text v-if="dataInfo.fee_pay_type == 1">线下支付</text>
										<text v-if="dataInfo.fee_pay_type == 2">余额支付</text>
										<text v-if="dataInfo.fee_pay_type == 3">支付宝支付</text>
										<text v-if="dataInfo.fee_pay_type == 4">微信支付</text>
									</view>
									<view class="con_payPrice">
										<text>{{dataInfo.last_price}}元</text>
									</view>
								</view>
								<view class="con_line"></view>
							</view>

							<view class="con_service">
								<view class="con_icon">
									<u-icon name="server-fill"></u-icon>
								</view>
								<view class="con_text">
									<text>在线客服</text>
								</view>
							</view>
							<view class="con_agreement">
								<text>《货物运输协议》</text>
							</view>


						</scroll-view>

					</view>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '../../static/qqmap/qqmap-wx-jssdk.js'
	const tMap = new QQMapWX({
		key: 'OLGBZ-PMQ64-TVHUY-DDVGK-42GOF-Z5FP4' //腾讯地图开发者密钥
	});
	export default {
		data() {
			return {
				title: 'Helloindex',
				id: 0, //使用marker点击事件需要填写id
				title: 'map',
				latitude: 45.70847,
				longitude: 126.66287,
				polyline: [],
				covers: [{
					latitude: 45.70847,
					longitude: 126.66287,
					iconPath: 'https://img.mp.itc.cn/upload/20170704/d31fa73855d946b9837db0a766683a06_th.jpg',
					width: '180px',
					height: '140px',
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: 'https://n.sinaimg.cn/sinacn19/160/w640h320/20180914/92ba-hkahyhw9856871.gif',
					width: '180px',
					height: '100px',
				}],









				orderSn: 'SS2305110000013',
				dataInfo: {},
				cargoInfo: {},
				t: '',
				openStatus1: false,
				openStatus2: false,

				moveX: 0,
				moveY: 450,
				scrollY:false,
			}
		},
		onLoad() {
			//拿地址
			this.getMapAddress();

			// this.getDataInfo();
		},
		methods: {
			getMapAddress() {
				let gt = this;

				//使用uni.getLocation获取用户所在经纬度
				// uni.getLocation({
				// 	type: 'gcj02',
				// 	success: function(res) {
				// 		console.log(13)
				// 		console.log('当前位置的经度：' + res.longitude);
				// 		console.log('当前位置的纬度：' + res.latitude);
				// 		gt.latitude = res.latitude;
				// 		gt.longitude = res.longitude;

				gt.formSubmit();
				// 	}
				// });
			},
			formSubmit(e) {
				var _this = this;
				//调用距离计算接口
				tMap.direction({
					mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
					//from参数不填默认当前地址
					from: '45.741305,126.696971', //起点经纬度
					// waypoints: '39.951004,106.571980', //起点经纬度
					to: '39.951004,106.571980', //终点经纬度
					success: function(res) {
						console.log(res);
						var ret = res;
						var coors = ret.result.routes[0].polyline,
							pl = [];
						//坐标解压（返回的点串坐标，通过前向差分进行压缩）
						var kr = 1000000;
						for (var i = 2; i < coors.length; i++) {
							coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
						}
						//将解压后的坐标放入点串数组pl中
						for (var i = 0; i < coors.length; i += 2) {
							pl.push({
								latitude: coors[i],
								longitude: coors[i + 1]
							})
						}
						console.log(pl)
						//设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
						_this.latitude = pl[0].latitude,
							_this.longitude = pl[0].longitude,
							_this.polyline = [{
								points: pl,
								color: '#FF0000DD',
								width: 4
							}]
					},
					fail: function(error) {
						console.error(error);
					},
					complete: function(res) {
						console.log(res);
					}
				});
				setTimeout(function() {
					tMap.direction({
						mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
						//from参数不填默认当前地址
						from: '39.951004,106.571980', //起点经纬度
						// waypoints: '39.951004,106.571980', //起点经纬度
						to: '35.750477,116.696806', //终点经纬度
						success: function(res) {
							console.log(res);
							var ret = res;
							var coors = ret.result.routes[0].polyline,
								pl = [];
							//坐标解压（返回的点串坐标，通过前向差分进行压缩）
							var kr = 1000000;
							for (var i = 2; i < coors.length; i++) {
								coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
							}
							//将解压后的坐标放入点串数组pl中
							for (var i = 0; i < coors.length; i += 2) {
								pl.push({
									latitude: coors[i],
									longitude: coors[i + 1]
								})
							}
							console.log(pl)
							//设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
							_this.latitude = pl[0].latitude,
								_this.longitude = pl[0].longitude,
								_this.polyline.push({
									points: pl,
									color: '#485EF4',
									width: 4
								})
						},
						fail: function(error) {
							console.error(error);
						},
						complete: function(res) {
							console.log(res);
						}
					});
				}, 800)


			},


			getDataInfo() {
				let gt = this;
				var url = "/logistics/order/get_order_detail";
				var data = {
					deliver_sn: gt.orderSn,
				};
				gt.gtRequest.post(url, data).then(res => {
					// gt.dataInfo = res.order_info;
					gt.cargoInfo = res.cargo_info;
					if (res.order_info.is_yuyue) {
						uni.setNavigationBarColor({
							frontColor: '#ffffff',
							backgroundColor: '#485EF4',
							animation: {
								duration: 400,
								timingFunc: 'easeIn'
							}
						})
					} else {
						uni.setNavigationBarColor({
							frontColor: '#ffffff',
							backgroundColor: '#FF6067',
							animation: {
								duration: 400,
								timingFunc: 'easeIn'
							}
						})
					}


					if (res.order_info.pack_imgs) {
						res.order_info.pack_imgs = res.order_info.pack_imgs.split('||');
					}
					gt.dataInfo = res.order_info;
				});
			},

			copy(str) {
				let gt = this;

				uni.setClipboardData({
					data: str,
				});
				// gt.$refs.uToast.show({
				// 	title: '复制成功！',
				// 	type: 'success',
				// });
				return false;

			},
			
			movableViewChange(res){
				console.log(res);
				let gt = this;
				if(res.detail.y == 0){
					gt.scrollY = true;
				}else{
					gt.scrollY = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {

			.con_movable {
				.movable-area {
					height: 100vh;
					width: 750rpx;
					top: 0;
					position: fixed;
					pointer-events: none;

					.movable-view {
						pointer-events: auto;
						width: 160rpx;
						height: 160rpx;
					}
				}
			}



			.con_userInfo_contact {
				display: flex;
				justify-content: space-between;
				width: 718rpx;
				height: 144rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;

				.con_userInfo {
					display: flex;

					.con_headImg {
						width: 80rpx;
						height: 80rpx;
						margin: 32rpx 0 32rpx 24rpx;
					}

					.con_phone {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 80rpx;
						margin: 32rpx 0 32rpx 20rpx;
					}
				}

				.con_contact {
					display: flex;

					.con_message {
						width: 80rpx;
						height: 80rpx;
						border: 1rpx solid #909399;
						border-radius: 50%;
						margin-right: 24rpx;
						margin-top: 32rpx;
						padding: 20rpx;
					}

					.con_call {
						width: 80rpx;
						height: 80rpx;
						border: 1rpx solid #909399;
						border-radius: 50%;
						margin-right: 24rpx;
						margin-top: 32rpx;
						padding: 20rpx;
					}
				}
			}


			.con_baseInfo {
				width: 718rpx;
				// height: 1148rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 18rpx 0 14rpx;
				padding-bottom: 1rpx;

				.con_time_distance {
					display: flex;
					justify-content: space-between;

					.con_time {
						font-size: 36rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 50rpx;
						margin: 20rpx 0 0 24rpx;
					}

					.con_distance {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						margin: 24rpx 22rpx 0 0;
					}
				}

				.con_line {
					width: 670rpx;
					height: 2rpx;
					border: 1rpx solid #F2F2F2;
					margin: 24rpx;
				}

				.con_fromTo {
					display: flex;

					.con_left {
						.con_fromIcon {
							width: 48rpx;
							height: 48rpx;
							background: $gtProjectColor;
							border-radius: 50%;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							text-align: center;
							line-height: 48rpx;
							margin: 38rpx 0 0 24rpx;
						}

						.con_fromToLine {
							width: 2rpx;
							height: 96rpx;
							border: 2rpx dashed #DFDFDF;
							margin: 10rpx 0 0 48rpx;
						}

						.con_toIcon {
							width: 48rpx;
							height: 48rpx;
							background: #FFBF27;
							border-radius: 50%;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							text-align: center;
							line-height: 48rpx;
							margin: 10rpx 0 0 24rpx;
						}
					}

					.con_right {
						.con_fromAddress {
							width: 582rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 40rpx;
							margin: 42rpx 0 0 40rpx;
						}

						.con_fromType {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 40rpx;
							margin: 4rpx 0 0 40rpx;
						}

						.con_fromNamePhone {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 40rpx;
							margin: 4rpx 0 0 40rpx;
						}

						.con_toAddress {
							width: 582rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 40rpx;
							margin: 24rpx 0 0 40rpx;
						}

						.con_toType {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 40rpx;
							margin: 4rpx 0 0 40rpx;
						}

						.con_toNamePhone {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 40rpx;
							margin: 4rpx 0 0 40rpx;
						}
					}
				}

				.con_keyVal {
					overflow: hidden;

					.con_key_val {
						display: flex;
						justify-content: space-between;
						margin: 16rpx 24rpx;

						.con_key {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 40rpx;
						}

						.con_val {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 40rpx;

							.copyBtn {
								font-size: 32rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: $gtProjectColor;
								line-height: 44rpx;
								margin-left: 18rpx;
							}
						}
					}
				}

				.con_retract {
					text-align: center;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					line-height: 34rpx;
					margin: 32rpx auto 40rpx auto;

				}
			}

			.con_goodsInfo {
				width: 718rpx;
				// height: 1212rpx;
				padding: 1rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx 0 16rpx;

				.con_title {
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 50rpx;
					margin: 24rpx 0 0 24rpx;
				}

				.con_line {
					width: 670rpx;
					height: 2rpx;
					border: 1rpx solid #F2F2F2;
					margin: 24rpx;
				}

				.con_goodsImgs {
					display: flex;
					margin-top: -12rpx;

					.con_text {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 160rpx;
						margin: 20rpx 0 0 24rpx;
					}

					.con_list {
						display: flex;
						margin-left: 10rpx;

						.con_item {
							width: 160rpx;
							margin: 20rpx 14rpx;
						}
					}
				}

				.con_nums {
					display: flex;
					margin: 12rpx;
					margin-top: 0;

					.con_item {
						width: 208rpx;
						height: 160rpx;
						background: #E0E1E2;
						border-radius: 16rpx;
						margin: 12rpx;

						.con_label {
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 44rpx;
							margin-top: 24rpx;
							text-align: center;
						}

						.con_num {
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 44rpx;
							margin-top: 24rpx;
							text-align: center;
						}
					}
				}


				.con_keyVal {
					overflow: hidden;

					.con_key_val {
						display: flex;
						justify-content: space-between;
						margin: 16rpx 24rpx;

						.con_key {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 40rpx;
						}

						.con_val {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 40rpx;

							.con_text {
								text-align: right;
								color: #909399;
							}

						}
					}
				}

				.con_retract {
					text-align: center;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					line-height: 34rpx;
					margin: 32rpx auto 40rpx auto;

				}

			}

			.con_billInfo {
				margin: 20rpx 16rpx;
				width: 718rpx;
				// height: 374rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				padding-bottom: 34rpx;

				.con_title_detailBtn {
					display: flex;
					justify-content: space-between;

					.con_title {
						font-size: 36rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 50rpx;
						margin: 24rpx 0 0 22rpx;
					}

					.con_detailBtn {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: $gtProjectColor;
						line-height: 40rpx;
						margin: 30rpx 26rpx 0 0;
					}
				}

				.con_line {
					width: 670rpx;
					height: 2rpx;
					border: 1rpx solid #F2F2F2;
					margin: 24rpx;
				}

				.con_pay_price {
					display: flex;
					justify-content: space-between;

					.con_pay {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 40rpx;
						margin-left: 24rpx;
					}

					.con_price {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 40rpx;
						margin-right: 26rpx;
					}

				}

				.con_payMethod {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909399;
					line-height: 40rpx;
					margin: 24rpx 0 0 32rpx;
				}

				.con_wechatPay {
					display: flex;
					justify-content: space-between;

					.con_text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 40rpx;
						margin: 24rpx 0 0 24rpx;
					}

					.con_payPrice {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 40rpx;
						margin: 24rpx 26rpx 0 0;
					}
				}


			}

			.con_service {
				display: flex;
				text-align: center;
				margin-top: 62rpx;
				justify-content: center;

				.con_text {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 40rpx;
					margin-left: 16rpx;
				}
			}

			.con_agreement {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: $gtProjectColor;
				line-height: 40rpx;
				text-align: center;
				margin-top: 40rpx;
			}


		}
	}
</style>