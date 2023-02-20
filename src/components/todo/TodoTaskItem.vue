<template>
  <div class="outer-card">
    <template v-if="!isEdit">
      <div class="card" @click="changeControlVisibleStatus">
        <div class="row">
          <div class="col">
            <div class="card__content">
              <h3 class="card__title">
                {{ data.title }}
              </h3>
            </div>
          </div>
          <div class="col">
            <div class="card__checkbox">
              <AppCheckbox
                :value="data.completed"
                @input="updateCompletedStatus"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="control" :class="{ showControl: isVisible }">
        <TodoTaskControlItem
          @remove="removeTodo(data.id)"
          @edit="changeEditStatus"
        />
      </div>
    </template>

    <div v-if="isEdit" class="card-edit">
      <div class="card-edit__group">
        <AppInput type="text" :value="data.title" @input="updateTitle" />
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
import { mapActions } from "vuex";
export default {
  components: {
    TodoTaskControlItem,
    AppInput,
    AppButton,
    AppCheckbox,
    IconEdit,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      isVisible: false,
      todo: { ...this.data },
    };
  },
  methods: {
    ...mapActions("todo", ["removeTodo", "updateTodo"]),
    changeEditStatus() {
      this.isEdit = true;
    },
    confirmChanges() {
      this.updateTodo(this.todo);
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
      this.updateTodo(this.todo);
    },
  },
};
</script>

<style scoped>
.card {
  background: #242320;
  border: 2px solid #a35709;
  border-radius: 8px;
  padding: 16px;
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
