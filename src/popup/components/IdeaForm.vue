<template>
  <form @submit.prevent="submit">
    <textarea
        v-model="text"
        rows="3"
        class="w-full border rounded px-2 py-1 mb-2 resize-none"
        placeholder="记录你的灵感..."
    />
    <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-1 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!text.trim()"
    >
      添加
    </button>
  </form>
</template>
<input ref="inputEl" v-model="text" ... />
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const text = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['add'])

function submit() {
  if (text.value.trim()) {
    emit('add', text.value.trim())
    text.value = ''
    nextTick(() => inputEl.value?.focus())
  }
}

onMounted(() => {
  inputEl.value?.focus()
})
</script>