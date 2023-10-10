<template>
	<view class="gt_content">
		<view v-if="showPage">
			<page-container :show="showPage" :duration="false" :overlay="false" @beforeleave="beforeleave('showPage')"></page-container>
		</view>
		<u-navbar :is-back="true" back-text=" " title-color="#000" title="详情" :custom-back='customBack'></u-navbar>
		<view class="card_">
			<view class="card_port">
				<u-avatar :src="data.headerpic" :size="80" @click="viewCompany(data)"></u-avatar>
			</view>
			<view class="card_content">
				<view class="card_head">
					<view class="company_name" @click.stop="viewCompany(data)">{{ data.company_name || data.nickname  }}</view>
					<view class="company_detail" v-if="role" @click.stop="goCompanyDetail(data)">公司详情</view>
				</view>
				<view class="card_info">
					{{ data.words }}
				</view>
				<view class="cover" v-if="data.cover" @click.stop="playVideo(data.resource[0])">
					<u-image :src="data.cover" mode="widthFix" lazy-load></u-image>
					<u-icon name="play-circle" size="60" color='#FFF' class="playIcon"></u-icon>
				</view>
				<view class="imgList" v-else>
					<view class="imgList" v-if="data.resource.length > 1">
						<view v-for="s in data.resource" :key="s" class="image" :style="{'backgroundImage': `url(${s})`}"
							@click.stop="gtCommon.previewImgs(data.resource, s)"></view>
					</view>
					<view class="cover" v-else>
						<u-image :src="data.resource[0]" mode="widthFix" lazy-load @click.stop="gtCommon.previewImg(data.resource[0])"></u-image>
					</view>
				</view>
				<view class="location" v-if="data.location">{{ data.location }}</view>
				<view class="card_footer">
					<view class="footer_left">
						<view class="creat_time">{{ gtCommon.judgeTime(data.create_time) }}</view>
					</view>
					<view class="footer_right">
						<view class="comment" @click.stop="commentFn(data)">
							<u-icon name="more-circle" size="36"></u-icon>
							<view class="num">{{ data.judgeCount ? data.judgeCount : ' ' }}</view>
						</view>
						<view class="thumbsup" @click.stop="likeFn(data)">
							<u-icon name="thumb-up" :color="data.is_agreed?'#485EF4':''" size="36"></u-icon>
							<view class="num">{{ data.agreeCount ? data.agreeCount : '' }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="likes" v-if="data.agreeList.length">
			<u-icon name="thumb-up" color="#485EF4" size="42"></u-icon>
			<view class="likeName1" v-for="n in data.agreeList" :key="n.create_time"
					@click.stop="viewCompany(n)" :style="{backgroundImage: `url(${n.headerpic})`}">
			</view>
		</view>
		<view class="comments" v-if="data.judgeList.length">
			<view class="comments_item" v-for="n in data.judgeList" :key="n.create_time" @longpress.stop="longtap(n, $event)">
				<text class="likeName" @click.stop="viewCompany(n)">{{ n.name }}</text>
				<text @click.stop="()=> {return false}">{{ n.words }}</text>
			</view>
		</view>
		<u-toast ref="uToast" />
		<!-- 评论 -->
		<input-box ref='input_box' @submit="submitNote" :top='top'></input-box>
		<!-- 长按菜单 -->
		<view class="shade" v-show="showShade" @click.stop="hidePop">
			<view class="pop" :style="popStyle" :class="{'show': showPop}">
				<view @click="copyComment">复制</view>
				<view @click="delComment"
					:style="{display: data.logistics_id == companyInfo.logistics_id ? '' : 'none'}">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	import InputBox from './comment_input.vue'
	export default {
		components: { InputBox },
		data() {
			return {
				showPage: true,
				circleId: 0,
				logistics_id: 0,
				role: null,
				data: {
					headerpic: '',
					resource: [],
					agreeList: [],
					judgeList: []
				},
				companyInfo: {},
				userInfo: {},
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
				top: 50
			}
		},
		onLoad(option) {
			let gt = this
			gt.circleId = option.id
			gt.logistics_id = option.logistics_id
			gt.role = JSON.parse(option.role)
			gt.getWindowSize()
			gt.companyInfo = uni.getStorageSync('companyInfo')
			gt.userInfo = uni.getStorageSync('userInfo')
		},
		onShow() {
			let gt = this
			gt.getData()
		},
		methods: {
			getData() {
				let gt = this
				gt.gtRequest.post('/logistics/circle/circleDetail', {
					circle_id: gt.circleId
				}).then(res => {
					res.agreeList.reverse()
					res.judgeList.reverse()
					res.logistics_id = gt.logistics_id
					gt.data = res
				})
			},
			previewImage(path) {
				uni.previewImage({
					urls: path
				})
			},
			/* 自定义头部返回方法 */
			customBack() {
				uni.switchTab({
					url: './message',
					success() {
						let pages = getCurrentPages()
						let beforePage = pages[0]
						beforePage.$vm.refreshCircle()
					}
				})
			},
			beforeleave() {
				let gt = this
				gt.showPage = false  //这个很重要，一定要先把弹框删除掉
				gt.customBack()
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
			/* 查看公司主页 */
			async viewCompany(record) {
				let gt = this
				let params = {}
				if(record) {
					if(record.logistics_id) {
						await gt.gtRequest.post('/logistics/company/get_company_infother', {
							logistics_id: record.logistics_id
						}).then(res => {
							params = {
								unid: record.unid,
								headerpic: record.headerpic,
								nickname: record.name || record.nickname,
								company_name: record.company_name || res.company_info.company_name,
								company_address: res.company_info.address,
								logistics_id: record.logistics_id
							}
						})
					} else {
						params = {
							unid: record.unid,
							nickname: record.name || record.nickname,
							headerpic: record.headerpic
						}
					}
				} else {
					params = {
						unid: gt.userInfo.login_token,
						headerpic: gt.companyInfo.company_pic,
						nickname: gt.userInfo.nickname,
						company_name: gt.companyInfo.company_name,
						company_address: gt.companyInfo.address,
						logistics_id: gt.companyInfo.logistics_id
					}
				}
				uni.navigateTo({
					url: "./viewCompany?params=" + encodeURIComponent(JSON.stringify(params))
				})
			},
			/* 查看公司详情 */
			goCompanyDetail(record) {
				uni.navigateTo({
					url: "../../subSansong/pages/sansong/companyInfo?logistics_id=" + record.logistics_id
				})
			},
			playVideo(src) {
				uni.navigateTo({
					url: "./videoModal?src=" + src
				})
			},
			/* 评论 */
			commentFn(record) {
				let gt = this
				gt.$refs.input_box.open(true)
				gt.longpressData = record
			},
			submitNote(val) {
				let gt = this
				gt.gtRequest.post('/logistics/circle/judge', {
					circle_id: gt.circleId,
					words: val
				}).then(res => {
					gt.$refs.uToast.show({
						title: '评论成功！',
						type: 'success'
					})
					gt.updateComment()
				})
			},
			updateComment() {
				let gt = this
				// 更新当前这条圈子的评论列表
				gt.gtRequest.post('/logistics/circle/judgeList', {
					circle_id: gt.circleId,
					page: 1,
					limit: 999
				}).then(res => {
					gt.data.judgeCount = res.list.length
					gt.data.judgeList = res.list.reverse()
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
						circle_id: gt.circleId
					}).then(res=> {
						gt.longpressData.is_agreed = !gt.longpressData.is_agreed
						if(gt.longpressData.is_agreed) {
							// 点赞
							gt.longpressData.agreeList.push({
								circle_id: gt.circleId,
								logistics_id: gt.companyInfo.logistics_id,
								name: gt.userInfo.nickname,
								headerpic: gt.userInfo.headerpic
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
					circle_id: gt.circleId,
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
		}
	}
</script>

<style lang="scss">
	.gt_content {
		padding: 24rpx 35rpx 20rpx 16rpx;
	}
	.card_ {
		margin-bottom: 18rpx;
		display: flex;
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
						margin-left: 16rpx;
					}
					.num {
						min-width: 30rpx;
						display: inline-block;
						margin-left: 16rpx;
					}
				}
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
	.likes {
		display: flex;
		flex-wrap: wrap;
		.likeName1 {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-left: 20rpx;
			margin-top: 20rpx;
			background-repeat: no-repeat;
			background-size: cover;
		}
	}
	.comments {
		.likeName {
			margin-left: 0;
			margin-right: 16rpx;
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