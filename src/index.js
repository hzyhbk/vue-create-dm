import { createAntdDrawer, createViewDrawer, createDrawer } from './drawer';
import { createAntdModal, createViewModal, createModal } from './modal';
import { getSlotPayload } from './getSlotPayload';
import { createDrawerSlot, createModalSlot } from './createCreateSlot';

export {
  createAntdDrawer,
  createAntdModal,
  createViewDrawer,
  createViewModal,
  getSlotPayload,
  createDrawerSlot,
  createModalSlot,
};

export default {
  install(
    Vue,
    { antdModal, antdDrawer, viewModal, viewDrawer, ...restOptions }
  ) {
    if (antdModal) {
      createAntdModal.install(Vue, { component: antdModal, ...restOptions });
    }
    if (antdDrawer) {
      createAntdDrawer.install(Vue, { component: antdDrawer, ...restOptions });
    }
    if (viewModal) {
      createViewModal.install(Vue, { component: viewModal, ...restOptions });
    }
    if (viewDrawer) {
      createViewDrawer.install(Vue, { component: viewDrawer, ...restOptions });
    }
  },
};
