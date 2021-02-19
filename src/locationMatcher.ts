/*
 * @Author: 慌张 huangzhang.zyh@alibaba-inc.com
 * @Date: 2021-02-16 21:39:38
 */
import { App, h, resolveComponent } from 'vue';

const URL_REG = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;

export async function getLocation(app: App, options: any, location?: string) {
  if (location) {
    // 直接传链接
    if (URL_REG.test(location)) {
      return {
        ...options,
        content: {
          template: 'iframe',
          props: {
            src: location,
            frameborder: 0
          }
        }
      };
    }

    // 传的是路由
    if (app.config.globalProperties.$router) {
      const targetRouter = app.config.globalProperties.$router.resolve(
        location
      );

      if (targetRouter && targetRouter.matched && targetRouter.matched[0]) {
        const matchedRoute = targetRouter.matched[0];
        let template = matchedRoute && matchedRoute.components.default;
        if (template) {
          if (typeof template === 'function') {
            // vue3组件的解析是异步的
            template = (await template()).default;
            return {
              ...options,
              content: {
                ...options.content,
                template
              }
            };
          }
          return {
            ...options,
            content: {
              ...options.content,
              template
            }
          };
        }
      }
      console.warn(`[vue-create-dm]: 未匹配到路由"${location}"对应的组件`);
    }
  }
  return options;
}
