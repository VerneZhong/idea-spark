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

  const reader = new FileReader()
  reader.onload = async (e) => {
    const text = e.target?.result as string
    const notes: Note[] = []

    let currentTitle = ""
    let buffer: string[] = []

    text.split("\n").forEach((line, idx) => {
      if (line.startsWith("###")) {
        // 遇到新标题 → 把之前的内容存成一个 Note
        if (currentTitle || buffer.length) {
          notes.push({
            id: Date.now() + idx,
            title: currentTitle,
            content: buffer.join("\n"),
            createdAt: Date.now(),
          })
        }
        currentTitle = line.replace(/^#+\s*/, "")
        buffer = []
      } else {
        buffer.push(line.trim())
      }
    })

    // 收尾：最后一个 Note
    if (currentTitle || buffer.length) {
      notes.push({
        id: Date.now(),
        title: currentTitle,
        content: buffer.join("\n"),
        createdAt: Date.now(),
      })
    }

    await saveNotes(notes)
    emit("update:notes", notes)
  }
  reader.readAsText(file)

  input.value = "" // 允许重复选择
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