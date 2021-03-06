import axios from 'axios';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Cotizacion from './components/Cotizacion';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import imagen from './cryptomonedas.png';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
max-width: 100%;
margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);


  useEffect(() => {

    const cotizarCriptomoneda = async () => {

      // evitamos primera ejecucion
      if (moneda === '') return;

      // consultar api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

      const resultado = await axios.get(url);

      // mostrar spinner
      guardarCargando(true);

      // ocultar el spinner
      setTimeout(() => {

        // cambiar el estado de cargando
        guardarCargando(false);

        // guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

      }, 3000);


    }
    cotizarCriptomoneda();

  }, [moneda, criptomoneda])


  // mostrar Spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion
    resultado={resultado}
  />

  return (
    <Contenedor>
      <div>
        <Image
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
