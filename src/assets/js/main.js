$(document).ready(function () {
    function checkForInput(element) {
        const $label = $(element).siblings('label');
        if ($(element).val().length > 0) {
            $label.addClass('input-has-value');
        } else {
            $label.removeClass('input-has-value');
        }
    }
    $('.input').each(function () {
        checkForInput(this);
    });
    $('.input').on('change keyup', function () {
        checkForInput(this);
    });
});


var $elm = $(".notification .pushmessage");
$(".pushmessage").prepend($elm);
setTimeout(function() {
    $elm.remove();
}, 7000);

$('.hidethis').click(function(){
    $(this).parent('.pushmessage').hide()
})