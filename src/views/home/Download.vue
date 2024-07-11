<script setup>
import { ref, onMounted } from 'vue'
import { getDownloadList } from '@/api/service'

const pageNum = ref(1)//当前页
const total = ref(0)//总条数
const pageSize = ref(0)//每页条数

const downloadList = ref()
onMounted(async () => {
    let result = await getDownloadList()
    downloadList.value = result.data
    total.value = downloadList.value.length
    pageSize.value = 3
})

const download = (index) => {
    window.open(downloadList.value[(pageNum.value - 1) * pageSize.value + index].fileUrl)
}
</script>

<template>
    <el-card class="page-container">
        <!--下载-->
        <div class="download">
            <div class="download-content" v-for="item in pageSize" :key="item">
                <div class="text">{{ downloadList[(pageNum - 1) * pageSize + (item - 1)].fileName }}</div>
                <div class="image"
                    :style="{ backgroundImage: `url(${downloadList[(pageNum - 1) * pageSize + (item - 1)].coverUrl})` }"
                    @click="download(item - 1)"></div>
            </div>
        </div>
        <!-- 分页条 -->
        <el-pagination class="pagination" v-model:current-page="pageNum" v-model:page-size="pageSize"
            layout="prev, pager, next" background :total="total" />
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    flex-direction: column;

    .download {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 10%;

        .download-content {
            position: relative;
            float: left;
            width: 33.33%;
            height: 100%;
            container-type: inline-size;

            .text {
                position: absolute;
                top: 12%;
                left: 50%;
                transform: translateX(-50%);
                font-size: 5cqw;
            }

            .image {
                background-repeat: no-repeat;
                background-size: cover;
                position: absolute;
                top: 22%;
                bottom: 5%;
                left: 10%;
                right: 10%;
                cursor: pointer;
            }

            .image:hover {
                top: 21%;
                bottom: 4%;
                left: 9%;
                right: 9%;
            }
        }
    }

    .pagination {
        position: absolute;
        top: 90%;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }
}
</style>