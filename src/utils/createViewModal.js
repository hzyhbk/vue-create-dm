import { Modal } from 'view-design';
import Vue from 'vue';
const MODAL_REF = '__view_modal_ref__';
import { createModalSlot } from './createCreateSlot';
import { getSlotPayload } from './getSlotPayload';

/**
 * modalProps 就是 antd 的 modal 组件的 props
 * title、content、footer 都是对象，其中 template 属性代表组件，其他属性同 vue 的原生属性 https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
 *
 */
export function createViewModal(options) {
  const {
    title,
    content,
    footer,
    modalProps,
    beforeClose,
    afterClose,
    onOk,
    payloadSlot,
  } = options;
  const el = document.createElement('div');
  document.body.appendChild(el);

  const vn = new Vue({
    data: {
      visible: true,
      confirmLoading: false,
      slotVnMap: {},
    },
    render(createElement) {
      const self = this;
      const handleClose = async (payload) => {
        beforeClose && (await beforeClose(payload));
        self.$data.visible = false;
        setTimeout(async () => {
          document.body.removeChild(self.$refs[MODAL_REF].$el);
          afterClose && (await afterClose(payload));
        }, 400);
      };
      // 直接关闭不传slotPayload，通过ok关闭可以取到
      const handleOk = async (payload) => {
        const slotPayload = await getSlotPayload(
          self.$data.slotVnMap,
          payloadSlot
        );
        self.$data.confirmLoading = true;
        await onOk({ payload, slotPayload });
        self.$data.confirmLoading = false;
        await handleClose({ payload, slotPayload });
      };
      const createSlot = createModalSlot(
        createElement,
        self.$data.slotVnMap,
        self.$data.confirmLoading,
        handleClose,
        handleOk
      );
      // const createSlot = (options, slot = 'default') => {
      //   return createElement(options.template, {
      //     ...options,
      //     props: {
      //       ...options.props,
      //       confirmLoading: self.$data.confirmLoading,
      //     },
      //     on: {
      //       ...options.on,
      //       close: handleClose,
      //       ok: handleOk,
      //     },
      //     slot,
      //   });
      // };
      const children = [];
      // 如果传了内容
      if (content && content.template) {
        children.push(createSlot(content));
      }
      // 如果title传了组件，默认用这个
      if (title && title.template) {
        // 如果是插槽的话，就要加slot
        children.push(createSlot(title, 'header'));
        modalProps.title && delete modalProps.title;
      }
      // 如果title传了footer，用这个
      if (footer && footer.template) {
        children.push(createSlot(footer, 'footer'));
      }
      return createElement(
        Modal,
        {
          props: {
            ...modalProps,
            value: self.$data.visible,
          },
          ref: MODAL_REF,
          on: {
            cancel: handleClose,
            ok: handleOk,
          },
        },
        children
      );
    },
  }).$mount(el);
  return vn;
}
