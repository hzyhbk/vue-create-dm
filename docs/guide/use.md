# 使用
## 创建抽屉
### $createAntdDrawer、$createViewDrawer、$createEleDrawer
```js
this.$createAntdDrawer(options, arg1, arg2);
this.$createViewDrawer(options, arg1, arg2);
this.$createEleDrawer(options, arg1, arg2);
```
::: tip 提示
`title` 和 `content` 子组件内会被传入一个名为 `close` 的回调函数，在子组件内使用 `this.$emit('close', payload)` 触发关闭行为。
:::
::: tip 提示
如果传入 **payloadSlot** 参数，并且相应的子组件存在 **`providePayload`** 方法，在抽屉关闭时，会先调用此函数获取返回值，然后作为 `beforeClose` 和 `afterClose` 方法的参数传入。
:::

### options参数介绍

| 参数 | 说明 | 类型 |
| :-----| :---- | :---- |
| drawerProps | Drawer 组件的所有 props <br />[Antd Drawer Props](https://www.antdv.com/components/drawer-cn/#API)<br />[iView Drawer props](https://www.iviewui.com/components/drawer#API)<br />[ElementUI Drawer props](https://element.eleme.cn/#/zh-CN/component/drawer) | Object | 是
| payloadSlot | 是否需要和获取子组件的返回值，**子组件需要在methods中提供`providePayload`方法。**<br /><ul><li>不传或者传`false`，不调用；</li><li>传`'title'`调用**标题子组件**的`providePayload`方法；</li><li>传`true`或者`'default'`调用**内容子组件**的`providePayload`方法</li></ul> | true \| false \| 'title' \| 'default'  | 否
| title | 标题自定义组件<br /><ul><li>如果注册了全局头部，优先使用全局头部组件。此时此项可直接传 String 类型；如果此项不传，那就使用`drawerProps.title`作为标题。如果传对象，那就不使用全局头部组件，走自定义头部的逻辑。</li><li>如果未注册全局头部，`title`需要传对象，其中`title.template`必填，类型是一个vue组件，`title`对象的其他参数可参考vue官方文档[深入数据对象](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)。如果 `drawerProps.title` 和 `title` 同时存在的话，优先使用 `title`。</li></ul> | Object \| String |
| content | 内容自定义组件。其中`content.template`必填，类型是一个vue组件，`content`对象的其他参数可参考vue官方文档[深入数据对象](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)。 | Object |
| beforeClose | 抽屉关闭之前触发。其中`payload`代表调用子组件内调用`$eimt('close', params)`时携带的第二个参数；`slotPayload`表示从子组件中约定好的方法里获取到的返回值 | function({ payload, slotPayload }) |
| afterClose | 抽屉关闭之前触发。 |function({ payload, slotPayload }) |
|stopPropagation| 是否阻止原生`click`事件冒泡 | Boolean |
|onClick| 原生`click`事件 | function(event) |

### 代码示例
```js
this.$createAntdDrawer({
  drawerProps: {
    title: '标题',
    width: '500px',
    mask: false,
  },
  content: {
    template: HelloWorld,
    props: {
      msg: 'Welcome to Your Vue.js App',
    },
  },
  beforeClose: function() {
    console.log('我要关闭了');
  },
  afterClose: function() {
    console.log('我已经关闭了');
  },
});
```
## 创建弹框
### $createAntdModal、$createViewModal、$createEleModal
```js
this.$createAntdModal(options, arg1, arg2);
this.$createViewModal(options, arg1, arg2);
this.$createEleModal(options, arg1, arg2);
```
::: tip 提示
`title`、`content`和`foter`子组件内会被传入`close`和`ok`两个回调函数和 一个名为`confirmLoading`的 props
* 在子组件内使用 `this.$emit('close', payload)` 触发关闭动作
* 使用 `this.$emit('ok', payload)` 触发 onOk 回调
* 子组件内可以使用 `confirmLoading` 来管理确定按钮的 loading 状态
  * **antd的modal组件可以使用默认footer，iview需要自定义footer**
:::
::: tip 提示
如果传入 **payloadSlot** 参数，并且相应的子组件如果存在 `providePayload` 方法，在点击确定按钮时，会先调用此函数获取返回值，然后作为 `onOk` 方法的一个参数传入
:::
::: tip 提示
如果`onOk`函数返回`false`，并且是 antd 的 Modal 组件，会阻止关闭弹框；iView需要自定义 footer 组件来实现。
:::

### options参数介绍

和上面说过的创建抽屉时传的差不多，只介绍以下几个不同的地方
| 参数 | 说明 | 类型 |
| :-----| :---- | :---- |
|modalProps| Modal 的所有props <br/>[Antd Modal](https://www.antdv.com/components/modal-cn/#API) <br/> [iView Modal](https://www.iviewui.com/components/modal#API)<br />[ElementUI Dialog](https://element.eleme.cn/#/zh-CN/component/dialog)| Object |
| payloadSlot | 同Drawer，多了一个 'footer' 选项 | true \| false \| 'title' \| 'footer' \| 'default'
|footer| footer自定义组件 | Object |
|onOk| 点击确认按钮的回调。<br/>如果`onOk`函数返回`false`，并且是antd的Modal组件，会阻止关闭弹框；iView需要自定义footer组件来实现。 | function({ payload, slotPayload }) |

### 代码示例

```js
this.$createAntdModal({
  modalProps: {
    title: '标题',
    width: '500px',
    mask: false,
  },
  content: {
    template: HelloWorld,
    props: {
      msg: 'Welcome to Your Vue.js App',
    },
  },
  beforeClose: function() {
    console.log('我要关闭了');
  },
  afterClose: function() {
    console.log('我已经关闭了');
  },
  async onOk() {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        console.log('点了确定');
        resolve(false);
      }, 3000);
    });
    return res;
  },
});
```
