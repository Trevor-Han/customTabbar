<template>
	<view>
		<view class="">我是首页</view>
		<button @click="toMY">跳转</button>
		<tab-bar ref="tabBar"></tab-bar>
	</view>
</template>

<script>
	import tabbarMixins from '@/mixins/tabbarMixins.js'
	export default {
		mixins:[tabbarMixins],
		data() {
			return {}
		},
		mounted() {
			// console.log(this.$router)
		},
		methods: {	
			toMY() {
				// uni.switchTab({
				// 	url:'pages/team/team',
				// 	fail: (e) => {
				// 		console.log(e)
				// 	}
				// })
				this.$refs.tabBar.switchTab({
					pagePath: 'pages/days/days'
				})
			  uni.setStorageSync('selectedIndex', 5);
			}
		}

	}
</script>

<style>
</style>
