import {
  Component,
  VNodeData,
  VNode,
  CreateElement,
  PluginFunction,
} from 'vue';
import { Vue as _Vue } from 'vue/types/vue';

export type IPluginOption = {
  antdModal: Component;
  antdDrawer: Component;
  viewModal: Component;
  viewDrawer: Component;
  eleModal: Component;
  eleDrawer: Component;
  router: any;
  store: any;
  modalGlobalHeader: Component;
  drawerGlobalHeader: Component;
};

export type SlotOption = { template: Component } & VNodeData;

export type ICallbackParams = {
  payload: any;
  slotPayload: any;
};

export interface IBaseOption {
  title?: SlotOption | string;
  content?: SlotOption;
  beforeClose?: (params: ICallbackParams) => void | Promise<any>;
  afterClose?: (params: ICallbackParams) => void | Promise<any>;
}
export interface IBaseCreateOption {
  component: Component;
  globalHeader: Component;
  titleSlotName: string; //原来组件提供的标题插槽名称
  visiblePropName: string; //原来控制抽屉组件显隐的属性名称
  router: any;
  store: any;
}
export interface ICreateDrawerOptions extends IBaseCreateOption {
  closeCbName: string; // 原来组件的关闭回调事件名称
}
export interface IDrawerOption extends IBaseOption {
  drawerProps: { [k: string]: any };
  payloadSlot?: boolean | 'default' | 'title';
}
export type createDrawer = (
  Vue: _Vue,
  createOptions: ICreateDrawerOptions,
  options: IDrawerOption
) => VNode;

export interface IModalOption extends IBaseOption {
  modalProps: { [k: string]: any };
  footer?: SlotOption;
  onOk?: (params: ICallbackParams) => void | Promise<any>;
  payloadSlot?: boolean | 'default' | 'title' | 'footer';
}
export interface ICreateModalOptions extends IBaseCreateOption {
  footerSlotName: string; //原来组件提供的footer插槽名称
  visiblePropName: string; //原来控制弹框组件显隐的属性名称
  cancelCbName: string; // 原来组件的关闭回调事件名称
  okCbName: string; // 原来组件的确定回调事件名称
}
export type createModal = (
  Vue: _Vue,
  createOptions: ICreateModalOptions,
  options: IModalOption
) => VNode;

export type getSlotPayload = (
  slotVnMap: { [k: string]: VNode },
  payloadSlot: string
) => any;

export type createDrawerSlot = (
  createElement: CreateElement,
  slotVnMap: { [k: string]: VNode },
  close: Promise<void>
) => (option: SlotOption, slot: string) => VNode;

export type createModalSlot = (
  createElement: CreateElement,
  slotVnMap: { [k: string]: VNode },
  confirmLoading: boolean,
  close: Promise<void>,
  ok: Promise<void>
) => (option: SlotOption, slot: string) => VNode;

declare module 'vue/types/vue' {
  interface Vue {
    $createAntdModal: (options: IModalOption, location: string) => VNode;
    $createAntdDrawer: (options: IDrawerOption, location: string) => VNode;
    $createViewModal: (options: IModalOption, location: string) => VNode;
    $createViewDrawer: (options: IDrawerOption, location: string) => VNode;
    $createEleModal: (options: IModalOption, location: string) => VNode;
    $createEleDrawer: (options: IDrawerOption, location: string) => VNode;
  }
}

declare class VueCreateDM {
  static install: PluginFunction<IPluginOption>;
}

export default VueCreateDM;
