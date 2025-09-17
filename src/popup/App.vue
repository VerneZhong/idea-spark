<template>
  <div class="p-4 w-80 bg-white rounded-lg shadow">
    <!-- 标题 -->
    <h1 class="text-lg font-bold flex items-center mb-4">IdeaBox</h1>

    <!-- 输入区域 -->
    <IdeaForm @add="addIdea" />

    <!-- 列表 -->
    <div v-if="ideas.length > 0" class="mt-4">
      <IdeaList :ideas="ideas" @remove="removeIdea" />
    </div>
    <p v-else class="text-gray-400 text-center mt-4">
      ✨ 还没有灵感，快来添加吧！
    </p>

    <button
        class="w-full border border-gray-300 text-gray-600 text-sm py-2 rounded-lg hover:bg-gray-50 mt-4"
        @click="exportAll"
        :disabled="ideas.length === 0"
    >
      导出所有灵感
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IdeaList from './components/IdeaList.vue'
import IdeaForm from './components/IdeaForm.vue'
import { loadIdeas, saveIdeas, type Idea } from '../utils/storage'
import {exportIdeas} from "../utils/export";

const ideas = ref<Idea[]>([])

onMounted(async () => {
  ideas.value = await loadIdeas()
  console.log('加载到的数据:', ideas.value)
})

async function addIdea(text: string) {
  const newIdea = { id: Date.now(), text }
  ideas.value.unshift(newIdea)
  await saveIdeas(ideas.value)
}

async function removeIdea(id: number) {
  ideas.value = ideas.value.filter(idea => idea.id !== id)
  await saveIdeas(ideas.value)
}

function exportAll() {
  exportIdeas(ideas.value)
}
</script>

<style src="./style.css"></style>