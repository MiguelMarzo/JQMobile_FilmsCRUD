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
            app.MovieBindings();
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

        //***********************

        /// INI  CONTROL: Enlazar la Vista y la Capa de l�gica : Gesti�n de eventos
        // Funci�n que cumple dos funcionalidades:
        // 1: Antes de cargar la pantalla, analiza la ventara a mostrar al usuario y determina los datos a obtener de base de datos.
        // 2: A lo largo de la ejecuci�n de la p�gina se encarga de enlazar los eventos de usuario con los procedimientos de tratamiento de datos
        app.MovieBindings = function () {
            // 1: Ejecuci�n antes de que se haya cargado la p�gina, previo a mostrar la lista de elementos al usuario
            // Ejecuci�n antes de que se haya cargado la p�gina, previo a mostrar la lista de elementos  al usuario
            $(document).on('pagebeforechange', function (e, data) {
                // Obtenemos la p�gina a la que nos dirigimos
                var toPage = data.toPage[0].id;
                switch (toPage) {
                    case 'pgMovie':
                        $('#pgRptMovieBack').data('from', 'pgMovie');
                        // Repite la consulta a base de datos para la obtenci�n de elementos
                        app.checkForMovieStorage();
                        break;
                    case 'pgEditMovie':
                        $('#pgRptMovieBack').data('from', 'pgEditMovie');
                        // Limpiar la p�gina de contenido
                        pgEditMovieClear();
                        // Cargar de los elementos del men�
                        var MovieName = $('#pgEditMovie').data('id');
                        // Lectura de los elementos desde la base de datos y refresco de la pantalla
                        app.editMovie(MovieName);
                        break;
                    case 'pgAddMovie':
                        $('#pgRptMovieBack').data('from', 'pgAddMovie');
                        pgAddMovieClear();
                        // Cargar de los elementos del men� antes de que se haya mostrado la p�gina
                        app.pgAddMoviecheckForMovieStorageR();
                        break;
                }
            });
            // Ejecuci�n una vez que se ha cargado la p�gina

            // 2: Ejecuci�n una vez que se ha cargado la p�gina
            // Establece los eventos para cada una de las p�ginas de la aplicaci�n:
            // - A�adir elementos => ** Add Page - Ini **
            // - Mostrar elementos => ** Listing Page **
            // - Editar elementos => ** Edit Page **

            $(document).on('pagecontainershow', function (e, ui) {
                //*** Add Page - Ini ***
                /// A�adir una nueva pel�cula
                /// Eventos ejecutados desde la p�gina donde se muestra el formulario de inserci�n de valores

                // INI NAV Vuelta atr�s
                // C�digo ejecutado cuando el bot�n de vuelta atr�s es ejecutado desde la p�gina de a�adir nuevo elemento
                // Vuelta atr�s desde A�adir Pel�cula
                $('#pgAddMovieBack').on('click', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // Volver a la pantalla de listado de elementos
                    $.mobile.changePage('#pgMovie', { transition: pgtransition });

                });
                // FIN NAV Vuelta atr�s
                // INI NAV Guardar
                // C�digo ejecutado cuando se pulsa el boton de guardar dede la pantalla de A�adir elmento
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
                /// Mostrar pel�culas
                /// Listado de peliculas almacenados en la base de datos

                // C�digo ejecutado cuando se pulsa la visualizaci�n de elmentos
                // Evento click en listado de peliculas
                $(document).on('click', '#pgMovieList a', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // Obtener el enlace pulsado desde la lista de elementos y formatearlo
                    var href = $(this).data('id');
                    href = href.split(' ').join('-');
                    // Almacenar el id del elemento para su edici�n
                    $('#pgEditMovie').data('id', href);
                    // Navegar a la p�gina de edici�n
                    $.mobile.changePage('#pgEditMovie', { transition: pgtransition });
                });
                // C�digo ejecutado cuando es pulsa sobre boton nuevo en el listado de elementos
                // Click en el bot�n Nuevo desde la pantalla de listado de elementos
                $('#pgMovieNew').on('click', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // Accedemos a la pantalla de a�adir un nuevo elemento desde el listado de pel�culas
                    $('#pgAddMovie').data('from', 'pgMovie');
                    // Mostrar la pantalla activa y las opciones de usuario
                    $('#pgAddMovieheader h1').text('PeliBD > A�adir pel�cula');
                    $('#pgAddMovieMenu').show();
                    // Navegar a la pantalla de a�adir un nuevo elemento
                    $.mobile.changePage('#pgAddMovie', { transition: pgtransition });
                });
                //*** Listing Page - End ***


                //*** Edit Page ***
                /// Pantalla de edici�n
                /// Pantalla accesible despues de seleccionar un elemento de la lista
                /// Modificamos los valores del elemento a partir del id

                // C�digo ejecutado cuando el boton de vuelta atr�s es pulsado desde la pantalla de edici�n
                // Bot�n Vuelta atr�s pulsado
                $('#pgEditMovieBack').on('click', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // Volver atr�s a la pantalla de mostrar los elementos
                    $.mobile.changePage('#pgMovie', { transition: pgtransition });
                });
                // C�digo ejecutado cuando se pulsa el boton de Actualizar elemento
                // Boton de actualizar dede la pantalla de Edici�n
                $('#pgEditMovieUpdate').on('click', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // obtener el contenido de los controles de edici�n
                    var MovieRec = pgEditMovieGetRec();
                    // almacenar los registros actualizados en IndexedDB
                    app.updateMovie(MovieRec);
                });
                // C�digo ejectuado cuando se pulsa el boton de borrado desde la pantalla de edici�n
                // Click en bot�n de borrado
                $('#pgEditMovieDelete').on('click', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // Lectura del identificador del elemento seleccionado por el usuario
                    var MovieName = $('#pgEditMovieMovieName').val().trim();
                    // INI :: Mostrar mensaje de confirmaci�n
                    $('#msgboxheader h1').text('Confirmar Borrado');
                    $('#msgboxtitle').text(MovieName.split('-').join(' '));
                    $('#msgboxprompt').text('�Est�s seguro de querer borrar el elemento?');
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
                    // Lectura del elemento desde la base de datos y actualizaci�n de la pantalla
                    app.pgEditMovieeditMovie(href);
                });
                //*** Edit Page - End ***

            });
        }
        /// FIN  CONTROL: Enlazar la Vista y la Capa de l�gia : Gesti�n de eventos

        //***********************
        /// Una vez que los eventos estan definidos...
        /// Se definen los metodos y procedimientos de acceso a los eventos

        /// INI L�GICA: Implementa la gesti�n del modelo de datos a partir de las accciones de usuario obtenidas desde el control


        // INI ALMACENAR NUEVO ELEMENTO DE IndexedDB
        // Proceso de almacenamiento de nuevos elementosAlmacenar la p�gina de a�adir elementos
        // A�adir un nuevo registro a la base de datos
        app.addMovie = function (MovieRec) {
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
            // definir la transacci�n a ejecutar
            var tx = dbMoviesDatabase.transaction(["Movie"], "readwrite");
            // Obtener los objetos para a�adir un nuevo elemento
            var store = tx.objectStore("Movie");
            // a�adir al almacenamiento de anteriores elementos
            var request = store.add(MovieRec);
            request.onsuccess = function (e) {
                // En caso de �xito en el almacenamiento mostramos un mensaje de notificaci�n al usuario
                alert('Pel�cula a�adida.', 'PeliBD');
                // Obtener desde la p�gina de la que hemos accedido, en caso de que sea desde la de acceso volvemos a ella
                var pgFrom = $('#pgAddMovie').data('from');
                switch (pgFrom) {
                    case "pgSignIn":
                        $.mobile.changePage('#pgSignIn', { transition: pgtransition });
                        break;
                    default:
                        // limpiamos los elemntos del formulario
                        pgAddMovieClear();
                        // Nos mantenemos en la misma p�gina para seguir generando registros
                }
            }
            request.onerror = function (e) {
                // Mostramos un mensaje de notificaci�n de error
                toastr.error('No se ha podido a�adir el elemento de manera exitosa.',
               'PeliDB');
            }
            $.mobile.loading("hide");
        };

        // Funciones gen�ricas para a�adir elementos:
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
        // FIN ALMACENAR NUEVO ELMENTO DE IndexedDB
        // ******************** 
        // INI ACTUALIZAR UN ELEMENTO DE IndexedDB
        // Proceso de actualizaci�n de los registros de base de datos definidos desde la pantalla de edici�n
        app.updateMovie = function (MovieRec) {
            // Mostrar mensaje de cargando durante la ejecuci�n del proceso
            $.mobile.loading("show", {
                text: "Actualizar registro...",
                textVisible: true,
                textonly: false,
                html: ""
            });
            // Buscar una pel�cula espec�fica
            var MovieName = MovieRec.MovieName;
            // Formatear el identificador eliminando los espacios
            MovieName = MovieName.split(' ').join('-');
            MovieRec.MovieName = MovieName;
            // Definir la transacci�n a ejectura
            var tx = dbMoviesDatabase.transaction(["Movie"], "readwrite");
            // Obtener el objeto store de almacenar los elemntos
            var store = tx.objectStore("Movie");
            // Obtener los registros desde el objeto encargado de almacenarlos
            store.get(MovieName).onsuccess = function (e) {
                var request = store.put(MovieRec);
                request.onsuccess = function (e) {
                    // El registro a sido guardado
                    alert('Pel�cula actualizada.', 'PeliDB');
                    // Limpiamos los elementos del formulario
                    pgEditMovieClear();
                    // Mostrar la pantalla de listado de los elementos de base de datos
                    $.mobile.changePage('#pgMovie', { transition: pgtransition });
                }
                request.onerror = function (e) {
                    alert('No se ha actualizado la pel�cula, intentelo otra vez.',
                   'PeliDB');
                    return;
                }
            };
            // Ocultamos el objeto de CARGANDO y mostramos el resultado
            $.mobile.loading("hide");
        };
        // Vac�a los elementos de la pantalla de edici�n
        function pgEditMovieClear() {
            $('#pgEditMovieMovieName').val('');
            $('#pgEditMovieMovieYear').val('');
            $('#pgEditMovieMovieGenre').val('');
        }
        // Obtiene los valores introducidos por el usuario en la pantalla de edici�n y retorna un objeto para su almacenamiento
        function pgEditMovieGetRec() {
            //define the new record
            var MovieRec = {};
            MovieRec.MovieName = $('#pgEditMovieMovieName').val().trim();
            MovieRec.MovieYear = $('#pgEditMovieMovieYear').val().trim();
            MovieRec.MovieGenre = $('#pgEditMovieMovieGenre').val().trim();
            return MovieRec;
        }
        // Muestra el elemento seleccionado desde la pantalla de listado de elementos
        // Realiza la visualizaci�n en la pantalla de edici�n
        app.editMovie = function (MovieName) {
            $.mobile.loading("show", {
                text: "Lectura de registro...",
                textVisible: true,
                textonly: false,
                html: ""
            });
            // Realizamos el vaciado de los valores introducidos por el usuario
            pgEditMovieClear();
            MovieName = MovieName.split(' ').join('-');
            var MovieRec = {};
            // Se relaiza una transacci�n para la lectura de los valores de base de datos
            var tx = dbMoviesDatabase.transaction(["Movie"], "readonly");
            // Se obtiene el objeto encargado de leer el almacenamiento
            var store = tx.objectStore("Movie");
            // Se realiza la busqueda del elemento a traves de su clave primaria
            var request = store.get(MovieName);
            request.onsuccess = function (e) {
                MovieRec = e.target.result;
                // En caso de que todo sea correcto preparmos la visualizaci�n
                // La clave primaria es de solo lectura
                $('#pgEditMovieMovieName').attr('readonly', 'readonly');
                // La clave primaria no puede ser borrada
                $('#pgEditMovieMovieName').attr('data-clear-btn', 'false');
                // Actualiza cada uno de los controles de la pantalla de edici�n
                // Damos formato a la clave primaria del registr, eliminando espacios en blanco y caracter -
                var pkey = MovieRec.MovieName;
                pkey = pkey.split('-').join(' ');
                MovieRec.MovieName = pkey;
                $('#pgEditMovieMovieName').val(MovieRec.MovieName);
                $('#pgEditMovieMovieYear').val(MovieRec.MovieYear);
                $('#pgEditMovieMovieGenre').val(MovieRec.MovieGenre);
            }
            // En caso de encontrar un error se lo notificamos al usuario
            request.onerror = function (e) {
                $('#alertboxheader h1').text('Error PeliDB');
                $('#alertboxtitle').text(MovieName.split('-').join(' '));
                $('#alertboxprompt').text('Se ha encontrado un error al realizar la lectura del valor, intentelo otra vez!');
                $('#alertboxok').data('topage', 'pgEditMovie');
                $('#alertboxok').data('id', MovieName.split(' ').join('-'));
                $.mobile.changePage('#alertbox', { transition: 'pop' });
                return;
            }
            $.mobile.loading("hide");
        };

        // Realizar la lectura de los registros de la base de datos y mostrarlos en la pantalla de edici�n
        app.pgEditMovieeditMovie = function (MovieName) {
            $.mobile.loading("show", {
                text: "Lectura de elementos...",
                textVisible: true,
                textonly: false,
                html: ""
            });
            // Se vacian los elementos del formulario
            pgEditMovieClear();
            MovieName = MovieName.split(' ').join('-');
            var MovieRec = {};
            // Se define una transacci�n para realizar la lectura desde la base de datos
            var tx = dbMoviesDatabase.transaction(["Movie"], "readonly");
            // Obtenemos el objeto almacenador de la tabla Movie
            var store = tx.objectStore("Movie");
            // Obtenemos el registro a partir de su clave primaria
            var request = store.get(MovieName);
            request.onsuccess = function (e) {
                MovieRec = e.target.result;
                // En caso de que todo este correcto
                // Establecemos la clave primaria de solo lectura
                $('#pgEditMovieMovieName').attr('readonly', 'readonly');
                // Establecemos que la clave primaria no pueda ser borrada
                $('#pgEditMovieMovieName').attr('data-clear-btn', 'false');
                // Se actualizan cada uno de los controles de la ventana de edici�n
                // Se formatea y vac�a la clave primaria
                var pkey = MovieRec.MovieName;
                pkey = pkey.split('-').join(' ');
                MovieRec.MovieName = pkey;
                $('#pgEditMovieMovieName').val(MovieRec.MovieName);
                $('#pgEditMovieMovieYear').val(MovieRec.MovieYear);
                $('#pgEditMovieMovieGenre').val(MovieRec.MovieGenre);
            }
            // Se ha encontrado un error
            request.onerror = function (e) {
                $('#alertboxheader h1').text('Movie Error');
                $('#alertboxtitle').text(MovieName.split('-').join(' '));
                $('#alertboxprompt').text('Error en la lectura del elemento');
                $('#alertboxok').data('topage', 'pgEditMovie');
                $('#alertboxok').data('id', MovieName.split(' ').join('-'));
                $.mobile.changePage('#alertbox', { transition: 'pop' });
                return;
            }
            $.mobile.loading("hide");
        };
        // FIN ACTUALIZAR UN ELEMENTO DE IndexedDB
        // ******************** 5
        /// INI BORRAR ELEMENTO DE BASE DE DATOS

        // Borrar un elemento partiendo de su identificador
        app.deleteMovie = function (MovieName) {
            $.mobile.loading("show", {
                text: "Borrando el registro...",
                textVisible: true,
                textonly: false,
                html: ""
            });
            MovieName = MovieName.split(' ').join('-');
            // Definimos la transici�n a ejecutar
            var tx = dbMoviesDatabase.transaction(["Movie"], "readwrite");
            // Obtenemos el objeto almacenador de elementos de la tabla de base de datos
            var store = tx.objectStore("Movie");
            // Borramos el elemento a partir de su identificador
            var request = store.delete(MovieName);
            request.onsuccess = function (e) {
                // El registro ha sido eliminado de la base de datos
                alert('Pel�cula borrada.', 'PeliBD');
                // Mostramos la p�gina con los nuevos elementos
                $.mobile.changePage('#pgMovie', { transition: pgtransition });
            }
            request.onerror = function (e) {
                alert('No se ha eliminado la pel�cula, int�ntelo otra vez.', 'PeliBD');
                return;
            }
            $.mobile.loading("hide");
        };
        /// FIN BORRAR ELEMENTO DE BASE DE DATOS
        // ******************** 
        /// INI MOSTRAR ELEMENTOS REGISTRADOS EN LISTA DE ELEMENTOS
        // Muestra los registros a lo largo de la ejecuci�n de la aplicaci�n.
        app.displayMovie = function (MovieObj) {
            $.mobile.loading("show", {
                text: "Mostrando elementos...",
                textVisible: true,
                textonly: false,
                html: ""
            });
            // Se genera un string vac�o para contener la informaci�n
            var html = '';
            // Asegurarse de que el iterador est� bien definido
            var n;
            // Bucle sobre los registros generador de un elemento cada vez
            // a�adir el html generado al final de la lista de elementos
            for (n in MovieObj) {
                // Obtener los detalles de elemento
                var MovieRec = MovieObj[n];
                // Vaciar la llave primiaria
                var pkey = MovieRec.MovieName;
                pkey = pkey.split('-').join(' ');
                MovieRec.MovieName = pkey;
                // Definir una nueva l�na de la informaci�n obtenida
                var nItem = MovieLi;
                nItem = nItem.replace(/Z2/g, n);
                // Actualizar el t�tulo, puede que sea multil�nea
                var nTitle = '';
                // Asignar un t�tulo vac�o
                nTitle = n.split('-').join(' ');
                // Reemplazar el t�tulo
                nItem = nItem.replace(/Z1/g, nTitle);
                // Contador n�merico de la pel�cula
                var nCountBubble = '';
                nCountBubble += MovieRec.MovieYear;
                // reemplazar el contador de elemntos
                nItem = nItem.replace(/COUNTBUBBLE/g, nCountBubble);
                // Actualizr la vista en caso de existir descripci�n
                var nDescription = '';
                nDescription += MovieRec.MovieGenre;
                // Reemplazar la descripci�n
                nItem = nItem.replace(/DESCRIPTION/g, nDescription);
                html += nItem;
            }
            // Actualizar la vista con la nueva estructura HTML generada
            $('#pgMovieList').html(MovieHdr + html).listview('refresh');
            $.mobile.loading("hide");
        };
        /// FIN MOSTRAR ELEMENTOS REGISTRADOS EN LISTA DE ELEMENTOS
        // ******************** 
        /// INI VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS
        /// Inicializa la base de datos en caso de no haber registros
        // Muestra los elementos en caso de existir o notifica a usuario que no hay elementos
        app.checkForMovieStorage = function () {
            $.mobile.loading("show", {
                text: "Verificando almacenamiento...",
                textVisible: true,
                textonly: false,
                html: ""
            });
            // Obtener los registros de la base de datos IndexDB
            // cuando se retornan objetos estos se convierten en objetos JSON
            var MovieObj = {};
            // Se define una transacci�n para la lectura de elementos desde la base de datos
            var tx = dbMoviesDatabase.transaction(["Movie"], "readonly");
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
                    $('#pgMovieList').html(MovieHdr + noMovie).listview('refresh');
                }
            }
            $.mobile.loading("hide");
            // se ha encontrado un error
            request.onerror = function (e) {
                $.mobile.loading("hide");
                // Mostrar solo el texto de ayuda
                $('#pgMovieList').html(MovieHdr + noMovie).listview('refresh');
            }
        };
        /// FIN VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS
        // ******************** 9
        /// INI VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS despues de A�ADIR UN NUEVO ELEMENTO
        // Mostrar los registros en caso de existir, sino notificarselo al  usuario
        app.pgAddMoviecheckForMovieStorageR = function () {
            $.mobile.loading("show", {
                text: "Verificando almacenamiento...",
                textVisible: true,
                textonly: false,
                html: ""
            });
            //Obtener los registros desde la base de datos
            // en caso de disponer registros, genera un objeto JSON por cada uno de ellos
            var MovieObj = {};
            // Definir la transacci�n para realizar la lectura de elementos de la base de datos
            var tx = dbMoviesDatabase.transaction(["Movie"], "readonly");
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
                // Existen m�s peliculas?
                if (!$.isEmptyObject(MovieObj)) {
                    // encaso de que existan pasamos a visualizarlas
                    app.pgAddMoviedisplayMovieR(MovieObj);
                } else {
                    // en caso de que no existan solo mostramos el texto de ayuda
                    $('#pgAddMovieRightPnlLV').html(MovieHdr + noMovie).listview('refresh');
                }
            }
            $.mobile.loading("hide");
            // en caso de encontrar un error
            request.onerror = function (e) {
                $.mobile.loading("hide");
                // solo se visualiza el texto de ayuda
                $('#pgAddMovieRightPnlLV').html(MovieHdr + noMovie).listview('refresh');
            }
        };
        // FIN VERIFICAR EL ALMACENAMIENTO DE LOS REGISTROS despues de A�ADIR UN NUEVO ELEMENTO
        // ******************** 

        /// FIN L�GICA: Implementa la gesti�n del modelo de datos a partir de las accciones de usuario obtenidas desde el control
        app.init();
    })(MoviesDatabase);
});