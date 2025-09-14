<template>
  <div class="app">
    <h1>IdeaBox</h1>

    <IdeaForm @add="addIdea" />

    <hr />

    <IdeaList :ideas="ideas" @remove="removeIdea" />

    <p v-if="ideas.length === 0" class="empty">✨ 暂无想法，先写点东西吧~</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IdeaList from './components/IdeaList.vue'
import IdeaForm from './components/IdeaForm.vue'
import { loadIdeas, saveIdeas, type Idea } from '../utils/storage'

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
</script>

<style src="./style.css"></style>