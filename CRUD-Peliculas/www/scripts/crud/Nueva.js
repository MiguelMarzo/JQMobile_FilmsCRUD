function Nueva() {

}

Nueva.addMovie = function (MovieRec) {
    $.mobile.loading("show", {
        text: "Obteniendo registro...",
        textVisible: true,
        textonly: false,
        html: ""
    });
    // Limpiar el identificador almacenado con anterioridad
    var MovieName = MovieRec.MovieName;
    MovieName = MovieName.split(' ').join('-');
    MovieRec.MovieName = MovieName;
    // Guardar el objeto JSON en la base de datos
    // definir la transacción a ejecutar
    var tx = getDatabase().transaction(["Movie"], "readwrite");
    // Obtener los objetos para añadir un nuevo elemento
    var store = tx.objectStore("Movie");
    // añadir al almacenamiento de anteriores elementos
    var request = store.add(MovieRec);
    request.onsuccess = function (e) {
        // En caso de éxito en el almacenamiento mostramos un mensaje de notificación al usuario
        alert('Película añadida.', 'PeliBD');
        // Obtener desde la página de la que hemos accedido, en caso de que sea desde la de acceso volvemos a ella
        var pgFrom = $('#pgAddMovie').data('from');
        switch (pgFrom) {
            case "pgSignIn":
                $.mobile.changePage('#pgSignIn', { transition: pgtransition });
                break;
            default:
                // limpiamos los elemntos del formulario
                pgAddMovieClear();
                // Nos mantenemos en la misma página para seguir generando registros
        }
    }
    request.onerror = function (e) {
        // Mostramos un mensaje de notificación de error
        alert('No se ha podido añadir el elemento de manera exitosa.',
       'PeliDB');
    }
    $.mobile.loading("hide");
};
Nueva.pgAddMoviedisplayMovieR = function (MovieObj) {
    $.mobile.loading("show", {
        text: "Displaying records...",
        textVisible: true,
        textonly: false,
        html: ""
    });
    var html = '';
    var n;
    for (n in MovieObj) {
        var MovieRec = MovieObj[n];
        var pkey = MovieRec.MovieName;
        pkey = pkey.split('-').join(' ');
        MovieRec.MovieName = pkey;
        var nItem = getMovieLiRi();
        nItem = nItem.replace(/Z2/g, n);
        var nTitle = '';
        nTitle = n.split('-').join(' ');
        nItem = nItem.replace(/Z1/g, nTitle);
        html += nItem;
    }
}

// Funciones genéricas para añadir elementos:
// - Borrado de la pantalla: Realiza el borrado de los elementos mostrados en el formulario al usuario
// - Obtener valores de la pantalla: Realiza la lectura de los elementos introducidos en el formulario por el usuario
function pgAddMovieClear() {
    $('#pgAddMovieMovieName').val('');
    $('#pgAddMovieMovieYear').val('');
    $('#pgAddMovieMovieGenre').val('');
}
// Obtiene el contenido y genera un objeto para su almacenamiento
function pgAddMovieGetRec() {
    // Definir el nuevo registro
    var MovieRec = {};
    MovieRec.MovieName = $('#pgAddMovieMovieName').val().trim();
    MovieRec.MovieYear = $('#pgAddMovieMovieYear').val().trim();
    MovieRec.MovieGenre = $('#pgAddMovieMovieGenre').val().trim();
    return MovieRec;
}
