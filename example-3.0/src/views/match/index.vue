<template>
  <div>
    <a-button @click="createFrame">
      抽屉打开百度
    </a-button>
    <br />
    <br />
    <a-button @click="createFoo">
      抽屉打开foo页面
    </a-button>
    <br />
    <br />
    <a-button @click="createFrameModal">
      弹框打开百度
    </a-button>
    <br />
    <br />
    <a-button @click="createFooModal">
      弹框打开foo页面
    </a-button>
  </div>
</template>

<script>
import router from '../../router';
import { store } from '../../main';

export default {
  name: 'Match',
  mounted() {
    console.log(this.$router);
  },
  methods: {
    createFrame() {
      this.$createAntdDrawer(
        {
          drawerProps: {
            title: 'abcs',
            width: '50%',
          },
        },
        'https://www.baidu.com'
      );
    },
    createFrameModal() {
      this.$createAntdModal(
        {
          modalProps: {
            title: 'abcs',
            width: '50%',
          },
        },
        'https://www.baidu.com'
      );
    },
    createFoo() {
      this.$createAntdDrawer(
        {
          drawerProps: {
            title: 'abcs',
            width: '50%',
          },
        },
        { router, store },
        '/foo'
      );
    },
    createFooModal() {
      this.$createAntdModal(
        {
          modalProps: {
            title: 'abcs',
            width: '50%',
          },
        },
        '/foo'
      );
    },
  },
};
</script>

<style>
iframe {
  width: 100%;
  height: calc(100vh - 103px);
}
</style>
