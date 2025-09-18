<template>
  <div class="p-4 w-80 bg-white font-sans">
    <!-- 标题 -->
    <h1 class="text-xl font-semibold mb-4">📝 IdeaBox</h1>

    <!-- 输入 -->
    <IdeaForm @add="addIdea" />

    <!-- 列表 -->
    <IdeaList :ideas="ideas" @remove="removeIdea" />

    <!-- 空状态 -->
    <p v-if="ideas.length === 0" class="text-gray-400 text-center text-sm mt-6">
      ✨ 还没有灵感，快来添加吧！
    </p>

    <!-- 导出 -->
    <div class="mt-6 text-center">
      <button
          class="text-gray-500 text-sm hover:text-black"
          @click="exportAll"
          :disabled="ideas.length === 0"
      >
        ⬇️ 导出所有灵感
      </button>
    </div>
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
  const newIdea = { id: Date.now(), text, createdAt: Date.now() }
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