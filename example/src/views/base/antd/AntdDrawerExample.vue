<template>
  <div>
    <ExampleCard title="Antd Drawer 抽屉">
      <a-button type="primary" @click="createDrawer">
        创建抽屉
      </a-button>
      <br />
      <br />
      <a-button type="primary" @click="createCustomTitleDrawer">
        自定义标题抽屉
      </a-button>
      <br />
      <br />
      <div>
        <div style="text-align:left;">数据项：{{ dataText }}</div>
        <a-button type="primary" @click="createDataDrawer">
          创建数据抽屉
        </a-button>
      </div>
      <br />
      <a-button type="primary" @click="createDataFromSonDrawer">
        从子组件取值
      </a-button>
    </ExampleCard>
  </div>
</template>

<script>
import ExampleCard from '@/components/ExampleCard';
import HelloWorld from '@/components/HelloWorld';
import Title from '@/components/Title';
import { Input } from 'ant-design-vue';

export default {
  name: 'AntdDrawerExample',
  components: {
    ExampleCard,
  },
  data() {
    return {
      dataText: 'aaa',
    };
  },
  methods: {
    createDrawer() {
      this.$createAntdDrawer({
        drawerProps: {
          title: 'abcs',
          width: '500px',
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
    createCustomTitleDrawer() {
      this.$createAntdDrawer({
        drawerProps: {
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
        beforeClose: function() {
          console.log('我要关闭了');
        },
        afterClose: function() {
          console.log('我已经关闭了');
        },
      });
    },
    createDataDrawer() {
      let self = this;
      this.$createAntdDrawer({
        drawerProps: {
          title: '数据抽屉',
        },
        content: {
          template: Input,
          props: {
            value: self.dataText,
          },
          on: {
            change(e) {
              self.dataText = e.target.value;
            },
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
    createDataFromSonDrawer() {
      this.$createAntdDrawer({
        drawerProps: {
          title: 'abcs',
          width: '500px',
        },
        // 需要加这个参数
        payloadSlot: true,
        content: {
          template: HelloWorld,
          props: {
            msg: 'Welcome to Your Vue.js App',
          },
        },
        beforeClose: function(payload) {
          alert('beforeClose, 从子组件取值' + JSON.stringify(payload));
          console.log('我要关闭了');
        },
        afterClose: function(payload) {
          alert('afterClose, 从子组件取值' + JSON.stringify(payload));
          console.log('我已经关闭了');
        },
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
