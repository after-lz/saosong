<template>
	<view class="videoList">
		<view class="video-view">
			<video class="my-video" :src="videoUrl" :muted="muted" autoplay loop  :show-mute-btn="true" ></video>
		</view>
		
		<view class="bot-view" :style="{bottom: bottomHeight+'px'}">
			<view class="bot-main">
				<view class="more-view">更多视频</view>
				<view class="video-list">
					<scroll-view :scroll-x="true">
						<view class="list-view flex-left">
							<block v-for="(item, index) in list" :key="index">
								<view class="video-li" @click="playClick(item, index)">
									<view class="video-pic">
										<u-image :showLoading="true" :src="item.cover" width="280" height="160"></u-image>
										<view class="paly-view" v-if="playIndex == index">播放中</view>
									</view>
									<view class="video-name">{{ item.title }}</view>
								</view>
							</block>
						</view> 
					</scroll-view>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "videoList",
		data() {
			return {
				logistics_id: 0,
				videoUrl: "",
				muted: true,
				barHeight: 0,
				bottomHeight: 0,
				list: [],
				playIndex: 0
			}
		},
		onLoad(options) {
			this.list = JSON.parse(decodeURIComponent(options.videos))
			this.videoUrl = this.list[0].img_path
		},
		methods: {
			playClick(item, index) {
				if(this.playIndex != index) {
					this.playIndex = index
					this.videoUrl = item.img_path
				}	
			}
		}
	}
</script>
<style lang="scss" scoped>
	.videoList{
		width: 100%;
		height: 100vh;
		background-color: #000000;
		.video-view{
			width: 100%;
			height: calc(100% - 380rpx);
			display: flex;
			align-items: center;
			.my-video{
				width: 100%;
				height: 100%;
			}
			.sound-view{
				position: absolute;
				bottom: 80rpx;
				right: 32rpx;
				z-index: 9999;
			}
		}
		.bot-view{
			width: 100%;
			height: 380rpx;
			background-color: #35393C;
			z-index: 9;
			.bot-main{
				padding: 0 24rpx;
				.more-view{
					padding: 20rpx 0;
					color: #fff;
					font-size: 32rpx;
					font-weight: 700;
				}
				.video-list{
					width: 100%;
					height: 110px;
					.list-view{
						width: 100%;
						height: 110px;
						display: flex;
						align-items: flex-start;
						.video-li{
							// width: 140px;
							min-width: 140px;
							height: 110px;
							margin-right: 20rpx;
							.video-pic{
								border-radius: 16rpx;
								width: 100%;
								height: 80px;
								background-color: #D8D8D8;
								position: relative;
								overflow: hidden;
								.paly-view{
									position: absolute;
									left: 0;
									bottom: 24rpx;
									width: 100rpx;
									height: 40rpx;
									line-height: 40rpx;
									z-index: 99;
									background-color: #485EF4;
									border-top-right-radius: 8rpx;
									border-bottom-right-radius: 8rpx;
									color: #fff;
									text-align: center;
									font-size: 24rpx;
								}
							}
							.video-name{
								width: 100%;
								height: 30px;
								line-height: 30px;
								font-size: 24rpx;
								color: #fff;
							}
						}
					}
				}
			}
		}
	}
</style>