# 通过函数创建 ant-design-vue 的 drawer 和 modal

## createAntdDrawer

会往 title 和 content 子组件内传入一个名为 close 的函数，在子组件内使用 `this.$emit('close', payload)` 触发关闭行为

```js
createAntdDrawer({
  // antd drawer 的所有props
  drawerProps: {},
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
  beforeClose: function() {
    console.log('我要关闭了');
  },
  // 关闭后调用 支持async
  afterClose: function() {
    console.log('我已经关闭了');
  },
});
```

## createAntdModal

会往 title、content 和 foter 子组件内传入 close 和 ok 函数和 confirmLoading props，在子组件内使用 `this.$emit('close', payload)` 触发关闭动作， 使用 `this.$emit('ok', payload)` 触发 onOk 回调。子组件内可以使用confirmLoading来管理确定按钮的loading 状态

```js
createAntdModal({
  // antd modal 的所有props
  modalProps: {},
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
  async onOk() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('点了确定');
        resolve();
      }, 3000);
    });
  },
});
```

TODO
- [ ] 想想办法能不能 hack 蒙层和右上角的关闭事件，支持传参