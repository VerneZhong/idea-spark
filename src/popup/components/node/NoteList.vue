<template>
  <div v-if="notes.length > 0" class="divide-y divide-gray-200 border-t border-b border-gray-200">
    <div
        v-for="note in notes"
        :key="note.id"
        class="py-3 px-2 cursor-pointer hover:bg-gray-50"
        @click="$emit('select', note)"
    >
      <div class="flex justify-between items-center">
        <p class="font-medium text-gray-800 truncate">{{ note.title }}</p>
        <p class="text-xs text-gray-400">{{ formatDate(note.createdAt) }}</p>
      </div>
      <p class="text-sm text-gray-500 truncate mt-1">{{ note.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from "../../../utils/storage.ts"

defineProps<{ notes: Note[] }>()

function formatDate(ts: number) {
  const d = new Date(ts)
  return d.toLocaleDateString("zh-CN")
}
</script>