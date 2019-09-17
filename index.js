$(document).ready(function(){
  $('.carousal-container').slick({
    autoplay: true,
	  autoplaySpeed: 1200,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slideToScroll: 4,
    speed: 2000,
    arrows: false,
  });
  console.log('carousal loaded')


//this check for cart and sets values from localStorage
  if(!localStorage.getItem('cartCounter')){
    var counter = 0;
    $('.shop-counter').text(counter);

    localStorage.setItem('cartCounter', counter);
  }
  else {
    $('.shop-counter').text(localStorage.getItem('cartCounter'))
  }
    //
    // for(var i=0; i <myJson.length; i++) {
    //
    //   Object.keys(myJson[i]).forEach(function(key) {
    //
    //     // console.log('key ' + key)
    //     // console.log('value ' + myJson[i][key]);
    //   });
    // }

//LOGICA: primero se lee el JSON de la API
//luego con esos datos se filtra y crean los elementos
//para CLOTHES y ACCESSORIES en base a "isAccessory"
//0 - agregar class clothes-div
//1 - agregar id de nro de "id" al newDiv
//2 - agregar desc de "name"
//3 - agregar brand de "brand"
//4 - agregar price de "price"
//CADA elemento debe tener la class para
//que tenga el CSS

var newDiv;
var anchorImg;
var imgCloth;
var titleCloth;
var brandCloth;
var priceCloth;

  function clothDivContAdd() {

    newDiv = document.createElement('div');
    newDiv.classList.add('clothes-div');
    // newDiv.innerHTML = 'NEW DIV';

    $('#clothes-div-container').append(newDiv);
    // console.log('divAdd');

  }

  function accDivContAdd() {

    newDiv = document.createElement('div');
    newDiv.classList.add('clothes-div');

    $('#acc-div-container').append(newDiv);
  }


//en param iria data el json del ajax
    function fillClothDiv(obj) {

        for(var i=0; i < obj.length; i++) {
          // console.log('index ' + obj[i]);
          //there's a better way to do this -> obj[i].key
          Object.keys(obj[i]).forEach(function(key) {
             // REMEMBER THIS
             // console.log('key ' + key)
             // console.log('value ' + myJson[i][key]);
             // console.log(myJson[i]) //PRINTS WHOLE OBJECT
             //THIS IS FOR ACCESSING THE INDEX AND THE VALUE WITH THE KEY
             //console.log(myJson[0].brand);
            //aca irian los if -> isAccesory = false
            if(key === 'isAccessory' && obj[i][key] === false){

                clothDivContAdd();

                $(newDiv).attr('id', obj[i].id);

                //this was added LATER to create dynamic links
                anchorImg = document.createElement('a');

                $(anchorImg).attr('href', './product.html?id='+obj[i].id);
                //this was added LATER to create dynamic links

                imgCloth = document.createElement('img');

                $(imgCloth).attr('class', 'clothes-img');

                $(imgCloth).attr('src', obj[i].preview);

                //this is to append the cloth img into the anchor tag
                anchorImg.appendChild(imgCloth);

                titleCloth = document.createElement('h4');

                $(titleCloth).attr('class', 'clothes-title');

                $(titleCloth).text(obj[i].name);

                brandCloth = document.createElement('p');

                $(brandCloth).attr('class', 'clothes-brand');

                $(brandCloth).text(obj[i].brand);

                priceCloth = document.createElement('h3');

                $(priceCloth).text('$ ' + obj[i].price);

                //elements appended are on the same level
                $(newDiv).append(anchorImg, titleCloth, brandCloth, priceCloth);

                // console.log(newDiv);

            }
          });
        }
      }

//this creates the ACCESORIES divs
//var's and classes have been reused
      function fillAccDiv(obj) {

          for(var i=0; i < obj.length; i++) {
            // console.log('index ' + obj[i]);

            Object.keys(obj[i]).forEach(function(key) {
               // REMEMBER THIS
               // console.log('key ' + key)
               // console.log('value ' + myJson[i][key]);
               // console.log(myJson[i]) //PRINTS WHOLE OBJECT
               //THIS IS FOR ACCESSING THE INDEX AND THE VALUE WITH THE KEY
               //console.log(myJson[0].brand);
              //aca irian los if -> isAccesory : true
              if(key === 'isAccessory' && obj[i][key] === true){

                  accDivContAdd();

                  $(newDiv).attr('id', obj[i].id);

                  //this was added LATER to create dynamic links
                  anchorImg = document.createElement('a');

                  $(anchorImg).attr('href', './product.html?id='+obj[i].id);
                  //this was added LATER to create dynamic links

                  imgCloth = document.createElement('img');

                  $(imgCloth).attr('class', 'clothes-img');

                  $(imgCloth).attr('src', obj[i].preview);

                  //this is to append the cloth img into the anchor tag
                  anchorImg.appendChild(imgCloth);

                  titleCloth = document.createElement('h4');

                  $(titleCloth).attr('class', 'clothes-title');

                  $(titleCloth).text(obj[i].name);

                  brandCloth = document.createElement('p');

                  $(brandCloth).attr('class', 'clothes-brand');

                  $(brandCloth).text(obj[i].brand);

                  priceCloth = document.createElement('h3');

                  $(priceCloth).text('$ '+ obj[i].price);

                  //appended elements are on the same level
                  $(newDiv).append(anchorImg, titleCloth, brandCloth, priceCloth);

                  // console.log(newDiv);
              }
            });
          }
        }


//access api/executes func to dynamic loading|listen to click
//to open link
  $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product',
    function(data, status) {
      fillClothDiv(data);
      fillAccDiv(data);

      //here was a function to create dynamic link that were
      //later used in window.open ('url' '_self')
      //BAD LOGIC
      //instead I created dynamic anchor tags with dymanic links

  }); //end GET

//now POST to get params from API and load dynamic link
//
//Listen to ART or ACC
//get ID
//execute GET with ID
//CREATE DYNAMIC LINK
//OPEN in WINDOW
//CREATE ELEMENTS

  // $('#clothes-div-container').on('click', '.clothes-div', function() {
  //     //this gets the id
  //     var id = $(this).attr('id');
  //
  //     $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/'+id, function(data, status) {
  //
  //       var dynamicLink = './products/'+'?p='+data.id;
  //       console.log(dynamicLink);
  //
  //     });//end post -> PARAM ?p=1
  // });



}); //end of JQUERY
