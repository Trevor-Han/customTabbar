let Vue;
class routeInfo {
	constructor() {
		this.currentPath = null;
	}
}
class VueRouter {
	constructor(options) {
		this.mode = options.mode || 'hash';
		this.routes = options.routes || [];
		this.routesMap = this.createRoutesMap();
		this.routeInfo = new routeInfo();
		this.initDefault();
	}
	initDefault() {
		if (this.mode === 'hash') {
			if (!location.hash) {
				location.hash = '/';
			}
			window.addEventListener('load', () => {
				this.routeInfo.currentPath = location.hash.slice(1);
			});
			window.addEventListener('hashchange', () => {
				this.routeInfo.currentPath = location.hash.slice(1);
			});
		} else {
			if (!location.pathname) {
				location.pathname = '/';
			}
			window.addEventListener('load', () => {
				this.routeInfo.currentPath = location.pathname;
			});
			window.addEventListener('popstate', () => {
				this.routeInfo.currentPath = location.pathname;
			});
		}
	}
	createRoutesMap() {
		return this.routes.reduce((map, route) => {
			map[route.pagePath] = route.component;
			return map;
		}, {})
	}
}

VueRouter.install = (vm, options) => {
	// 3、全局注入属性
	Vue = vm
	Vue.mixin({
		beforeCreate() {
			if (this.$options && this.$options.router) {
				this.$router = this.$options.router;
				this.$route = this.$router.routeInfo;
				Vue.util.defineReactive(this, 'xxx', this.$router);
				Vue.util.defineReactive(this, 'router', this.$router);
			} else {
				this.$router = this.$parent.$router;
				this.$route = this.$router.routeInfo;
			}
		}
	});
	Vue.component('tab-view', {
		render(h) {
			let routesMap = this._self.router.routesMap
			if (this._self.router.routeInfo.currentPath) {
				let currentPath = this._self.router.routeInfo.currentPath
				let currentComponent = routesMap[currentPath]
				return h(currentComponent)
			}

		}
	});
	Vue.component('tab-link', {
		props: {
			to: String
		},
		render(h) {
			let path = this.to;
			if (this._self.$router.mode === 'hash') {
				path = '#' + path;
			}
			return <a href = {
				path
			} > {
				this.$slots.default
			} < /a>
		}
	})
};
export default VueRouter;
