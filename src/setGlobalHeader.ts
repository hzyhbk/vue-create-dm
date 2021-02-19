export function setGlobalHeader(baseOption: any, oldOptions: any) {
  //如果有此选项，设置全局header
  if (baseOption.globalHeader) {
    if (oldOptions.title) {
      // title 如果传 string，就用这个作为props
      if (typeof oldOptions.title === 'string') {
        return {
          ...oldOptions,
          title: {
            template: baseOption.globalHeader,
            props: {
              // TODO 暂时不考虑更多的props
              title: oldOptions.title
            }
          }
        };
      }
      // 如果传对象，会覆盖全局头部
      return oldOptions;
    }
    // 如果没传 title，而传了 modalProps.title 或 drawerProps.title
    // 取这个 title 作为props
    if (oldOptions.modalProps && oldOptions.modalProps.title) {
      return {
        ...oldOptions,
        title: {
          template: baseOption.globalHeader,
          props: {
            title: oldOptions.modalProps.title
          }
        }
      };
    }
    if (oldOptions.drawerProps && oldOptions.drawerProps.title) {
      return {
        ...oldOptions,
        title: {
          template: baseOption.globalHeader,
          props: {
            title: oldOptions.drawerProps.title
          }
        }
      };
    }
    return {
      ...oldOptions,
      title: {
        template: baseOption.globalHeader
      }
    };
  }
  return oldOptions;
}
