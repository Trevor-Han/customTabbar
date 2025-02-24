<template>
	<!--   考勤班次 -->
	<view class="wrap">
		<view class="status_bar">
			<!-- <text>考勤配置</text> -->
		</view>
		<gui-page :fullPage="true" :isLoading="pageLoading" ref="guiPage">
			<view slot="gBody" class="gui-flex1 gui-flex gui-columns">
				<!-- 局部选项卡 使用 切换导航 + swiper 实现 -->
				<!--  Header -->
				<view class="header">
					<view class="demo-nav">
						<view class="navBox">
							<view class="gui-grids-items iconFixed" @click="restitution">
								<text class="gui-icons">&#xe643;</text>
							</view>
							<view class="navTitle">
								考勤班次
							</view>
							<view class="gui-margin-top search-warp">
								<gui-search style="background-color: #FFFFFF !important;" placeholder="搜索班次名称"
									@inputting="inputting" @confirm="confirm"></gui-search>
							</view>
						</view>
						<view class="tabContainer" gui-bg-white gui-dark-bg-level-3 gui-padding gui-margin-top>
							<gui-switch-navigation :items="tabs" :size="400" :currentIndex="currentIndex" textAlign="center"
								:isCenter="true" activeLineBg="linear-gradient(to right, #fff, #fff)" activeColor="#fff"
								color="#fff" eLineHeight="4rpx" lineHeight="80rpx" activeLineWidth="120rpx"
								activeDirection="center" activeFontSize="30rpx" @change="navchange"></gui-switch-navigation>
						</view>
					</view>
				</view>
			
				<!-- 遮罩层 -->
				<view class="maskLayer" v-if="!attendanceFalsgs"></view>
				<!-- 内容区 -->
				<!--  中间部分 -->
				<view class="contentBox" :style="{height:mainHeight+'px'}">
					<swiper :current="currentIndex" @change="swiperChange" class="cardBox">
						<!-- 轮播项目数量对应 上面的选项标签 -->
						<!-- 全部班次 -->
						<swiper-item>
							<!-- 使用滚动区域来实现主体内容区域 -->
							<scroll-view :scroll-y="true" :style="{height:mainHeight+'px'}">
								<!--  新增班次 -->
								<view class="gui-card-view gui-margin-top gui-padding-Line"
									@click="addClassesClick('新增班次')">
									<text class="addClasses gui-grids-icon gui-icons gui-icons-add-sum">&#xe625;</text>
									<text class="addClasses gui-icons-add">新建班次</text>
								</view>
								<!-- 班次列表 -->
								<view class="gui-card-view gui-margin-top">
									<view class="list">
										<view class="my-list">
											<view class="gui-list-items gui-border-b" v-for="item,index in AllData"
												:key="index" @click="editClassesClick('编辑班次',item)">
												<view class="gui-list-body gui-border-b">
													<view class="gui-flex">
														<view class="gui-list-title">
															<gui-radio @change="radioChange" color="#dcdcdc" value="1"
																style="margin-right: 20rpx;" v-if="!attendanceFalsgs">
															</gui-radio>
															<!--  上半部分 -->
															<view>
																<view>
																	<text
																		class="gui-list-title-text gui-primary-color">{{item.shiftName}}</text>
																</view>
																<view class="gui-flex gui-margin-left">
																	<!--  下半部分 -->
																	<text class="gui-list-title-desc gui-color-gray">
																		{{formatTime(item.sectionTime)}}</text>
																	<text
																		class="gui-list-title-desc gui-color-gray gui-title-magrin">
																		{{formatTimeTimes(item.sectionTime)}}</text>
																	<text
																		class="gui-list-title-desc gui-color-gray gui-l gui-title-list gui-title-magrin gui-title-font-16">{{`${Math.floor(item.shiftWorkTime / 60)}小时${item.shiftWorkTime % 60}分钟`}}</text>
																</view>
															</view>
														</view>
													</view>
												</view>
												<text
													class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
											</view>
											<view class="grace-loading" v-if="isLoadAll">{{ loadingTxt }}</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</swiper-item>
						<!-- 我管理的 -->
						<swiper-item>
							<!-- 使用滚动区域来实现主体内容区域 -->
							<scroll-view :scroll-y="true" :style="{height:mainHeight+'px'}" @scrolltolower="onScrollToLower">
								<!--  新增班次 -->
								<view class="gui-card-view gui-margin-top gui-padding-Line"
									@click="addClassesClick('新增班次')">
									<text class="addClasses gui-grids-icon gui-icons gui-icons-add-sum">&#xe625;</text>
									<text class="addClasses gui-icons-add">新建班次</text>
								</view>
								<!-- 班次列表 -->
								<view class="gui-card-view">
									<view class="my-list-flow-y">
										<view class="my-list">
											<view class="gui-list-items gui-border-b"
												v-for="item,index in manageSelfData" :key="index"
												@click="editClassesClick('编辑班次',item)">
												<view class="gui-list-body gui-border-b">
													<view class="gui-flex">
														<view class="gui-list-title">
															<gui-radio @change="radioChange" color="#dcdcdc" value="1"
																style="margin-right: 20rpx;"></gui-radio>
															<!--  上半部分 -->
															<view>
																<view>
																	<text
																		class="gui-list-title-text gui-primary-color">{{item.shiftName}}</text>
																</view>
																<view class="gui-flex gui-margin-left">
																	<!--  下半部分 -->
																	<text class="gui-list-title-desc gui-color-gray">
																		{{item.sectionTime==null?'':item.sectionTime}}</text>
														<!-- 			<text
																		class="gui-list-title-desc gui-color-gray gui-title-magrin">
																		{{formatTimeTimes(item.sectionTime)}}</text> -->
																	<text
																		class="gui-list-title-desc gui-color-gray gui-l gui-title-list gui-title-magrin
																		 gui-title-font-16">{{`${Math.floor(item.shiftWorkTime / 60)}小时${item.shiftWorkTime % 60}分钟`}}</text>
																</view>
															</view>


														</view>
													</view>
												</view>
												<text
													class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</swiper-item>
					</swiper>
				</view>
				<!--  底部 -->
				<view class="footer">
					<view style="display: flex;justify-content: center;">
						<view class="demo gui-button gui-bg-blue gui-noborder" hover-class="gui-tap"
							v-if="!attendanceFalsgs">
							<text class="gui-color-white gui-button-text">保存</text>
						</view>
					</view>
				</view>
				
			</view>
		</gui-page>
	</view>
