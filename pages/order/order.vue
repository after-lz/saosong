<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_search_screen">
			<view class="con_search">
				<u-search placeholder="输入运单号/手机号/查询" v-model="searchVal" height="72" bg-color="#F3F4F6"
					:clearabled="false" :show-action="false" :disabled="!historyShow" @click="showHistory"
					@search="orderSearch"></u-search>
			</view>
			<view class="con_screen" @click="showScreen">
				<text>筛选</text>
			</view>
		</view>
		<view class="con_history" v-if="historyShow">
			<view class="con_title_btn">
				<view class="con_title">
					<text>历史搜索</text>
				</view>
				<view class="con_btn" @click="clearHistory">
					<view class="con_icon">
						<u-icon name="trash-fill" size="26" color="#909399"></u-icon>
					</view>
					<view class="con_text">
						<text>清空</text>
					</view>
				</view>
			</view>
			<view class="con_list">
				<view class="con_item u-line-1" v-for="(item,index) in historyList" :key="index"
					@click="searcList(item)">
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		<view class="con_dataList" v-else>

			<view class="con_tabs">
				<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"
					swiperWidth="750"></u-tabs-swiper>
			</view>

			<view class="con_swiper">
				<swiper :current="currentTab" @animationfinish="animationfinish">
					<swiper-item class="swiper-item" v-for="(item,index) in tabList" :key="index">
						<view class="con_empty" v-if="dataList.length == 0">
							<view class="con_img">
								<image :src="gtCommon.getOssImg('index/empty.png')" mode="widthFix"></image>
							</view>
							<view class="con_text">
								<text>暂时无订单</text>
							</view>

						</view>
						<view class="con_list" v-else>
							<scroll-view class="con_scrollView" scroll-y @scrolltolower="loadMore">
								<view class="con_item" v-for="(item,index) in dataList" :key="index"
									@click="goOrderInfo(item)">
									<view class="con_typeSn_status">
										<view class="con_typeSn">
											<view class="con_type orderType1" v-if="item.order_type == 1">
												<text>指派</text>
											</view>
											<view class="con_type orderType2" v-if="item.order_type == 2">
												<text>极速</text>
											</view>
											<view class="con_type orderType3" v-if="item.is_yuyue == 1">
												<text>预约</text>
											</view>

											<view class="con_sn">
												<view class="con_text">
													<text>订单号：{{item.deliver_sn}}</text>
												</view>
												<view class="con_copyIcon"
													@click.stop="gtCommon.copyStr(item.deliver_sn)">
													<!-- <text class="custom-icon custom-icon-copy"></text> -->
													<image :src="gtCommon.getOssImg('order/copy.png')" mode="widthFix">
													</image>
												</view>
											</view>
										</view>
										<view class="con_status">
											<text>{{item.status_msg}}</text>
										</view>
										<!-- <view class="con_status orderStatus2" v-if="item.status == 2">
											<text>待交货</text>
										</view> -->

									</view>


									<!-- <view class="con_type_distance"
										:class="item.is_yuyue == 1 ? 'orderType1' : 'orderType2'">
										<view class="con_type">
											<text v-if="item.is_yuyue == 0">即时</text>
											<text v-else>{{gtCommon.getAppointmentTime(item.yuyue_time)}} </text>
										</view>
										<view class="con_distance">
											<view class="con_text">
												<text>距你12公里</text>
											</view>
											<view class="con_icon" @click.stop="hideOrder(item)">
												<image src="../../static/img/close.png" mode="widthFix"></image>
											</view>
										</view>
									</view> -->

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
												<text v-else>{{item.transport_day_min}} -
													{{item.transport_day_max}}天</text>
											</view>
										</view>

										<view class="con_key_val">
											<view class="con_key">
												<text>货物信息：</text>
											</view>
											<view class="con_val">
												<text>{{item.goods_name}}/{{item.goods_number}}件/{{parseFloat(item.goods_weight)}}吨/{{parseFloat(item.goods_volume)}}方</text>
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
											<text style="color: #485EF4;"
												v-if="item.is_yuyue == 1">预约时间：{{$u.timeFormat(item.yuyue_time, 'mm月dd日 hh:MM')}}</text>
											<text v-else>下单时间：{{$u.timeFormat(item.create_time, 'mm月dd日 hh:MM')}}</text>
										</view>
										<view class="con_price">
											<!-- <text>￥{{item.last_price}}(</text> -->
											<!-- <text v-if="item.deliver_type == 3">货主出价</text>
											<text v-else-if="item.pay_status == 2">已支付</text>
											<text v-else-if="item.pay_status == 0">待支付</text> -->
											<!-- 20230615 黄明康要求此处按他的来 -->
											<text>{{gtCommon.getMoneyStatus(item,'order')}}</text>
										</view>
									</view>
									<view class="con_line">
									</view>
									<view class="con_btns">
										<!-- <view class="con_btnItem" @click.stop="showRefuse(item)"
											v-if="item.id > 1">
											<text>电子面单</text>
										</view>
										<view class="con_btnItem" @click.stop="showRefuse(item)"
											v-if="item.id > 1">
											<text>修改订单</text>
										</view> -->
										<view class="con_btnItem" @click.stop="goSendInfo(item)"
											v-if="item.status == 9">
											<text>查看运单</text>
										</view>
										<view class="con_btnItem" @click.stop="addMoney(item)"
											v-if="item.status == 5 || item.status == 7 || item.status == 9 || item.status == 11">
											<text>增加费用</text>
										</view>
										<view class="con_btnItem" @click.stop="confirmCollect(item)"
											v-if="item.status == 5">
											<text>确认揽收</text>
										</view>
										<!-- <view class="con_btnItem" @click.stop="confirmStart(item)" v-if="item.status == 7">
											<text>打印标签</text>
										</view> -->
										<view class="con_btnItem" @click.stop="confirmStart(item)"
											v-if="item.status == 7">
											<text>确认发车</text>
										</view>
										<view class="con_btnItem" @click.stop="cancelConfirm(item)"
											v-if="item.cancel_status == 1">
											<text>确认取消申请</text>
										</view>
										<!-- <view class="con_btnItem" @click.stop="confirmArriva(item)"
											v-if="item.status == 9">
											<text>确认到达</text>
										</view> -->
										<view class="con_btnItem" @click.stop="confirmSign(item)"
											v-if="item.status == 11">
											<text>签收</text>
										</view>
										<view class="con_btnItem" @click.stop="uploadReceipt(item)"
											v-if="item.status == 13">
											<text>上传回单</text>
										</view>
										<!-- <view class="con_btnItem" @click.stop="confirmStart(item)" v-if="item.status == 7">
											<text>查看回单</text>
										</view> -->
										<!-- <view class="con_btnItem" @click.stop="confirmStart(item)"
											v-if="item.status == 99">
											<text>查看取消</text>
										</view> -->

									</view>


								</view>
							</scroll-view>
						</view>

					</swiper-item>
				</swiper>
			</view>


		</view>
		<view class="con_calendar">
			<u-calendar v-model="calcendarShow" mode="range" z-index="10086" @change="calcendarChange"></u-calendar>
		</view>
		<view class="con_popup">
			<view class="con_screen">
				<u-popup v-model="screenShow" mode="bottom" height="950rpx" border-radius="24rpx 24rpx 0rpx 0rpx;">
					<view class="con_scrollView">
						<scroll-view scroll-y="true" style="height:950rpx">

							<view class="con_label">
								<text>起止时间</text>
							</view>
							<view class="con_input_icon">
								<view class="con_input">
									<u-input v-model="timeStr" height="64" placeholder="开始时间 ~ 结束时间" disabled
										@click="showCalcendar" />
								</view>
								<view class="con_icon">
									<u-icon :name="gtCommon.getOssImg('order/time.png')" size="32"></u-icon>
								</view>
							</view>
							<view class="con_label">
								<text>选择专线</text>
							</view>
							<!-- <view class="con_lineList">
								<view class="con_item" :class="lineIndex == index?'activeStatus':''" v-for="(item,index) in lineList" :key="index" @click="lineSelect(index)">
									<text>{{item.lineName}}</text>
								</view>
							</view> -->
							<view class="con_lineInput">
								<u-input v-model="lineStr" type="select" placeholder="请选择专线" height="64"
									@click="showLine" />
								<u-select v-model="lineShow" :list="lineList" :default-value="[lineIndex]"
									label-name="lineName" value-name="line_id" @confirm="lineConfirm"></u-select>
							</view>
							<view class="con_label">
								<text>选择类别</text>
							</view>
							<view class="con_typeList">
								<view class="con_typeItem con_orderType">
									<view class="con_item" :class="orderTypeIndex == 0?'activeStatus':''"
										@click="typeSelect('orderTypeIndex',0)">
										<text>极速</text>
									</view>
									<view class="con_item" :class="orderTypeIndex == 1?'activeStatus':''"
										@click="typeSelect('orderTypeIndex',1)">
										<text>指派</text>
									</view>
								</view>
								<view class="con_typeItem con_yuyueType">
									<view class="con_item" :class="yuyueTypeIndex == 0?'activeStatus':''"
										@click="typeSelect('yuyueTypeIndex',0)">
										<text>实时单</text>
									</view>
									<view class="con_item" :class="yuyueTypeIndex == 1?'activeStatus':''"
										@click="typeSelect('yuyueTypeIndex',1)">
										<text>预约单</text>
									</view>
								</view>
								<view class="con_typeItem con_deliverType">
									<view class="con_item" :class="deliverTypeIndex == 0?'activeStatus':''"
										@click="typeSelect('deliverTypeIndex',0)">
										<text>普运</text>
									</view>
									<view class="con_item" :class="deliverTypeIndex == 1?'activeStatus':''"
										@click="typeSelect('deliverTypeIndex',1)">
										<text>快运</text>
									</view>
									<view class="con_item" :class="deliverTypeIndex == 2?'activeStatus':''"
										@click="typeSelect('deliverTypeIndex',2)">
										<text>溢价</text>
									</view>
								</view>


							</view>
							<view class="con_label">
								<text>订单状态</text>
							</view>
							<view class="con_statusList">
								<view class="con_item" :class="statusIndex == index?'activeStatus':''"
									v-for="(item,index) in statusList" :key="index" @click="statusSelect(index)">
									<text>{{item.name}}</text>
								</view>
							</view>
							<view class="con_btns">
								<view class="con_btnItem" @click="resetScreen">
									<text>重置</text>
								</view>
								<view class="con_btnItem" @click="submitScreen">
									<text>确定</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</u-popup>
			</view>
			<u-modal v-model="showModel" title="确认取消订单申请" content="您确认同意货主的取消订单申请吗？同意后，订单将被取消，终止承运。"
				:show-cancel-button="true" cancel-text="联系货主" @confirm="confirm"></u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// refreshStatus:false,
				searchVal: '',

				historyShow: false,
				historyList: [],
				screenShow: false,
				calcendarShow: false,
				timeStr: '',
				stime: '',
				etime: '',
				lineList: [],
				lineStr: '',
				lineId: 0,
				lineIndex: 0,
				lineShow: false,
				// lineIndex: 9999,

				// typeList: [{
				// 		name: '全部',
				// 		val: 0,
				// 	},
				// 	{
				// 		name: '极速',
				// 		val: 0,
				// 	},
				// 	{
				// 		name: '指派',
				// 		val: 0,
				// 	},
				// 	{
				// 		name: '实时单',
				// 		val: 0,
				// 	},
				// 	{
				// 		name: '预约单',
				// 		val: 0,
				// 	},
				// 	{
				// 		name: '快运',
				// 		val: 0,
				// 	},
				// 	{
				// 		name: '普运',
				// 		val: 0,
				// 	},
				// ],
				orderTypeIndex: 9999,
				yuyueTypeIndex: 9999,
				deliverTypeIndex: 9999,

				statusList: [{
					name: '全部',
					val: 0,
				}, {
					name: '待付款',
					val: 1,
				}, {
					name: '待揽收',
					val: 2,
				}, {
					name: '已入库',
					val: 3,
				}, {
					name: '运输中',
					val: 4,
				}, {
					name: '待签收',
					val: 5,
				}, {
					name: '有回单',
					val: 6,
				}, {
					name: '已完成',
					val: 7,
				}, {
					name: '已取消',
					val: 8,
				}],
				statusIndex: 0,

				tabList: [{
					name: '全部',
					val: 0,
				}, {
					name: '待付款',
					val: 1,
				}, {
					name: '待揽收',
					val: 2,
				}, {
					name: '已入库',
					val: 3,
				}, {
					name: '运输中',
					val: 4,
				}, {
					name: '待签收',
					val: 5,
				}, {
					name: '有回单',
					val: 6,
				}, {
					name: '已完成',
					val: 7,
				}, {
					name: '已取消',
					val: 8,
				}],
				currentTab: 0,

				page: 1,
				size: 10,
				end: false,

				dataList: [],

				break: false,
				showModel: false,
				cancelId: ''
			}
		},
		onLoad() {
			let gt = this;
			gt.getLineList();

			var historyList = uni.getStorageSync('orderHistory');
			// console.log(historyList);
			if (!historyList) {
				historyList = [];
			}
			gt.historyList = historyList;
		},
		onShow() {
			let gt = this;
			var orderSearchVal = uni.getStorageSync('orderSearchVal');
			gt.searchVal = orderSearchVal;
			uni.removeStorageSync('orderSearchVal');

			setTimeout(function() {
				gt.reGetOrderList();
			}, 500);
		},
		onHide() {
			let gt = this;
			gt.break = false;
		},

		onPullDownRefresh() {
			let gt = this;
			gt.reGetOrderList();
			uni.stopPullDownRefresh();
		},
		methods: {
			searcList(item) {
				let gt = this;
				gt.searchVal = item;
				gt.orderSearch();
			},
			showHistory() {
				let gt = this;
				// gt.historyShow = true;
				uni.navigateTo({
					url: './search'
				})

			},
			clearHistory() {
				let gt = this;
				gt.historyList = [];
				uni.setStorageSync('wayBillHistory', []);
			},

			orderSearch() {
				let gt = this;
				gt.historyShow = false;
				gt.updateHistory();
				gt.reGetOrderList();
			},
			showScreen() {
				let gt = this;
				gt.screenShow = true;
			},
			showCalcendar() {
				console.log('showCalcendar');
				let gt = this;
				gt.calcendarShow = true;
			},
			calcendarChange(res) {
				console.log(res);
				let gt = this;
				gt.stime = res.startDate;
				gt.etime = res.endDate;
				gt.timeStr = res.startDate + ' ~ ' + res.endDate;

			},
			showLine() {
				let gt = this;
				gt.lineShow = true;
			},
			lineConfirm(res) {
				console.log(res);
				let gt = this;
				gt.lineId = res[0].value;
				gt.lineStr = res[0].label;
				gt.lineIndex = res[0].index;
			},
			lineSelect(index) {
				let gt = this;
				if (index == gt.lineIndex) {
					gt.lineIndex = 9999;
				} else {
					gt.lineIndex = index;
				}
			},
			typeSelect(type, index) {
				let gt = this;
				if (index == gt[type]) {
					gt[type] = 9999;
				} else {
					gt[type] = index;
				}
			},
			statusSelect(index) {
				console.log(index);
				let gt = this;
				if (index == gt.statusIndex) {
					gt.statusIndex = 9999;
				} else {
					gt.statusIndex = index;
				}
			},
			resetScreen() {
				let gt = this;
				gt.stime = '';
				gt.etime = '';
				gt.timeStr = '';
				gt.lineId = 0;
				gt.lineStr = '';
				gt.lineIndex = 0;
				gt.orderTypeIndex = 9999;
				gt.yuyueTypeIndex = 9999;
				gt.deliverTypeIndex = 9999;
				// gt.statusIndex = gt.currentTab;
				gt.statusIndex = 0;
				gt.currentTab = 0;
			},

			submitScreen() {
				console.log('submitScreen');
				let gt = this;
				if (gt.currentTab == gt.statusIndex) {
					gt.reGetOrderList();
				} else {
					gt.currentTab = gt.statusIndex;
				}
				gt.screenShow = false;


			},
			tabsChange(index) {
				let gt = this;
				gt.currentTab = index;
				gt.statusIndex = index;
				gt.reGetOrderList();
			},

			animationfinish(item) {
				let gt = this;
				var currentTab = gt.currentTab;
				gt.currentTab = item.detail.current;
				gt.statusIndex = item.detail.current;

				console.log(1113, currentTab);
				console.log(1114, gt.currentTab);

				if (currentTab != gt.currentTab) {
					gt.reGetOrderList();
				}
			},
			async getLineList() {
				let gt = this;


				var token = await gt.gtRequest.getToken();
				console.log(621, token);
				if (token) {
					var url = "/logistics/specialline/get_special_line_list";
					var data = {
						page: 1,
						limit: 9999,
					};
					gt.gtRequest.post(url, data).then(res => {
						for (var i = 0; i < res.list.length; i++) {
							res.list[i]['lineName'] = res.list[i].start_city + '-' + res.list[i].end_city;
						}
						console.log(res.list);
						gt.lineList = res.list;
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);
						// gt.lineList = gt.lineList.concat(res.list);

						gt.lineList.unshift({
							line_id: 0,
							lineName: '全部'
						});
					});
				} else {
					gt.break = true;
					uni.showModal({
						title: '请先登录',
						showCancel: true,
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../login/login',
								});
								return false;
							}
						}
					})
					return false;
				}
			},
			updateHistory() {
				let gt = this;
				var historyList = uni.getStorageSync('orderHistory');
				// console.log(historyList);
				if (!historyList) {
					historyList = [];
				}
				// console.log(historyList);
				if (gt.searchVal == '') {
					return false;
				}
				historyList = historyList.filter(item => item != gt.searchVal);
				historyList.unshift(gt.searchVal);
				// console.log(historyList);
				gt.historyList = historyList;
				uni.setStorageSync('orderHistory', historyList);

			},
			async reGetOrderList() {
				let gt = this;
				console.log('break:', gt.break);
				// return false;
				if (gt.break) {
					return false;
				} else {
					var token = await gt.gtRequest.getToken();
					console.log(694, token);
					if (token) {
						gt.page = 1;
						gt.size = 10;
						gt.end = false;
						// gt.refreshStatus = true;
						gt.getOrderList();
					} else {
						uni.showModal({
							title: '请先登录',
							showCancel: true,
							success(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '../login/login',
									});
									return false;
								}
							}
						})
						return false;
					}
				}


			},
			getOrderList() {
				let gt = this;
				if (gt.end) {
					return false;
				}
				var url = "/logistics/order/get_order_list";


				var data = {
					page: gt.page,
					limit: gt.size,
					search_key: gt.searchVal,
				};

				if (gt.currentTab == 1) {
					data.pay_status = 0;
				}
				if (gt.currentTab == 2) {
					data.status = 5;
				}
				if (gt.currentTab == 3) {
					data.status = 7;
				}
				if (gt.currentTab == 4) {
					data.status = 9;
				}
				if (gt.currentTab == 5) {
					data.status = 11;
				}
				if (gt.currentTab == 6) {
					data.with_receipt = 2;
				}
				if (gt.currentTab == 7) {
					data.status = '20,15';
				}
				if (gt.currentTab == 8) {
					data.status = 99;
				}


				if (gt.timeStr) {
					data.start_time = gt.stime;
					data.end_time = gt.etime;
				}
				// if(gt.lineIndex != 9999){
				// 	data.line_id = gt.lineList[gt.lineIndex].line_id;
				// }
				if (gt.lineId != 0) {
					data.line_id = gt.lineId;
				}
				if (gt.orderTypeIndex != 9999) {
					data.order_type = gt.orderTypeIndex == 0 ? 2 : 1;
				}
				if (gt.yuyueTypeIndex != 9999) {
					data.is_yuyue = gt.yuyueTypeIndex;
				}
				if (gt.deliverTypeIndex != 9999) {
					data.deliver_type = gt.deliverTypeIndex + 1;
				}

				gt.gtRequest.post(url, data).then(res => {
					console.log(res);
					if (gt.page == 1) {
						gt.dataList = [];
					}
					gt.dataList = gt.dataList.concat(res.list);
					// gt.refreshStatus = false;
					if (res.list.length == gt.size) {
						gt.page = gt.page + 1;
					} else {
						gt.end = true;
					}
				});
			},

			loadMore() {
				console.log('loadMore');
				let gt = this;
				gt.getOrderList();
			},
			goOrderInfo(item) {
				let gt = this;

				uni.navigateTo({
					url: './orderInfo?orderSn=' + item.deliver_sn
				})
			},
			addMoney(item) {
				uni.navigateTo({
					url: '/subSansong/pages/sansong/addMoney?orderSn=' + item.deliver_sn,
				});
				return false;
			},
			confirmCollect(item) {
				let gt = this;
				var url = "/logistics/order/confirm_revenue";
				var data = {
					deliver_sn: item.deliver_sn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.$refs.uToast.show({
						title: '揽收成功！',
						type: 'success',
						url: 'pages/order/orderInfo?orderSn=' + item.deliver_sn,
					});
				});
			},
			confirmStart(item) {
				console.log(item);
				let gt = this;
				uni.navigateTo({
					url: '/subSansong/pages/sansong/loadSend?orderSn=' + item.deliver_sn,
				});
				return false;
			},
			confirmArriva(item) {
				let gt = this;
				var url = "/logistics/order/confirm_arrival";
				var data = {
					deliver_sn: item.deliver_sn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.$refs.uToast.show({
						title: '到达成功！',
						type: 'success',
						url: 'pages/order/orderInfo?orderSn=' + item.deliver_sn,
					});
				});
			},
			confirmSign(item) {
				uni.navigateTo({
					url: '/subSansong/pages/sansong/sign?orderSn=' + item.deliver_sn,
				});
				return false;
			},
			uploadReceipt(item) {
				uni.navigateTo({
					url: '/subSansong/pages/sansong/receipt?orderSn=' + item.deliver_sn,
				});
				return false;
			},
			cancelConfirm(item) {
				let gt = this
				gt.showModel = true
				gt.cancelId = item.deliver_sn
			},
			confirm() {
				let gt = this
				var url = '/logistics/order/confirm_cancel_apply';
				var data = {
					deliver_sn: gt.cancelId
				};
				gt.gtRequest.post(url, data).then(res => {
					if (res.code === 1) {
						gt.$refs.uToast.show({
							title: '订单已取消！',
							type: 'success',
						});
					}
				});
				gt.showModel = false
			},
			goSendInfo(item) {
				uni.navigateTo({
					url: '/subSansong/pages/sansong/sendInfo?orderSn=' + item.waybill_sn,
				});
				return false;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_search_screen {
				width: 750rpx;
				height: 88rpx;
				display: flex;
				background: #fff;
				justify-content: space-between;

				.con_search {
					width: 618rpx;
					margin-top: 8rpx;
					margin-left: 28rpx;
				}

				.con_screen {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 88rpx;
					margin-right: 24rpx;
				}

			}

			.con_history {
				margin-top: 40rpx;

				.con_title_btn {
					display: flex;
					justify-content: space-between;
					margin-left: 16rpx;
					margin-right: 40rpx;

					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
					}

					.con_btn {
						display: flex;

						.con_icon {
							margin-top: 2rpx;
						}

						.con_text {
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 44rpx;
							margin-left: 8rpx;
						}
					}
				}

				.con_list {
					display: flex;
					flex-wrap: wrap;
					margin: 0 4rpx;
					margin-top: 28rpx;

					.con_item {
						height: 64rpx;
						border-radius: 33rpx;
						border: 2rpx solid #979797;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 64rpx;
						padding: 0 24rpx;
						margin: 12rpx;
						max-width: 700rpx;

					}
				}
			}

			.con_dataList {

				.con_swiper {
					swiper {
						height: calc(100vh - 168rpx);

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
									height: calc(100vh - 168rpx);

									.con_item {
										width: 718rpx;
										// height: 692rpx;
										background: #FFFFFF;
										border-radius: 20rpx;
										margin: 20rpx 16rpx 0 16rpx;
										padding: 24rpx;

										.con_typeSn_status {
											display: flex;
											justify-content: space-between;

											.con_typeSn {
												display: flex;

												.con_type {
													width: 68rpx;
													height: 40rpx;
													background: #485EF4;
													border-radius: 6rpx;
													font-size: 24rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #FFFFFF;
													line-height: 40rpx;
													text-align: center;
												}

												.orderType1 {
													background: $gtProjectColor;
												}

												.orderType2 {
													background: #FFBF27;
												}

												.orderType3 {
													background: #FF6067;
													margin-left: 20rpx;
												}

												.con_sn {
													display: flex;
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 40rpx;
													margin-left: 22rpx;

													.con_text {}

													.con_copyIcon {
														width: 24rpx;
														height: 24rpx;
														margin: 6rpx 8rpx;
														font-size: 24rpx;
														color: #0C0C0C;
													}
												}
											}

											.con_status {
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: $gtProjectColor;
												line-height: 40rpx;
											}
										}

										// .con_type_distance {
										// 	display: flex;
										// 	justify-content: space-between;
										// 	background: #FF6067;
										// 	margin: -24rpx;
										// 	border-radius: 16rpx 16rpx 0rpx 0rpx;
										// 	margin-bottom: 20rpx;

										// 	.con_type {
										// 		font-size: 32rpx;
										// 		font-family: PingFangSC-Medium, PingFang SC;
										// 		font-weight: 500;
										// 		color: #FFFFFF;
										// 		line-height: 44rpx;
										// 		margin: 22rpx 24rpx;
										// 	}

										// 	.con_distance {
										// 		display: flex;

										// 		.con_text {

										// 			font-size: 32rpx;
										// 			font-family: PingFangSC-Medium, PingFang SC;
										// 			font-weight: 500;
										// 			color: #FFFFFF;
										// 			line-height: 44rpx;
										// 			margin: 22rpx 24rpx;
										// 		}

										// 		.con_icon {
										// 			margin-right: 24rpx;
										// 			width: 48rpx;
										// 			height: 48rpx;
										// 			margin-top: 20rpx;
										// 		}
										// 	}
										// }

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
												display: flex;
												text-align: center;
												margin: 0 12rpx;
												padding: 0 10rpx;
												height: 64rpx;
												border-radius: 10rpx;
												border: 2rpx solid #000000;
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #000000;
												line-height: 64rpx;
											}


										}
									}
								}
							}

						}
					}
				}


			}

			.con_popup {
				.con_screen {
					.con_label {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						margin-top: 40rpx;
						margin-left: 42rpx;
					}

					.con_input_icon {
						display: flex;
						justify-content: space-between;
						width: 486rpx;
						height: 64rpx;
						background: #F4F4F4;
						border-radius: 8rpx;
						margin-top: 24rpx;
						margin-left: 42rpx;
						padding: 0 40rpx;

						.con_input {
							width: 600rpx;
						}

						.con_icon {
							margin-top: 16rpx;
						}
					}

					.con_lineList {
						display: flex;
						flex-wrap: wrap;

						.con_item {
							height: 64rpx;
							background: #F4F4F4;
							border-radius: 8rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 64rpx;
							text-align: center;
							margin-top: 24rpx;
							margin-left: 24rpx;
							padding: 0 20rpx;
						}

						.activeStatus {
							color: #fff;
							background: $gtProjectColor;
						}
					}

					.con_lineInput {
						width: 486rpx;
						height: 64rpx;
						background: #F4F4F4;
						border-radius: 8rpx;
						margin-top: 24rpx;
						margin-left: 42rpx;
						padding: 0 40rpx;
					}

					.con_typeList {
						.con_typeItem {
							display: flex;

							.con_item {
								width: 146rpx;
								height: 64rpx;
								background: #F4F4F4;
								border-radius: 8rpx;
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 64rpx;
								text-align: center;
								margin-top: 24rpx;
								margin-left: 24rpx;
							}

							.activeStatus {
								color: #fff;
								background: $gtProjectColor;
							}
						}
					}

					.con_statusList {
						display: flex;
						flex-wrap: wrap;

						.con_item {
							width: 146rpx;
							height: 64rpx;
							background: #F4F4F4;
							border-radius: 8rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 64rpx;
							text-align: center;
							margin-top: 24rpx;
							margin-left: 24rpx;
						}

						.activeStatus {
							color: #fff;
							background: $gtProjectColor;
						}
					}

					.con_btns {
						display: flex;
						justify-content: space-evenly;
						width: 360rpx;
						height: 100rpx;
						// border: 2rpx solid #909399;
						margin-top: 16rpx;
						margin-left: 196rpx;

						.con_btnItem {
							width: 180rpx;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 100rpx;
							border-radius: 16rpx 0 0 16rpx;
							text-align: center;
							background: #FFBF27;
						}

						.con_btnItem:nth-child(2) {
							background: $gtProjectColor;
							border-radius: 0 16rpx 16rpx 0;
						}
					}
				}
			}
		}
	}
</style>