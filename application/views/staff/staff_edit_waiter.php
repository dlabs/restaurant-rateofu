<div class="col-sm-12 customer-order-summary">
  <h2>Hello <?= $_SESSION['staff']; ?> you are bringing order <?= $order->id; ?> to the table.
  </h2>
  <div id="customer-order">
    <div class="container">
      <div class="row">
        <h4>Please serve order to table.</h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order id</th>
            </tr>
          </thead>
          <tbody class="append-new-items">
            <tr>
              <td><?= $order->id; ?></td>
            </tr>
          </tbody>
        </table>

        <a href="<?= base_url() . 'staff/order/' . $order->id; ?>" type="button" class="btn btn-success btn-block"
          id="submit-order">Bring order to table</a>
      </div>
    </div>
  </div>
</div>