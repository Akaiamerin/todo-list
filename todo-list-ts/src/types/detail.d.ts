declare interface Detail {
    editingTodoItemIdRef: Ref<number>;
    activeEditTodoItem(todoItem: Todo): void;
    doneEditTodoItem(todoItem: Todo): void;
    cancelEditTodoItem(todoItem: Todo): void;
    toggleAllStatusRef: ComputedRef<boolean>;
    toggleAll(status: number): void;
    deleteTodoItem(todoItem: Todo): void;
    clearCompletedTodoItem(): void;
}