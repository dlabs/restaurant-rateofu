<div class="container">
  <div class="row">
    <?php
    foreach ($menu as $key => $item) {
      echo '
          <div class="col-md-6 col-sm-6 col-xs-12">
            <div class="row content-part-3-inner">
              <div class="col-md-5 col-sm-5 col-xs-12" align="center">
                <img src="https://via.placeholder.com/150" class="img-responsive img" alt="Menu Item">
              </div>
              <div class="col-md-7 col-sm-7 col-xs-12 order-data">
                <div class="content-part-3-right-h4">' . $item->name . '</div>
                <div class="type">Type : ' . $item->type . '</div>
                <div class="quantity">Quantity : <input type="number" name="quantity" min="1" max="100" class="quantity_input" value="0"/></div>
                <div class="price">Price peer item : £ ' . $item->price . '</div>
                <a href="#!" class="margin_p3 order-now" data-id="' . $item->id . '"
                data-name="' . $item->name . '"
                data-type="' . $item->type . '"
                data-price="' . $item->price . '"
                >Add item</a>
              </div>
            </div>
          </div>
        ';
    }


    ?>
  </div>
</div>
<div class="col-sm-12 hidden customer-order-summary">
  <input type="number" id="order_id" data-id="" hidden>
  <h2>Order summary:</h2>
  <h2>Your order id: <span id="order_id_h2"></span></h2>
  <h2>Your order status: <span id="order_status_h2"></span></h2>
  <div id="customer-order">
    <div class="container">
      <div class="row">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody class="append-new-items">
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td>Grand Total</td>
              <td class="pt-3-half total-order-price" contenteditable="false">£ 0</td>
            </tr>
        </table>

        <button type="button" class="btn btn-success btn-block" id="submit-order">Submit order</button>
      </div>
    </div>
  </div>
</div>