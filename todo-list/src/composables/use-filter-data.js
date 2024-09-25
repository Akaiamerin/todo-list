import { ref, computed, reactive, onMounted, onUnmounted, toRef } from 'vue';
export default function useFilterData(dataListRef) {
    const dataList = reactive(dataListRef.value);
    const keywordList = reactive([
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
    const activeKeyWordIndexRef = ref(0);
    const filterDataListRef = computed(() => {
        if (activeKeyWordIndexRef.value === 0) {
            return dataList;
        }
        return dataList.filter((elem) => {
            return elem.status === activeKeyWordIndexRef.value;
        });
    });
    const completedNumRef = computed(() => {
        return dataList.filter((elem) => {
            return elem.status === 2;
        }).length;
    });
    function handleHash() {
        const hash = location.hash;
        const index = keywordList.findIndex((item) => {
            return item.hash === hash;
        });
        if (index === -1) {
            activeKeyWordIndexRef.value = 0;
        }
        else {
            activeKeyWordIndexRef.value = index;
        }
    }
    onMounted(() => {
        window.addEventListener('hashchange', handleHash);
    });
    onUnmounted(() => {
        window.removeEventListener('hashchange', handleHash);
    });
    return {
        keywordListRef: toRef(keywordList),
        activeKeyWordIndexRef: activeKeyWordIndexRef,
        filterDataListRef: filterDataListRef,
        completedNumRef: completedNumRef
    };
}