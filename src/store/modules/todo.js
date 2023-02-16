import { CREATE_TODO, UPDATE_TODO, REMOVE_TODO, FETCH_TODOS } from './todoMutation'

export default {
    namespaced: true,
    actions: {
        fetchTodos({ commit }) {
            const todos = JSON.parse(localStorage.getItem("todos")) || [];
            commit(FETCH_TODOS, {
                todos: todos
            });
        },
        createTodo({ commit, state }, todo) {
            commit(CREATE_TODO, {
                todo: todo
            });
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        updateTodo({ commit, state }, todo) {
            commit(UPDATE_TODO, {
                todo: todo
            });
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        removeTodo({ commit, state }, id) {
            commit(REMOVE_TODO, {
                id: id
            });
            localStorage.setItem('todos', JSON.stringify(state.todos));
        }
    },
    mutations: {
        [CREATE_TODO](state, payload) {
            state.todos.push(payload.todo);
            
        },
        [UPDATE_TODO](state, payload) {
            let todo = state.todos.filter(todo =>
                todo.id === payload.todo.id);
            todo = payload.todo;
        },
        [REMOVE_TODO](state, payload) {
            state.todos = state.todos.filter(todo => todo.id !== payload.id);
        },
        [FETCH_TODOS](state, payload) {
            state.todos = payload.todos;
        },
    },
    state: {
        todos: []
    },
    getters: {
        getTodos(state) {
            return state.todos;
        },
        doneTodos(state) {
            return state.todos.filter(todo => todo.completed)
        },
        notDoneTodos(state) {
            return state.todos.filter(todo => !todo.completed)
        },
        doneTodosCount(state, getters) {
            return getters.doneTodos.length
        },
        notDoneTodosCount(state, getters) {
            return getters.notDoneTodos.length
        }
    }
}