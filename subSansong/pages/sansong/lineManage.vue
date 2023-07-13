<template>
	<view class="gt_content">
		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>
		<view class="con_empty" v-if="dataList.length == 0">
			<view class="con_img">
				<image :src="gtCommon.getOssImg('sansong/empty.png')" mode="widthFix"></image>
			</view>
			<view class="con_text">
				<text>您还添加任何专线</text>
			</view>
		</view>
		<view class="con_list" v-else>
			<view class="con_item" v-for="(item,index) in dataList" :key="index">
				<view class="con_title_labels">
					<view class="con_title">
						<text>{{item.start_city}}-{{item.end_city}}</text>
					</view>
					<!-- <view class="con_labels">
						<view class="con_label">
							<text>会员专线</text>
						</view>
						<view class="con_label" style="background: #485EF4;">
							<text>品质专线</text>
						</view>
						<view class="con_label" style="background: #FFF700;color: #000000;">
							<text>金卡推广</text>
						</view>
					</view> -->
				</view>
				<view class="con_table" style="display: none;">
					<u-table border-color="#909399" bg-color="#fff" padding="14rpx 5rpx 16rpx 5rpx" font-size="24" color="#000000">
							<!-- <u-tr>
								<u-th>产品</u-th>
								<u-th>纯重1:1</u-th>
								<u-th>纯重1:3</u-th>
								<u-th>纯重1:6</u-th>
								<u-th>纯重1:10</u-th>
								<u-th>时效</u-th>
							</u-tr> -->
							<u-tr>
								<u-td width="110rpx"><text style="font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">产品</text></u-td>
								<u-td width="110rpx"><text style="font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">纯重1:1</text><br/><text style="font-size: 24rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #909399;">(元/吨)</text></u-td>
								<u-td width="110rpx"><text style="font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">纯重1:3</text><br/><text style="font-size: 24rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #909399;">(元/吨)</text></u-td>
								<u-td width="110rpx"><text style="font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">重泡1:6</text><br/><text style="font-size: 24rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #909399;">(元/立方)</text></u-td>
								<u-td width="110rpx"><text style="font-size: 27rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">重泡1:10</text><br/><text style="font-size: 24rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #909399;">(元/立方)</text></u-td>
								<u-td width="110rpx"><text style="font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">时效</text></u-td>
							</u-tr>
							<u-tr>
								<u-td width="110rpx">普运</u-td>
								<u-td width="110rpx">{{item.general_price_obj.P1}}元</u-td>
								<u-td width="110rpx">{{item.general_price_obj.P3}}元</u-td>
								<u-td width="110rpx">{{item.general_price_obj.P6}}元</u-td>
								<u-td width="110rpx">{{item.general_price_obj.P10}}元</u-td>
								<u-td width="110rpx">{{item.general_day_min}}-{{item.general_day_max}}天</u-td>
							</u-tr>
							<u-tr>
								<u-td width="110rpx">快运</u-td>
								<u-td width="110rpx">{{item.fast_price_obj.P1}}元</u-td>
								<u-td width="110rpx">{{item.fast_price_obj.P3}}元</u-td>
								<u-td width="110rpx">{{item.fast_price_obj.P6}}元</u-td>
								<u-td width="110rpx">{{item.fast_price_obj.P10}}元</u-td>
								<u-td width="110rpx">{{item.fast_day_min}}-{{item.fast_day_max}}天</u-td>
							</u-tr>
							
						</u-table>
				</view>
				
				<view class="con_gtTable">
					<view class="con_gtTh">
						<view class="con_gtTd" style="border-top: none;border-left:none;">
							<view class="con_text"
								style="font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">
								<text>产品</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text"
								style="font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">
								<text>纯重1:1</text>
							</view>
							<view class="con_text"
								style="font-size: 24rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #909399;">
								<text>(元/吨)</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text"
								style="font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">
								<text>重泡1:3</text>
							</view>
							<view class="con_text"
								style="font-size: 24rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #909399;">
								<text>(元/吨)</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text"
								style="font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">
								<text>重泡1:6</text>
							</view>
							<view class="con_text"
								style="font-size: 24rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #909399;">
								<text>(元/立方)</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text"
								style="font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">
								<text>重泡1:10</text>
							</view>
							<view class="con_text"
								style="font-size: 24rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #909399;">
								<text>(元/立方)</text>
							</view>
						</view>
				
						<view class="con_gtTd"
							style="border-top: none;border-right:none;font-size: 28rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #000000;">
							<view class="con_text">
								<text>时效</text>
							</view>
						</view>
					</view>
					<view class="con_gtTr">
						<view class="con_gtTd">
							<view class="con_text">
								<text>普运</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text">
								<text>{{item.general_price_obj.P1}}元</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text">
								<text>{{item.general_price_obj.P3}}元</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text">
								<text>{{item.general_price_obj.P6}}元</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text">
								<text>{{item.general_price_obj.P10}}元</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text">
								<text>{{item.general_day_min}}-{{item.general_day_max}}天</text>
							</view>
						</view>
					</view>
					<view class="con_gtTr">
						<view class="con_gtTd" style="border-bottom: none;border-left:none;">
							<view class="con_text">
								<text>快运</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text">
								<text>{{item.fast_price_obj.P1}}元</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text">
								<text>{{item.fast_price_obj.P3}}元</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text">
								<text>{{item.fast_price_obj.P6}}元</text>
							</view>
						</view>
						<view class="con_gtTd">
							<view class="con_text">
								<text>{{item.fast_price_obj.P10}}元</text>
							</view>
						</view>
						<view class="con_gtTd" style="border-bottom: none;border-right:none;">
							<view class="con_text">
								<text>{{item.fast_day_min}}-{{item.fast_day_max}}天</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="con_keyVal">
					<view class="con_text">
						<text>专线经理：{{item.line_contact}}</text>
					</view>
					<view class="con_text">
						<text>经理手机：{{item.line_mobile}}</text>
					</view>
					<view class="con_text" style="margin-top: 32rpx;">
						<text>到站公司：{{item.outlets_list[0].outlets_name}}</text>
					</view>
					<view class="con_text">
						<text>到站电话：{{item.outlets_list[0].outlets_mobile}}</text>
					</view>
					<view class="con_text u-line-1">
						<text>到站地址：{{item.outlets_list[0].outlets_address}}</text>
					</view>
				</view>
				<view class="con_line">
					<u-line length="670rpx" color="#F2F2F2"></u-line>
				</view>
				
				<view class="con_time_btns">
					<view class="con_time">
						<!-- <text>会员专线：355天</text> -->
					</view>
					<view class="con_btns">
						<!-- <view class="con_btn">
							<text>品质专线</text>
						</view> -->
						
						<view class="con_btn" @click="delLine(item)" style="color: #FF6067;border-color: #FF6067;" v-if="item.status == 0">
							<text>删除</text>
						</view>
						
						<view class="con_btn" @click="goScope(item)">
							<text>运输范围</text>
						</view>
						<view class="con_btn" @click="updownLine(item)" v-if="item.status == 1">
							<text>下架</text>
						</view>
						<view class="con_btn" @click="updownLine(item)" v-if="item.status == 0">
							<text>上架</text>
						</view>
						
						<view class="con_btn" @click="goEdit(item)" v-if="item.status == 0">
							<text>修改</text>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="con_addBtn" @click="addLine">
			<text>添加专线</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[],
				page:1,
				size:10,
				end:false,
			}
		},
		onShow(){
			let gt = this;
			gt.getDataList();
		},
		// onReady() {
		// 	let gt = this;
		// 	const query = uni.createSelectorQuery().in(this);
		// 	console.log(query);
		// 	query.select('.con_table').boundingClientRect(data => {
		// 	  console.log("得到布局位置信息" + JSON.stringify(data));
		// 	  console.log("节点离页面顶部的距离为" + data.top);
		// 	}).exec();
		// },
		methods: {
			getDataList(){
				let gt = this;
				var url = "/logistics/specialline/get_special_line_list";
				var data = {
					page:1,
					limit:999,
				};
				gt.gtRequest.post(url,data).then(res=>{
					for(var i = 0;i<res.list.length;i++){
						res.list[i].general_price_obj = JSON.parse(res.list[i].general_price_json);
						res.list[i].fast_price_obj = JSON.parse(res.list[i].fast_price_json);
					}
					gt.dataList = res.list
				});
			},
			addLine(){
				uni.navigateTo({
					url:'./lineAdd'
				});
				return false;
			},
			goScope(item){
				uni.navigateTo({
					url:'./transportScope?lineId=' + item.line_id,
				});
				return false;
			},
			updownLine(item){
				let gt = this;
				var url = "/logistics/specialline/edit_special_line_status";
				var data = {
					line_id:item.line_id,
					status:item.status == 1 ? 0 : 1,
				};
				gt.gtRequest.post(url,data).then(res=>{
					gt.$refs.uToast.show({
						title: '操作成功！',
						type: 'success',
					});
					gt.getDataList();
				});
			},
			delLine(item){
				let gt = this;
				uni.showModal({
					title:'提示',
					content:'确定删除此专线吗？',
					success(res) {
						if(res.confirm){
							var url = "/logistics/specialline/del_special_line";
							var data = {
								line_id:item.line_id,
							};
							gt.gtRequest.post(url,data).then(res=>{
								gt.$refs.uToast.show({
									title: '操作成功！',
									type: 'success',
								});
								gt.getDataList();
							});
						}
					}
				})
			},
			goEdit(item){
				uni.navigateTo({
					url:'./lineAdd?id='+item.line_id,
				});
				return false;
			},
		}
	}
