<template>
  <div class="app">
    <h1>IdeaBox</h1>
    <form>
      <input type="text" placeholder="记录你的灵感..." />
      <button type="submit">添加</button>
    </form>
    <hr />
    <ul>
      <li v-for="(idea, i) in ideas" :key="i">
        {{ idea }}
        <button @click="removeIdea(i)">✕</button>
      </li>
    </ul>
    <p v-if="ideas.length === 0" class="empty">✨ 暂无想法，先写点东西吧~</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IdeaList from './components/IdeaList.vue'
import IdeaForm from './components/IdeaForm.vue'
import { loadIdeas, saveIdeas } from '../utils/storage'

const ideas = ref<{ id: number, text: string }[]>([])

onMounted(async () => {
  ideas.value = await loadIdeas()
})

function addIdea(text: string) {
  const newIdea = { id: Date.now(), text }
  ideas.value.unshift(newIdea)
  saveIdeas(ideas.value)
}

function removeIdea(id: number) {
  ideas.value = ideas.value.filter(idea => idea.id !== id)
  saveIdeas(ideas.value)
}
</script>

<style src="./style.css"></style>