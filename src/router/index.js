import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/components/Music'

Vue.use(Router)

export default new Router({
  mode: 'history',//去掉#
  routes: [
    {
      path: '/',
      name: 'Music',
      component: Music
    }
  ]
})
