<template>
  <div class="drawer-title">
    <div class="left-btn">
      <a-icon type="left" @click="close"></a-icon>
    </div>
    <div class="title">{{ title }}</div>
    <div>hahahahahhahahha</div>
  </div>
</template>

<script>
export default {
  name: 'drawerTitle',
  props: {
    btnText: {
      type: String,
      default: '确认',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      // 接收 close 事件，来关闭弹框
      this.$emit('close', 'hhhh');
    },
  },
};
</script>

<style scoped>
.drawer-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-btn {
  color: #1c69d4;
  cursor: pointer;
}
</style>
