<script setup>
import { onMounted } from 'vue';

import * as echarts from 'echarts/core';
import { TitleComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([TitleComponent, RadarChart, CanvasRenderer]);

import { getUserAbility } from '@/api/service';

onMounted(async () => {
    //获取userAbility数据
    const result = await getUserAbility()
    const userAbility = result.data

    // 绘制六级能力分析图
    let chartDom = document.getElementById('main');
    let myChart = echarts.init(chartDom);
    let option;
    option = {
        title: {
            text: '六级能力分析图',
            x: 'center', y: 'top'
        },
        radar: {
            indicator: [
                { name: '听力', max: 100 },
                { name: '写作', max: 100 },
                { name: '翻译', max: 100 },
                { name: '选词填空', max: 100 },
                { name: '长篇阅读', max: 100 },
                { name: '仔细阅读', max: 100 }
            ]
        },
        series: [
            {
                label: {
                    show: true,
                    position: 'top',
                    color: 'rgba(100,100,100,0.25)',
                },
                name: 'cet6 userAbility',
                type: 'radar',
                data: [
                    {
                        value: userAbility,
                        name: 'userAbility'
                    }
                ]
            }
        ]
    };
    myChart.setOption(option);

    // 监听浏览器大小变化更新图表
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})
</script>

<template>
    <el-card class="page-container">
        <div id="main"></div>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    position: relative;
    min-height: 100%;
    box-sizing: border-box;

    #main {
        position: absolute;
        top: 3%;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>