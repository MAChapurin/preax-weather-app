import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

export default function TodosApp() {
	const state = useSyncExternalStore(
		todosStore.subscribe,
		todosStore.getSnapshot
	);
	console.log(state);
	return (
		<>
			<button onClick={() => todosStore.addTodo()}>Add todo</button>
			<div>Count {state.count}</div>
			<button onClick={() => todosStore.incremente()}>Add one</button>
			<hr />
			<ul>
				{state.todos.map((todo) => (
					<li key={todo.id}>{todo.text}</li>
				))}
			</ul>
		</>
	);
}
