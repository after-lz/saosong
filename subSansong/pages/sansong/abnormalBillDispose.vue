<template>
	<view class="gt_content">
		<u-toast ref="uToast" />
		<view class="card">
			<view class="card_title">
				<view class="title_name">投诉处理</view>
			</view>
			<view class="card_content">
				<view class="row">
					<view class="row_label">赔偿金额：</view>
					<view class="input">
						<u-input v-model.number="money" type="digit" input-align='center' height='39' placeholder="请输入金额" />
					</view>
					<view>元</view>
				</view>
				<view class="row row1">
					<view class="row_label">
						处理内容：
					</view>
					<view class="con_textarea">
						<u-input v-model.trim="content" maxlength="300" type="textarea" auto-height placeholder="请尽量详细的描述问题的经过" />
						<view class="count">{{ content.length + '/300' }}</view>
					</view>
				</view>
				<view class="con_label">
					上传照片：
				</view>
				<view class="con_upload">
					<u-upload ref="uUpload" :auto-upload="false" :max-count='3' width='198' height='198'
							@on-choose='uploadImg' @on-remove='delImg' :custom-btn="true">
						<view class="upload_item" slot="addBtn" hover-class="slot-btn__hover" hover-stay-time="150">
							<view class="none">
								<image :src="gtCommon.getOssImg('message/upload.png')" mode="widthFix"></image>
								<text class="msg">上传照片</text>
							</view>
						</view>
					</u-upload>
				</view>
			</view>
			<view class="btn">
				<u-button type='primary' @click="submit">提交</u-button>
			</view>
		</view>
		<abnormal-bill-base-detail :record='record' :imgs='imgs'></abnormal-bill-base-detail>
	</view>
</template>

<script>
	import AbnormalBillBaseDetail from './abnormalBillBaseDetail'
	export default {
		components: { AbnormalBillBaseDetail },
		data() {
			return {
				money: undefined,
				content: '',
				fileList: [],
				record: {},
				imgs: []
			}
		},
		onLoad(option) {
			let gt = this
			gt.record = JSON.parse(decodeURIComponent(option.record))
			gt.imgs = gt.record.imgs ? gt.record.imgs.split('||') : []
		},
		methods: {
			uploadImg(file) {
				let gt = this
				gt.gtRequest.upload(file.fileInfo).then(res => {
					gt.fileList.push(res.src)
				})
			},
			delImg(index) {
				let gt = this
				gt.fileList.splice(index, 1)
			},
			submit() {
				let gt = this
				if(gt.content === '') return gt.$refs.uToast.show({
					title: '处理内容不能为空！',
					type: 'warning'
				})
				gt.gtRequest.post('/logistics/abnormal/handle_abnormal', {
					id: gt.record.id,
					money: gt.money || 0,
					imgs: gt.fileList.join(','),
					content: gt.content
				}).then(res => {
					gt.$refs.uToast.show({
						title: '提交成功！',
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
			.card {
				background-color: #fff;
				border-radius: 16rpx;
				margin: 30rpx 28rpx 0;
				padding: 30rpx 25rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				color: #000;
				.card_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 15rpx;
					border-bottom: 2rpx solid #e9e9e9;
					.title_name {
						font-weight: 700;
					}
					.title_time {
						font-size: 24rpx;
					}
				}
				.btn {
					width: 498rpx;
					margin: 20rpx auto 0;
				}
				.card_content {
					padding: 10rpx 0;
					.row {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin: 20rpx 0;
						.row_label {
							white-space: nowrap;
						}
						.input {
							width: 100%;
							border-bottom: 2rpx solid #e9e9e9;
							margin: 0 10rpx;
						}
					}
					.row1 {
						align-items: flex-start;
					}
					.con_label {
						margin: 20rpx 0;
					}
					.con_textarea {
						position: relative;
						width: 100%;
						background: #F8F8F8;
						border-radius: 16rpx;
						padding: 20rpx 24rpx 44rpx;
						margin-left: 10rpx;
						.count {
							position: absolute;
							right: 20rpx;
							bottom: 20rpx;
							color: #bbbbbb;
							font-size: 20rpx;
						}
					}
					.con_upload {
						.upload_item {
							width: 198rpx;
							height: 198rpx;
							display: flex;
							align-items: center;
							border-radius: 16rpx;
							border: 2rpx dashed #D6D6D6;
							margin: 10rpx;
							.none {
								width: 100%;
								display: flex;
								justify-content: center;
								flex-wrap: wrap;
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
				}
			}
		}
	}
</style>