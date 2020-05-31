import Vue from 'vue'
import Router from 'vue-router'
import Test from '../components/test'
import Main from '../components/canvas/AppMain'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/appmain'
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/appmain',
      name: 'AppMain',
      component: Main
    }

  ]
})