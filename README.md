 # uni-app自定义tabBar
 一个关于在uni-app中实现自定义tabBar的思路

## 写在前面的话
关于更多介绍以及实现原理请移步：
- [uni-app自定义tabBar](https://blog.csdn.net/weixin_45785873/article/details/115202941)

### 核心思想
核心就是需要重写一个switchTab跳转方法，另外需要使用setStorageSync缓存一下index
```js
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
```

## 主要步骤
### pages.json文件中添加tarBar
因为需要用到tabBar跳转，因此可以往原来的tabBar.list中多添加几个,用于做判断是否tabBar切换
### 把原生的tabBar隐藏起来
在App.vue中把原生的tabBar先隐藏起来，同时添加一个removeStorageSync，用于移除使用的tabBar的下标。
```js
onLaunch: function() {
	console.log('App Launch')
	uni.hideTabBar()
   uni.removeStorageSync('selectedIndex');
},
```
### 自定义一个tabBar组件
在components中新建一个tabBar.vue的页面，用来封装组件代码，里面循环遍历自己定义的tabBar.list
```js
data() {
    return {
        selectedIndex: uni.getStorageSync('selectedIndex') || 0, // 标记
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
                }
            ]
        },
    }
}
```
### 全局引用组件
往main.js注入组件
```js
// main.js
import tabBar from 'components/tab-bar/tabBar.vue'
Vue.component('tab-bar',tabBar) //挂载
```
### 路由跳转
```js
toMY() {
	this.$refs.tabBar.switchTab({
	   pagePath:'pages/team/team'
	})
   // 注：这里需要把下标也写上，不然无法命中
    uni.setStorageSync('selectedIndex', 5);
},
```
