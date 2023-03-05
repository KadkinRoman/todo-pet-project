<template>
  <div class="control-item">
    <template v-if="taskData.parentId === undefined">
      <AppInput v-model="childTodoText" :value="childTodoText" type="text" />
      <AppButton class="button" @click="add"> + </AppButton>
    </template>
    <AppButton class="button" @click="$emit('edit')">
      <template #icon>
        <IconEdit />
      </template>
    </AppButton>
    <AppButton class="button" @click="$emit('remove')">
      <template #icon>
        <IconDelete />
      </template>
    </AppButton>
  </div>
</template>

<script>
import AppInput from "../AppInput.vue";
import AppButton from "../AppButton.vue";
import IconEdit from "../icons/IconEdit.vue";
import IconDelete from "../icons/IconDelete.vue";
import { mapActions } from "vuex";
export default {
  components: {
    AppButton,
    AppInput,
    IconEdit,
    IconDelete,
  },
  props: {
    taskData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      childTodoText: "",
    };
  },
  methods: {
    ...mapActions("todo", ["createChildTodo"]),
    add() {
      if (!this.childTodoText.length) {
        return;
      }
      const childTodo = {
        parentId: this.taskData.id,
        id: Date.now(),
        date: new Date(),
        title: this.childTodoText,
        completed: false,
      };
      this.createChildTodo(childTodo);
      this.childTodoText = "";
    },
  },
};
</script>

<style scoped>
.control-item {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  padding: 5px 0;
}

.button {
  width: 36px;
  height: 36px;
}
</style>
