import type { ComputedRef, Reactive, Ref } from 'vue';
import type { Keyword } from '@/types/keyword';
import type { Todo } from '@/types/todo';
export declare interface FilterData {
    keywordList: Reactive<Keyword[]>;
    activeKeyWordIndexRef: Ref<number>;
    filterDataListRef: ComputedRef<Todo[]>;
    completedNumRef: ComputedRef<number>;
}