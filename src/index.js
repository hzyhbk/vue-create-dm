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
import { modifyOptions } from './modifyOptions';

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
  modifyOptions,
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
    const modalComponents = [
      {
        component: antdModal,
        plugin: createAntdModal,
      },
      {
        component: viewModal,
        plugin: createViewModal,
      },

      {
        component: eleModal,
        plugin: createEleModal,
      },
    ];
    const drawerComponents = [
      {
        component: antdDrawer,
        plugin: createAntdDrawer,
      },
      {
        component: viewDrawer,
        plugin: createViewDrawer,
      },
      {
        component: eleDrawer,
        plugin: createEleDrawer,
      },
    ];

    modalComponents.forEach((cpt) => {
      if (cpt.component) {
        cpt.plugin.install(Vue, {
          component: cpt.component,
          globalHeader: modalGlobalHeader,
          ...restOptions,
        });
      }
    });
    drawerComponents.forEach((cpt) => {
      if (cpt.component) {
        cpt.plugin.install(Vue, {
          component: cpt.component,
          globalHeader: drawerGlobalHeader,
          ...restOptions,
        });
      }
    });
  },
};
