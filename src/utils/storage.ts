// storage.ts

export interface Idea {
    id: number
    text: string
}

const STORAGE_KEY = "ideas"

/**
 * 读取存储的 ideas
 */
export function loadIdeas(): Promise<Idea[]> {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: "loadIdeas" }, (response) => {
            resolve(Array.isArray(response?.data) ? response.data : [])
        })
    })
}

/**
 * 保存 ideas
 */
export function saveIdeas(ideas: Idea[]): Promise<void> {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: "saveIdeas", data: ideas }, () => {
            resolve()
        })
    })
}

/**
 * 添加一个新的 idea
 */
export async function addIdea(text: string): Promise<Idea[]> {
    const ideas = await loadIdeas()
    const newIdea: Idea = { id: Date.now(), text }
    const updated = [...ideas, newIdea]
    await saveIdeas(updated)
    return updated
}

/**
 * 删除一个 idea
 */
export async function removeIdea(id: number): Promise<Idea[]> {
    const ideas = await loadIdeas()
    const updated = ideas.filter((idea) => idea.id !== id)
    await saveIdeas(updated)
    return updated
}