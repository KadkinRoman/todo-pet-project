<template>
  <div class="todo-add">

    <div class="todo-add__item">
      <TodoAddItem />
    </div>
    <div v-if='!notDoneTodos.length'>
      <h1>На сегодня больше нет задач. Отдохните!!!</h1>
    </div>
    <transition-group mode="out-in" name="fade" tag="div" class="todo-add__task task-not-completed">
      <TodoTaskItem v-for="todo in notDoneTodos" :key="todo.id" :data="todo">
        <template #item>
          <div class="todo-add__control-element">
            <AppCheckbox v-model="todo.completed" @input="updateTodo(todo)" />
          </div>
        </template>
      </TodoTaskItem>
    </transition-group>
    <hr>
    <transition-group mode="out-in" name="fade" tag="div" class="todo-add__task task-completed">
      <TodoTaskItem v-for="todo in doneTodos" :key="todo.id" :data="todo">
        <template #item>
          <div class="todo-add__control-element">
            <AppCheckbox v-model="todo.completed" @input="updateTodo(todo)" />
          </div>
        </template>
      </TodoTaskItem>
    </transition-group>
  </div>
</template>

<script>
import TodoAddItem from './TodoAddItem.vue';
import TodoTaskItem from './TodoTaskItem.vue';
import AppCheckbox from '../AppCheckbox.vue';
import { mapGetters, mapActions } from 'vuex';


export default {
  components: {
    TodoAddItem,
    TodoTaskItem,
    AppCheckbox
  },
  methods: {
    ...mapActions('todo', ['createTodo', 'updateTodo']),
  },
  computed: {
    ...mapGetters('todo', {
      notDoneTodos: 'notDoneTodos',
      doneTodos: 'doneTodos'
    })
  }
}
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
  transition: all .3s ease;
}

.todo-add__control-element {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
}

/* Анимация */
.fade-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.fade-enter, .fade-leave-to {
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