// INPUT NOMBRE MSJ DE ERROR
$(".orange-button").on("click", function () {
    if ($("#input-nombre").val() === "") {
        $("#error-msj").removeClass("hidden");
    } else {
        $("#error-msj").addClass("hidden");
        $(".presentacion").addClass("hidden");
        $(".juego").removeClass("hidden");
//SE MUESTRA EL VALOR DEL INPUT COMO EL JUGADOR
        var jugador = $("#input-nombre").val();
        $("#p-jugador").append("<span>" + " " + jugador + "</span>");
    }
})
