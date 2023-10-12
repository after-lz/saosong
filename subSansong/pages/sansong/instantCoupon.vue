<template>
	<view class="gt_content">
		<u-form :model="form" ref="uForm" label-width="auto">
			<u-form-item label="发券类型:" prop="" class="title" :border-bottom="false">
				<text>满减券</text>
			</u-form-item>
			<u-form-item label="满足金额" required prop="coupon_price" :border-bottom="false">
				<view class="row">
					<view class="col">
						<u-input v-model.number="form.coupon_min_price" type="digit" placeholder="金额" @blur="(e)=>inputChange(e, 1)" />
						<view class="msg1">元</view>
					</view>
					<view class="msg">减</view>
					<view class="col">
						<u-input v-model.number="form.coupon_price" type="digit" placeholder="金额" @blur="(e)=>inputChange(e, 2)" />
						<view class="msg1">元</view>
					</view>
				</view>
			</u-form-item>
			<u-form-item label="发券数量" required prop="coupon_num" :border-bottom="false">
				<view class="row">
					<u-input v-model.number="form.coupon_num" type="number" placeholder="输入数量"/>
					<view class="msg">发券金额：{{ money }}元</view>
				</view>
			</u-form-item>
			<u-form-item label="有效时间" required prop="time" :border-bottom="false">
				<u-input :value="time" disabled placeholder="请选择" @click="show = true" class="time" />
			</u-form-item>
			<!-- <u-form-item label="适用范围" prop="" :border-bottom="false">
				<u-input value="全部专线" disabled class="disabled" />
			</u-form-item> -->
		</u-form>
		<u-button @click="submit" class="btn" type="primary">确认发券</u-button>
		<u-calendar v-model="show" mode="range" :min-year="minYear" :min-date="minDate" max-date="9999-12-31" @change="change"></u-calendar>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					coupon_min_price: undefined,
					coupon_price: undefined,
					coupon_num: undefined,
					date_from: '',
					date_end: ''
				},
				rules: {
					coupon_price: [{
						validator: (rule, value, callback) => {
							let gt = this
							if(gt.form.coupon_min_price && gt.form.coupon_price) {
								return gt.form.coupon_min_price > gt.form.coupon_price
							} else {
								return callback(false)
							}
						},
						message: '请输入金额',
						trigger: ['blur', 'change']
					}],
					coupon_num: [{
						validator: (rule, value, callback) => {
							let gt = this
							if(+gt.form.coupon_num > 0) {
								return true
							} else {
								return callback(false)
							}
						},
						message: '请输入数量',
						trigger: ['blur', 'change']
					}],
					time: [{
						validator: (rule, value, callback) => {
							let gt = this
							//return callback(gt.form.date_from && gt.form.date_end)
							if(gt.form.date_from && gt.form.date_end) {
								return true
							} else {
								return callback(false)
							}
						},
						message: '请选择日期',
						trigger: ['blur', 'change']
					}],
				},
				time: '',
				show: false,
				minYear: '',
				minDate: '',
				flag: false
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			let gt = this
			gt.$refs.uForm.setRules(gt.rules)
		},
		onLoad() {
			let gt = this
			let now = new Date()
			let year = now.getFullYear()
			let month = now.getMonth() + 1
			let day = now.getDate()
			if(+month < 10) month = '0' + month
			if(+day < 10) day = '0' + day
			gt.minYear = year
			gt.minDate = year + '-' + month + '-' + day
		},
		computed: {
			money() {
				let gt = this
				return (+gt.form.coupon_price || 0) * (+gt.form.coupon_num || 0)
			}
		},
		methods: {
			inputChange(e, type) {
				let gt = this
				setTimeout(() => {
					if (type === 1) {
						gt.form.coupon_min_price = +e > 0 && +e <= 9999 ? parseFloat(e.match(/\d+\.?\d{0,2}/, '')[0]) : undefined
					} else if(type === 2) {
						gt.form.coupon_price = +e > 0 && +e < +gt.form.coupon_min_price ? parseFloat(e.match(/\d+\.?\d{0,2}/, '')[0]) : undefined
					}
				}, 0)
			},
			change(e) {
				let gt = this
				gt.time = e.startDate + '~' + e.endDate
				gt.form.date_from = e.startDate
				gt.form.date_end = e.endDate
			},
			submit() {
				let gt = this
				if(gt.flag) return
				gt.flag = true
				gt.$refs.uForm.validate(valid => {
					if (valid) {
						gt.gtRequest.post('/logistics/coupon/distribute', gt.form).then(res => {
							gt.$refs.uToast.show({
								title: '发券成功',
								type: 'success'
							})
							setTimeout(()=> {
								gt.flag = false
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						}).catch(()=> {
							gt.flag = false
						})
					} else {
						gt.flag = false
						console.log('验证失败');
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F3F4F5;
	}
	.gt_content {
		padding: 40rpx;
		font-size: 28rpx;
		color: #000000;
		background-color: #fff;
		.title {
			font-weight: 700;
			font-size: 32rpx;
		}
		.u-input {
			width: 200rpx;
			height: 64rpx;
			background-color: #F4F4F4;
			border-radius: 8rpx;
			padding: 0 20rpx !important;
			.u-input__input {
				min-height: 64rpx !important;
			}
		}
	}
	.row {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.col {
		position: relative;
		.msg1 {
			position: absolute;
			top: 0%;
			right: 0;
			transform: translate(-50%, -5%);
		}
	}
	.msg {
		margin: 0 20rpx;
	}
	.time .u-input {
		width: 400rpx;
	}
	.btn {
		position: absolute;
		bottom: 10%;
		width: 90%;
		margin: 0 auto;
	}
</style>