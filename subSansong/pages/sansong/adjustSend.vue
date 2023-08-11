<template>
	<view class="gt_content">
		<view class="gt_content_content">
		<view class="con_driverInfo" v-if="dataInfo.waybill_info">
			<view class="con_textBtn">
				<view class="con_text">
					<text>运单号：</text>
					<text>{{dataInfo.waybill_info.waybill_sn}}</text>
				</view>
				<view class="con_btn" @click="gtCommon.copyStr(dataInfo.waybill_info.waybill_sn)">
					<image :src="gtCommon.getOssImg('sansong/copy.png')" mode="widthFix"></image>
				</view>
			</view>
			<view class="con_textBtn">
				<view class="con_text">
					<text>发车时间：</text>
					<!-- <text>{{dataInfo.waybill_info.create_time}}</text> -->
					<text>{{gtCommon.formateTime(sendTime,'YYYY-MM-DD HH:mm')}}</text>
				</view>
			</view>
			<view class="con_textBtn">
				<view class="con_text con_text1">
					<view style="white-space: nowrap;">车牌号：</view>
					<view style="width: 500rpx;">
						<car-number-input @numberInputResult="plateConfirm" :defaultStr="plateNum"></car-number-input>
					</view>
				</view>
			</view>
			<view class="con_textBtn">
				<view class="con_text con_text1">
					<view style="white-space: nowrap;">司机：</view>
					<u-input v-model.trim="dataInfo.waybill_info.driver_name" placeholder="请输入司机姓名" />
				</view>
			</view>
			<view class="con_textBtn">
				<view class="con_text con_text1">
					<view style="white-space: nowrap;">手机：</view>
					<u-input v-model="dataInfo.waybill_info.driver_mobile" type="number" placeholder="请输入司机电话号码" />
				</view>
			</view>
		</view>

		<view class="con_lineInfo" v-if="dataInfo.waybill_info">
			<view class="con_keyVal">
				<view class="con_key">
					<view class="con_required">
						<text>*</text>
					</view>
					<view class="con_text">
						<text>选择专线</text>
					</view>
				</view>
				<view class="con_val">
					<view class="con_text">
						<text>{{dataInfo.waybill_info.line_start_city}}-{{dataInfo.waybill_info.line_end_city}}</text>
						<text style="color:#485EF4;">(共{{dataInfo.deliver_order_count}}单)</text>
					</view>
				</view>
			</view>
			<view class="con_line">
				<u-line length="670rpx" color="#F2F2F2" margin="32rpx 24rpx"></u-line>
			</view>
			<view class="con_keyVal">
				<view class="con_key">
					<view class="con_required">
						<text>*</text>
					</view>
					<view class="con_text">
						<text>到站网点</text>
					</view>
				</view>
				<view class="con_val" @click="show_outlet = true">
					<view class="con_text">
						<view class="con_textItem">
							<text>到站公司：{{dataInfo.waybill_info.outlets_name}}</text>
						</view>
						<view class="con_textItem">
							<text>线路经理：{{dataInfo.waybill_info.outlets_contact}}</text>
						</view>
						<view class="con_textItem">
							<text>到站电话：{{dataInfo.waybill_info.outlets_mobile}}</text>
						</view>
						<view class="con_textItem con_textItem1">
							<text>到站地址：{{dataInfo.waybill_info.outlets_address}}</text>
						</view>
					</view>
					<view class="con_icon">
						<u-icon name="arrow-right" size="30" color="#909399"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<view class="con_orderInfo">
			<view class="con_list">
				<view v-for="(item,index) in dataInfo.deliver_order_list" :key="index" style="display: flex; align-items: center;">
					<view class="con_item">
						<text>订单号:</text>
						<text @click="goOrderInfo(item.deliver_sn)">{{item.deliver_sn}}</text>
						<text>{{item.goods_name}}</text>
						<text>/{{item.goods_number}}件/{{item.goods_weight}}吨/{{item.goods_volume}}方</text>
						<text v-if="item.peisong_type == 1">送货上门</text>
						<text v-if="item.peisong_type == 2">自提</text>
					</view>
					<u-icon name="close-circle-fill" size="32" class="icon" @click="delOrder(item.deliver_sn)"></u-icon>
				</view>
			</view>
			<view class="btn" @click="openOrderPop">
				<u-icon name="plus" color="#485EF4" size="28"></u-icon>
				增加订单
			</view>
		</view>

		<view class="con_imgs">
			<view class="con_title">
				<text>装车照片</text>
			</view>
			<view class="con_list">
				<u-upload ref="uUpload" :auto-upload="false" upload-text="上传照片" max-count="3" @on-choose="chooseImg"
					@on-remove="removeImg" :file-list="imgList"></u-upload>
			</view>
		</view>

		<view class="con_startInfo" v-if="dataInfo.logistics_info">
			<view class="con_title">
				<text>发站信息</text>
			</view>
			<view class="con_info">
				<view class="con_item">
					<text>发站公司：{{dataInfo.logistics_info.company_name}}</text>
				</view>
				<view class="con_item">
					<text>专线经理：{{dataInfo.line_info.line_contact}}</text>
				</view>
				<view class="con_item">
					<text>经理手机：{{dataInfo.line_info.line_mobile}}</text>
				</view>
				<view class="con_item">
					<text>发站地址：{{dataInfo.logistics_info.address}}</text>
				</view>
			</view>
		</view>
		</view>
		<view class="con_btns">
			<u-button type="primary" @click="submit">确认调整</u-button>
		</view>
		
		<view class="con_station" v-if="dataInfo.waybill_info">
			<u-popup v-model="show_outlet" mode="bottom" border-radius="14" height="800">
				<view class="con_title">
					<text>选择到站地址</text>
				</view>
				<view class="con_list">
					<u-radio-group v-model="dataInfo.waybill_info.outlets_id" @change="stationChange">
						<scroll-view scroll-y="true" style="height: 700rpx;">
							<u-radio v-for="item in outletList" :key="item.outlets_id" :name="item.outlets_id">
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
			<u-popup v-model="show_order" mode="bottom" height="1000" border-radius="14">
				<view class="con_list">
					<scroll-view class="con_scrollView" scroll-y="true">
						<view class="con_item" v-for="(item,index) in showOrderList" :key="index"
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
							<view class="con_line"></view>
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
	
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				waybill_sn: '', // 运单号
				dataInfo: {},
				imgList: [],
				sendTime: 0,
				plateNum: [],
				show_outlet: false,
				outletList: [], // 到站网点的列表
				show_order: false,
				oldOrderList: [],
				orderList: [], // 订单列表
				showOrderList: [],
				orderNum: 0,
				allSelect: false
			}
		},
		onLoad(options) {
			let gt = this
			gt.waybill_sn = options.orderSn
			gt.getDataInfo()
		},
		methods: {
			getDataInfo() {
				let gt = this
				gt.gtRequest.post("/logistics/waybill/get_waybill_detail", {
					waybill_sn: gt.waybill_sn
				}).then(res => {
					gt.getlinInfo(res.waybill_info.line_id)
					gt.getOrderInfo(res.waybill_info.line_id)
					gt.dataInfo = res
					gt.oldOrderList = res.deliver_order_list
					gt.plateNum = res.waybill_info.license_plate
					gt.sendTime = res.waybill_info.create_time
					gt.imgList = []
					let imgs = (res.waybill_info.images && res.waybill_info.images.split('||')) || []
					imgs.forEach(item=> {
						gt.imgList.push({
							url: item
						})
					})
				})
			},
			goOrderInfo(waybill_sn){
				uni.navigateTo({
					url: '/pages/order/orderInfo?orderSn=' + waybill_sn
				})
				return false
			},
			plateConfirm(res) {
				let gt = this
				gt.plateNum = res
			},
			getlinInfo(id) {
				let gt = this
				gt.gtRequest.post("/logistics/specialline/get_special_line_info", {line_id: id}).then(res => {
					gt.outletList = res.info.outlets_list
				})
			},
			stationChange(id) {
				let gt = this
				let selectItem = gt.outletList.find(item=> item.outlets_id == id)
				if(selectItem !== undefined) {
					gt.dataInfo.waybill_info.outlets_id = id
					gt.dataInfo.waybill_info.outlets_name = selectItem.outlets_name
					gt.dataInfo.waybill_info.outlets_contact = selectItem.outlets_contact
					gt.dataInfo.waybill_info.outlets_mobile = selectItem.outlets_mobile
					gt.dataInfo.waybill_info.outlets_address =selectItem.outlets_address
				} else {
					gt.$refs.uToast.show({
						title: '网点信息错误',
						type: 'error'
					})
				}
				gt.show_outlet = false
			},
			getOrderInfo(id) {
				let gt = this
				gt.gtRequest.post("/logistics/specialline/get_special_line_order_list", {
					line_id: id,
					page: 1,
					limit: 9999
				}).then(res => {
					for (var i = 0; i < res.list.length; i++) {
						res.list[i].selected = false
					}
					gt.orderList = res.list
				})
			},
			openOrderPop() {
				let gt = this
				gt.showOrderList = []
				let all = [...gt.orderList, ...gt.oldOrderList]
				all.forEach(item=> {
					if(!gt.dataInfo.deliver_order_list.some(obj=> obj.deliver_sn == item.deliver_sn)) {
						item.selected = false
						gt.showOrderList.push(item)
					}
				})
				gt.orderNum = 0
				gt.allSelect = false
				gt.show_order = true
			},
			selectOrder(item) {
				let gt = this
				item.selected = !item.selected
				if (item.selected) {
					gt.orderNum++
				} else {
					gt.orderNum--
				}
				if (gt.orderNum == gt.showOrderList.length) {
					gt.allSelect = true
				} else {
					gt.allSelect = false
				}
			},
			selectAll() {
				let gt = this
				gt.allSelect = !gt.allSelect
				if (gt.allSelect) {
					for (var i = 0; i < gt.showOrderList.length; i++) {
						gt.showOrderList[i].selected = true
					}
					gt.orderNum = gt.showOrderList.length
				} else {
					for (var i = 0; i < gt.showOrderList.length; i++) {
						gt.showOrderList[i].selected = false
					}
					gt.orderNum = 0
				}
			},
			orderConfirm() {
				let gt = this
				if(gt.orderNum == 0){
					return gt.$refs.uToast.show({
						title: '请选择一个订单'
					})
				}
				if (gt.orderNum) {
					gt.orderStr = '已选' + gt.orderNum + '单'
				} else {
					gt.orderStr = ''
				}
				let selectedOrder = gt.showOrderList.filter(item=> item.selected)
				gt.dataInfo.deliver_order_list = [...gt.dataInfo.deliver_order_list, ...selectedOrder]
				gt.show_order = false
			},
			delOrder(deliver_sn) {
				let gt = this
				gt.dataInfo.deliver_order_list = gt.dataInfo.deliver_order_list.filter(item=> item.deliver_sn != deliver_sn)
			},
			chooseImg(file) {
				let gt = this
				let data = file.fileInfo
				gt.gtRequest.upload(data).then(res => {
					gt.imgList.push({
						url: res.src
					})
					// gt.$nextTick(()=> {
						
					// })
					setTimeout(()=> {
						gt.$refs.uUpload.lists = gt.$refs.uUpload.lists.filter(item=> item.progress)
					}, 0)
				})
			},
			removeImg(index) {
				let gt = this
				gt.imgList.splice(index, 1)
			},
			submit() {
				let gt = this
				if (!gt.$u.test.carNo(gt.plateNum)) {
					gt.$refs.uToast.show({
						title: '车牌号不正确',
						type: 'error'
					});
					return false
				}
				if (gt.dataInfo.waybill_info.driver_name == '') {
					gt.$refs.uToast.show({
						title: '司机姓名不能为空',
						type: 'error'
					})
					return false
				}
				if (!gt.$u.test.mobile(gt.dataInfo.waybill_info.driver_mobile)) {
					gt.$refs.uToast.show({
						title: '司机手机号不正确',
						type: 'error'
					})
					return false
				}
				if (!gt.dataInfo.deliver_order_list.length) {
					gt.$refs.uToast.show({
						title: '请选择订单',
						type: 'error'
					});
					return false
				}
				let params = {
					waybill_sn: gt.waybill_sn, // 运单号
					deliver_sn: '', // 订单号
					del_deliver_sn: '',
					add_deliver_sn: '',
					images: '',
					license_plate: gt.plateNum, // 车牌号
					driver_name: gt.dataInfo.waybill_info.driver_name, // 司机名称
					driver_mobile: gt.dataInfo.waybill_info.driver_mobile, // 司机电话
					line_id: gt.dataInfo.waybill_info.line_id, // 专线id
					outlets_id: gt.dataInfo.waybill_info.outlets_id // 到站网点id
				}
				let imgs = []
				gt.imgList.forEach(item=> {
					imgs.push(item.url)
				})
				params.images = imgs.join('||')
				// 获取订单号
				let deliver_sn_list = []
				gt.dataInfo.deliver_order_list.forEach(item=> {
					deliver_sn_list.push(item.deliver_sn)
				})
				params.deliver_sn = deliver_sn_list.join(',')
				// 获取被删除的订单号
				let del_deliver_sn = []
				let old_deliver_sn = []
				gt.oldOrderList.forEach(item=> {
					old_deliver_sn.push(item.deliver_sn)
					if(!deliver_sn_list.some(obj=> obj == item.deliver_sn)) del_deliver_sn.push(item.deliver_sn)
				})
				params.del_deliver_sn = del_deliver_sn.join(',')
				// 获取新增的订单号
				let add_deliver_sn = []
				deliver_sn_list.forEach(item=> {
					if(!old_deliver_sn.some(obj=> obj == item)) add_deliver_sn.push(item)
				})
				params.add_deliver_sn = add_deliver_sn.join(',')
				console.log(params)
				gt.gtRequest.post("/logistics/waybill/adjust_waybill", params).then(res => {
					gt.$refs.uToast.show({
						title: '调整运单成功',
						type: 'success',
						back: true
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_driverInfo {
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;
				.con_textBtn {
					display: flex;
					.con_text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 48rpx;
						white-space: nowrap;
					}
					.con_text1 {
						display: flex;
						align-items: center;
						margin-bottom: 16rpx;
						.u-input {
							width: 240rpx;
							height: 56rpx;
							background-color: #F4F4F4;
							border-radius: 8rpx;
							padding: 0 14rpx!important;
							.u-input__input {
								min-height: 56rpx !important;
							}
						}
					}
					.con_btn {
						width: 24rpx;
						height: 24rpx;
						margin-left: 8rpx;
						margin-top: 4rpx;
					}
				}
			}

			.con_lineInfo {
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_keyVal {
					display: flex;
					justify-content: space-between;

					.con_key {
						display: flex;

						.con_required {
							// display: none;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FF6067;
							line-height: 40rpx;
						}

						.con_text {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 40rpx;
							white-space: nowrap;
						}
					}

					.con_val {
						display: flex;

						.con_text {
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 48rpx;
							text-align: right;
							white-space: nowrap;
						}
						.con_textItem {
							white-space: pre-wrap;
						}
						.con_icon {
							// display: none;
							margin-top: 10rpx;
							margin-left: 10rpx;
						}
					}
				}
			}

			.con_orderInfo {
				width: 718rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_list {
					margin-top: -24rpx;

					.con_item {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 40rpx;
						margin-top: 24rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						text:nth-child(2) {
							color: $gtProjectColor;
						}

						text:nth-child(3) {
							margin-left: 20rpx;
						}
					}
					.icon {
						margin-top: 24rpx;
						color: #FF6067;
					}
				}
				.btn {
					width: 214rpx;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 32rpx;
					border: 2rpx solid #485EF4;
					text-align: center;
					color: #485EF4;
					margin: 32rpx auto 0;
				}
			}

			.con_imgs {
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
					margin-left: 10rpx;
					flex-wrap: wrap;

					.con_item {
						width: 160rpx;
						height: 160rpx;
						overflow: hidden;
						border-radius: 16rpx;
						margin: 20rpx;
					}
				}
			}

			.con_startInfo {
				width: 718rpx;
				// height: 324rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				margin: 20rpx 16rpx;
				padding: 24rpx;

				.con_title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
				}

				.con_info {
					margin-top: 16rpx;

					.con_item {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #909399;
						line-height: 40rpx;
						margin: 8rpx 0;
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
			
			.gt_content_content {
				height: calc(100vh - 100rpx);
				overflow: auto;
			}
			
			.con_btns {
				display: fixed;
				bottom: 0;
				margin: 20rpx;
			}
		}
	}
</style>