<template>
  <section class="todo-add-view">
    <TodoAdd />
  </section>
</template>

<script>
import TodoAdd from "../components/todo/TodoAdd.vue";
export default {
  components: {
    TodoAdd,
  },
};
</script>

<style scoped>
.todo-add-view {
  flex: 1 1 auto;
  padding: 32px 0 0 0;
}
</style>
