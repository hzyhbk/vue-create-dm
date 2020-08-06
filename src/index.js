import {
  createAntdDrawer,
  createViewDrawer,
  createDrawer,
  createEleDrawer,
} from './drawer';
import {
  createAntdModal,
  createViewModal,
  createModal,
  createEleModal,
} from './modal';
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
      eleModal,
      eleDrawer,
      modalGlobalHeader,
      drawerGlobalHeader,
      ...restOptions
    }
  ) {
    console.log(12312312312);
    if (antdModal) {
      createAntdModal.install(Vue, {
        component: antdModal,
        globalHeader: modalGlobalHeader,
        ...restOptions,
      });
    }
    if (antdDrawer) {
      createAntdDrawer.install(Vue, {
        component: antdDrawer,
        globalHeader: drawerGlobalHeader,
        ...restOptions,
      });
    }
    if (viewModal) {
      createViewModal.install(Vue, {
        component: viewModal,
        globalHeader: modalGlobalHeader,
        ...restOptions,
      });
    }
    if (viewDrawer) {
      createViewDrawer.install(Vue, {
        component: viewDrawer,
        globalHeader: drawerGlobalHeader,
        ...restOptions,
      });
    }
    if (eleModal) {
      createEleModal.install(Vue, {
        component: eleModal,
        globalHeader: drawerGlobalHeader,
        ...restOptions,
      });
    }
    if (eleDrawer) {
      createEleDrawer.install(Vue, {
        component: eleDrawer,
        globalHeader: drawerGlobalHeader,
        ...restOptions,
      });
    }
  },
};
