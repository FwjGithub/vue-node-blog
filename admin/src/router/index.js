import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../Layout/index.vue'
import ArticleList from '../views/ArticleList.vue'
import ArticleAdd from '../views/ArticleAdd.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import Home from '../views/Home.vue'
import UserList from '../views/UserList.vue'
import UserAdd from '../views/UserAdd.vue'
import CommentList from '../views/CommentList.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/:pathMatch(.*)*',
        component: Layout,
        children: [
            {
                path: '/ArticleList',
                name: 'ArticleList',
                component: ArticleList
            },
            {
                path: '/ArticleAdd',
                name: 'ArticleAdd',
                component: ArticleAdd
            },
            {
                path: '/ArticleEdit/:id',
                name: 'ArticleEdit',
                component: ArticleEdit
            },
            {
                path: '/UserList',
                name: 'UserList',
                component: UserList
            },
            {
                path: '/UserAdd',
                name: 'UserAdd',
                component: UserAdd
            },
            {
                path: '/CommentList',
                name: 'CommentList',
                component: CommentList
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
