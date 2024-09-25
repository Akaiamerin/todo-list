import { ref, computed, reactive } from 'vue';
export default function useDetail(dataListRef) {
    const dataList = reactive(dataListRef.value);
    const editingTodoItemIdRef = ref(-1);
    let oldTitle = '';
    function activeEditTodoItem(todoItem) {
        oldTitle = todoItem.title;
        editingTodoItemIdRef.value = todoItem.id;
    }
    function doneEditTodoItem(todoItem) {
        editingTodoItemIdRef.value = -1;
        if (todoItem.title === '') {
            dataList.splice(dataList.findIndex((item) => {
                return item.id = todoItem.id;
            }), 1);
        }
    }
    function cancelEditTodoItem(todoItem) {
        editingTodoItemIdRef.value = -1;
        todoItem.title = oldTitle;
    }
    const toggleAllStatusRef = computed(() => {
        return dataList.filter((item) => {
            return item.status === 2;
        }).length > 0;
    });
    function toggleAll(status) {
        for (let i = 0; i < dataList.length; i++) {
            dataList[i].status = status;
        }
    }
    function deleteTodoItem(todoItem) {
        dataList.splice(dataList.findIndex((item) => {
            return item.id = todoItem.id;
        }), 1);
    }
    function clearCompletedTodoItem() {
        for (let i = dataList.length - 1; i >= 0; i--) {
            if (dataList[i].status === 2) {
                dataList.splice(i, 1);
            }
        }
    }
    return {
        editingTodoItemIdRef: editingTodoItemIdRef,
        activeEditTodoItem: activeEditTodoItem,
        doneEditTodoItem: doneEditTodoItem,
        cancelEditTodoItem: cancelEditTodoItem,
        toggleAllStatusRef: toggleAllStatusRef,
        toggleAll: toggleAll,
        deleteTodoItem: deleteTodoItem,
        clearCompletedTodoItem: clearCompletedTodoItem
    };
}