<template>
	<view class="gt_content">

		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>


		<view class="con_searchScreen">
			<view class="con_search" :style="currentTab != 2 ? 'width:660rpx':'width:760rpx'">
				<u-search placeholder="输入订单号/运单号/车牌号" v-model="searchVal" bg-color="#F3F4F6" :clearabled="false"
					:show-action="false" height="72" margin="8rpx 24rpx" @search="reGetDataList"></u-search>
			</view>
			<view class="con_screen" @click="showScreen" v-if="currentTab != 2">
				<text>筛选</text>
			</view>
		</view>
		<view class="con_tabs">
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"
				swiperWidth="750"></u-tabs-swiper>
		</view>
		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper_item" id="type1">

					<view class="con_empty" v-if="dataList.length == 0">

						<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
							margin-top="200" font-size="32"></u-empty>
					</view>
					<view class="con_list">
						<scroll-view class="scroll_view" scroll-y="true" @scrolltolower="loadMore">
							<view class="con_item" v-for="(item,index) in dataList" :key="index"
								@click="goSendInfo(item)">
								<view class="con_plateStatus">
									<view class="con_plate">
										<text>车牌号：{{item.license_plate}}</text>
									</view>
									<view class="con_status">
										<text>{{item.status_msg}}</text>
									</view>
								</view>
								<view class="con_line">
									<u-line color="#F2F2F2 " length="670rpx" margin="24rpx" />
								</view>
								<view class="con_snNum">
									<view class="con_sn">
										<view class="con_text">
											<text>运单号：{{item.waybill_sn}}</text>
										</view>
										<view class="con_icon" @click.stop="gtCommon.copyStr(item.waybill_sn)">
											<image :src="gtCommon.getOssImg('sansong/copy.png')" mode="widthFix">
											</image>
										</view>
									</view>
									<view class="con_num">
										<text>订单数量：{{item.order_count}}</text>
									</view>
								</view>
								<view class="con_fromTo">
									<view class="con_text">
										<text>{{item.line_start_city}}</text>
									</view>
									<view class="con_fromToLine">
										<u-line color="#F2F2F2 " length="80rpx" margin="56rpx 32rpx 0 32rpx" />
									</view>
									<view class="con_text">
										<text>{{item.line_end_city}}</text>
									</view>
								</view>
								<view class="con_keyVal">
									<view class="con_text">
										<text>发站公司：{{''&&item.start_line_info.company_name}}</text>
									</view>
									<view class="con_text">
										<text>联系电话：{{''&&item.start_line_info.line_mobile}}</text>
									</view>
									<view class="con_text">
										<text>到站公司：{{item.outlets_name}}</text>
									</view>
									<view class="con_text">
										<text>联系电话：{{item.outlets_mobile}}</text>
									</view>
								</view>
								<view class="con_line">
									<u-line color="#F2F2F2 " length="670rpx" margin="24rpx" />
								</view>
								<view class="con_timeBtn">
									<view class="con_time">
										<text>发车时间：{{gtCommon.formateTime(item.create_time,'MM月DD日 HH:mm')}}</text>
									</view>
									<view class="con_btn" @click.stop="confirmArrive(item)">
										<text>确认到达</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item class="swiper_item" id="type2">

					<view class="con_empty" v-if="dataList.length == 0">

						<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
							margin-top="200" font-size="32"></u-empty>
					</view>
					<view class="con_list">
						<scroll-view class="scroll_view" scroll-y="true" @scrolltolower="loadMore">
							<view class="con_item" v-for="(item,index) in dataList" :key="index"
								@click="goSendInfo(item)">
								<view class="con_plateStatus">
									<view class="con_plate">
										<text>车牌号：{{item.license_plate}}</text>
									</view>
									<view class="con_status">
										<text>{{item.status_msg}}</text>
									</view>
								</view>
								<view class="con_line">
									<u-line color="#F2F2F2 " length="670rpx" margin="24rpx" />
								</view>
								<view class="con_snNum">
									<view class="con_sn">
										<view class="con_text">
											<text>运单号：{{item.waybill_sn}}</text>
										</view>
										<view class="con_icon" @click.stop="gtCommon.copyStr(item.waybill_sn)">
											<!-- <text class="custom-icon custom-icon-copy"></text> -->
											<image :src="gtCommon.getOssImg('sansong/copy.png')" mode="widthFix">
											</image>
										</view>
									</view>
									<view class="con_num">
										<text>订单数量：{{item.order_count}}</text>
									</view>
								</view>
								<view class="con_fromTo">
									<view class="con_text">
										<text>{{item.line_start_city}}</text>
									</view>
									<view class="con_fromToLine">
										<u-line color="#F2F2F2 " length="80rpx" margin="56rpx 32rpx 0 32rpx" />
									</view>
									<view class="con_text">
										<text>{{item.line_end_city}}</text>
									</view>
								</view>
								<view class="con_keyVal">
									<view class="con_text">
										<text>发站公司：{{''&&item.start_line_info.company_name}}</text>
									</view>
									<view class="con_text">
										<text>联系电话：{{''&&item.start_line_info.line_mobile}}</text>
									</view>
									<view class="con_text">
										<text>到站公司：{{item.outlets_name}}</text>
									</view>
									<view class="con_text">
										<text>联系电话：{{item.outlets_mobile}}</text>
									</view>
								</view>
								<view class="con_line">
									<u-line color="#F2F2F2 " length="670rpx" margin="24rpx" />
								</view>
								<view class="con_timeBtn">
									<view class="con_time">
										<text>发车时间：{{gtCommon.formateTime(item.create_time,'MM月DD日 HH:mm')}}</text>
									</view>
									<!-- <view class="con_btn" @click="confirmArrive(item)">
										<text>确认到达</text>
									</view> -->
								</view>
							</view>
						</scroll-view>
					</view>

				</swiper-item>
				<swiper-item class="swiper_item" id="type3">
					<view class="con_tabs2">
						<u-tabs-swiper ref="uTabs2" :list="tabList2" :current="currentTab2" active-color="#485EF4"
							inactive-color="#909399" font-size="28" bar-height="0"
							bg-color="#F3F4F5" @change="tabsChange2" :is-scroll="false"
							swiperWidth="750"></u-tabs-swiper>
					</view>
					<view class="con_swiper2">
						<swiper :current="currentTab2" @animationfinish="animationfinish2">
							<swiper-item class="swiper_item2" id="type12">

								<view class="con_empty2" v-if="dataList.length == 0">

									<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')"
										icon-size="550" margin-top="200" font-size="32"></u-empty>
								</view>
								<view class="con_list2">
									<scroll-view class="scroll_view2" scroll-y="true" @scrolltolower="loadMore">
										<view class="con_item2" v-for="(item,index) in dataList" :key="index"
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
															<image :src="gtCommon.getOssImg('sansong/copy.png')"
																mode="widthFix"></image>
														</view>
													</view>
												</view>
												<view class="con_status">
													<text>{{item.status_msg}}</text>
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
														<text>{{item.goods_name}}/{{item.goods_weight}}吨/{{item.goods_volume}}方</text>
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
													<text
														v-else>下单时间：{{$u.timeFormat(item.create_time, 'mm月dd日 hh:MM')}}</text>
												</view>
												<view class="con_price">
													<text>￥{{item.last_price}}(</text>
													<text v-if="item.deliver_type == 3">货主出价</text>
													<text v-else-if="item.pay_status == 2">已支付</text>
													<text v-else-if="item.pay_status == 0">待支付</text>

													<text>)</text>
												</view>
											</view>
											<view class="con_line">
											</view>
											<view class="con_pass_btns">
												<view class="con_pass">
													<text>取货码：{{item.self_pickup_code}}</text>
												</view>
												<view class="con_btns">
													<view class="con_btnItem" @click.stop="goHailing">
														<text>叫车取货</text>
													</view>
													<!-- <view class="con_btnItem" @click.stop="addMoney(item)">
														<text>电子面单</text>
													</view> -->
													<view class="con_btnItem" @click.stop="confirmSign(item)">
														<text>签收</text>
													</view>
												</view>
											</view>

										</view>
									</scroll-view>
								</view>
							</swiper-item>
							<swiper-item class="swiper_item2" id="type22">

								<view class="con_empty2" v-if="dataList.length == 0">

									<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')"
										icon-size="550" margin-top="200" font-size="32"></u-empty>
								</view>
								<view class="con_list2">
									<scroll-view class="scroll_view2" scroll-y="true" @scrolltolower="loadMore">
										<view class="con_item2" v-for="(item,index) in dataList" :key="index"
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
															<image :src="gtCommon.getOssImg('sansong/copy.png')"
																mode="widthFix"></image>
														</view>
													</view>
												</view>
												<view class="con_status">
													<text>{{item.status_msg}}</text>
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
														<text>{{item.goods_name}}/{{item.goods_weight}}吨/{{item.goods_volume}}方</text>
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
													<text
														v-else>下单时间：{{$u.timeFormat(item.create_time, 'mm月dd日 hh:MM')}}</text>
												</view>
												<view class="con_price">
													<text>￥{{item.last_price}}(</text>
													<text v-if="item.deliver_type == 3">货主出价</text>
													<text v-else-if="item.pay_status == 2">已支付</text>
													<text v-else-if="item.pay_status == 0">待支付</text>

													<text>)</text>
												</view>
											</view>
											<view class="con_line">
											</view>
											<view class="con_pass_btns">
												<view class="con_pass">
													<text>取货码：{{item.self_pickup_code}}</text>
												</view>
												<view class="con_btns">
													<!-- <view class="con_btnItem" @click.stop="addMoney(item)">
														<text>电子面单</text>
													</view> -->
													<view class="con_btnItem" @click.stop="confirmSign(item)">
														<text>签收</text>
													</view>
												</view>
											</view>

										</view>
									</scroll-view>
								</view>
							</swiper-item>
							<swiper-item class="swiper_item2" id="type32">

								<view class="con_empty2" v-if="dataList.length == 0">

									<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')"
										icon-size="550" margin-top="200" font-size="32"></u-empty>
								</view>
								<view class="con_list2">
									<scroll-view class="scroll_view2" scroll-y="true" @scrolltolower="loadMore">
										<view class="con_item2" v-for="(item,index) in dataList" :key="index"
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
															<image :src="gtCommon.getOssImg('sansong/copy.png')"
																mode="widthFix"></image>
														</view>
													</view>
												</view>
												<view class="con_status">
													<text>{{item.status_msg}}</text>
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
														<text>{{item.goods_name}}/{{item.goods_weight}}吨/{{item.goods_volume}}方</text>
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
													<text
														v-else>下单时间：{{$u.timeFormat(item.create_time, 'mm月dd日 hh:MM')}}</text>
												</view>
												<view class="con_price">
													<text>￥{{item.last_price}}(</text>
													<text v-if="item.deliver_type == 3">货主出价</text>
													<text v-else-if="item.pay_status == 2">已支付</text>
													<text v-else-if="item.pay_status == 0">待支付</text>

													<text>)</text>
												</view>
											</view>
											<view class="con_line">
											</view>
											<view class="con_pass_btns">
												<view class="con_pass">
													<text>取货码：{{item.self_pickup_code}}</text>
												</view>
												<view class="con_btns">
													<!-- <view class="con_btnItem" @click.stop="addMoney(item)">
														<text>电子面单</text>
													</view> -->
													<view class="con_btnItem" @click.stop="confirmSign(item)">
														<text>签收</text>
													</view>
												</view>
											</view>

										</view>
									</scroll-view>
								</view>
							</swiper-item>
							<swiper-item class="swiper_item2" id="type42">

								<view class="con_empty2" v-if="dataList.length == 0">

									<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')"
										icon-size="550" margin-top="200" font-size="32"></u-empty>
								</view>
								<view class="con_list2">
									<scroll-view class="scroll_view2" scroll-y="true" @scrolltolower="loadMore">
										<view class="con_item2" v-for="(item,index) in dataList" :key="index"
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
															<image :src="gtCommon.getOssImg('sansong/copy.png')"
																mode="widthFix"></image>
														</view>
													</view>
												</view>
												<view class="con_status">
													<text>{{item.status_msg}}</text>
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
														<text>{{item.goods_name}}/{{item.goods_weight}}吨/{{item.goods_volume}}方</text>
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
													<text
														v-else>下单时间：{{$u.timeFormat(item.create_time, 'mm月dd日 hh:MM')}}</text>
												</view>
												<view class="con_price">
													<text>￥{{item.last_price}}(</text>
													<text v-if="item.deliver_type == 3">货主出价</text>
													<text v-else-if="item.pay_status == 2">已支付</text>
													<text v-else-if="item.pay_status == 0">待支付</text>

													<text>)</text>
												</view>
											</view>
											<view class="con_line">
											</view>
											<view class="con_pass_btns">
												<view class="con_pass">
													<text>取货码：{{item.self_pickup_code}}</text>
												</view>
												<view class="con_btns">
													<!-- <view class="con_btnItem" @click.stop="addMoney(item)">
														<text>电子面单</text>
													</view> -->
													<view class="con_btnItem" @click.stop="uploadReceipt(item)"
														v-if="item.status == 13">
														<text>上传回单</text>
													</view>
													<view class="con_btnItem" @click.stop="uploadReceipt(item)"
														v-if="item.receipt_status == 1">
														<text>查看回单</text>
													</view>
												</view>
											</view>

										</view>
									</scroll-view>
								</view>
							</swiper-item>
							<swiper-item class="swiper_item2" id="type52">

								<view class="con_empty2" v-if="dataList.length == 0">

									<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')"
										icon-size="550" margin-top="200" font-size="32"></u-empty>
								</view>
								<view class="con_list2">
									<scroll-view class="scroll_view2" scroll-y="true" @scrolltolower="loadMore">
										<view class="con_item2" v-for="(item,index) in dataList" :key="index"
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
															<image :src="gtCommon.getOssImg('sansong/copy.png')"
																mode="widthFix"></image>
														</view>
													</view>
												</view>
												<view class="con_status">
													<text>{{item.status_msg}}</text>
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
														<text>{{item.goods_name}}/{{item.goods_weight}}吨/{{item.goods_volume}}方</text>
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
													<text
														v-else>下单时间：{{$u.timeFormat(item.create_time, 'mm月dd日 hh:MM')}}</text>
												</view>
												<view class="con_price">
													<text>￥{{item.last_price}}(</text>
													<text v-if="item.deliver_type == 3">货主出价</text>
													<text v-else-if="item.pay_status == 2">已支付</text>
													<text v-else-if="item.pay_status == 0">待支付</text>

													<text>)</text>
												</view>
											</view>
											<view class="con_line">
											</view>
											<view class="con_pass_btns">
												<view class="con_pass">
													<text>取货码：{{item.self_pickup_code}}</text>
												</view>
												<view class="con_btns">
													<!-- <view class="con_btnItem" @click.stop="addMoney(item)">
														<text>电子面单</text>
													</view> -->
													<view class="con_btnItem" @click.stop="uploadReceipt(item)"
														v-if="item.receipt_status == 1">
														<text>查看回单</text>
													</view>
												</view>
											</view>

										</view>
									</scroll-view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</swiper-item>
			</swiper>
		</view>


		<view class="con_calendar">
			<u-calendar v-model="calendarShow" mode="range" :z-index="99999" @change="confirmTime"></u-calendar>
		</view>

		<view class="con_popup">
			<view class="con_screen">
				<u-popup v-model="screenShow" mode="top" height="600">
					<view class="con_title">
						<text>时间筛选</text>
					</view>
					<view class="con_time">
						<view class="con_icon">
							<u-icon name="calendar" size="48" color="#909399"></u-icon>
						</view>
						<view class="con_input">
							<u-input v-model="timeStr" placeholder="选择时间筛选" height="88" disabled
								@click="showCalendar" />
						</view>
					</view>
					<view class="con_title">
						<text>选择专线</text>
					</view>
					<view class="con_sLine">
						<scroll-view scroll-x="true">
							<view class="con_lineItem" :class="item.line_id == lineId ? 'activeItem':''"
								v-for="(item,index) in lineList" :key="index" @click="selectLine(item)">
								<text>{{item.line_name}}</text>
							</view>
						</scroll-view>

					</view>

					<view class="con_btns">
						<view class="con_btnItem" @click="resetSreen">
							<text>重置</text>
						</view>
						<view class="con_btnItem" @click="reGetDataList">
							<text>确定</text>
						</view>
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
				searchVal: '',

				tabList: [{
					name: '待接收'
				}, {
					name: '已到达'
				}, {
					name: '已入库'
				}],

				
				currentTab: 0,
				dataList: [],
				page: 1,
				size: 10,
				end: false,

				tabList2: [{
					name: '待派送'
				}, {
					name: '待自提'
				}, {
					name: '到付'
				}, {
					name: '有回单'
				}, {
					name: '已完成'
				}],
				currentTab2: 0,

				screenShow: false,
				timeStr: '',
				stime: '',
				etime: '',
				calendarShow: false,

				lineId: 0,
				lineList: [],
			}
		},
		onLoad() {
			let gt = this;
			gt.getLineList();
		},
		onShow() {
			let gt = this;
			gt.reGetDataList();
		},
		onPullDownRefresh() {
			let gt = this;
			gt.reGetDataList();
			uni.stopPullDownRefresh();
		},
		methods: {
			goHailing() {
				uni.navigateToMiniProgram({
					appId: "wxb1a70937ee94c194",
					success(res) {
					// 打开成功
						const info = {
							platform: 'logistics',
							btnType: 8
						}
						navigateLog(info).then(re => {
							console.log(re)
						}).catch(er => {
							console.log(er)
						})
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			showScreen() {
				let gt = this;
				if (gt.dataList.length) {
					gt.screenShow = true;
				} else {
					gt.$refs.uToast.show({
						title: '暂无数据，不能筛选',
						type: 'error',
					});
				}
			},
			showCalendar() {
				console.log('showCalendar');
				let gt = this;
				gt.calendarShow = true;
			},
			confirmTime(res) {
				console.log(res);
				let gt = this;
				gt.stime = res.startDate;
				gt.etime = res.endDate;
				gt.timeStr = res.startDate + '至' + res.endDate;
			},
			selectLine(item) {
				let gt = this;
				if (gt.lineId == item.line_id) {
					gt.lineId = 0;
				} else {
					gt.lineId = item.line_id;
				}
			},
			resetSreen() {
				let gt = this;
				gt.lineId = 0;
				gt.stime = '';
				gt.etime = '';
				gt.timeStr = '';
			},
			tabsChange(index) {
				let gt = this;
				gt.currentTab = index;
				gt.getLineList();
				gt.reGetDataList();
			},
			animationfinish(item) {
				let gt = this;
				
				var currentTab = gt.currentTab;
				gt.currentTab = item.detail.current;
				
				if(currentTab != gt.currentTab){
					gt.getLineList();
					gt.reGetDataList();
				}
			},
			getLineList() {
				let gt = this;
				var url = "/logistics/upwaybill/get_up_waybill_line_list";
				var data = {
					status: gt.currentTab,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.lineList = res.line_list;
					// gt.lineList = gt.lineList.concat(res.line_list);
					// gt.lineList = gt.lineList.concat(res.line_list);
					// gt.lineList = gt.lineList.concat(res.line_list);
					// gt.lineList = gt.lineList.concat(res.line_list);
				});
			},
			reGetDataList() {
				let gt = this;
				gt.screenShow = false;
				gt.dataList = [];
				gt.page = 1;
				gt.size = 10;
				gt.end = false;
				gt.getDataList();
			},
			getDataList() {
				let gt = this;
				if (gt.end) {
					return false;
				}
				if (gt.currentTab != 2) {
					var url = "/logistics/upwaybill/get_up_waybill_list";
					var data = {
						start_time: gt.stime,
						end_time: gt.etime,
						search_key: gt.searchVal,
						page: gt.page,
						limit: gt.size,
					};
					if (gt.lineId) {
						data.line_id = gt.lineId;
					}
					if (gt.currentTab == 0) {
						data.status = 0;
					}

					if (gt.currentTab == 1) {
						data.status = 1;
					}
					gt.gtRequest.post(url, data).then(res => {
						gt.dataList = gt.dataList.concat(res.list);
						if (res.list.length == gt.size) {
							gt.page = gt.page + 1;
						} else {
							gt.end = true;
						}
					});
				} else {
					var url = "/logistics/upwaybill/get_up_waybill_order_list";


					var data = {
						search_key: gt.searchVal,
						page: gt.page,
						limit: gt.size,
					};
					data.status = gt.currentTab2 + 1;
					gt.gtRequest.post(url, data).then(res => {
						gt.dataList = gt.dataList.concat(res.list);
						if (res.list.length == gt.size) {
							gt.page = gt.page + 1;
						} else {
							gt.end = true;
						}
					});
				}

			},
			loadMore() {
				console.log('loadMore');
				let gt = this;
				gt.getDataList();
			},
			confirmArrive(item) {
				let gt = this;

				var url = "/logistics/upwaybill/waybil_confirm_arrival";
				var data = {
					waybill_sn: item.waybill_sn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.reGetDataList();
					gt.$refs.uToast.show({
						title: '到达成功！',
						type: 'success',
					});
				});
			},

			goOrderInfo(item) {
				let gt = this;

				uni.navigateTo({
					url: 'pages/order/orderInfo?orderSn=' + item.deliver_sn + '&intoFrom=B',
				});
				return false;
			},
			goSendInfo(item) {
				let gt = this;
				uni.navigateTo({
					url: './sendInfo?orderSn=' + item.waybill_sn,
				});
				return false;
			},
			tabsChange2(index) {
				let gt = this;
				gt.currentTab2 = index;
				// gt.reGetOrderList();
				gt.reGetDataList();
			},

			animationfinish2(item) {
				let gt = this;
				
				var currentTab = gt.currentTab;
				gt.currentTab2 = item.detail.current;
				
				if(currentTab != gt.currentTab){
					gt.getLineList();
					gt.reGetDataList();
				}
			},

			confirmSign(item) {
				uni.navigateTo({
					url: '../sansong/sign?orderSn=' + item.deliver_sn,
				});
				return false;
			},
			uploadReceipt(item) {
				uni.navigateTo({
					url: '../sansong/receipt?orderSn=' + item.deliver_sn,
				});
				return false;
			},

		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_searchScreen {
				display: flex;
				justify-content: space-between;
				background: #fff;

				.con_search {
					// width: 660rpx;
				}

				.con_screen {
					width: 88rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 88rpx;
				}
			}

			.con_swiper {
				swiper {
					height: calc(100vh - 176rpx);
				}

				.swiper_item {
					.con_empty {
						width: 750rpx;
						text-align: center;
					}

					.con_list {
						.scroll_view {
							height: calc(100vh - 176rpx);

							.con_item {
								width: 718rpx;
								background: #FFFFFF;
								border-radius: 20rpx;
								padding: 20rpx 24rpx;
								margin: 20rpx 16rpx;

								.con_plateStatus {
									display: flex;
									justify-content: space-between;

									.con_plate {
										font-size: 28rpx;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 500;
										color: #000000;
										line-height: 40rpx;
									}

									.con_status {
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #485EF4;
										line-height: 40rpx;
									}
								}

								.con_snNum {
									display: flex;
									justify-content: space-between;
									margin-top: 6rpx;

									.con_sn {
										display: flex;

										.con_text {
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #909399;
											line-height: 40rpx;
										}

										.con_icon {
											width: 24rpx;
											height: 24rpx;
											margin-left: 8rpx;
											margin-top: 4rpx;
											
										}
									}

									.con_num {
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #000000;
										line-height: 40rpx;
									}
								}

								.con_fromTo {
									margin-top: 32rpx;
									display: flex;

									.con_text {
										font-size: 32rpx;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 500;
										color: #000000;
										line-height: 44rpx;
									}

									.con_fromToLine {
										margin-top: -32rpx;
									}
								}

								.con_keyVal {
									margin-top: 16rpx;

									.con_text {
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #909399;
										line-height: 40rpx;
										margin-top: 16rpx;
									}

									.con_text:nth-child(3) {
										margin-top: 32rpx;
									}
								}

								.con_timeBtn {
									display: flex;
									justify-content: space-between;

									.con_time {
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #909399;
										line-height: 40rpx;
										margin-top: 6rpx;
									}

									.con_btn {
										width: 160rpx;
										height: 64rpx;
										border-radius: 10rpx;
										border: 2rpx solid #485EF4;
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #485EF4;
										line-height: 64rpx;
										text-align: center;
										margin-top: -6rpx;
									}
								}
							}
						}
					}
				}

				#type3 {
					.con_swiper2 {
						swiper {
							height: calc(100vh - 264rpx);
						}

						.swiper_item2 {
							.con_empty2 {
								width: 750rpx;
								text-align: center;
							}

							.con_list2 {
								.scroll_view2 {
									height: calc(100vh - 264rpx);

									// .con_item2 {
									// 	width: 718rpx;
									// 	background: #FFFFFF;
									// 	border-radius: 20rpx;
									// 	padding: 20rpx 24rpx;
									// 	margin: 20rpx 16rpx;

									// }
									.con_item2 {
										width: 718rpx;
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

										.con_pass_btns {
											display: flex;
											justify-content: space-between;

											.con_pass {
												font-size: 28rpx;
												font-family: PingFangSC-Medium, PingFang SC;
												font-weight: 500;
												color: #000000;
												line-height: 64rpx;
												padding: 20rpx 0;

												text {
													// display: none;
												}
											}
										}

										.con_btns {
											display: flex;
											justify-content: flex-end;
											padding: 20rpx 12rpx;

											.con_btnItem {
												text-align: center;
												margin: 0 12rpx;
												width: 136rpx;
												height: 64rpx;
												border-radius: 10rpx;
												border: 2rpx solid $gtProjectColor;
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: $gtProjectColor;
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

					background: #fff;

					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						margin: 32rpx;
					}

					.con_time {
						display: flex;
						width: 686rpx;
						height: 88rpx;
						background: #F4F4F4;
						border-radius: 16rpx;
						margin-top: 32rpx;
						margin-left: 32rpx;

						.con_icon {
							margin: 22rpx 24rpx;
						}

						.con_input {
							width: 680rpx;
						}
					}

					.con_sLine {
						margin: 0 16rpx;
						height: 56rpx;
						white-space: nowrap;

						scroll-view {
							display: flex;

							.con_lineItem {
								height: 56rpx;
								border-radius: 27rpx;
								border: 2rpx solid #000000;
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 56rpx;
								text-align: center;
								margin: 0 16rpx;
								padding: 0 24rpx;
								display: inline-block;
							}

							.activeItem {
								border: $gtProjectColor;
								background: $gtProjectColor;
								color: #fff;
							}
						}
					}

					.con_btns {
						display: flex;
						justify-content: space-around;
						margin-top: 88rpx;

						.con_btnItem {
							width: 348rpx;
							height: 100rpx;
							border-radius: 16rpx;
							border: 2rpx solid $gtProjectColor;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: $gtProjectColor;
							line-height: 100rpx;
							text-align: center;
						}

						.con_btnItem:nth-child(2) {
							background: $gtProjectColor;
							color: #fff;
						}
					}
				}
			}
		}
	}
</style>