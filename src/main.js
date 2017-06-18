// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
import 'common/scss/base.scss';
import 'common/scss/icon.scss';
import 'common/scss/animate.scss';
Vue.config.productionTip = false
    /* eslint-disable no-new */
Vue.prototype.$http = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
