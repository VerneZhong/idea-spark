// storage.ts

export interface Idea {
    id: number
    text: string
    createdAt: number
}

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
 * 删除一个 idea
 */
export async function removeIdea(id: number): Promise<Idea[]> {
    const ideas = await loadIdeas()
    const updated = ideas.filter((idea) => idea.id !== id)
    await saveIdeas(updated)
    return updated
}