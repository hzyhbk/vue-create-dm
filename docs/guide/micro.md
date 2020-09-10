# 微前端中使用

基于single-spa，vue-create-dm也支持在微前端项目中**跨项目调用抽屉、弹框**。

:::tip 前提条件
1. 需要互相调用抽屉、弹框的子项目**必须**都是 vue 技术栈
2. 并且都安装注册了vue-create-dm
3. 要跨项目调用的页面注册成路由页面
:::

## 示例项目
参考 [micro-frontend-example](https://github.com/hzyhbk/vue-create-dm/tree/master/micro-frontend-example) 文件夹

## 主项目使用
1. 注册子应用的方式需要改成config配置文件的方式。
```js
const config = [{
  name: 'sub1',
  app: () => loadSubApp('sub1', 'http://localhost:8081/manifest-initial.json'),
  activeWhen: (location) => location.pathname.startsWith('/sub1'),
  customProps: {
    domElement: '#app-sub-wrapper',
  },
}]
export default config;
```
2. main.js加入如下代码
```js
import { listenOpenDrawerAction, triggerOpenDrawerAction } from 'vue-create-dm';
import config from './micro-frontend/config/config';
// 监听打开抽屉事件
listenOpenDrawerAction(config, '$createAntdDrawer');
// 子项目调用打开抽屉的函数
window.triggerOpenDrawerAction = triggerOpenDrawerAction;
```
## 子项目使用
1. 除了 single-spa 要求导出的生命周期方法之外，子项目的`main.js`需要额外导出一个`router`实例和一个空的`vue`实例。
```js
import Vue from 'vue';
import router from './router';
import store from './store';
import VueCreateDM from 'vue-create-dm';
import { Modal as antdModal, Drawer as antdDrawer } from 'ant-design-vue';

Vue.use(VueCreateDM, {
  antdDrawer,
  antdModal,
  router,
  store,
});

export const bootstrap = function(){...}
export const mount = function(){...}
export const unmount = function(){...}
export const update = function(){...}
// 额外导出
export const $router = router;
export const $Vue = new Vue();
```
2. 需要被跨项目调用的组件，请在子项目的VueRouter路由配置文件中声明。
3. 子项目**触发**`openDrawer`、`openModal`事件
```js
window.triggerOpenDrawerAction({
  appName: 'sub2',
  path: '/about',
  drawerProps: {
    title: '子应用二抽屉',
    width: '50%',
  },
  content: {},
});
```
## API
```ts
type IBaseTriggerOption = {
  appName: string; // 子应用名称
  path: string; // 子应用要被打开的页面
}
type IModalTriggerOption = IBaseTriggerOption &  IModalOption;
type IDrawerTriggerOption = IBaseTriggerOption &  IDrawerOption;

```