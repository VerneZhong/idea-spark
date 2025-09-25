<template>
  <!-- 工具栏 -->
  <div class="flex justify-between items-center mt-3 relative" ref="dropdownWrapper">
    <!-- 左侧：导入 -->
    <button
        @click="triggerImport"
        class="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100 shadow-sm transition"
    >
      📂 导入
    </button>

    <!-- 分割线 -->
    <div class="w-px h-6 bg-gray-200 mx-3"></div>

    <!-- 中间：清空 -->
    <button
        @click="clearAll"
        class="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 shadow-sm transition"
    >
      🗑️ 清空
    </button>

    <!-- 右侧：分裂按钮导出 -->
    <div class="relative inline-flex">
      <!-- 主按钮：默认导出 Markdown -->
      <button
          @click="exportAll('markdown')"
          class="px-4 py-2 bg-white border border-gray-300 rounded-l-md text-gray-700 text-sm hover:bg-gray-100 shadow-sm transition"
      >
        ⬇️ 导出
      </button>

      <!-- 分裂按钮右侧箭头 -->
      <button
          @click="toggleDropdown"
          class="px-2 bg-white border border-gray-300 border-l-0 rounded-r-md text-gray-500 text-sm hover:bg-gray-100 shadow-sm transition"
      >
        ▼
      </button>

      <!-- 下拉菜单 -->
      <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 scale-95 -translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-1"
      >
        <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <button
              v-for="fmt in formats"
              :key="fmt.value"
              @click="selectFormat(fmt.value)"
              class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <span>{{ fmt.icon }}</span>
            <span>{{ fmt.label }}</span>
          </button>
        </div>
      </transition>
    </div>

    <!-- 隐藏的文件选择框 -->
    <input
        type="file"
        ref="fileInput"
        accept=".md"
        class="hidden"
        @change="handleImport"
    />
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue'
import {saveIdeas, type Idea} from '../../utils/storage'
import {exportIdeas} from "../../utils/export";

const props = defineProps<{ ideas: Idea[] }>()
const emit = defineEmits(["update:ideas"]) // 通知父组件更新
// 下拉状态
const dropdownOpen = ref(false)
const dropdownWrapper = ref<HTMLElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const formats = [
  {label: 'Markdown', value: 'markdown', icon: '📝'},
  {label: 'JSON', value: 'json', icon: '📄'},
  {label: 'TXT', value: 'txt', icon: '📜'}
]

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function selectFormat(fmt: string) {
  dropdownOpen.value = false
  exportAll(fmt)
}

function exportAll(fmt: string) {
  if (props.ideas.length === 0) return
  exportIdeas(props.ideas, fmt)
}

// 点击外部关闭菜单
function handleClickOutside(event: MouseEvent) {
  if (dropdownWrapper.value && !dropdownWrapper.value.contains(event.target as Node)) {
    dropdownOpen.value = false
  }
}

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
    console.log("读取到的 MD:", text)

    const lines = text.split("\n")

    const newIdeas: Idea[] = []
    let currentTitle = ""

    lines.forEach((line, idx) => {
      line = line.trim()
      if (!line) return

      if (line.startsWith("###")) {
        // 语法点标题
        currentTitle = line.replace(/^#+\s*/, "")
      } else if (line.startsWith("-")) {
        // 例句或解释，跟随最近的标题
        const ideaText = currentTitle
            ? `${currentTitle}\n${line.replace(/^-+\s*/, "")}`
            : line.replace(/^-+\s*/, "")

        newIdeas.push({
          id: Date.now() + idx,
          text: ideaText,
          createdAt: Date.now()
        })
      }
    })

    console.log("生成的 ideas:", newIdeas)

    await saveIdeas(newIdeas)
    emit("update:ideas", newIdeas)
  }
  reader.readAsText(file)

  // 清空 input，避免重复选择同一文件时不触发 change
  input.value = ""
}

// 清空所有数据
async function clearAll() {
  if (!confirm("确定要清空所有数据吗？")) return
  await saveIdeas([])
  emit("update:ideas", [])
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>