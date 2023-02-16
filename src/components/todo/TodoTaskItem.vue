<template>
  <div class="outer-card">
    <template v-if="!isEdit">
      <div class="card" @click="changeControlVisibleStatus">
        <div class="row">
          <div class="col">
            <div class="card__content">
              <h3 class="card__title">
                <slot name="title">
                  {{ data.title }}
                </slot>
              </h3>
            </div>
          </div>
          <div class="col">
            <slot name="item">
            </slot>
          </div>
        </div>
      </div>
      <div class="control" :class="{'showControl': isVisible}">
        <TodoTaskControlItem @remove="removeTodo(data.id)" @edit="changeEditStatus" />
      </div>
    </template>


    <div v-if="isEdit" class="card-edit">
      <div class="card-edit__group">
        <AppInput v-model="data.title" type="text" />
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
import TodoTaskControlItem from './TodoTaskControlItem.vue';
import AppInput from '../AppInput.vue';
import AppButton from '../AppButton.vue';
import IconEdit from '../icons/IconEdit.vue';
import { mapActions } from 'vuex';
export default {
  components: {
    TodoTaskControlItem,
    AppInput,
    AppButton,
    IconEdit
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      isVisible: false
    }
  },
  methods: {
    ...mapActions('todo', ['removeTodo', 'updateTodo']),
    changeEditStatus() {
      this.isEdit = true;
    },
    confirmChanges() {
      console.log('confirm');
      this.updateTodo(this.data);
      this.isEdit = false;
      this.isVisible = false;
    },
    changeControlVisibleStatus() {
      this.isVisible = !this.isVisible;
    }
  }
}
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