import Vue from 'vue';
import VueRouter from 'vue-router';
import foo from './views/foo/index.vue';
import bar from './views/bar/index.vue';
import antd from './views/base/antd/index.vue';
import view from './views/base/view/index.vue';
import elem from './views/base/elem/index.vue';
import match from './views/match/index.vue';

Vue.use(VueRouter);
const routes = [
  { path: '/foo', component: foo },
  { path: '/bar', component: bar },
  { path: '/antd', component: antd },
  { path: '/view', component: view },
  { path: '/elem', component: elem },
  { path: '/match', component: match },
];
const router = new VueRouter({ routes });

export default router;
