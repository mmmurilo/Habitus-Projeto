import React, { useState, useMemo } from 'react';
import api from '../../services/api';


export default function Perfil({ history }){
    const [titulo, setTitulo] = useState('');
 

    async function handleSubmit(event){
        event.preventDefault();

        const response = await api.post('sessions', { titulo })

        const { _id } = response.data;
    
        localStorage.setItem('user', _id);

        history.push('/inicial');

  }



    return (
        <>
        <p>
          <strong>Cadastrar Perfil Profissiográfico</strong>
        </p>
      
        <form onSubmit = {handleSubmit}> 
            <label htmlFor="titulo">TÍTULO*</label>
            <input 
            id="titulo" 
            type="titulo" 
            placeholder=""
            value = {titulo}
            onChange={ event => setTitulo(event.target.value) }
            />
          <button className="btn" type="submit">Salvar</button>    
          <button className="btn" type="submit">Cancelar</button>   

        
        </form>

       
       
        </>

        )





}