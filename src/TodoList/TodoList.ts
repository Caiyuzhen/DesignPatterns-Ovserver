

// 👀观察者主体 （用来触发一堆函数
class TodoList {

	private static instance: TodoList

	private oTodoList: HTMLElement
	

	constructor(oTodoList: HTMLElement) {
		this.oTodoList = oTodoList
	}

	public static create(todoList: HTMLElement) {
		if(!TodoList.instance) {
			TodoList.instance = new TodoList(todoList);
		}

		return TodoList.instance;
	}
}