// 获取子组件实例，调用约定的函数，获取返回值
export async function getSlotPayload(slotVnMap, payloadSlot) {
  if (payloadSlot) {
    let slotInstance;
    // 传 true 默认从 default slot 取
    if (typeof payloadSlot === 'boolean') {
      slotInstance = slotVnMap.default;
    }
    if (typeof payloadSlot === 'string') {
      slotInstance = slotVnMap[payloadSlot];
    }
    if (slotInstance) {
      // 约定 子组件需要提供 providePayload 方法
      if (!slotInstance.componentInstance.providePayload) {
        console.warn('子组件需要提供 providePayload 方法来返回参数.');
        return null;
      } else {
        const fn = slotInstance.componentInstance.providePayload;
        let slotPayload;
        if (typeof fn.then === 'function') {
          slotPayload = await slotInstance.componentInstance.providePayload();
        } else {
          slotPayload = slotInstance.componentInstance.providePayload();
        }
        return slotPayload;
      }
    }
    return null;
  }
}
