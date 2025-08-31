import { useState, FormEvent } from 'react'
import './App.css'

import logoimg from './assets/logo.png'

interface infoProps{
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App(){

  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [info, setInfo] = useState<infoProps>()

  function calcular(e: FormEvent){
    e.preventDefault()

    let calculo = (gasolinaInput / alcoolInput);
    if(calculo <= 0.7){
      setInfo({
        title: 'Compensa usar álcool',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    }else{
      setInfo({
        title: "Compensa usar gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    }
    
  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br",
    {
      style: "currency",
      currency: "BRL"
    })
    return valorFormatado
  }

  return(
    <div>
      <main className='container'>
        <img className='logo'
        src={logoimg}
        alt='Logo de calculadora'
        />

        <h1 className='container-title'>Qual melhor opção?</h1>

        <form className='form' onSubmit={calcular}>

          <label>Alcool (Preço por litro)</label>
          <input className='input'
          placeholder='0.0'
          type='number'
          min='1'
          step='0.01'
          value={alcoolInput}
          onChange={ (e) => setAlcoolInput(Number(e.target.value))}
          required
          />

          <label>Gasolina (Preço por litro)</label>
          <input className='input'
          placeholder='0.0'
          type='number'
          min='1'
          step='0.01'
          value={gasolinaInput}
          onChange={ (e) => setGasolinaInput(Number(e.target.value))}
          required
          />

          <input className='button' type='submit' value='Calcular'/>
          
        </form>


        {info &&Object.keys(info).length > 0 &&(
        <section className='result'>
          <h1 className='result-title'>{info.title}</h1>

          <span>Gasolina: {info.gasolina}</span>
          <span>Alcool: {info.alcool}</span>
        </section>

        )}


      </main>

    </div>
  )
}

export default App