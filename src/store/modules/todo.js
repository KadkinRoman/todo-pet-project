import {
  CREATE_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  FETCH_TODOS,
} from "./todoMutation";
import Vue from "vue";

export default {
  namespaced: true,
  actions: {
    fetchTodos({ commit }) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      commit(FETCH_TODOS, {
        todos: todos,
      });
    },
    createTodo({ commit, state }, todo) {
      commit(CREATE_TODO, {
        todo: todo,
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo({ commit, state }, todo) {
      commit(UPDATE_TODO, {
        newTodo: { ...todo },
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo({ commit, state }, id) {
      commit(REMOVE_TODO, {
        id: id,
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
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
      console.log(REMOVE_TODO);
      state.todos = state.todos.filter((todo) => todo.id !== payload.id);
    },
    [FETCH_TODOS](state, payload) {
      state.todos = payload.todos;
    },
  },
  state: {
    todos: [],
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
    doneTodos(state) {
      return state.todos.filter((todo) => todo.completed);
    },
    notDoneTodos(state) {
      return state.todos.filter((todo) => !todo.completed);
    },
    doneTodosCount(state, getters) {
      return getters.doneTodos.length;
    },
    notDoneTodosCount(state, getters) {
      return getters.notDoneTodos.length;
    },
    getTodoById(state, id) {
      return state.todos.find((todo) => todo.id === id);
    },
  },
};
