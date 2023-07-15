<template>
	<view class="gt_content">
		<u-form :model="form" ref="uForm" label-width="auto" :border-bottom="false">
			<u-form-item label="类型:" prop="">
				<text>满减券</text>
			</u-form-item>
			<u-form-item label="满足金额" required prop="coupon_price">
				<view class="row">
					<u-input v-model.number="form.coupon_min_price" type="digit" border placeholder="金额" class="uni-input"
						@input="(e)=>inputChange(e, 1)" />
					<view class="msg">减</view>
					<u-input v-model.number="form.coupon_price" type="digit" border placeholder="金额" class="uni-input"
						@input="(e)=>inputChange(e, 2)" />
				</view>
			</u-form-item>
			<u-form-item label="发券数量" required prop="coupon_num">
				<view class="row">
					<u-input v-model="form.coupon_num" type="number" border placeholder="输入数量" />
					<view class="msg">发券金额￥</view>
				</view>
			</u-form-item>
			<u-form-item label="有效日期" required prop="time">
				<u-input :value="time" border disabled placeholder="请选择" @click="show = true" class="time" />
			</u-form-item>
			<u-form-item label="适用范围" prop="">
				<u-input value="全部专线" border disabled class="disabled" />
			</u-form-item>
		</u-form>
		<u-button @click="submit" class="btn" type="primary">提交</u-button>
		<u-calendar v-model="show" mode="range" @change="change"></u-calendar>
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
						required: true,
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
				show: false
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			let gt = this
			gt.$refs.uForm.setRules(gt.rules)
		},
		methods: {
			inputChange(e, type) {
				let gt = this
				setTimeout(() => {
					if (type === 1) {
						gt.form.coupon_min_price = +e > 0 ? +e : undefined
					} else {
						gt.form.coupon_price = +e > 0 && +e < +gt.form.coupon_min_price ? +e : undefined
					}
				}, 0)
			},
			change(e) {
				let gt = this
				gt.time = e.startDate + '~' + e.endDate
				gt.form.date_from = e.startDate.replace(/-/, '/')
				gt.form.date_end = e.endDate.replace(/-/, '/')
			},
			submit() {
				let gt = this
				gt.$refs.uForm.validate(valid => {
					if (valid) {
						gt.gtRequest.post('/logistics/coupon/distribute', gt.form).then(res => {
							if (res.code === 1) {
								gt.$refs.uToast.show({
									title: '发券成功',
									type: 'success'
								})
								setTimeout(()=> {
									uni.navigateBack({
										delta: 1
									})
								}, 2000)
							}
						})
					} else {
						console.log('验证失败');
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.gt_content {
		padding: 40rpx;
	}

	.u-input {
		width: 200rpx;
	}

	.time .u-input {
		width: 92%;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.msg {
		margin: 0 40rpx;
	}

	.disabled .u-input {
		background-color: #f2f2f2;
	}

	.btn {
		position: absolute;
		bottom: 10%;
		width: 90%;
		margin: 0 auto;
	}
</style>