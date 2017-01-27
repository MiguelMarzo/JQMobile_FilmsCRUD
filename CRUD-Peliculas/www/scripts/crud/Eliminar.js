function Eliminar() {

}

/// INI BORRAR ELEMENTO DE BASE DE DATOS
// Borrar un elemento partiendo de su identificador
Eliminar.deleteMovie = function (MovieName) {
    $.mobile.loading("show", {
        text: "Borrando el registro...",
        textVisible: true,
        textonly: false,
        html: ""
    });
    MovieName = MovieName.split(' ').join('-');
    // Definimos la transición a ejecutar
    var tx = dbMoviesDatabase.transaction(["Movie"], "readwrite");
    // Obtenemos el objeto almacenador de elementos de la tabla de base de datos
    var store = tx.objectStore("Movie");
    // Borramos el elemento a partir de su identificador
    var request = store.delete(MovieName);
    request.onsuccess = function (e) {
        // El registro ha sido eliminado de la base de datos
        alert('Película borrada.', 'PeliBD');
        // Mostramos la página con los nuevos elementos
        $.mobile.changePage('#pgMovie', { transition: pgtransition });
    }
    request.onerror = function (e) {
        alert('No se ha eliminado la película, inténtelo otra vez.', 'PeliBD');
        return;
    }
    $.mobile.loading("hide");
};
/// FIN BORRAR ELEMENTO DE BASE DE DATOS