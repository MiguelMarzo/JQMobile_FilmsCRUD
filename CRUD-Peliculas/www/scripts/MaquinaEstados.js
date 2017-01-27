function MaquinaEstados() {

}

/// INI  CONTROL: Enlazar la Vista y la Capa de lógica : Gestión de eventos
// Función que cumple dos funcionalidades:
// 1: Antes de cargar la pantalla, anali    za la ventara a mostrar al usuario y determina los datos a obtener de base de datos.
// 2: A lo largo de la ejecución de la página se encarga de enlazar los eventos de usuario con los procedimientos de tratamiento de datos
MaquinaEstados.MovieBindings = function () {
    // 1: Ejecución antes de que se haya cargado la página, previo a mostrar la lista de elementos al usuario
    // Ejecución antes de que se haya cargado la página, previo a mostrar la lista de elementos  al usuario
    $(document).on('pagebeforechange', function (e, data) {
        // Obtenemos la página a la que nos dirigimos
        var toPage = data.toPage[0].id;
        switch (toPage) {
            case 'pgMovie':
                $('#pgRptMovieBack').data('from', 'pgMovie');
                // Repite la consulta a base de datos para la obtención de elementos
                MaquinaEstados.checkForMovieStorage();
                break;
            case 'pgEditMovie':
                $('#pgRptMovieBack').data('from', 'pgEditMovie');
                // Limpiar la página de contenido
                pgEditMovieClear();
                // Cargar de los elementos del menú
                var MovieName = $('#pgEditMovie').data('id');
                // Lectura de los elementos desde la base de datos y refresco de la pantalla
                Editar.editMovie(MovieName);
                break;
            case 'pgAddMovie':
                $('#pgRptMovieBack').data('from', 'pgAddMovie');
                pgAddMovieClear();
                // Cargar de los elementos del menú antes de que se haya mostrado la página
                MaquinaEstados.pgAddMoviecheckForMovieStorageR();
                break;
        }
    });
    // Ejecución una vez que se ha cargado la página

    // 2: Ejecución una vez que se ha cargado la página
    // Establece los eventos para cada una de las páginas de la aplicación:
    // - Añadir elementos => ** Add Page - Ini **
    // - Mostrar elementos => ** Listing Page **
    // - Editar elementos => ** Edit Page **

    $(document).on('pagecontainershow', function (e, ui) {
        //*** Add Page - Ini ***
        /// Añadir una nueva película
        /// Eventos ejecutados desde la página donde se muestra el formulario de inserción de valores

        // INI NAV Vuelta atrás
        // Código ejecutado cuando el botón de vuelta atrás es ejecutado desde la página de añadir nuevo elemento
        // Vuelta atrás desde Añadir Película
        $('#pgAddMovieBack').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Volver a la pantalla de listado de elementos
            $.mobile.changePage('#pgMovie', { transition: pgtransition });

        });
        // FIN NAV Vuelta atrás
        // INI NAV Guardar
        // Código ejecutado cuando se pulsa el boton de guardar dede la pantalla de Añadir elmento
        $('#pgAddMovieSave').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Obtener los elementos del formulario y trasladarlos a un objeto
            var MovieRec = pgAddMovieGetRec();
            // Almacenar los objetos en la base de datos
            app.addMovie(MovieRec);
        });
        // FIN NAV Guardar
        //*** Add Page - End ***

        //*** Listing Page ***
        /// Mostrar películas
        /// Listado de peliculas almacenados en la base de datos

        // Código ejecutado cuando se pulsa la visualización de elmentos
        // Evento click en listado de peliculas
        $(document).on('click', '#pgMovieList a', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Obtener el enlace pulsado desde la lista de elementos y formatearlo
            var href = $(this).data('id');
            href = href.split(' ').join('-');
            // Almacenar el id del elemento para su edición
            $('#pgEditMovie').data('id', href);
            // Navegar a la página de edición
            $.mobile.changePage('#pgEditMovie', { transition: getPgTransition });
        });
        // Código ejecutado cuando es pulsa sobre boton nuevo en el listado de elementos
        // Click en el botón Nuevo desde la pantalla de listado de elementos
        $('#pgMovieNew').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Accedemos a la pantalla de añadir un nuevo elemento desde el listado de películas
            $('#pgAddMovie').data('from', 'pgMovie');
            // Mostrar la pantalla activa y las opciones de usuario
            $('#pgAddMovieheader h1').text('PeliBD > Añadir película');
            $('#pgAddMovieMenu').show();
            // Navegar a la pantalla de añadir un nuevo elemento
            $.mobile.changePage('#pgAddMovie', { transition: getPgTransition });
        });
        //*** Listing Page - End ***


        //*** Edit Page ***
        /// Pantalla de edición
        /// Pantalla accesible despues de seleccionar un elemento de la lista
        /// Modificamos los valores del elemento a partir del id

        // Código ejecutado cuando el boton de vuelta atrás es pulsado desde la pantalla de edición
        // Botón Vuelta atrás pulsado
        $('#pgEditMovieBack').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Volver atrás a la pantalla de mostrar los elementos
            $.mobile.changePage('#pgMovie', { transition: getPgTransition });
        });
        // Código ejecutado cuando se pulsa el boton de Actualizar elemento
        // Boton de actualizar dede la pantalla de Edición
        $('#pgEditMovieUpdate').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // obtener el contenido de los controles de edición
            var MovieRec = pgEditMovieGetRec();
            // almacenar los registros actualizados en IndexedDB
            app.updateMovie(MovieRec);
        });
        // Código ejectuado cuando se pulsa el boton de borrado desde la pantalla de edición
        // Click en botón de borrado
        $('#pgEditMovieDelete').on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Lectura del identificador del elemento seleccionado por el usuario
            var MovieName = $('#pgEditMovieMovieName').val().trim();
            // INI :: Mostrar mensaje de confirmación
            $('#msgboxheader h1').text('Confirmar Borrado');
            $('#msgboxtitle').text(MovieName.split('-').join(' '));
            $('#msgboxprompt').text('¿Estás seguro de querer borrar el elemento?');
            $('#msgboxyes').data('method', 'deleteMovie');
            $('#msgboxno').data('method', 'editMovie');
            $('#msgboxyes').data('id', MovieName.split(' ').join('-'));
            $('#msgboxno').data('id', MovieName.split(' ').join('-'));
            $('#msgboxyes').data('topage', 'pgEditMovie');
            $('#msgboxno').data('topage', 'pgEditMovie');
            $.mobile.changePage('#msgbox', { transition: 'pop' });
        });

        // Boton de mostrar elementos
        // Click en bton de listado de los elementos almacecnados en la base de datos
        $(document).on('click', '#pgEditMovieRightPnlLV a', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // Obtener el identificador del elemenetos a traves del enlace pulsado
            var href = $(this).data('id');
            href = href.split(' ').join('-');
            // Lectura del elemento desde la base de datos y actualización de la pantalla
            app.pgEditMovieeditMovie(href);
        });
        //*** Edit Page - End ***

    });
}

