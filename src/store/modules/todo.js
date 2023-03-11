import {
  CREATE_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  FETCH_TODOS,
  CREATE_CHILD_TODO,
  REMOVE_CHILD_TODO,
  UPDATE_CHILD_TODO,
} from "./todoMutation";
import Vue from "vue";

export default {
  namespaced: true,
  actions: {
    saveTodoToLocalStorage({ state }) {
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    fetchTodos({ commit }) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      commit(FETCH_TODOS, {
        todos: todos,
      });
    },
    createTodo({ dispatch, commit }, todo) {
      commit(CREATE_TODO, {
        todo: todo,
      });

      dispatch("saveTodoToLocalStorage");
    },
    updateTodo({ dispatch, commit }, todo) {
      commit(UPDATE_TODO, {
        newTodo: { ...todo },
      });

      dispatch("saveTodoToLocalStorage");
    },
    updateTodoCompletedStatus({ commit, dispatch, state }, id) {
      const TODO_INDEX = state.todos.findIndex((todo) => todo.id === id);

      const todo = { ...state.todos[TODO_INDEX] };
      todo.completed = !todo.completed;

      dispatch("updateTodo", todo);

      if (state.todos[TODO_INDEX].child) {
        state.todos[TODO_INDEX].child.forEach((item) => {
          const childTodo = { ...item };
          if (childTodo.completed !== todo.completed) {
            childTodo.completed = todo.completed;

            commit(UPDATE_CHILD_TODO, {
              newTodo: childTodo,
            });
          }
        });
      }

      dispatch("saveTodoToLocalStorage");
    },
    removeTodo({ dispatch, commit }, id) {
      commit(REMOVE_TODO, {
        id: id,
      });
      dispatch("saveTodoToLocalStorage");
    },
    createChildTodo({ dispatch, commit, state }, childTodo) {
      const TODO_INDEX = state.todos.findIndex(
        (item) => item.id === childTodo.parentId
      );

      commit(CREATE_CHILD_TODO, {
        childTodo: childTodo,
      });

      if (state.todos[TODO_INDEX].completed === true) {
        dispatch("updateTodoCompletedStatus", state.todos[TODO_INDEX].id);
      }

      dispatch("saveTodoToLocalStorage");
    },
    removeChildTodo({ dispatch, commit }, todo) {
      commit(REMOVE_CHILD_TODO, {
        oldTodo: todo,
      });
      dispatch("saveTodoToLocalStorage");
    },
    updateChildTodo({ dispatch, commit, state }, todo) {
      console.log("updateChildTodo");
      const TODO_INDEX = state.todos.findIndex(
        (item) => item.id === todo.parentId
      );

      commit(UPDATE_CHILD_TODO, {
        newTodo: { ...todo },
      });

      if (
        todo.completed === false &&
        state.todos[TODO_INDEX].completed === true
      ) {
        dispatch("updateTodoCompletedStatus", state.todos[TODO_INDEX].id);
      }

      dispatch("saveTodoToLocalStorage");
    },
    completeAllTasks({ dispatch, getters }) {
      const notDoneTodos = getters.notDoneTodos();
      if (!notDoneTodos.length) {
        return;
      }

      const notDoneTodosId = notDoneTodos.map((todo) => todo.id);
      notDoneTodosId.forEach((id) => {
        dispatch("updateTodoCompletedStatus", id);
      });
    },
  },
  mutations: {
    [CREATE_TODO](state, payload) {
      state.todos.push(payload.todo);
    },
    [UPDATE_TODO](state, { newTodo }) {
      const TODO_INDEX = state.todos.findIndex(
        (todo) => todo.id === newTodo.id
      );
      Vue.set(state.todos, TODO_INDEX, newTodo);
    },
    [REMOVE_TODO](state, payload) {
      state.todos = state.todos.filter((todo) => todo.id !== payload.id);
    },
    [FETCH_TODOS](state, payload) {
      state.todos = payload.todos;
    },
    [CREATE_CHILD_TODO](state, { childTodo }) {
      const TODO_INDEX = state.todos.findIndex(
        (todo) => todo.id === childTodo.parentId
      );

      if (state.todos[TODO_INDEX].child === undefined) {
        Vue.set(state.todos, TODO_INDEX, {
          ...state.todos[TODO_INDEX],
          child: [],
        });
      }

      state.todos[TODO_INDEX].child.push(childTodo);
    },
    [REMOVE_CHILD_TODO](state, { oldTodo }) {
      const TODO_INDEX = state.todos.findIndex(
        (todo) => todo.id === oldTodo.parentId
      );
      const CHILD_TODO_INDEX = state.todos[TODO_INDEX].child.findIndex(
        (todo) => todo.id === oldTodo.id
      );
      state.todos[TODO_INDEX].child.splice(CHILD_TODO_INDEX, 1);
    },
    [UPDATE_CHILD_TODO](state, { newTodo }) {
      console.log("UPDATE_CHILD_TODO");
      const TODO_INDEX = state.todos.findIndex(
        (todo) => todo.id === newTodo.parentId
      );
      const CHILD_TODO_INDEX = state.todos[TODO_INDEX].child.findIndex(
        (todo) => todo.id === newTodo.id
      );
      Vue.set(state.todos[TODO_INDEX].child, CHILD_TODO_INDEX, newTodo);
    },
  },
  state: {
    todos: [],
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
    doneTodos:
      (state, getters) =>
      (key = "DEFAULT") => {
        const todos = getters.sortedTodos(key);
        return todos.filter((todo) => todo.completed);
      },
    notDoneTodos:
      (state, getters) =>
      (key = "DEFAULT") => {
        const todos = getters.sortedTodos(key);
        return todos.filter((todo) => !todo.completed);
      },
    doneTodosCount(state, getters) {
      return getters.doneTodos().length;
    },
    notDoneTodosCount(state, getters) {
      return getters.notDoneTodos().length;
    },
    allChildTodoDone: (state) => (parentId) => {
      const TODO_INDEX = state.todos.findIndex((todo) => todo.id === parentId);

      //Если находим любой объект с невыполненной задчей возвращаем false
      //чтобы знать, что не все задачи выполнены
      return !state.todos[TODO_INDEX].child.some((todo) => !todo.completed);
    },
    sortedTodos:
      (state) =>
      (key = "DEFAULT") => {
        const todos = [...state.todos];
        switch (key) {
          case "BY_ALPHABET":
            return todos.sort(function (firstTodo, secondTodo) {
              const firstTitle = firstTodo.title.toLowerCase();
              const secondTitle = secondTodo.title.toLowerCase();
              if (firstTitle < secondTitle) {
                return -1;
              }
              if (secondTitle > secondTitle) {
                return 1;
              }
              return 0;
            });

          default:
            return state.todos;
        }
      },
  },
};
