# 分离 DOM 操作跟 数据操作
- 数据操作: Event 的绑定 -> 处理数据
- DOM 操作: Event 的触发

# 观察者模式可满足上述诉求
- 比如添加 todo
  - addTodo 操作数据
  - addItem 更新视图

# 流程
- addTodo -> return todo -> addItem -> 渲染 DOM

# 🌟利用 Promise 回掉, 避免直接操作到 DOM 的例子
function TodoList() {
	Promise 
		-> addTodo(todo) 
			-> reslove(todo) 
				-> then todo 
					-> addItem(todo)

	addItem(todo) {
		// 渲染 DOM
	}
}

# 🌟直接操作到 DOM 的例子 （不推荐）
function TodoList() {
	addItem(todo) {
		// 渲染 DOM
	}
}

# 要执行的方法 
- add:   addTodo 、 addItem
- remove: removeTodo 、 removeItem
- toggle: toggleTodo 、 toggleItem


# 实现逻辑, 利用 Promise 的 then 来实现调用, 每次都是在依次的去执行数组中的方法
[addTodo, addItem, setLocalStorage, ...]
[removeTodo, removeItem, ...]
[toggleTodo, toggleItem, ...]