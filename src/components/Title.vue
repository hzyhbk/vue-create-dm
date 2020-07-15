<template>
  <div class="drawer-title">
    <div class="left-btn">
      <a-icon type="left" @click="closeDrawer"></a-icon>
    </div>
    <div class="title">{{ title }}</div>
    <div class="right-btn">
      <a-button v-if="showBtn" type="link" @click="handleCommit">{{
        btnText
      }}</a-button>
    </div>
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
    showBtn: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'title',
    },
  },
  data() {
    return {};
  },
  methods: {
    closeDrawer() {
      this.$emit('closeDrawer', 'hhhh');
    },
    handleCommit() {
      this.$emit('commit');
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
