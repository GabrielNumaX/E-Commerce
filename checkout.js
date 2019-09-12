$(document).ready(function() {

  //this checks for cartCounter in local localStorage
  //and sets value
    if(localStorage.getItem('cartCounter')){
        $('.shop-counter').text(localStorage.getItem('cartCounter'));
    }
    else {                                          //value ALWAYS string
      $('.shop-counter').text(localStorage.setItem('cartCounter', '0'))
    }

    $('#buy-now').on('click', function() {

      window.open('./confirmation.html', '_self');

      localStorage.setItem('cartCounter', '0');  
    })

});
