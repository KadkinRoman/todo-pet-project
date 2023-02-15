<template>
  <button class="button" @click="$emit('click')">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <p class="text">
      <slot></slot>
    </p>
  </button>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.button {
  background: #1b1a17;
  border: 2px solid #ff8303;
  border-radius: 8px;
  color: #f0e3ca;
  cursor: pointer;
  transition: opacity .3s ease;;
  padding: 8px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


.button:hover {
  opacity: .8;
}
</style>