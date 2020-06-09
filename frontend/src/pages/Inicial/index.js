import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Inicial(){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
      async function loadSpots() {
          const user_id = localStorage.getItem('user');
          const response = await api.get('/inicial',{
              headers: { user_id } 
          });

          setSpots(response.data);
      }
      loadSpots();
    }, []);
    return (
    <>
        <ul className="spot-list">
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R${spot.price }/dia` : 'GRATUITO'}</span>
                </li>
            ))}

        </ul>
        
        <ul className="botao">

            <Link to="/conteudo">
                <button className="btn">Cadastrar Conteúdo</button>           
            </Link>

            <Link to="/perfil">
                <button className="btn">Cadastrar Perfil</button>
            </Link>

            <Link to="/curso">
                <button className="btn">Cadastrar Curso</button>
            </Link>
            
            <Link to="/relatorio">
                <button className="btn">Gerar Relatórios</button>
            </Link>  

            <Link to="/fichaavaliacao">
                <button className="btn">Gerar Ficha de avaliação</button>
            </Link> 
        
        </ul>
    </>
    ) 
}