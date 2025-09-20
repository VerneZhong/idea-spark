<template>
  <div v-if="ideas.length > 0" class="divide-y divide-gray-200 border-t border-b border-gray-200">
    <div
        v-for="idea in ideas"
        :key="idea.id"
        class="py-3 px-1 relative"
    >
      <!-- 删除按钮固定在右上角 -->
      <button
          @click="$emit('remove', idea.id)"
          class="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-sm"
      >
        ✕
      </button>

      <!-- 编辑状态 -->
      <textarea
          v-if="idea.editing"
          v-model="idea.text"
          class="w-full text-sm border rounded p-1 pr-6"
          @blur="finishEdit(idea)"
          @keyup.enter.exact.prevent="finishEdit(idea)"
      />

      <!-- 普通显示（折叠 + 展开） -->
      <p
          v-else
          class="text-sm text-gray-800 break-words pr-6 cursor-pointer"
          :class="{ 'line-clamp-2': !idea.expanded }"
          @click="toggleExpand(idea)"
          @dblclick="startEdit(idea)"
      >
        {{ idea.text }}
      </p>

      <!-- 日期 -->
      <p class="text-xs text-gray-400 mt-1">{{ formatDate(idea.createdAt) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue"

// Props
const props = defineProps<{
  ideas: { id: number; text: string; createdAt: number; expanded?: boolean; editing?: boolean }[];
}>()

// Emits
const emit = defineEmits<{
  (e: "remove", id: number): void
  (e: "update", idea: { id: number; text: string; createdAt: number }): void
}>()

// 日期格式化
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
  return ""
}

// 折叠/展开
function toggleExpand(idea: any) {
  idea.expanded = !idea.expanded
}

// 开始编辑
function startEdit(idea: any) {
  idea.editing = true
  nextTick(() => {
    const textarea = document.querySelector("textarea")
    textarea?.focus()
  })
}

// 结束编辑
function finishEdit(idea: any) {
  idea.editing = false
  emit("update", idea) // 通知父组件更新
}
</script>

<style>
/* 限制两行，多余部分省略 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>