import { createAntdDrawer, createViewDrawer, createDrawer } from './drawer';
import { createAntdModal, createViewModal, createModal } from './modal';
import { getSlotPayload } from './getSlotPayload';
import { createDrawerSlot, createModalSlot } from './createCreateSlot';
import { locationMatcher } from './locationMatcher';
import { setGlobalHeader } from './setGlobalHeader';

export {
  createAntdDrawer,
  createAntdModal,
  createViewDrawer,
  createViewModal,
  getSlotPayload,
  createDrawerSlot,
  createModalSlot,
  locationMatcher,
  setGlobalHeader,
};

export default {
  install(
    Vue,
    {
      antdModal,
      antdDrawer,
      viewModal,
      viewDrawer,
      globalHeader,
      ...restOptions
    }
  ) {
    if (antdModal) {
      createAntdModal.install(Vue, {
        component: antdModal,
        globalHeader,
        ...restOptions,
      });
    }
    if (antdDrawer) {
      createAntdDrawer.install(Vue, {
        component: antdDrawer,
        globalHeader,
        ...restOptions,
      });
    }
    if (viewModal) {
      createViewModal.install(Vue, {
        component: viewModal,
        globalHeader,
        ...restOptions,
      });
    }
    if (viewDrawer) {
      createViewDrawer.install(Vue, {
        component: viewDrawer,
        globalHeader,
        ...restOptions,
      });
    }
  },
};
