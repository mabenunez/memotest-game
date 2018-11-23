var jugadorName = $("#input-nombre").val();

var cantIntentos;
var nivelJugado;
// INPUT NOMBRE MSJ DE ERROR
$(".orange-button").on("click", function () {
  if ($("#input-nombre").val() === "") {
      $("#error-msj").removeClass("hidden");
      setTimeout(function () {
        $("#error-msj").addClass("hidden");
      }, 3000);  
  } else {
      $("#error-msj").addClass("hidden");
      $(".presentacion").addClass("hidden");
      $(".juego").removeClass("hidden");
//SE MUESTRA EL VALOR DEL INPUT COMO EL JUGADOR
      $("#p-jugador").append("<span>" + " " + $("#input-nombre").val() + "</span>");
  }
})

//NIVELES:
$("#facil").on("click", function() {
  cantIntentos = 18;
  nivelJugado = "FÁCIL"
  $(".intentos").append(cantIntentos);
  $("#nivel").append(nivelJugado);
})
$("#inter").on("click", function() {
  cantIntentos = 12;
  nivelJugado = "INTERMEDIO"
  $(".intentos").append(cantIntentos);
  $("#nivel").append(nivelJugado);
})
$("#dificil").on("click", function() {
  cantIntentos = 9;
  nivelJugado = "EXPERTO"
  $(".intentos").append(cantIntentos);
  $("#nivel").append(nivelJugado);
})

//CREO UN ARRAY CON LAS IMAGENES
var unichancho = "../img/unichancho.jpg";
var alce = "../img/alce.jpg";
var epelante = "../img/epelante.jpg";
var nena = "../img/nena.jpg";
var peces = "../img/peces.jpg";
var zapas = "../img/zapas.jpg";
var pinia = "../img/tapada.jpg";
var arr = [
    unichancho, unichancho, 
    alce, alce, 
    epelante, epelante, 
    nena, nena, 
    peces, peces,
    zapas, zapas
];
var n = arr.length;
var arrayRandom = [];
//PUSHEO LOS INDICES EN POSICIONES RANDOM EN UN ARRAY VACIO
for ( var i = 0; i < n-1; i++ ) {
  arrayRandom.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);
}
arrayRandom.push(arr[0]);
arr = arrayRandom;

//AGREGO UN ATRIBUTO ID Y UNO  DATA- A TODAS LAS IMG DEL HTML, QUE CONTENDRÁ UN INDICE DEL ARRAY DE IMAGENES 
var imgsLength = $('.img-ficha').length;
for (var i = 0; i < imgsLength; i++) {
  $('.img-ficha').eq(i).attr('data-imagen', arrayRandom[i]);
  $('.img-ficha').eq(i).attr('id', i);
}
var clicks = 0;
var intentosActuales = 0;
var match = 0;
var primerClick = {
  id : null,
  img : null
};
var segundoClick = {
  id : null,
  img : null
};

$('.img-ficha').on('click', function() {
  clicks = clicks + 1;
  
//HAGO QUE LA SRC DE LA IMG SEA IGUAL A EL VALOR DE DATA-IMAGEN
   
  if (clicks == 1) {
    $(this).addClass("flip")//MEJORAR ESTA LOGICA O METER EN FUNCION
    var visible = $(this).attr('data-imagen');//MEJORAR ESTA LOGICA O METER EN FUNCION
    $(this).attr('src', visible);//MEJORAR ESTA LOGICA O METER EN FUNCION
    primerClick.img =$(this).attr('data-imagen');
    primerClick.id =$(this).attr('id');
  } else if (clicks == 2) {
    

      $(this).addClass("flip")//MEJORAR ESTA LOGICA O METER EN FUNCION
      var visible = $(this).attr('data-imagen');//MEJORAR ESTA LOGICA O METER EN FUNCION
      $(this).attr('src', visible);//MEJORAR ESTA LOGICA O METER EN FUNCION

      $("#intentos").html("");
      intentosActuales = intentosActuales + 1;
      segundoClick.img = $(this).attr('data-imagen');
      segundoClick.id = $(this).attr('id');
      $("#intentos").append(intentosActuales);
      if (primerClick.img == segundoClick.img && primerClick.id == segundoClick.id) {
        intentosActuales = intentosActuales - 1;
        clicks = clicks - 1;
        segundoClick.img = null;
        segundoClick.id = null;
      } else if (primerClick.img != segundoClick.img && primerClick.id != segundoClick.id){
        cantIntentos = cantIntentos - 1;
        

        setTimeout(function () {
          $("#" + primerClick.id).removeClass("flip")
          $("#" + segundoClick.id).removeClass("flip")
        }, 1500);
        setTimeout(function () {
          $("#" + primerClick.id).attr("src", "../img/tapada.jpg").addClass("flip")
          $("#" + segundoClick.id).attr("src", "../img/tapada.jpg").addClass("flip")


          // setTimeout(function () {
            $("#" + primerClick.id).removeClass("flip")
          $("#" + segundoClick.id).removeClass("flip")
          // },)
          //TENGO QUE REMOVER LA CLASE FLIP DE NUEVOOOOOOOO
          primerClick.img = null;
          primerClick.id = null;
          segundoClick.img = null;
          segundoClick.id = null;
          clicks = 0;
        }, 1515); 




      } else if (primerClick.img == segundoClick.img && primerClick.id != segundoClick.id) {
        cantIntentos = cantIntentos - 1;
      
        $("#" + primerClick.id).addClass("gray-scale")
        $("#" + segundoClick.id).addClass("gray-scale")
        match = match + 1;
        clicks = 0;
        primerClick.img = null;
        primerClick.id = null;
        segundoClick.img = null;
        segundoClick.id = null;
        


        

        
      }
      if (match == 6 && cantIntentos >= 0) {
        match = 0;
        $("#modal").removeClass("hidden");
        $(".intentos-final").append(intentosActuales);
        var obj = {
          nombre: $("#input-nombre").val(),
          nivel: nivelJugado,
          intentos: intentosActuales,
        }
        var winners = localStorage.getItem("winners")
        if (winners == null) {
          winners=[]
        } else {
            winners = JSON.parse(winners)
        } 
        winners.push(obj);
        localStorage.setItem('winners', JSON.stringify(winners))
        

        for (var i = 0; i < winners.length; i++) {
          $("#nombre-jugador").append(`<div><p>${winners[i].nombre}</p></div>`);
          $("#nivel-jugador").append(`<div><p>${winners[i].nivel}</p></div>`);
          $("#intentos-jugador").append(`<div><p>${winners[i].intentos}</p></div>`);
        }
        $(".play-again").on("click", function() {
          location.reload();
        })

      } else if (match < 6 && cantIntentos <= 0) {
        $("#modal-perdiste").removeClass("hidden");
        $(".play-again").on("click", function() {
          location.reload();
        })
      }
    }
})


