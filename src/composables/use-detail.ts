import { computed, reactive, ref } from 'vue';
import type { ComputedRef, Reactive, Ref } from 'vue';
import type { Detail } from '@/types/detail';
import type { Todo } from '@/types/todo';
export default function useDetail(dataListRef: Ref<Todo[]>): Detail {
    const dataList: Reactive<Todo[]> = reactive(dataListRef.value);
    const editingTodoItemIdRef: Ref<number> = ref(-1);
    const toggleAllStatusRef: ComputedRef<boolean> = computed((): boolean => {
        return dataList.filter((item: Todo): boolean => {
            return item.status === 2;
        }).length > 0;
    });
    let oldTitle: string = '';
    function activeEditTodoItem(todoItem: Todo): void {
        oldTitle = todoItem.title;
        editingTodoItemIdRef.value = todoItem.id;
    }
    function doneEditTodoItem(todoItem: Todo): void {
        editingTodoItemIdRef.value = -1;
        if (todoItem.title === '') {
            dataList.splice(dataList.findIndex((item: Todo): number => {
                return item.id = todoItem.id;
            }), 1);
        }
    }
    function cancelEditTodoItem(todoItem: Todo): void {
        editingTodoItemIdRef.value = -1;
        todoItem.title = oldTitle;
    }
    function toggleAll(status: number): void {
        for (let i: number = 0; i < dataList.length; i++) {
            dataList[i].status = status;
        }
    }
    function deleteTodoItem(todoItem: Todo): void {
        dataList.splice(dataList.findIndex((item: Todo): number => {
            return item.id = todoItem.id;
        }), 1);
    }
    function clearCompletedTodoItem(): void {
        for (let i: number = dataList.length - 1; i >= 0; i--) {
            if (dataList[i].status === 2) {
                dataList.splice(i, 1);
            }
        }
    }
    return {
        editingTodoItemIdRef: editingTodoItemIdRef,
        toggleAllStatusRef: toggleAllStatusRef,
        activeEditTodoItem: activeEditTodoItem,
        doneEditTodoItem: doneEditTodoItem,
        cancelEditTodoItem: cancelEditTodoItem,
        toggleAll: toggleAll,
        deleteTodoItem: deleteTodoItem,
        clearCompletedTodoItem: clearCompletedTodoItem
    };
}