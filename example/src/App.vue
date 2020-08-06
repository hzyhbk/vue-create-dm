<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">VueCreateDM</div>
      <a-menu
        theme="dark"
        mode="inline"
        :openKeys="['/base']"
        :default-selected-keys="[$router.currentRoute.fullPath]"
      >
        <a-sub-menu key="/base">
          <span slot="title"><a-icon type="user" />基础示例</span>
          <a-menu-item key="/antd">
            <router-link to="/antd" />
            <span>Ant Design</span>
          </a-menu-item>
          <a-menu-item key="/view">
            <router-link to="/view" />
            <span>View UI</span>
          </a-menu-item>
          <a-menu-item key="/elem">
            <router-link to="/elem" />
            <span>Element UI</span>
          </a-menu-item>
        </a-sub-menu>
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
          {{ getSrcPath() }}
        </h2>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
          overflow: 'auto',
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
  methods: {
    getSrcPath() {
      const routerPath = this.$router.currentRoute.fullPath;
      if (routerPath === '/match') {
        return '代码见src/views/match';
      } else {
        return '代码见src/views/base' + routerPath;
      }
    },
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
