export async function loadIdeas(): Promise<{ id: number, text: string }[]> {
    return new Promise(resolve => {
        chrome.storage.local.get('ideas', (result) => {
            const ideas = result.ideas
            if (Array.isArray(ideas)) {
                resolve(ideas)
            } else {
                resolve([])
            }
        })
    })
}

export function saveIdeas(ideas: { id: number, text: string }[]) {
    if (!Array.isArray(ideas)) return
    chrome.storage.local.set({ ideas })
}