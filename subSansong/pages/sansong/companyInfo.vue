<template>
	<view class="gt_content">
		<view class="con_tabs">
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"
				swiperWidth="750" height="88"></u-tabs-swiper>
		</view>
		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" id="companyInfo">
					<scroll-view scroll-y="true" class="con_scrollView">
						<view class="con_swiper">
							<u-swiper :list="companyImgs" mode="number" indicator-pos="bottomRight" height="400"
								border-radius="0" @click="preview"></u-swiper>
						</view>
						<view class="con_companyName">
							<view class="con_name_icons">
								<view class="con_name">
									<text>{{companyName}}</text>
								</view>
								<image :src="gtCommon.getOssImg('user/auth.png')" mode="widthFix" v-if="authStatus == 1"></image>
							</view>
							<view class="con_rate">
								<uv-rate :count="rateCount" v-model="rateNum" inactiveColor="#FF6067" activeColor="#FF6067"
									:readonly='true' allowHalf active-icon="heart-fill" inactive-icon="heart"></uv-rate>
								<view class="con_rate_num">{{ rateNum }}分</view>
							</view>
							<view class="con_nums" v-if="data.company_info">
								<view class="con_numItem">
									<text>浏览量:</text>
									<text>{{ data.company_info.visitor_count }}</text>
								</view>
								<view class="con_numItem">
									<text>下单量:</text>
									<text>{{ data.company_info.order_count }}</text>
								</view>
								<view class="con_numItem">
									<text>收藏量:</text>
									<text>{{ data.company_info.collect_count }}</text>
								</view>
							</view>
							<!-- <view class="con_coupon">
							<view class="con_list">
								<view class="con_couponItem">
									unfinshed
								</view>
							</view>
						</view> -->
							<view class="packets">
								<scroll-view :scroll-x="true" style="width: 100%; white-space: nowrap;" @scrolltolower="loadMore">
									<block v-for="item in packetList" :key="item.id">
										<view class="packet">
											<view class="packet_min_price">￥{{ item.coupon_min_price }}</view>
											<view class="packet_price">满{{ item.coupon_min_price }}减{{ item.coupon_price }}</view>
										</view>
									</block>
								</scroll-view>
							</view>
							<view class="con_line">
								<u-line length="666rpx" color="#F2F2F2" margin="24rpx 40rpx" />
							</view>
							<view class="con_notice">
								<text>公告：{{notice}}</text>
							</view>
						</view>

						<view class="con_baseInfo">
							<view class="con_title">
								<text>基本资料</text>
							</view>
							<view class="con_list">
								<view class="con_key_val">
									<view class="con_key">
										<text>负责人</text>
									</view>
									<view class="con_val">
										<view class="con_text_icon">
											<view class="con_text">
												<text>{{name}}</text>
											</view>
										</view>
									</view>
								</view>
								<view class="con_line">
									<u-line length="682rpx" color="#F2F2F2" margin="32rpx" />
								</view>
								<view class="con_key_val">
									<view class="con_key">
										<text>手机号码</text>
									</view>
									<view class="con_val">
										<view class="con_text_icon">
											<view class="con_text">
												<text>{{mobile}}</text>
											</view>
											<view class="con_icon" @click="gtCommon.callMobile(mobile)">
												<u-icon name="phone-fill" size="40" color="#485EF4"></u-icon>
											</view>
										</view>
									</view>
								</view>
								<view class="con_line">
									<u-line length="682rpx" color="#F2F2F2" margin="32rpx" />
								</view>
								<view class="con_key_val">
									<view class="con_key">
										<text>座机号码</text>
									</view>
									<view class="con_val">
										<view class="con_text_icon">
											<view class="con_text">
												<text v-if="phone">{{phone}}</text>
												<text v-else>-</text>
											</view>
											<view class="con_icon" @click="callPhone(phone)" v-if="phone">
												<u-icon name="phone-fill" size="40" color="#485EF4"></u-icon>
											</view>
										</view>
									</view>
								</view>
								<!-- <view class="con_line">
									<u-line length="682rpx" color="#F2F2F2" margin="32rpx" />
								</view>
								<view class="con_key_val">
									<view class="con_key">
										<text>所在城市</text>
									</view>
									<view class="con_val">
										<view class="con_text_icon">
											<view class="con_text">
												<text>{{pca}}</text>
											</view>
										</view>
									</view>
								</view> -->
								<view class="con_line">
									<u-line length="682rpx" color="#F2F2F2" margin="32rpx" />
								</view>
								<view class="con_key_val">
									<view class="con_key">
										<text>公司地址</text>
									</view>
									<view class="con_val">
										<view class="con_text_icon">
											<view class="con_text">
												<text>{{address}}</text>
											</view>
											<!-- <view class="con_icon" @click="gtCommon.openLocation(lat,lng)">
												<u-icon name="map-fill" size="40" color="#485EF4"></u-icon>
											</view> -->
										</view>
									</view>
								</view>
								<view class="con_line">
									<u-line length="682rpx" color="#F2F2F2" margin="32rpx" />
								</view>
								<view class="con_key_val">
									<view class="con_key">
										<text>所属园区</text>
									</view>
									<view class="con_val">
										<view class="con_text_icon">
											<view class="con_text">
												<text>{{parkName}}</text>
											</view>
										</view>
									</view>
								</view>
								<view class="con_line">
									<u-line length="682rpx" color="#F2F2F2" margin="32rpx" />
								</view>
								<view class="con_key_val">
									<view class="con_key">
										<text>营业执照</text>
									</view>
									<view class="con_val">
										<view class="con_btn" @click="goImgs('licenceImg')">
											<text>点击查看</text>
										</view>
									</view>
								</view>
								<view class="con_line">
									<u-line length="682rpx" color="#F2F2F2" margin="32rpx" />
								</view>
								<view class="con_key_val">
									<view class="con_key">
										<text>运输保单</text>
									</view>
									<view class="con_val">
										<view class="con_btn" @click="goImgs('insure')">
											<text>点击查看</text>
										</view>
									</view>
								</view>
								<!-- <view class="con_line">
									<u-line length="682rpx" color="#F2F2F2" margin="32rpx" />
								</view>
								<view class="con_key_val">
									<view class="con_key">
										<text>品质专线</text>
									</view>
									<view class="con_val">
										<view class="con_btn" @click="currentTab = 1">
											<text>点击查看</text>
										</view>
									</view>
								</view> -->
								<view class="con_line">
									<u-line length="682rpx" color="#F2F2F2" margin="32rpx" />
								</view>
								<view class="con_key_val">
									<view class="con_key">
										<text>运输范围</text>
									</view>
									<view class="con_val">
										<view class="con_btn" @click="goScope">
											<text>点击查看</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item" id="lineInfo">
					<view class="con_empty" v-if="dataList.length == 0">
						<view class="con_img">
							<image :src="gtCommon.getOssImg('sansong/empty.png')" mode="widthFix"></image>
						</view>
						<view class="con_text">
							<text>您还添加任何专线</text>
						</view>
					</view>
					<view class="con_list" v-else>
						<scroll-view scroll-y="true">
							<view class="con_item" v-for="(item,index) in dataList" :key="index">
								<view class="con_header" @click="foldLine(index)">

									<view class="con_icon_title_labels">
										<view class="con_icon">
											<u-icon name="arrow-down-fill" color="#000" size="32"
												v-if="lineIndex == index"></u-icon>
											<u-icon name="play-right-fill" color="#000" size="32" v-else></u-icon>
										</view>

										<view class="con_title" :style="{display: lineIndex == index ? '':'flex'}">
											<text :class="lineIndex == index ? '':'con_title_name'">
												{{cityHide(item.start_city)}}-{{cityHide(item.end_city + item.end_city)}}
											</text>
											<view class="con_label" v-if="item.member_status === '1'">
												<text>会员专线</text>
											</view>
											<view class="con_label" style="background: #485EF4;" v-if="item.deposit_status === '1'">
												<text>品质专线</text>
											</view>
											<view class="con_label" style="background: #FFF700;color: #000000;"
												v-if="item.promote_type === '1' || item.promote_type === '2' || item.promote_type === '3'">
												<text>金卡推广</text>
											</view>
											<view class="con_label" style="background: #C7D1DB;color: #000000;"
												v-if="item.promote_type === '6' || item.promote_type === '7' || item.promote_type === '8'">
												<text>银卡推广</text>
											</view>
										</view>
										<!-- <view class="con_labels">
											<view class="con_label" v-if="item.member_status === '1'">
												<text>会员专线</text>
											</view>
											<view class="con_label" style="background: #485EF4;" v-if="item.deposit_status === '1'">
												<text>品质专线</text>
											</view>
											<view class="con_label" style="background: #FFF700;color: #000000;"
												v-if="item.promote_type === '1' || item.promote_type === '2' || item.promote_type === '3'">
												<text>金卡推广</text>
											</view>
											<view class="con_label" style="background: #C7D1DB;color: #000000;"
												v-if="item.promote_type === '6' || item.promote_type === '7' || item.promote_type === '8'">
												<text>银卡推广</text>
											</view>
										</view> -->
									</view>
								</view>
								<view class="con_body" v-if="lineIndex == index">
									<view class="con_label_btn">
										<view class="con_label">
											<text>运费报价</text>
										</view>
										<view class="con_btn" @click="goScope2(item)">
											<text>运输范围</text>
										</view>
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
									<view class="con_tip">
										<text>温馨提示：该运输报价仅为运费价格，提货费、送货费及其他费用不包含在内</text>
									</view>
									<view class="con_line">
										<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
									</view>
									<view class="con_keyVal">
										<view class="con_key">
											<text>线路经理</text>
										</view>
										<view class="con_val">
											<view class="con_text">
												<text>{{item.line_contact}}</text>
											</view>
										</view>
									</view>
									<view class="con_line">
										<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
									</view>
									<view class="con_keyVal">
										<view class="con_key">
											<text>手机号码</text>
										</view>
										<view class="con_val">
											<view class="con_text">
												<text>{{item.line_mobile}}</text>
											</view>
											<view class="con_icon" @click="gtCommon.callMobile(item.line_mobile)">
												<u-icon name="phone-fill" size="40" color="#485EF4"></u-icon>
											</view>
										</view>
									</view>
									<!-- <view class="con_line">
									<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
								</view>
								<view class="con_keyVal">
									<view class="con_key">
										<text>公司地址</text>
									</view>
									<view class="con_val">
										<view class="con_text">
											<text>{{item.line_mobile}}</text>
										</view>
										<view class="con_icon">
											<u-icon name="map-fill" size="40" color="#485EF4"></u-icon>
										</view>
									</view>
								</view> -->
									<view class="con_line">
										<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
									</view>
									<view class="con_keyVal">
										<view class="con_key">
											<text>到站公司</text>
										</view>
										<view class="con_val">
											<view class="con_text">
												<text>{{item.outlets_list[0].outlets_name}}</text>
											</view>
										</view>
									</view>
									<view class="con_line">
										<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
									</view>
									<view class="con_keyVal">
										<view class="con_key">
											<text>到站地址</text>
										</view>
										<view class="con_val">
											<view class="con_text">
												<text>{{item.outlets_list[0].outlets_address}}</text>
											</view>
											<view class="con_icon"
												@click="gtCommon.openLocation(item.outlets_list[0].outlets_latitude,item.outlets_list[0].outlets_longitude)">
												<u-icon name="map-fill" size="40" color="#485EF4"></u-icon>
											</view>
										</view>
									</view>
									<view class="con_line">
										<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
									</view>
									<view class="con_keyVal">
										<view class="con_key">
											<text>到站电话</text>
										</view>
										<view class="con_val">
											<view class="con_text">
												<text>{{item.outlets_list[0].outlets_mobile}}</text>
											</view>
											<view class="con_icon"
												@click="gtCommon.callMobile(item.outlets_list[0].outlets_mobile)">
												<u-icon name="phone-fill" size="40" color="#485EF4"></u-icon>
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item" id="evaluate">
					<evaluate-list :data='data.company_info' v-if="data.company_info"></evaluate-list>
				</swiper-item>
			</swiper>
		</view>
		<view v-if="img_path" :style="{display: !currentTab ? '' : 'none'}">
			<dragButton :viewWidth="viewWidth" :viewHeight="viewHeight" :viewTop="viewTop"
				 @touchstart='touchstart' @touchend='touchend' :canDocking='false'>
				<view class="videoView" :style="{width: viewWidth+'px', height: viewHeight+'px'}">
					<view class="videoClose">
						<cover-view class="closeIcon" @click.stop="closeVideo" :style="{display: isMove ? '':'none'}">
							<cover-image class="closeImg" :src="gtCommon.getOssImg('sansong/close1.png')"></cover-image>
						</cover-view>
					</view>
					<video :src="img_path" :controls="false" autoplay loop object-fit='fill' :muted="true" :style="{display: isMove ? '':'none'}">
						<cover-view class="viewMask" @click.stop="videoMore"></cover-view>
					</video>
				</view>
			</dragButton>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import EvaluateList from './evaluateList'
	import DragButton from '@/components/dragButton.vue'
	export default {
		components: { EvaluateList, DragButton },
		data() {
			return {
				tabList: [{
					name: '公司资料'
				}, {
					name: '专线信息'
				}, {
					name: '评价'
				}],
				currentTab: 0,
				logistics_id: '',
				companyImgs: [],
				companyName: '',
				authStatus: 0,
				rateCount: 5,
				rateNum: 0,
				notice: '',

				name: '',
				mobile: '',
				phone: '',
				pca: '',
				address: '',
				lng: '',
				lat: '',
				parkName: '',
				data: {},
				dataList: [],
				page: 1,
				size: 10,
				end: false,
				lineIndex: 0,
				packetList: [],
				params: {},
				over: false,
				videos: [],
				img_path: '',
				viewWidth: 150,
				viewHeight: 210,
				viewTop: 45,
				isMove: true
			}
		},
		async onLoad(option) {
			let gt = this;
			gt.logistics_id = option.logistics_id ? option.logistics_id : uni.getStorageSync("companyInfo").logistics_id
			// gt.tabList[2].name = `评价（${uni.getStorageSync("companyInfo").comment_num}）`
			let url = gt.logistics_id ? "/logistics/company/get_company_infother" : "/logistics/company/get_company_info"
			await gt.getCompanyInfo(url);
			if(url == '/logistics/company/get_company_info') {
				gt.logistics_id = gt.data.company_info.logistics_id
				uni.setStorageSync('companyAuth', gt.data.company_info.is_company_approve)
				uni.setStorageSync('companyInfo', gt.data.company_info)
			}
			gt.params = {
				logistics_id: gt.logistics_id,
				page: 1,
				limit: 10
			}
			gt.gtLineList();
			gt.getPacketList()
		},
		methods: {
			getPacketList() {
				let gt = this
				gt.gtRequest.post("/cargo/coupon/companyCouponList", gt.params).then(res => {
					res.list.forEach(item=> {
						item.coupon_price = parseFloat(item.coupon_price)
						item.coupon_min_price = parseFloat(item.coupon_min_price)
					})
					gt.packetList = [...gt.packetList, ...res.list]
					if(res.list.length < gt.params.limit) gt.over = true
				})
			},
			loadMore() {
				let gt = this
				if(gt.over) return
				gt.params.page++
				gt.getPacketList()
			},
			videoMore() {
				uni.navigateTo({
					url: './videoMore?videos=' + encodeURIComponent(JSON.stringify(this.videos))
				})
			},
			closeVideo() {
				this.img_path = ''
			},
			touchstart() {
				this.isMove = false
			},
			touchend() {
				this.isMove = true
			},
			preview(e) {
				let gt = this;
				// uni.navigateTo({
				// 	url: './companyImg',
				// });
				gt.gtCommon.previewImgs(gt.companyImgs, e)
			},
			tabsChange(index) {
				let gt = this;
				gt.currentTab = index;
				gt.gtLineList();
			},
			animationfinish(item) {
				let gt = this;
				gt.currentTab = item.detail.current;
				gt.gtLineList();
			},
			getCompanyInfo(url) {
				let gt = this;
				// var url = "/logistics/company/get_company_info";
				// var url = "/logistics/company/get_company_infother";
				gt.gtRequest.post(url, {
					logistics_id: gt.logistics_id
				}).then(res => {
					var imgList = [];
					res.company_imgs_all.map(item => {
						item = item + '?x-oss-process=style/sansong_app';
						imgList.push(item);
					});
					/* 计算公司评分 */
					let num = parseFloat(res.company_info.grade_score) / (res.company_info.comment_num + 1)
					res.company_info.grade_score_result = gt.gtCommon.floatNum(num, 1)
					gt.data = res
					if(gt.logistics_id == uni.getStorageSync("companyInfo").logistics_id) {
						uni.setStorageSync('companyInfo', res.company_info)
					}
					gt.videos = res.company_imgs.company_viedeos
					gt.img_path = res.company_imgs.company_viedeos.length ? res.company_imgs.company_viedeos[0].img_path : ''
					gt.rateNum = gt.data.company_info.grade_score_result
					// gt.companyImgs = res.company_imgs_all;
					gt.companyImgs = imgList
					gt.companyName = res.company_info.company_name;
					gt.authStatus = res.company_info.is_company_approve;
					gt.notice = res.company_info.public_notice;

					gt.name = res.company_info.contact;
					gt.mobile = res.company_info.mobile;
					gt.phone = res.company_info.fixed_telephone;
					gt.pca = res.company_info.province + '-' + res.company_info.city + '-' + res.company_info.county;
					gt.address = res.company_info.address;
					gt.lng = res.company_info.longitude;
					gt.lat = res.company_info.latitude;
					gt.parkName = res.company_info.park_name;
				});
			},
			goScope() {
				let gt = this;
				uni.navigateTo({
					url: './transportScope?logistics_id=' + gt.data.company_info.logistics_id
				});
				return false;
			},
			goScope2(item) {
				let gt = this;
				uni.navigateTo({
					// url: './transportScope?lineId=' + item.line_id + '&logistics_id=' + gt.data.company_info.logistics_id,
					url: './transportScope?logistics_id=' + gt.data.company_info.logistics_id,
				});
				return false;
			},
			callPhone(phone) {
				let gt = this
				if(gt.gtCommon.isTel(phone)) {
					uni.makePhoneCall({
						phoneNumber: phone,
					});
				} else {
					uni.showToast({
						title: '手机号格式错误',
						icon: "error"
					})
				}
			},
			goImgs(url) {
				let gt = this
				// let manageStatus = gt.logistics_id == uni.getStorageSync("companyInfo").logistics_id
				// uni.navigateTo({
				// 	url: './' + url + '?manageStatus=' + manageStatus
				// });
				if(url === 'licenceImg') {
					if(!gt.data.company_imgs.license_pic.length) return gt.$refs.uToast.show({
						title: '未上传营业执照！'
					})
					uni.navigateTo({
						url: './' + url + '?img=' + gt.data.company_imgs.license_pic[0]
					});
				}
				if(url === 'insure') {
					if(!gt.data.company_imgs.insurance_pics.length) return gt.$refs.uToast.show({
						title: '未上传保单！'
					})
					uni.navigateTo({
						url: './' + url + '?manageStatus=false&imgs=' + encodeURIComponent(JSON.stringify(gt.data.company_imgs.insurance_pics))
					});
				}
			},
			gtLineList() {
				let gt = this;
				if (gt.end) return false;
				var url = "/logistics/specialline/get_special_line_list";
				var data = {
					page: gt.page,
					limit: gt.size,
					logistics_id: gt.logistics_id
				};
				gt.gtRequest.post(url, data).then(res => {
					for (var i = 0; i < res.list.length; i++) {
						res.list[i].general_price_obj = JSON.parse(res.list[i].general_price_json);
						res.list[i].fast_price_obj = JSON.parse(res.list[i].fast_price_json);
					}
					gt.dataList = gt.dataList.concat(res.list);
					if (res.list.length == gt.size) {
						gt.page = gt.page + 1;
					} else {
						gt.end = true;
					}
				});
			},
			foldLine(index) {
				let gt = this;
				if (index == gt.lineIndex) {
					gt.lineIndex = 9999;
				} else {
					gt.lineIndex = index;
				}
			},
			// 城市名称 去掉 市  
			cityHide(value) {
				if(!value) return
				if(value) {
					let city = ""
					if(value.indexOf("市") != -1) {
						city = value.slice(0, -1)
					} else {
						city = value
					}
					return city
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.videoView {
				position: fixed;
				background-color: #000000;
				padding-bottom: 10rpx;
				border-radius: 8rpx;
				overflow: hidden;
				.videoClose {
					display: flex;
					justify-content: flex-end;
					.closeIcon {
						width: 80rpx;
						height: 60rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						.closeImg {
							width: 30rpx;
							height: 30rpx;
						}
					}
				}
				video {
					position: relative;
					width: 100%;
					// height: 100%;
					height: calc(100% - 60rpx);
					margin: 0 auto;
					display: block;
					.viewMask {
						position: absolute;
						width: 100%;
						height: 100%;
					}
				}
			}
			.con_swiper {
				swiper {
					height: calc(100vh - 88rpx);

					#companyInfo {
						.con_scrollView {
							height: calc(100vh - 88rpx);

							.con_companyName {
								background: #fff;
								padding: 1rpx;

								.con_name_icons {
									display: flex;
									align-items: center;
									padding-top: 24rpx;
									.con_name {
										font-size: 36rpx;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 500;
										color: #000000;
										line-height: 50rpx;
										// margin-top: 24rpx;
										margin-left: 40rpx;
									}
									image {
										width: 128rpx;
										margin-left: 20rpx;
									}
								}

								.con_rate {
									width: 500rpx;
									display: flex;
									align-items: center;
									margin-top: 14rpx;
									margin-left: 40rpx;
									color: #FF6067;
									.con_rate_num {
										font-size: 24rpx;
										margin-left: 10rpx;
									}
								}

								.con_nums {
									display: flex;
									margin-top: 30rpx;
									margin-left: 8rpx;

									.con_numItem {
										width: 122rpx;
										font-size: 24rpx;
										font-family: PingFangSC-Regular, PingFang SC;
										font-weight: 400;
										color: #909399;
										line-height: 34rpx;
										margin-left: 32rpx;

										text:nth-child(2) {
											color: #000000;
										}
									}
								}
								.packets {
									padding: 16rpx 36rpx 0;
									.packet {
										border-radius: 6rpx;
										border: 2rpx solid #FF6067;
										margin-right: 20rpx;
										display: inline-flex;
										font-size: 24rpx;
										.packet_min_price {
											height: 56rpx;
											line-height: 56rpx;
											background-color: #FF6067;
											color: #ffff;
											padding: 0 12rpx;
										}
										.packet_price {
											height: 56rpx;
											line-height: 56rpx;
											background-color: #ffdfe1;
											white-space: nowrap;
											color: #FF6067;
											padding: 0 16rpx;
											border-radius: 0 6rpx 6rpx 0;
										}
									}
								}
								.con_notice {
									font-size: 28rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #909399;
									line-height: 40rpx;
									margin-left: 40rpx;
									margin-bottom: 40rpx;
								}
							}

							.con_baseInfo {
								background: #fff;
								padding: 1rpx;
								margin-top: 20rpx;

								.con_title {
									font-size: 32rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #000000;
									line-height: 44rpx;
									margin-top: 24rpx;
									margin-left: 40rpx;
									margin-bottom: 24rpx;
								}

								.con_list {
									padding-bottom: 32rpx;

									.con_key_val {
										display: flex;
										justify-content: space-between;
										padding: 0 40rpx;

										.con_key {
											font-size: 28rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #909399;
											line-height: 40rpx;
											white-space: nowrap;
											margin-right: 30rpx;
										}

										.con_val {
											.con_text_icon {
												display: flex;

												.con_text {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #000000;
													line-height: 40rpx;
												}

												.con_icon {
													margin-left: 16rpx;
												}
											}

											.con_btn {
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: $gtProjectColor;
												line-height: 40rpx;
											}
										}
									}
								}
							}
						}
					}

					#lineInfo {

						// border: 1rpx solid red;
						.con_empty {
							.con_img {
								width: 610rpx;
								margin: 80rpx auto;
							}

							.con_text {
								font-size: 36rpx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #000000;
								line-height: 50rpx;
								margin-top: 30rpx;
								text-align: center;
							}
						}

						.con_list {
							scroll-view {
								height: calc(100vh - 88rpx);

								.con_item {
									width: 718rpx;
									background: #FFFFFF;
									border-radius: 16rpx;
									margin: 20rpx 16rpx;
									padding: 32rpx 24rpx;

									.con_header {


										.con_icon_title_labels {
											display: flex;
											
											.con_icon {
												margin-top: 6rpx;
											}

											.con_title {
											    width: calc(100% - 16rpx - 32rpx);
												font-size: 32rpx;
												font-family: PingFangSC-Medium, PingFang SC;
												font-weight: 500;
												color: #000000;
												line-height: 44rpx;
												margin-left: 16rpx;
												.con_title_name {
													display: inline-block;
													// width: calc(100% - 78px - 78px - 78px) !important;
													width: auto !important;
													white-space: nowrap;
													text-overflow: ellipsis;
													overflow: hidden;
												}
											}

											.con_labels {
												display: flex;	
											}
											.con_label {
												display: inline-block;
												// width: 136rpx;
												height: 40rpx;
												background: #FF6067;
												border-radius: 8rpx;
												font-size: 24rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #FFFFFF;
												line-height: 40rpx;
												text-align: center;
												margin: 4rpx 0 0 16rpx;
												padding: 0 20rpx;
												white-space: nowrap;
											}
										}
									}

									.con_body {

										.con_label_btn {
											display: flex;
											justify-content: space-between;
											margin-top: 24rpx;

											.con_label {
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #000000;
												line-height: 40rpx;
											}

											.con_btn {
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: $gtProjectColor;
												line-height: 40rpx;
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

										.con_tip {
											margin-top: 16rpx;
											font-size: 24rpx;
											font-family: PingFangSC-Regular, PingFang SC;
											font-weight: 400;
											color: #FF6067;
											line-height: 34rpx;
										}

										.con_keyVal {
											display: flex;
											justify-content: space-between;

											.con_key {
												font-size: 28rpx;
												font-family: PingFangSC-Regular, PingFang SC;
												font-weight: 400;
												color: #000000;
												line-height: 40rpx;
												white-space: nowrap;
												margin-right: 16rpx;
											}

											.con_val {
												display: flex;

												.con_text {
													font-size: 28rpx;
													font-family: PingFangSC-Regular, PingFang SC;
													font-weight: 400;
													color: #000000;
													line-height: 40rpx;
												}

												.con_icon {
													margin-left: 28rpx;
												}

											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>