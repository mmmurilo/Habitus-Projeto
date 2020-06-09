import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Curso({ history }){
    const [titulo, setTitulo] = useState('');
    const [inicio, setInicio] = useState('');
    const [final, setFinal] = useState('');
    

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
          <strong>Cadastrar Curso</strong>
        </p>
      
      <form onSubmit = {handleSubmit}> 
        <label htmlFor="titulo">Título*</label>
        <input 
          id="titulo" 
          type="titulo" 
          placeholder=""
          value = {titulo}
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

      <Link to="/cadastroavaliados">
         <button className="btn" type="submit">Cadastrar Avaliados</button>                       
      </Link>

      <Link to="/cadastroavaliadores">
            <button className="btn" type="submit">Cadastrar Avaliadores</button>
      </Link>
     
       <button className="btn" type="submit">Cancelar</button>
       <button className="btn" type="submit">Salvar</button>
      

      </form>
      
      </>
    )
}
        
        
        
    
 