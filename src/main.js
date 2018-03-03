// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import 'bootstrap/dist/css/bootstrap.min.css'

import Tabs from './components/common/Tabs'
import Tab from './components/common/Tab'
import Btn from './components/common/Btn'
import TextInput from './components/common/inputs/TextInput'
import CheckboxInput from './components/common/inputs/CheckboxInput'
import FormListInput from './components/common/inputs/FormListInput'

import Ripple from 'vue-ripple-directive'

// import globaly used components
// need to think of a smarter way to do this
Vue.component('Tabs', Tabs)
Vue.component('Tab', Tab)
Vue.component('Btn', Btn)
Vue.component('TextInput', TextInput)
Vue.component('CheckboxInput', CheckboxInput)
Vue.component('FormListInput', FormListInput)


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
