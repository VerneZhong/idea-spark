// storage.ts

export interface Idea {
    id: number
    text: string
}

const STORAGE_KEY = "ideas"

/**
 * 读取存储的 ideas
 */
export async function loadIdeas(): Promise<Idea[]> {
    return new Promise((resolve) => {
        chrome.storage.local.get(STORAGE_KEY, (result) => {
            const ideas = result[STORAGE_KEY]
            resolve(Array.isArray(ideas) ? ideas : [])
        })
    })
}

/**
 * 保存 ideas
 */
export async function saveIdeas(ideas: Idea[]): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY]: ideas }, () => {
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