"use strict"

import {
    datosJsonInicial,
    localStorageKey
} from "./datos.js"

let posicion = 0

let aciertos = 0
let fallos = 0
let intentos = 0

let lista = datos.slice(0,10)

let img = document.getElementById("imagen_hiragana")
let input = document.getElementById("entrada_usuario")

let txtAciertos = document.getElementById("aciertos")
let txtFallos = document.getElementById("fallos")
let txtIntentos = document.getElementById("intentos")
let txtPendientes = document.getElementById("pendientes")

let botonComprobar = document.getElementById("boton_comprobar")
let botonResetear = document.getElementById("boton_resetear")


function mostrarImagen(){

    if(posicion >= lista.length){
        img.src = "assets/terminado.jpg"
    }else{
        img.src = lista[posicion].img
    }

}

function actualizarDatos(){

    txtAciertos.innerText = aciertos
    txtFallos.innerText = fallos
    txtIntentos.innerText = intentos
    txtPendientes.innerText = 10 - aciertos

}

botonComprobar.onclick = function(){

    let respuesta = input.value
    respuesta = respuesta.toLowerCase()

    if(posicion >= lista.length){
        return
    }

    intentos++

    if(respuesta == lista[posicion].name){

        aciertos++
        posicion++

    }else{

        fallos++

    }

    input.value = ""

    actualizarDatos()
    mostrarImagen()

    if(intentos > 0){

        let progreso = {
            posicion: posicion,
            aciertos: aciertos,
            fallos: fallos,
            intentos: intentos
        }

        localStorage.setItem("juegoHiragana", JSON.stringify(progreso))

    }

}


botonResetear.onclick = function(){

    posicion = 0
    aciertos = 0
    fallos = 0
    intentos = 0

    localStorage.removeItem("juegoHiragana")

    actualizarDatos()
    mostrarImagen()

}


function cargarPartida(){

    let guardado = localStorage.getItem("juegoHiragana")

    if(guardado != null){

        let datosGuardados = JSON.parse(guardado)

        posicion = datosGuardados.posicion
        aciertos = datosGuardados.aciertos
        fallos = datosGuardados.fallos
        intentos = datosGuardados.intentos

    }

}

cargarPartida()
actualizarDatos()
mostrarImagen()