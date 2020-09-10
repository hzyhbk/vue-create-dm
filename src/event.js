import Vue from 'vue';

export const event = new Vue();
export const VCDM_OPEN_DRAWER = 'VCDM_OPEN_DRAWER';
export const VCDM_OPEN_MODAL = 'VCDM_OPEN_MODAL';

function open(item, options, methodName) {
  // 加载对应的子应用
  item.app().then((res) => {
    if (!res.$router || !res.$Vue) {
      console.warn(`子应用[${item.name}]请导出 $router 和 $Vue.`);
      return;
    }
    if (!res.$Vue[methodName]) {
      console.warn(
        `子应用[${item.name}]的 $Vue 上不存在 ${methodName} 方法，请检查子应用导出的$Vue.`
      );
      return;
    }
    // 通过导出的 router 实例上的 getMatchedComponents 方法获取到要打开的组件
    const [component] = res.$router.getMatchedComponents(options.path);
    const params = {
      content: {
        ...options.content,
        template: component,
        props: options.content.props || {},
      },
    };
    Object.assign(options, params);
    // 调用导出的 $Vue.$createAntdDrawer 或者 $Vue.$createAntdModal
    res.$Vue[methodName](options);
  });
}

export function listen(type, microAppConfig, methodName) {
  event.$on(type, (options) => {
    const { appName, path } = options;
    if (!appName) {
      console.warn(`请传入子应用名称`);
      return;
    }
    if (!path) {
      console.warn(`请传入要打开的子应用页面路由`);
      return;
    }
    microAppConfig.forEach((item) => {
      if (item.name === appName) {
        open(item, options, methodName);
      }
    });
  });
}
export function trigger(...args) {
  event.$emit(...args);
}

// 监听全局打开抽屉事件
export function listenOpenDrawerAction(microAppConfig, methodName) {
  listen(VCDM_OPEN_DRAWER, microAppConfig, methodName);
}
// 监听全局打开弹框事件
export function listenOpenModalAction(microAppConfig, methodName) {
  listen(VCDM_OPEN_MODAL, microAppConfig, methodName);
}
export function triggerOpenDrawerAction(props) {
  trigger(VCDM_OPEN_DRAWER, props);
}
export function triggerOpenModalAction(props) {
  trigger(VCDM_OPEN_MODAL, props);
}
