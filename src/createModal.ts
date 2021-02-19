/*
 * @Author: hzyhbk <hzyhbk@163.com>
 * @Date: 2021-01-30 19:37:24
 */

import { defineComponent, render, App, Component, VNode } from 'vue';
import { genCreateSubVNode } from './genSubVNode';
import { genSlotCreator, genChildren } from './genSlotCreator';
import { getSlotPayload } from './getSlotPayload';

// 创建弹框的基础组件
export default function createModal(
  app: App,
  {
    component: Modal,
    titleSlotName = 'title', //原来组件提供的标题插槽名称
    footerSlotName = 'footer', //原来组件提供的footer插槽名称
    visiblePropName = 'visible', //原来控制抽屉组件显隐的属性名称
    btnLoadingPropName = 'confirmLoading',
    cancelCbName = 'onCancel', // 原来组件的关闭回调事件名称
    okCbName = 'onOk' // 原来组件的确定回调事件名称
  }: any,
  options: any
) {
  const createSubVNode = genCreateSubVNode(app);
  if (!app.config.globalProperties.$createSubVNode) {
    app.config.globalProperties.$createSubVNode = createSubVNode;
  }
  const {
    title,
    content,
    footer,
    modalProps = {},
    beforeClose,
    afterClose,
    onOk,
    payloadSlot
  } = options;

  let modalInstance: VNode | null = null;
  const div = document.createElement('div');
  document.body.appendChild(div);

  const myComponent = defineComponent({
    data() {
      return {
        vIf: true,
        visible: true,
        confirmLoading: false,
        slotVnMap: {}
      };
    },
    render() {
      let self = this;
      const showOkBtnLoading = () => {
        this.$data.confirmLoading = true;
      };
      const hideOkBtnLoading = () => {
        this.$data.confirmLoading = false;
      };
      const hideModal = () => {
        this.$data.visible = false;
      };
      const handleDestory = async () => {
        if (modalInstance && modalInstance.component) {
          modalInstance.component.data.vIf = false; // hack destroy
          modalInstance = null; // remove instance
        }
        if (div.parentNode) {
          div.parentNode.removeChild(div); // remove node
        }

        if (afterClose) {
          await afterClose();
        }
      };
      // slot子组件手动调用时可能会传payload
      const handleClose = async (payload: any) => {
        let res = true;
        if (beforeClose) {
          try {
            res = await beforeClose(payload);
          } catch (e) {
            console.error(
              new Error('please check your [beforeClose] function.')
            );
          }
        }
        // beforeClose 返回 false 时不关闭
        if (typeof res === 'boolean' && !res) {
          return;
        }

        // 关闭 & 销毁
        hideModal();
      };
      // slot子组件手动调用时可能会传payload
      const handleOk = async (payload: any) => {
        const slotPayload = await getSlotPayload(
          self.$data.slotVnMap,
          payloadSlot
        );
        showOkBtnLoading();
        // 如果返回false表示不关闭，其他情况关闭
        const res = onOk && (await onOk({ payload, slotPayload }));
        hideOkBtnLoading();
        if (res === false) {
        } else {
          await handleClose({ payload, slotPayload });
        }
      };
      const props = {
        ...modalProps,
        [btnLoadingPropName]: this.confirmLoading,
        [visiblePropName]: this.visible,
        [cancelCbName]: handleClose,
        [okCbName]: handleOk,
        // 下面这个参数只有在antd中生效
        afterClose: handleDestory
      };
      const createSlot = genSlotCreator((this as any).$createSubVNode, {
        confirmLoading: self.$data.confirmLoading,
        slotVnMap: self.$data.slotVnMap,
        onClose: handleClose,
        onOk: handleOk
      });
      const children = genChildren(
        createSlot,
        { title, content, footer },
        { titleSlotName, footerSlotName }
      );
      // 组件优先级高 TODO 给个提示八
      if (title && title.template && props.title) {
        console.warn(
          '检测到modalProps中存在title属性，该属性优先级低于title配置项。'
        );
        delete props.title;
      }
      return this.vIf
        ? (this as any).$createSubVNode(Modal, props, children)
        : null;
    }
  });

  modalInstance = createSubVNode(myComponent);

  render(modalInstance, div);

  return modalInstance;
}

export function createAntdModal(app: App, Modal: Component, options: any) {
  return createModal(
    app,
    {
      component: Modal,
      titleSlotName: 'title', //原来组件提供的标题插槽名称
      footerSlotName: 'footer', //原来组件提供的footer插槽名称
      visiblePropName: 'visible', //原来控制抽屉组件显隐的属性名称
      btnLoadingPropName: 'confirmLoading',
      cancelCbName: 'onCancel', // 原来组件的关闭回调事件名称
      okCbName: 'onOk' // 原来组件的确定回调事件名称
    },
    options
  );
}
