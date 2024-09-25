import { ref, watchEffect } from 'vue';
import storage from '@/utils/storage.js';
export default function useData() {
    const dataListRef = ref(storage.fetchData());
    watchEffect(() => {
        storage.saveData(dataListRef.value);
    });
    return {
        dataListRef: dataListRef
    };
}