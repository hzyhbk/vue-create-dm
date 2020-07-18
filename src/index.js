import { createAntdDrawer } from './createAntdDrawer';
import { createAntdModal } from './createAntdModal';
import { createViewDrawer } from './createViewDrawer';
import { createViewModal } from './createViewModal';

export { createAntdDrawer, createAntdModal, createViewDrawer, createViewModal };

export default {
  install(Vue, { antdModal, antdDrawer, viewModal, viewDrawer }) {
    if (antdModal) {
      createAntdModal.install(Vue, antdModal);
    }
    if (antdDrawer) {
      createAntdDrawer.install(Vue, antdDrawer);
    }
    if (viewModal) {
      createViewModal.install(Vue, viewModal);
    }
    if (viewDrawer) {
      createViewDrawer.install(Vue, viewDrawer);
    }
  },
};
