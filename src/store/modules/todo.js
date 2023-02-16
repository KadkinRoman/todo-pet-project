import { CREATE_TODO, UPDATE_TODO, REMOVE_TODO, FETCH_TODOS } from './todoMutation'

export default {
    namespaced: true,
    actions: {
        fetchTodos({ commit }) {
            commit(FETCH_TODOS);
        },
        createTodo({ commit }, todo) {
            commit(CREATE_TODO, {
                todo: todo
            });
        },
        updateTodo({ commit }, todo) {
            commit(UPDATE_TODO, {
                todo: todo
            });
        },
        removeTodo({ commit }, id) {
            commit(REMOVE_TODO, {
                id: id
            });
        }
    },
    mutations: {
        [CREATE_TODO](state, payload) {
            state.todos.push(payload.todo);
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        [UPDATE_TODO](state, payload) {
            let todo = state.todos.filter(todo =>
                todo.id === payload.todo.id);
            todo = payload.todo;
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        [REMOVE_TODO](state, payload) {
            state.todos = state.todos.filter(todo => todo.id !== payload.id);
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        [FETCH_TODOS](state) {
            state.todos = JSON.parse(localStorage.getItem("todos")) || [];
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