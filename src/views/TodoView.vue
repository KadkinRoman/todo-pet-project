<template>
  <section class="todo-view">
    <TheTodo />
  </section>
</template>

<script>
import TheTodo from "@/components/todo/TheTodo.vue";
export default {
  components: {
    TheTodo,
  },
};
</script>

<style scoped>
.todo-view {
  padding: 23px;
}
</style>
