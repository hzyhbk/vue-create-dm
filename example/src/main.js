import Vue from 'vue';
import App from './App.vue';
import {
  Button,
  Icon,
  Modal as antdModal,
  Drawer as antdDrawer,
  Input,
} from 'ant-design-vue';
import { Modal as viewModal, Drawer as viewDrawer } from 'view-design';
import VueCreateDM from 'vue-create-dm';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import page1 from './views/page1/index.vue';
import page2 from './views/page2/index.vue';
import 'ant-design-vue/dist/antd.css';
import 'view-design/dist/styles/iview.css';
// import { createViewModal } from './createViewModal';
// import { createDrawer } from './drawer';
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);
Vue.use(VueRouter);
const routes = [
  { path: '/foo', component: page1 },
  { path: '/bar', component: page2 },
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
});

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
