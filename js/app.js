const ingresos = [
    new Ingreso('Sueldo', 2100 ),
    new Ingreso('Venta PC', 1500),
    new Ingreso('Venta Guitarra', 400)
]

const egresos = [
    new Egreso('Renta', 900),
    new Egreso('Ropa', 400),
]

let cargarApp = () => {
    cargarCabecero()
    cargarIngresos()
    cargarEgresos()
}

let cargarCabecero = () => {
    let presupuestoTotal = totalIngresos() - totalEgresos()
    let porcentajeEgreso =  (totalEgresos()/totalIngresos())

    console.log(presupuestoTotal)

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuestoTotal)
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos())
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos())
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso)
}

let totalIngresos = () => {
    let totalIngreso = 0
    for(let ingreso of ingresos){
        console.log(ingreso)
        totalIngreso += ingreso.valor
    }
    return totalIngreso
}

let totalEgresos = () => {
    let totalEgreso = 0
    for(let egreso of egresos){
        totalEgreso += egreso.valor
    }
    console.log(totalEgreso)
    return totalEgreso
}

/*Vamos a hacer uso de la internacionalización de valores en Javascipt, para ello se usa una librería llamada Intl*/
const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2})
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits:1})
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso)
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.idIngreso})"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
        `
    return ingresoHTML
}

const eliminarIngreso = (id) => {
    let indice = ingresos.findIndex( (ingreso) => ingreso.idIngreso === id )
    let ingreso = ingresos[indice]
    ingresos.splice(indice, 1)
    delete ingreso
    cargarCabecero()
    cargarIngresos()
}

const cargarEgresos = () => {
    let egresosHTML = ''
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso)
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalIngresos())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.idEgreso})"></ion-icon>
                    </button>
                </div>
            </div>
        </div>  
    `
    return egresoHTML
}

const eliminarEgreso = (id) => {
    let indice = egresos.findIndex( (egreso) => egreso.idEgreso === id )
    let egreso = egresos[indice]
    egresos.splice(indice, 1)
    delete egreso
    cargarCabecero()
    cargarEgresos()
}

const agregarDato = () =>{
    let formulario = document.getElementById('formulario')
    let tipo = formulario['tipo']
    let descripcion = formulario['descripcion']
    let valor = formulario['valor']

    if(descripcion.value !== '' && valor.value !== ''){
        if (tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)))
            cargarCabecero()
            cargarIngresos()
        } else {
            egresos.push(new Egreso(descripcion.value, +valor.value))   //Añadiendo el mas antes del valor es una sintaxis simplificada para convertir strings en cadenas (no sé si generalmente o solo cuando creamos objetos)
            cargarCabecero()
            cargarEgresos()
        }
        //Limpiamos los elementos del formulario
        descripcion.value = ''
        valor.value = ''

    }else{
        alert('Los campos "descripción" y "valor" NO deben estar vacíos')
    }
}