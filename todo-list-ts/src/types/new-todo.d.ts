declare interface NewTodo {
    titleRef: Ref<string>;
    insertTitle(event: KeyboardEvent): void;
}