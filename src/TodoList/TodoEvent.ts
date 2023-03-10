import { ITodo } from './Type'


// ððððð Module å±
// åªæä½æ°æ®, ä¸æä½ DOMï¼# ðå©ç¨ Promise åææ¥è¿è¡éç¦», é¿åç´æ¥æä½å° DOM 
class TodoEvent {
	private static instance: TodoEvent
	private todoData: ITodo[] = [] // é»è®¤æ¯ä¸ä¸ªç©ºæ°ç», ç¨æ¥ä¿å­ Todo çæ°æ®

	// åä¾æ¨¡å¼, è¡¨ç¤ºåªè½æä¸ä¸ª TodoEvent å®ä¾
	public static create () {
		if(!TodoEvent.instance)	{
			TodoEvent.instance = new TodoEvent()
		}
		return TodoEvent.instance
	}


	// æ·»å  item æ°æ®
	public addTodo (todo: ITodo): Promise<ITodo> {//â¡ï¸ç resolve åºæ¥ä»ä¹, å°±æ¯ä»ä¹ç±»å
		return new Promise((res, rej) => { // resolve æå, reject å¤±è´¥, ç¨æ¥å¤ç Promise å¼æ­¥æä½çåè°ï¼
			// çä¸ä¸åæç todo æ¯å¦å­å¨? é¿åéå¤åå»º
			const _todo: ITodo = this.todoData.find(t => t.content === todo.content) as ITodo

			// å¦æå­å¨, å°±ä¸åå»ºäº
			if(_todo) {
				rej('Todo å·²ç»å­å¨')
				return rej(1001) //éè¯¯ç 
			}
			// ä¿®æ¹æ°æ®
			this.todoData.push(todo)

			//ðµæå°ä¸ä¸ todoDat ï¼ææ todo åè¡¨çæ°æ®ï¼
			// console.log(this.todoData)

			// è¿ååè°
			res(todo)
		}) 
	}


	// å é¤æ°æ®
	public removeTodo (id: number): Promise<number> {
		console.log(this.todoData);
		console.log('å é¤ Data ä¸­');
		return new Promise((res, rej) => {
			//è¿æ»¤æä¸äºæ°æ®, è¦è¿åçæ¯ä¸ç­äºå½åè¢«æ¿å° id çæ°æ®
			this.todoData = this.todoData.filter(t => t.id !== id) 
			//ðµæå°ä¸ä¸ todoDat ï¼ææ todo åè¡¨çæ°æ®ï¼
			console.log(this.todoData)
			// è¿ååè°çå¼
			res(id)
		})
	}


	// åæ¢æ°æ® (å®æ/æªå®æ)
	public toggleTodo (id: number): Promise<number> {
		return new Promise((res, rej) => {

			// åæ¢ç¶æ, å¦æè¿ä¸ªåè¡¨ id æ¯ç­äºå½åç¹å»ç id, å°±åæ¢ä¸ä¸ªç¶æ(åå)
			this.todoData = this.todoData.map(t => {
				if(t.id === id) {
					t.completed = !t.completed
					res(id)
				}
				//ðµæå°ä¸ä¸ todoDat ï¼ææ todo åè¡¨çæ°æ®ï¼
				console.log(this.todoData)
				// è¿ååè°çæ°æ®
				return t 
			})
		})
	}
}


export default TodoEvent



// ðç±»å®ä¹çå½¢å¼ ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// class TodoEvent {
// 	private static instance: TodoEvent
// 	private todoData: ITodo[] = [] // é»è®¤æ¯ä¸ä¸ªç©ºæ°ç», ç¨æ¥ä¿å­ Todo çæ°æ®

// 	// åä¾æ¨¡å¼, è¡¨ç¤ºåªè½æä¸ä¸ª TodoEvent å®ä¾
// 	public static create () {
// 		if(!TodoEvent.instance)	{
// 			TodoEvent.instance = new TodoEvent()
// 		}

// 		return TodoEvent.instance
// 	}


// 	// æ·»å æ°æ®
// 	public addTodo (todo: ITodo): Promise<ITodo> {//â¡ï¸ç resolve åºæ¥ä»ä¹, å°±æ¯ä»ä¹ç±»å
// 		return new Promise((res, rej) => { // resolve æå, reject å¤±è´¥, ç¨æ¥å¤ç Promise å¼æ­¥æä½çåè°ï¼
// 			// çä¸ä¸åæç todo æ¯å¦å­å¨? é¿åéå¤åå»º
// 			const _todo: ITodo = this.todoData.find(t => t.content === todo.content) as ITodo

// 			// å¦æå­å¨, å°±ä¸åå»ºäº
// 			if(_todo) {
// 				rej('Todo å·²ç»å­å¨')
// 				return rej(1001) //éè¯¯ç 
// 			}

// 			// ä¿®æ¹æ°æ®
// 			this.todoData.push(todo)

// 			// è¿ååè°
// 			res(todo)
// 		}) 
// 	}


// 	// å é¤æ°æ®
// 	public removeTodo (id: number): Promise<number> {
// 		return new Promise((res, rej) => {
// 			//è¿æ»¤æä¸äºæ°æ®, è¦è¿åçæ¯ä¸ç­äºå½åè¢«æ¿å° id çæ°æ®
// 			this.todoData = this.todoData.filter(t => t.id !== id) 

// 			// è¿ååè°çå¼
// 			res(id)
// 		})
// 	}


// 	// åæ¢æ°æ® (å®æ/æªå®æ)
// 	public toggleTodo (id: number): Promise<number> {
// 		return new Promise((res, rej) => {

// 			// åæ¢ç¶æ, å¦æè¿ä¸ªåè¡¨ id æ¯ç­äºå½åç¹å»ç id, å°±åæ¢ä¸ä¸ªç¶æ(åå)
// 			this.todoData = this.todoData.map(t => {
// 				if(t.id === id) {
// 					t.completed = !t.completed
// 					res(id)
// 				}

// 				// è¿ååè°çæ°æ®
// 				return t 
// 			})
// 		})
// 	}
// }


// export default TodoEvent




// ðå½æ°å¼çæ¹å ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// import { ITodo } from './Type

// const createTodoEvent = () => {
//     let todoData: ITodo[] = []
//     return {
//         addTodo: (todo: ITodo): Promise<ITodo> => {
//             return new Promise((resolve, reject) => {
//                 const _todo: ITodo = todoData.find(t => t.content === todo.content) as ITodo
//                 if (_todo) {
//                     reject('Todo å·²ç»å­å¨')
//                     return reject(1001) //éè¯¯ç 
//                 }
//                 todoData = [...todoData, todo]
//                 resolve(todo)
//             })
//         },
//         removeTodo: (id: number): Promise<number> => {
//             return new Promise((resolve) => {
//                 todoData = todoData.filter(t => t.id !== id)
//                 resolve(id)
//             })
//         },
//         toggleTodo: (id: number): Promise<number> => {
//             return new Promise((resolve) => {
//                 todoData = todoData.map(t => {
//                     if (t.id === id) {
//                         t.completed = !t.completed
//                         resolve(id)
//                     }
//                     return t
//                 })
//             })
//         }
//     }
// }

// export default createTodoEvent();