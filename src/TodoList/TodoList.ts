import TodoEvent from './TodoEvent'
import TodoDom from './TodoDom'


// 🔥🔥枚举三种事件类型！一个变量对应有限的几个值时可以用枚举类型！
enum EVENT_TYPE {
	ADD = 'add',
	REMOVE = 'remove',
	TOGGLE = 'toggle'
}


// 👀⚡️观察者主体 （用来糅合一堆函数, 分别定义几种情况下的触发函数, 先构建数据再触发 DOM 的构建）
class TodoList {

	private static instance: TodoList
	private todoEvent: TodoEvent
	private todoDom: TodoDom
	private oTodoList: HTMLElement //传入真实的 DOM
	private addHandlers: any[] = [] //🔥🔥用来把 Event 跟 DOM 内的方法进行糅合！
	private removeHandlers: any[] = [] //🔥用来把 Event 跟 DOM 内的方法进行糅合！
	private toggleHandlers: any[] = [] //🔥用来把 Event 跟 DOM 内的方法进行糅合！
	

	constructor(oTodoList: HTMLElement) {
		this.oTodoList = oTodoList //传入真实的 DOM
		this.initTodo() //🔥执行初始化的函数
	}

	// 单实例模式
	public static create(otodoList: HTMLElement) {
		if(!TodoList.instance) {
			TodoList.instance = new TodoList(otodoList);
		}
		return TodoList.instance;
	}


	// 🔥🔥初始化时, 去实例化 Event 跟 DOM
	private initTodo () {
		this.todoEvent = TodoEvent.create();
		this.todoDom = TodoDom.create(this.oTodoList) //🔥传入参数！

		// 初始化三个 handlers 
		for (let k in EVENT_TYPE) {
			this.initHandlers(EVENT_TYPE[k]) //🔥ADD、REMOVE、TOGGLE
		}

		// 看下几个方法创建没
		console.log(this.addHandlers)
		console.log(this.addHandlers)
		console.log(this.removeHandlers)
	}

	// 🔥🔥把 Event 跟 DOM 内的方法进行糅合！统一放入上面的 addHandlers、removeHandlers、toggleHandlers 三个容器内！
	private initHandlers (type: EVENT_TYPE) {
		switch (type) {
			case EVENT_TYPE.ADD:
				this.addHandlers.push(this.todoEvent.addTodo.bind(this.todoEvent))//🔥一开始是指向 TodoList 实例, 所以要修改一下 this 指向！
				this.addHandlers.push(this.todoDom.addItem.bind(this.todoDom))//🔥一开始是指向 TodoList 实例, 所以要修改一下 this 指向！
				break;
			case EVENT_TYPE.REMOVE:
				this.removeHandlers.push(this.todoEvent.removeTodo.bind(this.todoEvent))
				this.removeHandlers.push(this.todoDom.removeItem.bind(this.todoDom))
				break;
			case EVENT_TYPE.TOGGLE:
				this.toggleHandlers.push(this.todoEvent.toggleTodo.bind(this.todoEvent))
				this.toggleHandlers.push(this.todoDom.toggleItem.bind(this.todoDom))
				break;
			default:
				break
		}
	}

	/* 🔥🔥用来触发上边糅合后的事件!!在 app.ts 里边来添加事件监听器, 然后调用 notify 这个方法！
	   分别去执行 addHandlers 、removeHandlers 、toggleHandlers 数组容器内的方法 
	   👉 <T> 🔥范型表示在调用的时候再去传入它的类型!! 比如在 app.ts 内调用 notify 然后再去传入类型, 此时 <T> 就是 <ITodo> 类型！！
	   */
	public notify<T> (type: string, param: T) {//type: string 为枚举值: add、remove、toggle, 还要传入参数 params, 根据参数类型来判断范型的类型
		// 因为
		let i: number = 0
		let handlers: any[] = []//🔥把 Event 跟 DOM 内的方法柔和后的数组, 因为数组里边有不同的类型, 所有用 any
		let res: any //因为下面柔和后数组内的方法都是 Promise 类型, 所以定义个 any , 用来接收 Promise 的返回值, 然后再吊用 then 方法！

		switch (type) {
			case EVENT_TYPE.ADD:
				handlers = this.addHandlers
				break
			case EVENT_TYPE.REMOVE:
				handlers = this.removeHandlers
				break
			case EVENT_TYPE.TOGGLE:
				handlers = this.toggleHandlers
				break
			default:
				break
		}
		

		//🔥拿到（糅合后数组内的）返回值, 相当于先执行 handlers[0], 传入 param 参数, 让变量变成一个 Promise 对象!
		res = handlers[i](param) //res 是一个 Promise 对象！

		while (i < handlers.length - 1) {//数组有多少个方法, 就遍历几次 i
			i ++ //看糅合内的数组有几个方法, 就执行几次
			res = res.then((param) => { //res 赋值给 Promise 对象的返回值
				return handlers[i](param) //🔥返回糅合后数组内的第 i 项, 也是个 Promise 对象, 然后传入 param 参数继续执行
			});
		}
	}
}


export default TodoList