let nextId = 0;
let store = {
	todos: [{ id: nextId++, text: 'Todo #1' }],
	count: 0,
};
let listeners = [];

export const todosStore = {
	addTodo() {
		store.todos = [...store.todos, { id: nextId++, text: 'Todo #' + nextId }];
		emitChange();
	},
	incremente() {
		store.count = store.count + 1;
		emitChange();
	},
	subscribe(listener) {
		listeners = [...listeners, listener];
		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	},
	getSnapshot() {
		return store;
	},
};

function emitChange() {
	for (let listener of listeners) {
		listener();
	}
}
