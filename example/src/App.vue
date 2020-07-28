<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">VueCreateDM</div>
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="[$router.currentRoute.fullPath]"
      >
        <a-menu-item key="/base">
          <router-link to="/base" />
          <a-icon type="user" />
          <span>基础示例</span>
        </a-menu-item>
        <a-menu-item key="/match">
          <router-link to="/match" />
          <a-icon type="video-camera" />
          <span>路由匹配</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <h2 style="padding: 0 16px">
          代码见src/views{{ $router.currentRoute.fullPath }}
        </h2>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>
<style>
#components-layout-demo-custom-trigger {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
  line-height: 32px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  font-weight: 500;
}
</style>
