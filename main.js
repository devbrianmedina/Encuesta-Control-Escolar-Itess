// Función para llenar automáticamente los botones de radio con la opción "Totalmente de acuerdo"
function llenarRadioTotalmenteDeAcuerdo() {
    // Obtener todos los elementos de radio con el valor "5. Totalmente de acuerdo"
    var radiosTotalmenteDeAcuerdo = document.querySelectorAll('input[type="radio"][value="5. Totalmente de acuerdo"]');
    
    // Iterar sobre los elementos y establecer su propiedad 'checked' a true y luego activar el evento onchange
    radiosTotalmenteDeAcuerdo.forEach(function(radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
    });
}

// Función para ejecutar el proceso de llenado para cada selección en el menú desplegable
function ejecutarProceso(index) {
    var dropdown = document.getElementById('sel_profesorMateria');
    var opciones = dropdown.options;

    // Verificar si se han completado todas las selecciones
    if (index >= opciones.length) {
        return; // Salir de la función si ya se procesaron todas las opciones
    }

    // Seleccionar una opción del dropdown
    opciones[index].selected = true;
    dropdown.dispatchEvent(new Event('change'));
    var elementosLi = document.querySelectorAll('#ul_encuestamenu li');

    // Función interna para procesar cada elemento li
    function procesarLi(liIndex) {
        // Verificar si se han completado todas las selecciones de li
        if (liIndex >= elementosLi.length) {
            // Llamar recursivamente a ejecutarProceso con la siguiente opción del dropdown
            ejecutarProceso(index + 1);
            return;
        }

        var li = elementosLi[liIndex];
        // Seleccionar el elemento li
        li.classList.add('active'); // Añadir clase 'active' para resaltar visualmente
        
        // Obtener el elemento a dentro del li y simular un click en él
        var enlace = li.querySelector('a');
        enlace.click();
        
        // Disparar el evento 'change' en el enlace
        var eventoChange = new Event('change');
        enlace.dispatchEvent(eventoChange);
        
        // Llenar los botones de radio después de un pequeño retraso
        setTimeout(function() {
            llenarRadioTotalmenteDeAcuerdo();
            // Quitar la clase 'active' después de llenar los botones de radio
            li.classList.remove('active');
            // Llamar recursivamente a procesarLi con el siguiente elemento li
            procesarLi(liIndex + 1);
        }, 1000); // Esperar 1 segundo antes de llenar los botones de radio (ajustar según sea necesario)
    }

    // Iniciar el proceso para procesar cada elemento li
    procesarLi(0);
}

// Llamar a la función para ejecutar el proceso con la primera opción del dropdown
ejecutarProceso(0);
