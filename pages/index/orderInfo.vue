<template>
	<view class="gt_content">

		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>

		<view class="con_mask">
			<u-mask :show="maskShow"></u-mask>
		</view>


		<view class="con_headBackground" :class="'order_yuyueStatus_' + dataInfo.is_yuyue"></view>

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
			<view class="con_line" v-if="dataInfo.pay_status == 2"></view>
		</view>

		<view class="con_userInfo_contact">
			<view class="con_userInfo">
				<view class="con_headImg">
					<u-avatar :src="cargoInfo.headerpic"></u-avatar>
					<!-- <image :src="cargoInfo.headerpic" mode="widthFix"></image> -->
				</view>
				<view class="con_phone">
					<!-- <text>尾号{{gtCommon.endMobile(cargoInfo.mobile)}}</text> -->
					<text>{{cargoInfo.nickname}}</text>
				</view>
			</view>
			<view class="con_contact" v-if="dataInfo.deliver_type == 3">
				<!-- <view class="con_message">
					<u-icon name="chat-fill" color="#000000" size="40"></u-icon>
				</view> -->
				<view class="con_call" @click="callUser">
					<u-icon name="phone-fill" color="#000000" size="40"></u-icon>
				</view>
			</view>
		</view>

		<view class="con_baseInfo">
			<view class="con_time_distance">
				<view class="con_time">
					<text v-if="dataInfo.is_yuyue">{{gtCommon.getAppointmentTime(dataInfo.yuyue_time)}}</text>
					<text v-else>即时</text>
				</view>
				<view class="con_distance">
					<text>距你{{gtCommon.getDistance(lat,lng,dataInfo.pickup_latitude,dataInfo.pickup_longitude)}}公里</text>
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
						<text>{{dataInfo.pickup_truename}} {{gtCommon.hiddenMobile4to7(dataInfo.pickup_mobile)}}</text>
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
			<view class="con_goodsImgs" v-if="dataInfo.pack_imgs">
				<view class="con_text">
					<text>货物图片</text>
				</view>
				<view class="con_list">
					<view class="con_item" v-for="(item,index) in dataInfo.pack_imgs" :key="index">
						<image :src="item" mode="aspectFill" @click="gtCommon.previewImg(item)"></image>
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
						<text v-if="dataInfo.pack_name">{{dataInfo.pack_name}}</text>
						<text v-else>-</text>
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

		<!-- <view class="con_service">
			<view class="con_icon">
				<u-icon name="server-fill"></u-icon>
			</view>
			<view class="con_text">
				<text>在线客服</text>
			</view>
		</view>
		<view class="con_agreement">
			<text>《货物运输协议》</text>
		</view> -->


		<view class="con_btns" v-if="dataInfo.order_type == 2">
			<view class="con_list">
				<view class="con_item" style="background: #FF6067;" @click="showQuotation(dataInfo)"
					v-if="dataInfo.deliver_type == 3">
					<text v-if="dataInfo.quoted_price">报价</text>
					<text v-else>查看报价</text>
				</view>
				<view class="con_item con_seizeBtn" @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch"
					v-if="dataInfo.deliver_type == 3">
					<view class="con_icon" :style="'margin-left:' + moveX + 'rpx'">
						<u-icon name="arrow-right" size="30" color="#fff"></u-icon>
						<u-icon name="arrow-right" size="30" color="#fff"></u-icon>
						<u-icon name="arrow-right" size="30" color="#fff"></u-icon>
					</view>
					<view class="con_text">
						<text>{{btnStr}}</text>
					</view>
					<view class="con_background" :style="'width:' + moveX + 'rpx'">

					</view>
				</view>

				<view class="con_item con_seizeBtn" @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch"
					v-else>
					<view class="con_icon" :style="'margin-left:' + moveX + 'rpx'">
						<u-icon name="arrow-right" size="30" color="#fff"></u-icon>
						<u-icon name="arrow-right" size="30" color="#fff"></u-icon>
						<u-icon name="arrow-right" size="30" color="#fff"></u-icon>
					</view>
					<view class="con_text">
						<text>{{btnStr}}</text>
					</view>
					<view class="con_background" :style="'width:' + moveX + 'rpx'">

					</view>
				</view>
			</view>
		</view>


		<view class="con_btns" v-if="dataInfo.order_type == 1">
			<view class="con_list">
				<view class="con_item" @click="showRefuse(dataInfo)">
					<text>拒绝</text>
				</view>
				<view class="con_item" style="background: #FF6067;" @click="showQuotation(dataInfo)"
					v-if="dataInfo.deliver_type == 3">
					<text v-if="dataInfo.quoted_price">报价</text>
					<text v-else>查看报价</text>
				</view>

				<view class="con_item" style="background: #485EF4;width: 346rpx;" @click="receiveOrder(dataInfo)"
					v-if="dataInfo.deliver_type == 3">
					<text>接单</text>
				</view>
				<view class="con_item" style="background: #485EF4;width: 532rpx;" @click="receiveOrder(dataInfo)"
					v-else>
					<text>接单</text>
				</view>

			</view>
		</view>


		<view class="con_popup">
			<view class="con_quotation">
				<u-popup v-model="quotationShow" mode="center" width="718" height="444" border-radius="22">
					<view class="con_title">
						<text>报价</text>
					</view>
					<view class="con_ownerQuotation_contact">
						<view class="con_ownerWuotation">
							<text>货主出价：</text>
							<text>{{ownerQuotation}}元</text>
						</view>
						<view class="con_contact" @click="contactOwner">
							<view class="con_icon">
								<u-icon name="phone-fill" color="#485EF4" size="32"></u-icon>
							</view>
							<view class="con_text">
								<text>联系货主</text>
							</view>
						</view>
					</view>
					<view class="con_myQuotation">
						<view class="con_text">
							<text>我的报价：</text>
						</view>
						<view class="con_input">
							<u-input v-model="myQuotation" type="digit" height="64" :disabled="quotationStatus" />
						</view>
						<view class="con_unit">
							<text>元</text>
						</view>

					</view>
					<view class="con_tip">
						<text>注：建议电话联系货主商谈后再报价</text>
					</view>
					<view class="con_time" v-if="quotationStatus">
						<text>报价时间：{{quotationTime}}</text>
					</view>
					<view class="con_confirmQuotation" @click="$u.throttle(submitQuotation,1500)" v-else>
						<text>确认报价</text>
					</view>
				</u-popup>
			</view>


			<view class="con_refuse">
				<u-popup v-model="refuseShow" mode="bottom" height="838" border-radius="22">
					<view class="con_title">
						<text>拒绝原因</text>
					</view>
					<view class="con_radio">
						<u-radio-group v-model="refuseReason" :wrap="true">
							<u-radio v-for="(item, index) in refuseReasonList" :key="index" :name="item.name">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
					<view class="con_textarea">
						<u-input v-model="refuseOtherReason" type="textarea " placeholder="请输入您的取消理由" />
					</view>
					<view class="con_confirmBtn" @click="confirmRefuse">
						<text>确定</text>
					</view>
				</u-popup>
			</view>

			<view class="con_serizeSuccess">
				<u-popup v-model="seizeShow" mode="center" width="640" height="716" border-radius="22">
					<view class="con_img">
						<image :src="gtCommon.getOssImg('index/seizeSuccess.png')" mode="widthFix"></image>
					</view>
					<view class="con_text">
						<text>指派单接单成功</text>
					</view>
					<view class="con_viewBtn" @click="goOrderInfo">
						<text>查看订单</text>
					</view>
					<view class="con_confirmBtn" @click="seizeConfirm">
						<text>确定</text>
					</view>
				</u-popup>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				maskShow: false,

				orderSn: '',
				dataInfo: {},
				cargoInfo: {},
				timer: 0,
				openStatus1: false,
				openStatus2: false,


				orderSn: '',

				seizeShow: false,

				quotationShow: false,
				ownerQuotation: '',
				ownerMobile: '',
				myQuotation: '',
				quotationTime: '',
				quotationStatus: false,

				refuseShow: false,
				refuseReason: '',
				refuseReasonList: [{
					id: 1,
					name: '运费支付金额不符',
					value: 1,
				}, {
					id: 1,
					name: '无法安排车辆提货',
					value: 1,
				}, {
					id: 1,
					name: '专线停运',
					value: 1,
				}, {
					id: 1,
					name: '异形件无法托运',
					value: 1,
				}, {
					id: 1,
					name: '不支持到付',
					value: 1,
				}, {
					id: 1,
					name: '其他',
					value: 1,
				}],
				refuseOtherReason: '',


				touh: false,
				startX: 0,
				moveX: 0,
				btnStr: '右滑抢单',
				lng: '',
				lat: '',

				logistics_id: 0,


			}
		},
		onLoad(options) {
			let gt = this;
			gt.orderSn = options.orderSn;
			var lng = uni.getStorageSync('lng');
			var lat = uni.getStorageSync('lat');
			gt.lng = lng;
			gt.lat = lat;


			var companyInfo = uni.getStorageSync('companyInfo');
			gt.logistics_id = companyInfo.logistics_id;
		},
		onShow() {
			let gt = this;
			// clearInterval(gt.t);
			gt.getDataInfo();
			let ws_url = uni.getStorageSync('environment') == 'prod' ? 'wss://saasdemo.sansongkeji.com:3021' : 'wss://test.sansongkeji.com:8021'
			gt.gtWSS.setWsUrl(ws_url);
			gt.onMessage();
		},
		onUnload() {
			console.log('onUnload');
			let gt = this;
			// if (gt.t) {
			clearInterval(gt.timer);
			// }
		},
		onHide() {
			console.log('onHide');
			let gt = this;
			// if (gt.t) {
			clearInterval(gt.timer);
			// }
		},
		methods: {

			onMessage() {
				let gt = this;
				gt.gtWSS.socketTask.onMessage((res) => {
					console.log(res);

					var data = res.data;
					// console.log(data);
					var obj = JSON.parse(data);
					var type = obj.type;


					if (type == 'order_rob_result') {
						gt.maskShow = false;
						uni.hideLoading();

						var orderInfo = obj.data;
						var orderInfo = orderInfo.order_info;
						console.log(orderInfo);
						// uni.navigateTo({
						// });

						if (orderInfo.logistics_id == gt.logistics_id) {
							clearInterval(gt.timer);
							gt.$refs.uToast.show({
								title: '抢单成功',
								type: 'success',
								url: 'pages/order/orderInfo?orderSn=' + orderInfo.deliver_sn
							});
							return false;
						} else {
							gt.$refs.uToast.show({
								title: '抢单失败',
								type: 'error',
								back: true,
							});
							return false;
						}

					}
					if (type == 'order_rob_fail') {
						gt.maskShow = false;
						uni.hideLoading();
						gt.$refs.uToast.show({
							title: '抢单失败',
							type: 'error',
							back: true,
						});
						return false;
					}
				})
			},

			setNavTitle() {
				let gt = this;

				gt.timer = setInterval(function() {
					var title = '';
					if (gt.dataInfo.order_type == 1) {
						title += '指派';
					}
					if (gt.dataInfo.order_type == 2) {
						title += '极速';
					}
					title += '详情';

					var nowTime = parseInt((new Date().getTime()) / 1000);
					// console.log(nowTime);
					var time = 1800 + gt.dataInfo.create_time - nowTime;
					if (time > 0 && time < 1800) {
						var minute = parseInt(time / 60);
						var seconds = parseInt(time % 60);

						minute = minute > 9 ? minute : '0' + minute;
						seconds = seconds > 9 ? seconds : '0' + seconds;
						title += '（倒计时 ' + minute + ':' + seconds + ' ）';
					} else {
						clearInterval(gt.timer);
					}
					// console.log(title);
					uni.setNavigationBarTitle({
						title: title,
					});
				}, 1000);
			},
			getDataInfo() {
				let gt = this;
				var url = "/logistics/order/get_order_detail";
				var data = {
					deliver_sn: gt.orderSn,
				};
				gt.gtRequest.post(url, data).then(res => {

					// 不知道为什么会返回
					// if (res.order_info.logistics_id) {
						console.log('relaunch');
						// uni.redirectTo({
						// 	url:'../index/index'
						// });
						// uni.navigateBack()
						// return false;
					// }
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

					gt.setNavTitle();

					if (res.order_info.pack_imgs) {
						res.order_info.pack_imgs = res.order_info.pack_imgs.split('||');
					}
					gt.dataInfo = res.order_info;
				});
			},
			callUser() {
				let gt = this;

				uni.makePhoneCall({
					phoneNumber: gt.cargoInfo.mobile,
				});
			},
			goBillDetail() {
				let gt = this;
				uni.navigateTo({
					url: '../order/billDetail?orderSn=' + gt.orderSn
				});
				return false;
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
			previewImg(current, urls) {
				uni.previewImage({
					current: current,
					urls: urls,
				})
			},

			showQuotation(item) {
				console.log(item);
				let gt = this;

				gt.orderSn = item.deliver_sn;
				gt.ownerQuotation = item.last_price;
				gt.ownerMobile = item.pickup_mobile;
				gt.myQuotation = item.quoted_price;
				gt.quotationTime = gt.$u.timeFormat(item.quoted_create_time, 'yyyy-mm-dd hh:MM');
				if (item.quoted_price) {
					gt.quotationStatus = true;
				} else {
					gt.quotationStatus = false;
				}


				gt.quotationShow = true;
			},
			contactOwner() {
				let gt = this;

				uni.makePhoneCall({
					phoneNumber: gt.ownerMobile
				});
			},
			submitQuotation() {
				let gt = this;
				if (gt.$u.test.isEmpty(gt.myQuotation)) {
					gt.$refs.uToast.show({
						title: '我的报价不能为空',
						type: 'error',
					});
					return false;
				}
				if (!gt.$u.test.amount(gt.myQuotation)) {
					gt.$refs.uToast.show({
						title: '我的报价格式不正确',
						type: 'error',
					});
					return false;
				}

				if (gt.myQuotation <= gt.ownerQuotation) {
					gt.$refs.uToast.show({
						title: '我的报价不能低于货主出价',
						type: 'error',
					});
					return false;
				}
				var url = "/logistics/order/fast_quoted_price";
				var data = {
					deliver_sn: gt.orderSn,
					quoted_price: gt.myQuotation,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.quotationShow = false;
					gt.getDataInfo();
					gt.$refs.uToast.show({
						title: '报价成功',
						type: 'success',
					});
					return false;
				});
			},

			showRefuse(item) {
				let gt = this;
				gt.orderSn = item.deliver_sn;
				gt.refuseShow = true;
			},
			confirmRefuse() {
				let gt = this;
				var url = "/logistics/order/refuse_receving";
				var data = {
					deliver_sn: gt.orderSn,
					refuse_notice: gt.refuseReason == '其他' ? gt.refuseOtherReason : gt.refuseReason,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.refuseShow = false;
					gt.getDataInfo();
					gt.$refs.uToast.show({
						title: '拒绝成功',
						type: 'success',
						back: true,
					});
					return false;
				});
			},

			receiveOrder(item) {
				console.log(item);

				let gt = this;
				
				uni.showModal({
					title: '提示',
					content: '确定接单吗？',
					success(res) {
						if (res.confirm) {
							var url = "/logistics/order/confirm_receving";
							var data = {
								deliver_sn: item.deliver_sn,
							};
							gt.gtRequest.post(url, data).then(res => {
								gt.orderSn = item.deliver_sn;
								gt.seizeShow = true;
							
							
								const innerAudioContext = uni.createInnerAudioContext();
								innerAudioContext.stop();
								innerAudioContext.src =
									'https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/index/receiveOrderSuccess.mp3';
								innerAudioContext.play();
							});
						}
					}
				})
				
			},

			goOrderInfo() {
				let gt = this;
				var orderSn = '';

				uni.navigateTo({
					url: '../order/orderInfo?orderSn=' + gt.orderSn,
				})
			},
			seizeConfirm() {
				let gt = this;
				// gt.reGetOrderList();
				gt.seizeShow = false;
				uni.navigateBack();
			},


			startTouch(e) {
				console.log(e);
				let gt = this;
				gt.touh = true;
				gt.startX = e.changedTouches[0].clientX;
			},
			moveTouch(e) {
				// console.log(e);
				let gt = this;
				var moveX = (e.changedTouches[0].clientX - gt.startX) * 2;
				if (moveX < 0) {
					moveX = 0;
				}
				if (gt.dataInfo.deliver_type == 3) {
					if (moveX > 450) {
						moveX = 718;
					}
				} else {
					if (moveX > 580) {
						moveX = 718;
					}

				}
				gt.moveX = moveX;
				gt.btnStr = '';
			},
			endTouch(e) {
				console.log(e);
				let gt = this;
				gt.touh = false;
				if (gt.moveX != 718) {
					gt.moveX = 0;
					gt.btnStr = '右滑抢单'
				} else {
					gt.btnStr = '抢单中'



					var url = "/logistics/supplyhall/fast_rob_order";
					var data = {
						deliver_sn: gt.orderSn,
					};
					gt.gtRequest.post(url, data, true).then(res => {
						gt.maskShow = true;
						uni.showLoading({
							title: '抢单中',
						});
						setTimeout(function() {
							uni.hideLoading();
							gt.maskShow = false;
							// gt.reGetOrderList()
						}, 33000);
					}).catch(res => {
						// console.log(res);
						gt.$refs.uToast.show({
							title: res,
							type: 'error',
							back: true,
						});

					});



				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			width: 750rpx;
			overflow: hidden;

			.con_headBackground {
				background: #FF6067;
				width: 950rpx;
				height: 270rpx;
				border-radius: 0 0 400% 400%;
				transform: translateX(-100rpx);
				position: fixed;
				top: 0;
				z-index: -999;
				overflow: hidden;
			}

			.order_yuyueStatus_1 {
				background: $gtProjectColor;
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
							height: 160rpx;
							overflow: hidden;
							border-radius: 16rpx;
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

			.con_otherPeople {
				display: flex;
				justify-content: center;
				width: 750rpx;
				height: 68rpx;
				background: #727BBB;
				margin-top: 74rpx;
				border-radius: 16rpx 16rpx 0rpx 0rpx;

				.con_headImg {
					width: 110rpx;
					height: 48rpx;
					margin-top: 10rpx;
				}

				.con_text {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 68rpx;
					margin-left: 10rpx;

				}
			}



			.con_btns {
				padding-bottom: 50rpx;

				.con_list {
					background: #fff;
					display: flex;
					margin: 20rpx 6rpx;

					.con_item {
						width: 166rpx;
						height: 100rpx;
						background: #909399;
						border-radius: 16rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 100rpx;
						text-align: center;
						margin: 0 10rpx;
					}

					.con_seizeBtn {

						width: 718rpx;
						height: 100rpx;
						background: $gtProjectColor;
						border-radius: 16rpx;
						overflow: hidden;


						.con_icon {
							// margin: 0 20rpx;
							width: 140rpx;
							height: 100rpx;
							// padding: 35rpx 20rpx;
							// border: 1rpx solid red;
							background: $gtProjectColor;
							border-radius: 16rpx;

							line-height: 100rpx;
						}

						.con_text {
							text-align: center;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 100rpx;
							margin-top: -100rpx;
							border-radius: 16rpx;
						}

						.con_background {
							// width: 50rpx;
							height: 100rpx;
							background: $gtProjectColor;
							margin-top: -100rpx;
							border-radius: 16rpx;
						}
					}
				}
			}

			.con_popup {
				.con_quotation {

					// padding: 34rpx;
					// padding: 1rpx;
					.con_title {
						font-size: 40rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 56rpx;
						letter-spacing: 1px;
						text-align: center;
						margin-top: 34rpx;
					}

					.con_ownerQuotation_contact {
						display: flex;
						justify-content: space-between;
						margin: 14rpx 0 0 34rpx;

						.con_ownerWuotation {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 40rpx;

							text:nth-child(2) {
								color: $gtProjectColor;
							}
						}

						.con_contact {
							display: flex;

							.con_icon {
								// margin-top: 16rpx;
								margin-right: 8rpx;
							}

							.con_text {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: $gtProjectColor;
								line-height: 40rpx;
								margin: -2rpx 68rpx 0 0;
							}
						}
					}

					.con_myQuotation {
						display: flex;
						margin: 40rpx 68rpx 0 34rpx;

						.con_text {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 64rpx;

						}

						.con_input {
							width: 440rpx;
							height: 64rpx;
							background: #F4F4F4;
							border-radius: 8rpx;
							padding: 0 10rpx;
						}

						.con_unit {
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 64rpx;
							margin-left: 10rpx;
						}
					}

					.con_tip {
						width: 384rpx;
						height: 34rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 34rpx;
						margin: 16rpx 0 0 34rpx;
					}

					.con_time {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 40rpx;
						margin: 40rpx 0 50rpx 34rpx;
					}

					.con_confirmQuotation {
						width: 240rpx;
						height: 76rpx;
						border-radius: 10rpx;
						border: 2rpx solid $gtProjectColor;
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: $gtProjectColor;
						line-height: 76rpx;
						margin: 40rpx auto 32rpx auto;
						text-align: center;
					}
				}


				.con_refuse {
					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						margin-top: 40rpx;
						text-align: center;
					}

					.con_radio {
						margin: 20rpx 32rpx 0 40rpx;

						.u-radio {
							flex-direction: row-reverse;
							justify-content: space-between;

							.u-radio__label {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
								margin: 16rpx 0;
							}
						}
					}

					.con_textarea {
						width: 678rpx;
						height: 132rpx;
						background: #F4F4F4;
						border-radius: 20rpx;
						margin: 0 32rpx 0 40rpx;
						padding: 0 20rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						line-height: 40rpx;
					}

					.con_confirmBtn {
						width: 718rpx;
						height: 100rpx;
						background: $gtProjectColor;
						border-radius: 16rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 100rpx;
						margin: 38rpx 16rpx 32rpx 16rpx;
						text-align: center;
					}
				}

				.con_serizeSuccess {
					.con_img {
						width: 200rpx;
						height: 200rpx;
						margin: 72rpx auto 0 auto;
					}

					.con_text {
						font-size: 48rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 66rpx;
						margin-top: 68rpx;
						text-align: center;
					}

					.con_viewBtn {
						width: 339rpx;
						height: 76rpx;
						background: $gtProjectColor;
						border-radius: 10rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 76rpx;
						text-align: center;
						margin: 80rpx auto 0 auto;
					}

					.con_confirmBtn {
						width: 339rpx;
						height: 76rpx;
						border-radius: 10rpx;
						border: 2rpx solid $gtProjectColor;
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: $gtProjectColor;
						line-height: 76rpx;
						text-align: center;
						margin: 18rpx auto 0 auto;
					}
				}


			}

		}
	}
</style>