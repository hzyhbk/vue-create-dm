<template>
  <div>
    <a-row :gutter="12">
      <a-col :span="12">
        <AntdExample />
      </a-col>
      <a-col :span="12">
        <AntdDrawerExample />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import AntdExample from './AntdExample';
import AntdDrawerExample from './AntdDrawerExample';

export default {
  name: 'Base',
  components: {
    AntdExample,
    AntdDrawerExample,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped></style>
