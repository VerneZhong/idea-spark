export async function loadIdeas() {
    return new Promise(resolve => {
        chrome.storage.local.get('ideas', (result) => {
            resolve(result.ideas || []);
        });
    });
}
export function saveIdeas(ideas) {
    chrome.storage.local.set({ ideas });
}
