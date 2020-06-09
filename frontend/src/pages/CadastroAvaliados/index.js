import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }){
    const [thumbnail, setThumbnail] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])


   async function handleSubmit(event) {
       event.preventDefault();

       const data = new FormData();
       const user_id = localStorage.getItem('user');

       data.append('thumbnail', thumbnail);
       data.append('name', name);
       data.append('email', email);
       data.append('senha', senha);


       await api.post('/spots', data, {
           headers: { user_id }
       })

       history.push('/inicial');
    }

    return (
        <form onSubmit={handleSubmit}>
           

            
            <label htmlFor="name">NOME *</label>
            <input 
                id= "name"
                placeholder=""
                value={name}
                onChange={event => setName(event.target.value)}
            />
        
            <label htmlFor="email">E-MAIL * </label>
            <input 
                id= "email"
                placeholder=""
                value={email}
                onChange={event => setEmail(event.target.value)}
            />


            <button type="submit"className="btn">Cadastrar</button>
            <Link to="/Curso">
                <button type="submit"className="btn">Voltar</button>
            </Link>
           


        </form>
    )
}