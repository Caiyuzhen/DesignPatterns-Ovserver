import { ITodo } from "./Type"

// 🌲🌲🌲 View 层
// 操作 DOM, 构建视图 (如果是传入 target 的操作就比较简单, 直接拿 DOM 的操作就复杂一些)
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



	// 新增 todo DOM, 调用后会创建一条 todo-item, 并嵌入到
	public addItem(todo: ITodo): Promise<void> {//是一个 Promise 类型, 因为只是操作 DOM, 所以没有具体的返回值类型
		return new Promise((res, rej) => {
			const OItem: HTMLElement = document.createElement('div')
			OItem.className = 'todo-item' //给 div 添加一个类名
			OItem.innerHTML = this.todoView(todo) //【把模板字符串的内容嵌入到 每条todo-item 内，相当于把模板包括进去了】创建一个 div, 把 todoList 的模板插入到 div 中
			this.OtodoList.appendChild(OItem) //把 div 添加到 OtodoList 中实例中
			res()
		})
	}



	// 删除 todo DOM (判断传入的 id 是否是当前 item 上 button 绑定的那个 id，是的话就益处掉这条 item)
	public removeItem(id: number): Promise<void> { //是一个 Promise 类型, 因为只是操作 DOM, 所以没有具体的返回值类型
		console.log('删除中');
		return new Promise((res, rej) => { 
			const OItems: HTMLCollection = document.getElementsByClassName('todo-item')
			// console.log('开始删除');
			Array.from(OItems).forEach(oItem => {
				// 判读对象不为空
				const _dom_id = oItem.querySelector('button')!.dataset.id as string//找到 button 身上绑定的 id
				const _id = parseInt(_dom_id)
				console.log(_id, id);
			
				if(_id === id) {
					oItem.remove()//删除当前惦记的 list item
					res() //⚡️调用 res 回调函数，结束这整个函数
				}	
			})
		})
	}



	// 修改 todo DOM
	public toggleItem(id: number): Promise<void> { //是一个 Promise 类型, 因为只是操作 DOM, 所以没有具体的返回值类型
		console.log('修改中');
		return new Promise((res, rej) => {
			const OItems: HTMLCollection = document.getElementsByClassName('todo-item')

			// 🌟🌟Array.from 为了把 HTMLCollection 转换成数组, 因为 HTMLCollection 没有 forEach 方法
			Array.from(OItems).forEach(oItem => { // 🔥将类数组转化为数组!!因为活得的是一个 html 集合，并不是一个数组(对象是 DOM 操作返回的 NodeList 集合)
				const oCheckbox: HTMLInputElement = oItem.querySelector('input')!
				const _id = parseInt(oCheckbox.dataset.id!)! //找到 input 上绑定的 id
			
				if(_id === id) {//⚡️⚡️如果【点击的这个 input 身上的 id】 等于【传入函数的 id】, 那么则可以修改它
					const oConetnt: HTMLElement = oItem.querySelector('span')!
					oConetnt.style.textDecoration = oCheckbox.checked ? 'line-through' : 'none' //判断是否完成, 然后根据对应的状态来给不同的 class
					res()
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

