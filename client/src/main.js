import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VModal from 'vue-js-modal';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VModal,
  render: h => h(App)
}).$mount('#app');


//hide Vuetify know error from console
const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
}



    