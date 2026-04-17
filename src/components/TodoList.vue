<template>
    <div class="todo-list-container">
        <header class="header">
            <input
                v-bind:checked="detail.toggleAllStatusRef.value"
                v-on:change="handleToggleAllStatus"
                class="toggle-all" type="checkbox">
            <input
                v-model="titleRef"
                v-on:keyup="handleInsertTitle"
                class="new-todo"
                type="text"
                placeholder="请输入待办任务"
                autocomplete="off">
        </header>
        <div class="body">
            <ul class="todo-list">
                <li
                    v-for="item in filterData.filterDataListRef.value"
                    v-bind:key="item.id"
                    v-bind:class="{
                        'completed': item.status === 2,
                        'editing': item.id === detail.editingTodoItemIdRef.value
                    }"
                    class="todo-item">
                    <div class="view-box">
                        <input
                            v-bind:checked="item.status === 2"
                            v-on:change="handleTodoItemStatus(item)"
                            class="toggle" type="checkbox">
                        <div
                            v-on:dblclick="hanleActiveEditTodoItem(item)"
                            class="title">{{ item.title }}</div>
                        <div
                            v-on:click="hanleDeleteTodoItem(item)"
                            class="delete"></div>
                    </div>
                    <div class="edit-box">
                        <input
                            v-model="item.title"
                            v-on:blur="hanleDoneEditTodoItem(item)"
                            v-on:keyup="handleEditTodoItem($event, item)"
                            class="edit-todo" type="text">
                    </div>
                </li>
            </ul>
        </div>
        <footer class="footer">
            <div class="todo-count">
                <span>{{ filterData.filterDataListRef.value.length }} 项</span>
            </div>
            <ul class="filter-list">
                <li
                    v-for="(obj, index) in filterData.keywordList"
                    v-bind:key="index"
                    class="filter-item">
                    <a
                        v-bind:class="{
                            'selected': index === filterData.activeKeyWordIndexRef.value
                        }"
                        v-bind:href="obj.hash">{{ obj.text }}</a>
                </li>
            </ul>
            <div
                v-bind:class="{
                    'clear-completed-disabled': filterData.completedNumRef.value === 0
                }"
                class="clear-completed">
                <div v-on:click="handleClearCompletedTodoItem">清空已完成</div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import useData from '@/composables/use-data';
import type { Data } from '@/types/data';
import useNewTodo from '@/composables/use-new-todo';
import type { NewTodo } from '@/types/new-todo';
import useFilterData from '@/composables/use-filter-data';
import type { FilterData } from '@/types/filter-data';
import useDetail from '@/composables/use-detail';
import type { Detail } from '@/types/detail';
import type { Todo } from '@/types/todo';
const data: Data = useData();
const newTodo: NewTodo = useNewTodo(data.dataListRef);
const filterData: FilterData = useFilterData(data.dataListRef);
const detail: Detail = useDetail(data.dataListRef);
const titleRef: Ref<string> = ref(newTodo.titleRef);
function handleToggleAllStatus(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.checked === true) {
        detail.toggleAll(2);
    }
    else {
        detail.toggleAll(1);
    }
}
function handleInsertTitle(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
        newTodo.insertTitle();
    }
}
function handleTodoItemStatus(todoItem: Todo): void {
    if (todoItem.status === 1) {
        todoItem.status = 2;
    }
    else {
        todoItem.status = 1;
    }
}
function hanleActiveEditTodoItem(todoItem: Todo): void {
    detail.activeEditTodoItem(todoItem);
}
function hanleDeleteTodoItem(todoItem: Todo): void {
    detail.deleteTodoItem(todoItem);
}
function hanleDoneEditTodoItem(todoItem: Todo): void {
    detail.doneEditTodoItem(todoItem);
}
function handleEditTodoItem(event: KeyboardEvent, todoItem: Todo): void {
    if (event.key === 'Enter') {
        detail.doneEditTodoItem(todoItem);
    }
    else if (event.key === 'Escape') {
        detail.cancelEditTodoItem(todoItem);
    }
}
function handleClearCompletedTodoItem(): void {
    detail.clearCompletedTodoItem();
}
</script>

<style scoped>
.todo-list-container {
    margin: 10% auto 0 auto;
    width: 50%;
    box-shadow: 0 2px 4px 0 #00000033, 0 25px 50px 0 #0000001a;
}

.todo-list-container a {
    text-decoration: none;
}

.todo-list-container input {
    border: none;
    outline: none;
}

.header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}

.toggle-all {
    margin: 0 0 0 1rem;
    width: 1rem;
    height: 1rem;
}

.new-todo,
.edit-todo {
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.5em;
    color: inherit;
}

.new-todo {
    padding: 1rem 1rem 1rem 1rem;
}

.body {
    border-top: 2px solid #cccccc;
}

.todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.todo-list .todo-item {
    position: relative;
    border-bottom: 1px solid #dddddd;
    font-size: 24px;
}

.todo-item .edit-box,
.todo-item.editing .view-box {
    display: none;
}

.todo-item .view-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.todo-item.editing .edit-box {
    display: flex;
}

.todo-item.completed .view-box .title {
    color: #808080;
    text-decoration: line-through;
}

.view-box .toggle {
    margin: 0 0 0 calc(1rem + 2px);
}

.view-box .title,
.edit-box .edit-todo {
    padding: 0.5rem 1rem 0.5rem calc(1rem + 5px);
}

.view-box .title {
    width: 100%;
}

.view-box .delete {
    display: none;
    position: absolute;
    right: 0.5rem;
}

.view-box .delete::before {
    content: '✖';
}

.view-box:hover .delete {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.edit-box .edit-todo {
    background: #f8f8f8;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem 1rem 0.5rem;
    border-top: 2px solid #cccccc;
    font-size: 16px;
    text-align: center;
    box-shadow:
        #00000033 0px 1px 1px,
        #f6f6f6 0px 8px 0px -3px,
        #00000033 0px 9px 1px -3px,
        #f6f6f6 0px 16px 0px -6px,
        #00000033 0px 18px 2px -6px;
}

.filter-list {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
}

.filter-list .filter-item a {
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    color: inherit;
}

.filter-list .filter-item a:hover,
.filter-list .filter-item a.selected {
    color: #3399ee;
}

.clear-completed {
    cursor: pointer;
}

.clear-completed-disabled {
    color: #808080;
    cursor: not-allowed;
}
</style>