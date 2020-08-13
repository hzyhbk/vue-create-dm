# 安装
```bash
yarn add vue-create-dm
```

## 统一注册
::: warning 注意
如果要在子组件内获取 `this.$store` 和 `this.$router` 请把 `VueCreateDM` 的注册放到 `Vuex` 和 `VueRouter` 实例生成之后,并且传入这两个实例
:::
::: warning 注意
如果要自定义全局头部组件，请传入`modalGlobalHeader`，`drawerGlobalHeader`这两个参数，分别对应`Modal`组件的全局头部和`Drawer`组件的全局头部
:::
下面演示如何进行全量注册：
```js
import Vue from 'vue';
import VueCreateDM from 'vue-create-dm';
import { Modal as antdModal, Drawer as antdDrawer } from 'ant-design-vue';
import { Modal as viewModal, Drawer as viewDrawer } from 'view-design';
import { Dialog as eleModal, Drawer as eleDrawer } from 'element-ui';
import store from './store'
import router from './router';
import modalGlobalHeader from './components/modalGlobalHeader';
import drawerGlobalHeader from './components/drawerGlobalHeader';

Vue.use(VueCreateDM, {
  antdModal,
  antdDrawer,
  viewModal,
  viewDrawer,
  eleModal,
  eleDrawer,
  store,
  router,
  modalGlobalHeader,
  drawerGlobalHeader,
});
```
## 单个注册
::: warning 注意
如果要在子组件内获取 `this.$store` 和 `this.$router` 请把 `VueCreateDM` 的注册放到 `Vuex` 和 `VueRouter` 实例生成之后,并且传入这两个实例
:::
::: warning 注意
如果要自定义全局头部组件，请传入`globalHeader`参数
:::

下面演示如何单个注册，**其中`component`属性必传**，其余几个都是可选参数
```js
import Vue from 'vue';
import store from './store';
import router from './router';
import { createAntdDrawer } from 'vue-create-dm';
import { Drawer } from 'ant-design-vue';
import globalHeader from '../components/globalHeader';

Vue.use(createAntdDrawer, {
  component: Drawer,
  router, // 子组件需要用到 this.$router 就传
  store // 子组件需要用到 this.$store 就传
  globalHeader,
});
```
