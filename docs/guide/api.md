
# 类型签名

```ts
type SlotOption = { template: Component } & VNodeData;

type ICallbackParams = {
  payload: any;
  slotPayload: any;
};

interface IBaseOption {
  title?: SlotOption | string;
  content?: SlotOption;
  beforeClose?: (params: ICallbackParams) => void | Promise<void>;
  afterClose?: (params: ICallbackParams) => void | Promise<void>;
}

interface IModalOption extends IBaseOption {
  modalProps: Object;
  footer?: SlotOption;
  onOk?: (params: ICallbackParams) => Boolean | Promise<Boolean> | void | Promise<any>;
  payloadSlot?: boolean | 'default' | 'title' | 'footer';
}

interface IDrawerOption extends IBaseOption {
  drawerProps: Object;
  payloadSlot?: boolean | 'default' | 'title';
}

type IArgObj = {
  component: Component;
  globalHeader: Component;
  router: any;
  store: any;
}

type ICreateModalFn = (options: IModalOption, arg1?: IArgObj, arg2?: String) => VNode
| (options: IModalOption, arg1?: string, arg2?: IArgObj) => VNode

type ICreateDrawerFn = (options: IDrawerOption, arg1?: IArgObj, arg2?: String) => VNode
| (options: IDrawerOption, arg1?: string, arg2?: IArgObj) => VNode

declare module 'vue/types/vue' {
  interface Vue {
    $createAntdModal: ICreateModalFn;
    $createAntdDrawer: ICreateDrawerFn
    $createViewModal: ICreateModalFn;
    $createViewDrawer: ICreateDrawerFn
    $createEleModal: ICreateModalFn;
    $createEleDrawer: ICreateDrawerFn
  }
}
```
