function Index() {

}

/// INI MOSTRAR ELEMENTOS REGISTRADOS EN LISTA DE ELEMENTOS
// Muestra los registros a lo largo de la ejecución de la aplicación.
Index.displayMovie = function (MovieObj) {
    $.mobile.loading("show", {
        text: "Mostrando elementos...",
        textVisible: true,
        textonly: false,
        html: ""
    });
    // Se genera un string vacío para contener la información
    var html = '';
    // Asegurarse de que el iterador está bien definido
    var n;
    // Bucle sobre los registros generador de un elemento cada vez
    // añadir el html generado al final de la lista de elementos
    for (n in MovieObj) {
        // Obtener los detalles de elemento
        var MovieRec = MovieObj[n];
        // Vaciar la llave primiaria
        var pkey = MovieRec.MovieName;
        pkey = pkey.split('-').join(' ');
        MovieRec.MovieName = pkey;
        // Definir una nueva lína de la información obtenida
        var nItem = MovieLi;
        nItem = nItem.replace(/Z2/g, n);
        // Actualizar el título, puede que sea multilínea
        var nTitle = '';
        // Asignar un título vacío
        nTitle = n.split('-').join(' ');
        // Reemplazar el título
        nItem = nItem.replace(/Z1/g, nTitle);
        // Contador númerico de la película
        var nCountBubble = '';
        nCountBubble += MovieRec.MovieYear;
        // reemplazar el contador de elemntos
        nItem = nItem.replace(/COUNTBUBBLE/g, nCountBubble);
        // Actualizr la vista en caso de existir descripción
        var nDescription = '';
        nDescription += MovieRec.MovieGenre;
        // Reemplazar la descripción
        nItem = nItem.replace(/DESCRIPTION/g, nDescription);
        html += nItem;
    }
    // Actualizar la vista con la nueva estructura HTML generada
    $('#pgMovieList').html(MovieHdr + html).listview('refresh');
    $.mobile.loading("hide");
};
/// FIN MOSTRAR ELEMENTOS REGISTRADOS EN LISTA DE ELEMENTOS