import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import Analysis from '@/views/home/Analysis.vue'
import Chat from '@/views/home/Chat.vue'
import Exam from '@/views/home/Exam.vue'
import Download from '@/views/home/Download.vue'
import Websites from '@/views/home/Websites.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'


//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/', component: LayoutVue, redirect: '/home/analysis', children: [
            { path: '/home/analysis', component: Analysis },
            { path: '/home/chat', component: Chat },
            { path: '/home/exam', component: Exam },
            { path: '/home/download', component: Download },
            { path: '/home/websites', component: Websites },
            { path: '/user/info', component: UserInfoVue },
            { path: '/user/avatar', component: UserAvatarVue },
            { path: '/user/resetPassword', component: UserResetPasswordVue }
        ]
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router