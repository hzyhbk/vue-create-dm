<template>
  <div id="app">
    <br />
    <a-button type="primary" @click="createModal">
      创建antd弹框
    </a-button>
    <br />
    <br />
    <div>
      <div style="text-align:left;">数据项：{{ cancelReson }}</div>
      <a-button type="primary" @click="createDataModal">
        创建antd数据弹框
      </a-button>
    </div>
    <br />
    <br />
    <a-button type="primary" @click="createDrawer">
      创建antd抽屉
    </a-button>
    <br />
    <br />
    <a-button type="primary" @click="createViewUIDrawer">
      创建iview抽屉
    </a-button>
    <br />
    <br />
    <a-button type="primary" @click="createViewUIModal">
      创建iview弹框
    </a-button>
    <br />
    <br />
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Title from './components/Title';
import Footer from './components/Footer';
import {
  createAntdDrawer,
  createAntdModal,
  createViewDrawer,
  createViewModal,
} from './utils/index';
import { Input } from 'ant-design-vue';
export default {
  name: 'App',
  data() {
    return {
      cancelReson: 'aa',
    };
  },
  methods: {
    onChange(value) {
      console.log(11, value);
    },
    createDrawer() {
      createAntdDrawer({
        drawerProps: {
          // mask: false,
          // maskClosable: false,
          title: 'abcs',
          closable: false,
          width: '500px',
        },
        title: {
          template: Title,
          props: {
            title: '自定义标题组件',
          },
        },
        content: {
          template: HelloWorld,
          props: {
            msg: 'Welcome to Your Vue.js App',
          },
        },
        beforeClose: function() {
          console.log('我要关闭了');
        },
        afterClose: function() {
          console.log('我已经关闭了');
        },
      });
    },
    createDataModal() {
      let self = this;
      console.log(123123, this.cancelReson);
      createAntdModal({
        modalProps: {
          title: '请输入取消原因',
          okText: '确认取消',
          cancelText: '稍后处理',
        },
        content: {
          template: Input,
          props: {
            value: self.cancelReson,
          },
          on: {
            change(e) {
              self.cancelReson = e.target.value;
            },
          },
        },
        onOk() {
          console.log(123123, self.cancelReson);
        },
      });
      // createAntdModal({
      //   modalProps: {
      //     // mask: false,
      //     // maskClosable: false,
      //     title: 'abcs',
      //     width: '500px',
      //     closable: false,
      //   },
      //   title: {
      //     template: Title,
      //     props: {
      //       title: '自定义标题组件',
      //     },
      //   },
      //   content: {
      //     template: HelloWorld,
      //     props: {
      //       msg: 'Welcome to Your Vue.js App',
      //     },
      //   },
      //   footer: {
      //     template: Footer,
      //     props: {
      //       cancelText: 'hahah取消',
      //       okText: 'hahah确定',
      //     },
      //   },
      //   beforeClose: function() {
      //     console.log('我要关闭了');
      //   },
      //   afterClose: function() {
      //     console.log('我已经关闭了');
      //   },
      //   async onOk() {
      //     await new Promise((resolve) => {
      //       setTimeout(() => {
      //         console.log('点了确定');
      //         resolve();
      //       }, 3000);
      //     });
      //   },
      // });
    },
    createModal() {
      createAntdModal({
        modalProps: {
          // mask: false,
          // maskClosable: false,
          title: 'abcs',
          width: '500px',
          closable: false,
        },
        title: {
          template: Title,
          props: {
            title: '自定义标题组件',
          },
        },
        content: {
          template: HelloWorld,
          props: {
            msg: 'Welcome to Your Vue.js App',
          },
        },
        footer: {
          template: Footer,
          props: {
            cancelText: 'hahah取消',
            okText: 'hahah确定',
          },
        },
        beforeClose: function() {
          console.log('我要关闭了');
        },
        afterClose: function() {
          console.log('我已经关闭了');
        },
        async onOk() {
          await new Promise((resolve) => {
            setTimeout(() => {
              console.log('点了确定');
              resolve();
            }, 3000);
          });
        },
      });
    },
    createViewUIDrawer() {
      createViewDrawer({
        drawerProps: {
          // mask: false,
          // maskClosable: false,
          title: 'abcs',
          closable: false,
          width: '500px',
        },
        title: {
          template: Title,
          props: {
            title: '自定义标题组件',
          },
        },
        content: {
          template: HelloWorld,
          props: {
            msg: 'Welcome to Your Vue.js App',
          },
        },
        beforeClose: function() {
          console.log('我要关闭了');
        },
        afterClose: function() {
          console.log('我已经关闭了');
        },
      });
    },
    createViewUIModal() {
      createViewModal({
        modalProps: {
          // mask: false,
          // maskClosable: false,
          title: 'abcs',
          width: '500px',
          closable: false,
        },
        title: {
          template: Title,
          props: {
            title: '自定义标题组件',
          },
        },
        content: {
          template: HelloWorld,
          props: {
            msg: 'Welcome to Your Vue.js App',
          },
        },
        footer: {
          template: Footer,
          props: {
            cancelText: 'hahah取消',
            okText: 'hahah确定',
          },
        },
        beforeClose: function() {
          console.log('我要关闭了');
        },
        afterClose: function() {
          console.log('我已经关闭了');
        },
        async onOk() {
          await new Promise((resolve) => {
            setTimeout(() => {
              console.log('点了确定');
              resolve();
            }, 3000);
          });
        },
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
