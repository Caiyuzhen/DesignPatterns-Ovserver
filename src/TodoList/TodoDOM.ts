import { ITodo } from "./Type"

// 🌲🌲🌲 View 层
// 操作 DOM
class TodoDOM {

	private static instance: TodoDOM //单独的实例
	private OtodoList: HTMLElement 


	constructor(todoList: HTMLElement) {
		this.OtodoList = todoList
	}


	// 🔥🔥🔥单例模式(只能有一个 todoList 实例!)
	public static create(OtodoList: HTMLElement) {
		if(!TodoDOM.instance) { //先检查 TodoDOM.instance 是否已经被创建
			TodoDOM.instance = new TodoDOM(OtodoList) //没有的话就创建一个
		}
		return TodoDOM.instance
	}



	// 新增 todo DOM
	public addItem(todo: ITodo): Promise<void> {//是一个 Promise 类型, 因为只是操作 DOM, 所以没有具体的返回值类型
		return new Promise((res, rej) => {
			const OItem: HTMLElement = document.createElement('div')
			OItem.innerHTML = this.todoView(todo) //创建一个 div, 把 todoList 的模板插入到 div 中
			OItem.className = 'todo-item' //给 div 添加一个类名
			this.OtodoList.appendChild(OItem) //把 div 添加到 OtodoList 中实例中
		})
	}



	// 删除 todo DOM
	public removeItem(id: number): Promise<void> { //是一个 Promise 类型, 因为只是操作 DOM, 所以没有具体的返回值类型
		return new Promise((res, rej) => { 
			const OItems: HTMLCollection = document.getElementsByClassName('todo-item')

			Array.from(OItems).forEach(oItem => {
				const _id = parseInt(oItem.querySelector('button').dataset.id) //找到 button 身上绑定的 id
			
				if(_id === id) {
					oItem.remove()//删除当前惦记的 list item
					resolve()
				}	
			})
		})
	}



	// 修改 todo DOM
	public toggleItem(id: number): Promise<void> { //是一个 Promise 类型, 因为只是操作 DOM, 所以没有具体的返回值类型
		return new Promise((res, rej) => {
			const OItems: HTMLCollection = document.getElementsByClassName('todo-item')

			Array.from(OItems).forEach(oItem => {
				const oCheckbox: HTMLInputElement = oItem.querySelector('input')
				const _id = parseInt(oCheckbox.dataset.id) //找到 input 上绑定的 id
			
				if(_id === id) {
					const oConetnt: HTMLElement = oItem.querySelector('span')
					oConetnt.style.textDecoration = oCheckbox.checked ? 'line-through' : 'none' //判断是否完成, 然后根据对应的状态来给不同的 class
					resolve()
				}	
			})
		})
	}



	// 🔥每条 todoList 的渲染模板
	private todoView({id, content, completed}: ITodo): string {
		// text-decoration: 判断是否完成, 然后根据对应的状态来给不同的 class
		return `
			<input type="checkbox" ${ completed ? 'checked' : ''} data-id="${ id }"/>
			<span style="text-decoration: ${ completed ? 'line-through' : 'none' }"> ${ content } </span>
			<button>删除</button>
		`
	}
}

export default TodoDOM;



// 🌟类定义的形式 ——————————————————————————————————————————————————————————————————————————————————————
// class TodoDOM {

// 	private static instance: TodoDOM //单独的实例
// 	private todoList: HTMLElement


// 	constructor(todoList: HTMLElement) {
// 		this.todoList = todoList
// 	}

// 	// 🔥🔥🔥单例模式(只能有一个 todoList 实例!)
// 	public static create(todolist: HTMLElement) {
// 		if(!TodoDOM.instance) { //先检查 TodoDOM.instance 是否已经被创建
// 			TodoDOM.instance = new TodoDOM(todolist) //没有的话就创建一个
// 		}
// 		return TodoDOM.instance
// 	}


// 	// 新增 todo DOM
// 	public addItem(todo: ITodo): Promise<void> {//是一个 Promise 类型, 因为只是操作 DOM, 所以没有具体的返回值类型
// 		return new Promise((res, rej) => {

// 		})
// 	}


// 	// 删除 todo DOM
// 	public removeItem(id: number): Promise<void> { //是一个 Promise 类型, 因为只是操作 DOM, 所以没有具体的返回值类型
// 		return new Promise((res, rej) => { 
			
// 		})
// 	}


// 	// 修改 todo DOM
// 	public toggleItem(id: number): Promise<void> { //是一个 Promise 类型, 因为只是操作 DOM, 所以没有具体的返回值类型
// 		return new Promise((res, rej) => {
			
// 		})
// 	}
// }

// export default TodoDOM;




// 🌟函数式的改写 ——————————————————————————————————————————————————————————————————————————————————————
// import { ITodo } from "./Type"

// const createTodoDOM = (todoList: HTMLElement) => {
// 	// 🔥每条 todoList 的渲染模板
// 	const todoView = ({id, content, completed}: ITodo) => {
// 		// text-decoration: 判断是否完成, 然后根据对应的状态来给不同的 class
// 		return `
// 			<input type="checkbox" ${ completed ? 'checked' : ''} data-id="${ id }"/>
// 			<span style="text-decoration: ${ completed ? 'line-through' : 'none' }"> ${ content } </span>
// 			<button>删除</button>
// 		`
// 	}

//     return {
//         addItem: (todo: ITodo): Promise<void> => {
//             return new Promise((resolve, reject) => {
//                 // add item DOM logic here
//                 resolve()
//             })
//         },
//         removeItem: (id: number): Promise<void> => {
//             return new Promise((resolve, reject) => {
//                 // remove item DOM logic here
//                 resolve()
//             })
//         },
//         toggleItem: (id: number): Promise<void> => {
//             return new Promise((resolve, reject) => {
//                 // toggle item DOM logic here
//                 resolve()
//             })
//         }
//     }
// }

// export default createTodoDOM;

