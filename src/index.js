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
import {
  event,
  VCDM_OPEN_DRAWER,
  VCDM_OPEN_MODAL,
  listen,
  trigger,
  listenOpenDrawerAction,
  listenOpenModalAction,
  triggerOpenDrawerAction,
  triggerOpenModalAction,
} from './event';

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
  createDrawer,
  createModal,
  VCDM_OPEN_DRAWER,
  VCDM_OPEN_MODAL,
  event,
  listen,
  trigger,
  listenOpenDrawerAction,
  listenOpenModalAction,
  triggerOpenDrawerAction,
  triggerOpenModalAction,
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
