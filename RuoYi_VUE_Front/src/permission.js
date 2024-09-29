import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isRelogin } from '@/utils/request'
import { MessageBox } from 'element-ui';

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']


// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   if (getToken()) {
//     to.meta.title && store.dispatch('settings/setTitle', to.meta.title);
//     /* has token */
//     if (to.path === '/login') {
//       location.href = store.state.permission.indexPage;
//       NProgress.done();
//     } else if (whiteList.indexOf(to.path) !== -1) {
//       next();
//     } else {
//       if (store.getters.roles.length === 0) {
//         isRelogin.show = true;
//         // 判断当前用户是否已拉取完user_info信息
//         store.dispatch('GetInfo').then(res => {
//           isRelogin.show = false;
//           store.dispatch('GenerateRoutes').then(accessRoutes => {
//             router.addRoutes(accessRoutes); // 动态添加可访问路由表
//             if (res.isFirstLogin) {
//               // 如果是第一次登录，使用MessageBox提示并跳转到修改密码界面
//               MessageBox.alert('第一次登录，请修改密码！', '提示', {
//                 confirmButtonText: '确定',
//                 callback: () => {
//                   next({ path: '/user/profile', replace: true });
//                 }
//               });
//             } else {
//               if (to.fullPath == '/') {
//                 let pathIndex = '';
//                 pathIndex = accessRoutes[0].path + '/' + accessRoutes[0].children[0].path;
//                 next({ path: pathIndex, replace: true }); // hack方法 确保addRoutes已完成
//               } else {
//                 next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
//               }
//             }
//           });
//         }).catch(err => {
//           store.dispatch('LogOut').then(() => {
//             Message.error(err);
//             next({ path: '/' });
//           });
//         });
//       } else {
//         next();
//       }
//     }
//   } else {
//     // 没有token
//     if (whiteList.indexOf(to.path) !== -1) {
//       // 在免登录白名单，直接进入
//       next();
//     } else {
//       next(`/login?redirect=${encodeURIComponent(to.fullPath)}`); // 否则全部重定向到登录页
//       NProgress.done();
//     }
//   }
// });
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      // next({ path: '/' })
      location.href = store.state.permission.indexPage
      NProgress.done()
    } else if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (store.getters.roles.length === 0) {
        isRelogin.show = true
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(() => {
          isRelogin.show = false
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
            if (to.fullPath == '/') {
              // 当登录之后，直接通过ip地址和端口号访问时，跳转到第一个路由页面indexPage。如：http://10.12.7.76:6090/，这样直接访问。
              let pathIndex = ''
              pathIndex = accessRoutes[0].path + '/' + accessRoutes[0].children[0].path
              // replace: true只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。
              next({ path: pathIndex, replace: true }) // hack方法 确保addRoutes已完成
            } else {
              // 如果是点击了一个菜单，然后刷新，保持在当前的页面。
              // 如果是从其他页面点击，通过打开新窗口跳转路由。如从当前故障报警详情里跳到实时监控页面。
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
              // 使用next({ ...to, replace: true })来确保addRoutes()时动态添加的路由已经被完全加载上去。
            }

          })
        }).catch(err => {
          store.dispatch('LogOut').then(() => {
            Message.error(err)
            next({ path: '/' })
            // next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})



router.afterEach(() => {
  NProgress.done()
})
