import Vue from 'vue';
import App from './App.vue';
import spVue from 'single-spa-vue';
import router from './router';
import store from './store';
import VueCreateDM from 'vue-create-dm';
import Antd, { Modal as antdModal, Drawer as antdDrawer } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
Vue.use(VueCreateDM, {
  antdModal,
  antdDrawer,
  router,
  store,
});

Vue.config.productionTip = false;

const vueOptions = {
  render: (h) => h(App),
  router,
  store,
};

const lifecycles = spVue({
  Vue,
  appOptions: vueOptions,
});

export const bootstrap = function(props) {
  return lifecycles.bootstrap(props);
};

export const mount = function(props) {
  return lifecycles.mount(props);
};

export const unmount = function(props) {
  return lifecycles.unmount(props);
};

export const update = function(props) {
  console.error(JSON.stringify(props));
  return lifecycles.update(props);
};

export const $router = router;
export const $Vue = new Vue();
