<template>
	<view class="gt_content">
		<view class="main">
			<textarea v-model.trim="value" :maxlength='500' class="textarea" placeholder='说点什么~'></textarea>
			<view class="count">{{ value.length + '/' + 500 }}</view>
			<view class="upload">
				<!-- 图片 -->
				<template v-if="type === 0">
					<u-upload ref="uUpload" :file-list="fileList" :auto-upload="false" :max-count='maxCount'
							@on-choose='uploadImg' @on-remove='del' :custom-btn="true" show-progress>
						<view class="upload_item" slot="addBtn" hover-class="slot-btn__hover" hover-stay-time="150">
							<view class="none">
								<image :src="gtCommon.getOssImg('message/upload.png')" mode="widthFix"></image>
								<text class="msg">照片/视频</text>
							</view>
						</view>
					</u-upload>
				</template>
				<!-- 视频 -->
				<view class="upload_item" v-if="cover">
					<view class="img" :style="{ backgroundImage: `url(${cover})` }" @click="videoPlay(fileList[0].url)"></view>
					<u-icon name="close-circle-fill" color="#ff6166" size="32" class="icon1" @click="del(0)"></u-icon>
					<u-icon name="play-circle" size="60" color='#fff' class="playIcon" @click="videoPlay(fileList[0].url)"></u-icon>
				</view>
				<view class="upload_item" @click='uploadFile' v-if="type === -1">
					<view class="none">
						<image :src="gtCommon.getOssImg('message/upload.png')" mode="widthFix"></image>
						<text class="msg">照片/视频</text>
					</view>
				</view>
			</view>
			<view class="location">
				<view class="location_left">
					<u-icon name="map" size="40" class="icon"></u-icon>
					<text>所在位置</text>
				</view>
				<view class="location_right" @click="locationFn">
					<text class="location_name" v-if="locationInfo.latitude">{{ locationInfo.name }}</text>
					<text class="location_name" v-else>选择位置</text>
					<u-icon name="arrow-right" size="32" class="icon"></u-icon>
				</view>
			</view>
		</view>
		<view class="footer">
			<u-button type="primary" @click="submit"
					:disabled="!value.length || !fileList.length || (type === 0 && $refs.uUpload.lists.some(a=> !a.progress))">发布</u-button>
		</view>
		<u-toast ref="uToast" />
		<choose-media :show.sync='show' @chooseMedia='chooseMedia'></choose-media>
	</view>
</template>

