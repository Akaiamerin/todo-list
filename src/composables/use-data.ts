import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';
import storage from '@/utils/storage';
import type { Data } from '@/types/data';
import type { Todo } from '@/types/todo';
export default function useData(): Data {
    const dataListRef: Ref<Todo[]> = ref(storage.loadData());
    watchEffect((): void => {
        storage.saveData(dataListRef.value);
    });
    return {
        dataListRef: dataListRef
    };
}