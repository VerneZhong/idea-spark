<template>
  <form @submit.prevent="submit" class="flex gap-2">
    <input
        v-model="text"
        ref="inputEl"
        type="text"
        class="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="记录你的灵感..."
    />
    <button
        type="submit"
        class="bg-blue-500 text-white px-3 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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