</script>

<style lang="scss">
	page{
		.gt_content{
			.con_empty{
				.con_img{
					width: 610rpx;
					margin: 80rpx auto;
				}
				.con_text{
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 50rpx;
					margin-top: 30rpx;
					text-align: center;
				}
			}
			.con_list{
				margin-top: 10rpx;
				padding-bottom: 58rpx;
				.con_item{
					width: 718rpx;
					background: #FFFFFF;
					border-radius: 16rpx;
					margin: 10rpx 16rpx;
					.con_title_labels{
						display: flex;
						.con_title{
							font-size: 32rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							line-height: 44rpx;
							margin: 32rpx 0 0 32rpx;
						}
						.con_labels{
							display: flex;
							.con_label{
								width: 136rpx;
								height: 40rpx;
								background: #FF6067;
								border-radius: 8rpx;
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #FFFFFF;
								line-height: 40rpx;
								text-align: center;
								margin: 34rpx 0 0 16rpx;
							}
						}
					}
					
					.con_table{
						margin: 16rpx 24rpx 0 24rpx;
						.u-table{
							// border-radius: 16rpx;
							// overflow: hidden;
							// .u-td{
							// }
						}
					}
					
					.con_gtTable {
						margin-top: 8rpx;
					
						border-radius: 16rpx;
						border: 2rpx solid #909399;
					
						.con_gtTh {
							display: flex;
					
							.con_gtTd {
								border: 2rpx solid #979797;
								width: 116rpx;
								height: 100rpx;
								text-align: center;
								align-items: center;
								margin: -1rpx;
								flex: auto;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
					
								border-left: none;
							}
						}
					
						.con_gtTr {
							display: flex;
					
							.con_gtTd {
								border: 2rpx solid #979797;
								width: 116rpx;
								height: 72rpx;
								text-align: center;
								align-items: center;
								margin: -1rpx;
								flex: auto;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 34rpx;
								border-left: none;
								border-top: none;
							}
						}
					}
					
					
					
					
					.con_keyVal{
						.con_text{
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909399;
							line-height: 40rpx;
							margin-top: 16rpx;
							margin-left: 32rpx;
						}
					}
					.con_line{
						margin-top: 20rpx 0 0 24rpx;
					}
					.con_time_btns{
						display: flex;
						justify-content: space-between;
						.con_time{
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #000000;
							line-height: 64rpx;
							margin: 18rpx 0 0 24rpx;
						}
						.con_btns{
							display: flex;
							.con_btn{
								width: 120rpx;
								height: 64rpx;
								border-radius: 10rpx;
								border: 2rpx solid $gtProjectColor;
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: $gtProjectColor;
								line-height: 64rpx;
								text-align: center;
								margin: 18rpx 10rpx 20rpx 10rpx;
							}
						}
					}
				}
			}
			
			.con_addBtn{
				width: 718rpx;
				height: 100rpx;
				background: $gtProjectColor;
				border-radius: 16rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 100rpx;
				text-align: center;
				margin: 70rpx 16rpx 0 16rpx;
			}
		}
	}
</style>
