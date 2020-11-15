import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd, { Modal as antdModal, Drawer as antdDrawer } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import VueCreateDM from 'vue-create-dm';
import VueCreateDM from '../vue-create-dm';

export const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(Antd)
  .use(VueCreateDM, { antdModal, antdDrawer })
  .mount('#app');
