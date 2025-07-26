<template>
  <form @submit.prevent="submit">
    <input v-model="text" type="text" class="w-full border rounded px-2 py-1 mb-2" placeholder="记录你的灵感..." />
    <button type="submit" class="bg-blue-500 text-white px-4 py-1 rounded w-full">添加</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const emit = defineEmits(['add'])

function submit() {
  if (text.value.trim()) {
    emit('add', text.value.trim())
    text.value = ''
  }
}
</script>