</template>
<script>
	// var graceJS = require('@/GraceUI5/js/grace.js');
	// import {
	// 	baseUrl
	// } from '@/common/js/config.js';
	export default {
		data() {
			return {
				schoolCode: uni.getStorageSync('schoolCode'), // 学校名称标识
				Users: uni.getStorageSync('user'), // 人员标识
				searchKeyword: '',
				hello: false,
				// 全屏 loading
				pageLoading: true,
				// 选项卡标签
				tabs: [{
					id: 1,
					name: '全部班次'
				}, {
					id: 2,
					name: '我管理的'
				}],
				// 选中选项的 索引
				currentIndex: 0,
				// 核心区域高度 
				mainHeight: 200,
				attendanceFalsgs: true, // 查看&& 新增
				isLoadAll:false,
				// --- 分页-----
				loadingTxt: '加载中...',
				totalPages: 1,  // 总页数
				paramsData: {
				 		start: 1,
				 		limit: 10,
				 	},
					AllData: [], // 全部班次list 数据组
					manageSelfData: [], // 我管理的
				
			}
		},
		onLoad: function(options) {
			console.log(options, "options")
			let that = this

			let {
				params
			} = options
			that.attendanceFalsgs = params
			console.log(that.attendanceFalsg)
			// 01. 获取页面主体高度
			graceJS.getRefs('guiPage', this, 0, (ref) => {
				ref.getDomSize('guiPageBody', (e) => {
					console.log(e);
					this.mainHeight = e.height - uni.upx2px(100);
					this.pageLoading = false;
				});
			});
			console.log(baseUrl, "baseURL")
		},
		mounted() {
			this.querySalesCollectionDetails() // 全部班次
			this.manageSelfHandle() // 我管理的
		},
		onShow(){
			this.querySalesCollectionDetails() // 全部班次
			this.manageSelfHandle() // 我管理的
		},
		// uni-app页面滚动到底部的事件，常用于上滑加载下一页数据
		onReachBottom() {
			console.log("走了吗????")
		    // 判断当前页是否大于等于总页数
		    if (this.totalPages <= this.paramsData.start) {
		        this.isLoadAll = true;
			this.loadingTxt = '没有更多数据啦~';
		    } else {
			this.paramsData.start++;
			this.isLoadAll = true;
			this.loadingTxt = '加载中...';
			this.querySalesCollectionDetails();   // 每次滑动请求接口，实现上拉加载更多数据
		    }
		},
		 
		methods: {
			// 解决时间问题
			formatTime(timeRange) {
				// let times = timeRange.split(/[-,]/);
				// console.log(times, "times")
				// let newTimes = times.map(time => time.slice(0, -3));
				// console.log(newTimes, "newTimes")
				// return newTimes.slice(0, 2).join('-').replace(/- /g, ' ');
			},
			formatTimeTimes(timeRange) {
				// let times = timeRange.split(/[-,]/);
				// console.log(times, "times")
				// let newTimes = times.map(time => time.slice(0, -3));
				// console.log(newTimes, "newTimes")
				// return newTimes.slice(2, 5).join('-').replace(/- /g, ' ');
			},
			// 点击新增班次
			addClassesClick(title) {
				uni.navigateTo({
					url: `./additional-frequency?title=${title}`
				});
			},
			// 编辑班次
			editClassesClick(title, row) {
				console.log("每一行的数据", row);
				// 将 row 对象转换为 JSON 字符串并编码
				const encodedRow = encodeURIComponent(JSON.stringify(row));
				uni.navigateTo({
					url: `./additional-frequency?title=${title}&row=${encodedRow}`,
				});
			},
			//------- 全部班次------
			querySalesCollectionDetails() {
				console.log(this.schoolCode, "schoolCode")
				
				this.$http.get(this.zhJSONurl + 
				'/api/attendenceshift/v1/query_shift', {
					schoolCode: this.schoolCode,
					start:this.paramsData.start ,// 当前页
					limit:this.paramsData.limit// 条数
				}, this.getHeader()).then(res => {
					console.log("考勤班次列表响应", res);
					this.AllData = [...this.AllData,...res.data.data]
					this.totalPages = res.total // 总条数
					if (res.data.code != 0) return;
				
				})
			},
			// --------  我管理的----------
			manageSelfHandle() {
				let that = this
				let {
					userId
				} = that.Users
				this.$http.get(this.zhJSONurl + '/api/attendenceshift/v1/query_shift', {
					userId: userId,
					schoolCode: this.schoolCode,
				}, this.getHeader()).then(res => {
					console.log("我管理的考勤班次>>>", res);
					if (res.data.code != 0) return;
					this.manageSelfData = res.data.data
				})
			},
			// 搜索框
			// 监听输入
			inputting(e) {
				this.searchKeyword = e
			},
			// 监听提交
			// 
			confirm() {
				if (!this.searchKeyword) {
					this.attendanceShiftList()
				} else {
					this.$http.get('http://192.168.8.166:18080' + '/api/attendenceshift/v1/query_shift', {
						schoolCode: this.schoolCode,
						searchValue: this.searchKeyword,
					}, this.getHeader()).then(res => {
						console.log("班次搜索响应", res);
						if (res.data.code != 0) return
						this.classes = res.data.data
						this.$forceUpdate()
					})
				}
			},
			navchange: function(index) {
				this.currentIndex = index;
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.currentIndex = index;
			},
			// 返回上个页面
			restitution() {
				uni.navigateBack()
			},
		}
	}
