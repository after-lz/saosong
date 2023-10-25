<template>
	<view class="gt_content">
		<view class="headPortrait" @click="show = true">
			<u-avatar :src="headerpic" size="large"></u-avatar>
			<view class="headMsg">点击头像更换</view>
		</view>
		<view class="con_list">
			<view class="con_item" @click="editName">
				<view class="con_text">
					<text>姓名</text>
				</view>
				<view class="con_icon con_icon1">
					<view>{{ userInfo.nickname }}</view>
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item" @click="show_sex = true">
				<view class="con_text">
					<text>性别</text>
				</view>
				<view class="con_icon">
					<text>{{ SexName }}</text>
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item" @click="goAuth">
				<view class="con_text">
					<text>实名认证</text>
				</view>
				<view class="con_icon">
					<text>{{ is_approve }}</text>
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item" @click="goCompanyAuth">
				<view class="con_text">
					<text>公司认证</text>
				</view>
				<view class="con_icon">
					<text>{{ is_company_approve }}</text>
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="con_item" @click="show_pca = true">
				<view class="con_text">
					<text>所在城市</text>
				</view>
				<view class="con_icon">
					<text>{{ userInfo.city }}</text>
					<u-icon name="arrow-right" color="#000"></u-icon>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" border-radius="14">
			<view class="label" @click="photograph">拍照</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="label" @click="photoAlbum">相册</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="label" @click="headerPhoto">选择头像</view>
			<view class="con_line">
				<u-line length="718rpx" color="#f2f2f2" margin="0 16rpx"></u-line>
			</view>
			<view class="label" @click="show = false">取消</view>
		</u-popup>
		<u-popup v-model="show_Photo" mode="bottom" border-radius="14">
			<view class="photo_title">
				<view class="photo_title_msg">选择头像</view>
				<view @click="show_Photo = false"><u-icon name="close" size="28"></u-icon></view>
			</view>
			<view class="photo_content">
				<image
					:src="item.path"
					v-for="item in photoList" :key="item.pic_id"
					@click="chosePhoto(item.path)">
				</image>
			</view>
		</u-popup>
		<u-select v-model="show_sex" :list="sexList" @confirm="sexConfirm"></u-select>
		<u-popup v-model="show_pca" mode="bottom" height="668" :mask-close-able='false'>
			<view class="confirm">
				<view class="close" @click="confirm(false)">取消</view>
				<view class="ok" @click="confirm(true)">确认</view>
			</view>
			<gtPCA :pcaList="provinceCityAreaList" height="600rpx" :show="show_pca" :selectedList="fromPca"
				   :allArea="false" @gtPCASelect="gtPCASelect" :hideDC="true"></gtPCA>
		</u-popup>
		<u-toast ref="uToast" />
		<!-- #ifdef MP-WEIXIN -->
		<u-modal v-model="aut_show" :show-title='false' confirm-text='确认'>
			<view class="slot-content aut_info">
				<view class="aut_title">请下载伞送物流App</view>
				<view class="aut_content">为提供更好的服务,请下载伞送物流App</view>
			</view>
		</u-modal>
		<!-- #endif -->
	</view>
</template>

