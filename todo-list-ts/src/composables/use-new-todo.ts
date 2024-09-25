import { ref, reactive, Ref, Reactive } from 'vue';
import * as storage from '@/utils/storage';
export default function useNewTodo(dataListRef: Ref<Todo[]>): NewTodo {
    const dataList: Reactive<Todo[]> = reactive(dataListRef.value);
    const titleRef: Ref<string> = ref('');
    function insertTitle(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
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
    }
    return {
        titleRef: titleRef,
        insertTitle: insertTitle
    };
}