import type { Ref } from 'vue';
export declare interface NewTodo {
    titleRef: Ref<string>;
    insertTitle(): void;
}