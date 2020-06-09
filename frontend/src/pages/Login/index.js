import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        const response = await api.post('sessions', { email })

        const { _id } = response.data;
    
        localStorage.setItem('user', _id);

        history.push('/inicial');

  }



    return (
        <>
   
      
      <form onSubmit = {handleSubmit}> 
        <label htmlFor="email">E-MAIL*</label>
        <input 
          id="email" 
          type="email" 
          placeholder="Seu melhor e-mail"
          value = {email}
          onChange={ event => setEmail(event.target.value) }
        />

      <form onSubmit = {handleSubmit}> 
        <label htmlFor="senha">SENHA*</label>
        <input 
          id="senha" 
          type="password" 
          placeholder="Sua senha"
          value = {senha}
          secureTextEntry={true} 
          onChange={ event => setSenha(event.target.value) }
        />

      </form>

       <button className="btn" type="submit">Entrar</button>

      </form>
      </>
    )
}