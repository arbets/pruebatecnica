window.onload = function() {
    document.getElementById("bisiesto").onclick = vista_bisiesto;
    document.getElementById("generar_tabla").onclick = vista_generar_tabla;
    document.getElementById("arreglo_numerico").onclick = mostrar_arreglo_ordenado;
    document.getElementById("uniones").onclick = mostrar_uniones;
    document.getElementById("tipo_cambio").onclick = mostrar_tipo_cambio;
}

/**
 * Funciones usadas para el punto 2
 * Crear un input donde se ingrese un año y determina si es bisiesto en el calendario gregoriano
 */
function vista_bisiesto(){
    limpiar_vista();
    document.getElementById("bisiesto").className = "btn btn-dark";
    const div_funcionalidad = document.getElementById("funcionalidad");
    div_funcionalidad.appendChild(generar_input("anio_evaluar", "number", "form-control", "Ingresa el año que deseas evaluar", 0, 1));
    
    const boton_evaluar = generar_button("evaluar_bisiesto", "btn btn-success", "Evaluar");
    boton_evaluar.onclick = mostrar_resultado_evaluacion;
    div_funcionalidad.appendChild(boton_evaluar);

}

function mostrar_resultado_evaluacion(){
    const anio_evaluar = parseInt(document.getElementById("anio_evaluar").value);
    if(Number.isInteger(anio_evaluar) && anio_evaluar > 0){
        mensaje_validacion(true);
        
        const bisiesto =  es_bisiesto(anio_evaluar);
        const mensaje_evaluado = document.createElement('h2');
        mensaje_evaluado.className = bisiesto ? "text-success" : "text-danger";
        mensaje_evaluado.textContent = bisiesto ? `El año ${anio_evaluar} es bisiesto`: `El año ${anio_evaluar} no es bisiesto`;
    
        const div_resultado = document.getElementById("resultados");
        div_resultado.innerHTML = "";
        div_resultado.appendChild(mensaje_evaluado);
    }else{
        mensaje_validacion(false, "Ingrese un año correcto");
    }
}

function es_bisiesto(anio_evaluar){
    if (anio_evaluar%4 == 0 && anio_evaluar%100 != 0){ 
        return true
    }
    else if (anio_evaluar%400 == 0){  
        return true 
    } else{  
        return false  
    } 
}

/**
 * Funciones usadas para el punto 3
 * Crear dos input, filas y columnas donde se ingresan estos datos y se genere 
 * automáticamente una tabla con las dimensiones suministradas
 */
function vista_generar_tabla(){
    limpiar_vista();
    document.getElementById("generar_tabla").className = "btn btn-dark";
    const div_funcionalidad = document.getElementById("funcionalidad");
    const input_columnas = generar_input("numero_columnas", "number", "form-control", "Ingresa el número de columnas que tendrá la tabla");
    input_columnas.oninput = mostrar_tabla;
    const input_filas = generar_input("numero_filas", "number", "form-control", "Ingresa el número de filas que tendrá la tabla");
    input_filas.oninput = mostrar_tabla;
    div_funcionalidad.appendChild(input_columnas);
    div_funcionalidad.appendChild(input_filas);
    
    /*const boton_generar_tabla = generar_button("crear_tabla", "btn btn-success", "Generar");
    boton_generar_tabla.onclick = mostrar_tabla;
    div_funcionalidad.appendChild(boton_generar_tabla);*/

}

function mostrar_tabla(){
    const numero_columnas = parseInt(document.getElementById("numero_columnas").value);
    const numero_filas = parseInt(document.getElementById("numero_filas").value);
    if(Number.isInteger(numero_columnas) && numero_columnas > 0 && Number.isInteger(numero_filas) && numero_filas > 0 ){
        mensaje_validacion(true);
        const tabla = crear_tabla(numero_columnas, numero_filas);
        const div_resultado = document.getElementById("resultados");
        div_resultado.innerHTML = "";
        div_resultado.appendChild(tabla);
    }else{
        mensaje_validacion(false, "Ingresa un número entero mayor a cero.");
    }
}

