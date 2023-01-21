import TodoEvent from './TodoEvent'
import TodoDom from './TodoDom'


// 🔥🔥枚举三种事件类型！一个变量对应有限的几个值时可以用枚举类型！
enum EVENT_TYPE {
	ADD = 'add',
	REMOVE = 'remove',
	TOGGLE = 'toggle'
}




// 👀⚡️观察者主体 （用来触发一堆函数, 集中通知 Events、 DOM 等函数）
class TodoList {

	private static instance: TodoList
	private todoEvent: TodoEvent
	private todoDom: TodoDom
	private oTodoList: HTMLElement
	private addHandlers: any[] = [] //🔥🔥用来把 Event 跟 DOM 内的方法进行糅合！
	private removeHandlers: any[] = [] //🔥用来装不同的事件类型
	private toggleHandlers: any[] = [] //🔥用来装不同的事件类型
	

	constructor(oTodoList: HTMLElement) {
		this.oTodoList = oTodoList
		this.initTodo() //🔥执行初始化的函数
	}

	// 单实例
	public static create(otodoList: HTMLElement) {
		if(!TodoList.instance) {
			TodoList.instance = new TodoList(otodoList);
		}
		return TodoList.instance;
	}


	// 实例化 Event 跟 DOM
	private initTodo () {
		this.todoEvent = TodoEvent.create();
		this.todoDom = TodoDom.create(this.oTodoList) //🔥传入参数！
	}

	// 🔥🔥把 Event 跟 DOM 内的方法进行糅合！统一放入上面的 addHandlers、removeHandlers、toggleHandlers 三个容器内！
	private initHandlers (type: EVENT_TYPE) {
		switch (type) {
			case EVENT_TYPE.ADD:
				this.addHandlers.push(this.todoEvent.addTodo.bind(this.todoEvent))//🔥一开始是指向实例, 所以要修改一下 this 指向！
				this.addHandlers.push(this.todoDom.addItem.bind(this.todoEvent))//🔥一开始是指向实例, 所以要修改一下 this 指向！
		}
	}
}