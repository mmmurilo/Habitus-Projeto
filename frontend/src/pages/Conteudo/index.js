import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import './styles.css';


export default function Conteudo({ history }){
    const [pauta, setPauta] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        const response = await api.post('sessions', { pauta })

        const { _id } = response.data;
    
        localStorage.setItem('user', _id);

        history.push('/inicial');

  }



    return (
        <>
        <p>
          <strong>Cadastrar Conteúdo</strong>
        </p>
      
        <form onSubmit = {handleSubmit}> 
            <label htmlFor="pauta">PAUTA*</label>
            <input 
            id="pauta" 
            type="pauta" 
            placeholder="Cadastrar Pauta 01"
            value = {pauta}
            onChange={ event => setPauta(event.target.value) }
            />

        
        </form>

        <form onSubmit = {handleSubmit}> 
        
            <input 
            id="pauta" 
            type="pauta" 
            placeholder="Cadastrar Pauta 02"
            value = {pauta}
            onChange={ event => setPauta(event.target.value) }
            />

        
        

        </form>

        <form onSubmit = {handleSubmit}> 
        
        <input 
        id="pauta" 
        type="pauta" 
        placeholder="Cadastrar Pauta 03"
        value = {pauta}
        onChange={ event => setPauta(event.target.value) }
        />

    
    

    </form>
        <form onSubmit = {handleSubmit}> 
        
        <input 
        id="pauta" 
        type="pauta" 
        placeholder="Cadastrar Pauta 04"
        value = {pauta}
        onChange={ event => setPauta(event.target.value) }
        />
        
        <button className="btn" type="submit">Cadastrar</button>
        <button className="btn" type="submit">Cancelar</button>
        </form>




        </>

        )





}