$(function () {
    // Se define objeto de aplicación

    // variables para la conexión con la base de datos
    var dbMoviesDatabase;

    /// INI EJECUCIÓN de FUNCIÓN PRINCIPAL
    (function (app) {
        // Definición de variables
        /*
            TODO
        */
        app.init = function () {
            // INI INICIALIZACIÓN DEL MODELO
            /*
            TODO
            */
            // FIN INICIALIZACIÓN DEL MODELO

            // INI CONTROLADOR
            // Función encargada de la gestión de los eventos de usuario
            app.MovieBindings();
            // FIN CONTROLADOR

            /// INI Gestión de mensaje alerta
            /*
            TODO
            */
            /// FIN Gestión de mensaje alerta
        };
        /// FIN EJECUCIÓN de FUNCIÓN PRINCIPAL

        //*****************************************************************

        /// INI  CONTROL: Enlazar la Vista y la Capa de lógica : Gestión de eventos
        // Función que cumple dos funcionalidades:
        // 1: Antes de cargar la pantalla, analiza la ventara a mostrar al usuario y determina los datos a obtener de base de datos.
        // 2: A lo largo de la ejecución de la página se encarga de enlazar los eventos de usuario con los procedimientos de tratamiento de datos
        app.MovieBindings = function () {
            // 1: Ejecución antes de que se haya cargado la página, previo a mostrar la lista de elementos al usuario
            /*
            TODO
            */
        };

        // 2: Ejecución una vez que se ha cargado la página
        // Establece los eventos para cada una de las páginas de la aplicación:
        // - Añadir elementos => ***** Add Page - Ini *****
        // - Mostrar elementos => ***** Listing Page *****
        // - Editar elementos => ***** Edit Page *****

        $(document).on('pagecontainershow', function (e, ui) {
            //***** Add Page - Ini *****
            /// Añadir una nueva película
            /// Eventos ejecutados desde la página donde se muestra el formulario de inserción de valores

            // INI NAV Vuelta atrás
            // Código ejecutado cuando el botón de vuelta atrás es ejecutado desde la página de añadir nuevo elemento
            // Vuelta atrás desde Añadir Película
            $('#pgAddMovieBack').on('click', function (e) {
                /*
                TODO
                */

            });
            // FIN NAV Vuelta atrás
            // INI NAV Guardar
            // Código ejecutado cuando se pulsa el boton de guardar dede la pantalla de Añadir elmento
            $('#pgAddMovieSave').on('click', function (e) {
                /*
                TODO
                */
            });
            // FIN NAV Guardar
            //***** Add Page - End *****

            //***** Listing Page *****
            /// Mostrar películas
            /// Listado de peliculas almacenados en la base de datos

            // Código ejecutado cuando se pulsa la visualización de elmentos
            // Evento click en listado de peliculas
            $(document).on('click', '#pgMovieList a', function (e) {
                /*
                TODO
                */
            });
            // Código ejecutado cuando es pulsa sobre boton nuevo en el listado de elementos
            // Click en el botón Nuevo desde la pantalla de listado de elementos
            $('#pgMovieNew').on('click', function (e) {
                /*
                TODO
                */
            });
            //***** Listing Page - End *****


            //***** Edit Page *****
            /// Pantalla de edición
            /// Pantalla accesible despues de seleccionar un elemento de la lista
            /// Modificamos los valores del elemento a partir del id

            // Código ejecutado cuando el boton de vuelta atrás es pulsado desde la pantalla de edición
            // Botón Vuelta atrás pulsado
            $('#pgEditMovieBack').on('click', function (e) {
                /*
                TODO
                */
            });
            // Código ejecutado cuando se pulsa el boton de Actualizar elemento
            // Boton de actualizar dede la pantalla de Edición
            $('#pgEditMovieUpdate').on('click', function (e) {
                /*
                TODO
                */
            });
            // Código ejectuado cuando se pulsa el boton de borrado desde la pantalla de edición
            // Click en botón de borrado
            $('#pgEditMovieDelete').on('click', function (e) {
                /*
                TODO
                */
                // FIN :: Mostrar mensaje de confirmación

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

        /// FIN  CONTROL: Enlazar la Vista y la Capa de lógia : Gestión de eventos

        //*****************************************************************
        /// Una vez que los eventos estan definidos...
        /// Se definen los metodos y procedimientos de acceso a los eventos

        /// INI LÓGICA: Implementa la gestión del modelo de datos a partir de las accciones de usuario obtenidas desde el control


        // INI ALMACENAR NUEVO ELEMENTO DE IndexedDB
        // Proceso de almacenamiento de nuevos elementosAlmacenar la página de añadir elementos
        // Añadir un nuevo registro a la base de datos
        app.addMovie = function (MovieRec) {
            /*
            TODO
            */
        };

        // Funciones genéricas para añadir elementos:
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
        // Proceso de actualización de los registros de base de datos definidos desde la pantalla de edición
        app.updateMovie = function (MovieRec) {
            /*
            TODO
            */
        };
        // Vacía los elementos de la pantalla de edición
        function pgEditMovieClear() {
            /*
            TODO
            */
        }
        // Obtiene los valores introducidos por el usuario en la pantalla de edición y retorna un objeto para su almacenamiento
        function pgEditMovieGetRec() {
            /*
            TODO
            */
        }
        // Muestra el elemento seleccionado desde la pantalla de listado de elementos
        // Realiza la visualización en la pantalla de edición
        app.editMovie = function (MovieName) {
            /*
            TODO
            */
        };

        // Realizar la lectura de los registros de la base de datos y mostrarlos en la pantalla de edición
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
        // Muestra los registros a lo largo de la ejecución de la aplicación.
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
        /// INI VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS despues de AÑADIR UN NUEVO ELEMENTO
        // Mostrar los registros en caso de existir, sino notificarselo al  usuario
        app.pgAddMoviecheckForMovieStorageR = function () {
            /*
            TODO
            */
        };
        // FIN VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS despues de AÑADIR UN NUEVO ELEMENTO
        // ********************************************************** 

        /// FIN LÓGICA: Implementa la gestión del modelo de datos a partir de las accciones de usuario obtenidas desde el control
        app.init();
    })(MoviesDatabase);
});