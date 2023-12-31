import axios from 'axios';
import './Swflag.css';
import { useState, useEffect } from 'react';

function Swflag() {
  const [banderas, setBanderas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [adivinanza, setAdivinanza] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [timer, setTimer] = useState(15);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          'https://countriesnow.space/api/v0.1/countries/flag/images'
        );
        if (res.data && res.data.data && res.data.data.length > 0) {
          setBanderas(res.data.data);
          seleccionarBanderas(res.data.data);
          
        }
      } catch (error) {
        console.error('Error al obtener las banderas:', error);
      }
    }

    fetchData();
  }, []);

  const seleccionarBanderas = (banderas) => {
    const indice = Math.floor(Math.random() * 220);
    const banderaSeleccionada = banderas[indice];

    setSeleccionada(banderaSeleccionada);
    
    setAdivinanza('');
    setTimer(15);
    
  };
  const intentarAdivinar = () => {
    const paisAdivinado = adivinanza.toLowerCase();

    if (paisAdivinado === seleccionada.name.toLowerCase()) {
      const nuevosPuntos = puntos + 10;
      setPuntos(nuevosPuntos);
    } else {
      const nuevosPuntos = puntos - 1;
      setPuntos(nuevosPuntos);
    }

    seleccionarBanderas(banderas);
  };

  // Función para actualizar el temporizador
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    } else {
     
      seleccionarBanderas(banderas);
    }
  }, [timer, puntos, banderas]);

  return (
    <div className="container">
      <h1>Adivinar la Bandera</h1>
      {seleccionada && (
        <div className="card">
          <img className="banderaImg" src={seleccionada.flag} alt="Flag" />
          <h2>{adivinanza}</h2>
          <input
            type="text"
            value={adivinanza}
            onChange={(event) => setAdivinanza(event.target.value)}
            placeholder="Ingresa el nombre del país"
          />
          <button onClick={intentarAdivinar}>Adivinar</button>
          <p>Puntos: {puntos}</p>
          <p>Temporizador: {timer}s</p>
        </div>
      )}
    </div>
  );
}

export default Swflag;