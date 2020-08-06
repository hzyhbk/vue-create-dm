import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import { Modal as antdModal, Drawer as antdDrawer } from 'ant-design-vue';
import { Modal as viewModal, Drawer as viewDrawer } from 'view-design';
import { Dialog as eleModal, Drawer as eleDrawer } from 'element-ui';
import Vuex from 'vuex';
import router from './router';
import 'ant-design-vue/dist/antd.css';
import 'view-design/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';
import VueCreateDM from '../../src';
import globalHeader from './components/Title';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});
Vue.use(VueCreateDM, {
  antdModal,
  antdDrawer,
  viewModal,
  viewDrawer,
  eleModal,
  eleDrawer,
  store,
  router,
  drawerGlobalHeader: globalHeader,
});

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
