<template>
  <form @submit.prevent="submit">
    <input
        v-model="text"
        type="text"
        class="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="记录你的灵感..."
        @keydown.enter.exact.prevent="submit"
        @keydown.shift.enter.prevent="text += '\n'"
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

const textareaEl = ref<HTMLTextAreaElement | null>(null)

function autoResize() {
  if (textareaEl.value) {
    textareaEl.value.style.height = "auto"
    textareaEl.value.style.height = textareaEl.value.scrollHeight + "px"
  }
}

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