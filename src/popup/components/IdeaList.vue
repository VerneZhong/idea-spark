<template>
  <ul class="space-y-2">
    <li v-for="idea in ideas" :key="idea.id" class="flex justify-between items-center bg-gray-100 px-2 py-1 rounded">
      <span class="text-sm">{{ idea.text }}</span>
      <button @click="$emit('remove', idea.id)" class="text-red-500">✕</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ ideas: { id: number, text: string }[] }>()
</script>