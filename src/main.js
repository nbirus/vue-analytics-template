// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import components from './components/common'
import Ripple from 'vue-ripple-directive'

// register all global components
for (let component in components) {
  Vue.component(component, components[component])
}

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
