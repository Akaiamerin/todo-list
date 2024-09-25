import { ref, reactive } from 'vue';
import storage from '@/utils/storage.js';
export default function useNewTodo(dataListRef) {
    const dataList = reactive(dataListRef.value);
    const titleRef = ref('');
    function insertTitle(event) {
        if (event.key === 'Enter') {
            if (!titleRef.value) {
                return;
            }
            const todoItem = {
                id: Date.now(),
                title: titleRef.value,
                status: 1
            };
            dataList.push(todoItem);
            storage.saveData(dataList);
            titleRef.value = '';
        }
    }
    return {
        titleRef: titleRef,
        insertTitle: insertTitle
    };
}