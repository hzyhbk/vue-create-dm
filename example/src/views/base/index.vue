<template>
  <div>
    <a-row :gutter="12">
      <a-col :span="6">
        <AntdExample />
      </a-col>
      <a-col :span="6">
        <AntdDrawerExample />
      </a-col>
      <a-col :span="6">
        <ViewExample />
      </a-col>
      <a-col :span="6">
        <ViewDrawerExample />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import AntdExample from './AntdExample';
import ViewExample from './ViewExample';
import AntdDrawerExample from './AntdDrawerExample';
import ViewDrawerExample from './ViewDrawerExample';
export default {
  name: 'Base',
  components: {
    AntdExample,
    ViewExample,
    AntdDrawerExample,
    ViewDrawerExample,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped></style>
