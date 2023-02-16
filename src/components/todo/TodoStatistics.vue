<template>
  <div>
    <h1>Выполненно задач: {{ doneTodosCount }}</h1>
    <hr>
    <h1>Не выполненно задач: {{ notDoneTodosCount }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('todo', ['doneTodosCount', 'notDoneTodosCount'])
  }
}
</script>