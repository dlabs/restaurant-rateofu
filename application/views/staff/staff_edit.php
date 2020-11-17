<div class="col-sm-12 customer-order-summary">
  <h2>Hello <?= $_SESSION['staff']; ?> you are working on order <?= $order->id; ?>:</h2>
  <div id="customer-order">
    <div class="container">
      <div class="row">
        <h4>Please prepare this items.</h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody class="append-new-items">
            <?php
            foreach ($order->order_list as $item) {
              echo '
                  <tr>
                    <td>' . $item['name'] . '</td>
                    <td>' . $item['type'] . '</td>
                  </tr>
                ';
            }
            ?>
          </tbody>
        </table>

        <a href="<?= base_url() . 'staff/order/' . $order->id; ?>" type="button" class="btn btn-success btn-block"
          id="submit-order">Finish order</a>
      </div>
    </div>
  </div>
</div>