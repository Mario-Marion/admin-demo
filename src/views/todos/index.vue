<template>
  <div>
    <l-todos :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import LTodos from "./components/index.vue"
import type { Todos } from './components/types'

const todos = reactive<Todos>({
  todoList: [
    { id: 1, value: 'string', done: true },
    { id: 2, value: 'str', done: false }
  ],  
  callBack: {
    handleAdd: (todo) => {
      todos.todoList.push(todo)
      console.log(`📕添加元素`, todo)
    },
    handleUpdate: (id, newVal) => {
      const index = todos.todoList.findIndex(todo => todo.id === id);
      todos.todoList[index].value = newVal
      console.log(`📌更新元素ID: ${id} ;📜新内容：${newVal}`);
    },
    handleRemove: (todo) => {
      const index = todos.todoList.findIndex(e => e.id === todo.id)
      todos.todoList.splice(index, 1)
      console.log(`📌移除元素:`, todo)
    },
    handleClear: (idList) => {
      const newTodoList = todos.todoList.filter(todo => !idList.includes(todo.id))
      todos.todoList = newTodoList
      console.log(`✨清除元素id：${idList}`);
    },
    handleDone: (id, idList) => { console.log(`📌选中元素ID: ${id} ; ✨选中ID集合：${idList}`); },
    handleCheckAll: (idList) => { console.log(`✨选中元素ID：${idList}`); },
    handleFilter: (type) => { console.log(`当前显示✨ ${type} ✨元素`); },
  }
});

</script>

<style lang="less" scoped>

</style>