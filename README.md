# vue-create-dm

[![vue-create-dm](https://img.shields.io/badge/dynamic/json?color=007ec6&label=npm&query=$['dist-tags'].latest&url=https://registry.npmjs.org/vue-create-dm)](https://www.npmjs.com/package/vue-create-dm)

通过函数创建 ant-design-vue 或者 view-design 的 Drawer 和 Modal

## 为什么
在使用弹窗抽屉组件的过程中，你是否也曾遇到过以下场景：
1. 一个项目里有许多的弹窗和抽屉类型的交互，有时甚至一个页面组件里就有许多弹窗和抽屉组件，原生的使用方式是先在父组件中写好弹框抽屉组件，然后通过`visible`变量来控制弹窗的显示隐藏，当弹窗抽屉一多，看着各种`xxVisible`让人感觉很混乱。
2. 弹窗抽屉内包含的子组件的生命周期并没有按我们预想的逻辑触发，我们想打开弹窗抽屉的时候才触发内容子组件的`created`和`mounted`生命周期，然而实际上却并不是；我们希望关闭的时候可以调用子组件的`destoryed`生命周期，可是目前的UI框架大多只是把组件设置为`display:none`了，并没有完全卸载子组件，
3. `antd`提供了`destroyOnClose`参数支持关闭时销毁子元素，但也没法解决上面说到的1，2两点问题。组件库虽然也有提供通过函数打开弹窗的方法，但那些都是一些简单的弹框，可配置的参数不多，自由度也不够高。

因此就有了`vue-create-dm`这个库，`dm`就是分别取了`Drawer`和`Modal`的第一个字母组合在一起（为什么不是`md`呢，因为`md`是`markdown`的缩写...）。目前内置支持了`antd`和`iview`两个组件库的的弹框抽屉组件，并且提供了各种工具函数可以自己支持其他组件库的弹框抽屉组件。

## 功能亮点
- [x] 通过函数来创建`Modal`或者`Drawer`组件
- [x] `Modal`、`Drawer`的内容子组件的`created`、`mounted`生命周期按照正常逻辑触发
- [x] `Modal`、`Drawer`支持分别注册全局头部组件（需要接收名为 `title` 的 `props`）
- [x] 支持传入 `title`、`content`、`footer` 插槽
- [x] 支持`Modal`、`Drawer`与父应用通信
- [x] 支持子组件获取 `this.$store` 和 `this.$router`
- [x] 支持传入路由来匹配**内容**组件，
  - [x] 若传入`url`比如 https://www.baidu.com ，则以 `iframe`形式展示
  - [x] 若传入 `相对路由`（比如 /foo, /bar），则获取匹配的路由组件展示

## 安装
```bash
yarn add vue-create-dm
```

## 注册
### 1. 统一注册
注意：
* 如果要在子组件内获取 `this.$store` 和 `this.$router` 请把 `VueCreateDM` 的注册放到 `Vuex` 和 `VueRouter` 实例生成之后,并且传入这两个实例
* 如果要自定义全局头部组件，请传入`modalGlobalHeader`，`drawerGlobalHeader`这两个参数

下面演示如何进行全量注册：
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
注意：
* 如果要在子组件内获取 `this.$store` 和 `this.$router` 请自行传入这两个实例
* 如果要自定义全局头部组件，请传入`globalHeader`参数

下面演示如何单个注册，其中`component`属性必传，其他几个为可选参数
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

第一个参数是配置项；第二个参数为可选参数，表示是`url`或者项目路由。**如果传入了`location`参数，那么`options`中的自定义内容组件就无效了。**

```js
this.$createAntdModal(options, location);

this.$createAntdDrawer(options, location);

this.$createViewDrawer(options, location);

this.$createViewModal(options, location);
```

## 例子
[在线地址](https://hzyhbk.github.io/vue-create-dm/#/antd)

代码见 `example` 文件夹

## API 介绍
### createAntdDrawer、createViewDrawer

* 会往 title 和 content 子组件内传入一个名为 close 的函数，在子组件内使用 `this.$emit('close', payload)` 触发关闭行为。
* 如果传入 **payloadSlot** 参数，并且相应的子组件存在 `providePayload` 方法，在抽屉关闭时，会先调用此函数获取返回值，然后作为 `beforeClose` 和 `afterClose` 方法的参数传入

#### options参数介绍

| 参数 | 说明 | 类型 |
| :-----| :---- | :---- |
| drawerProps | Drawer 组件的所有props <br />[Antd Drawer Props](https://www.antdv.com/components/drawer-cn/#API)<br />[iView Drawer props](https://www.iviewui.com/components/drawer#API) | Object | 是
| payloadSlot | 是否需要和获取子组件的返回值，**子组件需要配合在methods中提供`providePayload`方法。**<br /><ul><li>不传或者传`false`，不调用；</li><li>传`'title'`调用**标题子组件**的`providePayload`方法；</li><li>传`true`或者`'default'`调用**内容子组件**的`providePayload`方法</li></ul> | `true` \| `false` \| `'title'` \| `'default'`  | 否
| title | 标题自定义组件<br /><ul><li>如果注册了全局头部，优先使用全局头部组件。此时此项可直接传 String 类型；如果此项不传，那就使用`drawerProps.title`作为标题。如果传对象，那就不使用全局头部组件，走自定义头部的逻辑。</li><li>如果未注册全局头部，`title`需要传对象，其中`title.template`必填，类型是一个vue组件，`title`对象的其他参数可参考vue官方文档[深入数据对象](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)。如果 `drawerProps.title` 和 `title` 同时存在的话，优先使用 `title`。</li></ul> | Object \| String |
| content | 内容自定义组件。其中`content.template`必填，类型是一个vue组件，`content`对象的其他参数可参考vue官方文档[深入数据对象](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)。 | Object |
| beforeClose | 抽屉关闭之前触发。其中`payload`代表调用子组件内调用`$eimt('close', params)`时携带的第二个参数；`slotPayload`表示从子组件中约定好的方法里获取到的返回值 | function({ payload, slotPayload }) |
| afterClose | 抽屉关闭之前触发。 |function({ payload, slotPayload }) |
|stopPropagation| 是否阻止原生`click`事件冒泡 | Boolean |
|onClick| 原生`click`事件 | function(event) |

#### 代码示例
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
  // 是否阻止原生 click 事件冒泡
  stopPropagation: true | false,
  // 原生 click 事件
  onClick: function(event){},
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
  * **antd的modal组件可以使用默认footer，iview需要自定义footer**
* 如果传入 **payloadSlot** 参数，并且相应的子组件如果存在 `providePayload` 方法，在点击确定按钮时，会先调用此函数获取返回值，然后作为 `onOk` 方法的一个参数传入

#### options参数介绍

和上面说过的创建抽屉时传的差不多，只介绍以下几个不同的地方
| 参数 | 说明 | 类型 |
| :-----| :---- | :---- |
|modalProps| Modal 的所有props <br/>[Antd Modal](https://www.antdv.com/components/modal-cn/#API) <br/> [iView Modal](https://www.iviewui.com/components/modal#API)| Object |
| payloadSlot | 同Drawer，多了一个 'footer' 选项 | `true` \| `false` \| `'title'` \| `'footer'` \| `'default'`
|footer| footer自定义组件 | Object |
|onOk| 点击确认按钮的回调。<br/>如果`onOk`函数返回`false`，并且是antd的Modal组件，会阻止关闭弹框；iView需要自定义footer组件来实现。 | function({ payload, slotPayload }) |

#### 代码示例

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
  // 是否阻止原生 click 事件冒泡
  stopPropagation: true | false,
  // 原生 click 事件
  onClick: function(event){},
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