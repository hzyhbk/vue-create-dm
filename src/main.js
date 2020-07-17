import Vue from 'vue';
import App from './App.vue';
import { Button, Icon, Modal, Input } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Icon);
Vue.use(Modal);
Vue.use(Input);
new Vue({
  render: (h) => h(App),
}).$mount('#app');
