@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Order #100{{$order->id}}</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    @if (!$order->processing && !$order->finished)
                        Your order is in queue and will be processed shortly. Thanks your for your patience!
                    @endif
                    @if ($order->processing && !$order->finished)
                        Your order is being processed
                    @endif

                    @if ($order->processing && $order->finished && !$order->drinksServed && !$order->foodServed)
                        Your order is finished, you should get it any time!
                    @endif

                    @if ($order->processing && $order->drinksServed && !$order->foodServed)
                        Drinks served!
                    @endif

                    @if ($order->processing && $order->finished && $order->drinksServed && $order->foodServed)
                        Your order is finished and you got your meal. We hope you have enjoyed the time at The Restaurant at the End of the Universe!
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
