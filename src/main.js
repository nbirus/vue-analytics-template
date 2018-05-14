// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// globally registered components
import commonComponents from './components/common'

// filters/directives
import './services/FilterService'
import './services/DirectiveService'

// register all common components to be used anywhere
for (let component in commonComponents) {
  Vue.component(component, commonComponents[component])
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
