export interface Todo { id: number, value: string, done: boolean };
type HandleParamTodo = (todo: Todo) => void
export interface Todos {
  todoList: Todo[],
  callBack: {
    handleAdd: HandleParamTodo,
    handleRemove: HandleParamTodo,
    handleUpdate: (id: number,newVal: string) => void,
    handleClear: (idList: number[]) => void,
    handleDone?: (id: number, idList: number[]) => void,
    handleCheckAll?: (idList: number[]) => void,
    handleFilter?: (p: string) => void,
  }
}