</script>
<style>
	.tabContainer {
		margin-top: 10rpx;
		text-align: center;
	}

	.status_bar {
		height: var(--status-bar-height);
	}
	.my-list{
		overflow-y: auto;
		height: 910rpx;
	}
	.navBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		/* 		text-align: center;
		line-height: center; */
		color: #FFFFFF;
	}

	/*  选项卡标识 */
	/deep/.nav-active-line {
		width: 130rpx !important;
		height: 6rpx !important;
		margin-bottom: 8rpx;
	}

	.navTitle {
		font-size: 30rpx;
	}

	.iconFixed {
		position: fixed;
		left: 20rpx;
		top: 30rpx;
	}
	/*  整体 */
	.wrap {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		/*布局方向是垂直的*/
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	
	/*设置顶部和底部的高度*/
	.header,
	.footer {
		/* height: 40px; */
		line-height: 40px;
		background-color: #2990ff;
		text-align: center;
	}
	.contentBox {
		/* padding: 20rpx; */
		background-color: #f0f0f0;
		/*设置高度是跟父元素的高度一致，100%；*/
		/*实际高度是 100% 减去顶部高度和底部高度，左右两边固定，中间是剩余100%原理一致*/
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		/* width: 100%; */
		height: 200%;
		overflow: auto;
	}

	/* 搜索框 */
	.search-warp {
		width: 85%;
		padding: 10rpx 40rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF !important;
	}

	.cardBox {
		height: 100%;
		padding: 0 20rpx 0 20rpx;
	}

	.demo-text {
		line-height: 200rpx;
		padding-bottom: 3000px;
	}

	/* 全屏选项卡 */
	.demo-nav {
		background-color: #2990ff;
	}

	.gui-button {
		width: 90%;
		position: fixed;
		bottom: 10rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 20rpx;
	}

	/* 遮罩层 */
	.maskLayer {
		position: fixed;
		bottom: 0;
		background-color: #fff;
		height: 9vh;
		width: 100%;
	}

	/* 列表 */
	.my-list {
		/* margin: 30rpx 0; */
		padding: 0 20rpx;
	}

	.viewAll {
		margin-left: 50%;
		transform: translateX(-50%);
	}

	/* 卡片视图 */
	.gui-card-view {
		border-radius: 20rpx;
		background-color: #fff;
	}

	.addClasses {
		/* padding: 10rpx; */
	}

	/* 图标 */
	.gui-grids-icon {
		width: 70rpx !important;
		/* width: 10%; */
	}

	.gui-grids-text {
		color: rgba(69, 90, 100, 0.8);
	}

	.gui-icons-add {
		font-size: 30rpx;
		color: #2990ff;
		font-weight: 500;
	}

	/*  边框间隔 */
	.gui-margin-top {
		margin: 40rpx 0 40rpx 0;
	}

	/*  新增班次 */
	.gui-icons-add-sum {
		font-size: 40rpx;
		color: #2990ff;
		font-weight: 900;
	}

	.gui-icons-add {
		font-size: 30rpx;
		color: #2990ff;
	}

	.gui-padding-Line {
		padding: 25rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 列表 */
	.gui-list-body {
		/* padding: 38rpx 36rpx 38rpx 36rpx; */
	}

	/*  时间间距 */
	.gui-title-magrin {
		margin-left: 30rpx;
	}

	.gui-margin-left {
		margin-top: 10rpx;
	}

	.gui-title-font-16 {
		font-size: 24rpx;
	}

	/*  icon */
	.gui-list-arrow-right {
		font-size: 48rpx;
	}

	/*  修改背景颜色-下半部分 */
	.gui-bg-gray {
		background-color: #f0f0f0 !important;
	}
</style>
