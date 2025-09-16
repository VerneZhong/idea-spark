import type { Idea } from "./storage"

export function exportIdeas(ideas: Idea[]) {
    if (!ideas.length) return

    const blob = new Blob([JSON.stringify(ideas, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "ideas.json"  // 下载文件名
    a.click()

    URL.revokeObjectURL(url)
}