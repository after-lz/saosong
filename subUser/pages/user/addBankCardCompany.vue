<template>
	<view class="gt_content">


		<view class="con_toast">
			<u-toast ref="uToast" />
		</view>


		<view class="con_step step_1" v-if="step == 1">
			<view class="con_card">
				<view class="con_title">
					<text>企业营业执照</text>
				</view>
				<view class="con_upload">
					<u-upload ref="uUpload" :auto-upload="false" max-count="1" upload-text="上传营业执照" index="companyLicence"
						@on-choose="chooseImg" @on-remove="removeImg"></u-upload>
				</view>
				<view class="con_line">
					<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_text">
							<text>企业名称</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="companyName" type="text" placeholder="根据营业执照自动存入" height="40"
								:clearable="false" input-align="right" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_text">
							<text>社会信用代码</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="companySn" type="text" placeholder="根据营业执照自动存入" height="40"
								:clearable="false" input-align="right" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_text">
							<text>注册地址</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="companyAddress" type="number" placeholder="根据营业执照自动存入" height="40"
								:clearable="false" input-align="right" />
						</view>
					</view>
				</view>
			</view>

			<view class="con_card">
				<view class="con_title">
					<text>法人信息</text>
				</view>
				<view class="con_upload">
					<view class="con_front">
						<u-upload ref="uUpload2" :auto-upload="false" max-count="1" upload-text="上传身份证正面" @on-choose="chooseImg"
							@on-remove="removeImg"></u-upload>
					</view>
					<view class="con_back">
						<u-upload ref="uUpload3" :auto-upload="false" max-count="1" upload-text="上传身份证反面" @on-choose="chooseImg"
							@on-remove="removeImg"></u-upload>
					</view>
				</view>
				<view class="con_line">
					<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_text">
							<text>法人姓名</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="name" type="text" placeholder="请输入法人姓名" height="40" :clearable="false"
								input-align="right" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_text">
							<text>身份证号</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="idSn" type="idcard" placeholder="请输入身份证号码" height="40" :clearable="false"
								input-align="right" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line length="670rpx" color="#F2F2F2" margin="32rpx 0"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_text">
							<text>手机号码</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="mobile" type="number" placeholder="请输入手机号码" height="40" :clearable="false"
								input-align="right" />
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="con_step step_2" v-if="step == 2">
			<view class="con_card">
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_text">
							<text>账户名</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="accountName" placeholder="请输入账户名" height="40" :clearable="false" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line length="670rpx" color="#F2F2F2" margin="24rpx 0"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_text">
							<text>开户行</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="bankName" placeholder="请输入开户行" height="40" :clearable="false" />
						</view>
					</view>
				</view>
				<view class="con_line">
					<u-line length="670rpx" color="#F2F2F2" margin="24rpx 0"></u-line>
				</view>
				<view class="con_key_val">
					<view class="con_key">
						<view class="con_text">
							<text>卡号</text>
						</view>
					</view>
					<view class="con_val">
						<view class="con_input">
							<u-input v-model="accountNum" type="number" placeholder="请输入银行卡号" height="40" :clearable="false" />
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="con_btn" @click="submitBankCard">
			<text v-if="step == 1">下一步</text>
			<text v-if="step == 2">提交</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				step :1,
				
				companyLicence: '',

				companyName: '',
				companySn: '',
				companyAddress: '',

				idFront: '',
				idBack: '',

				name: '',
				idSn: '',
				mobile: '',
				
				accountName:'',
				bankName:'',
				accountNum:'',

			}
		},
		methods: {
			chooseImg(item) {
				console.log(item);
				// return false
				let gt = this;

				gt.refresh = false;
				var file = item.fileInfo;

				gt.gtRequest.upload(file).then(res => {
					gt[item.index] = res.src + '?x-oss-process=style/sansong_app';
					if (item.index == 'companyLicence') {
						gt.companyLicenceOcr(res.src);
					}
				});

			},
			companyLicenceOcr(path) {
				let gt = this;
				var url = "/logistics/company/identify_business_license";
				var data = {
					license_pic: path,
				};
				gt.gtRequest.post(url, data).then(res => {
					console.log(res);
					gt.companyName = res.license_info.company_name;
					gt.companySn = res.license_info.license_no;
					gt.companyAddress = res.license_info.address;
				});
			},
			removeImg(index, list, ind) {
				console.log(index);
				console.log(list);
				console.log(ind);
				// return false;
				let gt = this;

				gt[ind] = '';
				if (ind == 'companyLicence') {
					gt.companyName = '';
					gt.companySn = '';
					gt.companyAddress = '';
				}
			},
			
			submitBankCard(){
				let gt = this;
				if(gt.step == 1){
					gt.step ++;
					return false;
				}
				
				var bin = require('bankcardinfo');
				bin.getBankBin(gt.accountNum).then(res => {
					// console.log('76:',res);
					// return false;
				
					var cardType = 0;
					if (res.cardType == 'DC') {
						cardType = 1;
					}
					if (res.cardType == 'CC') {
						cardType = 2;
					}
				
					var url = "/logistics/userbank/add_bank";
					var data = {
						bank_card_type: cardType,
						bank_type: 2,
						bank_name: gt.bankName,
						bank_truename: gt.accountName,
						bank_number: gt.accountNum,
						
						company_name:gt.companyName,
						company_lisence_pic:gt.companyLicence,
						company_lisence_no:gt.companySn,
						company_address:gt.companyAddress,
						legal_truename:gt.name,
						legal_card_front:gt.idFront,
						legal_card_back:gt.idBack,
						legal_card_no:gt.idSn,
						legal_mobile:gt.mobile,
						
					};
					gt.gtRequest.post(url, data).then(res => {
						gt.$refs.uToast.show({
							title: '添加成功',
							type: 'success',
							back: true,
						});
					});
				
				
				}).catch(res => {
					console.log(res);
					gt.$refs.uToast.show({
						title: '银行卡号异常',
						type: 'error',
					});
					return false;
				});
				
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;

		.gt_content {
			.con_step {
				.con_card {
					width: 718rpx;
					background: #FFFFFF;
					border-radius: 16rpx;
					padding: 24rpx;
					margin: 20rpx 16rpx;

					.con_title {
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 44rpx;
					}

					.con_upload {
						display: flex;
					}

					.con_key_val {
						display: flex;
						justify-content: space-between;

						.con_key {
							width: 200rpx;

							.con_text {
								font-size: 28rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #000000;
								line-height: 40rpx;
							}
						}

						.con_val {
							width: 600rpx;
							margin-left: 40rpx;
						}
					}
				}
			}
			
			.con_btn {
				margin-top: 180rpx;
				margin-left: 16rpx;
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
			}
		}
	}
</style>