/// INI VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS
/// Inicializa la base de datos en caso de no haber registros
// Muestra los elementos en caso de existir o notifica a usuario que no hay elementos
MaquinaEstados.checkForMovieStorage = function () {
    $.mobile.loading("show", {
        text: "Verificando almacenamiento...",
        textVisible: true,
        textonly: false,
        html: ""
    });
    // Obtener los registros de la base de datos IndexDB
    // cuando se retornan objetos estos se convierten en objetos JSON
    var MovieObj = {};
    // Se define una transacción para la lectura de elementos desde la base de datos
    var tx = getDatabase().transaction(["Movie"], "readonly");
    // Obtener el objeto alamcenador de la tabla de base de datos
    var store = tx.objectStore("Movie");
    // Abrir un cursor para la lectura de todos los registros de base de datos
    var request = store.openCursor();
    request.onsuccess = function (e) {
        // Se devuleve el resultado
        var cursor = e.target.result;
        if (cursor) {
            MovieObj[cursor.key] = cursor.value;
            // Se procesa el siguiente registro
            cursor.continue();
        }
        // Exten registros en la base de datos?
        if (!$.isEmptyObject(MovieObj)) {
            // SI existen, mostrarlos por pantalla
            app.displayMovie(MovieObj);
        } else {
            // NO existes, mostramos el texto de ayuda
            $('#pgMovieList').html(getMovieHdr() + getNoMovie()).listview('refresh');
        }
    }
    $.mobile.loading("hide");
    // se ha encontrado un error
    request.onerror = function (e) {
        $.mobile.loading("hide");
        // Mostrar solo el texto de ayuda
        $('#pgMovieList').html(getMovieHdr() + getNoMovie()).listview('refresh');
    }
};
/// FIN VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS
// ******************** 9

/// INI VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS despues de AÑADIR UN NUEVO ELEMENTO
// Mostrar los registros en caso de existir, sino notificarselo al  usuario
MaquinaEstados.pgAddMoviecheckForMovieStorageR = function () {
    $.mobile.loading("show", {
        text: "Verificando almacenamiento...",
        textVisible: true,
        textonly: false,
        html: ""
    });
    //Obtener los registros desde la base de datos
    // en caso de disponer registros, genera un objeto JSON por cada uno de ellos
    var MovieObj = {};
    // Definir la transacción para realizar la lectura de elementos de la base de datos
    var tx = getDatabase().transaction(["Movie"], "readonly");
    // Obtener el objeto encadao de almancenar los elementos en la base de datos
    var store = tx.objectStore("Movie");
    // Abrir un cursor para realizar la lectura de cada uno de los registros
    var request = store.openCursor();
    request.onsuccess = function (e) {
        // Retornar el resutlado
        var cursor = e.target.result;
        if (cursor) {
            MovieObj[cursor.key] = cursor.value;
            // procesar el siguiente registro
            cursor.continue();
        }
        // Existen más peliculas?
        if (!$.isEmptyObject(MovieObj)) {
            // encaso de que existan pasamos a visualizarlas
            app.pgAddMoviedisplayMovieR(MovieObj);
        } else {
            // en caso de que no existan solo mostramos el texto de ayuda
            $('#pgAddMovieRightPnlLV').html(getMovieHdr() + getNoMovie()).listview('refresh');
        }
    }
    $.mobile.loading("hide");
    // en caso de encontrar un error
    request.onerror = function (e) {
        $.mobile.loading("hide");
        // solo se visualiza el texto de ayuda
        $('#pgAddMovieRightPnlLV').html(getMovieHdr() + getNoMovie()).listview('refresh');
    }
};
// FIN VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS despues de AÑADIR UN NUEVO ELEMENTO
// ******************** 