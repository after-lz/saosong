<template>
	<view class="gt_content">
		<view class="con_tabs">
			<u-tabs-swiper ref="uTabs" :list="tabList" :current="currentTab" @change="tabsChange" :is-scroll="false"
				swiperWidth="750" height="88"></u-tabs-swiper>
		</view>
		<view class="con_swiper">
			<swiper :current="currentTab" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" id="companyInfo">
					<scroll-view scroll-y="true" class="con_scrollView" :class="flag ? 'cHeight':''">
						<view class="con_swiper">
							<!-- <u-swiper :list="companyImgs" mode="number" indicator-pos="bottomRight" height="400"
								border-radius="0" @click="preview"></u-swiper> -->
							<swiper class="swiper" circular :autoplay="true" interval="2000"
								duration="200" style="height: 200px;" @change="swiperChange">
								<swiper-item v-if="isShowVideo" @click="preview(-1)" style="position: relative">
									<!-- <video :src="data.company_imgs.company_viedeos[0].img_path" autoplay loop :muted="true"
										 :controls="false" style="width: 100%;height: 200px;"></video> -->
									<u-image :src='data.company_imgs.company_viedeos[0].cover' height="400" width="750"></u-image>
									<view class="playVideo">
										<u-icon name="play-circle" color="#fff" size="80"></u-icon>
									</view>
								</swiper-item>
								<swiper-item v-for="(item, i) in data.company_imgs_all" :key="item" @click="preview(i)">
									<u-image :src='item' height="400" width="750"></u-image>
								</swiper-item>
							</swiper>
							<view class="tip-view">
								{{ currentNum + '/' + totalNum }}
							</view>
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
											<view class="con_icon" @click="callPhoneFn()">
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
					<view class="con_bottom" v-if="flag">
						<view class="flex_left">
							<view class="left_icon" @click="toMapApp">
								<view class="left_img">
									<u-image :src="gtCommon.getOssImg('message/navigation.png')" mode="widthFix"></u-image>
								</view>
								<view class="left_name">
									<text>导航</text>
								</view>
							</view>
							<view class="left_icon" @click="starChange">
								<view v-show="!starTrue">
									<u-icon name="star" size="50"></u-icon>
								</view>
								<view v-show="starTrue">
									<u-icon name="star-fill" size="50" color="#FFBF27"></u-icon>
								</view>
								<view class="left_name">
									<text>收藏</text>
								</view>
							</view>
							<view class="left_icon" @click="callPhone('(0510)83742099')">
								<view class="left_img">
									<u-image :src="gtCommon.getOssImg('message/service.png')" mode="widthFix"></u-image>
								</view>
								<view class="left_name">
									<text>客服</text>
								</view>
							</view>
						</view>
						<view class="flex_right">
							<view class="right_btn" @click="callModal">
								<text>立即联系</text>
							</view>
						</view>
					</view>
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
												{{cityHide(item.start_city)}}-{{cityHide(item.end_city)}}
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
		<!-- <view v-if="showVideo && img_path" :style="{display: !currentTab ? '' : 'none'}">
			<dragButton :viewWidth="viewWidth" :viewHeight="viewHeight" :viewTop="viewTop" :other='other'
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
		</view> -->
		<u-toast ref="uToast" />
		<!-- 电话弹层 -->
		<u-popup v-model="showCall" @close="closeCall" mode="bottom" border-radius="14">
		    <view class="call_view">
		       <view class="call_item" v-if="name" @click="callPhoneFn()">
					<view class="item_name">
						<text>负责人</text>
					</view>
					<view class="item_val">
						<text>{{mobile}}</text>
					</view>
		       </view>
			   <view class="call_item" v-if="phone" @click="callPhone(phone)">
					<view class="item_name">
						<text>座机</text>
					</view>
					<view class="item_val">
						<text>{{phone}}</text>
					</view>
			   </view>
			   <view class="call_item" @click="closeCall">
					<view class="item_name">
						<text>取消</text>
					</view>			
			   </view>
			</view>
		</u-popup>
		<!-- 分享 -->
		<u-popup v-model="showShare" mode="bottom" border-radius="14" :mask-close-able='false' :mask="false">
			<view class="share_modal">
				<view class="share_top">
					<view class="top_title">
						<text>分享</text>
					</view>
					<view @click="closeShare">
						<u-icon name="close" color="#000000" size="30"></u-icon>
					</view>
				</view>
				<view class="share_but">
					<view class="but_content" v-if="showType">
						<view class="item-share" @click="generateCard">
							<view class="share-icon">
								<image :src="gtCommon.getOssImg('sansong/shareMp.png')"></image>
							</view>
							<view>
								<text>生成名片</text>
							</view>
						</view>
						<view class="item-share" @click="html2canvas.create">
							<view class="share-icon">
								<image :src="gtCommon.getOssImg('sansong/shareHb.png')"></image>
							</view>
							<view>
								<text>生成海报</text>
							</view>
						</view>
					</view>
					<view class="but_content" v-else>
						<view class="item-share" @click="shareFriend">
							<view class="share-icon">
								<image :src="gtCommon.getOssImg('sansong/shareWx.png')"></image>
							</view>
							<view>
								<text>微信</text>
							</view>
						</view>
						<view class="item-share" @click="shareGroup">
							<view class="share-icon">
								<image :src="gtCommon.getOssImg('sansong/sharePy.png')"></image>
							</view>
							<view>
								<text>朋友圈</text>
							</view>
						</view>
						<view class="item-share" @click="saveImg">
							<view class="share-icon">
								<image :src="gtCommon.getOssImg('sansong/shareBc.png')"></image>
							</view>
							<view>
								<text>保存</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 海报 -->
		<u-mask :show="showPoster">	
			<view class="poster-modal">
				<view class="poster-view" id="poster-view">
					<view class="main-view" id="poster">
						<view class="top-view" id="topPic">
							<u-image :src="posterShareImg" width="100%" height="360" v-if="data.company_info"></u-image>
						</view>
						<view class="bot-view">
							<view class="company-view">
								<view class="left">
									<u-image :src="posterShareImg" width="136" height="136" v-if="data.company_info"></u-image>
								</view>
								<view class="right">
									<view class="poster-cop">{{ companyName }}</view>
									<view class="poster-num" v-if="data.company_info">
										<view class="item-num">浏览量 {{ data.company_info.visitor_count }}</view>
										<view class="item-num">完单量 {{ data.company_info.order_count }}</view>
										<view class="item-num">收藏量 {{ data.company_info.collect_count }}</view>
									</view>
								</view>
							</view>
							<view class="other-view">
								<view class="left">
									<u-image :src="zxImg" width="40" height="40"></u-image>
								</view>
								<view class="right">
									热门专线: {{ lines.join('、') || [] }}
								</view>
							</view>
							<view class="other-view">
								<view class="left">
									<u-image :src="dhImg" width="40" height="40"></u-image>
								</view>
								<view class="right">
									联系电话: {{ mobile }} {{ phone }}
								</view>
							</view>
							<view class="other-view">
								<view class="left">
									<u-image :src="dzImg" width="40" height="40"></u-image>
								</view>
								<view class="right">
									<text>公司地址: {{ address }}</text>
								</view>
							</view>
							<view class="share-but-view">
								<view class="left">
									<view class="flex-con">
										<u-image :src="companyImg" width="180" height="180"></u-image>
									</view>
									<view class="tip">
										<text>扫码查看物流公司</text>
									</view>
								</view>
								<view class="right">
									<view class="flex-con">
										<u-image :src="dcImg" width="180" height="180"></u-image>
									</view>
									<view class="tip">
										<text>发货取货,立即查询</text>
									</view>
								</view>
							</view>
							<view class="flex-con">发货 找物流 就上 伞送</view>
						</view>
					</view>
				</view>
			</view>
		</u-mask>
		<canvas canvas-id="qrcodeCompany" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" class="canvasq" />
		<canvas canvas-id="qrcodePick" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" class="canvasq" />
	</view>
