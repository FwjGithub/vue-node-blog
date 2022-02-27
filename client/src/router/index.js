import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../Layout/index.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import MessageBoard from '../views/MessageBoard.vue'
import Other from '../views/Other.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/:pathMatch(.*)*',
        component: Layout,
        children: [
            {
                path: '/About',
                name: 'About',
                component: About
            },
            {
                path: '/Detail/:id',
                name: 'Detail',
                component: Detail
            },
            {
                path: '/MessageBoard',
                name: 'MessageBoard',
                component: MessageBoard
            },
            {
                path: '/Other',
                name: 'Other',
                component: Other
            },
            {
                path: '/',
                name: 'Home',
                component: Home
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {

    // 让页面回到顶部

    // chrome

    document.body.scrollTop = 0;

    // firefox

    document.documentElement.scrollTop = 0;

    // safari

    window.pageYOffset = 0;

    // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁

    next()

})
export default router
