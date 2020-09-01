<template>
  <div>
    <b-card>
      <h3>{{ item.item.title }}</h3>
      <span>
        Amount: <b>{{ item.quantity }}x</b>
      </span>
      <div class="buttons-container ml-2">
        <b-button @click="incrementOrder" variant="success">+</b-button>
        <b-button @click="decrementOrder" class="ml-2" variant="warning">-</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    incrementOrder() {
      this.$emit("qchanged", { item: this.item.item, change: 1 });
    },
    decrementOrder() {
      this.$emit("qchanged", { item: this.item.item, change: -1 });
    },
  },
};
</script>

<style>
.buttons-container {
  display: inline;
}
</style>