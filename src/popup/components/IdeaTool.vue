<template>
  <!-- 工具栏 -->
  <div class="flex justify-end mt-3 relative" ref="dropdownWrapper">
    <!-- 分裂按钮 -->
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
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue'
import { type Idea } from '../../utils/storage'
import {exportIdeas} from "../../utils/export";

const props = defineProps<{ ideas: Idea[] }>()
// 下拉状态
const dropdownOpen = ref(false)
const dropdownWrapper = ref<HTMLElement | null>(null)
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

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>