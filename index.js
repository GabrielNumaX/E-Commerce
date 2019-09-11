$(document).ready(function(){
  $('.carousal-container').slick({
    autoplay: true,
	  autoplaySpeed: 1800,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slideToScroll: 4,
    speed: 2200,

    // adaptiveHeight: true
  });
  console.log('carousal loaded')
});
