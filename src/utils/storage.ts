import type { Todo } from '@/types/todo';
const KEY: string = 'TODO';
export default {
    loadData: (): Todo[] => {
        const data: string | null = localStorage.getItem(KEY);
        if (!data) {
            return []
        }
        return JSON.parse(data);
    },
    saveData: (data: Todo[]): void => {
        localStorage.setItem(KEY, JSON.stringify(data));
    }
}