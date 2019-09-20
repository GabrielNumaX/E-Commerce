$(document).ready(function() {

//this is to store prod obj to use in localStorage
  var currentObj;

  //click on cart go to CHECKOUT.html
  $('.shopping-cart').on('click', function() {

    location.assign('./checkout.html');

  });

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
  $('.shop-counter').animate({width: '30px', height: '30px'},
    { duration: 300, complete:
        function() {$('.shop-counter').animate({width: '20px', height: '20px'},
        {duration: 300})
      }
    })
  });

  /*PRODUCT.HTML logic
  - page LOADS
  - get id from url
  - load API according to id
  - load html from api keys SEE STEPS BELOW*/

//this is to get id from url
var url = location.search;
var idUrl = url.split('=')[1];
//console.log(idUrl); -> 2

$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/'+idUrl,
  function(data, status) {
    //this stores the obj to use in localStorage for prod details
    currentObj = data;
    //here goes the html load functions
    loadAsideImg(data);

    loadMain(data);
  });

//PRODUCT.html
//ASIDE -> prod img from API key-> "preview"

//this loads the prod img according id from API
//LOGIC
//- create img tag
//- asign src from API OBJECT
//- append to ASIDE


  function loadAsideImg(obj){

    $('#aside-img').attr('src', obj.preview);
  }

  //MAIN -> h1 title from API key -> "name"
  //-> h2 brand from API key -> "brand"
  //h3 -> price from API key -> "price"
  //p -> description from API key -> "description"
  //MAIN -> div .prod-box -> div .prod-preview
  //INSIDE .prod-preview CREATE 5 img tags
  //-> img .preview-img -> key "photos" -> array [0,1,2,3,4]

//this loads MAIN -> follows order from above
  function loadMain(obj){

    $('.prod-title').text(obj.name);

    $('.prod-brand').text(obj.brand);

    $('.prod-price').text('$ '+obj.price);

    $('.prod-desc').text(obj.description);

    //the condition is SET to 4 so IT doesn't
    //loads any more img than 5  img
    //index 3 and 4 -> obj.photos not loading
    for(var i = 0; i <= 4; i++){

      var img = document.createElement('img');

      $(img).attr('class', 'preview-img');

      $(img).attr('src', obj.photos[i]);

      // console.log(img);

      //index 3 and 4 -> obj.photos not loading

      $('.prod-preview').append(img);
    }
  }

  //function to display photo from click on
  //.preview-img

  // TO LISTEN ON DYNAMIC ELEMENTS
  // https://youtu.be/Wxnd21_f_pc
  //
  // $('parent').on('click', 'dynamic element' ,function() {
	//    $(this).
  //  });

  $('.prod-preview').on('click', '.preview-img', function() {
    // //load on 'aside-pic img' src the '.preview-img' src

    imgSrc = $(this).attr('src');

    $('#aside-img').attr('src', imgSrc);

  }); //end function load preview img

  //here LISTEN ADD TO CART BUTTON
  //save -> total items
  //SAVE prodObj with Count
  //-> quantity
  //-> price
  //-> prod id
  //-> prod title
  //si NO esta localStorage('prodList')
  //crea una list con el currentObj
  //crea el counter = 1 en currentObj
  //push el currentObj a la list
  //pasa como stringify la list al localStorage
  //si SI ESTA
  //checkear por id en localStorage('prodList')
  //con ese ID busca el counter en localStorage('prodList')
  //incrementa el counter +1 en localStorage('prodList')

  $('.button-div button').on('click', function() {

    // if(!localStorage.getItem('prodList')){
    //
    //   productList = [];
    //   currentObj.count = 1;
    //   // console.log(currentObj);
    //   productList.push(currentObj);
    //   localStorage.setItem('prodList', JSON.stringify(productList));
    //
    // }
    // else {
    //
    //   //copies the localStorage to the list
    //   productList = JSON.parse(localStorage.prodList);
    //
    //   //updates the list with currentObj
    //   //to search ID in for-if below
    //   productList.push(currentObj);
    //
    //   console.log(productList);
    //
    //
    //   for(var i=0; i<productList.length; i++){
    //     //just == 'cause they are strings
    //     //checks if id its in productList (from localStorage)
    //     //increments counter. Sets productList to localStorage
    //     if(productList[i].id == currentObj.id){
    //
    //       console.log(productList[i]);
    //
    //       productList[i].count += 1;
    //       console.log('inside for-if');
    //       //this is to update localStorage with current list
    //       localStorage.removeItem('prodList');
    //
    //       localStorage.setItem('prodList', JSON.stringify(productList));
    //     }
    //     //id NOT in productList from localStorage
    //     //creates count in OBJ. add OBJ to list.
    //     //Updates localStorage with new list
    //     // else {
    //     //   console.log('inside for-else');
    //     //
    //     //   // prodList[i].id = currentObj.id
    //     //
    //     //   currentObj.count = 1;
    //     //
    //     //   productList.push(currentObj);
    //     //
    //     //   localStorage.removeItem('prodList');
    //     //
    //     //   localStorage.setItem('prodList', JSON.stringify(productList));
    //     //   //withou this breaks ENTERS AGAIN in the ABOVE if
    //     //   break;
    //     // }
    //   } // end for
    // } // end else function

      var productList = localStorage.getItem('prodList');

      //this checks if null or empty and creates or leaves as it is
      productList = productList === null || productList === '' ? [] : productList;

      //this checks NOT empty and parses Array
      productList = productList.length > 0 ? JSON.parse(productList) : [];

      // productList.push(currentObj);
      //
      // //this adds the array into localStorage as STRING
      // localStorage.setItem('prodList', JSON.stringify(productList));
      // // console.log(productList);
      var foundIndex = -1;

      //check for index of list.id
      for(var i = 0; i < productList.length; i++){
        // == 'cause its string OTHER OPTION parseInt()
        if(parseInt(productList[i].id) == parseInt(currentObj.id)){
          foundIndex = i;
        }
      } //end for

      //with the index updates count in list and updates localStorage
      if(foundIndex > -1){
        productList[foundIndex].count += 1;
        localStorage.setItem('prodList', JSON.stringify(productList));
        console.log('found');
      }
      //index NOT found. creates counter. pushes OBJ to list
      //updates localStorage
      else {
        console.log('not found');
        currentObj.count = 1;
        productList.push(currentObj);
        localStorage.setItem('prodList', JSON.stringify(productList));
      }

  }); //end add to cart button function

}); //end JQUERY
