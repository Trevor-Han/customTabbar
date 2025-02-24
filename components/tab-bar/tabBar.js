function showTabBar(){
	 getApp().globalData.showTabBar = true
 }
 
function hideTabBar(){
	 getApp().globalData.showTabBar = false
	 return getApp().globalData.showTabBar
 }
 
 export{
	 showTabBar,
	 hideTabBar
 }
 