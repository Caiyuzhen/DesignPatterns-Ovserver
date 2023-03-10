import { ITodo } from "./Type"

// ð²ð²ð² View å±
// æä½ DOM, æå»ºè§å¾ (å¦ææ¯ä¼ å¥ target çæä½å°±æ¯è¾ç®å, ç´æ¥æ¿ DOM çæä½å°±å¤æä¸äº)
class TodoDOM {

	private static instance: TodoDOM //åç¬çå®ä¾
	private OtodoList: HTMLElement 


	constructor(todoList: HTMLElement) {
		this.OtodoList = todoList
	}


	// ð¥ð¥ð¥åä¾æ¨¡å¼(åªè½æä¸ä¸ª todoList å®ä¾!)
	public static create(OtodoList: HTMLElement) {
		if(!TodoDOM.instance) { //åæ£æ¥ TodoDOM.instance æ¯å¦å·²ç»è¢«åå»º
			TodoDOM.instance = new TodoDOM(OtodoList) //æ²¡æçè¯å°±åå»ºä¸ä¸ª
		}
		return TodoDOM.instance
	}



	// æ°å¢ todo DOM, è°ç¨åä¼åå»ºä¸æ¡ todo-item, å¹¶åµå¥å°
	public addItem(todo: ITodo): Promise<void> {//æ¯ä¸ä¸ª Promise ç±»å, å ä¸ºåªæ¯æä½ DOM, æä»¥æ²¡æå·ä½çè¿åå¼ç±»å
		return new Promise((res, rej) => {
			const OItem: HTMLElement = document.createElement('div')
			OItem.className = 'todo-item' //ç» div æ·»å ä¸ä¸ªç±»å
			OItem.innerHTML = this.todoView(todo) //ãææ¨¡æ¿å­ç¬¦ä¸²çåå®¹åµå¥å° æ¯æ¡todo-item åï¼ç¸å½äºææ¨¡æ¿åæ¬è¿å»äºãåå»ºä¸ä¸ª div, æ todoList çæ¨¡æ¿æå¥å° div ä¸­
			this.OtodoList.appendChild(OItem) //æ div æ·»å å° OtodoList ä¸­å®ä¾ä¸­
			res()
		})
	}



	// å é¤ todo DOM (å¤æ­ä¼ å¥ç id æ¯å¦æ¯å½å item ä¸ button ç»å®çé£ä¸ª idï¼æ¯çè¯å°±çå¤æè¿æ¡ item)
	public removeItem(id: number): Promise<void> { //æ¯ä¸ä¸ª Promise ç±»å, å ä¸ºåªæ¯æä½ DOM, æä»¥æ²¡æå·ä½çè¿åå¼ç±»å
		console.log('å é¤ DOM ä¸­');
		return new Promise((res, rej) => { 
			const OItems: HTMLCollection = document.getElementsByClassName('todo-item')
			// console.log('å¼å§å é¤');
			Array.from(OItems).forEach(oItem => {
				const _id = parseInt(oItem.querySelector('button')!.dataset.id!)!
				// å¤è¯»å¯¹è±¡ä¸ä¸ºç©º
				// const _dom_id = oItem.querySelector('button')!.dataset.id as string//æ¾å° button èº«ä¸ç»å®ç id
				// const _id = parseInt(_dom_id)
				// console.log(_id, id);
			
				if(_id === id) {
					oItem.remove()//å é¤å½åæ¦è®°ç list item
					res() //â¡ï¸è°ç¨ res åè°å½æ°ï¼ç»æè¿æ´ä¸ªå½æ°
				}	
			})
		})
	}



