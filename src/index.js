import { createAntdDrawer } from './createAntdDrawer';
import { createAntdModal } from './createAntdModal';
import { createViewDrawer } from './createViewDrawer';
import { createViewModal } from './createViewModal';

export { createAntdDrawer, createAntdModal, createViewDrawer, createViewModal };

export default {
  install(
    Vue,
    { antdModal, antdDrawer, viewModal, viewDrawer, router, store }
  ) {
    if (antdModal) {
      createAntdModal.install(Vue, { component: antdModal, router, store });
    }
    if (antdDrawer) {
      createAntdDrawer.install(Vue, { component: antdDrawer, router, store });
    }
    if (viewModal) {
      createViewModal.install(Vue, { component: viewModal, router, store });
    }
    if (viewDrawer) {
      createViewDrawer.install(Vue, { component: viewDrawer, router, store });
    }
  },
};
