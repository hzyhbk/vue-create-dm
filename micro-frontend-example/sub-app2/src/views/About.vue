<template>
  <div>
    我的子应用二的About页面
    <div>count:{{ $store.state.count }}</div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
<script>
export default {
  methods: {
    increment() {
      this.$store.commit('increment');
      console.log(this.$store.state.count);
    },
    decrement() {
      this.$store.commit('decrement');
      console.log(this.$store.state.count);
    },
  },
};
</script>
