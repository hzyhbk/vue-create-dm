import Vue from 'vue';
import App from './App.vue';
import { Button, Icon } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Icon);
new Vue({
  render: (h) => h(App),
}).$mount('#app');
