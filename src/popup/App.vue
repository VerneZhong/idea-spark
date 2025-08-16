<template>
  <div class="p-4 w-80" style="width: 320px; height: 400px;">
    <h1 class="text-lg font-bold mb-4">IdeaBox</h1>
    <IdeaForm @add="addIdea" />
    <IdeaList :ideas="ideas" @remove="removeIdea" />
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