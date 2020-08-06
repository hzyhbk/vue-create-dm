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
  createEleDrawer,
  createEleModal,
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
    const components = [
      {
        component: antdModal,
        plugin: createAntdModal,
      },
      {
        component: antdDrawer,
        plugin: createAntdDrawer,
      },
      {
        component: viewModal,
        plugin: createViewModal,
      },
      {
        component: viewDrawer,
        plugin: createViewDrawer,
      },
      {
        component: eleModal,
        plugin: createEleModal,
      },
      {
        component: eleDrawer,
        plugin: createEleDrawer,
      },
    ];

    components.forEach((cpt) => {
      if (cpt.component) {
        cpt.plugin.install(Vue, {
          component: cpt.component,
          globalHeader: modalGlobalHeader,
          ...restOptions,
        });
      }
    });
  },
};
