<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_form">
			<view class="con_itemGroup con_driverInfo">
				<view class="con_item">
					<view class="con_key">
						<view class="con_required" style="line-height: 88rpx;">
							<text>*</text>
						</view>
						<view class="con_text" style="line-height: 88rpx;">
							<text>车牌号</text>
						</view>
					</view>
					<view class="con_val" style="width: 500rpx;">

						<car-number-input @numberInputResult="plateConfirm" :defaultStr="plateNum"></car-number-input>
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="670" margin="32rpx 20rpx" />
				</view>
				<view class="con_item">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>司机姓名</text>
						</view>
					</view>
					<view class="con_val">
						<u-input v-model="name" placeholder="请输入司机姓名" height="40" input-align="right" />
					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="670" margin="32rpx 20rpx" />
				</view>
				<view class="con_item">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>司机电话</text>
						</view>
					</view>
					<view class="con_val">
						<u-input v-model="mobile" type="number" placeholder="请输入司机电话号码" height="40" input-align="right"
							readonly />
					</view>
				</view>
			</view>
			<view class="con_itemGroup con_aboutInfo">
				<view class="con_item">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>选择专线</text>
						</view>
					</view>
					<view class="con_val">
						<u-input v-model="lineStr" type="select" placeholder="请选择专线" height="40" input-align="right"
							@click="showLine" />

					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="670" margin="32rpx 20rpx" />
				</view>
				<view class="con_item">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>到站网点</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_stationInfo" @click="showStation" v-if="stationInfo.outlets_id">
							<view class="con_text_icon">
								<view class="con_text">
									<view class="con_item">
										<text>到站公司：{{stationInfo.outlets_name}}</text>
									</view>
									<view class="con_item">
										<text>线路经理：{{stationInfo.outlets_contact}}</text>
									</view>
									<view class="con_item">
										<text>到站电话：{{stationInfo.outlets_mobile}}</text>
									</view>
									<view class="con_item u-line-1">
										<text>发站地址：{{stationInfo.outlets_address}}</text>
									</view>
								</view>
								<view class="con_icon">
									<u-icon name="arrow-down-fill" color="#c0c4cc" size="28"></u-icon>
								</view>
							</view>
						</view>
						<u-input v-model="stationInfo.outlets_name" type="select" placeholder="请选择到站网点" height="40"
							input-align="right" @click="showStation" v-else />


					</view>
				</view>
				<view class="con_line">
					<u-line color="#F2F2F2" length="670" margin="32rpx 20rpx" />
				</view>
				<view class="con_item">
					<view class="con_key">
						<view class="con_required">
							<text>*</text>
						</view>
						<view class="con_text">
							<text>选择订单</text>
						</view>
					</view>
					<view class="con_val">
						<u-input v-model="orderStr" type="select" placeholder="请选择订单" height="40" input-align="right"
							@click="showOrder" />

					</view>
				</view>
			</view>
			<view class="con_itemGroup con_imgInfo">
				<view class="con_title">
					<text>装车照片</text>
				</view>
				<view class="con_upload">
					<u-upload ref="uUpload" :auto-upload="false" upload-text="上传照片" max-count="3" @on-choose="chooseImg"
						@on-remove="removeImg"></u-upload>
				</view>
			</view>

			<view class="con_itemGroup con_stationInfo">
				<view class="con_title">
					<text>发站信息</text>
				</view>
				<view class="con_info">
					<view class="con_text">
						<text>发站公司：{{companyInfo.company_name}}</text>
					</view>
					<view class="con_text">
						<text v-if="lineIndex == 9999">专线经理：-</text>
						<text v-else>专线经理：{{lineList[lineIndex].line_contact}}</text>
					</view>
					<view class="con_text">
						<text v-if="lineIndex == 9999">经理手机：-</text>
						<text v-else>经理手机：{{lineList[lineIndex].line_mobile}}</text>
					</view>
					<view class="con_text">
						<text>发站地址：{{companyInfo.address}}</text>
					</view>
				</view>

			</view>




		</view>

		<view class="con_confirmBtn" @click="confirmSend">
			<text>确认发车</text>
		</view>

		<view class="con_popup">
			<view class="con_line">
				<u-popup v-model="lineShow" mode="bottom" height="800">

					<view class="con_title">
						<text>选择专线</text>
					</view>
					<view class="con_list">
						<u-radio-group v-model="lineIndex" @change="lineChange">
							<scroll-view scroll-y="true" style="height: 700rpx;">
								<u-radio v-for="(item, index) in lineList" :key="index" :name="index">
									<!-- 不知道为啥ios要过滤，安卓没有 v-if="item.order_count" -->
									<view class="con_item">
										<view class="con_name">
											<text>{{item.start_city}}</text>
											<text> --- </text>
											<text>{{item.end_city}}</text>

											<text>(共{{item.order_count}}单)</text>
										</view>

									</view>
								</u-radio>
							</scroll-view>

						</u-radio-group>

					</view>
				</u-popup>
			</view>
			<view class="con_station">
				<u-popup v-model="stationShow" mode="bottom" height="800">

					<view class="con_title">
						<text>选择到站地址</text>
					</view>
					<view class="con_list">
						<u-radio-group v-model="stationIndex" @change="stationChange">
							<scroll-view scroll-y="true" style="height: 700rpx;">
								<u-radio v-for="(item, index) in stationList" :key="index" :name="index">
									<view class="con_item">
										<view class="con_name">
											<text>{{item.outlets_name}}</text>
										</view>
										<view class="con_address">
											<text>{{item.outlets_address}}</text>
										</view>
										<view class="con_nameMobile">
											<text>{{item.outlets_contact}}</text>
											<text>{{item.outlets_mobile}}</text>
										</view>
									</view>
								</u-radio>
							</scroll-view>

						</u-radio-group>

					</view>
				</u-popup>
			</view>
			<view class="con_order">

				<u-popup v-model="orderShow" mode="bottom" height="1000" border-radius="14">
					<view class="con_screen">
						<view class="con_time">

						</view>
						<view class="con_status">

						</view>
					</view>
					<view class="con_list">
						<scroll-view class="con_scrollView" scroll-y="true">
							<view class="con_item" v-for="(item,index) in orderList" :key="index"
								@click="selectOrder(item)">
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
											<view class="con_copyIcon" @click.stop="gtCommon.copyStr(item.deliver_sn)">
												<!-- <text class="custom-icon custom-icon-copy"></text> -->
												<image :src="gtCommon.getOssImg('sansong/copy.png')" mode="widthFix"></image>
											</view>
										</view>
									</view>
									<view class="con_status orderStatus1">
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
										<text v-else>下单时间：{{$u.timeFormat(item.create_time, 'mm月dd日 hh:MM')}}</text>
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

								<view class="con_select">
									<view class="con_icon" v-if="item.selected">
										<image :src="gtCommon.getOssImg('sansong/selected.png')" mode="widthFix">
										</image>
									</view>
									<view class="con_icon" v-else>
										<image :src="gtCommon.getOssImg('sansong/unSelected.png')" mode="widthFix">
										</image>
									</view>
									<view class="con_text">
										<text>选择此订单</text>
									</view>
								</view>




							</view>
						</scroll-view>
						</u-checkbox-group>
					</view>
					<view class="con_total_btn">
						<view class="con_icon" @click="selectAll" v-if="allSelect">
							<image :src="gtCommon.getOssImg('sansong/selected.png')" mode="widthFix">
							</image>
						</view>
						<view class="con_icon" @click="selectAll" v-else>
							<image :src="gtCommon.getOssImg('sansong/unSelected.png')" mode="widthFix">
							</image>
						</view>
						<view class="con_text" @click="selectAll">
							<text>全选</text>
						</view>
						<view class="con_text">
							<text>已选{{orderNum}}单</text>
						</view>
						<view class="con_btn" @click="orderConfirm">
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
				plateNum: '',
				name: '',
				mobile: '',

				lineShow: false,
				lineIndex: 9999,
				lineStr: '',
				lineList: [],

				stationShow: false,
				stationIndex: 9999,
				stationInfo: {},
				stationList: [],


				orderShow: false,
				orderStr: '',
				orderList: [],
				orderNum: 0,
				allSelect: false,

				imgList: [],

				companyInfo: {},
				flag: false
			}
		},
		async onLoad(option) {
			let gt = this;
			var url = "/logistics/company/get_company_info";
			gt.gtRequest.post(url).then(r=>{
				uni.setStorageSync('companyInfo', r.company_info);
			});
			var conmpanyInfo = uni.getStorageSync('companyInfo');
			gt.companyInfo = conmpanyInfo;
			await gt.showLine(true)
			if(option.line_id) {
				gt.flag = true
				let choseIndex = gt.lineList.findIndex(item=> item.line_id == option.line_id)
				if(choseIndex !== -1) await gt.lineChange(choseIndex)
			}	
			if(option.orderSn) {
				let choseItem = gt.orderList.find(item=> item.deliver_sn == option.orderSn)
				if (choseItem) {
					choseItem.selected = true
					gt.orderStr = '已选1单'
					gt.orderNum = 1
				}
			}
		},
		methods: {
			plateConfirm(res) {
				console.log(res);
				let gt = this;
				gt.plateNum = res;
			},


			async showLine(type) {
				let gt = this;
				if(gt.flag) return
				var url = "/logistics/waybill/get_special_line_list";
				var data = {
					page: 1,
					limit: 9999,
				};
				await gt.gtRequest.post(url, data).then(res => {
					gt.lineList = res.list;
					if(!type) gt.lineShow = true;
				});
			},

			async lineChange(index) {
				let gt = this;
				gt.lineIndex = index;
				var item = gt.lineList[index];
				gt.lineStr = item.start_city + ' --- ' + item.end_city + ' (共' + item.order_count + '单)';

				var url = "/logistics/specialline/get_special_line_info";
				var data = {
					line_id: item.line_id,
				};
				gt.gtRequest.post(url, data).then(res => {
					gt.stationList = res.info.outlets_list;
					gt.lineShow = false;
				});

				var url = "/logistics/specialline/get_special_line_order_list";
				var data = {
					line_id: item.line_id,
					// start_time:0,
					// end_time:9999999999,
					page: 1,
					limit: 9999,
				};
				await gt.gtRequest.post(url, data).then(res => {
					for (var i = 0; i < res.list.length; i++) {
						res.list[i].selected = false;
					}
					gt.orderList = res.list;
					// gt.orderList = gt.orderList.concat(res.list);
					// gt.orderList = gt.orderList.concat(res.list);
					// gt.orderList = gt.orderList.concat(res.list);
					// gt.orderList = gt.orderList.concat(res.list);
					// gt.orderList = gt.orderList.concat(res.list);
					// gt.orderList = gt.orderList.concat(res.list);
				});
			},
			showStation() {
				let gt = this;

				if (gt.lineIndex == 9999) {
					gt.$refs.uToast.show({
						title: '请先选择专线',
						type: 'error',
					});
					return false;
				}

				gt.stationShow = true;
			},
			stationChange(index) {
				let gt = this;
				gt.stationIndex = index;
				var item = gt.stationList[index];
				gt.stationInfo = item;
				gt.stationShow = false;
			},
			showOrder() {
				let gt = this;
				if (gt.lineIndex == 9999) {
					gt.$refs.uToast.show({
						title: '请先选择专线',
						type: 'error',
					});
					return false;
				}
				uni.setNavigationBarTitle({
					title: gt.lineList[gt.lineIndex].start_city + ' --- ' + gt.lineList[gt.lineIndex].end_city,
				});

				gt.orderShow = true;
			},
			selectOrder(item) {
				let gt = this;
				item.selected = !item.selected;
				if (item.selected) {
					gt.orderNum++;
				} else {
					gt.orderNum--;
				}
				if (gt.orderNum == gt.orderList.length) {
					gt.allSelect = true;
				} else {
					gt.allSelect = false;
				}
			},

			selectAll() {
				let gt = this;
				gt.allSelect = !gt.allSelect;
				if (gt.allSelect) {
					for (var i = 0; i < gt.orderList.length; i++) {
						gt.orderList[i].selected = true;
					}
					gt.orderNum = gt.orderList.length;
				} else {
					for (var i = 0; i < gt.orderList.length; i++) {
						gt.orderList[i].selected = false;
					}
					gt.orderNum = 0;
				}
			},
			orderConfirm() {
				let gt = this;
				// if(gt.orderNum == 0){
				// 	return false;
				// }
				if (gt.orderNum) {
					gt.orderStr = '已选' + gt.orderNum + '单';
				} else {
					gt.orderStr = '';
				}
				uni.setNavigationBarTitle({
					title: '装车发货',
				});

				gt.orderShow = false;
			},


			chooseImg(item) {
				console.log(item);

				let gt = this;
				var file = item.fileInfo;

				gt.gtRequest.upload(file).then(res => {
					console.log(res);
					gt.imgList.push(res.src);
				});
			},
			removeImg(index) {
				console.log(index);
				let gt = this;
				gt.imgList.splice(index, 1);
			},

			confirmSend() {
				let gt = this;

				if (!gt.$u.test.carNo(gt.plateNum)) {
					gt.$refs.uToast.show({
						title: '车牌号不正确',
						type: 'error',
					});
					return false;
				}
				
				if (gt.name == '') {
					gt.$refs.uToast.show({
						title: '司机姓名不能为空',
						type: 'error',
					});
					return false;
				}
				if (!gt.$u.test.mobile(gt.mobile)) {
					gt.$refs.uToast.show({
						title: '司机手机号不正确',
						type: 'error',
					});
					return false;
				}
				if (gt.lineIndex == 9999) {
					gt.$refs.uToast.show({
						title: '请选择专线',
						type: 'error',
					});
					return false;
				}
				if (gt.stationIndex == 9999) {
					gt.$refs.uToast.show({
						title: '请选择到站网点',
						type: 'error',
					});
					return false;
				}
				if (gt.orderNum == 0) {
					gt.$refs.uToast.show({
						title: '请选择订单',
						type: 'error',
					});
					return false;
				}
				

				var selectOrderSnArr = [];
				for (var i = 0; i < gt.orderList.length; i++) {
					if (gt.orderList[i].selected) {
						selectOrderSnArr.push(gt.orderList[i].deliver_sn);
					}
				}


				var url = "/logistics/order/confirm_departure";
				var data = {
					deliver_sn: selectOrderSnArr.join(','),
					images: gt.imgList.join('||'),
					license_plate: gt.plateNum,
					driver_name: gt.name,
					driver_mobile: gt.mobile,
					line_id: gt.lineList[gt.lineIndex].line_id,
					outlets_id: gt.stationInfo.outlets_id,
				};
				// console.log('success');
				// return false;
				gt.gtRequest.post(url, data).then(res => {
					gt.$refs.uToast.show({
						title: '发出成功',
						type: 'success',
						back:true,
					});
				});



			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_form {
				.con_itemGroup {
					width: 718rpx;
					// height: 312rpx;
					background: #FFFFFF;
					border-radius: 16rpx;
					margin: 20rpx 16rpx 0 16rpx;
					padding: 1rpx;

					.con_item {
						display: flex;
						justify-content: space-between;
						margin: 32rpx 24rpx 32rpx 8rpx;

						.con_key {
							display: flex;

							.con_required {
								width: 16rpx;
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #FF6067;
								line-height: 40rpx;
							}

							.con_text {
								width: 120rpx;
							}
						}

						.con_val {
							width: 500px;
							.con_stationInfo {
								.con_text_icon {
									display: flex;

									.con_text {
										.con_item {
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #000000;
											line-height: 40rpx;
											text-align: right;
											margin: 0 0 0 10rpx;
											width: 500rpx;
										}
									}

									.con_icon {
										margin-left: 10rpx;
									}
								}
							}
						}

					}

					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						margin: 24rpx 0 0 24rpx;
					}

					.con_info {
						margin-top: 16rpx;

						.con_text {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 40rpx;
							margin: 8rpx 24rpx;
						}
					}

				}
			}

			.con_confirmBtn {
				width: 718rpx;
				height: 100rpx;
				background: $gtProjectColor;
				border-radius: 16rpx;
				// opacity: 0.5;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 100rpx;
				text-align: center;
				margin: 92rpx auto 128rpx auto;
			}


			.con_popup {
				.con_line {
					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						text-align: center;
						margin-top: 34rpx;
					}

					.con_list {
						padding: 10rpx 40rpx;

						.u-radio {
							justify-content: space-between;
							flex-direction: row-reverse;
							width: 670rpx !important;
							border-bottom: 2rpx solid #F2F2F2;

							.u-radio__icon-wrap {
								margin-right: 16rpx;
							}

							.con_item {
								width: 580rpx;

								.con_name {
									font-size: 32rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #000000;
									line-height: 44rpx;
									margin-top: 30rpx;
									margin-bottom: 30rpx;
								}
							}

						}
					}
				}

				.con_station {
					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
						text-align: center;
						margin-top: 34rpx;
					}

					.con_list {
						padding: 10rpx 40rpx;

						.u-radio {
							justify-content: space-between;
							flex-direction: row-reverse;
							width: 670rpx !important;
							border-bottom: 2rpx solid #F2F2F2;

							.u-radio__icon-wrap {
								margin-right: 16rpx;
							}

							.con_item {
								width: 580rpx;

								.con_name {
									font-size: 32rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #000000;
									line-height: 44rpx;
									margin-top: 30rpx;
								}

								.con_address {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #909399;
									line-height: 40rpx;
									margin-top: 16rpx;
								}

								.con_nameMobile {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #000000;
									line-height: 40rpx;
									margin-top: 16rpx;
									margin-bottom: 30rpx;

									text:nth-child(2) {
										margin-left: 10rpx;
									}
								}
							}

						}
					}
				}

				.con_order {

					.con_list {
						margin-bottom: 124rpx;
						background: #F3F4F5;

						.con_scrollView {
							// height: calc(100vh - 136rpx);
							height: calc(1000rpx - 144rpx);
							padding: 10rpx 0;

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
												width:24rpx;
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

								.con_select {
									display: flex;

									.con_icon {
										width: 32rpx;
										height: 32rpx;
										margin-top: 22rpx;
										margin-left: 24rpx;
									}

									.con_text {
										font-size: 28rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #000000;
										line-height: 40rpx;
										margin-top: 18rpx;
										margin-left: 8rpx;
									}
								}
							}
						}
					}

					.con_total_btn {
						display: flex;
						position: absolute;
						bottom: 0;
						height: 124rpx;

						.con_icon {
							width: 32rpx;
							margin: 46rpx 0 0 40rpx;
						}

						.con_text {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 40rpx;
							margin: 42rpx 0 0 8rpx;
						}

						.con_text:nth-child(3) {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #485EF4;
							line-height: 40rpx;
							margin: 42rpx 0 0 40rpx;
						}

						.con_btn {
							width: 400rpx;
							height: 100rpx;
							background: #485EF4;
							border-radius: 16rpx;
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 100rpx;
							text-align: center;
							margin: 12rpx 16rpx;
						}
					}

				}
			}
		}
	}
</style>