<template>
  <div v-if="ideas.length > 0" class="divide-y divide-gray-200 border-t border-b border-gray-200">
    <div
        v-for="idea in ideas"
        :key="idea.id"
        class="flex justify-between items-center py-2"
    >
      <span class="text-sm text-gray-800 break-words">{{ idea.text }}</span>
      <button
          @click="$emit('remove', idea.id)"
          class="text-gray-400 hover:text-red-500 text-sm px-2"
      >
        ✕
      </button>
      <p class="text-xs text-gray-400 mt-1">{{ formatDate(idea.createdAt) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ ideas: { id: number, text: string, createdAt: number }[] }>()

function formatDate(ts: number) {
  if (ts) {
    const d = new Date(ts)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    const isToday = d.toDateString() === today.toDateString()
    const isYesterday = d.toDateString() === yesterday.toDateString()

    if (isToday) return "今天"
    if (isYesterday) return "昨天"

    return d.toISOString().split("T")[0] // YYYY-MM-DD
  }
  return "";
}
</script>