import axios from 'axios'
import {useState, useEffect} from 'react'

function Swflag(){
const [ bandera, setBandera] = useState('')
    useEffect(()=>{
        async function fetchData(){
            const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`)  // acá hacemos la consulta de axios a la API
            setBandera(res.data) // la data devuelta de la consulta la almacenamos en la variable movie
            console.log(res.data.data[0].flag)  // mostramos por consola la data que devolvió la consulta de la API
        }
        fetchData() // ejecutamos la función de búsqueda de datos
        console.log(bandera) 
},[])
return(
<div>
    hola
</div>
)}

export default Swflag;