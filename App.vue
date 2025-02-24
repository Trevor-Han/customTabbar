
<script>

	export default {
		
		onLaunch: function() {
			uni.removeStorageSync('selectedIndex');
			console.log(111)
			console.log('App Launch')
			uni.hideTabBar()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.uni-p-b-98{
		padding-bottom: 150rpx;
	}
	
	.black-tab{
	  width: 750rpx;
	  padding: 15rpx 0;
	  height: 90rpx;
	  display: flex;
	  justify-content: space-around;
	  align-items: center;
	  line-height: 1.2;
	  font-size: 24rpx;
	  text-align: center;
	  position: fixed;
	  bottom: 0;
	  z-index: 99;
	  background: #fff;
	  box-shadow: 0 -2rpx 0rpx #ccc;
	}
	.black-tab image{
	  width: 50rpx;
	  height: 50rpx;
	}
</style>
