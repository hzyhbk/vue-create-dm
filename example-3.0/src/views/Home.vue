<template>
  <div class="home">
    <a-button @click="openModal">asd</a-button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,

  },
  methods:{
    openModal(){
      this.$createAntdModal({
        stopPropagation: true,
        modalProps: {
          title: 'abcs',
          width: '500px',
          mask: false,
          maskClosable: false,
        },
        content: {
          template: HelloWorld,
          props: {
            msg: 'Welcome to Your Vue.js App',
          },
        },
      });
    }
  }
});
</script>
