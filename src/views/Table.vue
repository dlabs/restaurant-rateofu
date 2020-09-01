<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <b-tabs pills fill content-class="mt-3">
          <b-tab title="Menu" active>
            <b-row>
              <b-col sm="3" v-for="m in menuItems" :key="m.id">
                <menu-item @added="itemAdded" :item="m"></menu-item>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab block>
            <template v-slot:title>
              Order
              <b-badge pill variant="danger">{{ orderItems.length }}</b-badge>
            </template>
            <h2 v-if="orderItems.length <= 0">Your order is empty😢</h2>
            <b-row class="mt-2" v-for="orderItem in orderItems" :key="orderItem.itemId">
              <b-col>
                <order-item @qchanged="changeQuantity" :item="orderItem"></order-item>
              </b-col>
            </b-row>
            <b-button
              @click="placeOrder"
              class="mt-3"
              v-if="orderItems.length != 0"
              variant="primary"
              block
            >Place the order</b-button>
            <span v-if="!orderItems.length <= 0">
              <b>Total: £{{ totalPrice }}</b>
            </span>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db, Timestamp } from "../db";
export default {
  data: function () {
    return {
      menuItems: [],
      orderItems: [],
    };
  },
  computed: {
    totalPrice: () => {
      return 123
    },
  },
  methods: {
    itemAdded(payload) {
      let item = this.orderItems.find((el) => el.item.id == payload.id);
      if (item) {
        item.quantity++;
        return;
      }

      this.orderItems.push({
        item: payload,
        quantity: 1,
      });
    },
    changeQuantity(payload) {
      const orderItem = Object.assign(
        {},
        this.orderItems.find((el) => el.item.id == payload.item.id)
      );
      if (orderItem.quantity + payload.change <= 0) {
        console.log("item has to be deleted");
        let newItems = [];
        this.orderItems.forEach((el) => {
          if (orderItem.item.id != el.item.id) {
            newItems.push(el);
          }
        });
        this.orderItems = newItems;
        return;
      }
      this.orderItems.find((el) => el.item.id == payload.item.id).quantity +=
        payload.change;
    },
    async placeOrder() {
      // check if theres only food or only drinks
      let nofood = true;
      let nodrinks = true;
      this.orderItems.forEach((el) => {
        console.log(el);
        if (el.item.type == "food") {
          nofood = false;
        }
        if (el.item.type == "drink") {
          nodrinks = false;
        }
      });
      // Add order to database
      const ref = await db.collection("orders").add({
        items: this.orderItems,
        time: Timestamp.fromDate(new Date()),
        status: "added",
        foodstatus: nofood ? "done" : "added",
        drinkstatus: nodrinks ? "done" : "added",
      });
      ref.get().then((snap) => {
        this.$router.push("/waiting/" + snap.id);
      });
    },
  },
  firestore: {
    menuItems: db.collection("items"),
  },
};
</script>

<style>
</style>
