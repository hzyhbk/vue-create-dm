/*
 * @Author: hzyhbk <hzyhbk@163.com>
 * @Date: 2021-01-30 19:57:48
 */
import { Component, createVNode, VNode } from 'vue';

// 会往插槽组件中传入一个 confirmLoading props 和两个事件 onOk onClose
export function genSlotCreator(
  createComponent: typeof createVNode,
  {
    slotVnMap,
    confirmLoading,
    onClose,
    onOk,
  }: {
    slotVnMap: { [k: string]: VNode };
    confirmLoading?: boolean;
    onClose: (payload?: any) => void;
    onOk?: (payload?: any) => void;
  }
) {
  /*
   * template: 组件
   * props 包含组件所有参数
   * 参考 https://v3.cn.vuejs.org/guide/migration/render-function-api.html#vnode-props-%E6%A0%BC%E5%BC%8F%E5%8C%96
   **/
  return <T>(
    options: {
      template: Component<T>;
      props?: T;
    },
    slot = 'default' // 插槽名称
  ) => {
    const slotElement = createComponent(options.template, {
      ...options.props,
      confirmLoading,
      onClose,
      onOk,
    });
    slotVnMap[slot] = slotElement;
    return slotElement;
  };
}

type Slot<T> = {
  template: Component<T>;
  props?: T;
};

export function genChildren(
  createSlot: ReturnType<typeof genSlotCreator>,
  {
    title,
    content,
    footer,
  }: {
    title: Slot<any>;
    content: Slot<any>;
    footer?: Slot<any>;
  },
  {
    titleSlotName,
    footerSlotName,
  }: {
    [k: string]: string;
  }
) {
  const children: { [k: string]: () => VNode } = {};
  // 如果传了内容
  if (content && content.template) {
    children.default = () => createSlot(content);
  }
  // 如果title传了组件
  if (title && title.template) {
    // 如果是插槽的话，就要加slot
    children[titleSlotName] = () => createSlot(title, titleSlotName);
  }
  // 如果footer传了组件
  if (footer && footer.template) {
    children[footerSlotName] = () => createSlot(footer, footerSlotName);
  }
  return children;
}
