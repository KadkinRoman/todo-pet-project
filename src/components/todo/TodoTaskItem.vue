<template>
  <div class="outer-card">
    <template v-if="!isEdit">
      <div class="card" @click.stop="changeControlVisibleStatus">
        <div class="row">
          <div class="col">
            <div class="card__content">
              <h3 class="card__title">
                {{ taskData.title }}
              </h3>
            </div>
          </div>
          <div class="col">
            <div class="card__checkbox">
              <AppCheckbox
                :value="taskData.completed"
                @input="updateCompletedStatus"
              />
            </div>
          </div>
        </div>
        <template v-if="isVisible">
          <TodoTaskItem
            v-for="childTodo in taskData.child"
            :key="childTodo.id"
            :task-data="childTodo"
          />
        </template>
      </div>
      <div class="control" :class="{ showControl: isVisible }">
        <TodoTaskControlItem
          :task-data="taskData"
          @remove="remove()"
          @edit="changeEditStatus"
        />
      </div>
    </template>

    <div v-if="isEdit" class="card-edit">
      <div class="card-edit__group">
        <AppInput type="text" :value="todo.title" @input="updateTitle" />
      </div>
      <div class="card-edit__control-element">
        <AppButton class="button" @click="confirmChanges">
          <template #icon>
            <IconEdit />
          </template>
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import TodoTaskControlItem from "./TodoTaskControlItem.vue";
import AppInput from "../AppInput.vue";
import AppButton from "../AppButton.vue";
import AppCheckbox from "../AppCheckbox.vue";
import IconEdit from "../icons/IconEdit.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TodoTaskItem",
  components: {
    TodoTaskControlItem,
    AppInput,
    AppButton,
    AppCheckbox,
    IconEdit,
  },
  props: {
    taskData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      isVisible: false,
      todo: { ...this.taskData },
    };
  },
  computed: {
    ...mapGetters("todo", ["allChildTodoDone"]),
  },
  watch: {
    taskData() {
      this.todo = { ...this.taskData };
    },
  },
  methods: {
    ...mapActions("todo", [
      "removeTodo",
      "removeChildTodo",
      "updateTodo",
      "updateChildTodo",
      "updateTodoCompletedStatus",
    ]),
    changeEditStatus() {
      this.isEdit = true;
    },
    confirmChanges() {
      if (!this.todo.title.length) {
        this.todo.title = this.taskData.title;
        return;
      }
      if (this.taskData.parentId !== undefined) {
        this.updateChildTodo(this.todo);
      } else {
        this.updateTodo(this.todo);
      }
      this.isEdit = false;
      this.isVisible = false;
    },
    changeControlVisibleStatus() {
      this.isVisible = !this.isVisible;
    },
    updateTitle(title) {
      this.todo.title = title;
    },
    updateCompletedStatus(completedStatus) {
      this.todo.completed = completedStatus;
      //Обновляем задачу потомка
      if (this.taskData.parentId !== undefined) {
        this.updateChildTodo(this.todo);

        //Все подзадачи выполнены, родительская задача меняет статус
        if (this.allChildTodoDone(this.todo.parentId)) {
          this.updateTodoCompletedStatus(this.todo.parentId);
        }
      } else {
        this.updateTodoCompletedStatus(this.todo.id);
      }
    },
    remove() {
      if (this.taskData.parentId !== undefined) {
        this.removeChildTodo(this.taskData);
      } else {
        this.removeTodo(this.taskData.id);
      }
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #242320;
  border: 2px solid #a35709;
  border-radius: 8px;
  padding: 4px 10px;
  text-align: left;
}

.row {
  display: flex;
  gap: 5px;
}

.col:nth-child(1) {
  flex: 1;
}

.card__title {
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
  color: #f0e3ca;
}

.card__checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
}

/* control */
.control {
  display: none;
}

.showControl {
  display: block;
}

/* card-edit */
.card-edit {
  display: flex;
  align-items: stretch;
  gap: 5px;
}

.card-edit__group {
  flex: 1 1 80%;
  min-height: 68px;
}

.card-edit__control-element {
  flex: 1 1 70px;
}
</style>
