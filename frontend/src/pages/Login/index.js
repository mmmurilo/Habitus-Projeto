import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Login({ history }){
    const [email_usuario, setEmail] = useState('');
    const [senha_usuario, setSenha] = useState('');
    const [correto,setCorreto] = useState('');

    async function login(event){
      event.preventDefault();

      const conta = {email_usuario: email_usuario,senha_usuario: senha_usuario};

      api.get(`login`,conta).then(resp => {
        setCorreto(resp.data);
      })

      if(correto){
        history.push('inicial');
      } else {
        history.push('');
      }
    }

    async function handleSubmit(event){
        event.preventDefault();

        const response = await api.post('sessions', { email_usuario })

        const { _id } = response.data;
    
        localStorage.setItem('user', _id);

        //history.push('/inicial');

  }

  return (
        <>   
      
      <form onSubmit = {handleSubmit}> 
        <label htmlFor="email_usuario">E-MAIL*</label>
        <input 
          id="email_usuario" 
          type="text" 
          placeholder="Seu melhor e-mail"
          value = {email_usuario}
          onChange={ event => setEmail(event.target.value) }
        />

      <form onSubmit = {handleSubmit}> 
        <label htmlFor="senha_usuario">SENHA*</label>
        <input 
          id="senha_usuario" 
          type="password" 
          placeholder="Sua senha"
          value = {senha_usuario}
          onChange={ event => setSenha(event.target.value) }
        />

      </form>
    
      <button className="btn" onClick={login}>Login</button>
      
            <Link to="/Inicial">
                <button type="submit"className="btn">Entrar Link</button>
            </Link>
           
      </form>
      </>
    )
}