<script>
	import ChooseMedia from './chooseMedia.vue'
	export default {
		components: { ChooseMedia },
		data() {
			return {
				fileList: [],
				value: '',
				show: false,
				type: -1,
				cover: '',
				maxCount: 9,
				locationInfo: {},
				cache: []
			}
		},
		onLoad(option) {
			let gt = this
			gt.type = JSON.parse(option.type)
			if(gt.type) {
				gt.uploadVdieoPath(option.fileList)
			} else {
				let list = option.fileList.split(',')
				gt.uploadImgPath(list)
			}
		},
		methods: {
			/* 从列表带过来的照片 */
			uploadImgPath(paths) {
				let gt = this
				paths.forEach(path=> {
					gt.gtRequest.upload({path}).then(res => {
						gt.audit(1, res.src)
					})
				})
			},
			/* 上传照片 */
			uploadImg(file) {
				let gt = this
				gt.cache.push(file.fileInfo.path)
				gt.gtRequest.upload(file.fileInfo).then(res => {
					gt.audit(1, res.src, undefined, file.fileInfo.path)
				})
			},
			/* 上传视频 */
			uploadVdieoPath(path) {
				let gt = this
				gt.gtRequest.upload({
					path,
					sign: 'cover'
				}).then(res => {
					gt.audit(2, res.src, res.title)
				})
			},
			/* 审核 */
			audit(type, content, other, str) {
				let gt = this
				gt.gtRequest.post('/api/upload/baiduCheck', {
					type,
					content
				}).then(res => {
					gt.type = type - 1
					// 如果是视频会返回cover封面
					if(gt.type) {
						gt.cover = other
					} else {
						// let i = gt.$refs.uUpload.lists.indexOf(item=> item.url === str)
						// if(i !== -1) gt.$refs.uUpload.lists.splice(i, 1)
						for (let i = 0; i < gt.$refs.uUpload.lists.length; i++) {
							if(gt.$refs.uUpload.lists[i].url === str) {
								// console.log(gt.$refs.uUpload.lists, gt.fileList)
								gt.$refs.uUpload.lists.splice(i, 1)
								break
							}
						}
						// gt.$refs.uUpload.lists = gt.$refs.uUpload.lists.filter(item=> item.progress)
					}
					gt.fileList.push({url: content})
				})
			},
			/* 删除 */
			del(index) {
				let gt = this
				gt.fileList.splice(index, 1)
				if(!gt.fileList.length) gt.type = -1
				gt.cover = ''
			},
			uploadFile() {
				let gt = this
				if(gt.type > -1) {
					gt.chooseMedia(gt.type)
				} else {
					gt.show = true
				}
			},
			chooseMedia(type) {
				let gt = this
				if(type) {
					uni.chooseVideo({
						sourceType: ['camera', 'album'],
						maxDuration: 30,
						success: function (res) {
							gt.uploadVdieoPath(res.tempFilePath)
						}
					})
				} else {
					uni.chooseImage({
						count: 9 - gt.fileList.length,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], //从相册选择
						success: function (res) {
							gt.uploadImgPath(res.tempFilePaths)
						}
					})
				}
			},
			locationFn() {
				let gt = this
				uni.chooseLocation({ 
				    success:(res)=> { 
						gt.locationInfo = res
				    },
				    fail:()=> { 
				        // 如果用uni.chooseLocation没有获取到地理位置，则需要获取当前的授权信息，判断是否有地理授权信息
				        uni.getSetting({ 
				            success:(res)=> { 
				                var status = res.authSetting
				                if(!status['scope.userLocation']) { 
				                // 如果授权信息中没有地理位置的授权，则需要弹窗提示用户需要授权地理信息
				                    uni.showModal({ 
				                        title:"是否授权当前位置",
				                        content:"需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
				                        success:(tip)=> { 
				                            if(tip.confirm) { 
				                            // 如果用户同意授权地理信息，则打开授权设置页面，判断用户的操作
				                                uni.openSetting({ 
				                                    success:(data)=> { 
				                                    // 如果用户授权了地理信息在，则提示授权成功
				                                        if(data.authSetting['scope.userLocation'] === true) { 
				                                            uni.showToast({ 
				                                                title:"授权成功",
				                                                icon:"success",
				                                                duration:1000
				                                            })
				                                            // 授权成功后，然后再次chooseLocation获取信息
				                                            uni.chooseLocation({ 
				                                                success:(res)=> { 
				                                                   gt.locationInfo = res
				                                                }
				                                            })
				                                        } else { 
				                                            uni.showToast({ 
				                                                title:"授权失败",
				                                                icon:"none",
				                                                duration:1000
				                                            })
				                                        }
				                                    }
				                                })
				                            }
				                        }
				                    })
				                }
				            },
				            fail: (res) => { 
				                uni.showToast({ 
				                    title: "调用授权窗口失败",
				                    icon: "none",
				                    duration: 1000
				                })
				            }
				        })
				    }
				})
			},
			videoPlay(src) {
				uni.navigateTo({
					url: "./videoModal?src=" + src
				})
			},
			submit() {
				let gt = this
				let arr = []
				gt.fileList.forEach(item=> {
					arr.push(item.url)
				})
				gt.gtRequest.post('/logistics/circle/publish', {
					role: 1,
					resource_type: gt.type, // 0：图片，1：视频
					words: gt.value,
					resource: arr.join(','),
					location: gt.locationInfo.name || '',
					cover: gt.cover
				}).then(res => {
					gt.$refs.uToast.show({
					    title: "发布成功",
					    type: "success",
					    back: true
					})
					setTimeout(()=> {
						uni.switchTab({
							url: './message',
							success() {
								let pages = getCurrentPages()
								let beforePage = pages[0]
								beforePage.$vm.refreshCircle()
							}
						})
					}, 1500)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
		font-family: PingFangSC-Regular, PingFang SC;
		.gt_content {
			padding: 16rpx;
			.main {
				height: calc(100vh - 190rpx);
				overflow: auto;
			}
			.textarea {
				width: calc(100% - 32rpx);
				margin: 20rpx;
			}
			.count {
				width: 100%;
				color: #909399;
				text-align: right;
			}
			.upload {
				margin: 52rpx 0;
				display: flex;
				flex-wrap: wrap;
				.upload_item {
					width: 200rpx;
					height: 200rpx;
					position: relative;
					border-radius: 16rpx;
					border: 2rpx dashed #D6D6D6;
					margin: 10rpx;
					// margin-left: 28rpx;
					// margin-top: 28rpx;
					// &:nth-child(3n-2) {
					// 	margin-left: 0;
					// }
					// &:nth-child(-n + 3) {
					// 	margin-top: 0;
					// }
					.img {
						width: 100%;
						height: 100%;
						background-repeat: no-repeat;
						background-size: cover;
						border-radius: 16rpx;
					}
					.icon1 {
						position: absolute;
						right: 0;
						top: 0;
						transform: translate(50%, -50%);
					}
					.playIcon {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
					.none {
						display: flex;
						justify-content: center;
						flex-wrap: wrap;
						margin-top: 64rpx;
						image {
							width: 48rpx;
							height: 48rpx;
						}
						.msg {
							display: block;
							text-align: center;
							color: #909399;
							font-size: 24rpx;
							margin-top: 16rpx;
						}
					}
				}
			}
			.location {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 120rpx;
				border-bottom: 2rpx solid #f2f2f2;
				border-top: 2rpx solid #f2f2f2;
				.location_left {
					width: 200rpx;
				}
				.location_right {
					width: calc(100% - 220rpx);
					display: flex;
					margin-left: 20rpx;
					color: #909399;
					.location_name {
						width: calc(100% - 72rpx);
						text-align: right;
						text-overflow: ellipsis;
						overflow: hidden;
						-webkit-line-clamp: 2;
						display: -webkit-box;
						-webkit-box-orient: vertical;
					}
				}
				.icon {
					vertical-align: middle;
					margin: 0 20rpx;
				}
			}
			.footer {
				width: calc(100% - 80rpx);
				position: fixed;
				bottom: 60rpx;
				margin-left: 16rpx;
			}
		}
	}
</style>