<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_mask">
			<u-mask :show="maskShow"></u-mask>
		</view>
		<view class="con_listenStatus_tabSwiper">
			<view class="con_listenAudio">
				<view class="con_listenStatus" v-if="companyAuth">
					<view class="con_listen">
						<view class="con_text">
							<text>听单中 ·</text>
						</view>
					</view>
				</view>
				<!-- <view class="con_listenStatus" @click="changeListenStatus" v-if="companyAuth">
					<view class="con_listen" :style="{display: listenStatus ? '':'none'}">
						<view class="con_text">
							<text>听单中 ·</text>
						</view>
					</view>
					<view class="con_unListen" :style="{display: listenStatus ? 'none':''}">
						<view class="con_text">
							<text>未听单 ·</text>
						</view>
					</view>
				</view> -->
				<view class="con_audioStatus">
<!-- 				<view class="con_audioStatus" @click="audioSwitch" :style="{display: listenStatus ? '':'none'}"> -->
					<view class="openAudio" :style="{backgroundImage: `url(${gtCommon.getOssImg('index/openAudio.png')})`,display: audioStatus ? '':'none'}"></view>
					<view class="closeAudio" :style="{backgroundImage: `url(${gtCommon.getOssImg('index/closeAudio.png')})`,display: audioStatus ? 'none':''}"></view>
				</view>
			</view>
			<view class="con_tabs">
				<!-- <u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper> -->
				<view class="tab_item" v-for="(ob, i) in tabList" :key="i" @click="tabsChange(i)" :class="currentTab === i ? 'tab_item_active':''">
					<u-badge :is-dot="true" type="error" :count='ob.count' absolute :offset='offset'></u-badge>
					<view class="tab_name">{{ ob.name }}</view>
				</view>
			</view>
		</view>
		<view class="con_tip">
			<view class="con_tipItem" v-if="!companyAuth && checkStatus === 0">
				<view class="con_iconText">
					<view class="con_icon">
						<image :src="gtCommon.getOssImg('index/companyAuth.png')" mode="widthFix"></image>
					</view>
					<view class="con_text">
						<view class="con_title">
							<text>认证即可获得红包奖励</text>
						</view>
						<view class="con_descript">
							<text>企业认证及实名认证后可接单</text>
						</view>
					</view>
				</view>
				<view class="con_btn" @click="goAuth">
					<text>认证中</text>
				</view>
			</view>
			<view class="con_tipItem" v-if="!companyAuth && checkStatus !== 0">
				<view class="con_iconText">
					<view class="con_icon">
						<image :src="gtCommon.getOssImg('index/companyAuth.png')" mode="widthFix"></image>
					</view>
					<view class="con_text">
						<view class="con_title">
							<text>认证即可获得红包奖励</text>
						</view>
						<view class="con_descript">
							<text>企业认证及实名认证后可接单</text>
						</view>
					</view>
				</view>
				<view class="con_btn" @click="goAuth">
					<text>去认证</text>
				</view>
			</view>
			<view class="con_tipItem" v-if="lineNum == 0">
				<view class="con_iconText">
					<view class="con_icon">
						<image :src="gtCommon.getOssImg('index/line.png')" mode="widthFix"></image>
					</view>
					<view class="con_text">
						<view class="con_title">
							<text>添加专线分配货源</text>
						</view>
						<view class="con_descript">
							<text>根据专线分配货源</text>
						</view>
					</view>
				</view>
				<view class="con_btn" @click="goLine">
					<text>去添加</text>
				</view>
			</view>
		</view>
		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" id="type1">
					<view class="con_empty" v-if="dataList.length == 0">
						<view class="con_img">
							<image :src="gtCommon.getOssImg('index/empty.png')" mode="widthFix"></image>
						</view>
						<view class="con_text">
							<text v-if="!companyAuth">暂无订单</text>
							<text v-else-if="!listenStatus">未开启接单</text>
							<text v-else>暂时无订单</text>
						</view>
						<view class="con_historyBtn" @click="goHistoryList">
							<text>历史记录</text>
						</view>
					</view>
					<view class="con_list" v-else>
						<scroll-view class="con_scrollView" scroll-y @scrolltolower="loadMore">
							<view class="con_item" v-for="(item,index) in dataList" :key="index" @click="goOrderInfo(item)">
								<view class="con_type_distance"
									:class="item.is_yuyue == 1 ? 'orderType1' : 'orderType2'">
									<view class="con_type">
										<text v-if="item.is_yuyue == 0">即时</text>
										<text v-else>{{gtCommon.getAppointmentTime(item.yuyue_time)}} </text>
									</view>
									<view class="con_distance">
										<view class="con_text">
											<text>距你{{gtCommon.getDistance(lat,lng,item.pickup_latitude,item.pickup_longitude)}}公里</text>
										</view>
									</view>
								</view>
								<view class="con_fromTo">
									<view class="con_from">
										<view class="con_city">
											<text>{{item.pickup_city}}</text>
										</view>
										<view class="con_address_type">
											<view class="con_address">
												<text>{{item.pickup_address}}</text>
											</view>
											<view class="con_type">
												<text v-if="item.jiaohuo_type == 1">自送专线</text>
												<text v-if="item.jiaohuo_type == 2">上门自提</text>
											</view>
										</view>
									</view>
									<view class="con_lineFT"></view>
									<view class="con_to">
										<view class="con_city">
											<text>{{item.receive_city}}</text>
										</view>
										<view class="con_address_type">
											<view class="con_address">
												<text>{{item.receive_address}}</text>
											</view>
											<view class="con_type">
												<text v-if="item.peisong_type == 1">送货上门</text>
												<text v-if="item.peisong_type == 2">自提</text>
											</view>
										</view>
									</view>
								</view>
								<view class="con_keyVal">
									<view class="con_key_val">
										<view class="con_key">
											<text>运输时效：</text>
										</view>
										<view class="con_val">
											<text v-if="item.transport_day_max == 0">面议</text>
											<view v-else>{{item.transport_day_min}} - {{item.transport_day_max}}天</view>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>货物信息：</text>
										</view>
										<view class="con_val">
											<text>{{item.goods_name}}/{{item.goods_number}}件/{{parseFloat(item.goods_weight)}}吨/{{parseFloat(item.goods_volume)}}方</text>
											<!-- <text>{{item.goods_name}}/{{item.goods_weight}}吨/{{item.goods_volume}}方</text> -->
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>增值服务：</text>
										</view>
										<view class="con_val">
											<text v-if="item.receipt_type == 1">无需回单</text>
											<text v-if="item.receipt_type == 2">回单</text>
											<text v-if="item.receipt_type == 3">收条</text>
											<!-- <text>/</text>
											<text v-if="item.is_invoice == 0">不开发票</text>
											<text v-if="item.is_invoice == 1">开发票</text> -->
										</view>
									</view>
								</view>
								<view class="con_time_price">
									<view class="con_time">
										<text>下单时间：{{$u.timeFormat(item.create_time, 'mm-dd hh:MM:ss')}}</text>
									</view>
									<view class="con_price">
										<!-- <text>￥{{item.last_price}}(</text>
										<text v-if="item.deliver_type == 3">货主出价</text>
										<text v-else-if="item.pay_status == 2">已支付</text>
										<text v-else-if="item.pay_status == 0">待支付</text>
										<text>)</text> -->
										<text>{{gtCommon.getMoneyStatus(item)}}</text>
									</view>
								</view>
								<view class="con_line"></view>
								<view class="con_btns">
									<view class="con_btnItem con_refuseBtn" @click.stop="showRefuse(item)"
										v-if="item.order_type == 1">
										<text>拒绝</text>
									</view>
									<view class="con_btnItem con_quotationBtn" @click.stop="showQuotation(item)"
										v-if="item.deliver_type == 3 && !item.quoted_price">
										<text>立即报价</text>
									</view>
									<view class="con_btnItem con_seizeBtn" @click.stop="seizeOrder(item)">
										<text>抢单</text>
									</view>
									<view class="con_btnItem con_viewBtn" @click.stop="showQuotation(item)"
										v-if="item.quoted_price">
										<text>查看报价</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item" id="type2">
					<view class="con_empty" v-if="dataList.length == 0">
						<view class="con_img">
							<image :src="gtCommon.getOssImg('index/empty.png')" mode="widthFix"></image>
						</view>
						<view class="con_text">
							<text v-if="!companyAuth">暂无订单</text>
							<text v-else-if="!listenStatus">未开启接单</text>
							<text v-else>暂时无订单</text>
						</view>
						<view class="con_historyBtn" @click="goHistoryList">
							<text>历史记录</text>
						</view>
					</view>
					<view class="con_list" v-else>
						<scroll-view class="con_scrollView" scroll-y @scrolltolower="loadMore">
							<view class="con_item" v-for="(item,index) in dataList" :key="index" @click="goOrderInfo(item)">
								<view class="con_type_distance"
									:class="item.is_yuyue == 1 ? 'orderType1' : 'orderType2'">
									<view class="con_type">
										<text v-if="item.is_yuyue == 0">即时</text>
										<text v-else>{{gtCommon.getAppointmentTime(item.yuyue_time)}} </text>
									</view>
									<view class="con_distance">
										<view class="con_text">
											<text>距你{{gtCommon.getDistance(lat,lng,item.pickup_latitude,item.pickup_longitude)}}公里</text>
										</view>
									</view>
								</view>
								<view class="con_fromTo">
									<view class="con_from">
										<view class="con_city">
											<text>{{item.pickup_city}}</text>
										</view>
										<view class="con_address_type">
											<view class="con_address">
												<text>{{item.pickup_address}}</text>
											</view>
											<view class="con_type">
												<text v-if="item.jiaohuo_type == 1">自送专线</text>
												<text v-if="item.jiaohuo_type == 2">上门自提</text>
											</view>
										</view>
									</view>
									<view class="con_lineFT"></view>
									<view class="con_to">
										<view class="con_city">
											<text>{{item.receive_city}}</text>
										</view>
										<view class="con_address_type">
											<view class="con_address">
												<text>{{item.receive_address}}</text>
											</view>
											<view class="con_type">
												<text v-if="item.peisong_type == 1">送货上门</text>
												<text v-if="item.peisong_type == 2">自提</text>
											</view>
										</view>
									</view>
								</view>
								<view class="con_keyVal">
									<view class="con_key_val">
										<view class="con_key">
											<text>运输时效：</text>
										</view>
										<view class="con_val">
											<text v-if="item.transport_day_max == 0">面议</text>
											<view v-else>{{item.transport_day_min}} - {{item.transport_day_max}}天</view>
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>货物信息：</text>
										</view>
										<view class="con_val">
											<text>{{item.goods_name}}/{{item.goods_number}}件/{{parseFloat(item.goods_weight)}}吨/{{parseFloat(item.goods_volume)}}方</text>
											<!-- <text>{{item.goods_name}}/{{item.goods_weight}}吨/{{item.goods_volume}}方</text> -->
										</view>
									</view>
									<view class="con_key_val">
										<view class="con_key">
											<text>增值服务：</text>
										</view>
										<view class="con_val">
											<text v-if="item.receipt_type == 1">无需回单</text>
											<text v-if="item.receipt_type == 2">回单</text>
											<text v-if="item.receipt_type == 3">收条</text>
											<!-- <text>/</text>
											<text v-if="item.is_invoice == 0">不开发票</text>
											<text v-if="item.is_invoice == 1">开发票</text> -->
										</view>
									</view>
								</view>
								<view class="con_time_price">
									<view class="con_time">
										<text>下单时间：{{$u.timeFormat(item.create_time, 'mm-dd hh:MM:ss')}}</text>
									</view>
									<view class="con_price">
										<!-- <text>￥{{item.last_price}}(</text>
										<text v-if="item.deliver_type == 3">货主出价</text>
										<text v-else-if="item.pay_status == 2">已支付</text>
										<text v-else-if="item.pay_status == 0">待支付</text> -->
										<text>{{gtCommon.getMoneyStatus(item)}}</text>
										<!-- <text>)</text> -->
									</view>
								</view>
								<view class="con_line"></view>
								<view class="con_btns">
									<view class="con_btnItem con_refuseBtn" @click.stop="showRefuse(item)" v-if="item.order_type == 1">
										<text>拒绝</text>
									</view>
									<view class="con_btnItem con_quotationBtn" @click.stop="showQuotation(item)"
										v-if="item.deliver_type == 3 && !item.quoted_price">
										<text>立即报价</text>
									</view>
									<view class="con_btnItem con_seizeBtn" @click.stop="receiveOrder(item)">
										<text>接单</text>
									</view>
									<view class="con_btnItem con_viewBtn" @click.stop="showQuotation(item)" v-if="item.quoted_price">
										<text>查看报价</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- <view class="con_movable" v-if="companyAuth">
			<movable-area class="movable-area">
				<movable-view class="movable-view" :x="moveX" :y="moveY" direction="all">
					<view class="con_listenBtn" @click="changeListenStatus">
						<view v-if="!listenStatus">
							<text>开始听单</text>
						</view>
						<view v-else>
							<view class="con_gif">
								<image :src="gtCommon.getOssImg('index/listenOrdering.gif')" mode="widthFix"></image>
							</view>
							<view class="con_text" style="margin-top: -130rpx;">
								<text>听单中……</text>
							</view>
						</view>
					</view>
				</movable-view>
			</movable-area>
		</view> -->
		<view class="con_popup">
			<view class="con_companyJoin">
				<u-popup v-model="joinShow" mode="center" width="640" height="464" border-radius="22">
					<view class="con_text">
						<text>你还没有完成企业入驻，请先去完成企业入驻</text>
					</view>
					<view class="con_joinBtn" @click="goJoin">
						<text>立即入驻</text>
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maskShow: false,
				mobile: '',
				listenStatus: true,
				audioStatus: true,
				tabList: [
					{name: '极速', count: 0}, 
					{name: '指派', count: 0}
				],
				offset: [10, 10],
				currentTab: 0,
				companyAuth: false,
				lineNum: 0,
				page: 1,
				size: 10,
				end: false,
				dataList: [],
				joinShow: false,
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
				refuseReasonList: [
					{
						id: 1,
						name: '运费支付金额不符',
						value: 1,
					},
					{
						id: 1,
						name: '无法安排车辆提货',
						value: 1,
					},
					{
						id: 1,
						name: '专线停运',
						value: 1,
					},
					{
						id: 1,
						name: '异形件无法托运',
						value: 1,
					},
					{
						id: 1,
						name: '不支持到付',
						value: 1,
					},
					{
						id: 1,
						name: '其他',
						value: 1,
					}
				],
				refuseOtherReason: '',
				lng: '',
				lat: '',
				moveX: 300,
				moveY: 450,
				logistics_id: 0,
				clientId: '',
				checkStatus: -1,
				innerAudioContext: null,
				flag: false
			}
		},
		onLoad() {
			let gt = this;
			gt.mobile = uni.getStorageSync('mobile');
			gt.innerAudioContext = uni.createInnerAudioContext();
			// gt.innerAudioContext = uni.getBackgroundAudioManager();
			if (gt.mobile) {
				let ws_url = uni.getStorageSync('environment') == 'prod' ? 'wss://saasdemo.sansongkeji.com:3021' : 'wss://test.sansongkeji.com:8021'
				gt.gtWSS.setWsUrl(ws_url);
				gt.gtonMessage();
			}
			uni.setStorageSync('audioStatus', true);
			// uni.setStorageSync('listenStatus', true);
		},
		async onShow() {
			let gt = this;
			uni.hideTabBarRedDot({ //隐藏红点
				index: 0
			})
			gt.mobile = uni.getStorageSync('mobile');
			var companyInfo = uni.getStorageSync('companyInfo');
			gt.logistics_id = companyInfo.logistics_id;
			gt.clientId = uni.getStorageSync('clientId');
			uni.setNavigationBarTitle({
				title: '专线货源',
			});
			
			// gt.listenStatus = uni.getStorageSync('listenStatus');
			gt.audioStatus = uni.getStorageSync('audioStatus');
			gt.companyAuth = uni.getStorageSync('companyAuth');
			// gt.getLineNum();
			// var companyInfo = uni.getStorageSync('companyInfo');
			// if (companyInfo.parkId) {
			// 	// gt.reGetOrderList();
			// } else {
			// 	gt.joinShow = true;
			// }
			if(uni.getStorageSync('token')) gt.getLocation();
			if (gt.mobile) {
				gt.updataInfo()
				await gt.getCompanyInfo();
				if(gt.companyAuth) return
				gt.gtRequest.post("/logistics/company/get_company_approve_info").then(res => {
					gt.checkStatus = res.company_approve_info.status
					uni.setStorageSync('checkStatus', res.company_approve_info.status)
				})
			}
		},
		onPullDownRefresh() {
			let gt = this;
			gt.reGetOrderList();
			uni.stopPullDownRefresh();
		},
		methods: {
			updataInfo() {
				let gt = this;
				gt.gtRequest.post("/logistics/user/get_user_info").then(res => {
					uni.setStorageSync('user_info', res.user_info)
					uni.setStorageSync('userInfo', res.user_info)
				})
				// gt.gtRequest.post("/logistics/company/get_company_info").then(res => {
				// 	uni.setStorageSync('companyInfo', res.company_info)
				// })
			},
			gtonMessage() {
				let gt = this;
				gt.gtWSS.socketTask.onMessage((res) => {
					var data = res.data;
					var obj = JSON.parse(data);
					var type = obj.type;
					if (type == 'order_new_order') {
						// if (!gt.listenStatus) return false;
						var orderInfo = obj.data;
						var orderInfo = orderInfo.order_info;
						// for (var i = 0; i < gt.dataList.length; i++) {
						// 	if (orderInfo.id == gt.dataList[i].id) {
						// 		return false;
						// 	}
						// }
						if (orderInfo.order_type == 2 && gt.currentTab == 0) {
							gt.dataList.unshift(orderInfo);
						}
						if (orderInfo.order_type == 1 && gt.currentTab == 1) {
							gt.dataList.unshift(orderInfo);
						}
						if(orderInfo.order_type == 2 && gt.currentTab == 1) gt.tabList[0].count = 1
						if(orderInfo.order_type == 1 && gt.currentTab == 0) gt.tabList[1].count = 1
						uni.showTabBarRedDot({ // 显示红点
							index: 0
						})
						gt.innerAudioContext.stop()
						gt.innerAudioContext.src = 'https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/index/new_order.mp3'
						gt.innerAudioContext.play()
					}
					if (type == 'order_rob_result') {
						gt.maskShow = false;
						uni.hideLoading();
						var orderInfo = obj.data;
						var orderInfo = orderInfo.order_info;
						if (orderInfo.logistics_id == gt.logistics_id) {
							gt.innerAudioContext.stop();
							gt.innerAudioContext.src = 'https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/index/seizeOrderSuccess.mp3';
							gt.innerAudioContext.play();
							gt.$refs.uToast.show({
								title: '抢单成功',
								type: 'success',
								url: 'pages/order/orderInfo?isIndex=true&&orderSn=' + orderInfo.deliver_sn
							});
							return false;
						} else {
							gt.reGetOrderList();
							if (gt.maskShow) {
								gt.$refs.uToast.show({
									title: '抢单失败',
									type: 'error',
								});
								return false;
							}
						}
					}
				})
			},
			async getCompanyInfo() {
				let gt = this;
				await gt.gtRequest.post("/logistics/company/get_index_info").then(res => {
					gt.lineNum = res.line_num;
					gt.flag = res.company_info.is_company_approve ? true : false
					gt.companyAuth = res.company_info.is_company_approve;
					uni.setStorageSync('companyAuth', res.company_info.is_company_approve);
					if (res.company_info.is_company_approve && res.company_info.park_id == 0) {
						gt.joinShow = true;
					} else {
						gt.joinShow = false;
						gt.reGetOrderList();
						if (gt.audioStatus) {
							gt.getLocation();
						}
					}
				});
			},
			getLocation() {
				let gt = this;
				uni.getLocation({
					type: 'gcj02',
					success(res) {
						if (res.errMsg == 'getLocation:ok') {
							gt.lng = res.longitude;
							gt.lat = res.latitude;
							uni.setStorageSync('lng', res.longitude);
							uni.setStorageSync('lat', res.latitude);
						}
					},
					fail(res) {
						// #ifdef MP-WEIXIN
						uni.getSetting({
							success(res) {
								if (res.authSetting['scope.userLocation']) {
									gt.getLocation();
								} else {
									uni.showModal({
										title: '提示',
										content: '当前定位未开启，请点击确定手动开启定位',
										success(res) {
											if (res.confirm) {
												uni.openSetting({
													success(res) {
														console.log(789, res);
														if (res.authSetting[
																'scope.userLocation']) {
															gt.getLocation();
														} else {
															gt.$refs.uToast.show({
																title: '你拒绝了授权',
																type: 'error',
															});
															return false;
														}
													}
												})
											}
										}
									})
								}
							}
						})
						// #endif
						// #ifdef APP-PLUS
						uni.showModal({
							title: '授权失败',
							content: '获取定位权限失败。',
							showCancel: false
						})
						// #endif
					}
				})
			},
			goAuth() {
				let gt = this;
				if (gt.mobile) {
					uni.navigateTo({
						url: '../login/companyAuth?flag=' +  gt.flag,
					});
					return false;
				} else {
					uni.navigateTo({
						url: '../login/login',
					});
					return false;
				}
			},
			goLine() {
				let gt = this;
				if (gt.mobile) {
					uni.navigateTo({
						url: '/subSansong/pages/sansong/lineAdd',
					});
					return false;
				} else {
					uni.navigateTo({
						url: '../login/login',
					});
					return false;
				}
			},
			goJoin() {
				uni.navigateTo({
					url: '/subSansong/pages/sansong/companyJoin',
				});
				return false;
			},
			tabsChange(index) {
				let gt = this;
				gt.currentTab = index;
				gt.reGetOrderList();
				gt.tabList[gt.currentTab].count = 0
			},
			animationfinish(item) {
				let gt = this;
				var currentTab = gt.currentTab;
				gt.currentTab = item.detail.current;
				if (currentTab != gt.currentTab) {
					gt.reGetOrderList();
				}
			},
			goHistoryList() {
				uni.navigateTo({
					url: '../../subMsg/pages/message/historyList'
				})
			},
			loadMore() {
				let gt = this;
				gt.getOrderList();
			},
			hideOrder(item) {
				let gt = this;
				uni.showModal({
					title: '提示',
					content: '确定不再显示该订单吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
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
					gt.reGetOrderList();
					gt.$refs.uToast.show({
						title: '拒绝成功',
						type: 'success',
					});
					return false;
				});
			},
			goOrderInfo(item) {
				let gt = this;
				var orderSn = '';
				if (item.deliver_sn) {
					orderSn = item.deliver_sn;
					uni.navigateTo({
						url: './orderInfo?orderSn=' + orderSn
					});
					return false;
				} else {
					orderSn = gt.orderSn;
					uni.navigateTo({
						url: '../order/orderInfo?orderSn=' + orderSn
					});
					return false;
				}
			},
			seizeConfirm() {
				let gt = this;
				gt.reGetOrderList();
				gt.seizeShow = false;
			},
			showQuotation(item) {
				let gt = this;
				gt.orderSn = item.deliver_sn;
				gt.ownerQuotation = item.last_price;
				gt.ownerMobile = item.pickup_mobile;
				gt.myQuotation = item.quoted_price;
				gt.quotationTime = gt.$u.timeFormat(item.quoted_create_time, 'yyyy-mm-dd hh:MM');
				gt.quotationStatus = item.quoted_price ? true : false
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
					return gt.$refs.uToast.show({
						title: '我的报价不能为空',
						type: 'error',
					});
				}
				if (!gt.$u.test.amount(gt.myQuotation)) {
					return gt.$refs.uToast.show({
						title: '我的报价格式不正确',
						type: 'error',
					});
				}
				if (gt.myQuotation * 100 <= gt.ownerQuotation * 100) {
					return gt.$refs.uToast.show({
						title: '我的报价不能低于货主出价',
						type: 'error',
					});
				}
				gt.gtRequest.post("/logistics/order/fast_quoted_price", {
					deliver_sn: gt.orderSn,
					quoted_price: gt.myQuotation
				}).then(res => {
					gt.quotationShow = false;
					gt.reGetOrderList();
					gt.$refs.uToast.show({
						title: '报价成功',
						type: 'success',
					});
					return false;
				});
			},
			seizeOrder(item) {
				let gt = this;
				uni.showModal({
					title: '提示',
					content: '确定抢单吗？',
					success(res) {
						if (res.confirm) {
							gt.gtRequest.post("/logistics/supplyhall/fast_rob_order", {deliver_sn: item.deliver_sn}, true).then(res => {
								gt.orderSn = item.deliver_sn;
								gt.maskShow = true;
								uni.showLoading({
									title: '抢单中',
								});
								setTimeout(function() {
									uni.hideLoading();
									gt.maskShow = false;
									gt.reGetOrderList()
								}, 33000);
							}).catch(res => {
								gt.$refs.uToast.show({
									title: res,
									type: 'error',
									back: true,
								});
							});
						}
					}
				})
			},
			receiveOrder(item) {
				let gt = this;
				uni.showModal({
					title: '提示',
					content: '确定接单吗？',
					success(res) {
						if (res.confirm) {
							gt.gtRequest.post("/logistics/order/confirm_receving", {
								deliver_sn: item.deliver_sn
							}).then(res => {
								gt.orderSn = item.deliver_sn;
								gt.seizeShow = true;
								gt.innerAudioContext.stop();
								// gt.innerAudioContext.title = '暂无';
								// gt.innerAudioContext.singer = '暂无';
								// gt.innerAudioContext.coverImgUrl = "";
								gt.innerAudioContext.src = 'https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/index/receiveOrderSuccess.mp3';
								gt.innerAudioContext.play();
							});
						}
					}
				})
			},
			reGetOrderList() {
				let gt = this;
				// var token = gt.gtRequest.getToken();
				// if (token) {
				// gt.dataList = [];
				gt.page = 1;
				gt.size = 10;
				gt.end = false;
				gt.getOrderList();
				// }
			},
			getOrderList() {
				let gt = this;
				if (!gt.listenStatus || gt.end) return false;
				gt.gtRequest.post("/logistics/supplyhall/get_order_list", {
					search_type: gt.currentTab == 0 ? 2 : 1,
					page: gt.page,
					limit: gt.size
				}).then(res => {
					if (gt.page == 1) gt.dataList = []
					gt.dataList = gt.dataList.concat(res.list);
					if (res.list.length == gt.size) {
						gt.page = gt.page + 1;
					} else {
						gt.end = true;
					}
				});
			},
			changeListenStatus() {
				let gt = this;
				if (gt.listenStatus) {
					gt.audioStatus = false;
					gt.listenStatus = false;
					uni.setStorageSync('audioStatus', false);
					gt.dataList = [];
				} else {
					gt.audioStatus = true;
					gt.listenStatus = true;
					uni.setStorageSync('audioStatus', true);
					gt.reGetOrderList();
				}
				uni.setStorageSync('listenStatus', gt.listenStatus);
			},
			audioSwitch() {
				let gt = this;
				if (!gt.listenStatus) return false;
				gt.audioStatus = !gt.audioStatus;
				uni.setStorageSync('audioStatus', gt.audioStatus);
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.con_listenStatus_tabSwiper {
				display: flex;
				justify-content: space-between;
				background: #fff;
				.con_listenAudio {
					display: flex;
					.con_listenStatus {
						.con_listen {
							.con_text {
								margin: 16rpx 8rpx;
								width: 172rpx;
								height: 64rpx;
								border-radius: 32rpx;
								border: 2rpx solid $gtProjectColor;
								font-size: 32rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: $gtProjectColor;
								line-height: 64rpx;
								text-align: center;
							}
						}
						.con_unListen {
							.con_text {
								margin: 16rpx 8rpx;
								width: 172rpx;
								height: 64rpx;
								border-radius: 32rpx;
								border: 2rpx solid #909399;
								font-size: 32rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #909399;
								line-height: 64rpx;
								text-align: center;
							}
						}
					}
					.con_audioStatus {
						width: 64rpx;
						height: 64rpx;
						margin: 16rpx 8rpx;
						.openAudio,
						.closeAudio {
							width: 100%;
							height: 100%;
							background-size: cover;
							background-repeat: no-repeat;
						}
					}
				}
				.con_tabs {
					display: flex;
					align-items: center;
					margin-right: 16rpx;
					.tab_item {
						position: relative;
						width: 120rpx;
						color: #909399;
						text-align: center;
						font-size: 28rpx;
						.tab_name {
							height: 80rpx;
							line-height: 80rpx;
						}
					}
					.tab_item_active {
						color: #485EF4;
						font-size: 36rpx;
						font-weight: 700;
						border-bottom: 4rpx solid #485EF4;
					}
				}
				// .u-tabs-item {
				// 	font-size: 32rpx !important;
				// 	padding: 0 40rpx !important;
				// }
				// .con_tabSwiper {
				// 	width: 300rpx;
				// }
			}
			.con_tip {
				// position: fixed;
				// z-index: 999;
				.con_tipItem {
					display: flex;
					justify-content: space-between;
					width: 718rpx;
					height: 116rpx;
					background: #FFFFFF;
					border-radius: 16rpx;
					margin: 20rpx 16rpx 0 16rpx;
					.con_iconText {
						display: flex;
						.con_icon {
							width: 48rpx;
							height: 40rpx;
							margin-top: 40rpx;
							margin-left: 20rpx;
						}
						.con_text {
							.con_title {
								font-size: 28rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #303133;
								line-height: 40rpx;
								margin-top: 18rpx;
								margin-left: 20rpx;
							}
							.con_descript {
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #909399;
								line-height: 34rpx;
								margin-left: 20rpx;
							}
						}
					}
					.con_btn {
						width: 160rpx;
						height: 60rpx;
						border-radius: 10rpx;
						border: 2rpx solid $gtProjectColor;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: $gtProjectColor;
						line-height: 60rpx;
						text-align: center;
						margin-top: 28rpx;
						margin-right: 24rpx;
					}
				}
			}
			.con_swiper {
				swiper {
					height: calc(100vh - 80rpx);
					.swiper-item {
						.con_empty {
							.con_img {
								width: 528rpx;
								margin: 200rpx auto 0 auto;
							}
							.con_text {
								font-size: 32rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 44rpx;
								margin-top: 16rpx;
								text-align: center;
							}
							.con_historyBtn {
								width: 240rpx;
								height: 76rpx;
								border-radius: 10rpx;
								border: 2rpx solid #485EF4;
								font-size: 32rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #485EF4;
								line-height: 76rpx;
								margin: 70rpx auto 0 auto;
								text-align: center;
							}
						}
						.con_list {
							.con_scrollView {
								height: calc(100vh - 80rpx);
								.con_item {
									width: 718rpx;
									// height: 692rpx;
									background: #FFFFFF;
									border-radius: 20rpx;
									margin: 20rpx 16rpx 0 16rpx;
									padding: 24rpx;
									.con_type_distance {
										display: flex;
										justify-content: space-between;
										background: #FF6067;
										margin: -24rpx;
										border-radius: 16rpx 16rpx 0rpx 0rpx;
										margin-bottom: 20rpx;
										.con_type {
											font-size: 32rpx;
											font-family: PingFangSC-Medium, PingFang SC;
											font-weight: 500;
											color: #FFFFFF;
											line-height: 44rpx;
											margin: 22rpx 24rpx;
										}
										.con_distance {
											display: flex;
											.con_text {
												font-size: 32rpx;
												font-family: PingFangSC-Medium, PingFang SC;
												font-weight: 500;
												color: #FFFFFF;
												line-height: 44rpx;
												margin: 22rpx 24rpx;
											}
											.con_icon {
												margin-right: 24rpx;
												width: 48rpx;
												height: 48rpx;
												margin-top: 20rpx;
											}
										}
									}
									.orderType1 {
										background: $gtProjectColor;
									}
									.orderType2 {
										background: #FF6067;
									}
									.con_fromTo {
										margin-top: 24rpx;
										.con_from {
											display: flex;
											.con_city {
												font-size: 28rpx;
												font-family: PingFangSC-Medium, PingFang SC;
												font-weight: 500;
												color: #000000;
												line-height: 40rpx;
												white-space: nowrap;
											}
											.con_address_type {
												margin-left: 20rpx;
												.con_address {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 40rpx;
												}
												.con_type {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 40rpx;
													margin-top: 4rpx;
												}
											}
										}
										.con_lineFT {
											margin: -26rpx 0 0 42rpx;
											width: 2rpx;
											height: 60rpx;
											border: 2rpx dashed #DFDFDF;
										}
										.con_to {
											display: flex;
											margin-top: 24rpx;
											.con_city {
												font-size: 28rpx;
												font-family: PingFangSC-Medium, PingFang SC;
												font-weight: 500;
												color: #000000;
												line-height: 40rpx;
												white-space: nowrap;
											}
											.con_address_type {
												margin-left: 20rpx;
												.con_address {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 40rpx;
												}
												.con_type {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 40rpx;
													margin-top: 4rpx;
												}
											}
										}
									}
									.con_keyVal {
										margin-top: 12rpx;
										margin-left: 10rpx;
										.con_key_val {
											display: flex;
											margin-top: 20rpx;
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
												color: #000;
												line-height: 40rpx;
												text:nth-child(3) {
													color: #FF6067;
												}
											}
										}
									}
									.con_time_price {
										display: flex;
										justify-content: space-between;
										margin-top: 32rpx;
										.con_time {
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #909399;
											line-height: 40rpx;
										}
										.con_price {
											font-size: 28rpx;
											font-family: PingFangSC-Medium, PingFang SC;
											font-weight: 500;
											color: #FF6067;
											line-height: 40rpx;
										}
									}
									.con_line {
										width: 670rpx;
										height: 2rpx;
										opacity: 0.1;
										border: 1rpx solid #000000;
										margin-top: 20rpx;
									}
									.con_btns {
										display: flex;
										justify-content: flex-end;
										padding: 20rpx 12rpx;
										.con_btnItem {
											text-align: center;
											margin: 0 12rpx;
										}
										.con_refuseBtn {
											width: 160rpx;
											height: 64rpx;
											border-radius: 10rpx;
											border: 2rpx solid #FF6067;
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #FF6067;
											line-height: 64rpx;
										}
										.con_quotationBtn {
											width: 160rpx;
											height: 64rpx;
											border-radius: 10rpx;
											border: 2rpx solid $gtProjectColor;
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: $gtProjectColor;
											line-height: 64rpx;
										}
										.con_seizeBtn {
											width: 160rpx;
											height: 64rpx;
											background: #485EF4;
											border-radius: 10rpx;
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #FFFFFF;
											line-height: 64rpx;
										}
										.con_viewBtn {
											width: 144rpx;
											height: 64rpx;
											border-radius: 10rpx;
											border: 2rpx solid #000000;
											text-align: center;
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #000000;
											line-height: 64rpx;
											// margin-top: 18rpx;
											// margin-left: 526rpx;
										}
									}
								}
							}
						}
					}
				}
			}
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
						.con_listenBtn {
							width: 160rpx;
							height: 160rpx;
							border: 16rpx solid $gtProjectColor;
							border-radius: 50%;
							// border-image: linear-gradient(184deg, #7E97FA 0%, #485EF4 100%);
							font-size: 28rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: $gtProjectColor;
							line-height: 128rpx;
							// position: absolute;
							// right: 62rpx;
							// bottom: 168rpx;
							text-align: center;
							z-index: 9999;
							background: #fff;
							.con_gif {
								width: 100rpx;
								height: 100rpx;
								margin: 20rpx;
							}
						}
					}
				}
			}
			.con_popup {
				.con_companyJoin {
					.con_text {
						font-size: 40rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 56rpx;
						letter-spacing: 1px;
						margin: 108rpx 66rpx 0 66rpx;
					}
					.con_joinBtn {
						width: 210rpx;
						height: 76rpx;
						border-radius: 10rpx;
						border: 2rpx solid #485EF4;
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #485EF4;
						line-height: 76rpx;
						text-align: center;
						margin: 108rpx auto 0 auto;
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
			}
		}
	}
</style>