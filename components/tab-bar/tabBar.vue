<template>
	<uni-transition mode-class="fade" :duration="200" :show="true">
		<view>
			<view class="tab-content">
				<slot />
			</view>
			<view class="tabbar">
				<view class="navigator">
					<view ref='warpper' class="warpper">
						<view ref="navItem" class="navigator-item" v-for="(item,index) in tabBar.list"
							:key="item.pagePath" @click="switchTab(item,index)" :id='"tabs-item-"+index'>
							<img :src="item.iconPath" class="icon" v-if="selectedIndex !== index">
							<img :src="item.selectedIconPath" class="icon" v-else>
							<text :class="['item-text',{'text-active':selectedIndex === index}]">{{item.text}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</uni-transition>

</template>

<script>
	export default {
		data() {
			return {
				time: 0,
				startPosition: 0,
				clientX: 0,
				transitionDuration: 300,
				translateX: 0,
				selectedIndex: uni.getStorageSync('selectedIndex') || 0,
				tabBar: {
					list: [{
							"pagePath": "pages/index/index",
							"iconPath": "/static/tabIcon/icon1.png",
							"selectedIconPath": "/static/tabIcon/icon2.png",
							"text": "首页"
						}, {
							"pagePath": "pages/team/team",
							"iconPath": "/static/tabIcon/icon3.png",
							"selectedIconPath": "/static/tabIcon/icon4.png",
							"text": "团队"
						}, {
							"pagePath": "pages/promotion/promotion",
							"iconPath": "/static/tabIcon/icon5.png",
							"selectedIconPath": "/static/tabIcon/icon6.png",
							"text": "推广圈"
						},
						{
							"pagePath": "pages/my/my",
							"iconPath": "/static/tabIcon/icon7.png",
							"selectedIconPath": "/static/tabIcon/icon8.png",
							"text": "我的"
						},
						{
							"pagePath": "pages/other/other",
							"iconPath": "/static/tabIcon/icon1.png",
							"selectedIconPath": "/static/tabIcon/icon2.png",
							"text": "其他"
						},
						{
							"pagePath": "pages/days/days",
							"iconPath": "/static/tabIcon/icon3.png",
							"selectedIconPath": "/static/tabIcon/icon4.png",
							"text": "日历"
						}
					]
				},
			}
		},
		computed: {
			style() {
				let style = {}
				style.transform = `translateX(${this.translateX}rpx)`
				style.transitionDuration = this.transitionDuration + 'ms'
				return style
			}
			// translateX: {
			// 	get() {
			// 		return this.offset
			// 	},
			// 	set(val) {
			// 		this.$emit('changeOffset', val)
			// 		return val
			// 	}
			// }
		},
		methods: {
			selectTab() {
				const tab = this.$refs.navItem[this.selectedIndex].$el
				tab.scrollIntoView({
					behavior: 'smooth',
					inline: 'center'
				});
			},
			/* 
			// 调整前
			methods: {
				switchTab(index, item) {
					let url = '/' + item.pagePath
					let pagePath = url
					const detail = {
						index,
						pagePath
					}
					if (this.$route.path !== url) {
						// this.__path__ = this.$route.path
						uni.switchTab({
							from: 'tabBar',
							url,
							detail
						})
					} else {
						// UniServiceJSBridge.emit('onTabItemTap', detail)
					}
					this.selectedIndex = index
					// this.$emit('switchTab', detail)
				}
			}, */
			// 调整后，1、调换入参顺序，方便传值，2、循环判断一下index，
			switchTab(item, index) {
				const navItem = this.$refs.navItem
				let url = '/' + item.pagePath
				let pagePath = url
				uni.switchTab({
					url
				})
				this.tabBar.list.forEach((v, i) => {
					if (item.pagePath === v.pagePath) {
						uni.setStorageSync('selectedIndex', index);
					}
				})
			}
		},
	}
</script>

<style>
	body {
		--translateX: 0rpx
	}

	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		z-index: 999;
		background: #F5F5F5;
		border-top: 2rpx solid #eee;
	}

	.navigator {
		width: 85%;
		margin: 0 auto;
		padding: 20rpx;
		overflow: hidden;
	}

	.warpper {
		position: relative;
		display: flex;
		justify-content: flex-start;
		width: 100%;
		/* overflow-x: scroll; */
	}

	.navigator-item {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 180rpx;
		height: 85rpx;
		flex-shrink: 0;
	}

	.item-text {
		margin-top: 6rpx;
		color: #777E86;
		font-size: 24rpx;
	}

	.text-active {
		color: #2E92FD !important;
	}

	.icon {
		width: 20px;
		height: 20px;
	}
</style>
