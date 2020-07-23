import { createModalSlot } from './createCreateSlot';
import { getSlotPayload } from './getSlotPayload';

/**
 * modalProps 就是组件库的 modal 支持的props
 * title、content、footer 都是对象，其中 template 属性代表组件，其他属性同 vue 的原生属性 https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
 */
// 创建弹框的主方法
export function createModal(
  Vue,
  {
    component: Modal,
    titleSlotName = 'title', //原来组件提供的标题插槽名称
    footerSlotName = 'footer', //原来组件提供的footer插槽名称
    visiblePropName = 'visible', //原来控制抽屉组件显隐的属性名称
    cancelCbName = 'cancel', // 原来组件的关闭回调事件名称
    okCbName = 'ok', // 原来组件的确定回调事件名称
    router,
    store,
  },
  options
) {
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
          self.$destroy();

          try {
            // 手动销毁dom
            document.body.removeChild(self.$el);
          } catch (e) {}

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
      const children = [];
      // 如果传了内容
      if (content && content.template) {
        children.push(createSlot(content));
      }
      // 如果title传了组件，默认用这个
      if (title && title.template) {
        // 如果是插槽的话，就要加slot
        children.push(createSlot(title, titleSlotName));
        modalProps.title && delete modalProps.title;
      }
      // 如果title传了footer，用这个
      if (footer && footer.template) {
        children.push(createSlot(footer, footerSlotName));
      }
      return createElement(
        Modal,
        {
          props: {
            ...modalProps,
            [visiblePropName]: self.$data.visible,
          },
          on: {
            [cancelCbName]: handleClose,
            [okCbName]: handleOk,
          },
        },
        children
      );
    },
    router,
    store,
  }).$mount(el);
  return vn;
}
// 创建 antd modal 的扩展方法
export const createAntdModal = {
  install(Vue, { component, router, store }) {
    Vue.prototype.$createAntdModal = (options) =>
      createModal(
        Vue,
        {
          component,
          router,
          store,
          titleSlotName: 'title',
          footerSlotName: 'footer',
          visiblePropName: 'visible',
          cancelCbName: 'cancel',
          okCbName: 'ok',
        },
        options
      );
  },
};
// 创建 iview modal 的扩展方法
export const createViewModal = {
  install(Vue, { component, router, store }) {
    Vue.prototype.$createViewModal = (options) =>
      createModal(
        Vue,
        {
          component,
          router,
          store,
          titleSlotName: 'header',
          footerSlotName: 'footer',
          visiblePropName: 'value',
          cancelCbName: 'on-cancel',
          okCbName: 'on-ok',
        },
        options
      );
  },
};