function crear_tabla(numero_columnas, numero_filas){
    const tabla = document.createElement('table');
    const tbody = document.createElement('tbody');
    tabla.className = "table table-responsive table-dark table-hover table-bordered border border-white";
    for(let filas = 0; filas < numero_filas; filas++){
        const fila_agregar = document.createElement('tr');
        for(let columnas = 0; columnas < numero_columnas; columnas++){
            const columna_agregar = document.createElement('td');
            fila_agregar.appendChild(columna_agregar);
        }
        tbody.appendChild(fila_agregar);
    }
    tabla.appendChild(tbody);

    return tabla;
}

/**
 * Funciones usadas para el punto 4
 * Generar un arreglo con 20 números aleatorios de 1 a 100 
 * y luego organizarlo de menor a mayor sin utilizar la sentencia .sort().
 */
function mostrar_arreglo_ordenado(){
    limpiar_vista();
    document.getElementById("arreglo_numerico").className = "btn btn-dark";
    let arreglo_desordenado = [];
    for(let indice = 0; indice < 20; indice++){
        arreglo_desordenado[indice] = aleatorio(1,100);
    }
    const div_resultado = document.getElementById("resultados");
    div_resultado.innerHTML = "";

    mostrar_arreglo(div_resultado, "text-dark", "Arreglo Desordenado: ", arreglo_desordenado);
    mostrar_arreglo(div_resultado, "text-success", "Arreglo Ordenado: ", ordenar(arreglo_desordenado));    
}

function aleatorio(minimo, maximo) {
    var numPosibilidades = maximo - minimo;
    var aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return minimo + aleatorio;
}

function ordenar(arreglo){
    let hay_desordenados = true;
    let temporal = null;
    do{
        hay_desordenados = false;
        for(let tam = 1; tam < arreglo.length; tam++){
            if(arreglo[tam-1] > arreglo[tam]){
                temporal = arreglo[tam];
                arreglo[tam] = arreglo[tam-1];
                arreglo[tam-1] = temporal;
                hay_desordenados = true;
            }
        }

    } while(hay_desordenados);
    return arreglo;
}

/**
 * Funciones usadas para el punto 5
 * Generar dos arreglos A y B con 10 valores aleatorios de letras del abecedario 
 * y mostrar los siguientes resultados.
 * Unión: 𝐴⋃𝐵
 * Intersección 𝐴⋂𝐵
 * Diferencia: 𝐴Δ𝐵
 * Diferencia Simétrica: 𝐴 − 𝐵
 */
function mostrar_uniones(){
    limpiar_vista();
    document.getElementById("uniones").className = "btn btn-dark";
    const div_resultado = document.getElementById("resultados");
    div_resultado.innerHTML = "";
    
    const arreglo_a = ordenar(generar_arreglo_abecedario());
    const arreglo_b = ordenar(generar_arreglo_abecedario());
    mostrar_arreglo(div_resultado, "text-dark", "Arreglo A: ", arreglo_a);
    mostrar_arreglo(div_resultado, "text-dark", "Arreglo B: ", arreglo_b);
    mostrar_arreglo(div_resultado, "text-success", "Unión: A⋃B: ", calcular_union(arreglo_a, arreglo_b));
    mostrar_arreglo(div_resultado, "text-success", "Intersección A⋂B: ", calcular_interseccion(arreglo_a, arreglo_b));
    mostrar_arreglo(div_resultado, "text-success", "Diferencia: AΔB: ", calcular_diferencia(arreglo_a, arreglo_b));
    mostrar_arreglo(div_resultado, "text-success", "Diferencia Simétrica: A - B: ", calcular_diferencia_simetrica(arreglo_a, arreglo_b));
}

function generar_arreglo_abecedario(){
    const abecedario ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let arreglo_generado = [];
    for ( let i = 0; i < 10; i++ ) {
        arreglo_generado[i] = abecedario.charAt(aleatorio(0, abecedario.length-1));
    }

    return arreglo_generado;
}

function calcular_union(arreglo_a, arreglo_b){
    let union = unir_arreglos(arreglo_a, []);// genera un arreglo de valores únicos
    union = unir_arreglos(arreglo_b, union);// calcula la union de los dos arreglos

    return ordenar(union);
}

