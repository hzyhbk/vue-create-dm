<template>
  <div>
    Component:{{ value }}
    <button @click="click">aaa</button>
  </div>
</template>

<script>
export default {
  name: 'Component',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    click() {
      this.$emit('input', new Date().getTime() + '');
    },
  },
};
</script>

<style lang="less" scoped></style>
