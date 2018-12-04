var jugadorName = $("#input-nombre").val();

//Pantalla de inicio
$(".nivel-btn").on("click", function () {
  if ($("#input-nombre").val() === "") {
      $("#error-msj").removeClass("hidden");
      setTimeout(function () {
        $("#error-msj").addClass("hidden");
      }, 3000);  
  } else {
      $("#error-msj").addClass("hidden");
      $(".presentacion").addClass("hidden");
      $(".juego").removeClass("hidden");
      $("#p-jugador").append("<span>" + " " + $("#input-nombre").val() + "</span>");
  }
})
//Definición de niveles:
var cantIntentos;
var nivelJugado;
function validNivel (a,b) {
  cantIntentos = a;
  nivelJugado = b;
  if ($(".intentos").html() == "" && $(".intentos").html() == "") {
    $(".intentos").append(cantIntentos);
    $("#nivel").append(nivelJugado);
  }
}
$("#facil").on("click", function() {
  validNivel(18, "FÁCIL");
})
$("#inter").on("click", function() {
  validNivel(12, "INTERMEDIO");
})
$("#dificil").on("click", function() {
  validNivel(9, "EXPERTO");
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
function emptyObj(c) {
  c.img = null;
  c.id = null
}
$('.img-ficha').on('click', function() {
  clicks++;

  if (clicks == 1) {
    $(this).addClass("flip")//
    var visible = $(this).attr('data-imagen');//
    $(this).attr('src', visible);//

    primerClick.img =$(this).attr('data-imagen');
    primerClick.id =$(this).attr('id');
  } else if (clicks == 2) {
    $(this).addClass("flip")//
    var visible = $(this).attr('data-imagen');//
    $(this).attr('src', visible);//

    $("#intentos").html("");
    intentosActuales++;
    segundoClick.img = $(this).attr('data-imagen');
    segundoClick.id = $(this).attr('id');
    $("#intentos").append(intentosActuales);
    if (primerClick.img == segundoClick.img && primerClick.id == segundoClick.id) {
      intentosActuales--;
      clicks--;
      emptyObj(segundoClick);
    } else if (primerClick.img != segundoClick.img && primerClick.id != segundoClick.id){
      cantIntentos--;
//HELP. estos setTimeout para agregar y remover la clase "flip" son horribles.
      setTimeout(function () {
        $("#" + primerClick.id).removeClass("flip")
        $("#" + segundoClick.id).removeClass("flip")
      }, 1500);
      setTimeout(function () {
        $("#" + primerClick.id).attr("src", "../img/tapada.jpg").addClass("flip")
        $("#" + segundoClick.id).attr("src", "../img/tapada.jpg").addClass("flip")
        emptyObj(primerClick);
        emptyObj(segundoClick);
        clicks = 0;
      }, 1515); 
      setTimeout(function () {
        for (let i = 0; i < $('.img-ficha').length; i++) {
          if ($('.img-ficha').eq(i).hasClass("flip")) {
            if ($('.img-ficha').eq(i).hasClass("gray-scale")){
              console.log("hola")
            }else {
              $('.img-ficha').eq(i).removeClass("flip")
            } 
          }
        }
      }, 1900);
    } else if (primerClick.img == segundoClick.img && primerClick.id != segundoClick.id) {
      cantIntentos --;
      match++;
      $("#" + primerClick.id).addClass("gray-scale").off();
      $("#" + segundoClick.id).addClass("gray-scale").off();
      clicks = 0;
      emptyObj(primerClick);
      emptyObj(segundoClick);
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
      var winners = localStorage.getItem("winners");
      if (winners == null) {
        winners=[];
      } else {
          winners = JSON.parse(winners);
      } 
      winners.push(obj);
      localStorage.setItem('winners', JSON.stringify(winners));
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