</template>

<script>
	import EvaluateList from './evaluateList'
	import DragButton from '@/components/dragButton.vue'
	import uQRCode from '@/common/uqrcode.js'
	import { base64ToPath, pathToBase64 } from '@/common/image-tools.js'
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
				other: 0,
				isMove: true,
				starTrue: false,
				flag: false,
				showCall: false,
				showShare: false,
				showType: true,
				posterUrl: '',
				showPoster: false,
				zxImg: '',
				dhImg: '',
				dzImg: '',
				companyImg: '',
				posterShareImg: '',
				dcImg: '',
				qrcodeSize: 100,
				inviteCompanyUrl: '',
				invitePickUpUrl: '',
				showVideo: true,
				lines: [],
				isShowVideo: false,
				currentNum: 1,
				totalNum: 0
			}
		},
		onNavigationBarButtonTap(e) {
			const that = this
			uni.showLoading({
				title: '二维码生成中',
				mask: true
			})
			uQRCode.make({
				canvasId: 'qrcodeCompany',
				text: that.inviteCompanyUrl,
				size: that.qrcodeSize,
				margin: 10,
				success: res => {
					// console.log("----", res)
					// that.turnBase64Image(res, 'companyImg')
					that.companyImg = res
					uQRCode.make({
						canvasId: 'qrcodePick',
						text: that.invitePickUpUrl,
						size: that.qrcodeSize,
						margin: 10,
						success: async re => {
							// that.turnBase64Image(re, 'dcImg')
							await that.getLineInfo()
							that.dcImg = re
							that.showShare = true
							that.showPoster = true
							that.showVideo = false
							var webView = this.$mp.page.$getAppWebview()
							let titleNView = webView.getTitleNView()
							titleNView && titleNView.hide()
						},
						fail: () => {
							uni.hideLoading()
						}
					})
				}
			})
		},
		async onLoad(option) {
			let gt = this;
			if(option.logistics_id) {
				gt.logistics_id = option.logistics_id
				if(gt.logistics_id != uni.getStorageSync("companyInfo").logistics_id) {
					gt.flag = true
					gt.other = 66
				}
			} else {
				gt.logistics_id = uni.getStorageSync("companyInfo").logistics_id
			}
			// gt.tabList[2].name = `评价（${uni.getStorageSync("companyInfo").comment_num}）`
			let url = gt.logistics_id ? "/logistics/company/get_company_infother" : "/logistics/company/get_company_info"
			gt.inviteCompanyUrl = "https://saasdemo.sansongkeji.com/company?logistics_id="+gt.logistics_id
			gt.invitePickUpUrl = "https://saasdemo.sansongkeji.com/order?logistics_id="+gt.logistics_id
			if(option.from == 'user') gt.tabsChange(2)
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
			gt.turnBase64Image("../../../static/img/shareZx.png", 'zxImg')
			gt.turnBase64Image("../../../static/img/shareDh.png", 'dhImg')
			gt.turnBase64Image("../../../static/img/shareDz.png", 'dzImg')
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
			callPhoneFn() {
				let gt = this
				gt.calll_company()
				gt.gtCommon.callMobile(gt.mobile)
			},
			calll_company() {
				let gt = this
				gt.gtRequest.post("/logistics/Company/company_calll_company", {
					logistics_id: gt.logistics_id
				}).then(res => {})
			},
			// 导航
			toMapApp() {
				let gt = this
				gt.gtCommon.openLocation(+gt.data.company_info.latitude, +gt.data.company_info.longitude)
			},
			// 收藏
			starChange() {
				let gt = this
				gt.gtRequest.post('/logistics/User/collect_other_logistics', {
					logistics_id: gt.logistics_id
				}).then(res => {
					gt.starTrue = !gt.starTrue
					gt.$refs.uToast.show({
						title: gt.starTrue ? '收藏成功' : '取消收藏'
					})
				})
			},
			// 立即联系
			callModal() {
				this.showVideo = false
				this.showCall = true
			},
			// app端 关闭分享弹层
			closeShare() {
				this.showShare = false
				var webView = this.$mp.page.$getAppWebview()
				let titleNView = webView.getTitleNView()
				titleNView && titleNView.show()
				this.showType = true
				this.showPoster = false
				// this.showVideo = true
			},
			// app端 生成名片分享
			generateCard() {
				let gt = this
				let url = `page_order/companyDetails/index?logistics_id=${gt.logistics_id}`
				uni.share({
					provider: 'weixin',
					scene: "WXSceneSession",
					type: 5,
					imageUrl: gt.data.company_info.company_pic,
					title: gt.data.company_info.company_name,
					miniProgram:{
						id: 'gh_f6589072e372',
						path: url,
						type: 0,
						webUrl: "http://uniapp.dcloud.io"
					},
					complete:function(res){
						// console.log("success:" + JSON.stringify(res))
						// gt.closeShare()
					}
				})
			},
			// 分享时获取专线信息
			async getLineInfo() {
				let gt = this
				gt.lines = []
				await gt.gtRequest.post("/logistics/specialline/get_special_line_range", {
					logistics_id: gt.logistics_id
				}).then(res => {
					res.range.forEach(item=> {
						item.child.forEach(obj=> {
							gt.lines.push(obj.name)
						})
					})
				})
			},
			// 分享给 微信好友
			shareFriend() {
				let gt = this
				uni.share({
					provider:'weixin',
					scene:"WXSceneSession",
					type: 2,
					imageUrl: gt.posterUrl,
					success:function(res){
						// console.log("success:" + JSON.stringify(res), this.posterUrl)
					},
					fail:function(err){
						// console.log("fail:" + JSON.stringify(err), this.posterUrl)
						if (err.errCode === 2) {
						    // 微信未登录，唤起登录
						    uni.login({
						        provider: 'weixin',
						        success: (re) => {
						            console.log("登录成功！")
						        },
						        fail: (er) => {
						            // 登录失败回调
									console.log("登录失败！")
						        }
						    })
						}
					},
					complete:function(res){
						// gt.closeShare()
					}
				})
			},
			// 分享给 微信朋友圈
			shareGroup() {
				let gt = this
				uni.share({
					provider:'weixin',
					scene:"WXSceneTimeline",
					type: 2,
					imageUrl: gt.posterUrl,
					success:function(res){
						// console.log("success:" + JSON.stringify(res))
					},
					fail:function(err){
						// console.log("fail:" + JSON.stringify(err))
						if (err.errCode === 2) {
						    // 微信未登录，唤起登录
						    uni.login({
						        provider: 'weixin',
						        success: (re) => {
						            console.log("登录成功！")
						        },
						        fail: (er) => {
						            // 登录失败回调
									console.log("登录失败！")
						        }
						    })
						}
					},
					complete:function(res){
						// gt.closeShare()
					}
				})
			},
			// 保存图片
			saveImg() {
				//获取相册授权
				const _self = this
				uni.showModal({
					title: '提示',
					content: '确定保存到相册吗',
					success: function (res) {
						if (res.confirm) {
							uni.saveImageToPhotosAlbum({
								filePath: _self.posterUrl,
								success: (res) => {
									uni.showModal({
										title: '保存成功！',
										content: '图片已保存到本地相册',
										showCancel: false,
										success: (res) => {
											if (res.confirm) {
												uni.showToast({
													title: '图片保存成功'
												})
											}
										}
									})
								},
								fail: (err) => {
									console.log(err)
								}
							})						
						}
					}
				})							
			},
			// 将图片转为base 64 位url
			turnBase64Image(img, key) {
				uni.getImageInfo({
					src: img,
					success: image => {
						pathToBase64(image.path).then(base64 => {
							this[key] = base64
							// console.log("转换成功", base64)
						}).catch(error => {
							console.log('转换失败', error)
						})
					},
					fail: err => {
					  console.log('将本地图片转为base 64报错', err)
					}
				})
			},
			closeCall() {
				this.showCall =false
				// this.showVideo = true
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
				let gt = this
				if(e === -1) {
					gt.videoMore()
				} else {
					gt.gtCommon.previewImgs(gt.data.company_imgs_all, e)
				}
			},
			swiperChange(e) {
				this.currentNum = e.detail.current + 1
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
					gt.starTrue = res.collect_status ? true : false
					gt.turnBase64Image(res.company_info.company_pic, 'posterShareImg')
					var imgList = [];
					res.company_imgs_all.forEach(item => {
						imgList.push(item += '?x-oss-process=style/sansong_app')
					})
					res.company_imgs_all = [...imgList]
					gt.totalNum = res.company_imgs_all.length
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
					// if(res.company_imgs.company_viedeos.length) imgList.unshift(res.company_imgs.company_viedeos[0].cover + '?x-oss-process=style/sansong_app')
					if(res.company_imgs.company_viedeos.length) {
						gt.isShowVideo = true
						++gt.totalNum
					}
					// gt.companyImgs = imgList
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
					url: './transportScope?logistics_id=' + gt.data.company_info.logistics_id + '&end_province=' + item.end_province
				});
				return false;
			},
			callPhone(phone) {
				let gt = this
				if(gt.gtCommon.isTel(phone)) {
					gt.calll_company()
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
			},
			showLoading() {
				uni.showLoading({
					title: '正在生成海报',
					mask: true
				})	
			},
			async renderFinish(base64) {
				let gt = this
				let oImg = base64.replace(/[\r\n]/g, '')
				// base64ToPath(oImg).then(res=> {
				// 	console.log("*****", res)
				// 	uni.getImageInfo({
				// 		src: res,
				// 		success: (re)=> {
				// 			console.log("/////", re.path)
				// 			gt.gtRequest.upload(re.path).then(r => {
				// 				console.log("-----", r)
				// 				gt.posterUrl = r.src
				// 				gt.showType = false
				// 			})
				// 		}
				// 	})
				// })
				await base64ToPath(oImg).then(res => {
					gt.posterUrl = res
					gt.showType = false
					uni.hideLoading()
				})	
			}
		}
	}
