$(document).ready(function() {

//this checks for cartCounter in local localStorage
//and sets value
  if(localStorage.getItem('cartCounter')){
      $('.shop-counter').text(localStorage.getItem('cartCounter'));
  }
  else {                                          //value ALWAYS string
    $('.shop-counter').text(localStorage.setItem('cartCounter', '0'))
  }

//this adds 1 to cart counter and localStorage 'cartCounter'
  $('.button-div button').on('click', function() {

    var counter = parseInt($('.shop-counter').text());
    counter += 1;
    localStorage.setItem('cartCounter', counter);
   $('.shop-counter').text(counter);

//shop counter animation
  $('.shop-counter').animate({width: '30px', height: '30px'},{ duration: 300, complete: function() {$('.shop-counter').animate({width: '20px', height: '20px'},{duration: 300})
      }
    })
  });


  //cart img click opens checkout page
  $('.shopping-cart').on('click', function(){

    window.open("./checkout.html", "_self")

  });

});
