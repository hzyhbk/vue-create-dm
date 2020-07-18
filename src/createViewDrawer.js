import { createDrawerSlot } from './createCreateSlot';
import { getSlotPayload } from './getSlotPayload';

/**
 * drawerProps 就是 antd 的 drawer 组件的 props
 * title 和 content 都是对象，其中 template 属性代表组件，其他属性同 vue 的原生属性 https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
 *
 */
export function createViewDrawer(Vue, Drawer, options) {
  const {
    title,
    content,
    drawerProps,
    beforeClose,
    afterClose,
    payloadSlot,
  } = options;
  const el = document.createElement('div');
  document.body.appendChild(el);

  const vn = new Vue({
    data: {
      visible: true,
      slotVnMap: {},
    },
    render(createElement) {
      const self = this;
      const handleClose = async function(payload) {
        const slotPayload = await getSlotPayload(
          self.$data.slotVnMap,
          payloadSlot
        );
        beforeClose && (await beforeClose({ payload, slotPayload }));
        self.$data.visible = false;
        setTimeout(async () => {
          self.$destroy();
          afterClose && (await afterClose({ payload, slotPayload }));
        }, 400);
      };
      const createSlot = createDrawerSlot(
        createElement,
        self.$data.slotVnMap,
        handleClose
      );
      const children = [];
      // 如果传了内容
      if (content && content.template) {
        children.push(createSlot(content));
      }
      // 如果title传了组件，默认用这个
      if (title && title.template) {
        // 如果是插槽的话，就要加slot
        children.push(createSlot(title, 'header'));
        drawerProps.title && delete drawerProps.title;
      }
      return createElement(
        Drawer,
        {
          props: {
            ...drawerProps,
            value: self.$data.visible,
          },
          on: {
            'on-close': handleClose,
          },
        },
        children
      );
    },
  }).$mount(el);
  return vn;
}

createViewDrawer.install = function(Vue, drawerCpt) {
  Vue.prototype.$createViewDrawer = (options) =>
    createViewDrawer(Vue, drawerCpt, options);
};
