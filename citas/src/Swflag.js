import axios from 'axios'
import {useState, useEffect} from 'react'

function Swflag(){
const [ banderas, setBandera] = useState([])
useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');
      setBandera(res.data.data); // Corregimos esta línea para almacenar correctamente los datos de la respuesta en 'bandera'
      console.log(res.data.data); // Mostramos los datos en la consola
    }

    fetchData();
  }, []);

  return (
    <div> 
      {banderas.length > 0 && <img src={banderas[-1].flag} alt="Flag"/>}
    </div>
  );}

export default Swflag;