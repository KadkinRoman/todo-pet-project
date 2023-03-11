<template>
  <div class="todo-add">
    <div class="todo-add__item">
      <TodoAddItem />
    </div>
    <template v-if="!notDoneTodosCount">
      <h1>На сегодня больше нет задач. Отдохните!!!</h1>
    </template>
    <AppButton @click="completeAllTasks">Выполнить все задачи</AppButton>
    <hr />
    <div class="sort">
      <p style="text-align: left">Сортировать:</p>
      <AppButton @click="updateSortKey('BY_DATE')"
        >По дате добавления</AppButton
      >
      <AppButton @click="updateSortKey('BY_ALPHABET')">По алфавиту</AppButton>
    </div>
    <transition-group
      mode="out-in"
      name="fade"
      tag="div"
      class="todo-add__task task-not-completed"
    >
      <TodoTaskItem
        v-for="todo in notDoneTodos(sortKey)"
        :key="todo.id"
        :task-data="todo"
      />
    </transition-group>
    <hr />
    <transition-group
      mode="out-in"
      name="fade"
      tag="div"
      class="todo-add__task task-completed"
    >
      <TodoTaskItem
        v-for="todo in doneTodos(sortKey)"
        :key="todo.id"
        :task-data="todo"
      />
    </transition-group>
  </div>
</template>

<script>
import TodoAddItem from "./TodoAddItem.vue";
import TodoTaskItem from "./TodoTaskItem.vue";
import { mapActions, mapGetters } from "vuex";
import AppButton from "../AppButton.vue";

export default {
  components: {
    TodoAddItem,
    TodoTaskItem,
    AppButton,
  },
  data() {
    return {
      todosDone: [],
      todosNotDone: [],
      sortKey: "",
    };
  },
  computed: {
    ...mapGetters("todo", ["notDoneTodos", "doneTodos", "notDoneTodosCount"]),
  },
  methods: {
    ...mapActions("todo", ["completeAllTasks"]),
    updateSortKey(key = "DEFAULT") {
      this.sortKey = key;
    },
  },
};
</script>

<style scoped>
.todo-add__item {
  padding: 23px 0 32px 0;
}

.todo-add__task {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 5px 0;
  transition: all 0.3s ease;
}

/* Анимация */
.fade-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-leave-active {
  position: absolute;
}

.fade-move {
  transition: transform 1s;
}
</style>
