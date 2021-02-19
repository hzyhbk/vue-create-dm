/*
 * @Author: hzyhbk <hzyhbk@163.com>
 * @Date: 2021-01-31 14:35:02
 */

import { VNode } from 'vue';

// 获取子组件实例，调用约定的函数，获取返回值
export async function getSlotPayload(
  slotVnMap: { [k: string]: VNode },
  payloadSlot: boolean | 'default' | 'title' | 'footer'
) {
  if (payloadSlot) {
    let slotInstance: any;
    // 传 true 默认从 default slot 取
    if (typeof payloadSlot === 'boolean') {
      slotInstance = slotVnMap.default;
    }
    if (typeof payloadSlot === 'string') {
      slotInstance = slotVnMap[payloadSlot];
    }
    if (slotInstance) {
      const { providePayload } = slotInstance.component.ctx;
      // 约定 子组件需要提供 providePayload 方法
      if (!providePayload) {
        console.warn('子组件需要提供 providePayload 方法来返回参数.');
        return null;
      } else {
        let slotPayload;
        if (typeof providePayload.then === 'function') {
          slotPayload = await providePayload();
        } else {
          slotPayload = providePayload();
        }
        return slotPayload;
      }
    }
    return null;
  }
}
