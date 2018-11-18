
/*
SOLUCION JUANI
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12]
//i = 11
//j = 8
//x = 12
//arr[11] = 9 -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 9]
//arr[8] = 12 ->  [1, 2, 3, 4, 5, 6, 7, 8, 12, 10 ,11, 9]

//[1, 2, 3, 4, 5, 6, 7, 8, 12, 10 ,11, 9]
// i = 10
//j = 3
//x = 11
//arr[10] = 4 -> [1, 2, 3, 4, 5, 6, 7, 8, 12, 10 ,4 , 9]
//arr[3] = 11 -> [1, 2, 3, 11, 5, 6, 7, 8, 12, 10 ,4 , 9]

function shuffle(arr) {
  var j
  var x
  var i
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
  }
  return a;
}





SOLUCION INTERNET
  var arr = ['apple','cat','Adam','123','Zorro','petunia']; 
  var n = arr.length;
  var tempArr = [];
  for ( var i = 0; i < n-1; i++ ) {
    // The following line removes one random element from arr
    // and pushes it onto tempArr
    tempArr.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);
  }
  // Push the remaining item onto tempArr
  tempArr.push(arr[0]);
  arr=tempArr;


*/



// //en vez de esto:
// array.sort(function (a, b) {
//     if (a < b) {
//        return -1 
//     } else if (b < a) {
//         return 1
//     } else {
//         return 0
//     }
// })
// //esto:
// array.sort(function (a, b) {
//     return Math.random() - 0.5
// })

/*
<div class="ficha">
    <div>
        <img src="../img/tapada.jpg" alt="">
    </div>
    <div>
        <img src="" alt="">
    </div>
</div>
*/





// /*
// MEMOTEST
// -Cada nivel cuenta con una cantidad de movimientos determinados.
// **crear variable cantidad de intentos actual
// **cuando hacemos clic en dos piezas distintas
// **deberia poder hacerse SOLO un clic por pieza en cada movimiento
// **una variable que sea global que sea el numero de movimientos y va a declararse su valor segun el nivel de dificultad
// **Cada pieza podria ser un objeto que tiene varias propiedades
// **cada pieza lleva un identificador unico
// **cada pieza lleva una clase .pieza
// **validar 

// **Cada uno delos niveles se declara con un for
//   `el numero de intentos y ser incremental cada vez que se hacen click en dos piezas(en un par, sea igual o no)
// -Las piezas ya encontradas deben permanecer dadas vuelta.
// -Al finalizar el juego nos tiene que aparecer:
//   `si ganamos o perdimos
//   `en que cantidad de intentos lo hicimos
//   `el boton de volver a jugar
//   `un ranking donde guarde el nombre, el nivel e intentos, el cual pueda verse cada vez que finalizo el juego.
//   el ranking tiene que ser un array y tiene ir con .sort

// pieza (objeto) {
//     img: link.png
//     id:

// }

// $(".pieza").on("click", funcion () {
//     clics = clic + 1
//     if (clic == 2) {
//         COMPARAR PIEZA CLICK 1 CON PIEZA CLICK 2
//         HACER COSAS DEPENDIENDO LA COMPARACION
//         RESETEAR PIEZA 1 Y PIEZA 2
//     } ELSE IF (CLIC == 1) {
//         GUARDAR PIEZA DEL CLICK EN VAR PIEZA 2
//     } ELSE {
//         GUARDAR EN PIEZA 1
//     }
// })

// */



//THIS WORKS
// var clicks = 0
// var primerClick
// $('.img-ficha').on('click', function() {
//   clicks = clicks + 1
// //HAGO QUE LA SRC DE LA IMG SEA IGUAL A EL VALOR DE DATA-IMAGEN
//   var visible = $(this).attr('data-imagen');
//   $(this).attr('src', visible);
//   if (clicks == 1) {
//     primerClick = $(this)

//   } else if (clicks == 2) {
//     segundoClick = $(this)
//     if (primerClick.attr("src") ==segundoClick.attr("src")) {
//       console.log("qertuio")
//     }
//     clicks = 0;
//   }

// })
// $('.img-ficha').on('click', function() {
//   clicks = clicks + 1
//   //HAGO QUE LA SRC DE LA IMG SEA IGUAL A EL VALOR DE DATA-IMAGEN
//   var visible = $(this).attr('data-imagen');
//   $(this).attr('src', visible);
//   //DOS CLICKS
//   if (clicks == 1) {
//     var id = $(this).attr('id')
//     var img = $(this).attr('data-img')
//     primerClick = {
//       id: id,
//       img: img
//     }
//   } else {
//     if (primerClick.img == $(this).attr('data-img')) {
      
//     } else {
//       console.log('distintas')
//     }
//     //COMPARACION
//     clicks = 0
//   }
// })