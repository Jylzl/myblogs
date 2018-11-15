import Vue from 'vue'
import Router from 'vue-router'
import Land from './views/login/land.vue'
import Register from './views/login/register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: "/account/land",
      name: "land",
      component: Land
    }, {
      path: "/account/register",
      name: "register",
      component: Register
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})