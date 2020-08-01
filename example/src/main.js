import Vue from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import { Modal as antdModal, Drawer as antdDrawer } from 'ant-design-vue';
import { Modal as viewModal, Drawer as viewDrawer } from 'view-design';
// import VueCreateDM from 'vue-create-dm';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import foo from './views/foo/index.vue';
import bar from './views/bar/index.vue';
import base from './views/base/index.vue';
import match from './views/match/index.vue';
import 'ant-design-vue/dist/antd.css';
import 'view-design/dist/styles/iview.css';
import VueCreateDM from '../../src';
import globalHeader from './components/Title';
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(VueRouter);
const routes = [
  { path: '/foo', component: foo },
  { path: '/bar', component: bar },
  { path: '/base', component: base },
  { path: '/match', component: match },
];
const router = new VueRouter({ routes });

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
  store,
  router,
  drawerGlobalHeader: globalHeader,
});

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
