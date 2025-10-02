<template>
  <div class="flex justify-end gap-3 mt-3 relative">
    <!-- 导入按钮 -->
    <button @click="triggerImport" class="btn">📂 导入</button>
    <input
        type="file"
        ref="fileInput"
        accept=".md"
        class="hidden"
        @change="handleImport"
    />

    <!-- 清空按钮 -->
    <button @click="clearAll" class="btn-danger">🗑️ 清空</button>

    <!-- 导出按钮 -->
    <button @click="exportAll" class="btn">⬇️ 导出</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { saveNotes, type Note } from "../../../utils/storage"
import { exportNotes } from "../../../utils/export"
import { importMarkdown } from "../../../utils/import"

const props = defineProps<{ notes: Note[] }>()
const emit = defineEmits(["update:notes"])

const fileInput = ref<HTMLInputElement | null>(null)

function triggerImport() {
  fileInput.value?.click()
}

async function handleImport(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const newNotes = await importMarkdown(file)

  await saveNotes(newNotes)
  emit("update:notes", newNotes)

  input.value = "" // 清空 input，避免同一文件不能重复导入
}

function clearAll() {
  if (!confirm("确定要清空所有数据吗？")) return
  saveNotes([])
  emit("update:notes", [])
}

function exportAll() {
  if (!props.notes.length) return
  exportNotes(props.notes, "markdown")
}
</script>