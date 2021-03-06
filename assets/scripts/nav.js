jQuery(function($) {
  console.log("nav.js loaded");


  // --------------------------------------------
  // On mobile, show the search bar when a user
  // scrolls up a certain amount.
  // --------------------------------------------

  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('header').outerHeight();
  var $search = $('.nav-secondary .search-bar-wrap');
  var $wrap = $('.nav-secondary .wrap');

  // On scroll, let the interval function know the user has scrolled
  $(window).scroll(function(event){
    didScroll = true;
  });

  // Run hasScrolled() and reset didScroll status
  setInterval(function() {
    if (didScroll && $(window).width() <= 640) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {

    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(st - lastScrollTop) <= delta)
      return;

    // Make sure that user is past the "sticky" threshhold
    if (st < lastScrollTop && st > 800) {
      // $search.removeClass('hide');
      $search.removeClass('small');
      $wrap.addClass('has-search');
    }
    else {
      // $search.addClass('hide');
      $search.addClass('small');
      $wrap.removeClass('has-search');
    }

    lastScrollTop = st;

  }


  var $navWrap = $('header.banner');
  var a = $navWrap.offset().top + 200;

  $(document).scroll( function() {
    if ($(this).scrollTop() > a) {
      $navWrap.addClass("bg-inverse")
    }
    else {
      $navWrap.removeClass("bg-inverse")
    }
  });

  $( '.fixedsticky' ).sticky({
    topSpacing: 0
  });


  // --------------------------------------------
  // When user scrolls the secondary/nav filter,
  // make the gradient effect fade out.
  // --------------------------------------------

  var lastScrollLeft = 0;
  var containerWidth = $('.menu-filter-container').outerWidth();
  var threshhold = containerWidth - 100;
  var overlayVisible = true;

  // Detect when secondary nav has scrolled left
  $('.menu-filter-container').scroll(function() {
    var menuScrollLeft = $('.menu-filter-container').scrollLeft();
    if (menuScrollLeft > threshhold && overlayVisible) {
      $('.nav-filter-overlay').fadeOut(200);
      overlayVisible = false;
    }
    else if (menuScrollLeft < threshhold && !overlayVisible) {
      $('.nav-filter-overlay').fadeIn(200);
      overlayVisible = true;
    }
  });
});
