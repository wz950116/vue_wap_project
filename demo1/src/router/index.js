import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(Router);

// lazy router
const SaleAction = reslove => {
	require.ensure(['view/sale-action/index.vue'], () => {
		reslove(require('view/sale-action/index.vue'));
	});
};
const ActionItems = reslove => {
	require.ensure(['view/action-items/index.vue'], () => {
		reslove(require('view/action-items/index.vue'));
	});
};
const OrderAnalysis = reslove => {
	require.ensure(['view/order-analysis/index.vue'], () => {
		reslove(require('view/order-analysis/index.vue'));
	});
};
const Finish400Analysis = reslove => {
	require.ensure(['view/400finish-analysis/index.vue'], () => {
		reslove(require('view/400finish-analysis/index.vue'));
	});
};
const TrendAnalysis = reslove => {
	require.ensure(['view/trend-analysis/index.vue'], () => {
		reslove(require('view/trend-analysis/index.vue'));
	});
};

var router = new Router({
	routes: [
	    {
	        path: '/sale-action',
	        component: SaleAction,
	    }, {
	        path: '/action-items',
	        component: ActionItems,
	    }, {
	        path: '/order-analysis',
	        component: OrderAnalysis,
	    }, {
	        path: '/400finish-analysis',
	        component: Finish400Analysis,
	    }, {
	        path: '/trend-analysis',
	        component: TrendAnalysis,
	    }
	],
	mode: "hash"
});

router.beforeEach((to, from, next)=>{
	NProgress.start();
	next();
})
router.afterEach(()=>{
	NProgress.done();
})

export default router