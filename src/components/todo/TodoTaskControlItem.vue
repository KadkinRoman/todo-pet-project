<template>
  <div class="control-item">
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
import AppButton from "../AppButton.vue";
import IconEdit from "../icons/IconEdit.vue";
import IconDelete from "../icons/IconDelete.vue";
export default {
  components: {
    AppButton,
    IconEdit,
    IconDelete,
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
