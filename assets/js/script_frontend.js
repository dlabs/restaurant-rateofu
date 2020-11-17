$(document).ready(function () {
  /**
   * Gets new menu item.
   */
  let order = [];
  $('.order-now').click(function () {
    let data = {};
    data['id'] = $(this).data("id");
    data['name'] = $(this).data("name");
    data['type'] = $(this).data("type");
    data['price'] = $(this).data("price");
    data['quantity'] = $(this).parent(1).find('.quantity_input').val();
    if (data['quantity'] > 0) {
      // Checks if array is already set or not for foreach.
        let checkIfSame = 0;
        /**
         * Checks if item already exists in array.
         * If it does we only update its quantity.
         */
        order.forEach(element => {
          if (element['name'] === data['name']) {
            $('#row-' + element['id']).remove();
            element['quantity'] = data['quantity']
            appendNewRow(element)
            checkIfSame = 1;
          }
        });
        /**
         * Item does not exists so we add it to array
         */
        if (checkIfSame === 0) {
          order.push(data);
          appendNewRow(data)
        }
    } else {
      alert("You need to order more than one item.")
    }
    console.log(order);
  })
  // Menu item end
  /**
   * Creates row template.
   */
  function newTableRow(items) {
    const price = items['quantity'] * items['price'];
    const newRow = `
      <tr id="row-${items['id']}">
        <td>${items['name']}</td>
        <td>${items['type']}</td>
        <td>${items['quantity']}</td>
        <td>£ ${price}</td>
      </tr>
    `;
    return newRow;
  }

  /**
   * Adds new item to the end of the table.
   */
  function appendNewRow(data) {
    let totalPrice = 0;
    order.forEach(element => {
      totalPrice += element['quantity'] * element['price'];
    })
    $('.total-order-price').html('£ ' + totalPrice);
    const newRow = newTableRow(data);
      $('.customer-order-summary').removeClass('hidden');
      $('.append-new-items').after(newRow);
      $(document).scrollTop($(document).height()); 
  }


  /**
   * Submits order to database.
   */
  $('#submit-order').on('click', function () {
    let data = {};
    data['order_summary'] = order;
    $.ajax({
      type: 'POST',
      data: {data:data},
      url: 'backend/addOrder',
      success: function (response) {
        console.log(response);
        if (response) {
          $('#order_id_h2').append(response);
          $('#order_id').data('id', response);
          $('h2').removeClass('hidden');
          $('#submit-order').remove();
          $('#order_status_h2').html('<h1>Order was recieved</h1>')
          // Every 3 seconds sends request to check for order change.
          window.setInterval(function(){
            checkOrderStatus(response);
          }, 3000);
        } else {
          $('.customer-order-summary').html('<h1>There was an error, please refresh the website!</h1>')
        }
      }
    });
  })

  /**
   * 
   * Checks order status.
   */
  function checkOrderStatus(id) {
    $.ajax({
      type: 'POST',
      data: {id:id},
      url: 'backend/checkorder',
      success: function (response) {
        console.log(response);
        if (response) {
          $('#order_status_h2').html('<h1>' + response + '</h1>')
        } else {
          $('.customer-order-summary').html('<h1>There was an error, please refresh the website!</h1>')
        }
      }
    });
  }
}); 