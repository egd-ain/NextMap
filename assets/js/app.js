jQuery(document).ready(function ($) {
  function slickON() {
    $(".brand-list").slick({
      dots: false,
      prevArrow: false,
      nextArrow: false,
      autoplay: true,
      autoplaySpeed: 2000,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3
    })
  }
  $('.dropdown').hover(function () {
    $('.dropdown-toggle', this).trigger('click');
  });

  $('#navbar-mobile').click(function () {
    $('body').toggleClass("fixed-header");
  });

  var toTopBtn = $('#gototop');
  toTopBtn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300')
  });

  slickON();

  setTimeout(function () {
    $('body').addClass('loaded');
  }, 2000);

});
