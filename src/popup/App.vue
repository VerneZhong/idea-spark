<template>
  <div class="app">
    <h1>IdeaBox</h1>

    <IdeaForm @add="addIdea" />

    <hr />

    <IdeaList :ideas="ideas" @remove="removeIdea" />

    <button
        class="bg-green-500 text-white px-4 py-1 rounded w-full mt-2"
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