function calcular_interseccion(arreglo_a, arreglo_b){
    let interseccion = unir_arreglos(arreglo_a, []);// genera un arreglo de valores únicos
    interseccion = coincidencias_en_arreglo(interseccion, arreglo_b);// calcula la interseccion entre los 2 arreglos
    
    return ordenar(interseccion);
}

function calcular_diferencia(arreglo_a, arreglo_b){
    let diferencia = unir_arreglos(arreglo_a, []);// genera un arreglo de valores únicos
    diferencia = diferencia_entre_arreglos(diferencia, arreglo_b);// calcula la diferencia entre A y B
    
    return ordenar(diferencia);
}

function calcular_diferencia_simetrica(arreglo_a, arreglo_b){
    let valores_unicos_a = unir_arreglos(arreglo_a, []);// genera un arreglo de valores únicos
    let valores_unicos_b = unir_arreglos(arreglo_b, []);// genera un arreglo de valores únicos
    let diferencia_simetrica = diferencia_entre_arreglos(valores_unicos_a, valores_unicos_b);// calcula la diferencia entre A y B
    diferencia_simetrica = unir_arreglos(diferencia_entre_arreglos(valores_unicos_b, valores_unicos_a), diferencia_simetrica); // calcula la diferencia entre B y A; y une los arreglos
    
    return ordenar(diferencia_simetrica);
}

function unir_arreglos(arreglo_a, arreglo_b){
    let union = [...arreglo_b];
    let indice_utilizado = arreglo_b.length;
    let en_union = false;
    for(let i = 0; i < arreglo_a.length; i++){
        if(indice_utilizado != 0){
            for(let j = 0; j < union.length; j++){
                if(arreglo_a[i] == union[j]){
                    en_union = true;
                    break;
                }
            }
        }
        if(!en_union){
            union[indice_utilizado] = arreglo_a[i];
            indice_utilizado++;
        }
        en_union = false;
    }
    
    return union;
}

function diferencia_entre_arreglos(arreglo_a, arreglo_b){
    let diferencia = [];
    let indice_utilizado = 0;
    let son_iguales = false;
    for(let i = 0; i < arreglo_a.length; i++){
        for(let j = 0; j < arreglo_b.length; j++){
            if(arreglo_a[i] == arreglo_b[j]){
                son_iguales = true;
                break;
            }
        }
        if(!son_iguales){
            diferencia[indice_utilizado] = arreglo_a[i];
            indice_utilizado++;
        }
        son_iguales = false;
    }
    
    return diferencia;
}

function coincidencias_en_arreglo(arreglo_a, arreglo_b){
    let interseccion = [];
    let indice_utilizado = 0;
    let existe_valor = false;
    for(let i = 0; i < arreglo_a.length; i++){
        for(let j = 0; j < arreglo_b.length; j++){
            if(arreglo_a[i] == arreglo_b[j]){
                existe_valor = true;
                break;
            }
        }
        if(existe_valor){
            interseccion[indice_utilizado] = arreglo_a[i];
            indice_utilizado++;
        }
        existe_valor = false;
        
    }
    
    return interseccion;
}

/**
 * Funciones usadas para el punto 6
 * Se debe realizar una consulta tipo Rest al API de banco de MX del tipo de cambio 
 * de los últimos 5 días y mostrarlo en una tabla con fecha y tipo de cambio
 */
