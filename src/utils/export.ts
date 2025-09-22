import type { Idea } from "./storage"

export function exportIdeas(
    ideas: Idea[],
    format: 'json' | 'markdown' | 'txt' = 'json'
) {
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