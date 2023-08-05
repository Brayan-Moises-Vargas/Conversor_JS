



const formulario = document.getElementById("calcular")
const chat = document.getElementById("michat")
let michat; 

const obtenerDatosMoneda = async (monedas) => {
    try{
        const valores= await fetch(`https://mindicador.cl/api/${monedas}`)
        const resultado = await valores.json()
        console.log(resultado)
        return resultado.serie
    }
    catch (errores){
        alert(errores.message)
    }
}
obtenerDatosMoneda("dolar")

const calcularTotalenMonedas= (valor, datos) =>{
const valormoneda = datos[0].valor //dolar
const total = valor / valormoneda //1000 / 800
return Math.round(total *100)/100
}

const mostrarTotalpantalla = (total) =>{
document.getElementById("total-valores").innerHTML= total
}
const obtenervalores= (datos) =>{
return datos.map((item) => item.valor)

}
const obtenerfechas = (datos) =>{
    return datos.map((item) => new Date(item.fecha).toLocaleDateString("en-US")) //esto lo convierte en formato de fecha
}

const destruirgraficoantes= () =>{
if(michat){
    michat.destroy()
}
}

const calcularvalormoneda = async (valor, moneda) => {
    const datos = await obtenerDatosMoneda(moneda)
    mostrargrafico(datos, valor)
}

const mostrargrafico = (datos, valor) => {
    const total = calcularTotalenMonedas(valor, datos)
    mostrarTotalpantalla(total)

    const labels = obtenerfechas(datos) //obtengo fechas
    const value = obtenervalores(datos) //obtengo los datos "moneda"

    const datasets= [{
        label: "Moneda", 
        borderColor: "turquoise", 
        data: value
    }
    ]

    const config ={
        type: "line", 
        data:{
            labels, datasets
        }
    }

    destruirgraficoantes()

chat.style.backgroundColor= "black"
chat.style.borderRadius= "10px"



michat = new Chart(chat, config)
}


formulario.addEventListener("submit", async (event) =>{
    event.preventDefault() //si se utiliza el formilario 

    const valor = formulario.elements["addlospesos"].value //valor que agrega el usuario
    const moneda = formulario.elements["Monedas"].value
     if(!valor){
        alert("ingrese su valor")
        return
     }
     
     if(!moneda){
        alert("seleccione una meneda")
        return
     }

     await calcularvalormoneda(valor,moneda)
})