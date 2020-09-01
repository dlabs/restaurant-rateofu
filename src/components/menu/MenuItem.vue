<template>
      <b-card
        :title="item.title"
        img-src="https://picsum.photos/600/300/?image=15"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>{{ item.description || "" }}</b-card-text>

        <b-button @click="addToMenu" variant="success">Add to order</b-button>
        <span class="price ml-2"><b>£{{ item.price }}</b></span>
      </b-card>
</template>

<script>
export default {
  props: ["item"],
  methods: {
      addToMenu(){
          this.$emit("added",this.item)
      }
  }
};
</script>

<style>
.price{
    text-align: end;
}
</style>