<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <br />
    <a-button type="primary" @click="createDrawer">创建弹窗</a-button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Title from './components/Title';
import { createAntdDrawer } from './utils/createAntdDrawer';

export default {
  name: 'App',
  methods: {
    createDrawer() {
      createAntdDrawer({
        drawerProps: {
          mask: false,
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
