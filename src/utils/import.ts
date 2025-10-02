import type { Note } from "./storage"

export async function importMarkdown(file: File): Promise<Note[]> {
    const text = await file.text()
    const lines = text.split("\n")

    const notes: Note[] = []
    let currentTitle = ""
    let currentContent: string[] = []

    const pushNote = () => {
        if (currentTitle || currentContent.length > 0) {
            notes.push({
                id: Date.now() + notes.length,
                title: currentTitle || "未命名笔记",
                content: currentContent.join("\n"),
                createdAt: Date.now(),
            })
        }
    }

    lines.forEach(line => {
        if (line.startsWith("###")) {
            // 发现新标题，先保存之前的 note
            pushNote()
            currentTitle = line.replace(/^#+\s*/, "")
            currentContent = []
        } else {
            if (line.trim()) currentContent.push(line.trim())
        }
    })

    // 最后一条也要保存
    pushNote()

    return notes
}