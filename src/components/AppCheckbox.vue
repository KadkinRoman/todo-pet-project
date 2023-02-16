<template>
  <div class="checkbox">
    <input class="input" @input="$emit('input', $event.target.checked)" :checked="value" :id="id" type="checkbox">
    <label class="label" :for="id"></label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      id: ''
    }
  },
  methods: {
    createId() {
      this.id = Date.now().toString();
    }
  },
  created() {
    this.createId();
  }
}
</script>
  
<style scoped>
.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  display: none;
}

.label {
  display: block;
  position: relative;
  width: 23px;
  height: 23px;
  border: 1px solid #ff8303;
  border-radius: 2px;
}

.label::before {
  position: absolute;
  content: '';
  top: 50%;
  left: 50%;
  transform: scale(0) translate(-418%, -452%);
  width: 14px;
  height: 14px;
  background-color: #ff8303;
  border-radius: 4px;
  box-shadow: 0 0 3px #ff8303;
  transition: transform .3s ease;
}

.input:checked+.label::before {
  transform: scale(1) translate(-47%, -48%);
}
</style>