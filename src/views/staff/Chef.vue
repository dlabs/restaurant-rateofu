<template>
  <b-container>
    <b-row>
      <b-col>
        <h3>All orders</h3>
        <h5 v-if="orders.length <= 0">No orders 👀</h5>
        <b-row class="mb-3" v-for="(order,index) in orders" :key="index">
          <b-col>
            <b-card class="mb-2">
              <b-row class="mb-2" v-for="(i, index) in order.items" :key="index">
                <b-col v-if="i.item.type=='food'">
                  <h5>{{ i.item.title }}</h5>Amount:
                  <b>{{ i.quantity }}x</b>
                </b-col>
              </b-row>
            </b-card>

            <b-button @click="acceptOrder(order)" variant="success">Accept order</b-button>
          </b-col>
        </b-row>
        <h3>Your orders</h3>
        <h5 v-if="acceptedOrders.length <= 0">You have no orders in process 👌</h5>
        <b-row class="mb-3" v-for="(order,index) in acceptedOrders" :key="index+'2'">
          <b-col>
              <b-card class="mb-2">
              <b-row class="mb-2" v-for="(i, index) in order.items" :key="index">
                <b-col v-if="i.item.type=='food'">
                  <h5>{{ i.item.title }}</h5>Amount:
                  <b>{{ i.quantity }}x</b>
                </b-col>
              </b-row>
              </b-card>
            
            <b-button @click="completeOrder(order)" variant="success">Complete order</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db } from "../../db";
export default {
  data: function () {
    return {
      orders: [],
      acceptedOrders: [],
    };
  },

  mounted() {
    const orders = db.collection("orders");
    this.$bind(
      "orders",
      orders.where("status", "==", "added").where("foodstatus", "==", "added")
    );

    this.$bind(
      "acceptedOrders",
      orders
        .where("status", "==", "added")
        .where("foodstatus", "==", "processing")
        .where("chef", "==", window.localStorage.getItem("username"))
    );
  },
  computed: {
    items: () => {
      return this.orderş.filter((el) => {
        return el.item.type == "food";
      });
    },
  },
  methods: {
    acceptOrder(order) {
      const orders = db.collection("orders");
      orders.doc(order.id).update({
        foodstatus: "processing",
        chef: window.localStorage.getItem("username"),
      });
    },
    async completeOrder(order) {
      const orders = db.collection("orders");
      await orders.doc(order.id).update({
        foodstatus: "done",
      });
      // Complete whole order
      orders
        .doc(order.id)
        .get()
        .then(async (snap) => {
          const data = snap.data();
          if (data.foodstatus == "done" && data.drinkstatus == "done") {
            await snap.ref.update({
              status: "done",
            });
          }
        });
    },
  },
};
</script>

<style>
</style>