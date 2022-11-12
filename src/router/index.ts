import { createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

import Layout from '@/layout/index.vue'
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
          {
            path: '/dashboard',
            component: () => import('@/layout/dashboard/Index.vue'),
            name: 'dashboard',
            meta: {
              title: '首页',
              icon: '#icondashboard'
            }
          }
        ]
      },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
    },
    {
        path: '/d',
        name: 'd',
        component: () => import('@/views/video/videoInfo/upload/Updet.vue')
    },
    // {
    //     path: '/monitoring',
    //     component: Layout,
    //     name: 'monitoring',
    //     meta: {
    //         title: '系统监控',
    //         icon: 'el-icon-menu',
    //         roles: ['sys:manage'],
    //         parentId: 0,
    //     },
    //     children: [
    //         {
    //             path: '/user',
    //             component: () => import('@/views/monitoring/User.vue'),
    //             name: 'user',
    //             meta: {
    //                 title: '用户列表',
    //                 icon: 'el-icon-s-custom',
    //                 roles: ['sys:user']
    //             }
    //         },
    //         {
    //             path: '/log',
    //             component:() => import('@/views/monitoring/Log.vue'),
    //             name: 'log',
    //             meta: {
    //                 title: '日志管理',
    //                 roles: ['sys:log']
    //             }
    //         },
    //         {
    //             path: '/swagger',
    //             component:() => import('@/views/monitoring/Swagger.vue'),
    //             name: 'swagger',
    //             meta: {
    //                 title: 'Swagger接口',
    //                 roles: ['sys:swagger']
    //             }
    //         },
    //     ]
    // },
    // {
    //     path: '/system',
    //     component: Layout,
    //     name: 'system',
    //     meta: {
    //         title: '系统管理',
    //         roles: ['sys:manage'],
    //         parentId: 0,
    //     },
    //     children: [
    //         {
    //             path: '/role',
    //             component: ()=> import('@/views/system/role/Role.vue'),
    //             name: 'role',
    //             meta: {
    //                 title: '角色管理',
    //                 roles: ['sys:role']
    //             },
    //         },
    //         {
    //             path: '/menu',
    //             component: ()=> import('@/views/system/menu/Menu.vue'),
    //             name: 'menu',
    //             meta: {
    //                 title: '菜单管理',
    //                 roles: ['sys:menu']
    //             }
    //         },
    //         {
    //             path: '/adminInfo',
    //             component: ()=> import('@/views/system/admin/AdminInfo.vue'),
    //             name: 'adminInfo',
    //             meta: {
    //                 title: '用户管理',
    //                 roles: ['sys:adminInfo']
    //             }
    //         }
    //
    //     ]
    // },
    // {
    //     path: '/video',
    //     component: Layout,
    //     name: 'video',
    //     meta: {
    //         title: '视频管理',
    //         roles: ['sys:manage'],
    //         parentId: 0,
    //     },
    //     children: [
    //         {
    //             path: '/videoInfo',
    //             component: ()=> import('@/views/video/videoInfo/VideoInfo.vue'),
    //             name: 'videoInfo',
    //             meta: {
    //                 title: '视频信息列表',
    //                 roles: ['sys:videoInfo'],
    //             }
    //         },
    //         {
    //             path: '/videoType',
    //             component: ()=> import('@/views/video/type/VideoType.vue'),
    //             name: 'videoType',
    //             meta: {
    //                 title: '视频分类管理',
    //                 roles: ['sys:videoType'],
    //             }
    //         },
    //         {
    //            path: '/Region',
    //            component: ()=> import('@/views/video/region/Region.vue'),
    //            name: 'Region',
    //            meta: {
    //                 title: '视频地区管理',
    //                 roles: ['sys:Region'],
    //            }
    //         },
    //         {
    //             path: '/Year',
    //             component: ()=> import('@/views/video/year/Year.vue'),
    //             name: 'Year',
    //             meta: {
    //                  title: '视频年份管理',
    //                  roles: ['sys:Year'],
    //             }
    //          }
    //     ]
    // },
    // {
    //     path: '/error',
    //     component: Layout,
    //     name: 'error',
    //     meta: {
    //         title: '错误信息模块',
    //         roles: ['sys:manage'],
    //         parentId: 0,
    //     },
    //     children: [
    //         {
    //             path: '/404',
    //             component: ()=> import('@/views/error/404.vue'),
    //             name: '404',
    //             meta: {
    //                 title: '404页面',
    //                 roles: ['sys:404'],
    //             }
    //         },
    //         {
    //             path: '/500',
    //             component: ()=> import('@/views/error/500.vue'),
    //             name: '500',
    //             meta: {
    //                 title: '500页面',
    //                 roles: ['sys:404'],
    //             }
    //         },
    //     ]
    // },
    // {
    //     path: '/message',
    //     component: Layout,
    //     name: 'message',
    //     meta: {
    //         title: '信息模块',
    //         roles: ['sys:manage'],
    //         parentId: 0,
    //     },
    //     children: [
    //         {
    //             path: '/postMessage',
    //             component: ()=> import('@/views/message/UserList.vue'),
    //             name: 'postmessage',
    //             meta: {
    //                 title: '发布公告信息',
    //                 roles: ['sys:postMessage'],
    //             }
    //         },
    //     ]
    // },
    // {
    //     path: '/:path(.*)',
    //     name: 'error2',
    //     component: () => import('@/views/error/404.vue'),
    //     meta: {
    //         title: '404'
    //     }
    // },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router