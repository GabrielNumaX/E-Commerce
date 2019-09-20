$(document).ready(function() {

  //this checks for cartCounter in local localStorage
  //and sets value
    if(localStorage.getItem('cartCounter')){
        $('.shop-counter').text(localStorage.getItem('cartCounter'));
    }
    else {                                      //value ALWAYS string
      $('.shop-counter').text(localStorage.setItem('cartCounter', '0'))
    }

    $('#buy-now').on('click', function() {

    });


    $('#buy-now').on('click', function() {

      //this is a template to create OBJECTS
      var orderItemArr = [];

      for(var i = 0; i<productList.length; i++){
        var prodObj = {
          'id': productList[i].id,
          'brand': productList[i].brand,
          'name': productList[i].name,
          'price': productList[i].price,
          'preview': productList[i].preview,
          'isAccesory': productList[i].isAccsesory
        }

        orderItemArr.push(prodObj);
      }

      // //imprime lo del localStorage
      // console.log(productList);
      // //imprime lo que saca de los OBJETOS
      // console.log(orderItemArr);

      dataObj = {
        amount: grandTotal,
        products: orderItemArr //pasa solo lo necesario
      }

      // console.log(dataObj)

      $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', dataObj,
        function() {
          // alert('order placed');

          localStorage.setItem('cartCounter', '0');
          localStorage.setItem('prodList', []);

          location.assign('./confirmation.html');
        });
    }) //end #buy-now function

    //this is TO CHECK localStorage and if true
    //get data and parse it to productList

    var productList = localStorage.getItem('prodList');

    //this checks if null or empty and creates or leaves as it is
    productList = productList === null || productList === '' ? [] : productList;

    //this checks NOT empty and parses Array
    productList = productList.length > 0 ? JSON.parse(productList) : [];

    // console.log(productList);
    var grandTotal = 0;

    for(var i = 0; i < productList.length; i++){
      //this is NOT working
      // $('#checkout-list').append(loadCheckProd(productList[i]));
      loadCheckProd(productList[i]);
      total = (parseFloat(productList[i].count) * parseFloat(productList[i].price));
      grandTotal += total;
    }

    //I created this function first and then realized I can't
    //create amount key in OBJ to POST method for button #buy-now
    loadPrice(productList);

    totalItems(productList);

    //this was to open checkout.html
    //IT IS REQUIRED THAT CHECKOUT LOADS:
    //on aside
    //total Items
    //product-div INSIDE ASIDE with:
    //img - title - prod qty - price (x unit)
    //
    //product price

    //this is for DYNAMIC CONTENT
    // #checkout-list IS PARENT EXISTING ELEMENT
    // <div id="checkout-list" class="side-div">
    // BELOW IS TO CREATE
    // <div class="check-prod-list">
    //   <div class="check-img-div">
    //     <img src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg">
    //   </div>
    //   <div class="check-text-div">
    //     <h3>Title</h3>
    //     <p>Quantity</p>
    //     <h4>Price $</h4>
    //   </div>
    // </div>

    function loadCheckProd(obj) {
      // create card
      newDiv = document.createElement('div');
      newDiv.classList.add('check-prod-list');
      //img div
      imgDiv = document.createElement('div');
      imgDiv.classList.add('check-img-div')
      //img
      newImg = document.createElement('img');
      $(newImg).attr('src', obj.preview);
      //img inside img-div
      $(imgDiv).append(newImg);
      //text-div
      textDiv = document.createElement('div');
      textDiv.classList.add('check-text-div');
      //title
      newH3 = document.createElement('h3');
      $(newH3).html(obj.name);
      //quatity
      newP = document.createElement('p');
      $(newP).html('Quantity: '+ obj.count);
      //price
      newH4 = document.createElement('h4');
      $(newH4).html('Price $'+ obj.price);
      //title,qty,price INSIDE text-div
      $(textDiv).append(newH3, newP, newH4);

      //img-div & text-div INSIDE card
      $(newDiv).append(imgDiv, textDiv);
      //card inside list
      $('#checkout-list').append(newDiv);
    }

    //#total-amount
    //this to calculate total amount from
    //list price and counter
    function loadPrice(list) {

      var count =  0;
      var price = 0;
      var total = 0;

      for(var i = 0; i < list.length; i++){

        count = parseFloat(list[i].count);
        price = parseFloat(list[i].price);

        total += (count * price);
      }

      // console.log('loadPrice');
      return $('#total-amount').html(total);
    }

    function totalItems(list){

      var totalItems = 0;

      for(var i = 0; i < list.length; i++) {

          totalItems += list[i].count;
      }

      return $('.checkout-separate h5').html('Total Items: '+totalItems);
    }
}); //end jquery
