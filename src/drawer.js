import { createDrawerSlot } from './createCreateSlot';
import { getSlotPayload } from './getSlotPayload';
import { locationMatcher } from './locationMatcher';

/**
 * drawerProps 就是组件库的 drawer 支持的props
 * title 和 content 都是对象，其中 template 属性代表组件，其他属性同 vue 的原生属性 https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
 */
// 创建抽屉的主方法
export function createDrawer(
  Vue,
  {
    component: Drawer,
    titleSlotName = 'title', //原来组件提供的标题插槽名称
    visiblePropName = 'visible', //原来控制抽屉组件显隐的属性名称
    closeCbName = 'close', // 原来组件的关闭回调事件名称
    router,
    store,
  },
  options
) {
  const {
    title,
    content,
    drawerProps,
    beforeClose,
    afterClose,
    payloadSlot, // 'default', 'title', false, true
  } = options;
  const el = document.createElement('div');
  document.body.appendChild(el);
  let firstRender = true; // hack iview modal创建时没有动画的问题

  const vn = new Vue({
    data: {
      visible: false,
      slotVnMap: {},
    },
    render(createElement) {
      const self = this;
      if (firstRender) {
        setTimeout(() => {
          self.$data.visible = true;
          firstRender = false;
        }, 0);
      }
      const handleClose = async function(payload) {
        const slotPayload = await getSlotPayload(
          self.$data.slotVnMap,
          payloadSlot
        );
        beforeClose && (await beforeClose({ payload, slotPayload }));
        self.$data.visible = false;
        // 因为antd关闭动画是 0.3s 所以稍微晚点再销毁组件
        setTimeout(async () => {
          self.$destroy();

          try {
            // 手动删除节点
            document.body.removeChild(self.$el);
          } catch (e) {}

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
        children.push(createSlot(title, titleSlotName));
        drawerProps.title && delete drawerProps.title;
      }
      return createElement(
        Drawer,
        {
          props: {
            ...drawerProps,
            [visiblePropName]: self.$data.visible,
          },
          on: {
            [closeCbName]: handleClose,
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

// 创建 antd drawer 的扩展方法
export const createAntdDrawer = {
  install(Vue, baseOption) {
    Vue.prototype.$createAntdDrawer = function(options, location) {
      const newOptions = locationMatcher.call(
        this,
        location,
        baseOption,
        options
      );
      return createDrawer(
        Vue,
        {
          ...baseOption,
          titleSlotName: 'title',
          visiblePropName: 'visible',
          closeCbName: 'close',
        },
        newOptions
      );
    };
  },
};
// 创建 iview drawer 的扩展方法
export const createViewDrawer = {
  install(Vue, baseOption) {
    Vue.prototype.$createViewDrawer = function(options, location) {
      const newOptions = locationMatcher.call(
        this,
        location,
        baseOption,
        options
      );
      return createDrawer(
        Vue,
        {
          ...baseOption,
          titleSlotName: 'header',
          visiblePropName: 'value',
          closeCbName: 'on-close',
        },
        newOptions
      );
    };
  },
};
