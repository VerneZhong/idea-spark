export async function loadIdeas(): Promise<{ id: number, text: string }[]> {
    const data = localStorage.getItem('devspark-ideas')
    return data ? JSON.parse(data) : []
}

export async function saveIdeas(ideas: { id: number, text: string }[]) {
    localStorage.setItem('devspark-ideas', JSON.stringify(ideas))
}