<script setup>
import { onMounted, ref } from 'vue';
import { ElCard, ElRadio, ElRadioGroup, ElButton, ElAlert, ElMessage } from 'element-plus';
import { getUserAbility, getQuestion, getAnswer } from '@/api/service';

//题目
const question = ref({
    id: 0,
    article: "",
    title: "",
    options: "A.^B.^C.^D."
})
//答案
const answer = ref()
//用户答案
const userAnswer = ref()
//是否显示解析
const showExplanation = ref(false)

//获取题目
const toGetQuestion = async () => {
    let result = await getUserAbility()
    result = await getQuestion(result.data)
    question.value = result.data
}

onMounted(() => {
    toGetQuestion();
    ElMessage.success("系统以根据您的学习数据，智能推荐练习题")
})

//提交答案
const submitAnswer = async () => {
    if (!userAnswer.value) {
        ElMessage.error("请选择答案")
        return;
    }
    let result = await getAnswer(question.value.id, userAnswer.value)
    answer.value = result.data
    console.log(answer.value)
    showExplanation.value = true;
};

//刷新题目
const flushQuestion = () => {
    userAnswer.value = ''
    showExplanation.value = false;
    answer.value = ''
    toGetQuestion();
}
</script>

<template>
    <el-card class="page-container"
        :body-style="{ display: 'flex', 'flex-direction': 'column', width: '100%', height: '100%', boxSizing: 'border-box' }">
        <div v-html="question.article"></div>
        <div class="question">{{ question.title }}</div>
        <el-radio-group v-model="userAnswer" class="options">
            <el-radio v-for="option in question.options.split('^')" :key="option[0]" :label="option[0]"
                :style="{ 'display': 'block', 'width': '100%' }" :disabled=showExplanation>
                {{ option }}
            </el-radio>
        </el-radio-group>
        <el-button type="primary" v-if="!showExplanation" @click="submitAnswer">提交答案</el-button>
        <el-alert v-if="showExplanation" :type="userAnswer === answer.answer ? 'success' : 'error'" title="解析">
            {{ answer.analysis }}
        </el-alert>
        <el-button type="primary" v-if="showExplanation" @click="flushQuestion"
            style="margin-top: 20px;">下一题</el-button>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    padding: 20px 40px;
}

.question {
    margin-top: 20px;
    font-weight: bold;
}

.options {
    margin: 20px 0;
}

.el-alert {
    margin-top: 20px;
}
</style>