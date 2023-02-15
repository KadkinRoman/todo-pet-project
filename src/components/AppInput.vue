<template>
  <input class="input" :type="type" :value="value" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.input {
  background: #242320;
  border: 1px solid #ff8303;
  border-radius: 4px;
  color: #f0e3ca;
  cursor: text;
  transition: opacity .3s ease;
  padding: 8px 16px;
  width: 100%;
  height: 100%;
}
</style>