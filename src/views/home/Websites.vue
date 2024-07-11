<script setup>
import { onMounted, ref } from 'vue';
import { ElCard, ElImage } from 'element-plus';
import { getWebsites } from '@/api/service';

const websites = ref([]);

onMounted(async () => {
    let result = await getWebsites();
    websites.value = result.data;
});
</script>

<template>
    <el-card class="page-container"
        :body-style="{ display: 'flex', 'flex-direction': 'column', width: '100%', height: '100%', boxSizing: 'border-box' }">
        <div v-for="website in websites" :key="website.name" class="website-card">
            <el-image :src="website.icon" class="website-icon" />
            <div class="website-info">
                <h3><a :href="website.url" target="_blank">{{ website.name }}</a></h3>
                <p>{{ website.description }}</p>
            </div>
        </div>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.website-card {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 10px;

    &:last-child {
        border-bottom: none;
    }
}

.website-icon {
    width: 50px;
    height: 50px;
    margin-right: 20px;
}

.website-info {
    display: flex;
    flex: 1;
    flex-direction: column;

    h3 {
        margin: 0 0 10px;
        font-size: 1.2em;

        a {
            text-decoration: none;
            color: #333;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    p {
        margin: 0;
        color: #666;
    }
}
</style>
