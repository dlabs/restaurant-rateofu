<template>
  <b-container>
    <div v-if="order">
      <b-row>

        <b-row>
          <b-col>
            <h1
              v-if="order.status=='indelivery'"
            >Your order is on its' way😊</h1>
            <h1 v-if="order.status=='delivered'">Thank you❤</h1>
            <h1 v-if="order.status=='added'">We are prepairing your order✌</h1>
            <h1 v-if="order.status=='done'">Your order is waiting for delivery👀</h1>
          </b-col>
        </b-row>
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