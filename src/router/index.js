import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Chat from '@/components/Chat'
import vueScrollto from 'vue-scrollto'

Vue.use(Router)
Vue.use(vueScrollto)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path:"/chat/:id",
      name:"chat",
      component:Chat
    }
  ]
})
