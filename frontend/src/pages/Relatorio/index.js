import React, { useState, useMemo } from 'react';
import api from '../../services/api';



export default function Relatório({ history }){
    const [dinicio, setTitulo] = useState('');
    const [inicio, setInicio] = useState('');
    const [final, setFinal] = useState('');
    

    async function handleSubmit(event){
        event.preventDefault();

        const response = await api.post('sessions', { dinicio })

        const { _id } = response.data;
    
        localStorage.setItem('user', _id);

        history.push('/inicial');

  }



    return (
        <>
        <p>
          <strong>Gerar Relatório</strong>
        </p>
      
      <label>
        Filtrar por:
      </label>
        <p>
          
        </p>

      <form onSubmit = {handleSubmit}> 
        <label htmlFor="dinicio">Título*</label>
        <input 
          id="dinicio" 
          type="dinicio" 
          placeholder=""
          value = {dinicio}
          onChange={ event => setTitulo(event.target.value) }
        />

      <form onSubmit = {handleSubmit}> 
        <label htmlFor="inicio ">Data de Inicio*</label>
        <input 
          id="inicio" 
          type="inicio" 
          placeholder=""
          value = {inicio}
          onChange={ event => setInicio(event.target.value) }
        />

      </form>

      <form onSubmit = {handleSubmit}> 
        <label htmlFor="final">Data Final*</label>
        <input 
          id="final" 
          type="final" 
          placeholder=""
          value = {final}
          onChange={ event => setFinal(event.target.value) }
        />

      </form>
     
       <button className="btn" type="submit">Gerar</button>
       <button className="btn" type="submit">Cancelar</button>
      

      </form>
      
      </>
    )
}
     