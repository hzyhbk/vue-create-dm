export function createDrawerSlot(createElement, slotVnMap, onClose) {
  return (options, slot = 'default') => {
    const slotElement = createElement(options.template, {
      ...options.props,
      // on: {
      // ...options.on,
      onClose,
      // },
      // slot,
    });
    slotVnMap[slot] = slotElement;
    return slotElement;
  };
}
export function createModalSlot(
  createElement,
  slotVnMap,
  confirmLoading,
  onClose,
  onOk
) {
  return (options, slot = 'default') => {
    const slotElement = createElement(options.template, {
      // ...options,
      // props: {
      ...options.props,
      confirmLoading,
      // },
      // on: {
      //   ...options.on,
      onClose,
      onOk,
      // },
      // slot,
    });
    slotVnMap[slot] = slotElement;
    return slotElement;
  };
}
