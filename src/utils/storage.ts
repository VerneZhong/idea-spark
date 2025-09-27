// storage.ts

export interface Idea {
    id: number
    text: string
    createdAt: number
}

export interface Note {
    id: number
    title: string
    content: string
    createdAt: number
}

const STORAGE_KEY = "notes"
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

// storage.ts
export async function loadNotes(): Promise<Note[]> {
    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
            resolve(Array.isArray(result[STORAGE_KEY]) ? result[STORAGE_KEY] : [])
        })
    })
}

export async function saveNotes(notes: Note[]): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY]: notes }, () => resolve())
    })
}

export async function addNote(title: string, content: string): Promise<Note[]> {
    const notes = await loadNotes()
    const newNote: Note = {
        id: Date.now(),
        title,
        content,
        createdAt: Date.now()
    }
    const updated = [newNote, ...notes]
    await saveNotes(updated)
    return updated
}

export async function removeNote(id: number): Promise<Note[]> {
    const notes = await loadNotes()
    const updated = notes.filter((n) => n.id !== id)
    await saveNotes(updated)
    return updated
}