<template>
  <div>
    page1
    <Cas v-model="a" />
  </div>
</template>

<script>
import Cas from './Component';

export default {
  name: 'page1',
  data() {
    return {
      a: '1',
    };
  },
  components: {
    Cas,
  },
  mounted() {
    console.log('asd');
  },
};
</script>

<style lang="less" scoped></style>
