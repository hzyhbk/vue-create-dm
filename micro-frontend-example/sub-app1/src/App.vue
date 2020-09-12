<template>
  <div id="app-demo">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log(window.triggerOpenDrawerAction);
  },
  components: {},
};
</script>

<style lang="less"></style>
