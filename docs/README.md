---
home: true
heroText: VueCreateDM
tagline: 使用函数优雅地创建弹框抽屉
actionText: 了解更多 →
actionLink: /guide/
features:
- title: 函数式编程
  details: 使用函数优雅地创建弹框抽屉，远离让人头疼的 isXXVisible。
- title: 正常触发生命周期
  details: 弹框抽屉子组件的 created、mounted、destoryed 生命周期按照正常逻辑触发。
- title: 与父组件通信
  details: 约定子组件提供 providePayload 函数来和创建它的父组件通信。
---

## 当前版本
![vue-create-dm](https://img.shields.io/badge/dynamic/json?color=007ec6&label=npm&query=$['dist-tags'].latest&url=https://registry.npmjs.org/vue-create-dm)
## 安装

``` bash
yarn add vue-create-dm
```
## 使用

``` js
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