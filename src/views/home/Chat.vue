<script setup>
import { ref, watch, nextTick } from 'vue'
import { ElButton, ElCard } from 'element-plus'
import { Promotion } from '@element-plus/icons-vue'
import defaultAvatar from '@/assets/default.png'
import aiAvatar from '@/assets/ailogo.png'
import { chat } from '@/api/service.js'

import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();
const userInfo = ref(userInfoStore.info)

const messages = ref([
    { id: 0, text: '你好！我是基于星火大模型开发的智能助手，可以帮助你提高英语水平。无论是听、说、读、写，我都可以提供支持和指导，快来向我提问吧！', isUser: false },
])

const newMsg = ref("")

const aiRespondMsg = async () => {
    const result = await chat(messages.value.slice(0, -1));
    messages.value[messages.value.length - 1].text = result.data
    messages.value[messages.value.length - 1].isUser = false
}

const sendMessage = () => {
    if (newMsg.value.trim() !== '' && messages.value[messages.value.length - 1].isUser === false) {
        messages.value.push({ id: messages.value.length, text: newMsg.value, isUser: true })
        messages.value.push({ id: messages.value.length, text: null, isUser: null })
        aiRespondMsg()
        newMsg.value = ''
    }
}

// 监视 messages 数组的变化并滚动到底部
const msgContainer = ref() // 引用消息容器
watch(messages.value, () => {
    nextTick(() => {
        // 滚动到底部
        if (msgContainer.value)
            msgContainer.value.scrollTop = msgContainer.value.scrollHeight;
    })
})

// 处理按键事件
const handleKeyDown = (event) => {
    if (event.key === 'Enter')
        if (!event.shiftKey) {
            event.preventDefault();
            sendMessage();
        } else {
            event.preventDefault();
            newMsg.value += '\n';
        }
}
</script>

<template>
    <el-card class="page-container"
        :body-style="{ display: 'flex', 'flex-direction': 'column', height: '100%', width: '100%', boxSizing: 'border-box' }">
        <div class="msg-container" ref="msgContainer">
            <div v-for="msg in messages" :key="msg.id" class="msg" :class="{ 'user-msg': msg.isUser }">
                <div class="msg-avatar"
                    :style="{ backgroundImage: `url(${msg.isUser ? (userInfo.avatarUrl ? userInfo.avatarUrl : defaultAvatar) : aiAvatar})` }">
                </div>
                <div class="msg-content">
                    <span v-if="msg.isUser === null" class="loading">请稍等</span>
                    <span v-else v-html="msg.text.replace(/\n/g, '<br>')"></span>
                </div>
            </div>
        </div>
        <div class="footer">
            <textarea v-model="newMsg" placeholder="请输入消息,enter发送,shift+enter换行" @keydown="handleKeyDown" />
            <el-button class="button" type="primary" @click="sendMessage">
                <el-icon>
                    <Promotion />
                </el-icon>
            </el-button>
        </div>
    </el-card>
</template>


<style lang="scss" scoped>
.page-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    padding: 0;
}

.msg-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}

.msg {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;

    .msg-avatar {
        background-repeat: no-repeat;
        background-size: cover;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 10px;
    }

    .msg-content {
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 10px;
        max-width: 60%;
    }
}

.user-msg {
    flex-direction: row-reverse;
}

.footer {
    display: flex;
    align-items: flex-end;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #ccc;

    textarea {
        flex: 1;
        padding: 10px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        resize: none;
        height: 30px;
    }

    .button {
        height: 50px;
        width: 50px;
    }
}

@keyframes loadingDots {
    0% {
        content: '';
    }

    33% {
        content: '.';
    }

    66% {
        content: '..';
    }

    100% {
        content: '...';
    }
}

.loading::after {
    content: '';
    animation: loadingDots 1.4s infinite steps(4, end);
}
</style>