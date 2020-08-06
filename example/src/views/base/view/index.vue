<template>
  <div>
    <a-row :gutter="12">
      <a-col :span="12">
        <ViewExample />
      </a-col>
      <a-col :span="12">
        <ViewDrawerExample />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ViewExample from './ViewExample';
import ViewDrawerExample from './ViewDrawerExample';

export default {
  name: 'Base',
  components: {
    ViewExample,
    ViewDrawerExample,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped></style>
