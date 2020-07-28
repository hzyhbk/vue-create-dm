<template>
  <div>
    <ExampleCard title="IView Modal 弹框">
      <a-button type="primary" @click="createModal">
        创建弹框
      </a-button>
      <br />
      <br />
      <a-button type="primary" @click="createCustomTitleModal">
        自定义标题弹框
      </a-button>
      <br />
      <br />
      <a-button type="primary" @click="createCustomFooterModal">
        自定义footer弹框
      </a-button>
      <br />
      <br />
      <div>
        <div style="text-align:left;">数据项：{{ dataText }}</div>
        <a-button type="primary" @click="createDataModal">
          创建数据弹框
        </a-button>
      </div>
      <br />
      <a-button type="primary" @click="createDataFromSonModal">
        从子组件取值
      </a-button>
    </ExampleCard>
  </div>
</template>

<script>
import ExampleCard from '../../components/ExampleCard';
import HelloWorld from '../../components/HelloWorld';
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import { Input } from 'ant-design-vue';

export default {
  name: 'ViewExample',
  components: {
    ExampleCard,
  },
  data() {
    return {
      dataText: 'aaa',
    };
  },
  methods: {
    createModal() {
      this.$createViewModal({
        modalProps: {
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
    createCustomTitleModal() {
      this.$createViewModal({
        modalProps: {
          title: 'abcs',
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
    createCustomFooterModal() {
      this.$createViewModal({
        modalProps: {
          title: 'abcs',
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
    createDataModal() {
      let self = this;
      this.$createViewModal({
        modalProps: {
          title: '数据弹框',
          okText: '确认',
          cancelText: '取消',
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
        onOk() {
          console.log(123123, self.dataText);
        },
      });
    },
    createDataFromSonModal() {
      this.$createViewModal({
        modalProps: {
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
        footer: {
          template: Footer,
          props: {
            cancelText: '取消',
            okText: '确定',
          },
        },
        beforeClose: function() {
          console.log('我要关闭了');
        },
        afterClose: function() {
          console.log('我已经关闭了');
        },
        onOk(payload) {
          alert('从子组件取值' + JSON.stringify(payload));
        },
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
