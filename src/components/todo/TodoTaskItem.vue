<template>
  <div class="card">
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
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
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
  line-height: 26px;
  color: #f0e3ca;
}
</style>