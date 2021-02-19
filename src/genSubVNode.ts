/*
 * @Author: hzyhbk <hzyhbk@163.com>
 * @Date: 2021-01-30 16:01:43
 */

import { createVNode, App, render, Component, VNode, mergeProps } from 'vue';

// 创建 继承 parentApp._context 的 VNode
export function genCreateSubVNode(parentApp: App): typeof createVNode {
  return (...args) => {
    const subapp = createVNode(...args);
    subapp.appContext = parentApp._context;
    return subapp;
  };
}

export function genRenderSubVNode(parentApp: App) {
  return <T extends Record<string, unknown>>(
    component: Component<T>,
    props: T
  ) => {
    const div = document.createElement('div');
    let instance: any = parentApp.config.globalProperties.$createSubVNode(
      component
    );

    instance.props = mergeProps(instance.props!, props);
    render(instance, div);
    document.body.appendChild(div);

    // 卸载
    instance.component.ctx.$unmount = function() {
      render(null, div);
      instance = null;
      if (div.parentNode) {
        div.parentNode.removeChild(div);
      }
    };
    // 更新
    instance.component.ctx.$update = function(props: T = {} as any) {
      Object.keys(props).forEach(key => {
        instance.component.props[key] = props[key];
      });
    };

    return instance.component.ctx;
  };
}

export const subVNodePlugin = {
  install(parentApp: App) {
    // 创建子node
    parentApp.config.globalProperties.$createSubVNode = genCreateSubVNode(
      parentApp
    );
    // 渲染子组件 包含 create + mount
    parentApp.config.globalProperties.$renderSubVNode = genRenderSubVNode(
      parentApp
    );
  }
};
