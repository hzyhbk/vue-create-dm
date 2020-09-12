<template>
  <div>
    <a-button type="primary" @click="openDrawer">打开普通抽屉</a-button>
    <br />
    <br />
    <a-button type="primary" @click="openDrawer2">
      抽屉打开子应用二的页面
    </a-button>
    <br />
    <br />
    <a-button type="primary" @click="openModal2">
      弹框打开子应用二的页面
    </a-button>
    <a-descriptions title="子应用一主页" layout="vertical" bordered>
      <a-descriptions-item label="Product">
        Cloud Database
      </a-descriptions-item>
      <a-descriptions-item label="Billing Mode">
        Prepaid
      </a-descriptions-item>
      <a-descriptions-item label="Automatic Renewal">
        YES
      </a-descriptions-item>
      <a-descriptions-item label="Order time">
        2018-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="Usage Time" :span="2">
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="Status" :span="3">
        <a-badge status="processing" text="Running" />
      </a-descriptions-item>
      <a-descriptions-item label="Negotiated Amount">
        $80.00
      </a-descriptions-item>
      <a-descriptions-item label="Discount">
        $20.00
      </a-descriptions-item>
      <a-descriptions-item label="Official Receipts">
        $60.00
      </a-descriptions-item>
      <a-descriptions-item label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1<br />
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld';
export default {
  data() {
    return {};
  },
  methods: {
    openDrawer() {
      this.$createAntdDrawer({
        drawerProps: {
          title: '子应用一抽屉',
          width: '50%',
        },
        content: {
          template: HelloWorld,
          props: {
            msg: 'hello world',
          },
        },
      });
    },
    openDrawer2() {
      window.triggerOpenDrawerAction({
        appName: 'sub2',
        path: '/about',
        drawerProps: {
          title: '子应用二抽屉',
          width: '50%',
        },
        content: {},
      });
    },
    openModal2() {
      window.triggerOpenModalAction({
        appName: 'sub2',
        path: '/about',
        modalProps: {
          title: '子应用二弹框',
          width: '50%',
        },
        content: {},
      });
    },
  },
};
</script>
<style></style>