</script>

<script module="html2canvas" lang="renderjs">
import html2canvas from 'html2canvas'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			async create() {
				try {
					this.$ownerInstance.callMethod('showLoading', true);
					const timeout = setTimeout(async ()=> {
						const shareContent = document.querySelector("#poster-view")
						const canvas = await html2canvas(shareContent,{
							width: shareContent.clientWidth,//设置canvas尺寸与所截图尺寸相同，防止白边
							height: shareContent.clientHeight,//防止白边
							scrollY: 0,
							scrollX: 0,
							useCORS: true,
							allowTaint: true
						});
						const base64 = canvas.toDataURL('image/jpeg', 0.5);
						this.$ownerInstance.callMethod('renderFinish', base64);
						clearTimeout(timeout);
					}, 500);
				} catch(error){
					console.log(error)
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.canvasq {
				position: absolute;
				top: -1000px;
				left: -1000px;
			}
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
				position: relative;
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
						.cHeight {
							height: calc(100vh - 88rpx - 132rpx);
						}
						.con_bottom {
							height: 132rpx;
							position: fixed;
							width: 100%;
							bottom: 0;
							background-color: #fff;
							display: flex;
							align-items: center;
							padding: 0 16rpx;
							.flex_left {
								display: flex;
								align-items: center;
								.left_icon {
									width: 120rpx;
									display: flex;
									flex-wrap: wrap;
									justify-content: center;
									.left_img {
										width: 40rpx;
										height: 40rpx;
									}
									.left_name {
										width: 100%;
										color: #909399;
										text-align: center;
										margin-top: 8rpx;
									}
								}
							}
							.flex_right {
								width: 100%;
								.right_btn {
									width: fit-content;
									height: 100rpx;
									line-height: 100rpx;
									background-color: #FFBF27;
									color: #fff;
									padding: 0 60rpx;
									border-radius: 16rpx;
									margin: 0 auto;
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
			.playVideo {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
			.tip-view{
				position: absolute;
				right: 20px;
				bottom: 20px;
				background-color: rgba(0, 0, 0, 0.5);
				width: 60px;
				height: 25px;
				line-height: 25px;
				text-align: center;
				border-radius: 50px;
				font-size: 26rpx;
				color: #FFFFFF;
			}
			.call_view {
				padding-top: 8rpx;
				.call_item {
					padding: 32rpx 0;
					border-bottom: 1rpx solid #e5e5e5;
					&:last-child {
						border-bottom: none;
					}
					.item_name {
						text-align: center;
					}
					.item_val {
						text-align: center;
						color: $gtProjectColor;
					}
				}
			}
			.share_modal {
				height: 250rpx;
				padding: 20rpx 40rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				.share_top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 40rpx;
					.top_title {
						font-size: 32rpx;
						font-weight: 700;
					}
				}
				.share_but {
					padding: 0 100rpx;
					.but_content {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.share-icon {
							width: 64rpx;
							height: 64rpx;
							margin: 0 auto 20rpx;
							image {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
			.poster-modal{
				width: 100%;
				height: 100vh;
				display: flex;
				justify-content: center;
				margin-top: 20rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				.poster-view{
					width: 700rpx;
					height: calc(100% - 250rpx);
					// height: auto;
					overflow: hidden;
					background-color: #485EF4;
					.main-view{
						margin: 30rpx;
						border-radius: 32rpx;
						background-color: #FFFFFF;
						overflow: hidden;
						.bot-view {
							padding: 24rpx;
							.company-view{
								width: 100%;
								height: 136rpx;
								margin-bottom: 24rpx;
								display: flex;
								.left{
									width: 136rpx;
									height: 136rpx;
									margin-right: 24rpx;
									border-radius: 8rpx;
									overflow: hidden;
								}
								.right {
									flex: 1;
									padding: 15rpx 0;
									.poster-cop {
										font-size: 32rpx;
										font-weight: 700;
									}
									.poster-num{
										display: flex;
										margin-top: 28rpx;
										.item-num {
											margin-right: 15rpx;
											font-size: 24rpx;
											color: #909399;
										}
									}
								}
							}
							.other-view {
								width: 100%;
								margin-bottom: 16rpx;
								display: flex;
								justify-content: space-between;
								// align-items: center;
								font-size: 24rpx;
								.left{
									width: 40rpx;
									height: 40rpx;
									margin-right: 24rpx;
								}
								.right{
									flex: 1;
								}
							}
							.share-but-view {
								width: 100%;
								padding-bottom: 24rpx;
								display: flex;
								justify-content: space-between;
								.left {
									flex: 1;
								}
								.right {
									flex: 1;
								}
								.tip {
									text-align: center;
								}
							}
							.flex-con {
								display: flex;
								justify-content: center;
							}
						}
					}
				}
			}
		}
	}
</style>