import TodoList from './TodoList/TodoList'
import { ITodo } from './TodoList/Type'

// 立即执行函数
((doc) => {

	// 获取 DOM 元素, querySelector('input') 是传入元素类型!! .todo-list 是传入 class!!
	const oAddBtn: HTMLElement = doc.querySelector('.add-btn') as HTMLElement
	const oInput: HTMLInputElement = doc.querySelector('input') as HTMLInputElement //HTMLInputElement 才能拿到 value, HTMLElement 则拿不到 Value
	const oTodoList: HTMLElement = doc.querySelector('.todo-list') as HTMLElement

	const todoList: TodoList = TodoList.create(oTodoList)//接收 TodoList 的实例

	// 实例化
	TodoList.create(oTodoList)
	// console.log(oTodoList, oAddBtn, oInput);


	//🔥初始化执行函数
	const init = (): void => {
		bindEvent()
	}

		

	// 🔥🔥添加事件监听器
	function bindEvent () {
		oAddBtn.addEventListener('click', handleAddBtnClick, false)
		oTodoList.addEventListener('click', handleTodoListClick, false)
	}


 
	// 🔥传入参数, 最终添加 todo item 的方法
	function handleAddBtnClick () {
		// console.log('1-开始添加 todo-item');
		const val: string = oInput.value
		if (!val.length)  {//表示输入框没有内容, 则为 false
			return
		}

		todoList.notify<ITodo>('add', {//传入 Type （ 范型类型 ）跟 param（ 参数 ）
			id: new Date().getTime(),
			content: val,
			completed: false
		})
		// console.log(val);

		// 清空输入框！
		oInput.value = ''
		// console.log('2-添加 todo-item 完成');

	}


	// 🔥列表上的事件代理, 用来判断点击的是 checkbox 还是 删除 button
	function handleTodoListClick (e: MouseEvent) {
		const tar = e.target as HTMLElement;
		const tagName = tar.tagName.toLowerCase() //🔥🔥tagName 判断点击的元素的属性

		if(tagName === 'input' || tagName === 'button') {
			const id: number = parseInt((tar.dataset.id) as string)
			// console.log(id);

			switch (tagName) {
				case 'input':
					todoList.notify<number>('toggle', id)
					break
				case 'button':
					todoList.notify<number>('remove', id)
					console.log(id, '删除这项')  //传入的 id 不对, 有 bug 
					break
				default:
					break
			}
		}
	}

	init()


})(document) 