import Vue from 'vue'

import index from '../pages/index/index'
import my from '../pages/my/my'
import team from '../pages/team/team'
import promotion from '../pages/promotion/promotion'

import VueRouter from './router.js'

Vue.use(VueRouter)

const routes = [{
		"pagePath": "/pages/index/index",
		"iconPath": "/static/tabIcon/icon1.png",
		"selectedIconPath": "/static/tabIcon/icon2.png",
		"text": "首页",
		'name': 'index',
		'component': index,
	}, {
		"pagePath": "/pages/team/team",
		"iconPath": "/static/tabIcon/icon3.png",
		"selectedIconPath": "/static/tabIcon/icon4.png",
		"text": "团队",
		'name': 'team',
		'component': team,
	}, {
		"pagePath": "/pages/promotion/promotion",
		"iconPath": "/static/tabIcon/icon5.png",
		"selectedIconPath": "/static/tabIcon/icon6.png",
		"text": "推广圈",
		'name': 'promotion',
		'component': promotion,
	},
	{
		"pagePath": "/pages/my/my",
		"iconPath": "/static/tabIcon/icon7.png",
		"selectedIconPath": "/static/tabIcon/icon8.png",
		"text": "我的",
		'name': 'my',
		'component': my,
	}
]
export default () =>{
	return new VueRouter({
		mode: 'hash',
		routes
	})
};
