<template>
  <div>
    <a-row :gutter="12">
      <a-col :span="12">
        <EleExample />
      </a-col>
      <a-col :span="12">
        <EleDrawerExample />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import EleExample from './EleExample';
import EleDrawerExample from './EleDrawerExample';

export default {
  name: 'Base',
  components: {
    EleExample,
    EleDrawerExample,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped></style>
