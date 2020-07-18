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
import 'ant-design-vue/dist/antd.css';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Icon);
Vue.use(Input);
Vue.use(VueCreateDM, {
  antdModal,
  antdDrawer,
  viewModal,
  viewDrawer,
});
new Vue({
  render: (h) => h(App),
}).$mount('#app');
