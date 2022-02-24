import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../Layout/index.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import MessageBoard from '../views/MessageBoard.vue'
import Other from '../views/Other.vue'

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

export default router
