import { reactive, ref } from 'vue';
import type { Reactive, Ref } from 'vue';
import storage from '@/utils/storage';
import type { NewTodo } from '@/types/new-todo';
import type { Todo } from '@/types/todo';
export default function useNewTodo(dataListRef: Ref<Todo[]>): NewTodo {
    const dataList: Reactive<Todo[]> = reactive(dataListRef.value);
    const titleRef: Ref<string> = ref('');
    function insertTitle(): void {
        if (!titleRef.value) {
            return;
        }
        const todoItem: Todo = {
            id: Date.now(),
            title: titleRef.value,
            status: 1
        };
        dataList.push(todoItem);
        storage.saveData(dataList);
        titleRef.value = '';
    }
    return {
        titleRef: titleRef,
        insertTitle: insertTitle
    };
}