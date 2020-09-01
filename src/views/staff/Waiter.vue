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
                <b-col>
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
                <b-col>
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
  <!-- <b-container>
    <b-row>
      <b-col>
        <h3>Waiter</h3>
      </b-col>
    </b-row>
    <b-row v-for="(order,index) in orders" :key="index">
      <b-col>{{ order }}</b-col>
      <b-button @click="acceptOrder(order)" variant="success">Accept order</b-button>
    </b-row>
  </b-container> -->
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
    this.$bind("orders", orders.where("status", "==", "done"));
    this.$bind(
      "acceptedOrders",
      orders
        .where("status", "==", "indelivery")
        .where("waiter", "==", window.localStorage.getItem("username"))
    );
  },
  methods: {
    acceptOrder(order) {
      const id = order.id;
      const orders = db.collection("orders");
      orders.doc(id).update({
        status: "indelivery",
        waiter: window.localStorage.getItem("username"),
      });
    },
    completeOrder(order) {
      const id = order.id;
      const orders = db.collection("orders");
      orders.doc(id).update({
        status: "delivered",
      });
    },
  },
};
</script>

<style>
</style>