<template>
  <div v-if="note" class="p-4">
    <h2 class="text-lg font-bold mb-2">{{ note.title }}</h2>
    <pre class="whitespace-pre-wrap text-sm text-gray-700">{{ note.content }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { Note } from "../../utils/storage"
defineProps<{ note: Note | null }>()
</script>