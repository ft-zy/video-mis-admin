/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}


//
// router.beforeEach((to, from, next) => {
//   if (store.getters.token) {
//     if (to.path === '/login') {
//       next('/')
//     } else {
//       next()
//     }
//   }
//   else {
//     if (whiteList.indexOf(to.path) > -1) {
//       next()
//     } else
//     {
//       next('/login')
//     }
//   }
// })