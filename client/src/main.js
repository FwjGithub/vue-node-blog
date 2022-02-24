import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment"
import 'default-passive-events'
import axios from 'axios'
import md5 from 'js-md5';
Vue.prototype.$ajax = axios
Vue.prototype.$md5 = md5
moment.locale("zh-cn");
// Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

