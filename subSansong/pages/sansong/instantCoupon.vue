<template>
	<view class="gt_content">
		<u-form :model="form" ref="uForm" label-width="auto" :border-bottom="false">
			<u-form-item label="类型:" prop="">
				<text>满减券</text>
			</u-form-item>
			<u-form-item label="满足金额" required prop="coupon_price">
				<view class="row">
					<u-input v-model="params.coupon_min_price" type="digit" border placeholder="金额" class="uni-input"
						@input="(e)=>inputChange(e, 1)" />
					<view class="msg">减</view>
					<u-input v-model="params.coupon_price" type="digit" border placeholder="金额"
						@input="(e)=>inputChange(e, 2)" />
				</view>
			</u-form-item>
			<u-form-item label="发券数量" required prop="coupon_num">
				<view class="row">
					<u-input v-model="params.coupon_num" type="number" border placeholder="输入数量" />
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
		<u-button @click="submit">提交</u-button>
		<u-calendar v-model="show" mode="range" @change="change"></u-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}]
				},
				params: {
					coupon_min_price: undefined,
					coupon_price: undefined,
					coupon_num: undefined,
					date_from: '',
					date_end: ''
				},
				time: '',
				show: false
			}
		},
		methods: {
			inputChange(e, type) {
				setTimeout(() => {
					if (type === 1) {
						this.params.coupon_min_price = e > 0 ? +e : undefined
					} else {
						this.params.coupon_price = e > 0 && +e < +this.params.coupon_min_price ? +e : undefined
					}
				}, 0)
			},
			change(e) {
				this.time = e.startDate + '~' + e.endDate
				this.params.date_from = e.startDate.replace(/-/, '/')
				this.params.date_end = e.endDate
			},
			submit() {
				console.log(this.params)
				let gt = this
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// var url = '/logistics/coupon/distribute';
						// var data = gt.params;
						// gt.gtRequest.post(url, data).then(res => {
						// 	if (res.code === 1) {
						// 		console.log('///////')
						// 		uni.navigateBack({
						// 			delta: 1
						// 		})
						// 	}
						// });
					} else {
						console.log('验证失败');
					}
				})
			},
			// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
			onReady() {
				this.$refs.uForm.setRules(this.rules);
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

	.u-button {
		position: absolute;
		bottom: 10%;
		width: 90%;
		margin: 0 auto;
		background-color: #409eff;
		color: #fff;
		border: 0;
		border-radius: 20rpx;
	}
</style>