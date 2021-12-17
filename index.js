// DOM
const botonAnterior = document.querySelector("#anterior")
const botonSiguiente = document.querySelector("#siguiente")
const carrouselItem = document.querySelector(".contenedor")
const inputBusqueda = document.querySelector("#busqueda")
const sbmtBusqueda = document.querySelector("#submt")
const divPaginadoCorriente = document.querySelector(".paginado-corriente")
const divPaginadoEspecifico = document.querySelector(".paginado-especifico")
const botonAnteriorBusqueda = document.querySelector("#anterior-e")
const botonSiguienteBusqueda = document.querySelector("#siguiente-e")


const baseUrlTcg = "https://api.pokemontcg.io/v2/cards" // url base de la api
const paginaDos = "https://api.pokemontcg.io/v2/cards?pageSize=250&page=2" // página 2 con query params
const buscarPorNombre = "https://api.pokemontcg.io/v2/cards?q=name:pikachu" // busqueda por nombre con qp
const paginadoConBusquedaEspecifica = "https://api.pokemontcg.io/v2/cards?q=name:pikachu&pageSize=10&page=1" // paginado con 10 elementos y búsqueda específica
const paginadoSiguiente = " https://api.pokemontcg.io/v2/cards?q=name:pikachu&pageSize=10&page=2" // la página siguiente de pikachu
const paginadoGeneral= "https://api.pokemontcg.io/v2/cards?pageSize=10&page=1" // paginado de 10 elementos, desde página 1

// variable de estado

let paginaActual = 1

// async await de la api

const urlPokemon = async () => {    
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=10&page=${paginaActual}`)
    const data = await respuesta.json()
    console.log(data)
    console.log(data.data)
    carrouselItem.innerHTML = aHTML(data)   
    
}    

botonSiguiente.onclick = () => (paginaActual++ && urlPokemon())  

botonAnterior.onclick = () => paginaActual !== 1 && (paginaActual-- && urlPokemon())

urlPokemon()


let busquedaPorInput = ""

const busquedaPokemon = async () => {
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${busquedaPorInput}&pageSize=10&page=${paginaActual}`)
    const data = await respuesta.json()   
    carrouselItem.innerHTML = aHTML(data) 

}  

sbmtBusqueda.onclick = (event) => {
    event.preventDefault()
    busquedaPorInput = inputBusqueda.value       
    busquedaPokemon()
    divPaginadoCorriente.style.display = "none"
    divPaginadoEspecifico.style.display = "flex"

}

botonSiguienteBusqueda.onclick = () => (paginaActual++ && busquedaPokemon())  

botonAnteriorBusqueda.onclick = () => paginaActual !== 1 && (paginaActual-- && busquedaPokemon()) 

const aHTML = (data) => {
    const arrayReduc = data.data.reduce((acc, elemento) => {
        return acc + `
        <div class="item">
        <img src="${elemento.images.large}" alt="${elemento.name}">
        </div>`
    }, "")

    return arrayReduc
} 