	// ä¿®æ¹ todo DOM
	public toggleItem(id: number): Promise<void> { //æ¯ä¸ä¸ª Promise ç±»å, å ä¸ºåªæ¯æä½ DOM, æä»¥æ²¡æå·ä½çè¿åå¼ç±»å
		console.log('ä¿®æ¹ä¸­');
		return new Promise((res, rej) => {
			const OItems: HTMLCollection = document.getElementsByClassName('todo-item')

			// ððArray.from ä¸ºäºæ HTMLCollection è½¬æ¢ææ°ç», å ä¸º HTMLCollection æ²¡æ forEach æ¹æ³
			Array.from(OItems).forEach(oItem => { // ð¥å°ç±»æ°ç»è½¬åä¸ºæ°ç»!!å ä¸ºæ´»å¾çæ¯ä¸ä¸ª html éåï¼å¹¶ä¸æ¯ä¸ä¸ªæ°ç»(å¯¹è±¡æ¯ DOM æä½è¿åç NodeList éå)
				const oCheckbox: HTMLInputElement = oItem.querySelector('input')!
				const _id = parseInt(oCheckbox.dataset.id!)! //æ¾å° input ä¸ç»å®ç id
			
				if(_id === id) {//â¡ï¸â¡ï¸å¦æãç¹å»çè¿ä¸ª input èº«ä¸ç idã ç­äºãä¼ å¥å½æ°ç idã, é£ä¹åå¯ä»¥ä¿®æ¹å®
					const oConetnt: HTMLElement = oItem.querySelector('span')!
					oConetnt.style.textDecoration = oCheckbox.checked ? 'line-through' : 'none' //å¤æ­æ¯å¦å®æ, ç¶åæ ¹æ®å¯¹åºçç¶ææ¥ç»ä¸åç class
					res()
				}	
			})
		})
	}



	// ð¥æ¯æ¡ todoList çæ¸²ææ¨¡æ¿
	private todoView({id, content, completed}: ITodo): string {
		// text-decoration: å¤æ­æ¯å¦å®æ, ç¶åæ ¹æ®å¯¹åºçç¶ææ¥ç»ä¸åç class
		return `
			<input type="checkbox" ${ completed ? 'checked' : ''} data-id="${ id }"/>
			<span style="text-decoration: ${ completed ? 'line-through' : 'none' }"> ${ content } </span>
			<button data-id="${ id }">å é¤</button>
		`
	}
}


export default TodoDOM;



// ðç±»å®ä¹çå½¢å¼ ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// class TodoDOM {

// 	private static instance: TodoDOM //åç¬çå®ä¾
// 	private todoList: HTMLElement


// 	constructor(todoList: HTMLElement) {
// 		this.todoList = todoList
// 	}

// 	// ð¥ð¥ð¥åä¾æ¨¡å¼(åªè½æä¸ä¸ª todoList å®ä¾!)
// 	public static create(todolist: HTMLElement) {
// 		if(!TodoDOM.instance) { //åæ£æ¥ TodoDOM.instance æ¯å¦å·²ç»è¢«åå»º
// 			TodoDOM.instance = new TodoDOM(todolist) //æ²¡æçè¯å°±åå»ºä¸ä¸ª
// 		}
// 		return TodoDOM.instance
// 	}


// 	// æ°å¢ todo DOM
// 	public addItem(todo: ITodo): Promise<void> {//æ¯ä¸ä¸ª Promise ç±»å, å ä¸ºåªæ¯æä½ DOM, æä»¥æ²¡æå·ä½çè¿åå¼ç±»å
// 		return new Promise((res, rej) => {

// 		})
// 	}


// 	// å é¤ todo DOM
// 	public removeItem(id: number): Promise<void> { //æ¯ä¸ä¸ª Promise ç±»å, å ä¸ºåªæ¯æä½ DOM, æä»¥æ²¡æå·ä½çè¿åå¼ç±»å
// 		return new Promise((res, rej) => { 
			
// 		})
// 	}


// 	// ä¿®æ¹ todo DOM
// 	public toggleItem(id: number): Promise<void> { //æ¯ä¸ä¸ª Promise ç±»å, å ä¸ºåªæ¯æä½ DOM, æä»¥æ²¡æå·ä½çè¿åå¼ç±»å
// 		return new Promise((res, rej) => {
			
// 		})
// 	}
// }

// export default TodoDOM;




// ðå½æ°å¼çæ¹å ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// import { ITodo } from "./Type"

// const createTodoDOM = (todoList: HTMLElement) => {
// 	// ð¥æ¯æ¡ todoList çæ¸²ææ¨¡æ¿
// 	const todoView = ({id, content, completed}: ITodo) => {
// 		// text-decoration: å¤æ­æ¯å¦å®æ, ç¶åæ ¹æ®å¯¹åºçç¶ææ¥ç»ä¸åç class
// 		return `
// 			<input type="checkbox" ${ completed ? 'checked' : ''} data-id="${ id }"/>
// 			<span style="text-decoration: ${ completed ? 'line-through' : 'none' }"> ${ content } </span>
// 			<button>å é¤</button>
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

