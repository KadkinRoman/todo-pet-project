<template>
  <section class="section">
    <TodoStatistics />
  </section>
</template>

<script>
import TodoStatistics from "../components/todo/TodoStatistics.vue";
export default {
  components: {
    TodoStatistics,
  },
};
</script>

<style scoped>
.section {
  flex: 1 1 auto;
  padding: 32px 0 0 0;
}
</style>
