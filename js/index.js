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
$("#facil").on("click", function() {
  cantIntentos = 18;
  $(".intentos").append(cantIntentos);
  $("#nivel").append("FACIL");
})
$("#inter").on("click", function() {
  cantIntentos = 12;
  $(".intentos").append(cantIntentos);
  $("#nivel").append("INTERMEDIO");
})
$("#dificil").on("click", function() {
  cantIntentos = 9;
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
    unichancho, 
    unichancho, 
    alce, 
    alce, 
    epelante, 
    epelante, 
    nena, 
    nena, 
    peces, 
    peces,
    zapas,
    zapas
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
//si clicks==1, guardo los datos de la pieza en el objeto "primerClick"
  if (clicks == 1) {
    primerClick.img =$(this).attr('data-imagen');
    primerClick.id =$(this).attr('id');
    console.log(primerClick)
    console.log("lo de arriba es el primer Click")
  } else if (clicks == 2) {
//si clicks==2, guardo los datos de la pieza en el objeto "segundoClick"
//Incrementa la variable intentos
      intentosActuales = intentosActuales + 1;
      segundoClick.img = $(this).attr('data-imagen');
      segundoClick.id = $(this).attr('id');
      if (primerClick.img == segundoClick.img && primerClick.id == segundoClick.id) {
//si se clickea dos veces la misma pieza, clicks=1 y se resetean los valores de "segundoClick"
//decrementa la variable intentos
        intentosActuales = intentosActuales - 1;
        console.log("misma pieza")
        console.log(clicks)
        clicks = clicks - 1;
        segundoClick.img = null;
        segundoClick.id = null;
        intentosActuales = intentosActuales - 1;
        console.log(clicks)
        console.log(segundoClick)
        console.log("lo de arriba es el segundo Click")
        console.log("clicks será 1 y se resetea el segundo objeto")
      } else if (primerClick.img != segundoClick.img && primerClick.id != segundoClick.id){
//si la pieza clickeada es distinta a la anterior, clicks=2.
//Es un intento fallido y se resetean los valores de ambos objetos y de clicks.
//Incrementa la variable intentos
        //clicks = 2;
        console.log(clicks)
        console.log("distintas")
        console.log(segundoClick)
        console.log("lo de arriba es el segundo Click")
        clicks = 0;
        console.log(clicks)
        console.log("un intento(fail), se resetea clicks y los dos objetos")
        primerClick.img = null;
        primerClick.id = null;
        segundoClick.img = null;
        segundoClick.id = null;
        console.log(primerClick)
        console.log(segundoClick)
        
      } else if (primerClick.img == segundoClick.img && primerClick.id != segundoClick.id) {
//si la pieza clickeada tiene la misma img pero distinto id, clicks=2.
//Es un match y se resetean los valores de ambos objetos y de clicks
//Incrementa la variable intentos
        //clicks = 2;
        console.log("match")
        console.log(clicks)
        clicks = 0;
        primerClick.img = null;
        primerClick.id = null;
        segundoClick.img = null;
        segundoClick.id = null;
        console.log(clicks)
        console.log(primerClick)
        console.log(segundoClick)
        console.log("un intento(win), se resetea clicks y los dos objetos")
      }
      
    }
})