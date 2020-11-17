<div class="col-sm-12 customer-order-summary">
  <h2>Order summary:</h2>
  <div id="customer-order">
    <div class="container">
      <div class="row">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Status</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody class="append-new-items">
            <?php
            foreach ($orders as $order) {
              echo '
                  <tr>
                    <td>' . $order->id . '</td>
                    <td>' . $order->order_status . '</td>
                    <td>' . $order->edit . '</td>
                  </tr>
                ';
            }
            ?>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</div>