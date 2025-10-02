import type { Idea, Note } from "./storage"

export function exportIdeas(ideas: Idea[], format: string = 'markdown') {
    let content = ''
    let filename = 'ideas'

    if (format === 'json') {
        content = JSON.stringify(ideas, null, 2)
        filename += '.json'
    } else if (format === 'markdown') {
        // 先按日期分组
        const grouped: Record<string, Idea[]> = {}
        for (const idea of ideas) {
            const date = formatDate(idea.createdAt)
            if (!grouped[date]) grouped[date] = []
            grouped[date].push(idea)
        }

        // 拼接 Markdown 内容
        content = `# 💡 我的灵感收集\n\n`
        for (const date of Object.keys(grouped).sort()) {
            content += `### ${date}\n`
            for (const i of grouped[date]) {
                content += `- ${i.text}\n`
            }
            content += '\n'
        }
        filename += '.md'
    } else if (format === 'txt') {
        content = ideas
            .map((i) => `${i.text} (${formatDate(i.createdAt)})`)
            .join('\n')
        filename += '.txt'
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}

function formatDate(ts: number) {
    const d = new Date(ts)
    return d.toISOString().split('T')[0]
}

/**
 * 导出笔记
 * @param notes 笔记数组
 * @param format 导出格式 (markdown | json | txt)
 */
export function exportNotes(notes: Note[], format: "markdown" | "json" | "txt" = "markdown") {
    let content = ""
    let filename = `notes-${Date.now()}.${format}`

    if (format === "json") {
        content = JSON.stringify(notes, null, 2)
    } else if (format === "txt") {
        content = notes
            .map(n => `${n.title}\n${n.content}\n(${formatDate(n.createdAt)})`)
            .join("\n\n---\n\n")
    } else if (format === "markdown") {
        content = notes
            .map(n => {
                const date = formatDate(n.createdAt)
                return `### ${n.title}\n\n${n.content}\n\n*${date}*`
            })
            .join("\n\n---\n\n")
    }

    downloadFile(filename, content)
}

/**
 * 下载文件
 */
function downloadFile(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}