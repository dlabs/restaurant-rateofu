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
            <div class="d-flex justify-content-between">
                <% if $getRole %>
                    <div class="mb-3 mt-5">
                        <h1>$getRole</h1>
                    </div>

                    <div class="mb-3" style="margin-top: 1.9rem;">
                        <a class="btn btn-sm btn-danger" href="/staff/doLogout">Logout</a>
                    </div>
                <% else %>
                    <form method="POST" action="/staff/doLogin">
                        <div class="mb-3">
                            <label class="form-label" for="name">Name</label>
                            <input id="name" class="form-control" type="text" name="Name" placeholder="Enter your name"/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="role">Role</label>
                            <select id="role" name="Role" class="form-select">
                                <option value="Barman">Barman</option>
                                <option value="Chef">Chef</option>
                                <option value="Waiter" selected>Waiter</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <input type="submit" value="Login"/>
                        </div>
                    </form>
                <% end_if %>
            </div>

            <% if $getRole %>
                <div class="row mt-5">
                    <h2>Order list</h2>
                    <div id="order-list">
                        <div v-for="order in orders_list" class="order-list-item">
                            <p>{{ order.id }} <span class="order-status">{{ order.status }}</span></p>
                            <button v-on:click="process_order(order.id)">Send</button>
                        </div>
                    </div>
                </div>
            <% end_if %>
        </div>
    </div>
</body>

<% require javascript('//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js') %>
<% require javascript('//unpkg.com/axios/dist/axios.min.js') %>

<script>
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
                fetch('staff/orders')
                .then(res => res.json())
                .then(myJson => {
                    this.orders_list = myJson
                })
            },
            process_order: function (order_id) {
                if (typeof(order_id) !== 'undefined') {
                    axios.put('staff/orders', JSON.stringify({'order_id': order_id}))
                    .then(function (response) {
                        v_orders_list.fetch_orders();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
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
    form {
        margin-top: 25%;
    }

    .order-list-item {
        display: flex;
        align-items: center;
    }

    .order-list-item span {
        margin: 0 20px 0 14px;
    }
</style>
</html>