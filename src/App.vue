<template>
  <div id="app">
    <br />
    <a-button type="primary" @click="createModal">创建弹框</a-button>
    <br />
    <br />
    <br />
    <a-button type="primary" @click="createDrawer">创建抽屉</a-button>

    <br />
    <br />
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Title from './components/Title';
import Footer from './components/Footer';
import { createAntdDrawer } from './utils/createAntdDrawer';
import { createAntdModal } from './utils/createAntdModal';

export default {
  name: 'App',
  methods: {
    createDrawer() {
      createAntdDrawer({
        drawerProps: {
          mask: false,
          maskClosable: false,
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
