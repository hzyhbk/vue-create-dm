import Vue from 'vue';
import App from './App.vue';
import { Button, Icon, Modal } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Icon);
Vue.use(Modal);
new Vue({
  render: (h) => h(App),
}).$mount('#app');
