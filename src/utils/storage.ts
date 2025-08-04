export async function loadIdeas(): Promise<{ id: number, text: string }[]> {
    return new Promise(resolve => {
        chrome.storage.local.get('ideas', (result) => {
            resolve(result.ideas || [])
        })
    })
}

export function saveIdeas(ideas: { id: number, text: string }[]) {
    chrome.storage.local.set({ ideas })
}