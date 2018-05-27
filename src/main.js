import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import commonComponents from './components/common'

// filters/directives
import './services/FilterService'
import './services/DirectiveService'

// progressbar
import './services/ProgressBarService'

// register global components
for (let component in commonComponents) {
  Vue.component(component, commonComponents[component])
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
