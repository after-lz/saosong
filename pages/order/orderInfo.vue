<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="con_map">
			<map id="myMap" style="width:750rpx;height:100vh;" :markers="covers" :polyline="polyline"
				:longitude="longitude" :latitude="latitude" :show-location="false">
				<cover-view slot="callout">

					<cover-view class="con_cover" :marker-id="item.id" v-for="(item,index) in covers" :key="index">
						<cover-view class="con_item">
							<cover-image class="con_img" :src="item.img" @load="scoverImgLoad"
								@error="scoverImgFail"></cover-image>
						</cover-view>
						<cover-view class="con_item" style="margin-left: -20rpx;padding-left: 20rpx;z-index:-99"
							v-if="item.text">
							<cover-view class="con_text">{{item.text}}</cover-view>
						</cover-view>
					</cover-view>

				</cover-view>
			</map>
		</view>
		<!-- #endif -->

		<view class="con_movable">
			<!-- #ifdef MP-WEIXIN -->
			<movable-area class="movable-area" :scale-area="ture">
				<movable-view class="movable-view" :x="moveX" :y="moveY" direction="vertical"
					@change="movableViewChange">
					<view class="con_orderInfo">
			<!-- #endif -->
						<scroll-view :scroll-y="scrollY" class="scroll">

							<view class="con_label_btn">


								<view class="con_label" v-if="dataInfo.status == 5 && dataInfo.jiaohuo_type == 1">
									<text>待货主交货，请尽快与货主联系，让货主自送</text>
								</view>
								<view class="con_label" v-if="dataInfo.status == 5 && dataInfo.jiaohuo_type == 2">
									<text>待提货，请尽快与货主联系，上门提货</text>
								</view>

								<view class="con_label" style="margin: 28rpx 0;" v-if="dataInfo.status == 7">
									<text>已入库</text>
								</view>

								<view class="con_label" style="margin: 28rpx 0;" v-if="dataInfo.status == 9">
									<text>运输中</text>
								</view>

								<view class="con_label" style="margin: 28rpx 0;" v-if="dataInfo.status == 11">
									<text>待自提/待交货</text>
								</view>
								<view class="con_label" style="margin: 28rpx 0;" v-if="dataInfo.status == 13">
									<text>待回单/待确认收货</text>
								</view>
								<view class="con_label" style="margin: 28rpx 0;" v-if="dataInfo.status == 15">
									<text>已确认收货</text>
								</view>

								<view class="con_label" style="margin: 28rpx 0;" v-if="dataInfo.status == 20">
									<text>已完成</text>
								</view>
								<view class="con_label" style="margin: 28rpx 0;" v-if="dataInfo.status == 99">
									<text>已取消</text>
								</view>





								<view class="con_btn" @click="showTrajectory">
									<view class="con_text">
										<text>物流轨迹</text>
									</view>
									<view class="con_icon">
										<u-icon name="arrow-right"></u-icon>
									</view>
								</view>
							</view>

							<view class="con_billInfo" v-if="dataInfo.pay_status == 0">
								<view class="con_title_detailBtn">
									<view class="con_title">
										<text>费用信息</text>
									</view>
									<view class="con_detailBtn" @click="goBillDetail">
										<text>费用明细</text>
									</view>
								</view>
								<view class="con_line">
									<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
								</view>

								<!-- <view class="con_pay_price">
										<view class="con_pay">
											<text v-if="dataInfo.pay_status == 2">已支付</text>
											<text v-else>未支付</text>
										</view>
										<view class="con_price">
											<text>8888.88元</text>
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
									<view class="con_line">
										<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
									</view> -->

								<view class="con_billList">
									<view class="con_billItem">
										<view class="con_unPayList">
											<view class="con_title_total">

												<view class="con_title">
													<text>待支付</text>
												</view>
												<view class="con_total">
													<text>{{unPayTotalMoney}}元</text>
												</view>
											</view>
											<view class="con_list">
												<view class="con_item" v-for="(item,index) in unPayBillList"
													:key="index">
													<view class="con_type_num">
														<view class="con_type">
															<text>{{item.fee_notice}}</text>
														</view>
														<view class="con_num">
															<text>{{item.money}}元</text>
														</view>
													</view>
													<view class="con_voucher" v-if="item.fee_pic">
														<view class="con_text">
															<text>运输凭证</text>
														</view>
														<view class="con_list">
															<view class="con_img" v-for="(item1,index1) in item.picArr"
																:key="index1"
																@click="gtCommon.previewImg(item1 + '?x-oss-process=style/sansong_app')">
																<image :src="item1 + '?x-oss-process=style/sansong_app'"
																	mode="widthFix"></image>
															</view>
														</view>

													</view>
												</view>
											</view>
										</view>
									</view>

									<view class="con_line">
										<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
									</view>
									<view class="con_billItem">
										<view class="con_unPayList">
											<view class="con_title_total">

												<view class="con_title">
													<text>已支付</text>
												</view>
												<view class="con_total">
													<text>{{payTotalMoney}}元</text>
												</view>
											</view>
											<view class="con_list">
												<view class="con_item" v-for="(item,index) in payBillList" :key="index">
													<view class="con_type_num">
														<view class="con_type">
															<text>{{item.fee_notice}}</text>
														</view>
														<view class="con_num">
															<text>{{item.money}}元</text>
														</view>
													</view>
													<view class="con_payMethod">
														<view class="con_text">
															<text>支付方式</text>
														</view>
														<view class="con_text">
															<text v-if="item.pay_type == 1">线下支付</text>
															<text v-if="item.pay_type == 2">余额支付</text>
															<text v-if="item.pay_type == 3">支付宝支付</text>
															<text v-if="item.pay_type == 4">微信支付</text>
														</view>
													</view>
													<view class="con_voucher" v-if="item.fee_pic">
														<view class="con_text">
															<text>运输凭证</text>
														</view>
														<view class="con_list">
															<view class="con_img" v-for="(item1,index1) in item.picArr"
																:key="index1"
																@click="gtCommon.previewImg(item1 + '?x-oss-process=style/sansong_app')">
																<image :src="item1 + '?x-oss-process=style/sansong_app'"
																	mode="widthFix"></image>
															</view>
														</view>

													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>

							<view class="con_userInfo_contact">
								<view class="con_userInfo">
									<view class="con_headImg">
										<!-- <image :src="cargoInfo.headerpic" mode="widthFix"></image> -->
										<u-avatar :src="cargoInfo.headerpic"></u-avatar>
									</view>
									<view class="con_nickNameMobile">
										<view class="con_nickName">
											<text>{{cargoInfo.nickname}}</text>
										</view>
										<view class="con_mobile">
											<text>{{gtCommon.hiddenMobile4to7(cargoInfo.mobile)}}</text>
										</view>
									</view>
								</view>
								<view class="con_contact">
									<!-- <view class="con_message">
										<u-icon name="chat-fill" color="#000000" size="40"></u-icon>
									</view> -->
									<view class="con_call" @click="gtCommon.callMobile(cargoInfo.mobile)">
										<u-icon name="phone-fill" color="#000000" size="40"></u-icon>
									</view>
								</view>
							</view>

							<view class="con_baseInfo">
								<u-read-more :toggle="true" close-text="更多" open-text="收起" color="#909399"
									text-indent="0">
									<view class="con_title">
										<text>订单信息</text>
									</view>
									<view class="con_line">
										<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
									</view>
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
											<view class="con_fromAddress u-line-1"><!--  @longpress.stop="longtap($event, 'from')" -->
												<text>{{dataInfo.pickup_province}}-{{dataInfo.pickup_city}}-{{dataInfo.pickup_county}}{{dataInfo.pickup_address}}</text>
											</view>
											<view class="con_fromType">
												<text>{{dataInfo.pickup_remark}}</text>
											</view>
											<view class="con_fromNamePhone">
												<text>{{dataInfo.pickup_truename}}</text>
												<text
													style="margin-left: 10rpx;">{{gtCommon.hiddenMobile4to7(dataInfo.pickup_mobile)}}</text>
											</view>

											<view class="con_toAddress u-line-1"><!--  @longpress.stop="longtap($event, 'to')" -->
												<text>{{dataInfo.receive_province}}-{{dataInfo.receive_city}}-{{dataInfo.receive_county}}{{dataInfo.receive_address}}</text>
											</view>
											<view class="con_toType">
												<text>{{dataInfo.receive_remark}}</text>
											</view>
											<view class="con_toNamePhone">
												<text>{{dataInfo.receive_truename}}</text>
												<text style="margin-left: 10rpx;">
													{{gtCommon.hiddenMobile4to7(dataInfo.receive_mobile)}}</text>
											</view>
										</view>
									</view>
									<view class="con_line">
										<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
									</view>
									<view class="con_keyVal">
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>运单编号</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text_btn">
													<view class="con_text">
														<text>{{dataInfo.waybill_sn}}</text>
													</view>
													<view class="con_copyBtn"
														@click="gtCommon.copyStr(dataInfo.waybill_sn)"
														v-if="dataInfo.waybill_sn">
														<text>复制</text>
													</view>
												</view>
											</view>
										</view>
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>订单编号</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text_btn">
													<view class="con_text">
														<text>{{dataInfo.deliver_sn}}</text>
													</view>
													<view class="con_copyBtn"
														@click="gtCommon.copyStr(dataInfo.deliver_sn)">
														<text>复制</text>
													</view>
												</view>
											</view>
										</view>
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>订单时间</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text_btn">
													<view class="con_text">
														<text>{{gtCommon.formateTime(dataInfo.create_time,'YYYY年MM月DD日 HH:mm')}}</text>
													</view>
												</view>
											</view>
										</view>
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>订单类型</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text_btn">
													<view class="con_text">
														<text v-if="dataInfo.order_type == 1">指派下单</text>
														<text v-if="dataInfo.order_type == 2">极速下单</text>
													</view>
												</view>
											</view>
										</view>
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>是否开票</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text_btn">
													<view class="con_text">
														<text v-if="dataInfo.is_invoice == 1">开票</text>
														<text v-else>不开票</text>
													</view>
												</view>
											</view>
										</view>
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>物流方式</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text_btn">
													<view class="con_text"><text
															v-if="dataInfo.deliver_type == 1">普运</text>
														<text v-if="dataInfo.deliver_type == 2">快运</text>
														<text v-if="dataInfo.deliver_type == 3">议价</text>
														<text>{{dataInfo.transport_day_min}}-{{dataInfo.transport_day_max}}天</text>
													</view>
												</view>
											</view>
										</view>
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>回单收条</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text_btn">
													<view class="con_text">
														<text v-if="dataInfo.receipt_type == 1">无需</text>
														<text v-if="dataInfo.receipt_type == 2">回单</text>
														<text v-if="dataInfo.receipt_type == 3">收条</text>
													</view>
												</view>
											</view>
										</view>
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>备注</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text_btn">
													<view class="con_text">
														<text v-if="dataInfo.remark">{{dataInfo.remark}}</text>
														<text v-else> - </text>
													</view>
												</view>
											</view>
										</view>
									</view>

								</u-read-more>
							</view>

							<view class="con_goodsInfo">
								<u-read-more :toggle="true" close-text="更多" open-text="收起" color="#909399"
									text-indent="0">
									<view class="con_title">
										<text>货物信息</text>
									</view>
									<view class="con_line">
										<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
									</view>
									<view class="con_imgs" v-if="dataInfo.pack_imgs">
										<view class="con_title" style="font-size: 28rpx;line-height: 160rpx;">
											<text>货物照片</text>
										</view>
										<view class="con_list">
											<view class="con_item" v-for="(item,index) in dataInfo.pack_imgs"
												:key="index"
												@click="gtCommon.previewImg(item + '?x-oss-process=style/sansong_app')">
												<image :src="item + '?x-oss-process=style/sansong_app'"
													mode="widtahFix"></image>
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

									<view class="con_keyVal">
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>货物名称</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text">
													<text>{{dataInfo.goods_name}}</text>
												</view>
											</view>
										</view>
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>包装类型</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text">
													<text>{{dataInfo.pack_name}}</text>
												</view>
											</view>
										</view>
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>交货方式</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text">
													<text v-if="dataInfo.jiaohuo_type == 1">自送专线</text>
													<text v-if="dataInfo.jiaohuo_type == 2">上门自提</text>
												</view>
											</view>
										</view>
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>配送方式</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text">
													<text v-if="dataInfo.peisong_type == 1">送货上门</text>
													<text v-if="dataInfo.peisong_type == 2">自提</text>
												</view>
											</view>
										</view>
										<view class="con_item"
											v-if="dataInfo.peisong_type == 2 && dataInfo.status > 7 && dataInfo.outlets_name != ''">
											<view class="con_key">
												<view class="con_text">
													<text>自提网点</text>
												</view>
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
										<view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>是否异形件</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text">
													<text v-if="dataInfo.pack_is_special == 1">是</text>
													<text v-if="dataInfo.pack_is_special == 0">否</text>
												</view>
											</view>
										</view>
										<!-- <view class="con_item">
											<view class="con_key">
												<view class="con_text">
													<text>声明价值</text>
												</view>
											</view>
											<view class="con_val">
												<view class="con_text">
													<text>{{dataInfo.goods_value_price}}</text>
												</view>
											</view>
										</view> -->


									</view>
								</u-read-more>
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
								<view class="con_line">
									<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
								</view>

								<!-- <view class="con_pay_price">
											<view class="con_pay">
												<text v-if="dataInfo.pay_status == 2">已支付</text>
												<text v-else>未支付</text>
											</view>
											<view class="con_price">
												<text>8888.88元</text>
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
										<view class="con_line">
											<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
										</view> -->

								<view class="con_billList">
									<view class="con_billItem" v-if="unPayTotalMoney > 0">
										<view class="con_unPayList">
											<view class="con_title_total">

												<view class="con_title">
													<text>待支付</text>
												</view>
												<view class="con_total">
													<text>{{unPayTotalMoney}}元</text>
												</view>
											</view>
											<view class="con_list">
												<view class="con_item" v-for="(item,index) in unPayBillList"
													:key="index">
													<view class="con_type_num">
														<view class="con_type">
															<text>{{item.fee_notice}}</text>
														</view>
														<view class="con_num">
															<text>{{item.money}}元</text>
														</view>
													</view>
													<view class="con_voucher" v-if="item.fee_pic">
														<view class="con_text">
															<text>运输凭证</text>
														</view>
														<view class="con_list">
															<view class="con_img" v-for="(item1,index1) in item.picArr"
																:key="index1"
																@click="gtCommon.previewImg(item1 + '?x-oss-process=style/sansong_app')">
																<image :src="item1 + '?x-oss-process=style/sansong_app'"
																	mode="widthFix"></image>
															</view>
														</view>

													</view>
												</view>
											</view>
										</view>
									</view>

									<view class="con_line" v-if="unPayTotalMoney > 0">
										<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
									</view>
									<view class="con_billItem">
										<view class="con_unPayList">
											<view class="con_title_total">

												<view class="con_title">
													<text>已支付</text>
												</view>
												<view class="con_total">
													<text>{{payTotalMoney}}元</text>
												</view>
											</view>
											<view class="con_list">
												<view class="con_item" v-for="(item,index) in payBillList" :key="index">
													<view class="con_type_num">
														<view class="con_type">
															<text>{{item.fee_notice}}</text>
														</view>
														<view class="con_num">
															<text>{{item.money}}元</text>
														</view>
													</view>
													<view class="con_payMethod">
														<view class="con_text">
															<text>支付方式</text>
														</view>
														<view class="con_text">
															<text v-if="item.pay_type == 1">线下支付</text>
															<text v-if="item.pay_type == 2">余额支付</text>
															<text v-if="item.pay_type == 3">支付宝支付</text>
															<text v-if="item.pay_type == 4">微信支付</text>
														</view>
													</view>
													<view class="con_voucher" v-if="item.fee_pic">
														<view class="con_text">
															<text>运输凭证</text>
														</view>
														<view class="con_list">
															<view class="con_img" v-for="(item1,index1) in item.picArr"
																:key="index1"
																@click="gtCommon.previewImg(item1 + '?x-oss-process=style/sansong_app')">
																<image :src="item1 + '?x-oss-process=style/sansong_app'"
																	mode="widthFix"></image>
															</view>
														</view>

													</view>
												</view>
											</view>
										</view>
									</view>
								</view>

							</view>

							<view class="con_sendInfo" v-if="sendInfo.length">
								<view class="con_title">
									<text>配载信息</text>
								</view>
								<view class="con_line">
									<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
								</view>
								<view class="con_keyVal">
									<view class="con_item" v-if="sendInfo.waybill_sn">
										<view class="con_key">
											<view class="con_text">
												<text>运单编号</text>
											</view>
										</view>
										<view class="con_val">
											<view class="con_text_btn">
												<view class="con_text">
													<text>{{sendInfo.waybill_sn}}</text>
												</view>
												<view class="con_copyBtn" @click="gtCommon.copyStr(sendInfo.waybill_sn)"
													v-if="sendInfo.waybill_sn">
													<text>复制</text>
												</view>
											</view>
										</view>
									</view>
									<view class="con_item">
										<view class="con_key">
											<view class="con_text">
												<text>车牌号</text>
											</view>
										</view>
										<view class="con_val">
											<view class="con_text">
												<text>{{sendInfo.license_plate}}</text>
											</view>
										</view>
									</view>
									<view class="con_item">
										<view class="con_key">
											<view class="con_text">
												<text>司机姓名</text>
											</view>
										</view>
										<view class="con_val">
											<view class="con_text">
												<text>{{sendInfo.driver_name}}</text>
											</view>
										</view>
									</view>
									<view class="con_item">
										<view class="con_key">
											<view class="con_text">
												<text>司机电话</text>
											</view>
										</view>
										<view class="con_val">
											<view class="con_text">
												<text>{{sendInfo.driver_mobile}}</text>
											</view>
										</view>
									</view>
									<view class="con_item">
										<view class="con_key">
											<view class="con_text">
												<text>到站信息</text>
											</view>
										</view>
										<view class="con_val" style="text-align: right;">
											<view class="con_text" style="margin: 4rpx 0;">
												<text>到站公司：{{sendInfo.outlets_name}}</text>
											</view>
											<view class="con_text" style="margin: 4rpx 0;">
												<text>到站电话：{{sendInfo.outlets_mobile}}</text>
											</view>
											<view class="con_text" style="margin: 4rpx 0;">
												<text>到站经理：{{sendInfo.outlets_contact}}</text>
											</view>
											<view class="con_text" style="margin: 4rpx 0;">
												<text>到站地址：{{sendInfo.outlets_address}}</text>
											</view>
										</view>
									</view>
									<view class="con_item">
										<view class="con_key">
											<view class="con_text">
												<text>发车时间</text>
											</view>
										</view>
										<view class="con_val">
											<view class="con_text">
												<text>{{sendInfo.create_time}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- <view class="con_service">
								<view class="con_icon">
									<u-icon name="server-fill"></u-icon>
								</view>
								<view class="con_text">
									<text>在线客服</text>
								</view>
							</view> -->


							<view class="con_signInfo" v-if="signImgList.length">
								<view class="con_title">
									<text>签收信息</text>
								</view>
								<view class="con_line">
									<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
								</view>
								<view class="con_list">
									<view class="con_item" v-for="(item,index) in signImgList" :key="index">
										<!-- <image :src="item.img_path+'?x-oss-process=style/sansong_app'" mode="widthFix"
											@click="gtCommon.previewImg(item.img_path + '?x-oss-process=style/sansong_app')">
										</image> -->
										<view @click="gtCommon.previewImg(item.img_path + '?x-oss-process=style/sansong_app')"
											style="width: 100%; height: 100%; background-size: cover; background-repeat: no-repeat; background-position: center center;"
											:style="{'background-image': `url(${item.img_path}?x-oss-process=style/sansong_app)`}"
										></view>
									</view>
								</view>
							</view>


							<view class="con_signInfo" v-if="receiptList.length">
								<view class="con_title">
									<text>回单信息</text>
								</view>
								<view class="con_line">
									<u-line color="#F2F2F2" length="670rpx" margin="24rpx 0"></u-line>
								</view>
								<view class="con_list">
									<view class="con_item" v-for="(item,index) in receiptList" :key="index">
										<image :src="item.img_path+'?x-oss-process=style/sansong_app'" mode="widthFix"
											@click="gtCommon.previewImg(item.img_path + '?x-oss-process=style/sansong_app')">
										</image>
									</view>
								</view>
							</view>

							<view class="con_agreement" @click="gtCommon.goLicence(yunshu_xieyi_url)">
								<text>《货物运输协议》</text>
							</view>

						</scroll-view>
						<view class="con_btns">
							<view class="con_list" v-if="dataInfo.status == 5">
								<!-- <view class="con_item" @click="clickBtn('cancelOrder')">
									<view class="con_text">
										<text>取消订单</text>
									</view>
								</view> -->
								<view class="con_item" @click="clickBtn('addMoney')"
									v-if="dataInfo.pay_status != 0 || dataInfo.pay_method == 2">
									<view class="con_text">
										<text>增加费用</text>
									</view>
								</view>
								<view class="con_item" @click="clickBtn('confirmCollect')">
									<view class="con_text">
										<text>确认揽收</text>
									</view>
								</view>
								<view class="con_item" @click="clickBtn('offlineCollection')"
									v-if="dataInfo.no_pay_total > 0">
									<view class="con_text">
										<text>我已现金收款</text>
									</view>
								</view>
							</view>
						
							<view class="con_list" v-if="dataInfo.status == 7">
						
								<view class="con_item" @click="clickBtn('addMoney')"
									v-if="dataInfo.pay_status != 0 || dataInfo.pay_method == 2">
									<view class="con_text">
										<text>增加费用</text>
									</view>
								</view>
								<view class="con_item" @click="clickBtn('confirmStart')">
									<view class="con_text">
										<text>确认发车</text>
									</view>
								</view>
							</view>
							<view class="con_list" v-if="dataInfo.status == 9">
								<view class="con_item" @click="clickBtn('goSendInfo')">
									<view class="con_text">
										<text>查看运单</text>
									</view>
								</view>
								<view class="con_item" @click="clickBtn('addMoney')"
									v-if="dataInfo.pay_status != 0 || dataInfo.pay_method == 2">
									<view class="con_text">
										<text>增加费用</text>
									</view>
								</view>
								<!-- 2023年06月17日，应后台要求，单订单到达停用 -->
								<!-- <view class="con_item" @click="clickBtn('confirmArrive')">
									<view class="con_text">
										<text>确认到达</text>
									</view>
								</view> -->
							</view>
							<view class="con_list" v-if="dataInfo.status == 11">
								<view class="con_item" @click="clickBtn('addMoney')">
									<view class="con_text">
										<text>增加费用</text>
									</view>
								</view>
								<view class="con_item" @click="clickBtn('offlineCollection')"
									v-if="dataInfo.no_pay_total > 0">
									<view class="con_text">
										<text>我已现金收款</text>
									</view>
								</view>
								<view class="con_item" @click="clickBtn('confirmSign')">
									<view class="con_text">
										<text>签收</text>
									</view>
								</view>
							</view>
							<view class="con_list" v-if="dataInfo.status == 13">
						
								<view class="con_item" @click="clickBtn('uploadReceipt')">
									<view class="con_text">
										<text>上传回单</text>
									</view>
								</view>
							</view>
						</view>
			<!-- #ifdef MP-WEIXIN -->
					</view>
				</movable-view>
			</movable-area>
			<!-- #endif -->
		</view>

		<view class="con_popup">
			<view class="con_trajectory">
				<u-popup v-model="trajectoryShow" mode="bottom" height="800" duration="300">
					<view class="con_close" @click="hideTrajectory">
						<view class="con_icon">
							<u-icon name="close" size="32" color="#000000"></u-icon>
						</view>
					</view>

					<view class="con_logo_text">
						<view class="con_logo">
							<view class="con_img">
								<image :src="gtCommon.getOssImg('order/logoImg.png')" mode="widthFix"></image>
							</view>
						</view>
						<view class="con_text">
							<view class="con_title">
								<text>伞送速运</text>
							</view>
							<view class="con_snBtn">
								<view class="con_sn">
									<text>运单号：{{dataInfo.deliver_sn}}</text>
								</view>
								<view class="con_btn" @click="gtCommon.copyStr(dataInfo.deliver_sn)">
									<text>复制</text>
								</view>
							</view>
						</view>
					</view>

					<view class="con_list">
						<scroll-view scroll-y="true" style="height: 52vh;overflow: auto;">
							<view class="trajectoryItem" v-for="(item,index) in trajectoryList" :key="index">
								<view class="con_icon_title">
									<view class="con_icon">
									</view>
									<view class="con_text">
										<text>{{item.status_msg}}</text>
										<text
											style="margin-left: 40rpx;font-size: 28rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #909399;line-height: 40rpx;">{{$u.timeFormat(item.create_time, 'mm-dd hh:MM:ss')}}</text>
									</view>
								</view>
								<view class="con_line_time">
									<view class="con_line">
										<u-line length="84rpx" color="#E5E5E5" direction="col" margin="16rpx"></u-line>
									</view>
									<view class="con_time" v-if="item.company_contact">
										<text>操作人:{{item.company_contact}}</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</u-popup>
			</view>
		</view>
		
		<longpress-pop ref="longpressPop">
			<view class="longc_copy" @click="copyMsg">复制</view>
		</longpress-pop>
	</view>
</template>

<script>
	import gtCommon from '../../common/gtCommon.js';
	// #ifdef MP-WEIXIN
	import QQMapWX from '../../static/qqmap/qqmap-wx-jssdk.js';
	const tMap = new QQMapWX({
		key: 'OLGBZ-PMQ64-TVHUY-DDVGK-42GOF-Z5FP4' //腾讯地图开发者密钥
	});
	// #endif
	// // #ifdef APP-PLUS
	// import amapWX from '../../static/amap/amap-wx.130.js';
	// var myAmapFun = new amapWX.AMapWX({
	// 	key: '816b0fff1e1e3278798c2e12247a7948'
	// });
	// console.log('myAmapFun');
	// console.log(myAmapFun);

	// // #endif
	import longpressPop from '@/components/longpressPop.vue'
	export default {
		components: { longpressPop },
		data() {
			return {
				intoFrom: 'A',
				includePoints: [],

				id: 0, //使用marker点击事件需要填写id
				title: 'map',
				latitude: 31.574729,
				longitude: 120.301663,
				polyline: [],
				covers: [],
				// sCover: {},
				// eCover: {},

				companyLat: '',
				companyLng: '',
				companyHeadImg: '',

				orderSn: '',
				dataInfo: {},
				cargoInfo: {},
				sendInfo: {},

				payBillList: [],
				unPayBillList: [],
				payTotalMoney: 0,
				unPayTotalMoney: 0,

				signImgList: [],
				receiptList: [],

				screenHeight: 0,


				moveX: 0,
				moveY: 0,
				scrollY: false,

				trajectoryList: [],

				trajectoryShow: false,

				msg: '',
				yunshu_xieyi_url:'https://saasdemo.sansongkeji.com/adminsite/#/agreement/transportation'
				// yunshu_xieyi_url:'https://baidu.com'
			}
		},
		onLoad(options) {
			let gt = this;
			gt.orderSn = options.orderSn;
			// if(options.intoFrom){
			// 	gt.intoFrom = options.intoFrom;
			// }

			var companyInfo = uni.getStorageSync('companyInfo');
			gt.companyLat = companyInfo.latitude;
			gt.companyLng = companyInfo.longitude;
			gt.companyHeadImg = companyInfo.company_pic;

			uni.getSystemInfo({
				success(res) {
					console.log(res);
					gt.screenHeight = res.screenHeight;
					gt.moveY = res.screenHeight * 0.6;
				},

				fail(res) {
					console.log(res);
				},
				complete(res) {
					console.log(res);
				}
			});

			// #ifdef APP-PLUS
			gt.scrollY = true;
			// #endif
		},
		onShow() {
			let gt = this;
			// #ifdef APP-PLUS
			gt.moveY = 0;
			// #endif

			gt.getDataInfo();
		},
		methods: {
			longtap(e, type) {
				let gt = this
				if(type == 'from') {
					gt.msg = gt.dataInfo.pickup_province+'-'+gt.dataInfo.pickup_city+'-'+gt.dataInfo.pickup_county+gt.dataInfo.pickup_address
				} else {
					gt.msg = gt.dataInfo.receive_province+'-'+gt.dataInfo.receive_city+'-'+gt.dataInfo.receive_county+gt.dataInfo.receive_address
				}
				gt.$refs.longpressPop.longtap(e)
			},
			copyMsg() {
				let gt = this
				uni.setClipboardData({
					data: gt.msg
				})
			},
			scoverImgLoad(res) {
				console.log('scoverImgLoad:', res);
			},
			scoverImgFail(res) {
				console.log('scoverImgFail:', res);
			},
			ecoverImgLoad(res) {
				console.log('ecoverImgLoad:', res);
			},
			ecoverImgFail(res) {
				console.log('ecoverImgFail:', res);
			},
			writeLine() {
				console.log('writeLine');
				let gt = this;

				var from = '0,0';
				var to = '0,0';


				// gt.covers = [];
				if (gt.intoFrom == 'A') {
					if (gt.dataInfo.status == 5 && gt.dataInfo.jiaohuo_type == 1) {
						// 待自送
						from = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
						to = gt.companyLat + ',' + gt.companyLng;

						var coverItem = {
							id: 1,
							latitude: gt.dataInfo.pickup_latitude,
							longitude: gt.dataInfo.pickup_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gt.cargoInfo.headerpic,
							text: '待发货人自送',
						};
						// gt.sCover = coverItem;
						gt.covers.push(coverItem);

						var coverItem = {
							id: 2,
							latitude: gt.companyLat,
							longitude: gt.companyLng,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gt.companyHeadImg,
						};
						// gt.eCover = coverItem;
						gt.covers.push(coverItem);
					}
					if (gt.dataInfo.status == 5 && gt.dataInfo.jiaohuo_type == 2) {
						// 待揽收
						from = gt.companyLat + ',' + gt.companyLng;
						to = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;

						var coverItem = {
							id: 2,
							latitude: gt.companyLat,
							longitude: gt.companyLng,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gt.companyHeadImg,
							text: '',
						};
						gt.covers.push(coverItem);

						var coverItem = {
							id: 1,
							latitude: gt.dataInfo.pickup_latitude,
							longitude: gt.dataInfo.pickup_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gt.cargoInfo.headerpic,
							// text: '据X公里',
							text: '',
						};
						gt.covers.push(coverItem);
					}
					if (gt.dataInfo.status == 7) {
						// 已入库
						from = '0,0';
						to = '0,0';

						var coverItem = {
							id: 2,
							latitude: gt.companyLat,
							longitude: gt.companyLng,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gt.companyHeadImg,
							text: '已入库,等待发车',
						};
						gt.covers.push(coverItem);
					}
					if (gt.dataInfo.status == 9) {
						// 运输中
						from = gt.companyLat + ',' + gt.companyLng;
						to = gt.dataInfo.outlets_latitude + ',' + gt.dataInfo.outlets_longitude;

						var coverItem = {
							id: 2,
							latitude: gt.companyLat,
							longitude: gt.companyLng,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gt.companyHeadImg,
							text: '发货网点：' + gt.dataInfo.pickup_city,
						};
						gt.covers.push(coverItem);

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.outlets_latitude,
							longitude: gt.dataInfo.outlets_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/compnayBIcon.png'),
							text: '收货网点：' + gt.dataInfo.receive_city,
						};
						gt.covers.push(coverItem);
					}
					if (gt.dataInfo.status == 11 && gt.dataInfo.peisong_type == 1) {
						// 待派送
						from = gt.dataInfo.outlets_latitude + ',' + gt.dataInfo.outlets_longitude;
						to = gt.dataInfo.receive_latitude + ',' + gt.dataInfo.receive_longitude;

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.outlets_latitude,
							longitude: gt.dataInfo.outlets_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/compnayBIcon.png'),
							text: '等待派送，距X公里',
						};
						gt.covers.push(coverItem);

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.receive_latitude,
							longitude: gt.dataInfo.receive_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/receiveIcon.png'),
							text: '',
						};
						gt.covers.push(coverItem);
					}
					if (gt.dataInfo.status == 11 && gt.dataInfo.peisong_type == 2) {
						// 待自提
						from = '0,0';
						to = '0,0';

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.outlets_latitude,
							longitude: gt.dataInfo.outlets_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/compnayBIcon.png'),
							text: '待收货人取货',
						};
						gt.covers.push(coverItem);
					}
					if (gt.dataInfo.status == 13) {
						from = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
						to = gt.dataInfo.receive_latitude + ',' + gt.dataInfo.receive_longitude;

						var coverItem = {
							id: 1,
							latitude: gt.dataInfo.pickup_latitude,
							longitude: gt.dataInfo.pickup_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gt.cargoInfo.headerpic,
							text: '',
						};
						gt.covers.push(coverItem);

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.receive_latitude,
							longitude: gt.dataInfo.receive_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/receiveIcon.png'),
							text: '已签收',
						};
						gt.covers.push(coverItem);
					}
					if (gt.dataInfo.status == 15) {
						from = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
						to = gt.dataInfo.receive_latitude + ',' + gt.dataInfo.receive_longitude;

						var coverItem = {
							id: 1,
							latitude: gt.dataInfo.pickup_latitude,
							longitude: gt.dataInfo.pickup_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gt.cargoInfo.headerpic,
							text: '',
						};
						gt.covers.push(coverItem);

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.receive_latitude,
							longitude: gt.dataInfo.receive_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/receiveIcon.png'),
							text: '已签收',
						};
						gt.covers.push(coverItem);
					}
					if (gt.dataInfo.status == 20) {
						from = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
						to = gt.dataInfo.receive_latitude + ',' + gt.dataInfo.receive_longitude;

						var coverItem = {
							id: 1,
							latitude: gt.dataInfo.pickup_latitude,
							longitude: gt.dataInfo.pickup_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gt.cargoInfo.headerpic,
							text: '',
						};
						gt.covers.push(coverItem);

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.receive_latitude,
							longitude: gt.dataInfo.receive_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/receiveIcon.png'),
							text: '已签收',
						};
						gt.covers.push(coverItem);
					}

				}

				if (gt.intoFrom == 'B') {
					if (gt.dataInfo.status == 9) {
						// 运输中
						from = gt.companyLat + ',' + gt.companyLng;
						to = gt.dataInfo.outlets_latitude + ',' + gt.dataInfo.outlets_longitude;

						var coverItem = {
							id: 2,
							latitude: gt.companyLat,
							longitude: gt.companyLng,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gt.companyHeadImg,
							text: '发货网点：' + gt.dataInfo.pickup_city,
						};
						gt.covers.push(coverItem);

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.outlets_latitude,
							longitude: gt.dataInfo.outlets_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/compnayBIcon.png'),
							text: '收货网点：' + gt.dataInfo.receive_city,
						};
						gt.covers.push(coverItem);
					}
					if (gt.dataInfo.status == 11 && gt.dataInfo.peisong_type == 1) {
						// 待派送
						from = gt.dataInfo.outlets_latitude + ',' + gt.dataInfo.outlets_longitude;
						to = gt.dataInfo.receive_latitude + ',' + gt.dataInfo.receive_longitude;

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.outlets_latitude,
							longitude: gt.dataInfo.outlets_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/compnayBIcon.png'),
							text: '等待派送，距X公里',
						};
						gt.covers.push(coverItem);

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.receive_latitude,
							longitude: gt.dataInfo.receive_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/receiveIcon.png'),
							text: '',
						};
						gt.covers.push(coverItem);
					}
					if (gt.dataInfo.status == 11 && gt.dataInfo.peisong_type == 2) {
						// 待自提
						from = '0,0';
						to = '0,0';

						var coverItem = {
							id: 3,
							latitude: gt.dataInfo.outlets_latitude,
							longitude: gt.dataInfo.outlets_longitude,
							iconPath: gtCommon.getOssImg('order/mapCoverIcon.png'),
							width: 30,
							height: 16,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0,
								anchorY: 0,
							},
							img: gtCommon.getOssImg('order/compnayBIcon.png'),
							text: '待收货人取货',
						};
						gt.covers.push(coverItem);
					}

				}

				// var from = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
				// var to = 


				console.log('from:', from);
				console.log('to:', to);
				if (from != '0,0') {
					// #ifdef MP-WEIXIN
					tMap.direction({
						mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
						//from参数不填默认当前地址
						from: from, //起点经纬度
						// waypoints: '39.951004,106.571980', //起点经纬度
						to: to, //终点经纬度
						success: function(res) {
							// console.log(1091, res);
							var ret = res;
							var coors = ret.result.routes[0].polyline,
								pl = [];
							//坐标解压（返回的点串坐标，通过前向差分进行压缩）
							var kr = 1000000;
							for (var i = 2; i < coors.length; i++) {
								coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
							}
							//将解压后的坐标放入点串数组pl中
							// console.log(coors);


							for (var i = 0; i < coors.length; i += 2) {
								pl.push({
									latitude: coors[i],
									longitude: coors[i + 1],
								})
							}
							// console.log(pl)

							//设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
							// console.log(pl.length);

							// var index = Math.round(pl.length / 2);
							// console.log(index);

							gt.latitude = pl[0].latitude;
							gt.longitude = pl[0].longitude;
							gt.polyline.push({
								points: pl,
								color: '#30A265', // 线的填充色
								width: 6, // 折现宽度
								dottedLine: false, // 是否是 虚线
								arrowLine: true, // 沿线路方向显示箭头
							})

							var MapContext = wx.createMapContext('myMap');
							console.log(MapContext);
							MapContext.includePoints({
								points: pl,
								// 缩放视野展示所有经纬度 [上,右,下,左]  
								padding: [40, 40, gt.screenHeight * 0.4, 40],
								success(rs) {
									console.log(rs);
								}
							});
							// gt.includePoints = pl;

							// gt.setIncludePoints();

						},
						fail: function(error) {
							console.error(error);
						},
						complete: function(res) {
							// console.log(res);
						}
					});
					// #endif
					// #ifdef APP-PLUS
					var fromArr = from.split(',');
					from = fromArr.splice(-1).concat(fromArr).join(',');
					console.log(from);

					var toArr = to.split(',');
					to = toArr.splice(-1).concat(toArr).join(',');
					console.log(to);
					myAmapFun.getDrivingRoute({
						origin: from,
						destination: to,
						success: function(data) {
							console.log('route:', data);
							var points = [];
							if (data.paths && data.paths[0] && data.paths[0].steps) {
								var steps = data.paths[0].steps;
								for (var i = 0; i < steps.length; i++) {
									var poLen = steps[i].polyline.split(';');
									for (var j = 0; j < poLen.length; j++) {
										points.push({
											longitude: parseFloat(poLen[j].split(',')[0]),
											latitude: parseFloat(poLen[j].split(',')[1])
										})
									}
								}
							}

							console.log(points);
							gt.latitude = points[0].latitude;
							gt.longitude = points[0].longitude;
							gt.polyline.push({
								points: points,
								color: '#30A265', // 线的填充色
								width: 6, // 折现宽度
								dottedLine: false, // 是否是 虚线
								arrowLine: true, // 沿线路方向显示箭头
							})


							// var MapContext = wx.createMapContext('myMap');
							// console.log(MapContext);
							// MapContext.includePoints({
							// 	points: points,
							// 	// 缩放视野展示所有经纬度 [上,右,下,左]  
							// 	padding: [40, 40, gt.screenHeight * 0.4, 40],
							// 	complete(res){
							// 		console.log(1389,res);
							// 	}
							// });

							gt.includePoints = points;
							gt.setIncludePoints();

						},
						fail: function(data) {
							console.log('fail:', data);
						},
						complete: function(data) {
							console.log('complete:', data);
						},
					})
					// #endif
				} else {
					gt.latitude = gt.covers[0].latitude;
					gt.longitude = gt.covers[0].longitude;
				}
			},

			setIncludePoints() {
				let gt = this;
				let MapContext = wx.createMapContext('myMap');
				let points = gt.includePoints;
				MapContext.includePoints({
					points: points,
					padding: [60, 40, gt.screenHeight * 0.4, 40], //被你发现了,可以设置上右下左的间距(px).不其实只能用第一个值100.
					success: function(e) {
						console.log(e)
					},
					fail: function(e) {
						console.log(e)
					}
				})
			},


			getDataInfo() {
				let gt = this;
				var url = "/logistics/order/get_order_detail";
				var data = {
					deliver_sn: gt.orderSn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.cargoInfo = res.cargo_info;
					if (res.order_info.pack_imgs) {
						res.order_info.pack_imgs = res.order_info.pack_imgs.split('||');
					}
					gt.dataInfo = res.order_info;
					gt.sendInfo = res.waybill_info;

					var payBillList = [];
					var unPayBillList = [];
					var payTotalMoney = 0;
					var unPayTotalMoney = 0;
					for (var i = 0; i < res.fee_detail.length; i++) {
						if (res.fee_detail[i].status == 2) {
							if (res.fee_detail[i].fee_pic) {
								res.fee_detail[i].picArr = res.fee_detail[i].fee_pic.split('||');
							}
							payBillList.push(res.fee_detail[i]);
							payTotalMoney = ((payTotalMoney * 100 + res.fee_detail[i].money * 100) / 100)
								.toFixed(
									2);
						} else {
							if (res.fee_detail[i].fee_pic) {
								res.fee_detail[i].picArr = res.fee_detail[i].fee_pic.split('||');
							}
							unPayBillList.push(res.fee_detail[i]);
							unPayTotalMoney = ((unPayTotalMoney * 100 + res.fee_detail[i].money * 100) /
									100)
								.toFixed(2);
						}
					}
					payBillList.sort((x, y) => {
						return y.create_time - x.create_time;
					});
					unPayBillList.sort((x, y) => {
						return y.create_time - x.create_time;
					});
					gt.payBillList = payBillList;
					gt.unPayBillList = unPayBillList;
					gt.unPayTotalMoney = unPayTotalMoney;
					gt.payTotalMoney = payTotalMoney;

					// console.log(res.image_list.img_15);
					// return false;
					if (res.image_list.img_15) {
						gt.signImgList = res.image_list.img_15;
					}

					if (res.image_list.img_16) {
						gt.signImgList = gt.signImgList.concat(res.image_list.img_16);
					}

					if (res.image_list.img_13) {
						gt.receiptList = res.image_list.img_13;
					}

					// gt.signImgList.contact(gt.image_list.img_15);\
					// if(gt.image_list.img_15[0]){
					// 	gt.signImgList = 
					// }
					// gt.signImgList = gt.image_list.img_15.contact(gt.image_list.img_16);

					gt.getTrajectory();
					gt.writeLine();

				});
			},

			goBillDetail() {
				let gt = this;
				uni.navigateTo({
					url: './billDetail?orderSn=' + gt.orderSn,
				});
				return false;
			},
			getTrajectory() {
				let gt = this;

				var url = "/logistics/order/get_order_logistics";
				var data = {
					deliver_sn: gt.orderSn,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.trajectoryList = res.order_logistics_list;
				});
			},



			movableViewChange(res) {
				// console.log(res);
				let gt = this;
				// #ifdef APP-PLUS
				gt.moveY = 0;
				// #endif
				if (res.detail.y == 0) {
					gt.scrollY = true;
				} else {
					gt.scrollY = false;
				}

			},

			showTrajectory() {
				let gt = this;

				gt.trajectoryShow = true;
			},
			hideTrajectory() {
				let gt = this;
				gt.trajectoryShow = false;
			},

			clickBtn(action) {
				let gt = this;
				if (action == 'addMoney') {
					uni.navigateTo({
						url: '/subSansong/pages/sansong/addMoney?orderSn=' + gt.dataInfo.deliver_sn,
					});
					return false;
				}
				if (action == 'confirmCollect') {
					var url = "/logistics/order/confirm_revenue";
					var data = {
						deliver_sn: gt.dataInfo.deliver_sn,
					};
					gt.gtRequest.post(url, data).then(res => {
						gt.getDataInfo();
						gt.$refs.uToast.show({
							title: '揽收成功！',
							type: 'success',
						});
					});
				}
				if (action == 'offlineCollection') {
					var url = "/logistics/order/confirm_pay_main";
					var data = {
						deliver_sn: gt.dataInfo.deliver_sn,
					};
					gt.gtRequest.post(url, data).then(res => {
						gt.getDataInfo();
						gt.$refs.uToast.show({
							title: '收款成功！',
							type: 'success',
						});
					});
				}
				if (action == 'confirmStart') {
					uni.navigateTo({
						url: '/subSansong/pages/sansong/loadSend?orderSn=' + gt.dataInfo.deliver_sn + '&line_id=' + gt.dataInfo.line_id,
					});
					return false;
				}
				if (action == 'confirmArrive') {
					var url = "/logistics/order/confirm_arrival";
					var data = {
						deliver_sn: gt.dataInfo.deliver_sn,
					};
					gt.gtRequest.post(url, data).then(res => {
						gt.getDataInfo();
						gt.$refs.uToast.show({
							title: '到达成功！',
							type: 'success',
						});
					});
				}
				if (action == 'confirmSign') {
					uni.navigateTo({
						url: '/subSansong/pages/sansong/sign?orderSn=' + gt.dataInfo.deliver_sn,
					});
					return false;
				}
				if (action == 'uploadReceipt') {
					uni.navigateTo({
						url: '/subSansong/pages/sansong/receipt?orderSn=' + gt.dataInfo.deliver_sn,
					});
					return false;
				}
				if (action == 'goSendInfo') {
					uni.navigateTo({
						url: '/subSansong/pages/sansong/sendInfo?orderSn=' + gt.sendInfo.waybill_sn,
					});
					return false;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			.longc_copy {
				padding: 10rpx 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;
			}
			.con_map {
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
						// border:1rpx solid red;

						.con_img {
							width: 80rpx;
							height: 80rpx;
							border-radius: 16rpx;
							// margin-right: 16rpx;
							margin: 10rpx;
							overflow: hidden;
							// padding-right: 20rpx;
							// margin-right: -20rpx;

						}

						.con_text {
							// border-radius: 16rpx;
							font-size: 32rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 100rpx;
							padding-right: 20rpx;

							// padding-left: 20rpx;
							// margin-left: -20rpx;
						}
					}
				}
			}

			.con_movable {
				// display: none;
				z-index: 9999;
				// border: 1rpx solid red;

				// #ifdef MP-WEIXIN
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

						.con_orderInfo {
				// #endif
							scroll-view {
								.con_label_btn {
									width: 718rpx;
									background: #FFFFFF;
									border-radius: 16rpx;
									margin-left: 16rpx;
									margin-top: 20rpx;

									display: flex;
									justify-content: space-between;
									padding: 32rpx 24rpx;

									.con_label {
										width: 500rpx;
										font-size: 40rpx;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 500;
										color: #000000;
										line-height: 56rpx;
									}

									.con_btn {
										display: flex;

										.con_text {
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #000000;
											line-height: 40rpx;
											margin-top: 28rpx;
										}

										.con_icon {
											margin-top: 30rpx;
											margin-left: 16rpx;
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

											border-radius: 50%;
											overflow: hidden;
										}

										.con_nickNameMobile {
											.con_nickName {
												font-size: 32rpx;
												font-family: PingFangSC-Medium, PingFang SC;
												font-weight: 500;
												color: #000000;
												line-height: 44rpx;
												margin: 32rpx 0 2rpx 20rpx;
											}

											.con_mobile {
												font-size: 24rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #909399;
												line-height: 34rpx;
												margin-left: 20rpx;
											}

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
									background: #FFFFFF;
									border-radius: 16rpx;
									margin: 20rpx 16rpx;
									padding: 24rpx;

									.con_title {
										font-size: 36rpx;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 500;
										color: #000000;
										line-height: 50rpx;
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
												margin-top: 20rpx;
											}

											.con_fromToLine {
												width: 2rpx;
												height: 96rpx;
												border: 2rpx dashed #DFDFDF;
												margin: 10rpx 0 0 24rpx;
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
												margin-top: 10rpx;
											}
										}

										.con_right {
											-webkit-user-select: text;
											-khtml-user-select: text;
											-moz-user-select: text;
											-ms-user-select: text;
											user-select: text;
											.con_fromAddress {
												width: 582rpx;
												font-size: 28rpx;
												font-family: PingFangSC-Medium, PingFang SC;
												font-weight: 500;
												color: #000000;
												line-height: 40rpx;
												margin: 18rpx 0 0 40rpx;
												
											}

											.con_fromType {
												min-height: 40rpx;
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
												margin: 36rpx 0 0 40rpx;
												
											}

											.con_toType {
												min-height: 40rpx;
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
										.con_item {
											display: flex;
											justify-content: space-between;
											margin-bottom: 32rpx;

											.con_key {
												.con_text {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 40rpx;
												}
											}

											.con_val {
												.con_text_btn {
													display: flex;

													.con_text {
														font-size: 28rpx;
														font-family: PingFangSC-Regular, PingFang SC;
														font-weight: 400;
														color: #000000;
														line-height: 40rpx;
													}

													.con_copyBtn {
														font-size: 32rpx;
														font-family: PingFangSC-Regular, PingFang SC;
														font-weight: 400;
														color: #485EF4;
														line-height: 40rpx;
														margin-left: 18rpx;
													}
												}
											}
										}
									}
								}

								.con_goodsInfo {
									width: 718rpx;
									background: #FFFFFF;
									border-radius: 16rpx;
									margin: 20rpx 16rpx;
									padding: 24rpx;

									.con_title {
										font-size: 36rpx;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 500;
										color: #000000;
										line-height: 50rpx;
									}

									.con_imgs {
										display: flex;
										margin-top: -12rpx;

										.con_title {
											font-size: 28rpx;
											font-family: PingFangSC-Medium, PingFang SC;
											font-weight: 500;
											color: #000000;
											line-height: 160rpx;
											margin: 20rpx 0 0 0;
										}

										.con_list {
											display: flex;
											margin-left: 10rpx;

											.con_item {
												width: 160rpx;
												height: 160rpx;
												overflow: hidden;
												border-radius: 16rpx;
												margin: 0 10rpx;
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
										.con_item {
											display: flex;
											justify-content: space-between;
											margin-bottom: 32rpx;

											.con_key {
												.con_text {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 40rpx;
												}
											}

											.con_val {
												width: 500rpx;
												text-align: right;

												.con_text {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #000000;
													line-height: 40rpx;
												}
											}
										}
									}
								}

								.con_billInfo {
									width: 718rpx;
									background: #FFFFFF;
									border-radius: 16rpx;
									margin: 20rpx 16rpx;
									padding: 24rpx;

									.con_title_detailBtn {
										display: flex;
										justify-content: space-between;

										.con_title {
											font-size: 36rpx;
											font-family: PingFangSC-Medium, PingFang SC;
											font-weight: 500;
											color: #000000;
											line-height: 50rpx;
										}

										.con_detailBtn {
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: $gtProjectColor;
											line-height: 40rpx;
										}
									}

									.con_billList {
										.con_billItem {
											.con_unPayList {
												.con_title_total {
													display: flex;
													justify-content: space-between;

													.con_title {
														font-size: 28rpx;
														font-family: PingFangSC-Medium, PingFang SC;
														font-weight: 500;
														color: #000000;
														line-height: 40rpx;
													}

													.con_total {
														font-size: 28rpx;
														font-family: PingFangSC-Medium, PingFang SC;
														font-weight: 500;
														color: #FF6067;
														line-height: 40rpx;
													}
												}

												.con_list {
													margin-top: 24rpx;

													.con_item {
														.con_type_num {
															display: flex;
															justify-content: space-between;

															.con_type {
																font-size: 28rpx;
																font-family: PingFangSC-Regular, PingFang SC;
																font-weight: 400;
																color: #909399;
																line-height: 40rpx;
															}

															.con_num {
																font-size: 28rpx;
																font-family: PingFangSC-Regular, PingFang SC;
																font-weight: 400;
																color: #909399;
																line-height: 40rpx;
															}
														}

														.con_payMethod {
															display: flex;
															justify-content: space-between;
															margin-top: 24rpx;

															.con_text {
																font-size: 28rpx;
																font-family: PingFangSC-Regular, PingFang SC;
																font-weight: 400;
																color: #909399;
																line-height: 40rpx;
															}
														}

														.con_voucher {
															display: flex;
															justify-content: space-between;
															margin-top: 24rpx;

															.con_text {
																font-size: 28rpx;
																font-family: PingFangSC-Regular, PingFang SC;
																font-weight: 400;
																color: #909399;
																line-height: 40rpx;
															}

															.con_list {
																display: flex;

																.con_img {
																	width: 160rpx;
																	height: 160rpx;
																	border-radius: 16rpx;
																	overflow: hidden;
																	margin: 10rpx
																}
															}
														}
													}
												}
											}
										}
									}

									// .con_pay_price {
									// 	display: flex;
									// 	justify-content: space-between;

									// 	.con_pay {
									// 		font-size: 28rpx;
									// 		font-family: PingFangSC-Medium, PingFang SC;
									// 		font-weight: 500;
									// 		color: #000000;
									// 		line-height: 40rpx;
									// 		margin-left: 24rpx;
									// 	}

									// 	.con_price {
									// 		font-size: 28rpx;
									// 		font-family: PingFangSC-Medium, PingFang SC;
									// 		font-weight: 500;
									// 		color: #000000;
									// 		line-height: 40rpx;
									// 		margin-right: 26rpx;
									// 	}

									// }

									// .con_payMethod {
									// 	font-size: 28rpx;
									// 	font-family: PingFangSC-Regular, PingFang SC;
									// 	font-weight: 400;
									// 	color: #909399;
									// 	line-height: 40rpx;
									// 	margin: 24rpx 0 0 32rpx;
									// }

									// .con_wechatPay {
									// 	display: flex;
									// 	justify-content: space-between;

									// 	.con_text {
									// 		font-size: 28rpx;
									// 		font-family: PingFangSC-Regular, PingFang SC;
									// 		font-weight: 400;
									// 		color: #909399;
									// 		line-height: 40rpx;
									// 		margin: 24rpx 0 0 24rpx;
									// 	}

									// 	.con_payPrice {
									// 		font-size: 28rpx;
									// 		font-family: PingFangSC-Regular, PingFang SC;
									// 		font-weight: 400;
									// 		color: #909399;
									// 		line-height: 40rpx;
									// 		margin: 24rpx 26rpx 0 0;
									// 	}
									// }

								}

								.con_sendInfo {
									width: 718rpx;
									background: #FFFFFF;
									border-radius: 16rpx;
									margin: 20rpx 16rpx;
									padding: 24rpx;

									.con_title {
										font-size: 36rpx;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 500;
										color: #000000;
										line-height: 50rpx;
									}

									.con_keyVal {
										.con_item {
											display: flex;
											justify-content: space-between;
											margin-bottom: 32rpx;

											.con_key {
												.con_text {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #909399;
													line-height: 40rpx;
												}
											}

											.con_val {
												.con_text_btn {
													display: flex;

													.con_text {
														font-size: 28rpx;
														font-family: PingFangSC-Regular, PingFang SC;
														font-weight: 400;
														color: #000000;
														line-height: 40rpx;
													}

													.con_copyBtn {
														font-size: 32rpx;
														font-family: PingFangSC-Regular, PingFang SC;
														font-weight: 400;
														color: #485EF4;
														line-height: 40rpx;
														margin-left: 18rpx;
													}
												}

												.con_text {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #000000;
													line-height: 40rpx;
												}
											}
										}
									}
								}

								.con_signInfo {
									width: 718rpx;
									background: #FFFFFF;
									border-radius: 16rpx;
									margin: 20rpx 16rpx;
									padding: 24rpx;

									.con_title {
										font-size: 36rpx;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 500;
										color: #000000;
										line-height: 50rpx;
									}

									.con_list {
										display: flex;

										.con_item {
											width: 160rpx;
											height: 160rpx;
											overflow: hidden;
											border-radius: 16rpx;
											margin: 0 14rpx;
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
									padding-bottom: 40rpx;
								}

							}
				// #ifdef MP-WEIXIN
						}
					}

				}
				// #endif
			}
			.scroll {
				width:750rpx;
				height: calc(100vh - 112rpx);
				background: #f3f4f5;
			}
			.con_btns {
				position: sticky;
				width: 750rpx;
				min-height: 112rpx;
				background: #FFFFFF;
				.con_list {
					display: flex;
					justify-content: flex-end;
					width: 750rpx;
					height: 112rpx;
					background: #FFFFFF;
					padding-right: 20rpx;
				}
			
				.con_item {
					height: 72rpx;
					border-radius: 10rpx;
					border: 2rpx solid #000000;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 72rpx;
					margin: 20rpx 8rpx;
					padding: 0 10rpx;
					min-width: 120rpx;
					text-align: center;
				}
			}
			.con_popup {
				.con_close {
					position: absolute;
					right: 40rpx;
					margin-top: 40rpx;
				}

				.con_trajectory {
					.con_logo_text {
						display: flex;

						.con_logo {
							width: 96rpx;
							height: 96rpx;
							background: linear-gradient(135deg, #42A8FF 0%, #485EF4 70%);
							margin: 40rpx 0 0 24rpx;
							border-radius: 50%;

							.con_img {
								width: 64rpx;
								height: 60rpx;
								margin: 18rpx 16rpx;
							}
						}

						.con_text {
							margin: 40rpx 0 0 24rpx;

							.con_title {
								font-size: 36rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #000000;
								line-height: 50rpx;
							}

							.con_snBtn {
								display: flex;
								margin-top: 6rpx;

								.con_sn {
									font-size: 28rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #000000;
									line-height: 40rpx;
								}

								.con_btn {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: $gtProjectColor;
									line-height: 40rpx;
									margin-left: 32rpx;
								}
							}
						}
					}

					.con_list {
						margin-top: 30rpx;

						.trajectoryItem {
							margin-left: 30rpx;

							.con_icon_title {
								display: flex;

								.con_icon {
									width: 24rpx;
									height: 24rpx;
									background: #909399;
									border-radius: 50%;
									margin: 10rpx 0 0 24rpx;
								}

								.con_text {
									font-size: 32rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #000000;
									line-height: 44rpx;
									margin-left: 24rpx;
								}
							}

							.con_line_time {
								display: flex;

								.con_line {
									margin-left: 16rpx;
								}

								.con_time {
									margin-top: 16rpx;
									margin-left: 32rpx;
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #909399;
									line-height: 40rpx;
								}
							}
						}

						.trajectoryItem:first-child {
							.con_icon {
								background: $gtProjectColor;
							}
						}
					}
				}
			}




		}
	}
</style>