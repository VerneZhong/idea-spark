<template>
  <form @submit.prevent="submit" class="space-y-2">
    <!-- 标题输入框 -->
    <input
        v-model="title"
        type="text"
        placeholder="输入笔记标题..."
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />

    <!-- 内容输入框 -->
    <textarea
        v-model="content"
        placeholder="输入笔记内容..."
        rows="3"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-2 focus:ring-blue-400 focus:outline-none"
    ></textarea>

    <!-- 添加按钮 -->
    <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md w-full text-sm hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!title.trim() && !content.trim()"
    >
      添加笔记
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue"

const title = ref("")
const content = ref("")
const emit = defineEmits<{
  (e: "add", title: string, content: string): void
}>()

function submit() {
  if (!title.value.trim() && !content.value.trim()) return
  emit("add", title.value.trim(), content.value.trim())
  title.value = ""
  content.value = ""
}
</script>