function mostrar_tipo_cambio(){
    limpiar_vista();
    document.getElementById("tipo_cambio").className = "btn btn-dark";
    const div_resultado = document.getElementById("resultados");
    const h4 = document.createElement('h4');
    h4.textContent = "Tipo de cambio de los últimos 5 días ";
    div_resultado.appendChild(h4);
    const serie = "SF63528";
    const rango = rango_fechas();
    const token = "ee87a0a947d04f812125e39288cc506102af7e17d79377c4b1b868723aa6033e";
    const endpoint = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/${serie}/datos/${rango[0]}/${rango[1]}?token=${token}`;
    fetch(endpoint)
    .then(response => response.json())
    .then(data => tabla_tipo_cambio(data.bmx.series[0].datos))
    .catch(function(error) {
       mensaje_validacion(false, `Hubo un problema con la petición, intente de nuevo`);
       console.log(error.message);
    });
}

function tabla_tipo_cambio(series){
    mensaje_validacion(true);
    const tabla = document.createElement('table');
    tabla.className = "table table-responsive table-dark table-hover";
    const thead = document.createElement('thead');
    const encabezado = document.createElement('tr');
    const encabezados_tabla = ['Número', 'Fecha', 'Tipo Cambio'];
    for(let columnas = 0; columnas < encabezados_tabla.length; columnas++){
        crear_columna(encabezado, 'th', encabezados_tabla[columnas]);
    }
    thead.appendChild(encabezado);
    tabla.appendChild(thead);
    const tbody = document.createElement('tbody');
    
    for(let filas = 0; filas < series.length; filas++){
        const fila_agregar = document.createElement('tr');
        crear_columna(fila_agregar, 'td', filas+1);
        crear_columna(fila_agregar, 'td', series[filas].fecha);
        crear_columna(fila_agregar, 'td', series[filas].dato);
        
        tbody.appendChild(fila_agregar);
    }
    tabla.appendChild(tbody);
    const div_resultado = document.getElementById("resultados");
    div_resultado.appendChild(tabla);
}

function crear_columna(contenedor, tipo,  texto){
    const columna_agregar = document.createElement(tipo)
    columna_agregar.textContent = texto;
    contenedor.appendChild(columna_agregar);
}

function rango_fechas(){
    const fecha_actual = new Date();
    const fecha_anterior = restar_dias(fecha_actual, 7);
    let rango_fechas = [];
    rango_fechas[0] = `${ fecha_anterior.getFullYear() }-${ fecha_anterior.getMonth() }-${ fecha_anterior.getDate() }`;
    rango_fechas[1] = `${ fecha_actual.getFullYear() }-${ fecha_actual.getMonth() }-${ fecha_actual.getDate() }`;
    
    return rango_fechas;
}

function restar_dias(fecha, dias){
    let dmls = dias*86400000;
    const nueva_fecha = new Date(fecha.getTime() - dmls);
    
    return nueva_fecha;
}

function mostrar_arreglo(contenedor, className, text, arreglo){
    const etiqueta_nombre = document.createElement("h5");
    etiqueta_nombre.className = className;
    etiqueta_nombre.textContent = text;
    contenedor.appendChild(etiqueta_nombre);

    const mostrar_arreglo = document.createElement("p");
    mostrar_arreglo.className = className;
    mostrar_arreglo.textContent = arreglo.join(", ");
    contenedor.appendChild(mostrar_arreglo);
}

function limpiar_vista(){
    const color_botones = document.getElementsByClassName("btn btn-dark");
    if(color_botones[0] != undefined){
        color_botones[0].className = "btn btn-outline-dark";
    }
    document.getElementById("funcionalidad").innerHTML = "";
    document.getElementById("resultados").innerHTML = "";
    document.getElementById("mensaje_validacion").innerHTML = "";
}

function generar_input(id, type, class_name, placeholder, min, step){
    const input_generado = document.createElement("input");
    input_generado.id = id;
    input_generado.type = type;
    input_generado.className = class_name;
    input_generado.placeholder = placeholder;
    input_generado.min = min;
    input_generado.step = step;

    return input_generado;
}

function generar_button(id, class_name, texto){
    const boton_generado = document.createElement("button");
    boton_generado.id = id;
    boton_generado.className = class_name;
    boton_generado.textContent  = texto;

    return boton_generado;
}

function mensaje_validacion(validacion, mensaje = null){
    const div_mensaje_validacion = document.getElementById("mensaje_validacion");
    div_mensaje_validacion.innerHTML = "";
    if(!validacion){
        const div_resultado = document.getElementById("resultados");
        div_resultado.innerHTML = "";
        const h4 = document.createElement("h4");
        h4.className = "text-danger";
        h4.textContent = mensaje;
        div_mensaje_validacion.appendChild(h4);
    }
    
}
