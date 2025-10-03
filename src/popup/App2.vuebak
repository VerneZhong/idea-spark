<template>
  <div class="app flex flex-col h-full">
    <!-- 标题 -->
    <h1 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
      📝 我的笔记
    </h1>

    <!-- 输入区 -->
    <NoteForm @add="addNote" class="mb-4" />

    <!-- 工具栏 -->
    <NoteToolbar
        :notes="notes"
        @update:notes="notes = $event"
        class="mb-4"
    />

    <!-- 列表区（可滚动） -->
    <div class="flex-1 overflow-y-auto border-t pt-2">
      <NoteList
          :notes="notes"
          @remove="removeNote"
      />
      <p
          v-if="notes.length === 0"
          class="text-center text-gray-400 text-sm mt-6"
      >
        ✨ 暂无笔记，先写点东西吧~
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import NoteForm from "./components/node/NoteForm.vue"
import NoteList from "./components/node/NoteList.vue"
import NoteToolbar from "./components/node/NoteToolbar.vue"
import { loadNotes, saveNotes, type Note } from "../utils/storage"

const notes = ref<Note[]>([])

// 初始化加载数据
onMounted(async () => {
  notes.value = await loadNotes()
})

// 新增笔记
async function addNote(title: string, content: string) {
  const newNote: Note = {
    id: Date.now(),
    title,
    content,
    createdAt: Date.now(),
  }
  notes.value.unshift(newNote)
  await saveNotes(notes.value)
}

// 删除笔记
async function removeNote(id: number) {
  notes.value = notes.value.filter((n) => n.id !== id)
  await saveNotes(notes.value)
}
</script>

<style>
.app {
  width: 360px;
  height: 480px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>