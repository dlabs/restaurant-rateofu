<!--[if !IE]><!-->
<html lang="$ContentLocale">
<!--<![endif]-->
<!--[if IE 6 ]><html lang="$ContentLocale" class="ie ie6"><![endif]-->
<!--[if IE 7 ]><html lang="$ContentLocale" class="ie ie7"><![endif]-->
<!--[if IE 8 ]><html lang="$ContentLocale" class="ie ie8"><![endif]-->
<head>
	<% base_tag %>
	<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	$MetaTags(false)
	<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    <link href="//cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <script src="//cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
	<% require themedCSS('reset') %>
	<% require themedCSS('typography') %>
	<% require themedCSS('form') %>
	<% require themedCSS('layout') %>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Table $table_id</h1>
            </div>

            <div class="col">
                <h2>Order form</h2>
                <div id="order-form">
                    <div v-for="menu_item in menu_items">
                        <label :for="'order_item_' + menu_item.id">{{ menu_item.name }}</label>
                        <input :id="'order_item_' + menu_item.id" class="menu-item-qty" type="number" min="0" step="1" value="0" :data-menu-item="menu_item.id"/>
                    </div>

                    <button v-on:click="submit_order()">Send</button>
                </div>
            </div>

            <div class="col">
                <h2>Order list</h2>
                <div id="order-list">
                    <div v-for="order in orders_list">
                        <div>
                            <p class="order-list-item">{{ order.id }}
                            <template v-if="order.drinks_ready == '1' && order.drinks_served == '0'">
                                <span class="pill pill-rnd">Drinks prepared</span>
                            </template>
                            <template v-if="order.drinks_served == '1'">
                                <span class="pill pill-rnd">Drinks served</span>
                            </template>
                            <template v-if="order.food_ready == '1' && order.food_served == '0'">
                                <span class="pill pill-rnd">Food prepared</span>
                            </template>
                            <template v-if="order.food_served == '1'">
                                <span class="pill pill-rnd">Food served</span>
                            </template>

                            <span class="order-status">{{ order.status }}</span>

                            </p>
                        </div>
                        <p :class="'order_details_' + order.id" style="display: none;">{{ order.items }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<% require javascript('//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js') %>
<% require javascript('//unpkg.com/axios/dist/axios.min.js') %>

<script>
    const v_order_form = new Vue({
        el: '#order-form',
        menu_items: [],
        data() {
            return {
                menu_items: []
            }
        },
        mounted() {
            fetch('guest/menu_items')
            .then(res => res.json())
            .then(myJson => {
                this.menu_items = myJson
            })
        },
        methods: { 
            submit_order: function () {
                var order_items = [];

                var inputs = document.getElementById('order-form').getElementsByClassName('menu-item-qty');
                for (i = 0; i < inputs.length; i++) {
                    if (inputs[i].nodeName === "INPUT" && Number(inputs[i].value) > 0) {
                        order_items.push({'id': inputs[i].dataset.menuItem, 'qty': Number(inputs[i].value)});
                    }
                }

                if (order_items.length) {
                    axios.post('guest/orders', JSON.stringify(order_items))
                    .then(function (response) {
                        v_orders_list.fetch_orders();

                        for (i = 0; i < inputs.length; i++) {
                            inputs[i].value = '0';
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            }
        }
    });

    const v_orders_list = new Vue({
        el: '#order-list',
        orders_list: [],
        interval: null,
        data() {
            return {
                orders_list: []
            }
        },
        methods: {
            fetch_orders: function () {
                fetch('guest/orders')
                .then(res => res.json())
                .then(myJson => {
                    this.orders_list = myJson
                })
            }
        },
        created() {
            this.fetch_orders();

            this.interval = setInterval(function () {
                this.fetch_orders();
            }.bind(this), 5000);
        },
        beforeDestroy: function() {
            clearInterval(this.interval);
        }
    });
</script>
<style>
    .order-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
</html>