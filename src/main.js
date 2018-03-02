// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Tabs from './components/common/Tabs'
import Tab from './components/common/Tab'
import Btn from './components/common/Btn'

import Ripple from 'vue-ripple-directive'

// import globaly used components
// need to think of a smarter way to do this
Vue.component('Tabs', Tabs)
Vue.component('Tab', Tab)
Vue.component('Btn', Btn)


// ripple effect directive
Vue.directive('ripple', Ripple)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
