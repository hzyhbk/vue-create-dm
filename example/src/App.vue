<template>
  <div id="app">
    <br />
    <a-button type="primary" @click="createModal">
      创建antd弹框
    </a-button>
    <br />
    <br />
    <a-button type="primary" @click="createModalDataFromSon">
      创建antd弹框，从子组件取值
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
    <a-button type="primary" @click="createDrawerDataFromSon">
      创建antd抽屉，从子组件取值
    </a-button>
    <br />
    <br />
    <a-button type="primary" @click="createViewUIDrawer">
      创建iview抽屉
    </a-button>
    <br />
    <br />
    <a-button type="primary" @click="createViewDrawerDataFromSon">
      创建iview抽屉，从子组件取值
    </a-button>
    <br />
    <br />
    <a-button type="primary" @click="createViewUIModal">
      创建iview弹框
    </a-button>
    <br />
    <br />
    <a-button type="primary" @click="createViewUIModalDataFromSon">
      创建iview弹框，从子组件取值
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
      this.$createAntdDrawer({
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
      this.$createAntdModal({
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
      this.$createAntdModal({
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
    createModalDataFromSon() {
      this.$createAntdModal({
        modalProps: {
          // mask: false,
          // maskClosable: false,
          title: 'abcs',
          width: '500px',
          closable: false,
        },
        payloadSlot: true,
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
        async onOk(payload) {
          console.log(123132, payload);
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
      this.$createViewDrawer({
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
      this.$createViewModal({
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
    createViewUIModalDataFromSon() {
      this.$createViewModal({
        modalProps: {
          // mask: false,
          // maskClosable: false,
          title: 'abcs',
          width: '500px',
          closable: false,
        },
        payloadSlot: true,
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
        async onOk(payload) {
          console.log(111, payload);
          await new Promise((resolve) => {
            setTimeout(() => {
              console.log('点了确定');
              resolve();
            }, 3000);
          });
        },
      });
    },
    createDrawerDataFromSon() {
      this.$createAntdDrawer({
        drawerProps: {
          mask: false,
          maskClosable: false,
          title: 'abcs',
          closable: true,
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
        payloadSlot: true,
        beforeClose: function(payload) {
          console.log('我要关闭了', payload);
        },
        afterClose: function(payload) {
          console.log('我已经关闭了', payload);
        },
      });
    },
    createViewDrawerDataFromSon() {
      this.$createViewDrawer({
        drawerProps: {
          // mask: false,
          // maskClosable: false,
          title: 'abcs',
          closable: true,
          width: '500px',
        },
        // title: {
        //   template: Title,
        //   props: {
        //     title: '自定义标题组件',
        //   },
        // },
        content: {
          template: HelloWorld,
          props: {
            msg: 'Welcome to Your Vue.js App',
          },
        },
        payloadSlot: true,
        beforeClose: function(payload) {
          console.log('我要关闭了', payload);
        },
        afterClose: function(payload) {
          console.log('我已经关闭了', payload);
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
