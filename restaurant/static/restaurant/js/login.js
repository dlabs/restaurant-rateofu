$(function () {
    $('html').on('focus', 'div.bmd-form-group', function () {
        $(this).addClass('is-focused');
    });

    $('html').on('blur', 'div.bmd-form-group', function () {
        if (!$(this).find('input').val()) {
            $(this).removeClass('is-focused');
        }
    });
});
