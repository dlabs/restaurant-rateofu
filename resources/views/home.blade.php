@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Dashboard</div>

                    <div class="panel-body">
                        <div class="alert alert-success">
                            Hello <strong>{{ $data["name"] }}</strong> the super <em>{{ $data["type"] }}</em>!
                        </div>

                        @if (count($data["orders"]) === 0)
                            <div class="alert alert-warning">
                                There is no work! You can enjoy your free time!
                            </div>
                        @else
                            @foreach ($data["orders"] as $item)
                                <div>
                                    <h3>Order #100{{ $item["order"]["id"] }}</h3> @if (!$item["order"]["processing"])
                                        <form clasS="d-inline" action="{{ route("startOrderProcess", $item["order"]["id"]) }}" method="POST">
                                            <span class="d-none">{{ csrf_field() }}</span>
                                            <button class="btn btn-sm btn-primary">Start to process!</button>@endif
                                        </form>
                                    @if ($item["order"]["processing"])
                                    <ul>
                                        @if (auth()->user()->type !== \App\User::TYPE_USER_WAITER)
                                        <span class="text-danger">You must prepare:</span>
                                        @foreach ($item["mealToPrepare"] as $meal)
                                            <form clasS="d-inline" action="{{ route("mealReady", $item["order"]["id"]) }}" method="POST">
                                                <span class="d-none">{{ csrf_field() }}</span>
                                                <li class="list-unstyled ml-3">
                                                    <input type="hidden" name="mealName" value="{{$meal["name"]}}">&nbsp;&nbsp;&nbsp;{{ $meal["quantity"] }}x - {{$meal["name"]}} | Quantity prepared:
                                                    <input
                                                            type="number"
                                                            id="quantity"
                                                            name="quantity"
                                                            min="1"
                                                            max="{{$meal["quantity"]}}"
                                                            value="1"
                                                    >&nbsp;<button class="btn btn-sm btn-primary">Done!</button> @if (isset($meal["alreadyPrepared"])) <small> --> Already prepared {{$meal["alreadyPrepared"]}}</small>@endif
                                                </li>
                                            </form>
                                        @endforeach
                                        @else
                                            @if ($item[0]["serveDrinks"])
                                                <form clasS="d-inline" action="{{ route("serveDrinks", $item["order"]["id"]) }}" method="POST">
                                                    <span class="d-none">{{ csrf_field() }}</span>
                                                    <button class="btn btn-sm btn-primary">Serve drinks!</button>
                                                </form>
                                            @endif

                                            @if ($item[0]["serveFood"])
                                                FOOD
                                            @endif
                                        @endif
                                    </ul>
                                    @endif
                                </div>

                                <hr>
                            @endforeach
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
