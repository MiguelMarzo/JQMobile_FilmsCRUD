$(function () {
    // Se define objeto de aplicación
    var MoviesDatabase = {};
    // variables para la conexión con la base de datos
    var dbMoviesDatabase;
    var dbName = "MoviesDatabase";
    var dbVersion = 1;
    var pgtransition = 'slide';
    /// INI EJECUCIÓN de FUNCIÓN PRINCIPAL
    (function (app) {
        // Definición de variables
        var MovieLi = '<li><a data-id="Z2"><h2>Z1</h2><p>DESCRIPTION</p><p><span class="ui-li-count">COUNTBUBBLE</span></p></a></li>';
        var MovieLiRi = '<li><a data-id="Z2">Z1</a></li>';
        var MovieHdr = '<li data-role="list-divider">Your Movies</li>';
        var noMovie = '<li id="noMovie">You have no movies</li>';
        // … Todo el código de la aplicación va aquí

        getMovieHdr = function () {
            return MovieHdr;
        }
        getNoMovie = function () {
            return noMovie;
        }
        app.init = function () {
            // INI INICIALIZACIÓN DEL MODELO
            var request = indexedDB.open(dbName, dbVersion);
            //verificar si es necesaria una actualización debido a cambio de versión de la base de datos
            request.onupgradeneeded = function (e) {
                var thisDB = e.target.result;
                var store = null;
                // Generación de las tablas necesarias para la base de datos
                if (!thisDB.objectStoreNames.contains("Movie")) {
                    // Generación de la clave primaria (objeto almacenado) accesible a través  de MovieName
                    store = thisDB.createObjectStore("Movie", { keyPath: "MovieName" });
                }
            };
            // Conexión exitosa con la base de datos
            request.onsuccess = function (e) {
                dbMoviesDatabase = e.target.result;
            }
            // FIN INICIALIZACIÓN DEL MODELO

            // INI CONTROLADOR
            // Función encargada de la gestión de los eventos de usuario
            MaquinaEstados.MovieBindings();
            // FIN CONTROLADOR

            /// INI Gestión de mensaje alerta
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
                // Redirecciona a la página anterior depues de realizar el borrado del registro
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
            /// FIN Gestión de mensaje alerta

        };
        /// FIN EJECUCIÓN de FUNCIÓN PRINCIPAL

        /// FIN LÓGICA: Implementa la gestión del modelo de datos a partir de las accciones de usuario obtenidas desde el control
        app.init();

    })(MoviesDatabase);
    getDatabase = function () {
        return dbMoviesDatabase;
    }
    getPgTransition = function () {
        return pgtransition;
    }

});

