import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment"
import axios from 'axios'
import md5 from 'js-md5';
import 'default-passive-events'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.prototype.$ajax = axios
Vue.prototype.$md5 = md5
// use
Vue.use(mavonEditor)
moment.locale("zh-cn");
// Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
