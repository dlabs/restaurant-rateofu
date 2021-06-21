$(function () {
    $('input').change(function () {
        var item_id = parseInt($(this).attr('name').substring(9));
        var price = $(this).val() * prices[item_id];
        $(this).parent().parent().parent().find('td:last').html('&#163; ' + price);
        var total = 0;
        $('.cost').each(function () {
            total += parseFloat($(this).text().substring(2)) || 0;
        });
        $('#total').html('&#163; ' + total);
    });
});
