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
      var jugador = $("#input-nombre").val();
      $("#p-jugador").append("<span>" + " " + jugador + "</span>");
  }
})

//NIVELES:
var cantIntentos;
var nivelJugado;
$("#facil").on("click", function() {
  cantIntentos = 18;
  nivelJugado = "FÁCIL"
  $(".intentos").append(cantIntentos);
  $("#nivel").append("FÁCIL");
})
$("#inter").on("click", function() {
  cantIntentos = 12;
  nivelJugado = "NTERMEDIO"
  $(".intentos").append(cantIntentos);
  $("#nivel").append("INTERMEDIO");
})
$("#dificil").on("click", function() {
  cantIntentos = 9;
  nivelJugado = "EXPERTO"
  $(".intentos").append(cantIntentos);
  $("#nivel").append("EXPERTO");
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
  $(this).addClass("flip")
  clicks = clicks + 1;
//HAGO QUE LA SRC DE LA IMG SEA IGUAL A EL VALOR DE DATA-IMAGEN
  var visible = $(this).attr('data-imagen');
  $(this).attr('src', visible);
   
  if (clicks == 1) {
    primerClick.img =$(this).attr('data-imagen');
    primerClick.id =$(this).attr('id');
  } else if (clicks == 2) {
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
        clicks = 0;
        setTimeout(function () {
          $("#" + primerClick.id).removeClass("flip")
          $("#" + segundoClick.id).removeClass("flip")
        }, 1500);
        setTimeout(function () {
          $("#" + primerClick.id).attr("src", "../img/tapada.jpg").addClass("flip")
          $("#" + segundoClick.id).attr("src", "../img/tapada.jpg").addClass("flip")
          //TENGO QUE REMOVER LA CLASE FLIP DE NUEVOOOOOOOO
          primerClick.img = null;
          primerClick.id = null;
          segundoClick.img = null;
          segundoClick.id = null;
        }, 1515); 
      } else if (primerClick.img == segundoClick.img && primerClick.id != segundoClick.id) {
        $("#" + primerClick.id).addClass("gray-scale")
        $("#" + segundoClick.id).addClass("gray-scale")
        match = match + 1;
        clicks = 0;
        primerClick.img = null;
        primerClick.id = null;
        segundoClick.img = null;
        segundoClick.id = null;
        console.log(match)
        if (match == 6) {
          $("#modal").removeClass("hidden");
          $(".intentos-final").append(intentosActuales);
          $(".name-player").append($("#input-nombre").val());//AQUI NO ME FUNCIONA LA VARIABLE JUGADOR DEFINIDA AL PRINCIPIO
          $(".nivel-jugado").append(nivelJugado);
        }
      } 
    }
})

/*
    <div id="modal" class="hidden">
        <div class="sheer-pink">
        </div> 
        <div class="card-tabla">
            <p>GANASTE 🎉! con <span id=""></span>intentos.</p>
            <p>Ya podés volver a jugar</p>
            <button>VOLVER A JUGAR</button>
            <div class="tabla">
                <div class= "modulo-tabla">
                    <p>NOMBRE</p>
                    <!-- <p>NOMBRE DEL JUGADOR APPENDEADO</p> -->
                </div>
                <div class= "modulo-tabla">
                    <p>NIVEL</p>
                    <!-- <p> el id de orange-button  APPENDEADO</p> -->
                </div>
                <div class= "modulo-tabla">
                    <p>INTENTOS</p>
                    <!-- <p>intentosActuales APPENDEADO</p> -->
                </div>
            </div>
        </div>
    </div>
*/