<template>
  <div class="p-5 w-80 bg-white font-sans">
    <!-- 标题 -->
    <h1 class="text-xl font-semibold mb-4">📝 IdeaBox</h1>

    <!-- 输入 -->
    <IdeaForm @add="addIdea" />

    <hr class="my-2" />

    <!-- 列表 -->
    <IdeaList :ideas="ideas" @remove="removeIdea" @update="updateIdea" />

    <!-- 空状态 -->
    <p v-if="ideas.length === 0" class="text-gray-400 text-center text-sm mt-6">
      ✨ 还没有灵感，快来添加吧！
    </p>

    <!-- 导出 -->
    <div class="mt-6 text-center">
      <button
          class="bg-green-500 text-white px-4 py-1 rounded w-full mt-3 hover:bg-green-600"
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

async function updateIdea(updated: Idea) {
  const index = ideas.value.findIndex((i) => i.id === updated.id)
  if (index !== -1) {
    ideas.value[index] = { ...ideas.value[index], ...updated }
    await saveIdeas(ideas.value)
  }
}
</script>