declare interface FilterData {
    keywordListRef: Ref<Reactive<Keyword[]>>;
    activeKeyWordIndexRef: Ref<number>;
    filterDataListRef: ComputedRef<Todo[]>;
    completedNumRef: ComputedRef<number>;
}