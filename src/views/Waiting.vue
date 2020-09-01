<template>
  <b-container>
    <div v-if="order">
<b-row>
      <b-col>Drink status: {{ order.drinkstatus }}</b-col>
    </b-row>
    <b-row>
      <b-col>Food status: {{ order.foodstatus }}</b-col>
    </b-row>
    <b-row>
      <b-col>
        <h1 v-if="order.status=='done'">Your order is complete, please wait for the waiter😊</h1>
        <h1 v-if="order.status=='delivered'">Thank you❤</h1>
      </b-col>
    </b-row>
    </div>
    
  </b-container>
</template>

<script>
import { db } from "../db";
export default {
  data: function () {
    return {
      order: null,
    };
  },
  mounted() {
    const orders = db.collection("orders");
    this.$bind("order", orders.doc(this.$route.params.id));
  },
  watch: {
    order: function (val) {
      console.log(val);
      if (val.status == "delivered") {
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      }
    },
  },
};
</script>

<style>
</style