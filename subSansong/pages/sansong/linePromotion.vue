<template>
	<view class="gt_content">
		<!-- 金卡和银卡都开启 -->
		<template v-if="data.linePromote_gold_switch && data.linePromote_silver_switch">
			<!-- 都未开通 -->
			<template v-if="promote_type_name === ''">
				<view class="tabs">
					<view class="tab" :class="active === 1 ? 'tab_active':''" @click="active = 1">
						<view class="goldLogo" :style="{backgroundImage: `url(${active === 1 ? goleSrc_active : goleSrc})`}"></view>
						<view class="tabs_name">金卡</view>
					</view>
					<view class="tab" :class="active === 2 ? 'tab_active':''" @click="active = 2">
						<view class="goldLogo" :style="{backgroundImage: `url(${active === 2 ? silverSrc_active : silverSrc})`}"></view>
						<view class="tabs_name">银卡</view>
					</view>
				</view>
			</template>
			<!-- 已开通金卡 -->
			<template v-if="promote_type_name === '金卡'">
				<view class="tabs_gold">
					<view class="tabs" :style="{backgroundImage: `url(${aloneGold})`}">
						<view class="tab">
							<view class="goldLogo" :style="{backgroundImage: `url(${goleSrc_active})`}"></view>
							<view class="tabs_name">金卡</view>
						</view>
					</view>
				</view>
			</template>
			<!-- 已开通银卡 -->
			<template v-if="promote_type_name === '银卡'">
				<view class="tabs">
					<view class="tab" :class="active === 1 ? 'tab_active':''" @click="active = 1">
						<view class="goldLogo" :style="{backgroundImage: `url(${active === 1 ? goleSrc_active : goleSrc})`}"></view>
						<view class="tabs_name">金卡</view>
					</view>
					<view class="tab" :class="active === 2 ? 'tab_active':''" @click="active = 2">
						<view class="goldLogo" :style="{backgroundImage: `url(${active === 2 ? silverSrc_active : silverSrc})`}"></view>
						<view class="tabs_name">银卡</view>
					</view>
				</view>
			</template>
			<view class="card_options">
				<template v-if="active === 1">
					<view class="option" :class="type === 1 ? 'option_active':''" @click="type = 1" v-if="data.linePromote_gold_annual_switch">
						<view class="badge badge_gold">金卡推广</view>
						<view class="option_title">年度推广</view>
						<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_annual_nowMoney}}</text></view>
						<view class="option_Num">原价{{data.linePromote_gold_annual_originalMoney}}</view>
					</view>
					<view class="option" :class="type === 2 ? 'option_active':''" @click="type = 2" v-if="data.linePromote_gold_semi_switch">
						<view class="badge badge_gold">金卡推广</view>
						<view class="option_title">半年推广</view>
						<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_semi_nowMoney}}</text></view>
						<view class="option_Num">原价{{data.linePromote_gold_semi_originalMoney}}</view>
					</view>
					<view class="option" :class="type === 3 ? 'option_active':''" @click="type = 3" v-if="data.linePromote_gold_quarter_switch">
						<view class="badge badge_gold">金卡推广</view>
						<view class="option_title">季度推广</view>
						<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_quarter_nowMoney}}</text></view>
						<view class="option_Num">原价{{data.linePromote_gold_quarter_originalMoney}}</view>
					</view>
				</template>
				<template v-if="active === 2">
					<view class="option" :class="type === 6 ? 'option_active':''" @click="type = 6" v-if="data.linePromote_silver_annual_switch">
						<view class="badge badge_silver">银卡推广</view>
						<view class="option_title">年度推广</view>
						<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_annual_nowMoney}}</text></view>
						<view class="option_Num">原价{{data.linePromote_silver_annual_originalMoney}}</view>
					</view>
					<view class="option" :class="type === 7 ? 'option_active':''" @click="type = 7" v-if="data.linePromote_silver_semi_switch">
						<view class="badge badge_silver">银卡推广</view>
						<view class="option_title">半年推广</view>
						<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_semi_nowMoney}}</text></view>
						<view class="option_Num">原价{{data.linePromote_silver_semi_originalMoney}}</view>
					</view>
					<view class="option" :class="type === 8 ? 'option_active':''" @click="type = 8" v-if="data.linePromote_silver_quarter_switch">
						<view class="badge badge_silver">银卡推广</view>
						<view class="option_title">季度推广</view>
						<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_quarter_nowMoney}}</text></view>
						<view class="option_Num">原价{{data.linePromote_silver_quarter_originalMoney}}</view>
					</view>
				</template>
			</view>
		</template>
		<!-- 只开启了金卡 -->
		<template v-if="data.linePromote_gold_switch && !data.linePromote_silver_switch">
			<!-- 都未开通 -->
			<template v-if="promote_type_name === ''">
				<view class="tabs_gold">
					<view class="tabs" :style="{backgroundImage: `url(${aloneGold})`}">
						<view class="tab">
							<view class="goldLogo" :style="{backgroundImage: `url(${goleSrc_active})`}"></view>
							<view class="tabs_name">金卡</view>
						</view>
					</view>
				</view>
				<view class="card_options">
					<template v-if="active === 1">
						<view class="option" :class="type === 1 ? 'option_active':''" @click="type = 1" v-if="data.linePromote_gold_annual_switch">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">年度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_annual_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_annual_originalMoney}}</view>
						</view>
						<view class="option" :class="type === 2 ? 'option_active':''" @click="type = 2" v-if="data.linePromote_gold_semi_switch">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">半年推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_semi_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_semi_originalMoney}}</view>
						</view>
						<view class="option" :class="type === 3 ? 'option_active':''" @click="type = 3" v-if="data.linePromote_gold_quarter_switch">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">季度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_quarter_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_quarter_originalMoney}}</view>
						</view>
					</template>
				</view>
			</template>
			<!-- 已开通金卡 -->
			<template v-if="promote_type_name === '金卡'">
				<view class="tabs_gold">
					<view class="tabs" :style="{backgroundImage: `url(${aloneGold})`}">
						<view class="tab">
							<view class="goldLogo" :style="{backgroundImage: `url(${goleSrc_active})`}"></view>
							<view class="tabs_name">金卡</view>
						</view>
					</view>
				</view>
				<view class="card_options">
					<template v-if="active === 1">
						<view class="option" :class="type === 1 ? 'option_active':''" @click="type = 1" v-if="data.linePromote_gold_annual_switch">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">年度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_annual_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_annual_originalMoney}}</view>
						</view>
						<view class="option" :class="type === 2 ? 'option_active':''" @click="type = 2" v-if="data.linePromote_gold_semi_switch">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">半年推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_semi_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_semi_originalMoney}}</view>
						</view>
						<view class="option" :class="type === 3 ? 'option_active':''" @click="type = 3" v-if="data.linePromote_gold_quarter_switch">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">季度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_quarter_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_quarter_originalMoney}}</view>
						</view>
					</template>
				</view>
			</template>
			<!-- 已开通银卡 -->
			<template v-if="promote_type_name === '银卡'">
				<view class="tabs">
					<view class="tab" :class="active === 1 ? 'tab_active':''" @click="active = 1">
						<view class="goldLogo" :style="{backgroundImage: `url(${active === 1 ? goleSrc_active : goleSrc})`}"></view>
						<view class="tabs_name">金卡</view>
					</view>
					<view class="tab" :class="active === 2 ? 'tab_active':''" @click="active = 2">
						<view class="goldLogo" :style="{backgroundImage: `url(${active === 2 ? silverSrc_active : silverSrc})`}"></view>
						<view class="tabs_name">银卡</view>
					</view>
				</view>
				<view class="card_options">
					<template v-if="active === 1">
						<view class="option" :class="type === 1 ? 'option_active':''" @click="type = 1" v-if="data.linePromote_gold_annual_switch">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">年度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_annual_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_annual_originalMoney}}</view>
						</view>
						<view class="option" :class="type === 2 ? 'option_active':''" @click="type = 2" v-if="data.linePromote_gold_semi_switch">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">半年推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_semi_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_semi_originalMoney}}</view>
						</view>
						<view class="option" :class="type === 3 ? 'option_active':''" @click="type = 3" v-if="data.linePromote_gold_quarter_switch">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">季度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_quarter_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_quarter_originalMoney}}</view>
						</view>
					</template>
					<template v-if="active === 2">
						<view class="option">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">年度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_annual_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_annual_originalMoney}}</view>
						</view>
						<view class="option">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">半年推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_semi_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_semi_originalMoney}}</view>
						</view>
						<view class="option">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">季度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_quarter_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_quarter_originalMoney}}</view>
						</view>
					</template>
				</view>
			</template>
		</template>
		<!-- 只开启了银卡 -->
		<template v-if="!data.linePromote_gold_switch && data.linePromote_silver_switch">
			<!-- 都未开通 -->
			<template v-if="promote_type_name === ''">
				<view class="tabs_silver">
					<view class="tabs" :style="{backgroundImage: `url(${alonesilver})`}">
						<view class="tab">
							<view class="goldLogo" :style="{backgroundImage: `url(${silverSrc_active})`}"></view>
							<view class="tabs_name">银卡</view>
						</view>
					</view>
				</view>
				<view class="card_options">
					<template v-if="active === 2">
						<view class="option" :class="type === 6 ? 'option_active':''" @click="type = 6" v-if="data.linePromote_silver_annual_switch">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">年度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_annual_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_annual_originalMoney}}</view>
						</view>
						<view class="option" :class="type === 7 ? 'option_active':''" @click="type = 7" v-if="data.linePromote_silver_semi_switch">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">半年推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_semi_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_semi_originalMoney}}</view>
						</view>
						<view class="option" :class="type === 8 ? 'option_active':''" @click="type = 8" v-if="data.linePromote_silver_quarter_switch">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">季度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_quarter_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_quarter_originalMoney}}</view>
						</view>
					</template>
				</view>
			</template>
			<!-- 已开通金卡 -->
			<template v-if="promote_type_name === '金卡'">
				<view class="tabs_gold">
					<view class="tabs" :style="{backgroundImage: `url(${aloneGold})`}">
						<view class="tab">
							<view class="goldLogo" :style="{backgroundImage: `url(${goleSrc_active})`}"></view>
							<view class="tabs_name">金卡</view>
						</view>
					</view>
				</view>
				<view class="card_options">
					<template v-if="active === 1">
						<view class="option">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">年度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_annual_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_annual_originalMoney}}</view>
						</view>
						<view class="option">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">半年推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_semi_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_semi_originalMoney}}</view>
						</view>
						<view class="option">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">季度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_quarter_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_quarter_originalMoney}}</view>
						</view>
					</template>
				</view>
			</template>
			<!-- 已开通银卡 -->
			<template v-if="promote_type_name === '银卡'">
				<view class="tabs_silver">
					<view class="tabs" :style="{backgroundImage: `url(${alonesilver})`}">
						<view class="tab">
							<view class="goldLogo" :style="{backgroundImage: `url(${silverSrc_active})`}"></view>
							<view class="tabs_name">银卡</view>
						</view>
					</view>
				</view>
				<view class="card_options">
					<template v-if="active === 2">
						<view class="option" :class="type === 6 ? 'option_active':''" @click="type = 6" v-if="data.linePromote_silver_annual_switch">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">年度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_annual_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_annual_originalMoney}}</view>
						</view>
						<view class="option" :class="type === 7 ? 'option_active':''" @click="type = 7" v-if="data.linePromote_silver_semi_switch">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">半年推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_semi_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_semi_originalMoney}}</view>
						</view>
						<view class="option" :class="type === 8 ? 'option_active':''" @click="type = 8" v-if="data.linePromote_silver_quarter_switch">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">季度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_quarter_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_quarter_originalMoney}}</view>
						</view>
					</template>
				</view>
			</template>
		</template>
		<!-- 都未开启 -->
		<template v-if="!data.linePromote_gold_switch && !data.linePromote_silver_switch">
			<!-- 已开通金卡 -->
			<template v-if="promote_type_name === '金卡'">
				<view class="tabs_gold">
					<view class="tabs" :style="{backgroundImage: `url(${aloneGold})`}">
						<view class="tab">
							<view class="goldLogo" :style="{backgroundImage: `url(${goleSrc_active})`}"></view>
							<view class="tabs_name">金卡</view>
						</view>
					</view>
				</view>
				<view class="card_options">
					<template v-if="active === 1">
						<view class="option">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">年度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_annual_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_annual_originalMoney}}</view>
						</view>
						<view class="option">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">半年推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_semi_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_semi_originalMoney}}</view>
						</view>
						<view class="option">
							<view class="badge badge_gold">金卡推广</view>
							<view class="option_title">季度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_quarter_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_gold_quarter_originalMoney}}</view>
						</view>
					</template>
				</view>
			</template>
			<!-- 已开通银卡 -->
			<template v-if="promote_type_name === '银卡'">
				<view class="tabs_silver">
					<view class="tabs" :style="{backgroundImage: `url(${alonesilver})`}">
						<view class="tab">
							<view class="goldLogo" :style="{backgroundImage: `url(${silverSrc_active})`}"></view>
							<view class="tabs_name">银卡</view>
						</view>
					</view>
				</view>
				<view class="card_options">
					<template v-if="active === 2">
						<view class="option">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">年度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_annual_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_annual_originalMoney}}</view>
						</view>
						<view class="option">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">半年推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_semi_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_semi_originalMoney}}</view>
						</view>
						<view class="option">
							<view class="badge badge_silver">银卡推广</view>
							<view class="option_title">季度推广</view>
							<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_quarter_nowMoney}}</text></view>
							<view class="option_Num">原价{{data.linePromote_silver_quarter_originalMoney}}</view>
						</view>
					</template>
				</view>
			</template>
		</template>
		
		<!-- 金卡和银卡都开启 -->
		<!-- <view class="tabs">
			<view class="tab" :class="active === 1 ? 'tab_active':''" @click="active = 1">
				<view class="goldLogo" :style="{backgroundImage: `url(${active === 1 ? goleSrc_active : goleSrc})`}"></view>
				<view class="tabs_name">金卡</view>
			</view>
			<view class="tab" :class="active === 2 ? 'tab_active':''" @click="active = 2">
				<view class="goldLogo" :style="{backgroundImage: `url(${active === 2 ? silverSrc_active : silverSrc})`}"></view>
				<view class="tabs_name">银卡</view>
			</view>
		</view> -->
		<!-- 只开启了金卡 -->
		<!-- <view class="tabs_gold">
			<view class="tabs" :style="{backgroundImage: `url(${aloneGold})`}">
				<view class="tab">
					<view class="goldLogo" :style="{backgroundImage: `url(${goleSrc_active})`}"></view>
					<view class="tabs_name">金卡</view>
				</view>
			</view>
		</view> -->
		<!-- 只开启了银卡 -->
		<!-- <view class="tabs_silver">
			<view class="tabs" :style="{backgroundImage: `url(${alonesilver})`}">
				<view class="tab">
					<view class="goldLogo" :style="{backgroundImage: `url(${silverSrc_active})`}"></view>
					<view class="tabs_name">银卡</view>
				</view>
			</view>
		</view> -->
		
		<!-- <view class="card_options">
			<template v-if="active === 1">
				<view class="option" :class="type === 1 ? 'option_active':''" @click="type = 1" v-if="data.linePromote_gold_annual_switch">
					<view class="badge badge_gold">金卡推广</view>
					<view class="option_title">年度推广</view>
					<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_annual_nowMoney}}</text></view>
					<view class="option_Num">原价{{data.linePromote_gold_annual_originalMoney}}</view>
				</view>
				<view class="option" :class="type === 2 ? 'option_active':''" @click="type = 2" v-if="data.linePromote_gold_semi_switch">
					<view class="badge badge_gold">金卡推广</view>
					<view class="option_title">半年推广</view>
					<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_semi_nowMoney}}</text></view>
					<view class="option_Num">原价{{data.linePromote_gold_semi_originalMoney}}</view>
				</view>
				<view class="option" :class="type === 3 ? 'option_active':''" @click="type = 3" v-if="data.linePromote_gold_quarter_switch">
					<view class="badge badge_gold">金卡推广</view>
					<view class="option_title">季度推广</view>
					<view class="option_nowNum">￥<text class="num">{{data.linePromote_gold_quarter_nowMoney}}</text></view>
					<view class="option_Num">原价{{data.linePromote_gold_quarter_originalMoney}}</view>
				</view>
			</template>
			<template v-if="active === 2">
				<view class="option" :class="type === 6 ? 'option_active':''" @click="type = 6" v-if="data.linePromote_silver_annual_switch">
					<view class="badge badge_silver">银卡推广</view>
					<view class="option_title">年度推广</view>
					<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_annual_nowMoney}}</text></view>
					<view class="option_Num">原价{{data.linePromote_silver_annual_originalMoney}}</view>
				</view>
				<view class="option" :class="type === 7 ? 'option_active':''" @click="type = 7" v-if="data.linePromote_silver_semi_switch">
					<view class="badge badge_silver">银卡推广</view>
					<view class="option_title">半年推广</view>
					<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_semi_nowMoney}}</text></view>
					<view class="option_Num">原价{{data.linePromote_silver_semi_originalMoney}}</view>
				</view>
				<view class="option" :class="type === 8 ? 'option_active':''" @click="type = 8" v-if="data.linePromote_silver_quarter_switch">
					<view class="badge badge_silver">银卡推广</view>
					<view class="option_title">季度推广</view>
					<view class="option_nowNum">￥<text class="num">{{data.linePromote_silver_quarter_nowMoney}}</text></view>
					<view class="option_Num">原价{{data.linePromote_silver_quarter_originalMoney}}</view>
				</view>
			</template>
		</view> -->
		
		<view class="notices" v-if="promote_end_time">
			<u-notice-bar mode="horizontal" :list="notices" type='none' font-size='24'></u-notice-bar>
		</view>
		
		<view class="card_msg">
			<view class="msg_head">
				<view class="msg_logo_left" :style="{backgroundImage: `url(${active === 1 ? goldIconLeft:silverIconLeft})`}"></view>
				<view class="msg_title" :class="active === 1 ? 'msg_title_gold':'msg_title_silver'">推广特权</view>
				<view class="msg_logo_right" :style="{backgroundImage: `url(${active === 1 ? goldIconRight:silverIconRight})`}"></view>
			</view>
			<view class="msg_content">
				<template v-if="active === 1">
					<view class="content_item item_gold" v-for="(item, index) in msg.gold" :key="index">
						<view class="item_index">{{ '0' + (index + 1) }}</view>
						<view class="item_info">
							<view class="item_info_icon" :style="{backgroundImage: `url(${item.icon})`}"></view>
							<view class="item_info_name">{{ item.name }}</view>
						</view>
					</view>
				</template>
				<template v-if="active === 2">
					<view class="content_item item_silver" v-for="(item, index) in msg.silver" :key="index">
						<view class="item_index">{{ '0' + (index + 1) }}</view>
						<view class="item_info">
							<view class="item_info_icon" :style="{backgroundImage: `url(${item.icon})`}"></view>
							<view class="item_info_name">{{ item.name }}</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		
		<!-- <view class="authorization">
			<view class="radio" @click="flag = !flag" :style="{backgroundImage:
				  `url(${gtCommon.getOssImg(flag ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
			</view>
			<view @click="flag = !flag">我已阅读并同意</view>
			<view class="agreement" @click="read">《专线推广协议》</view>
		</view> -->
		
		<!-- <view class="btn">
			<u-button type="primary" shape='circle' @click="goApply(false)">{{ btnName }}</u-button>
		</view> -->
		
		<!-- 金卡和银卡都开启 -->
		<template v-if="data.linePromote_gold_switch && data.linePromote_silver_switch">
			<view class="authorization">
				<view class="radio" @click="flag = !flag" :style="{backgroundImage:
					  `url(${gtCommon.getOssImg(flag ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
				</view>
				<view @click="flag = !flag">我已阅读并同意</view>
				<view class="agreement" @click="read">《专线推广协议》</view>
			</view>
			<view class="btn">
				<u-button type="primary" shape='circle' @click="goApply(false, btnName)">{{ btnName }}</u-button>
			</view>
		</template>
		<!-- 只开启了金卡 -->
		<template v-if="data.linePromote_gold_switch && !data.linePromote_silver_switch && btnName1">
			<view class="authorization">
				<view class="radio" @click="flag = !flag" :style="{backgroundImage:
					  `url(${gtCommon.getOssImg(flag ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
				</view>
				<view @click="flag = !flag">我已阅读并同意</view>
				<view class="agreement" @click="read">《专线推广协议》</view>
			</view>
			<view class="btn">
				<u-button type="primary" shape='circle' @click="goApply(false, btnName1)">{{ btnName1 }}</u-button>
			</view>
		</template>
		<!-- 只开启了银卡 -->
		<template v-if="!data.linePromote_gold_switch && data.linePromote_silver_switch && btnName2">
			<view class="authorization">
				<view class="radio" @click="flag = !flag" :style="{backgroundImage:
					  `url(${gtCommon.getOssImg(flag ? 'sansong/selected.png' : 'sansong/unSelected.png')})`}">
				</view>
				<view @click="flag = !flag">我已阅读并同意</view>
				<view class="agreement" @click="read">《专线推广协议》</view>
			</view>
			<view class="btn">
				<u-button type="primary" shape='circle' @click="goApply(false, btnName2)">{{ btnName2 }}</u-button>
			</view>
		</template>
		
		<view class="goDetail" @click="goDetail">查看明细</view>
		
		<u-toast ref="uToast" />
		
		<my-popup :show.sync='show' title='升级通知'>
			<view class="upgrade">
				<view class="info">
					<text>升级金卡模式将不退还已缴纳的费用</text>
				</view>
				<view class="btns">
					<view class="confirm" @click="confirm">继续升级</view>
					<view class="close" @click="show = false">取消升级</view>
				</view>
			</view>
		</my-popup>
	
		<renew-line :show.sync='show_renew' :type='type' @confirm='goApply' :data='data'></renew-line>
	</view>
</template>

<script>
	import myPopup from '@/components/myPopup.vue'
	import renewLine from './renewLine.vue'
	export default {
		components: { myPopup, renewLine },
		data() {
			return {
				goleSrc: this.gtCommon.getOssImg('sansong/gold.png'),
				goleSrc_active: this.gtCommon.getOssImg('sansong/active_gold.png'),
				silverSrc: this.gtCommon.getOssImg('sansong/silver.png'),
				silverSrc_active: this.gtCommon.getOssImg('sansong/active_silver.png'),
				aloneGold: this.gtCommon.getOssImg('sansong/gold_base.png'),
				alonesilver: this.gtCommon.getOssImg('sansong/silver_base.png'),
				msg: {
					gold: [
						{ icon: this.gtCommon.getOssImg('sansong/gold01.png'), name: '增加专线曝光率+200%' },
						{ icon: this.gtCommon.getOssImg('sansong/gold02.png'), name: '增加企业曝光率+300%' },
						{ icon: this.gtCommon.getOssImg('sansong/gold03.png'), name: '访问人数增加+180%' },
						{ icon: this.gtCommon.getOssImg('sansong/gold04.png'), name: '订单增量+150%' }
					],
					silver: [
						{ icon: this.gtCommon.getOssImg('sansong/silver01.png'), name: '增加专线曝光率+160%' },
						{ icon: this.gtCommon.getOssImg('sansong/silver02.png'), name: '增加企业曝光率+200%' },
						{ icon: this.gtCommon.getOssImg('sansong/silver03.png'), name: '访问人数增加+130%' },
						{ icon: this.gtCommon.getOssImg('sansong/silver04.png'), name: '订单增量+110%' }
					]
				},
				goldIconLeft: this.gtCommon.getOssImg('sansong/gold_left.png'),
				goldIconRight: this.gtCommon.getOssImg('sansong/gold_right.png'),
				silverIconLeft: this.gtCommon.getOssImg('sansong/silver_left.png'),
				silverIconRight: this.gtCommon.getOssImg('sansong/silver_right.png'),
				
				line_id: '',
				data: {},
				flag: false,
				show: false,
				notices: [],
				promote_type_name: '',
				promote_end_time: '',
				show_renew: false,
				active: 1,
				type: -1
			}
		},
		onLoad(option) {
			let gt = this
			gt.line_id = option.line_id
			if(option.promote_type === '1' || option.promote_type === '2' || option.promote_type == '3') {
				gt.promote_type_name = '金卡'
			} else if(option.promote_type === '6' || option.promote_type === '7' || option.promote_type == '8') {
				gt.promote_type_name = '银卡'
			}
			if(JSON.parse(option.promote_end_time)) {
				let promote_end_time = gt.gtCommon.formateTime(parseInt(option.promote_end_time), 'YYYY/MM/DD')
				let str = `您的${gt.promote_type_name}推广服务将在${promote_end_time}到期哦！快来续费或升级吧~`
				gt.notices = [str]
				gt.promote_end_time = option.promote_end_time
			}
			gt.data = JSON.parse(decodeURIComponent(option.params))
			gt.getDate(gt.data)
		},
		onShow() {
			
		},
		computed: {
			num() {
				let gt = this
				let str = 0
				switch (gt.type) {
					case 1:
						str = gt.data.linePromote_gold_annual_nowMoney
						break;
					case 2:
						str = gt.data.linePromote_gold_semi_nowMoney
						break;
					case 3:
						str = gt.data.linePromote_gold_quarter_nowMoney
						break;
					case 6:
						str = gt.data.linePromote_silver_annual_nowMoney
						break;
					case 7:
						str = gt.data.linePromote_silver_semi_nowMoney
						break;
					case 8:
						str = gt.data.linePromote_silver_quarter_nowMoney
						break;
					default:
						break;
				}
				return str
			},
			btnName() {
				let gt = this
				let str = ''
				if(!gt.promote_end_time) {
					return str = '立即开通'
				} else {
					if(gt.promote_type_name === '银卡') {
						return str = gt.active === 1 ? '立即升级' : '立即续费'
					} else {
						return str = '立即续费'
					}
				}
			},
			btnName1() {
				let gt = this
				let str = ''
				if(gt.active === 1) {
					str = gt.promote_end_time ? '立即续费' : '立即开通'
				}
				return str
			},
			btnName2() {
				let gt = this
				let str = ''
				if(gt.active === 2) {
					str = gt.promote_end_time ? '立即续费' : '立即开通'
				}
				return str
			}
		},
		methods: {
			// getDate() {
			// 	let gt = this
			// 	gt.gtRequest.post('/logistics/Specialline/get_promote_config_info').then(res => {
			// 		gt.data = res
			// 		// if(!res.linePromote_gold_switch) gt.active = 2
			// 		if(!res.linePromote_gold_switch && res.linePromote_silver_switch) {
			// 			if(gt.promote_type_name === '' || gt.promote_type_name === '银卡') gt.active = 2
			// 		}
			// 		if(!res.linePromote_gold_switch && !res.linePromote_silver_switch) {
			// 			if(gt.promote_type_name === '银卡') gt.active = 2
			// 		}
			// 	})
			// },
			getDate(res) {
				let gt = this
				if(!res.linePromote_gold_switch && res.linePromote_silver_switch) {
					if(gt.promote_type_name === '' || gt.promote_type_name === '银卡') gt.active = 2
				}
				if(!res.linePromote_gold_switch && !res.linePromote_silver_switch) {
					if(gt.promote_type_name === '银卡') gt.active = 2
				}
			},
			goApply(e, name) {
				let gt = this
				if(gt.type === -1) {
					return gt.$refs.uToast.show({
						title: '请选择推广类型'
					})
				}
				if(!gt.flag) {
					return gt.$refs.uToast.show({
						title: '请勾选同意推广协议'
					})
				}
				if(e) {
					gt.type = parseInt(e)
				} else {
					if((gt.type === 1 || gt.type === 2 || gt.type === 3) && gt.promote_type_name === '银卡' && gt.btnName === '立即升级') {
						return gt.show = true
					} else if((gt.type === 6 || gt.type === 7 || gt.type === 8) && gt.btnName === '立即续费' && gt.data.linePromote_gold_switch) {
						return gt.show_renew = true
					}
				}
				let url = name === '立即续费' ? '/logistics/Specialline/create_renew_promote_order' : '/logistics/Specialline/create_promote_order'
				let pay_type = '立即续费' ? 4 : 3
				gt.gtRequest.post(url, {
					line_id: gt.line_id,
					promote_type: gt.type
				}).then(res => {
					uni.navigateTo({
						url: "./settleAccounts?type=" + pay_type + "&num=" + gt.num + '&order_id=' + res.order_id + '&promote_type=' + gt.type
					})
				})
			},
			read() {
				let gt = this
				gt.gtCommon.goLicence('https://saasdemo.sansongkeji.com/adminsite/#/agreement/promotion')
			},
			confirm() {
				let gt = this
				gt.show = false
				gt.goApply(gt.type)
			},
			goDetail() {
				uni.navigateTo({
					url: './promotionDetail'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $gtBackgroundColor;
		.gt_content {
			padding: 30rpx 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			.tabs {
				height: 60rpx;
				display: flex;
				background-color: #f4f6ff;
				border-radius: 16rpx 16rpx 0 0;
				box-shadow: 0px 0px 11px 0px rgba(216,216,216,0.25);
				.tab_active {
					background-color: #fff;
					border-radius: 16rpx 16rpx 0 0;
					.tabs_name {
						color: #000;
						margin-left: 16rpx;
					}
				}
			}
			.tab {
				display: flex;
				justify-content: center;
				align-items: center;
				flex: 1;
				.goldLogo {
					width: 28rpx;
					height: 26rpx;
					background-size: cover;
					background-repeat: no-repeat;
				}
				.tabs_name {
					color: #666666;
					margin-left: 16rpx;
				}
			}
			.tabs_gold,
			.tabs_silver {
				background-color: #fff;
				border-radius: 16rpx 16rpx 0 0;
				padding-top: 42rpx;
				.tabs {
					width: 501rpx;
					height: 42rpx;
					position: relative;
					background-size: cover;
					background-repeat: no-repeat;
					margin: 0 auto;
					background-color: transparent;
					border: 0;
					box-shadow: none;
					.tab {
						position: absolute;
						top: 0;
						left: 50%;
						transform: translate(-50%, -16rpx);
					}
				}
			}
			.card_options {
				background-color: #fff;
				display: flex;
				// justify-content: space-between;
				align-items: center;
				padding: 52rpx;
				border-radius: 0 0 16rpx 16rpx;
				// box-shadow: 0px 0px 11px 0px rgba(216,216,216,0.25);
				.option {
					position: relative;
					width: 176rpx;
					height: 180rpx;
					background-color: #FCFCFC;
					border: 2rpx solid #E3E3E3;
					border-radius: 16rpx;
					padding: 30rpx 0 20rpx 0;
					margin-right: 30rpx;
					&:nth-last-child(1) {
						margin-right: 0;
					}
					.badge {
						position: absolute;
						top: 0;
						left: -2rpx;
						transform: translate(0, -50%);
						background: linear-gradient(
							to right,
							#F2F2F2,
							#D7D7D7
						);
						border-radius: 16rpx 0 16rpx 0;
						font-size: 22rpx;
						padding: 4rpx 20rpx;
						color: #7A7A7A;
					}
					.option_title {
						text-align: center;
						font-size: 24rpx;
					}
					.option_nowNum {
						text-align: center;
						padding: 16rpx 0 12rpx 0;
						.num {
							font-size: 32rpx;
							font-weight: 700;
						}
					}
					.option_Num {
						text-align: center;
						color: #B4B4B4;
						font-size: 20rpx;
						text-decoration: line-through;
					}
				}
				.option_active {
					background: linear-gradient(
						to bottom,
						#BFC7FF,
						#ffffff
					);
					border: 2rpx solid #A3AEFF;
					.badge_gold {
						background: linear-gradient(
							to right,
							#FFF2E1,
							#F4D1AB
						);
						color: #7B4D25;
					}
					.badge_silver {
						background: linear-gradient(
							to right,
							#E7ECFC,
							#C2CCE9
						);
						color: #000000;
					}
					.option_nowNum {
						color: #FF2330;
					}
				}
			}
			.notices {
				background-color: #EFEFEF;
				border-radius: 37rpx;
				margin: 30rpx 64rpx;
			}
			.card_msg {
				background-color: #fff;
				border-radius: 16rpx;
				padding: 20rpx 88rpx 50rpx 74rpx;
				box-shadow: 0px 0px 11px 0px rgba(216,216,216,0.25);
				.msg_head {
					display: flex;
					align-items: center;
					justify-content: center;
					.msg_logo_left,
					.msg_logo_right {
						width: 88rpx;
						height: 2rpx;
						background-size: cover;
						background-repeat: no-repeat;
					}
					.msg_title {
						margin: 0 26rpx;
						font-size: 32rpx;
					}
					.msg_title_gold {
						color: #9E8004;
					}
					.msg_title_silver {
						color: #535C73;
					}
				}
				.msg_content {
					.content_item {
						width: 386rpx;
						height: 70rpx;
						position: relative;
						margin-top: 36rpx;
						border-radius: 10rpx;
						.item_index {
							height: 70rpx;
							line-height: 70rpx;
							font-size: 32rpx;
							padding-left: 32rpx;
						}
						.item_info {
							width: 440rpx;
							height: 70rpx;
							position: absolute;
							right: 0;
							top: 0;
							transform: translate(154rpx, -6rpx);
							display: flex;
							align-items: center;
							background-color: #fff;
							box-shadow: 2px 0px 11px 0px rgba(66,61,57,0.1);
							border-radius: 10rpx;
							.item_info_icon {
								width: 54rpx;
								height: 54rpx;
								background-size: cover;
								background-repeat: no-repeat;
								margin: 0 20rpx 0 40rpx;
							}
						}
					}
					.item_gold {
						background: linear-gradient(
							to right,
							#423D39,
							rgba(66, 61, 57, 0)
						);
						.item_index {
							color: #CFA239;
						}
					}
					.item_silver {
						background: linear-gradient(
							to right,
							#3F4961,
							rgba(63, 73, 98, 0)
						);
						.item_index {
							color: #fff;
						}
					}
				}
			}
			.authorization {
				display: flex;
				align-items: center;
				margin: 34rpx 0 38rpx 12rpx;
				.radio {
					width: 32rpx;
					height: 32rpx;
					background-size: cover;
					background-repeat: no-repeat;
					margin-right: 16rpx;
				}
				.agreement {
					color: $gtProjectColor;
				}
			}
			.btn {
				margin: 0 40rpx;
			}
			.goDetail {
				margin: 116rpx 0 88rpx 0;
				text-align: center;
				font-size: 26rpx;
				color: #777777;
			}
			.upgrade {
				background-color: #fff;
				.info {
					margin: 80rpx 0 100rpx 0;
					text-align: center;
					font-weight: 400;
					color: #000;
				}
				.btns {
					font-family: PingFangSC-Regular, PingFang SC;
					.confirm {
						width: 384rpx;
						height: 80rpx;
						line-height: 80rpx;
						background-color: #495EF4;
						color: #fff;
						border-radius: 40rpx;
						text-align: center;
						margin: 0 auto;
						font-size: 32rpx;
					}
					.close {
						color: #777777;
						text-align: center;
						margin-top: 30rpx;
						margin-bottom: 30rpx;
					}
				}
			}
		}
	}
</style>