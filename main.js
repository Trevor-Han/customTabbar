import Vue from 'vue'
import App from './App'
// import creatRouter from './router/index.js'

// let router = creatRouter()
import tabBar from 'components/tab-bar/tabBar.vue'
Vue.component('tab-bar',tabBar)

Vue.config.productionTip = false
// Vue.prototype.$vueRouter = router
// Vue.prototype.$vueRoute = router.routeInfo

App.mpType = 'app'

const app = new Vue({
	render: h => h(App)

})
app.$mount()
// console.log(app)