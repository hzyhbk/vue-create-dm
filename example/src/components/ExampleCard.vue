<template>
  <a-card :title="title" :hoverable="true">
    <slot />
  </a-card>
</template>

<script>
export default {
  name: 'ExampleCard',
  props: {
    title: {
      type: String,
      default: '示例',
    },
  },
};
</script>

<style lang="less" scoped></style>
