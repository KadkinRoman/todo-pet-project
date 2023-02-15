export default {
    actions: {
        fetchTodos({ commit }, limit = 3) {
            const url = 'https://jsonplaceholder.typicode.com/todos?_limit=' + limit;
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json; charset=UTF-8");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    commit('updateTodos', {
                        todos: result
                    })
                })
                .catch(error => console.log('error', error));
        },

        createTodo({ commit }, { title, body, userId }) {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify({
                        title,
                        body,
                        userId,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then(result => {
                    //Меняю id, потому что использую fake api,
                    //который постоянно возвращает id: 101
                    result.id = Date.now();
                    commit('addTodo', {
                        todo: result
                    })
                })
                .catch(error => console.log('error', error));
        },

        updateTodo({ commit }, todo) {
            fetch('https://jsonplaceholder.typicode.com/posts/' + todo.id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        completed: 'true',
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((result) => commit('updateTodo', {
                    todo: result
                }));

        },
    },
    mutations: {
        updateTodos(state, payload) {
            state.todos = payload.todos;
        },
        addTodo(state, payload) {
            state.todos.push(payload.todo);
        },
        updateTodo(state, payload) {
            const todo = state.todos.find((todo) => todo.id === payload.todo.id)
            todo.completed = 'true'
        }
    },
    state: {
        todos: []
    },
    getters: {
        getAllTodo(state) {
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