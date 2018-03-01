import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// ripple effect directive
import Ripple from 'vue-ripple-directive'
Vue.directive('ripple', Ripple)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
