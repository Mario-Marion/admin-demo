<template>
  <div class="todo-wrap">
    <h1 class="title">todos</h1>
    <section class="todoapp">
      <header class="header">
        <input class="new-todo" placeholder="What needs to be done?" v-model="todo" key="asd" @keyup.enter="AddTodo" />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" @click="checkAll" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!-- <el-scrollbar :max-height="300"> -->
            <li :class="{ completed: doneList.includes(item.id) }" v-for="(item, index) of filterTodoList"
              :key="item.id">
              <div class="view">
                <input class="toggle" type="checkbox" :checked="doneList.includes(item.id)"
                  @click="DoneTodo(item.id)" />
                <label @dblclick="checkUpdated = item.id">{{ item.value }}</label>
                <button class="destroy" @click="RemoveTodo(item,index)"></button>
              </div>
              <input v-focus :class="['edit', { editting: checkUpdated === item.id }]" :value="item.value"
                @blur="UpdateTodo(item.id,$event)" @keyup.enter="e => (e.target as HTMLInputElement).blur()" />
            </li>
          <!-- </el-scrollbar> -->
        </ul>
      </section>

      <footer class="footer">
        <span class="todo-count"><strong>{{ checkedCount }}</strong> item left</span>
        <ul class="filters">
          <li v-for="item of filters" :key="item">
            <a :class="{ selected: filterTodos === item }" href="javascript:void(0)" @click="FilterTodo(item)">{{ item
            }}
            </a>
          </li>
        </ul>
        <button class="clear-completed" @click="cleanup">Clear completed</button>
      </footer>

    </section>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'
import type { Todos, Todo } from './types'

// 自定义聚焦指令
const vFocus: Directive<any, void> = (el: HTMLElement) => {
  el.focus()
}

interface props {
  todos: Todos
}
const props = defineProps<props>()

// 解构todos，并转为响应式对象
const { todos } = toRefs(props);
const { callBack } = todos.value;

// 添加元素内容
const todo = ref("");
/**
 * @description 添加元素
 */
const AddTodo = () => {
  const value = todo.value.trim();
  if (!value) {
    ElMessage.warning({
      duration: 2000,
      message: `内容不能为空`
    })
    return
  }
  const newTodo: Todo = { id: Date.now(), value: todo.value.trim(), done: true }
  callBack.handleAdd(newTodo)
  todo.value = ""
}
/**
 * @description 删除元素
 * @param id 元素id
 */
const RemoveTodo = (todo: Todo, index: number) => {
  callBack.handleRemove(todo)
}

// 双击选中元素id
const checkUpdated = ref<number>()
/**
 * @description 修改元素
 */
const UpdateTodo = (id: number, event: Event) => {
  checkUpdated.value = undefined
  const newValue = (event.target as HTMLInputElement).value;
  callBack.handleUpdate(id, newValue)
}


// 初始化收集选中元素
const initDoneList = todos.value.todoList.filter(item => item.done).map(item => item.id)
const doneList = ref<number[]>(initDoneList);
/**
 * @description 选中元素
 * @param id 元素id
 */
const DoneTodo = (id: number) => {
  const index = doneList.value.indexOf(id);
  if (index < 0) {
    doneList.value.push(id)
  } else {
    doneList.value.splice(index, 1)
  }
  if (callBack.handleDone) { callBack.handleDone(id, doneList.value) }
}
/**
 * @description 全选操作
 */
const checkAll = () => {
  if (doneList.value.length === filterTodoList.value.length) {
    doneList.value = []
  } else {
    doneList.value = todos.value.todoList.map(item => item.id)
  }
  if (callBack.handleCheckAll) { callBack.handleCheckAll(doneList.value) }
}

// 显示状态集合与默认状态
const filters = reactive<string[]>(["All", "Active", "Completed"]);
const filterTodos = ref<string>("All");

/**
 * @description 改变当前显示什么状态的元素
 * @param p 当前显示状态
 */
const FilterTodo = (p: string) => {
  filterTodos.value = p
  if (callBack.handleFilter) { callBack.handleFilter(p) }
};
/**
 * @description 根据当前状态过滤出指定元素
 * @param status 当前状态
 */
const filterSelf = (status?: string) => {
  let data: Todo[] = []
  switch (status) {
    case "Active":
      data = todos.value.todoList.filter(item => !doneList.value.includes(item.id))
      break;
    case "Completed":
      data = todos.value.todoList.filter(item => doneList.value.includes(item.id))
      break;
    default:
      data = todos.value.todoList
  }
  return data
}
// 页面渲染元素列表与选中个数
const filterTodoList = ref<Todo[]>([]);
const checkedCount = ref(0);
watchEffect(() => {
  filterTodoList.value = filterSelf(filterTodos.value)
  checkedCount.value = filterSelf("Completed").length
})
/**
 * @description 清除选中状态元素
 */
const cleanup = () => {
  callBack.handleClear(doneList.value)
}

</script>

<style scoped lang="less">
@import './todos.less';
</style>