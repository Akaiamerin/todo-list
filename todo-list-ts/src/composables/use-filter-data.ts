import { ref, computed, reactive, onMounted, onUnmounted, toRef, Ref, ComputedRef, Reactive } from 'vue';
export default function useFilterData(dataListRef: Ref<Todo[]>): FilterData {
    const dataList: Reactive<Todo[]> = reactive(dataListRef.value);
    const keywordList: Reactive<Keyword[]> = reactive([
        {
            hash: '#all',
            text: '所有'
        },
        {
            hash: '#active',
            text: '进行中'
        },
        {
            hash: '#completed',
            text: '已完成'
        }
    ]);
    const activeKeyWordIndexRef: Ref<number> = ref(0);
    const filterDataListRef: ComputedRef<Todo[]> = computed((): Todo[] => {
        if (activeKeyWordIndexRef.value === 0) {
            return dataList;
        }
        return dataList.filter((elem: Todo): boolean => {
            return elem.status === activeKeyWordIndexRef.value;
        });
    });
    const completedNumRef: ComputedRef<number> = computed((): number => {
        return dataList.filter((elem: Todo): boolean => {
            return elem.status === 2;
        }).length;
    });
    function handleHash(): void {
        const hash: string = location.hash;
        const index: number = keywordList.findIndex((item: Keyword): boolean => {
            return item.hash === hash;
        });
        if (index === -1) {
            activeKeyWordIndexRef.value = 0;
        }
        else {
            activeKeyWordIndexRef.value = index;
        }
    }
    onMounted((): void => {
        window.addEventListener('hashchange', handleHash);
    });
    onUnmounted((): void => {
        window.removeEventListener('hashchange', handleHash);
    });
    return {
        keywordListRef: toRef(keywordList),
        activeKeyWordIndexRef: activeKeyWordIndexRef,
        filterDataListRef: filterDataListRef,
        completedNumRef: completedNumRef
    };
}