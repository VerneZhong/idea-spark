<template>
  <form @submit.prevent="submit" class="mb-4">
    <div class="flex items-center gap-2">
      <input
          v-model="text"
          type="text"
          placeholder="记录你的灵感..."
          class="flex-1 border-b border-gray-300 focus:border-black focus:outline-none py-2 text-sm placeholder-gray-400"
          ref="inputEl"
      />
      <button
          type="submit"
          class="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!text.trim()"
      >
        添加
      </button>
    </div>
  </form>
</template>
<input ref="inputEl" v-model="text" .../>
<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue'

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