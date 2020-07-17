# 通过函数创建 ant-design-vue 或者 view-design 的 drawer 和 modal

## 功能亮点
- [x] 通过函数来创建 Modal 或者 Drawer 组件
- [x] Modal、Drawer 的内容子组件的 created、mounted 生命周期按照正常逻辑触发
- [x] 支持传入 title、content、footer 插槽
- [x] 支持 Modal、Drawer 与父应用通信

![image](https://user-images.githubusercontent.com/42671099/87777895-e7386280-c85c-11ea-8dbf-82b115604073.png)

## createAntdDrawer、createViewDrawer

* 会往 title 和 content 子组件内传入一个名为 close 的函数，在子组件内使用 `this.$emit('close', payload)` 触发关闭行为。
* 如果传入 **payloadSlot** 参数，并且相应的子组件存在 `providePayload` 方法，在抽屉关闭时，会先调用此函数获取返回值，然后作为 `beforeClose` 和 `afterClose` 方法的参数传入

```js
createAntdDrawer({
  // antd drawer 的所有props
  drawerProps: {},
  /*
   * 不传 或者 传false
   * 传 'title' 调用 标题子组件 的 providePayload 方法
   * 传 true 或者 'default' 调用 内容子组件 的 providePayload 方法
   */
  payloadSlot: true | false | 'title' | 'default',
  // title slot
  // drawerProps.title 和 title 同时存在的话，优先使用 title
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
});
```

## createAntdModal、createViewModal

* 会往 title、content 和 foter 子组件内传入 close 和 ok 函数和 confirmLoading props，在子组件内使用 `this.$emit('close', payload)` 触发关闭动作， 使用 `this.$emit('ok', payload)` 触发 onOk 回调。子组件内可以使用 confirmLoading 来管理确定按钮的 loading 状态
* 如果传入 **payloadSlot** 参数，并且相应的子组件如果存在 `providePayload` 方法，在点击确定按钮时，会先调用此函数获取返回值，然后作为 `onOk` 方法的一个参数传入

```js
createAntdModal({
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
  async onOk({ payload, slotPayload}) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('点了确定');
        resolve();
      }, 3000);
    });
  },
});
```