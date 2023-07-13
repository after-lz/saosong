<template>
	<view class="packetMsg">
		<text class="blod">一、定义</text><br/>
		<text>红包是用户参与平台活动获得的 用于购买推广服务时抵扣的折扣券产品，获得红包的用户可在购买服务时享受红包面额的折扣优惠，具体门槛以页面提示为准。</text><br/>
		<text class="blod">二、使用规则:</text><br/>
		<text>1、红包仅支持通过伞送物流端购买推广服务时进行使用，具体抵扣额度已页面提示为准。</text><br/>
		<text>2、红包在使用时，会从总红包余额中扣除。</text><br/>
		<text>3、红包不得转赠他人，不得为他人付款。</text><br/>
		<text class="blod">三、红包转余额规则:</text><br/>
		<text>红包转余额需满足以下三个条件：</text><br/>
		<text>1、满足提现金额X元</text><br/>
		<text>2、该账号完结订单X单</text><br/>
		<text>3、注册时长超过X个月</text><br/>
		<text class="blod">四、红包清零规则:</text><br/>
		<text>红包没间隔X个月所有未使用的红包余额清零一次</text><br/>
		<text class="end">最终解释权归伞送平台所有！</text><br/>
	</view>
</template>

<script>
</script>

<style lang='scss'>
	.packetMsg {
		padding: 30rpx;
	}
	.blod {
		font-weight: 700;
		margin-top: 40rpx;
		display: block;
		&:nth-child(1) {
			margin: 0;
		}
	}
	.end {
		margin-top: 40rpx;
		display: block;
	}
</style>