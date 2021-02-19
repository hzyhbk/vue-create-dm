/*
 * @Author: 慌张 huangzhang.zyh@alibaba-inc.com
 * @Date: 2021-02-16 19:49:20
 */
import { defineComponent, render, App, Component, VNode } from 'vue';
import { genCreateSubVNode } from './genSubVNode';
import { genSlotCreator, genChildren } from './genSlotCreator';
import { getSlotPayload } from './getSlotPayload';

// 创建抽屉的基础组件
export default function createDrawer(
  app: App,
  {
    component: Drawer,
    titleSlotName = 'title', //原来组件提供的标题插槽名称
    visiblePropName = 'visible', //原来控制抽屉组件显隐的属性名称
    closeCbName = 'onClose', // 原来组件的关闭回调事件名称
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
    drawerProps,
    beforeClose,
    afterClose,
    payloadSlot, // 'default', 'title', false, true
  } = options;

  let drawerInstance: VNode | null = null;
  const div = document.createElement('div');
  div.className = 'hahahah';
  document.body.appendChild(div);

  const myComponent = defineComponent({
    data() {
      return {
        vIf: true,
        visible: true,
        slotVnMap: {},
      };
    },
    render() {
      let self = this;
      const hideDrawer = () => {
        this.$data.visible = false;
      };
      const handleDestory = async (e: boolean) => {
        // 表示关闭
        if (e === false) {
          if (drawerInstance && drawerInstance.component) {
            drawerInstance.component.data.vIf = false; // hack destroy
            drawerInstance = null; // remove instance
          }
          if (div.parentNode) {
            div.parentNode.removeChild(div); // remove node
          }
          if (afterClose) {
            await afterClose();
          }
        }
      };
      // slot子组件手动调用时可能会传payload
      const handleClose = async (payload: any) => {
        const slotPayload = await getSlotPayload(
          self.$data.slotVnMap,
          payloadSlot
        );
        let res = true;
        if (beforeClose) {
          try {
            res = await beforeClose({ payload, slotPayload });
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
        hideDrawer();
      };
      const props = {
        ...drawerProps,
        [visiblePropName]: this.visible,
        [closeCbName]: handleClose,
        // 下面两个参数只有在antd中生效
        afterVisibleChange: handleDestory,
        // antd drawer销毁之后会莫名其妙剩一个div节点，只能用这个了
        getContainer: div,
      };
      const createSlot = genSlotCreator((this as any).$createSubVNode, {
        slotVnMap: self.$data.slotVnMap,
        onClose: handleClose,
      });
      const children = genChildren(
        createSlot,
        { title, content },
        { titleSlotName }
      );
      // 组件优先级高 TODO 给个提示八
      if (title && title.template && props.title) {
        console.warn(
          '检测到drawerProps中存在title属性，该属性优先级低于title配置项。'
        );
        delete props.title;
      }
      return this.vIf
        ? (this as any).$createSubVNode(Drawer, props, children)
        : null;
    },
  });

  drawerInstance = createSubVNode(myComponent);

  render(drawerInstance, div);

  return drawerInstance;
}

export function createAntdDrawer(app: App, Drawer: Component, options: any) {
  return createDrawer(
    app,
    {
      component: Drawer,
      titleSlotName: 'title', //原来组件提供的标题插槽名称
      visiblePropName: 'visible', //原来控制抽屉组件显隐的属性名称
      closeCbName: 'onClose', // 原来组件的关闭回调事件名称
    },
    options
  );
}
