<template>
	<view>
		<!--  <tab-link to="/pages/index/index">index</tab-link> -->
		<button @click="toMY">跳转</button>
		<!-- <tab-bar>
			<index></index>
			<my></my>
			<team></team>
			<promotion></promotion>
		</tab-bar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toMY() {
				uni.setStorageSync('selectedIndex', 1);
				uni.switchTab({
					url: '/pages/team/team'
				});
			}
		}
	}
</script>

<style>

</style>
