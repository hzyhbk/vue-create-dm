/*
 * @Author: hzyhbk <hzyhbk@163.com>
 * @Date: 2021-01-30 15:50:32
 */
import {
  createVNode,
  Component,
  Plugin,
  VNode,
  CSSProperties,
  VNodeTypes
} from 'vue';
import { subVNodePlugin } from './genSubVNode';
import { createAntdModal } from './createModal';
import { createAntdDrawer } from './createDrawer';
import { getLocation } from './locationMatcher';
import { setGlobalHeader } from './setGlobalHeader';

type SlotComponent<T> = {
  template: Component<T>;
  props?: T;
};

export type CreateModalProps<
  ModalProps,
  TitleProps,
  ContentProps,
  FooterProps
> = {
  modalProps?: ModalProps;
  title?: SlotComponent<TitleProps>;
  content?: SlotComponent<ContentProps>;
  footer?: SlotComponent<FooterProps>;
};

type VueCreateDMOption = {
  modalGlobalHeader?: Component;
  drawerGlobalHeader?: Component;
};

type ExcludeProps<P> = Partial<Exclude<P, 'confirmLoading' | 'onOk'>>;
type ComponentProps<T> = {
  template: Component<T>;
  props?: ExcludeProps<T>;
};

type BaseSlotProps<TitleProps, ContentProps, FooterProps> = {
  title?: ComponentProps<TitleProps>;
  content?: ComponentProps<ContentProps>;
  footer?: ComponentProps<FooterProps>;
};

type BaseProps<TitleProps, ContentProps, FooterProps> = BaseSlotProps<
  TitleProps,
  ContentProps,
  FooterProps
> & {
  onOk?: (data?: {
    payload: any;
    slotPayload: any;
  }) => Promise<boolean> | Promise<unknown> | boolean | void;
  payloadSlot?:
    | boolean
    | keyof BaseSlotProps<TitleProps, ContentProps, FooterProps>;
  beforeClose?: (data: { payload: any; slotPayload: any }) => void;
  afterClose?: () => void;
};
type createModal<T> = <TitleProps, ContentProps, FooterProps>(
  options: BaseProps<TitleProps, ContentProps, FooterProps> & {
    modalProps?: Partial<T>;
  },
  location?: string
) => VNode;

type createDrawer<T> = <TitleProps, ContentProps, FooterProps>(
  options: BaseProps<TitleProps, ContentProps, FooterProps> & {
    drawerProps?: Partial<T>;
  },
  location?: string
) => VNode;

export type AntdDrawerProps = {
  closable: boolean;
  maskClosable: boolean;
  mask: boolean;
  maskStyle: CSSProperties;
  wrapStyle: CSSProperties;
  bodyStyle: CSSProperties;
  headerStyle: CSSProperties;
  drawerStyle: CSSProperties;
  title: VNodeTypes;
  width: string | number;
  height: string | number;
  zIndex: number;
  placement: 'top' | 'right' | 'bottom' | 'left';
  wrapClassName: string; // not use class like react, vue will add class to root dom
  keyboard: boolean;
};
export type AntdModalProps = {
  prefixCls: string;
  title: VNodeTypes;
  closable: boolean;
  closeIcon: VNodeTypes;
  centered: boolean;
  width: string | number;
  footer: VNodeTypes;
  okText: string;
  okType: 'primary' | 'dashed' | 'danger' | 'link';
  cancelText: string;
  icon: VNodeTypes;
  maskClosable: boolean;
  okButtonProps: any;
  cancelButtonProps: any;
  wrapClassName: string;
  maskTransitionName: string;
  transitionName: string;
  zIndex: number;
  bodyStyle: CSSProperties;
  maskStyle: CSSProperties;
  mask: boolean;
  keyboard: boolean;
};

export interface VDMAntd<
  ModalProps = AntdModalProps,
  DrawerProps = AntdDrawerProps
> {
  $createAntdModal: createModal<ModalProps>;
  $createAntdDrawer: createDrawer<DrawerProps>;
}

export interface VDMCustomProperties {
  // 只创建subVNode
  $createSubVNode: typeof createVNode;
  // 创建并挂载subVNode
  $renderSubVNode: <Props extends Record<string, unknown>>(
    component: Component<Props>,
    props: Props
  ) => {
    $update: (props: Props) => void;
    $unmount: () => void;
  };
}

const createAntdPlugin: Plugin = {
  install(app, options?: any) {
    if (app._context.components.AModal) {
      app.config.globalProperties.$createAntdModal = async (
        coverProps: any,
        location?: string
      ) => {
        // 路由匹配
        const newProps = await getLocation(app, coverProps, location);
        // 全局头部匹配
        const propsWithGH = setGlobalHeader(
          {
            globalHeader: options.modalGlobalHeader
          },
          newProps
        );
        createAntdModal(app, app._context.components.AModal, propsWithGH);
      };
    }
    if (app._context.components.ADrawer) {
      app.config.globalProperties.$createAntdDrawer = async (
        coverProps: any,
        location?: string
      ) => {
        // 路由匹配
        const newProps = await getLocation(app, coverProps, location);
        // 全局头部匹配
        const propsWithGH = setGlobalHeader(
          {
            globalHeader: options.drawerGlobalHeader
          },
          newProps
        );
        createAntdDrawer(app, app._context.components.ADrawer, propsWithGH);
      };
    }
  }
};
const VueCreateDM: Plugin = {
  install(app, options: VueCreateDMOption = {}) {
    app.use(subVNodePlugin);
    app.use(createAntdPlugin, options);
  }
};

export default VueCreateDM;
