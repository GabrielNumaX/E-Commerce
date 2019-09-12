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

          Object.keys(obj[i]).forEach(function(key) {
             // REMEMBER THIS
             // console.log('key ' + key)
             // console.log('value ' + myJson[i][key]);
             // console.log(myJson[i]) //PRINTS WHOLE OBJECT
             //THIS IS FOR ACCESSING THE INDEX AND THE VALUE WITH THE KEY
             //console.log(myJson[0].brand);
            //aca irian los if
            if(key === 'isAccessory' && obj[i][key] === false){

                clothDivContAdd();

                $(newDiv).attr('id', obj[i].id);

                imgCloth = document.createElement('img');

                $(imgCloth).attr('class', 'clothes-img');

                $(imgCloth).attr('src', obj[i].preview);

                titleCloth = document.createElement('h4');

                $(titleCloth).attr('class', 'clothes-title');

                $(titleCloth).text(obj[i].name);

                brandCloth = document.createElement('p');

                $(brandCloth).attr('class', 'clothes-brand');

                $(brandCloth).text(obj[i].brand);

                priceCloth = document.createElement('h3');

                $(priceCloth).text('$ ' + obj[i].price);

                $(newDiv).append(imgCloth, titleCloth, brandCloth, priceCloth);

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
              //aca irian los if
              if(key === 'isAccessory' && obj[i][key] === true){

                  accDivContAdd();

                  $(newDiv).attr('id', obj[i].id);

                  imgCloth = document.createElement('img');

                  $(imgCloth).attr('class', 'clothes-img');

                  $(imgCloth).attr('src', obj[i].preview);

                  titleCloth = document.createElement('h4');

                  $(titleCloth).attr('class', 'clothes-title');

                  $(titleCloth).text(obj[i].name);

                  // console.log(titleCloth + ' TITLE');

                  brandCloth = document.createElement('p');

                  $(brandCloth).attr('class', 'clothes-brand');

                  $(brandCloth).text(obj[i].brand);

                  priceCloth = document.createElement('h3');

                  $(priceCloth).text('$ '+ obj[i].price);

                  $(newDiv).append(imgCloth, titleCloth, brandCloth, priceCloth);

                  // console.log(newDiv);
              }
            });
          }
        }


  $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product',
    function(data, status) {

      fillClothDiv(data);

      fillAccDiv(data);

        //this is to open CLOTH products.html from imgs
        $('#clothes-div-container').on('click', '.clothes-div', function() {
          // console.log('done');
          // console.log(data);
          // REMEMBER THIS
          // console.log('key ' + key)
          // console.log('value ' + myJson[i][key]);
          // console.log(myJson[i]) //PRINTS WHOLE OBJECT
          //THIS IS FOR ACCESSING THE INDEX AND THE VALUE WITH THE KEY
          //console.log(myJson[0].brand);
          var id = $(this).attr('id');
          //ALSO
          //var id = $(this).prop('id');

          for(var i=0; i < data.length; i++) {

            Object.keys(data[i]).forEach(function(key) {

              if(id === data[i].id){

                window.open("./product.html", "_self")

              }


             });
           }
        });

        $('#acc-div-container').on('click', '.clothes-div', function() {
          // console.log('done');
        });



  });





}); //end of JQUERY
