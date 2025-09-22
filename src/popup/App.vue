<template>
  <div class="w-80 h-[480px] flex flex-col bg-white rounded-lg shadow-md">
    <!-- 标题 -->
    <h1 class="flex items-center text-lg font-bold px-4 pt-4 pb-2">
      📝 IdeaBox
    </h1>

    <!-- 输入区 -->
    <div class="px-4 pb-3 border-b border-gray-200">
      <IdeaForm @add="addIdea" />
    </div>

    <!-- 列表区（可滚动） -->
    <div class="flex-1 overflow-y-auto px-4">
      <!-- 空状态 -->
      <p v-if="ideas.length === 0" class="text-gray-400 text-center text-sm mt-6">
        ✨ 还没有灵感，快来添加吧！
      </p>

      <IdeaList :ideas="ideas" @remove="removeIdea" />
    </div>

    <!-- 底部导出按钮 -->
    <div class="p-4 border-t border-gray-200">
      <button
          class="w-full py-2 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600 transition"
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