export function createDrawerSlot(createElement, slotVnMap, close) {
  return (options, slot = 'default') => {
    const slotElement = createElement(options.template, {
      ...options,
      on: {
        ...options.on,
        close,
      },
      slot,
    });
    slotVnMap[slot] = slotElement;
    return slotElement;
  };
}
export function createModalSlot(
  createElement,
  slotVnMap,
  confirmLoading,
  close,
  ok
) {
  return (options, slot = 'default') => {
    const slotElement = createElement(options.template, {
      ...options,
      props: {
        ...options.props,
        confirmLoading,
      },
      on: {
        ...options.on,
        close,
        ok,
      },
      slot,
    });
    slotVnMap[slot] = slotElement;
    return slotElement;
  };
}
