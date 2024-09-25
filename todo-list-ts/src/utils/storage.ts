const TODO: string = 'todo';
export function fetchData(): Todo[] {
    const data: Todo[] = JSON.parse(localStorage.getItem(TODO) as string);
    if (!data) {
        return [];
    }
    return data;
}
export function saveData(data: Todo[]): void {
    localStorage.setItem(TODO, JSON.stringify(data));
}