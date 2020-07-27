const URL_REG = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;

// 不要直接调用，this会获取不到
export function locationMatcher(location, baseOptions, oldOptions) {
  if (location) {
    // 直接传链接
    if (URL_REG.test(location)) {
      return {
        ...oldOptions,
        content: {
          template: 'iframe',
          attrs: {
            src: location,
            frameborder: 0,
          },
        },
      };
    }
    // 传的是路由地址
    let getMatchedComponents;
    let router;
    // 这里的this是vm实例
    if (this.$router) {
      getMatchedComponents = this.$router.getMatchedComponents;
      router = this.$router;
    } else if (baseOptions.router) {
      getMatchedComponents = baseOptions.router.getMatchedComponents;
      router = baseOptions.router;
    }
    if (getMatchedComponents) {
      // 这里需要调 router 本身的 this
      const [template] = getMatchedComponents.call(router, location);
      if (template) {
        return {
          ...oldOptions,
          content: {
            ...oldOptions.content,
            template,
          },
        };
      }
      console.warn('[vue-create-dm]: 未匹配到路由对应的组件');
      return oldOptions;
    }
    console.warn(
      `[vue-create-dm]: 未获取到 getMatchedComponents 方法，检查是否正确使用 VueRouter 并且将 router 实例传入 VueCreateDM`
    );
    return oldOptions;
  }
  return oldOptions;
}
