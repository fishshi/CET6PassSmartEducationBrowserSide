<script setup>
import { ref, onMounted } from 'vue'
import { User, Crop, EditPen, SwitchButton, CaretBottom, Paperclip } from '@element-plus/icons-vue'
import { DataLine, ChatDotRound, Edit, Download } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import defaultAvatar from '@/assets/default.png'

import { useRouter } from 'vue-router'
const router = useRouter();

import { useTokenStore } from '@/stores/token.js'
const tokenStore = useTokenStore();

import useUserInfoStore from '@/stores/userInfo.js'
import { userInfoService } from '@/api/user.js'
const userInfoStore = useUserInfoStore();

//调用函数,获取用户详细信息
const getUserInfo = async () => {
    //调用接口
    let result = await userInfoService();
    //数据存储到pinia中
    userInfoStore.setInfo(result.data);
}
getUserInfo();

//条目被点击后,调用的函数
const handleCommand = (command) => {
    //判断指令
    if (command === 'logout') {
        //退出登录
        ElMessageBox.confirm(
            '您确认要退出吗?',
            '温馨提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                //退出登录
                //1.清空pinia中存储的token以及个人信息
                tokenStore.removeToken()
                userInfoStore.removeInfo()
                //2.跳转到登录页面
                router.push('/login')
                ElMessage.success('退出登录成功')
            })
            .catch(() => {
                ElMessage.info('用户取消了退出登录')
            })
    } else {
        //路由，转跳页面
        router.push('/user/' + command)
    }
}

const dailyEnglish = ref({
    content: "", // 原句
    note: "" // 翻译
})

onMounted(() => {
    axios.get('https://api.oioweb.cn/api/common/OneDayEnglish').then((response) => {
        dailyEnglish.value = response.data.result
    })
})

</script>

<template>
    <!-- element-plus中的容器 -->
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <!-- element-plus的菜单标签 -->
            <el-menu active-text-color="rgb(255, 255, 255)" background-color="rgb(52, 73, 94)"
                text-color="rgb(220, 220, 220)" router>
                <el-menu-item index="/home/analysis">
                    <el-icon>
                        <DataLine />
                    </el-icon>
                    <span>个人分析</span>
                </el-menu-item>
                <el-menu-item index="/home/chat">
                    <el-icon>
                        <ChatDotRound />
                    </el-icon>
                    <span>智能教师</span>
                </el-menu-item>
                <el-menu-item index="/home/exam">
                    <el-icon>
                        <Edit />
                    </el-icon>
                    <span>自我检测</span>
                </el-menu-item>
                <el-menu-item index="/home/download">
                    <el-icon>
                        <Download />
                    </el-icon>
                    <span>真题下载</span>
                </el-menu-item>
                <el-menu-item index="/home/websites">
                    <el-icon>
                        <Paperclip />
                    </el-icon>
                    <span>实用链接</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div class="daily-english">
                    今日英语：
                    {{ dailyEnglish.content }}
                    {{ dailyEnglish.note }}
                </div>
                <!-- 下拉菜单 -->
                <!-- command: 条目被点击后会触发,在事件函数上可以声明一个参数,接收条目对应的指令 -->
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.avatarUrl ? userInfoStore.info.avatarUrl : defaultAvatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer>
                <div>
                    <span class="clickable">服务协议</span>
                    <span> | </span>
                    <span class="clickable">隐私政策</span>
                    <span> | </span>
                    <span>2855691008@qq.com</span>
                </div>
                <div>六级通 ©2024 Created by fishshi</div>
            </el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: rgb(52, 73, 94);

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .daily-english {
        flex: 1;
        margin: 0 20px;
        font-size: 18px;
        font-family: serif;
        font-weight: bold;
        color: #333;
    }

    .el-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;

        div {
            margin: 1px 0;
        }

        .clickable {
            cursor: pointer;
        }
    }
}
</style>