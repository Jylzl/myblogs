import Vue from 'vue'
import Router from 'vue-router'
import Land from './views/login/land.vue'
import Register from './views/login/register.vue'
// 博客
import Blog from './views/blog/Main.vue'
import User from './views/blog/user/Main.vue'
import ArticleList from './views/blog/page/ArticleList.vue'
import Article from './views/blog/page/Article.vue'

import Manage from "@/views/blog/manage/Manage";
// import Write from "@/views/blog/manage/Write";
import BlogManage from '@/views/blog/manage/BlogManage.vue'
import Comment from '@/views/blog/manage/Comment.vue'
import UserSet from '@/views/blog/manage/UserSet.vue'
import Classify from '@/views/blog/manage/Classify.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: "/",
      name: "index",
      redirect: '/blog/1/list',
    }, {
      path: "/account/land",
      name: "Land",
      component: Land
    }, {
      path: "/account/register",
      name: "Register",
      component: Register
    }, {
      path: "/blog",
      name: "blog",
      component: Blog,
      redirect: '/blog/:userid/list',
      children: [{
        path: '/blog/manage',
        name: 'Manage',
        component: Manage,
        redirect: '/blog/manage/list',
        children: [{
            path: '/blog/manage/list',
            name: 'BlogManage',
            component: BlogManage
          },
          {
            path: '/blog/manage/comment',
            name: 'Comment',
            component: Comment
          },
          {
            path: '/blog/manage/userset',
            name: 'UserSet',
            component: UserSet
          },
          {
            path: '/blog/manage/classify',
            name: 'Classify',
            component: Classify
          }
        ]
      }, {
        path: "/blog/:userid",
        name: "user",
        component: User,
        redirect: '/blog/:userid/list',
        children: [{
            path: "/blog/:userid/list",
            name: "ArticleList",
            component: ArticleList,
          },
          {
            path: "/blog/:userid/:articleno",
            name: "Article",
            component: Article,
          }
        ]
      }]
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