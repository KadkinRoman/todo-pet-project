<template>
  <div class="add-item">
    <div class="add-item__group">
      <AppInput v-model="task" type="text" />
    </div>
    <div class="add-item__button">
      <AppButton class="button" @click="create">
        <template #icon>
          <IconPlus />
        </template>
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'TodoAddItem',
  data() {
    return {
      task: ''
    }
  },
  components: {
    AppInput,
    AppButton,
    IconPlus
  },
  methods: {
    ...mapActions(['createTodo']),
    create() {
      const todo = {
        "userId": 1,
        "title": this.task,
        "completed": false
      }

      this.createTodo(todo);
      this.task = '';
    }
  }
}
</script>

<style scoped>
.add-item {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (min-width: 576px) {
  .add-item {
    flex-wrap: nowrap;
  }
}

.add-item__group {
  flex: 1 1 80%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.add-item__button {
  flex: 1 1 70px;
  min-width: 70px;
}
</style>