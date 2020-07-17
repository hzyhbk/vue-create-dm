import { Drawer } from 'view-design';
import Vue from 'vue';
const DRAWER_REF = '__view_drawer_ref__';
/**
 * drawerProps 就是 antd 的 drawer 组件的 props
 * title 和 content 都是对象，其中 template 属性代表组件，其他属性同 vue 的原生属性 https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
 *
 */
export function createViewDrawer(options) {
  const { title, content, drawerProps, beforeClose, afterClose } = options;
  const el = document.createElement('div');
  document.body.appendChild(el);

  const vn = new Vue({
    data: {
      visible: true,
    },
    render(createElement) {
      const self = this;
      const handleClose = async function(payload) {
        beforeClose && (await beforeClose(payload));
        self.$data.visible = false;
        setTimeout(async () => {
          document.body.removeChild(self.$refs[DRAWER_REF].$el);
          afterClose && (await afterClose(payload));
        }, 400);
      };
      const createSlot = (options, slot = 'default') => {
        return createElement(options.template, {
          ...options,
          on: {
            ...options.on,
            close: handleClose,
          },
          slot,
        });
      };
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
          ref: DRAWER_REF,
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
