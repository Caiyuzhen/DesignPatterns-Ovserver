import { ITodo } from './Type'


// 👋👋👋👋👋只操作数据, 不操作 DOM！# 🌟利用 Promise 回掉来进行隔离, 避免直接操作到 DOM 
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
		return new Promise((res, rej) => { // resolve 成功, reject 失败, 用来处理 Promise 异步操作的回调！
			// 看一下原有的 todo 是否存在? 避免重复创建
			const _todo: ITodo = this.todoData.find(t => t.content === todo.content) as ITodo

			// 如果存在, 就不创建了
			if(_todo) {
				rej('Todo 已经存在')
				return rej(1001) //错误码
			}

			// 修改数据
			this.todoData.push(todo)

			// 返回回调
			res(todo)
		}) 
	}


	// 删除方法
	public removeTodo (id: number) {
		return new Promise((res, rej) => {
			//过滤掉一些数据, 要返回的是不等于当前被拿到 id 的数据
			this.todoData = this.todoData.filter(t => t.id !== id) 

			// 返回回调的值
			res(id)
		})
	}


	// 切换 TODO 状态 (完成/未完成)
	public toggleTodo (id: number) {
		return new Promise((res, rej) => {

			// 切换状态, 如果这个列表 id 是等于当前点击的 id, 就切换一个状态(取反)
			this.todoData = this.todoData.map(t => {
				if(t.id === id) {
					t.completed = !t.completed
					res(id)
				}

				// 返回回调的数据
				return t 
			})
		})
	}
}



export default TodoEvent