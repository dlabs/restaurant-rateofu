<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <b-tabs pills fill content-class="mt-3">
          <b-tab title="Menu" active>
            <b-row>
              <b-col v-for="m in menuItems" :key="m.id">
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
            <b-button class="mt-3" v-if="orderItems.length != 0" variant="primary" block>
Place the order
            </b-button>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data: function () {
    return {
      menuItems: [
        {
          id: 0,
          title: "Tea substitute",
          type: "drink",
          price: 10.99,
        },
        {
          id: 1,
          title: "Hagro biscuit",
          type: "food",
          price: 10.99,
          description: "Item description",
        },
        {
          id: 2,
          title: "Janx spirit",
          type: "drink",
          price: 10.99,
        },
        {
          id: 3,
          title: "Tea substitute",
          type: "drink",
          price: 10.99,
        },
      ],
      orderItems: [],
    };
  },
  methods: {
    itemAdded(payload) {
      console.log(payload);
      let item = this.orderItems.find(el=>el.item.id==payload.id)
      if(item){
        item.quantity++
        return
      }
      
      this.orderItems.push({
        item: payload,
        quantity: 1,
      });
    },
    changeQuantity(payload){
      const orderItem = Object.assign({},this.orderItems.find(el=>el.item.id==payload.item.id))
      if(orderItem.quantity+payload.change <= 0){
        console.log("item has to be deleted");
        //let index = this.orderItems.indexOf(orderItem)
        //this.orderItems.splice(index,1)
        return
      }
      this.orderItems.find(el=>el.item.id==payload.item.id).quantity+=payload.change
    }
  },
};
</script>

<style>
</style>