<script>
	import gtPCA from "@/components/gt-pca/gt-pca.vue"
	export default {
		components: { gtPCA },
		data() {
			return {
				userInfo: {},
				companyInfo: {},
				show: false,
				show_Photo: false,
				photoList: [],
				show_sex: false,
				sexList: [
					{
						value: 1,
						label: '男'
					},
					{
						value: 0,
						label: '女'
					},
				],
				show_pca: false,
				provinceCityAreaList: [],
				fromPca: [
					[{
						cityName: '',
					}],
					[{
						cityName: '',
					}],
					[{
						cityName: '',
					}],
				],
				flag: false,
				aut_show: false
			}
		},
		onLoad() {
			let gt = this
			// #ifdef APP-PLUS
			// 扩展API加载完毕后调用onPlusReady回调函数
			// document.addEventListener("plusready", gt.onPlusReady, false)
			// #endif
			uni.getStorage({
				key: 'pcaList',
				success: function(res) {
					gt.provinceCityAreaList = res.data
				}
			})
		},
		onShow() {
			let gt = this
			gt.userInfo = uni.getStorageSync('user_info')
			gt.companyInfo = uni.getStorageSync('companyInfo')
		},
		computed: {
			headerpic() {
				let gt = this
				return gt.gtCommon.getOssImg('user/defaultHeadImg.png') && gt.userInfo.headerpic
			},
			SexName() {
				let gt = this
				let type = 2 && gt.userInfo.sex
				switch (type) {
					case 0:
						return '女'
					case 1:
						return '男'
					default:
						return '去设置'
				}
			},
			is_approve() {
				let gt = this
				// return gt.userInfo.is_approve ? '已认证' : '去认证'
				return uni.getStorageSync('userAuth') ? '已认证' : '去认证'
			},
			is_company_approve() {
				let gt = this
				return gt.companyInfo.is_company_approve ? '已认证' : '去认证'
			},
		},
		methods: {
			photograph() {
				let gt = this
				// #ifdef MP-WEIXIN
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有, 
					sourceType: ['camera'], //打开相机
					success: function (file) {
						gt.gtRequest.upload(file.tempFiles[0]).then(async res => {
							await gt.updateUserInfo({
								update_type: 'headerpic',
								value: res.src
							})
							gt.userInfo.headerpic = res.src
							gt.updateStorage()
						})
					}
				})
				// #endif
				// #ifdef APP-PLUS
				var cmr = plus.camera.getCamera()
				var res = cmr.supportedImageResolutions[0]
				var fmt = cmr.supportedImageFormats[0]
				cmr.captureImage(function(p) {
					plus.io.resolveLocalFileSystemURL(p, function (entry) {
					    //通过临时路径，获得文件系统中的文件对象entry
					    entry.file(function (file) {
					        // 可通过entry对象的file方法，获取文件数据对象（该文件数据对象仍无法直接使用）
							// file.name
							gt.gtRequest.upload({path: entry.toLocalURL()}).then(async rs => {
								await gt.updateUserInfo({
									update_type: 'headerpic',
									value: rs.src
								})
								gt.userInfo.headerpic = rs.src
								gt.updateStorage()
							})
					    })
					})
				},
				function(error) {
					gt.$refs.uToast.show({
						title: error.message,
						type: 'error'
					})
				},
				{resolution: res, format: fmt})
				// #endif
			},
			photoAlbum() {
				let gt = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (file) {
						gt.gtRequest.upload(file.tempFiles[0]).then(async res => {
							await gt.updateUserInfo({
								update_type: 'headerpic',
								value: res.src
							})
							gt.userInfo.headerpic = res.src
							gt.updateStorage()
						})
					}
				})
			},
			headerPhoto() {
				let gt = this
				gt.gtRequest.post("/api/appgobal/get_default_headerpic_list", {platform: 'logistics'}).then(res => {
					gt.photoList = res.list
				})
				gt.show = false
				gt.show_Photo = true
			},
			// 扩展API加载完毕，现在可以正常调用扩展API
			onPlusReady() {
				console.log("plusready")
			},
			async updateUserInfo(obj, msg) {
				let gt = this
				await gt.gtRequest.post("/logistics/user/update_user_info", obj).then(res => {
					gt.show = false
					gt.$refs.uToast.show({
						title: '更新成功',
						type: 'success'
					})
				}).catch(()=> {
					gt.show = false
					gt.$refs.uToast.show({
						title: '更新失败',
						type: 'error'
					})
				})
			},
			updateStorage() {
				let gt = this
				uni.setStorageSync('user_info', gt.userInfo)
				uni.setStorageSync('companyInfo', gt.companyInfo)
			},
			async chosePhoto(path) {
				let gt = this
				await gt.updateUserInfo({
					update_type: 'headerpic',
					value: path
				})
				gt.userInfo.headerpic = path
				gt.updateStorage()
				gt.show_Photo = false
			},
			editName() {
				let gt = this
				uni.navigateTo({
					url: './editNickName?name=' + gt.userInfo.nickname
				})
			},
			async sexConfirm(e) {
				let gt = this
				await gt.updateUserInfo({
					update_type: 'sex',
					value: e[0].value
				})
				gt.userInfo.sex = e[0].value
				gt.updateStorage()
			},
			goAuth() {
				let gt = this
				if(uni.getStorageSync('userAuth')) return gt.$refs.uToast.show({
					title: '已认证'
				})
				// #ifdef MP-WEIXIN
				gt.aut_show = true
				// #endif
				// #ifdef APP-PLUS
				uni.navTo('/pages/login/peopleAuth?flag=true')
				// #endif
			},
			goCompanyAuth() {
				let gt = this
				// if(gt.companyInfo.is_company_approve) return gt.$refs.uToast.show({
				// 	title: '已认证'
				// })
				uni.navigateTo({
					url: '/pages/login/companyAuth?flag=true'
				})
			},
			confirm(type) {
				let gt = this
				gt.show_pca = false
				gt.flag = type
			},
			async gtPCASelect(res) {
				let gt = this
				if (res.length == 10 || !gt.flag) return
				if (res.length > 10) {
					gt.fromPca = JSON.parse(res)
				} else {
					gt.fromPca = [
						[],
						[{
							cityName: ''
						}],
						[]
					]
				}
				await gt.updateUserInfo({
					update_type: 'city',
					value: gt.fromPca[1][0].cityName
				})
				gt.userInfo.city = gt.fromPca[1][0].cityName
				gt.updateStorage()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
		.gt_content {
			// font-family: PingFangSC-Regular, PingFang SC;
			.headPortrait {
				margin: 58rpx auto 72rpx;
				width: 240rpx;
				text-align: center;
				.u-avatar {
					width: 160rpx !important;
					height: 160rpx !important;
					flex: 0 0 160px !important;
				}
				.headMsg {
					color: #909399;
					margin-top: 24rpx;
				}
			}
			.con_list {
				margin-top: 20rpx;
				.con_item {
					display: flex;
					justify-content: space-between;
					margin: 0 40rpx;
					.con_text {
						font-size: 32rpx;
						font-weight: 400;
						color: #000000;
						line-height: 108rpx;
						white-space: nowrap;
						margin-right: 20rpx;
					}
					.con_icon {
						line-height: 108rpx;
						u-icon {
							margin-left: 16rpx;
						}
					}
					.con_icon1 {
						display: flex;
						align-items: center;
						line-height: normal;
					}
				}
			}
			.label {
				font-size: 32rpx;
				font-weight: 400;
				color: #000000;
				line-height: 108rpx;
				text-align: center;
			}
			.photo_title {
				font-size: 32rpx;
				text-align: center;
				padding: 30rpx 30rpx 0;
				display: flex;
				color: #000000;
				.photo_title_msg {
					width: 100%;
					font-size: 32rpx;
					font-weight: 400;
				}
			}
			.photo_content {
				display: flex;
				flex-wrap: wrap;
				image {
					width: 160rpx;
					height: 160rpx;
					margin: calc((100% - 480rpx) / 6);
				}
			}
			.confirm {
				display: flex;
				justify-content: space-between;
				padding: 30rpx 40rpx 0 40rpx;
				.ok {
					color: rgb(41, 121, 255);
				}
			}
			.aut_info {
				padding: 40rpx 40rpx 100rpx 40rpx;
			}
			.aut_title {
				font-size: 40rpx;
				text-align: center;
				font-weight: 700;
				font-family: PingFangSC-Medium, PingFang SC;
			}
			.aut_content {
				text-align: center;
				margin-top: 40rpx;
				font-family: PingFangSC-Medium, PingFang SC;
			}
		}
	}
</style>