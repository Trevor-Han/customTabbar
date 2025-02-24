export default {
	data() {
		return {
			offset:0
		}
	},
	onShow() {
		this.$nextTick(()=>{
			this.$refs.tabBar.selectTab()
		})
	},

}