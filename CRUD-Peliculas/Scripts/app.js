$(function () {
    // Se define objeto de aplicaci�n

    // variables para la conexi�n con la base de datos
    var dbMoviesDatabase;

    /// INI EJECUCI�N de FUNCI�N PRINCIPAL
    (function (app) {
        // Definici�n de variables
        /*
            TODO
        */
        app.init = function () {
            // INI INICIALIZACI�N DEL MODELO
            /*
            TODO
            */
            // FIN INICIALIZACI�N DEL MODELO

            // INI CONTROLADOR
            // Funci�n encargada de la gesti�n de los eventos de usuario
            app.MovieBindings();
            // FIN CONTROLADOR

            /// INI Gesti�n de mensaje alerta
            /*
            TODO
            */
            /// FIN Gesti�n de mensaje alerta
        };
        /// FIN EJECUCI�N de FUNCI�N PRINCIPAL

        //*****************************************************************

        /// INI  CONTROL: Enlazar la Vista y la Capa de l�gica : Gesti�n de eventos
        // Funci�n que cumple dos funcionalidades:
        // 1: Antes de cargar la pantalla, analiza la ventara a mostrar al usuario y determina los datos a obtener de base de datos.
        // 2: A lo largo de la ejecuci�n de la p�gina se encarga de enlazar los eventos de usuario con los procedimientos de tratamiento de datos
        app.MovieBindings = function () {
            // 1: Ejecuci�n antes de que se haya cargado la p�gina, previo a mostrar la lista de elementos al usuario
            /*
            TODO
            */
        };

        // 2: Ejecuci�n una vez que se ha cargado la p�gina
        // Establece los eventos para cada una de las p�ginas de la aplicaci�n:
        // - A�adir elementos => ***** Add Page - Ini *****
        // - Mostrar elementos => ***** Listing Page *****
        // - Editar elementos => ***** Edit Page *****

        $(document).on('pagecontainershow', function (e, ui) {
            //***** Add Page - Ini *****
            /// A�adir una nueva pel�cula
            /// Eventos ejecutados desde la p�gina donde se muestra el formulario de inserci�n de valores

            // INI NAV Vuelta atr�s
            // C�digo ejecutado cuando el bot�n de vuelta atr�s es ejecutado desde la p�gina de a�adir nuevo elemento
            // Vuelta atr�s desde A�adir Pel�cula
            $('#pgAddMovieBack').on('click', function (e) {
                /*
                TODO
                */

            });
            // FIN NAV Vuelta atr�s
            // INI NAV Guardar
            // C�digo ejecutado cuando se pulsa el boton de guardar dede la pantalla de A�adir elmento
            $('#pgAddMovieSave').on('click', function (e) {
                /*
                TODO
                */
            });
            // FIN NAV Guardar
            //***** Add Page - End *****

            //***** Listing Page *****
            /// Mostrar pel�culas
            /// Listado de peliculas almacenados en la base de datos

            // C�digo ejecutado cuando se pulsa la visualizaci�n de elmentos
            // Evento click en listado de peliculas
            $(document).on('click', '#pgMovieList a', function (e) {
                /*
                TODO
                */
            });
            // C�digo ejecutado cuando es pulsa sobre boton nuevo en el listado de elementos
            // Click en el bot�n Nuevo desde la pantalla de listado de elementos
            $('#pgMovieNew').on('click', function (e) {
                /*
                TODO
                */
            });
            //***** Listing Page - End *****


            //***** Edit Page *****
            /// Pantalla de edici�n
            /// Pantalla accesible despues de seleccionar un elemento de la lista
            /// Modificamos los valores del elemento a partir del id

            // C�digo ejecutado cuando el boton de vuelta atr�s es pulsado desde la pantalla de edici�n
            // Bot�n Vuelta atr�s pulsado
            $('#pgEditMovieBack').on('click', function (e) {
                /*
                TODO
                */
            });
            // C�digo ejecutado cuando se pulsa el boton de Actualizar elemento
            // Boton de actualizar dede la pantalla de Edici�n
            $('#pgEditMovieUpdate').on('click', function (e) {
                /*
                TODO
                */
            });
            // C�digo ejectuado cuando se pulsa el boton de borrado desde la pantalla de edici�n
            // Click en bot�n de borrado
            $('#pgEditMovieDelete').on('click', function (e) {
                /*
                TODO
                */
                // FIN :: Mostrar mensaje de confirmaci�n

            });

            // Boton de mostrar elementos
            // Click en bton de listado de los elementos almacecnados en la base de datos
            $(document).on('click', '#pgEditMovieRightPnlLV a', function (e) {
                /*
                TODO
                */
            });
            //***** Edit Page - End *****

        });

        /// FIN  CONTROL: Enlazar la Vista y la Capa de l�gia : Gesti�n de eventos

        //*****************************************************************
        /// Una vez que los eventos estan definidos...
        /// Se definen los metodos y procedimientos de acceso a los eventos

        /// INI L�GICA: Implementa la gesti�n del modelo de datos a partir de las accciones de usuario obtenidas desde el control


        // INI ALMACENAR NUEVO ELEMENTO DE IndexedDB
        // Proceso de almacenamiento de nuevos elementosAlmacenar la p�gina de a�adir elementos
        // A�adir un nuevo registro a la base de datos
        app.addMovie = function (MovieRec) {
            /*
            TODO
            */
        };

        // Funciones gen�ricas para a�adir elementos:
        // - Borrado de la pantalla: Realiza el borrado de los elementos mostrados en el formulario al usuario
        // - Obtener valores de la pantalla: Realiza la lectura de los elementos introducidos en el formulario por el usuario
        function pgAddMovieClear() {
            /*
            TODO
            */
        }
        // Obtiene el contenido y genera un objeto para su almacenamiento
        function pgAddMovieGetRec() {
            /*
            TODO
            */
        }
        // FIN ALMACENAR NUEVO ELMENTO DE IndexedDB
        // ********************************************************** 
        // INI ACTUALIZAR UN ELEMENTO DE IndexedDB
        // Proceso de actualizaci�n de los registros de base de datos definidos desde la pantalla de edici�n
        app.updateMovie = function (MovieRec) {
            /*
            TODO
            */
        };
        // Vac�a los elementos de la pantalla de edici�n
        function pgEditMovieClear() {
            /*
            TODO
            */
        }
        // Obtiene los valores introducidos por el usuario en la pantalla de edici�n y retorna un objeto para su almacenamiento
        function pgEditMovieGetRec() {
            /*
            TODO
            */
        }
        // Muestra el elemento seleccionado desde la pantalla de listado de elementos
        // Realiza la visualizaci�n en la pantalla de edici�n
        app.editMovie = function (MovieName) {
            /*
            TODO
            */
        };

        // Realizar la lectura de los registros de la base de datos y mostrarlos en la pantalla de edici�n
        app.pgEditMovieeditMovie = function (MovieName) {
            /*
            TODO
            */
        };
        // FIN ACTUALIZAR UN ELEMENTO DE IndexedDB
        // ********************************************************** 5
        /// INI BORRAR ELEMENTO DE BASE DE DATOS

        // Borrar un elemento partiendo de su identificador
        app.deleteMovie = function (MovieName) {
            /*
            TODO
            */
        };
        /// FIN BORRAR ELEMENTO DE BASE DE DATOS
        // ********************************************************** 
        /// INI MOSTRAR ELEMENTOS REGISTRADOS EN LISTA DE ELEMENTOS
        // Muestra los registros a lo largo de la ejecuci�n de la aplicaci�n.
        app.displayMovie = function (MovieObj) {
            /*
           TODO
           */
        };
        /// FIN MOSTRAR ELEMENTOS REGISTRADOS EN LISTA DE ELEMENTOS
        // ********************************************************** 
        /// INI VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS
        /// Inicializa la base de datos en caso de no haber registros
        // Muestra los elementos en caso de existir o notifica a usuario que no hay elementos
        app.checkForMovieStorage = function () {
            /*
            TODO
            */
        };
        /// FIN VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS
        // ********************************************************** 9
        /// INI VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS despues de A�ADIR UN NUEVO ELEMENTO
        // Mostrar los registros en caso de existir, sino notificarselo al  usuario
        app.pgAddMoviecheckForMovieStorageR = function () {
            /*
            TODO
            */
        };
        // FIN VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS despues de A�ADIR UN NUEVO ELEMENTO
        // ********************************************************** 

        /// FIN L�GICA: Implementa la gesti�n del modelo de datos a partir de las accciones de usuario obtenidas desde el control
        app.init();
    })(MoviesDatabase);
});