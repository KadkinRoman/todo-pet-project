<template>
  <div class="todo-add">

    <div class="todo-add__item">
      <TodoAddItem />
    </div>

    <div class="todo-add__task">
      <TodoTaskItem v-for="todo in notDoneTodos" :key="todo.id" :data="todo">
        <template #item>
          <div class="card__button">
            <AppButton @click="update(todo)">X</AppButton>
          </div>
        </template>
      </TodoTaskItem>
    </div>
    <div v-if = '!notDoneTodos.length'> 
      <h1>На сегодня больше нет задач. Отдохните!!!</h1>
    </div>
  </div>
</template>

<script>
import TodoAddItem from './TodoAddItem.vue';
import TodoTaskItem from './TodoTaskItem.vue';
import AppButton from '../AppButton.vue';
import { mapGetters, mapActions } from 'vuex';


export default {

  components: {
    TodoAddItem,
    TodoTaskItem,
    AppButton
  },
  methods: {
    ...mapActions(['updateTodo']),
    update(todo){
      this.updateTodo(todo);
    }
  },
  computed: {
    ...mapGetters({
      notDoneTodos: 'notDoneTodos'
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
}

.card__button {
  height: 32px;
  width: 32px;
}
</style>