<template>
	 <mescroll-uni @init="mescrollInit" :height="height" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<view class="con_item" v-for="item in goods" :key="item.id" @click.stop="()=> goDetail(item)">
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
						<image :src="gtCommon.getOssImg('sansong/copy.png')" mode="widthFix"></image>
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
					<u-line color="#E5E5E5" length="80rpx" margin="56rpx 32rpx 0 32rpx" />
				</view>
				<view class="con_text">
					<text>{{item.line_end_city}}</text>
				</view>
			</view>
			<view class="con_keyVal">
				<view class="con_text">
					<text>发站公司：{{item.start_line_info.company_name}}</text>
				</view>
				<view class="con_text">
					<text>联系电话：{{item.start_line_info.line_mobile}}</text>
				</view>
				<view class="con_text">
					<text>到站公司：{{item.outlets_name}}</text>
				</view>
				<view class="con_text">
					<text>联系电话：{{item.outlets_mobile}}</text>
				</view>
				<view class="con_text">
					<text>发车时间：{{gtCommon.formateTime(item.create_time, 'MM月DD日 HH:mm')}}</text>
				</view>
			</view>
			<view class="con_line">
				<u-line color="#F2F2F2 " length="670rpx" margin="24rpx" />
			</view>
			<view class="con_btns">
				<view class="con_btn" @click.stop="()=> closeOrder(item)" v-if="item.status == 0">
					<text>取消运输</text>
				</view>
				<view class="con_btn" @click.stop="()=> goAdjust(item)" v-if="item.status == 0">
					<text>调整运单</text>
				</view>
				<view class="con_btn" @click.stop="()=> confirmArrive(item)" v-if="item.status == 0">
					<text>确认到达</text>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="14">
			<view class="con_refuse">
				<view class="con_title">取消运输</view>
				<view class="con_info">取消运输后，将通知目的网点该运输已取消！</view>
				<view class="con_radio_msg">请选择取消运输的原因（必选）：</view>
				<view class="con_radio">
					<u-radio-group v-model="reason" @change="radioGroupChange" :wrap='true'>
						<u-radio :name="item.name" v-for="(item, index) in list" :key="index" >
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
				<view class="con_textarea">
					<u-input v-model="remake" type="textarea" placeholder="请输入您的取消理由" :disabled='_disabled' />
				</view>
				<view class="con_confirmBtn" >
					<u-button type="primary" @click="confirmRefuse" :disabled='_disabled1'>确定</u-button>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		props:{
			i: Number,
			height: [Number, String]
		},
		data() {
			return {
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
						btnText: ''
					}
				},
				goods: [], //列表数据
				params: {
					search_key: '',
					page: 1,
					limit: 10,
					status: 0 // 0=运输中，1=已到站，2=已取消
				},
				show: false,
				list: [
					{name: '配载单信息有误'},
					{name: '恶劣天气影响，无法发车'},
					{name: '订单件数不对'},
					{name: '货物损坏'},
					{name: '司机师傅临时有事'},
					{name: '其他'}
				],
				reason: '',
				remake: ''
			}
		},
		computed: {
			_disabled() {
				return this.reason !== '其他'
			},
			_disabled1() {
				if(this.reason === '其他') {
					return this.remake ? false : true
				} else {
					return this.reason ? false : true
				}
			}
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let gt = this
				gt.params.page = page.num
				gt.params.limit = page.size
				gt.params.status = gt.i
				gt.gtRequest.post('/logistics/waybill/get_waybill_list', gt.params).then(res => {
					if(page.num == 1) gt.goods = []
					gt.goods = gt.goods.concat(res.list)
					gt.mescroll.endSuccess(res.list.length)
				}).catch(()=>{
					gt.mescroll.endErr()
				})
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			},
			radioGroupChange(e) {
				this.reason = e
			},
			confirmRefuse() {
				let gt = this
				gt.gtRequest.post("/logistics/order/undo_waybill", {
					waybill_sn: gt.record.waybill_sn,
					reason: gt.reason === '其他' ? gt.remake : gt.reason
				}).then(res => {
					gt.downCallback()
					gt.$refs.uToast.show({
						title: '取消成功！',
						type: 'success'
					})
					gt.show = false
				})
			},
			goDetail(record){
				uni.navigateTo({
					url:'./sendInfo?orderSn=' + record.waybill_sn
				})
			},
			closeOrder(record){
				this.show = true
				this.reason = ''
				this.remake = ''
				this.record = record
			},
			goAdjust(record){
				let gt = this
				uni.navigateTo({
					url:'./adjustSend?orderSn=' + record.waybill_sn
				})
			},
			confirmArrive(item){
				let gt = this
				gt.gtRequest.post("/logistics/upwaybill/waybil_confirm_arrival", {
					waybill_sn: item.waybill_sn
				}).then(res => {
					gt.downCallback()
					gt.$refs.uToast.show({
						title: '到达成功！',
						type: 'success'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
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
				width:24rpx;
				height: 24rpx;
				margin: 6rpx 8rpx;
				font-size: 24rpx;
				color: #0C0C0C;
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
		.con_text:nth-child(5) {
			margin-top: 40rpx;
		}
	}
	.con_btns {
		display: flex;
		justify-content: flex-end;
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
			margin-left: 16rpx;
		}
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
	.con_info {
		margin: 38rpx 40rpx;
	}
	.con_radio_msg {
		margin: 0 40rpx;
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
		font-family: PingFangSC-Medium, PingFang SC;
		margin: 38rpx 16rpx 32rpx 16rpx;
	}
}
</style>