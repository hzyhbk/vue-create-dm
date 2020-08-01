# vue-create-dm

[![vue-create-dm](https://img.shields.io/badge/dynamic/json?color=007ec6&label=npm&query=$['dist-tags'].latest&url=https://registry.npmjs.org/vue-create-dm)](https://www.npmjs.com/package/vue-create-dm)

通过函数创建 ant-design-vue 或者 view-design 的 Drawer 和 Modal

## 功能亮点
- [x] 通过函数来创建 Modal 或者 Drawer 组件
- [x] Modal、Drawer 的内容子组件的 created、mounted 生命周期按照正常逻辑触发
- [x] Modal、Drawer 支持分别注册全局头部组件(接收名为 title 的 props)
- [x] 支持传入 title、content、footer 插槽
- [x] 支持 Modal、Drawer 与父应用通信
- [x] 支持子组件获取 this.$store 和 this.$router
- [x] 支持传入路由来匹配**内容**组件，
  - [x] 若传入`url` 比如 https://www.baidu.com ，则以 iframe 形式展示
  - [x] 若传入 `相对路由`（比如 /foo, /bar），则获取匹配的路由组件展示

## 安装
```bash
yarn add vue-create-dm
```

## 注册
### 1. 统一注册
```js
import VueCreateDM from 'vue-create-dm';
import { Modal as antdModal, Drawer as antdDrawer } from 'ant-design-vue';
import { Modal as viewModal, Drawer as viewDrawer } from 'view-design';
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import modalGlobalHeader from '../components/modalGlobalHeader';
import drawerGlobalHeader from '../components/drawerGlobalHeader';

// 如果要在子组件内获取 this.$store 和 this.$router
// 请把 VueCreateDM 的注册放到 Vuex 和 VueRouter 实例生成之后
// 并且传入这两个实例
Vue.use(VueStore);
const store = new Vuex.Store({
  // ...
});

Vue.use(VueRouter);
const router = new VueRouter({
  // ...
});

Vue.use(VueCreateDM, {
  antdModal,
  antdDrawer,
  viewModal,
  viewDrawer,
  store,
  router,
  modalGlobalHeader,
  drawerGlobalHeader,
});
```
### 2. 单个注册
```js
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

## 组件中使用

第一个参数是配置项，第二个参数是 url 或者项目路由
```js
this.$createAntdModal(options, location);

this.$createAntdDrawer(options, location);

this.$createViewDrawer(options, location);

this.$createViewModal(options, location);
```

## 例子
[在线地址](https://hzyhbk.github.io/vue-create-dm/#/base)

代码见 example 文件夹

## API 介绍
### createAntdDrawer、createViewDrawer

* 会往 title 和 content 子组件内传入一个名为 close 的函数，在子组件内使用 `this.$emit('close', payload)` 触发关闭行为。
* 如果传入 **payloadSlot** 参数，并且相应的子组件存在 `providePayload` 方法，在抽屉关闭时，会先调用此函数获取返回值，然后作为 `beforeClose` 和 `afterClose` 方法的参数传入

```js
this.$createAntdDrawer({
  // antd drawer 的所有props
  drawerProps: {},
  /*
   * 不传 或者 传 false，不调用
   * 传 'title' 调用 标题子组件 的 providePayload 方法
   * 传 true 或者 'default' 调用 内容子组件 的 providePayload 方法
   */
  payloadSlot: true | false | 'title' | 'default',
  /** title slot
   * 1. 如果注册了全局 header ,优先使用全局header组件:
   *    1.1 此项可以传 string
   *    1.2 此项也可不传，那就使用 drawerProps.title
   *    1.3 如果还是传对象，那就不使用全局header组件
   * 2. 如果未注册，drawerProps.title 和 title 同时存在的话，优先使用 title
  */
  title: {
    template: Title,
    props: {
      title: '自定义标题组件',
    },
  },
  // default slot
  content: {
    template: HelloWorld,
    props: {
      msg: 'Welcome to Your Vue.js App',
    },
  },
  // 关闭前调用 支持async
  beforeClose: function({ payload, slotPayload }) {
    console.log('我要关闭了');
  },
  // 关闭后调用 支持async
  afterClose: function({ payload, slotPayload }) {
    console.log('我已经关闭了');
  },
}, location);
```

### createAntdModal、createViewModal

* 会往 title、content 和 foter 子组件内传入 close 和 ok 函数和 confirmLoading props，在子组件内使用 `this.$emit('close', payload)` 触发关闭动作， 使用 `this.$emit('ok', payload)` 触发 onOk 回调。子组件内可以使用 confirmLoading 来管理确定按钮的 loading 状态
* 如果传入 **payloadSlot** 参数，并且相应的子组件如果存在 `providePayload` 方法，在点击确定按钮时，会先调用此函数获取返回值，然后作为 `onOk` 方法的一个参数传入

```js
this.$createAntdModal({
  // antd modal 的所有props
  modalProps: {},
  /*
   * 不传 或者 传 false，不调用
   * 传 'title' 调用 标题子组件 的 providePayload 方法
   * 传 'footer' 调用 页脚子组件 的 providePayload 方法
   * 传 true 或者 'default' 调用 内容子组件 的 providePayload 方法
   */
  payloadSlot: true | false | 'title' | 'footer' | 'default',
  // title slot
  // modalProps.title 和 title 同时存在的话，优先使用 title
  title: {
    template: Title,
    props: {
      title: '自定义标题组件',
    },
  },
  // content slot
  content: {
    template: HelloWorld,
    props: {
      msg: 'Welcome to Your Vue.js App',
    },
  },
  // footer slot
  footer: {
    template: Footer,
    props: {
      cancelText: 'hahah取消',
      okText: 'hahah确定',
    },
  },
  // 关闭前调用 支持async
  beforeClose: function() {
    console.log('我要关闭了');
  },
  // 关闭后调用 支持async
  afterClose: function() {
    console.log('我已经关闭了');
  },
  // 确定按钮回调 支持async
  // 返回false表示不关闭弹框，其他情况关闭
  async onOk({ payload, slotPayload}) {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        console.log('点了确定');
        resolve(false);
      }, 3000);
    });
    return res;
  },
}, location);
```