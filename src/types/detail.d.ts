import type { ComputedRef, Ref } from 'vue';
import type { Todo } from '@/types/todo';
export declare interface Detail {
    editingTodoItemIdRef: Ref<number>;
    toggleAllStatusRef: ComputedRef<boolean>;
    activeEditTodoItem(todoItem: Todo): void;
    doneEditTodoItem(todoItem: Todo): void;
    cancelEditTodoItem(todoItem: Todo): void;
    toggleAll(status: number): void;
    deleteTodoItem(todoItem: Todo): void;
    clearCompletedTodoItem(): void;
}