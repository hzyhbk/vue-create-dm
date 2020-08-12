<template>
  <div>
    <h2>我是foo页面</h2>
  </div>
</template>

<script>
export default {
  name: 'page1',
  data() {
    return {
      a: '1',
    };
  },
  mounted() {
    console.log(this.$router, this.$store);
  },
};
</script>

<style lang="less" scoped></style>
