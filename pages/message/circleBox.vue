<template>
	<view class="circleBox">
		<dragButton @clickBtn="show = true" v-if="!unid">
			<image :src="gtCommon.getOssImg('message/action.png')" class="float"></image>
		</dragButton>
		<scroll-view scroll-y @scrolltolower="loadingMore" :class="unid ? 'scrollView1' : 'scrollView'">
			<template v-if="list.length">
				<view class="userInfo">
					<view class="user_info">
						<view class="userInfo_name" @click="viewCompany">{{ companyInfo.company_name }}</view>
						<u-avatar :src="companyInfo.company_pic" :size="160" @click="viewCompany"></u-avatar>
					</view>
				</view>
				<view class="content">
					<view class="card_" v-for="item in list" :key="item.circle_id">
						<view class="card_port">
							<u-avatar :src="item.headerpic" :size="80" @click="viewCompany(item)"></u-avatar>
						</view>
						<view class="card_content" @click.stop="viewDetail(item)">
							<view class="card_head">
								<view class="company_name" @click.stop="viewCompany(item)">{{ item.company_name }}</view>
								<view class="company_detail" v-if="companyInfo.logistics_id == item.logistics_id"
										@click.stop="goCompanyDetail(item)">公司详情</view>
							</view>
							<view class="card_info">
								{{ item.words }}
							</view>
							<view class="cover" v-if="item.cover">
								<u-image :src="item.cover" mode="widthFix" lazy-load @click.stop="playVideo(item.resource[0])"></u-image>
								<u-icon name="play-circle" size="60" color='#FFF' class="playIcon"></u-icon>
							</view>
							<view class="imgList" v-else>
								<template v-if="item.resource.length > 1">
									<view v-for="s in item.resource" :key="s" class="image" :style="{'backgroundImage': `url(${s})`}"
										@click.stop="gtCommon.previewImg(s)"></view>
								</template>
								<view class="cover" v-else>
									<u-image :src="item.resource[0]" mode="widthFix" lazy-load @click.stop="gtCommon.previewImg(item.resource[0])"></u-image>
								</view>
							</view>
							<view class="location" v-if="item.location">{{ item.location }}</view>
							<view class="card_footer">
								<view class="footer_left">
									<view class="creat_time">{{ gtCommon.judgeTime(item.create_time) }}</view>
									<view class="delete" v-if="companyInfo.logistics_id == item.logistics_id" @click.stop="delCircle(item)">删除</view>
								</view>
								<view class="footer_right">
									<view class="comment" @click.stop="commentFn(item)">
										<u-icon name="more-circle" size="36"></u-icon>
										<view class="num" v-if="item.judgeCount">{{ item.judgeCount }}</view>
									</view>
									<view class="thumbsup" @click.stop="likeFn(item)">
										<u-icon name="thumb-up" :color="item.is_agreed?'#485EF4':''" size="36"></u-icon>
										<view class="num" v-if="item.agreeCount">{{ item.agreeCount }}</view>
									</view>
								</view>
							</view>
							<view class="likes" v-if="item.agreeList.length">
								<u-icon name="thumb-up" color="#485EF4" size="36"></u-icon>
								<text class="likeName" v-for="n in item.agreeList" :key="n.create_time" @click.stop="viewCompany(n, true)">{{ n.name }}</text>
							</view>
							<view class="comments" v-if="item.judgeList.length">
								<view class="comments_item" v-for="n in item.judgeList" :key="n.create_time" @longpress.stop="longtap(n, $event)">
									<text class="likeName">{{ n.name }}</text>
									<text>{{ n.words }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" />	
			</template>
			<view class="con_empty" v-else>
				<u-empty text="暂无数据" color="#000" :src="gtCommon.getOssImg('index/empty.png')" icon-size="550"
					margin-top="200" font-size="32"></u-empty>
			</view>
		</scroll-view>
		<u-toast ref="uToast" />
		<u-modal v-model="modal_show" @confirm='del_confirm' content="确定删除吗？" :show-cancel-button='true'></u-modal>
		<!-- 长按菜单 -->
		<view class="shade" v-show="showShade" @click.stop="hidePop">
			<view class="pop" :style="popStyle" :class="{'show': showPop}">
				<view @click="copyComment">复制</view>
				<view @click="delComment">删除</view>
			</view>
		</view>
		<!-- 评论 -->
		<input-box ref='input_box' @submit="submitNote"></input-box>
		<!-- 发布圈子 -->
		<choose-media :show.sync='show' @chooseMedia='chooseMedia'></choose-media>
		<!-- 播放视频 -->
		<video-modal :show.sync='videoShow' :src='videoSrc'></video-modal>
	</view>
</template>

<script>
	import InputBox from './comment_input.vue'
	import DragButton from './dragButton.vue'
	import ChooseMedia from './chooseMedia.vue'
	import VideoModal from './videoModal.vue'
	export default {
		components: { InputBox, DragButton, ChooseMedia, VideoModal },
		props: {
			unid: {
				type: String || Number,
				default: ''
			}
		},
		data() {
			return {
				companyInfo: {},
				userInfo: {},
				params: {},
				list: [],
				status: 'loading',
				show: false,
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗定位样式 */
				popStyle: "",
				/* 长按选中对象*/
				longpressData: {},
				modal_show: false,
				videoShow: false,
				videoSrc: ''
			}
		},
		mounted() {
			let gt = this
			gt.showFn()
		},
		methods: {
			showFn() {
				let gt = this
				if(gt.unid) {
					gt.params = {
						page: 1,
						limit: 10,
						keyword_unid: gt.unid
					}
				} else {
					gt.params = {
						page: 1,
						limit: 10,
						keyword_role: 1
					}
				}
				gt.list = []
				gt.getList_circle()
				gt.getWindowSize()
				gt.companyInfo = uni.getStorageSync('companyInfo')
				gt.userInfo = uni.getStorageSync('userInfo')
			},
			getList_circle() {
				let gt = this
				gt.gtRequest.post('/logistics/circle/list', gt.params).then(res => {
					res.list.forEach(obj=> {
						// 评论排序反了
						obj.judgeList.reverse()
					})
					gt.list = [...gt.list, ...res.list]
					gt.status = gt.params.page >= res.totalPage ? 'nomore' : 'loading'
				})
			},
			loadingMore() {
				let gt = this
				if(gt.status === 'nomore') return
				++gt.params.page
				gt.getList_circle()
			},
			playVideo(src) {
				let gt = this
				gt.videoSrc = src
				gt.videoShow = true
			},
			/* 查看圈子详情 */
			viewDetail(record) {
				console.log(record)
			},
			/* 查看公司详情 */
			goCompanyDetail(record) {
				uni.navigateTo({
					url: "../../subSansong/pages/sansong/companyInfo?logistics_id=" + record.logistics_id
				})
			},
			/* 查看公司主页 */
			async viewCompany(record, type) {
				let gt = this
				if(type) {
					await gt.gtRequest.post('/logistics/company/get_company_infother', {
						logistics_id: record.logistics_id
					}).then(res => {
						record.company_name = res.company_info.company_name
						record.company_address = res.company_info.address
					})
				}
				if(record) {
					uni.navigateTo({
						url: "./viewCompany?keyword_unid=" + record.unid + '&headerpic=' + record.headerpic
						 + '&nickname=' + (record.nickname || record.name) + '&company_name=' + record.company_name
						 + '&company_address=' + record.company_address + '&logistics_id=' + record.logistics_id
					})
				} else {
					uni.navigateTo({
						url: "./viewCompany?keyword_unid=" + gt.userInfo.login_token + '&headerpic=' + gt.companyInfo.company_pic
						 + '&nickname=' + gt.userInfo.nickname + '&company_name=' + gt.companyInfo.company_name
						 + '&company_address=' + gt.companyInfo.address + '&logistics_id=' + gt.companyInfo.logistics_id
					})
				}
			},
			/* 删除圈子 */
			delCircle(record) {
				let gt = this
				gt.modal_show = true
				gt.longpressData = record
			},
			del_confirm() {
				let gt = this
				gt.gtRequest.post('/logistics/circle/delCircle', {
					circle_id: gt.longpressData.circle_id
				}).then(res => {
					gt.list = gt.list.filter(item=> item.circle_id !== gt.longpressData.circle_id)
					gt.modal_show = false
					gt.$refs.uToast.show({
						title: '删除成功！'
					})
				})
			},
			/* 点赞 */
			likeFn(record) {
				let gt = this
				let Fn = gt.gtCommon.debounce(()=> {
					gt.longpressData = record
					let url = ''
					if(gt.longpressData.is_agreed) {
						// 已点赞，取消点赞
						url = '/logistics/circle/cancelAgree'
					} else {
						// 未点赞
						url = '/logistics/circle/agree'
					}
					gt.gtRequest.post(url, {
						circle_id: gt.longpressData.circle_id
					}).then(res=> {
						gt.longpressData.is_agreed = !gt.longpressData.is_agreed
						if(gt.longpressData.is_agreed) {
							// 点赞
							gt.longpressData.agreeList.push({
								circle_id: gt.longpressData.circle_id,
								logistics_id: gt.companyInfo.logistics_id,
								name: gt.companyInfo.company_name
							})
							++gt.longpressData.agreeCount
						} else {
							// 取消点赞
							gt.longpressData.agreeList = gt.longpressData.agreeList.filter(item=> item.logistics_id != gt.companyInfo.logistics_id)
							--gt.longpressData.agreeCount
						}
					})
				}, 600)
				Fn()
			},
			/* 评论 */
			commentFn(record) {
				let gt = this
				gt.$refs.input_box.open()
				gt.longpressData = record
			},
			submitNote(val) {
				let gt = this
				gt.gtRequest.post('/logistics/circle/judge', {
					circle_id: gt.longpressData.circle_id,
					words: val
				}).then(res => {
					gt.$refs.uToast.show({
						title: '评论成功！',
						type: 'success'
					})
					gt.updateComment()
				})
			},
			/* 复制和删除 */
			copyComment() {
				let gt = this
				uni.setClipboardData({
					data: gt.longpressData.words,
				})
				gt.$refs.uToast.show({
					title: '复制成功！',
					type: 'success'
				})
				gt.hidePop()
			},
			async delComment() {
				let gt = this
				gt.hidePop()
				await gt.gtRequest.post('/logistics/circle/delJudge', {
					circle_id: gt.longpressData.circle_id,
					create_time: gt.longpressData.create_time
				}).then(res => {
					gt.$refs.uToast.show({
						title: '删除成功'
					})
				}).catch(err=> {
					gt.$refs.uToast.show({
						title: '删除失败'
					})
				})
				gt.updateComment()
			},
			updateComment() {
				let gt = this
				// 更新当前这条圈子的评论列表
				gt.gtRequest.post('/logistics/circle/judgeList', {
					circle_id: gt.longpressData.circle_id,
					page: 1,
					limit: 999
				}).then(res => {
					gt.list.forEach(item=> {
						if(item.circle_id === gt.longpressData.circle_id) {
							item.judgeList = res.list.reverse()
						}
					})
				})
			},
			/* 获取窗口尺寸 */
			getWindowSize() {
				let gt = this
				uni.getSystemInfo({
					success: (res) => {
						gt.winSize = {
							witdh: res.windowWidth,
							height: res.windowHeight
						}
					}
				})
			},
			/* 长触菜单 */
			longtap(item, e) {
				let gt = this
				gt.longpressData = item
				let [touches, style, index] = [e.touches[0], "", e.currentTarget.dataset.index]
				// 触屏点在下半屏，菜单往上展开
				if (touches.clientY > (gt.winSize.height / 2)) {
					style = `bottom:${gt.winSize.height-touches.clientY}px;`
				} else {
					style = `top:${touches.clientY-80}px;`
				}
				// 触屏点在右半屏，菜单往左展开
				if (touches.clientX > (gt.winSize.witdh / 2)) {
					style += `right:${gt.winSize.witdh-touches.clientX}px;`
				} else {
					style += `left:${touches.clientX}px;`
				}
				gt.popStyle = style
				gt.showShade = true
				gt.$nextTick(() => {
					setTimeout(() => {
						gt.showPop = true
					}, 250)
				})
			},
			hidePop() {
				let gt = this
				gt.showPop = false
				setTimeout(() => {
					gt.showShade = false
				}, 250)
			},
			chooseMedia(type) {
				let gt = this
				if(type) {
					uni.chooseVideo({
						sourceType: ['camera', 'album'],
						success: function (res) {
							uni.navigateTo({
								url: './publishCircle?type=1&fileList=' + res.tempFilePath
							})
						}
					})
				} else {
					uni.chooseImage({
						count: 9,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], //从相册选择
						success: function (res) {
							uni.navigateTo({
								url: './publishCircle?type=0&fileList=' + res.tempFilePaths
							})
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
.circleBox {
	background-color: #fff;
	font-family: PingFangSC-Regular, PingFang SC;
	.userInfo {
		position: relative;
		width: 100%;
		height: 430rpx;
		background-image: url('https://baohusan-uisource.oss-cn-shanghai.aliyuncs.com/mp-transport/message/groupBg.png');
		background-repeat: no-repeat;
		background-size: cover;
		margin-bottom: 140rpx;
		.user_info {
			position: absolute;
			right: 32rpx;
			bottom: -80rpx;
			display: flex;
			align-items: center;
			.userInfo_name {
				font-weight: 700;
				margin-right: 20rpx;
				margin-top: -60rpx;
			}
		}
	}
	.content {
		.card_ {
			border-bottom: 2rpx solid #f2f2f2;
			margin-bottom: 18rpx;
			display: flex;
			padding: 0 35rpx 20rpx 16rpx;
			.card_port {
				margin-right: 20rpx;
			}
			.card_content {
				width: 100%;
				.card_head {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: $gtProjectColor;
					.company_name {
						font-weight: 700;
					}
				}
				.card_info {
					color: #000;
					margin: 16rpx 0;
				}
				.imgList {
					display: flex;
					flex-wrap: wrap;
					.image {
						width: 184rpx;
						height: 184rpx;
						margin-right: 6rpx;
						margin-top: 6rpx;
						border-radius: 16rpx;
						background-repeat: no-repeat;
						background-size: cover;
						&:nth-child(3n) {
							margin-right: 0;
						}
						&:nth-child(-n+3) {
							margin-top: 0;
						}
					}
				}
				.cover {
					width: 320rpx;
					position: relative;
					.playIcon {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}
				.location {
					color: $gtProjectColor;
					margin-top: 20rpx;
				}
				.card_footer {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 20rpx;
					color: #909399;
					.footer_left {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.delete {
							color: $gtProjectColor;
							margin-left: 20rpx;
						}
					}
					.footer_right {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.comment {
							
						}
						.thumbsup {
							margin-left: 36rpx;
						}
						.num {
							display: inline-block;
							margin-left: 16rpx;
						}
					}
				}
				.likes,
				.comments {
					background-color: #F3F4F5;
					border-radius: 16rpx;
					padding: 16rpx 24rpx;
					margin-top: 20rpx;
					.likeName {
						color: $gtProjectColor;
						margin-left: 16rpx;
					}
				}
				.comments {
					.likeName {
						margin-left: 0;
						margin-right: 16rpx;
					}
				}
			}
		}
	}
	.u-more {
		margin: 36rpx 0;
	}
	.scrollView {
		height: calc(100vh - 170rpx);
	}
	.scrollView1 {
		height: 100vh;
	}
	.float {
		width: 100%;
		height: 100%;
	}
	.con_empty {
		width: 750rpx;
		text-align: center;
	}
}
/* 遮罩 */
.shade {
 	position: fixed;
 	z-index: 100;
 	top: 0;
 	right: 0;
 	bottom: 0;
 	left: 0;
 	-webkit-touch-callout: none;
 	.pop {
 		position: fixed;
 		z-index: 101;
 		width: 188rpx;
 		box-sizing: border-box;
 		font-size: 28rpx;
 		text-align: left;
 		color: #333;
 		background-color: #fff;
 		box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
 		line-height: 80rpx;
 		transition: transform 0.15s ease-in-out 0s;
 		user-select: none;
 		-webkit-touch-callout: none;
 		transform: scale(0, 0);
 		&.show {
 			transform: scale(1, 1);
 		}
 		&>view {
 			padding: 10rpx 20rpx;
 			overflow: hidden;
 			text-overflow: ellipsis;
 			white-space: nowrap;
 			user-select: none;
 			-webkit-touch-callout: none;
			font-size: 30rpx;
 			&:active {
 				background-color: #f3f3f3;
 			}
 		}
 	}
}
/* #ifndef APP-NVUE */
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	// background-color: $uni-bg-color-grey;
	min-height: 100%;
	height: auto;
}
.uni-list-item__container:after {
	// left: $uni-img-size-xl+$uni-spacing-row-lg !important;
}
.uni-list-item__container {
	padding-left: 0 !important;
}
/* #endif */
</style>