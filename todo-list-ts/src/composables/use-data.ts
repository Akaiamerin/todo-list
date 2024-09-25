import { ref, watchEffect, Ref } from 'vue';
import * as storage from '@/utils/storage';
export default function useData(): Data {
    const dataListRef: Ref<Todo[]> = ref(storage.fetchData());
    watchEffect((): void => {
        storage.saveData(dataListRef.value);
    });
    return {
        dataListRef: dataListRef
    };
}