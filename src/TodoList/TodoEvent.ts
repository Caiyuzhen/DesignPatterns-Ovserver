import { ITodo } from './Type'

// 👋👋只操作数据, 不操作 DOM！
class TodoEvent {
	private static instance: TodoEvent
	private todoData: ITodo[] = [] // 默认是一个空数组, 用来保存 Todo 的数据

	// 单例模式, 表示只能有一个 TodoEvent 实例
	public static create () {
		if(!TodoEvent.instance)	{
			TodoEvent.instance = new TodoEvent()
		}

		return TodoEvent.instance
	}


	// 添加方法
	public addTodo (todo: ITodo) {
		return new Promise((res, rej) => {
			// 看一下原有的 todo 是否存在? 不要重复创建
			const _todo: ITodo = this.todoData.find(t => t.content === todo.content) as ITodo
		}) 
	}


	// 删除方法
	public removeTodo (id: ITodo) {

	}


	// 切换 TODO 状态
	public toggleTodo (id: ITodo) {

	}

}



export default TodoEvent