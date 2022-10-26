import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../pages/Home')
const QA = () => import('@/pages/QA')
const QAlist = () => import('@/pages/QA/components/QAlist')
const ArticleList = () => import('@/pages/QA/components/ArticleList')
const PersonalPage = () => import('@/pages/QA/components/PersonalPage')
const Article = () => import('@/pages/QA/components/Article')
const qa = () => import('@/pages/QA/components/QA')
const UserMsg = () => import('@/pages/QA/components/UserMsg')
const error = () => import('@/pages/error')

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
//加上这段代码就解决了
Vue.use(VueRouter)


const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  {
    path: '/QA',
    component: QA,
    redirect: '/QAlist',
    children: [
      { path: '/QAlist', component: QAlist },
      { path: '/articleList', component: ArticleList },
      { path: '/personalPage', component: PersonalPage },
      { path: '/Article/:id', component: Article, name: 'article' },
      { path: '/qa/:id', component: qa, name: 'qa' },
      { path: '/usermsg/:id', component: UserMsg, name: 'usermsg' },
    ]
  },
  { path: '*', component: error }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savePosition) {
    return { y: 0 }
  }
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 获取存储token的开始时间
  const tokenStartTime = window.localStorage.getItem('tokenStartTime')
  // 后台给出的token有效时间，一个星期 单位 是秒
  // 我们自己定义6天过期，让用户重新登录一下， 用户总不可能在一个页面挂机一天吧
  const timeOver = 7 * 24 * 3600 * 1000
  // 当前时间
  let date = new Date().getTime()
  // 如果大于说明是token过期了
  if (date - tokenStartTime > timeOver) {
    window.localStorage.removeItem('token')
  }

  if (to.path === '/home') return next()
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/home')
  next()
})

export default router