$(function () {
    // Se define objeto de aplicaci�n
    var MoviesDatabase = {};
    // variables para la conexi�n con la base de datos
    var dbMoviesDatabase;
    var dbName = "MoviesDatabase";
    var dbVersion = 1;
    var pgtransition = 'slide';
    /// INI EJECUCI�N de FUNCI�N PRINCIPAL
    (function (app) {
        // Definici�n de variables
        var MovieLi = '<li><a data-id="Z2"><h2>Z1</h2><p>DESCRIPTION</p><p><span class="ui-li-count">COUNTBUBBLE</span></p></a></li>';
        var MovieLiRi = '<li><a data-id="Z2">Z1</a></li>';
        var MovieHdr = '<li data-role="list-divider">Your Movies</li>';
        var noMovie = '<li id="noMovie">You have no movies</li>';
        // � Todo el c�digo de la aplicaci�n va aqu�

        getMovieHdr = function () {
            return MovieHdr;
        }
        getNoMovie = function () {
            return noMovie;
        }
        app.init = function () {
            // INI INICIALIZACI�N DEL MODELO
            var request = indexedDB.open(dbName, dbVersion);
            //verificar si es necesaria una actualizaci�n debido a cambio de versi�n de la base de datos
            request.onupgradeneeded = function (e) {
                var thisDB = e.target.result;
                var store = null;
                // Generaci�n de las tablas necesarias para la base de datos
                if (!thisDB.objectStoreNames.contains("Movie")) {
                    // Generaci�n de la clave primaria (objeto almacenado) accesible a trav�s  de MovieName
                    store = thisDB.createObjectStore("Movie", { keyPath: "MovieName" });
                }
            };
            // Conexi�n exitosa con la base de datos
            request.onsuccess = function (e) {
                dbMoviesDatabase = e.target.result;
            }
            // FIN INICIALIZACI�N DEL MODELO

            // INI CONTROLADOR
            // Funci�n encargada de la gesti�n de los eventos de usuario
            MaquinaEstados.MovieBindings();
            // FIN CONTROLADOR

            /// INI Gesti�n de mensaje alerta
            $('#msgboxyes').on('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                // Se almacena el metodo que se ha lanzado en la alerta
                var yesmethod = $('#msgboxyes').data('method');
                // Se almacena la respuesta del usuario
                var yesid = $('#msgboxyes').data('id');
                // Se trasladan estos valores a app 
                app[yesmethod](yesid);
            });
            $('#msgboxno').on('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var nomethod = $('#msgboxno').data('method');
                var noid = $('#msgboxno').data('id');
                var toPage = $('#msgboxno').data('topage');
                // Redirecciona a la p�gina anterior depues de realizar el borrado del registro
                $.mobile.changePage('#' + toPage, { transition: pgtransition });
                app[nomethod](noid);
            });
            $('#alertboxok').on('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var toPage = $('#alertboxok').data('topage');
                // show the page to display after ok is clicked
                $.mobile.changePage('#' + toPage, { transition: pgtransition });
            });
            /// FIN Gesti�n de mensaje alerta

        };
        /// FIN EJECUCI�N de FUNCI�N PRINCIPAL

        /// FIN L�GICA: Implementa la gesti�n del modelo de datos a partir de las accciones de usuario obtenidas desde el control
        app.init();

    })(MoviesDatabase);
    getDatabase = function () {
        return dbMoviesDatabase;
    }
    getPgTransition = function () {
        return pgtransition;
    }

});

