<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>The Restaurant at the End of the Universe</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- Styles -->
    <style>
        html, body {
            background-color: #fff;
            color: #636b6f;
            font-family: 'Raleway', sans-serif;
            font-weight: 100;
            height: 100vh;
            margin: 0;
        }

        .full-height {
            height: 100vh;
        }

        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
        }

        .position-ref {
            position: relative;
        }

        .top-right {
            position: absolute;
            right: 10px;
            top: 18px;
        }

        .content {
            text-align: center;
        }

        .title {
            font-size: 84px;
        }

        .links > a {
            color: #636b6f;
            padding: 0 25px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
        }

        .m-b-md {
            margin-bottom: 30px;
        }

        .customer-text {
            color: #000 !important;
        }

        a.btn {
            color: #fff;
        }

        .btn {
            color: #fff;
            font-weight: 600;
        }
    </style>
</head>
<body>
<div class="flex-center position-ref full-height">
    <div class="top-right links">
        @auth
            <a href="{{ url('/home') }}">Home</a>
        @else
            <a href="{{ route('login') }}">Login</a>
        @endauth
    </div>

    <div class="content">
        <div class="title m-b-md">
            The Restaurant at the End of the Universe
        </div>

        <div class="container">
            <div class="panel-heading m-b-md display-4">Order your delicious food!</div>
            <div class="row col-md-12 customer-text">
                <div class="col-md-8 col-md-offset-2">
                    <div class="panel panel-default">

                        <div class="panel-body">
                            @foreach($restaurantMeals as $restaurantMeal)
                                <form action="{{ route("addItem", $restaurantMeal->id) }}" method="POST">
                                    <span class="d-none">{{ csrf_field() }}</span>

                                    <span class="badge badge-info">{{$restaurantMeal->type}}</span>
                                    | {{ $restaurantMeal->name }} <span
                                            class="badge badge-dark">£ {{ $restaurantMeal->price }}</span><br>

                                    Quantity:
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min="1"
                                        max="100"
                                        value="1"
                                    >
                                    <button type="submit" class="btn btn-sm btn-success">Add to basket</button>
                                </form>
                                <hr>
                            @endforeach
                        </div>

                        <hr>

                        <button class="btn btn-sm btn-primary">Add your order!</button>
                    </div>
                </div>
                <div class="col-md-4 customer-text">
                    Current orders:

                    @isset ($guestOrder)
                        <ul>
                            @foreach ($guestOrder as $item)
                                <li class="list-unstyled">
                                    <h5 class="d-inline mr-2 font-weight-bold">{{$item["quantity"]}}
                                        x</h5>{{$item["name"]}}: £<span>{{$item["price"]}}</span>
                                </li>
                            @endforeach
                        </ul>
                    @else
                        <div class="alert alert-warning mt-2 mb-2" role="alert">
                            <strong>Please note</strong>:
                            <span>There are no meals added!</span>
                        </div>
                    @endisset ($guestOrder)

                    <br>
                    @isset ($guestOrder)
                        <form clasS="d-inline" action="{{ route("removeOrder") }}" method="POST">
                            <span class="d-none">{{ csrf_field() }}</span>
                            {{ method_field('DELETE') }}
                            <button class="btn btn-sm btn-danger mr-2">Clear order</button>
                        </form>


                        <form clasS="d-inline" action="{{ route("addOrder") }}" method="POST">
                            <span class="d-none">{{ csrf_field() }}</span>
                            <button class="btn btn-sm btn-primary">Add your order!</button>
                        </form>
                    @endisset
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
