<template>
  <ul class="space-y-2">
    <li
        v-for="idea in ideas"
        :key="idea.id"
        class="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg shadow-sm"
    >
      <span class="text-sm break-words">{{ idea.text }}</span>
      <button
          @click="$emit('remove', idea.id)"
          class="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded-full"
      >
        ✕
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ ideas: { id: number, text: string }[] }>()
</script>