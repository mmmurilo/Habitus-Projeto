import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';


export default function Conteudo({ history }){
    const [desc_pautaA, setPautaA] = useState('');
    const [desc_pautaB, setPautaB] = useState('');
    const [desc_pautaC, setPautaC] = useState('');
    const [desc_pautaD, setPautaD] = useState('');
    const [nome_conteudo,setNovoConteudo] = useState('');
    const [id,setID] = useState('');
    const [conteudos, setConteudos] = useState(['']);
    
    useEffect(() => {
        api.get(`conteudos`).then(resp => {
            setConteudos(resp.data);
        })
    }, []);

    async function handleSubmit(event){
        event.preventDefault()


        history.push('/inicial');
    }

    async function cadastrarConteudo(event){
        event.preventDefault()
        const conteudoNovo = {nome_conteudo: nome_conteudo}

        const conteudo = api.post(`conteudos`,conteudoNovo).then(resp => {
            return resp.data;
        }).catch(console.log(`Error: ${console.error}`));

        api.get(`conteudos`).then(resp => {
            setConteudos(resp.data);
        })

        api.get(`conteudo/${nome_conteudo}`).then(resp => {
            setID(resp.data);
        })

        const pautaA = {desc_pauta: desc_pautaA}
        api.post(`conteudos/${id}/pautas`,pautaA).then(resp => {
            return resp.data;
        }).catch(console.log(`Error: ${console.error}`));

        const pautaB = {desc_pauta: desc_pautaB}
        api.post(`conteudos/${id}/pautas`,pautaB).then(resp => {
            return resp.data;
        }).catch(console.log(`Error: ${console.error}`));

        const pautaC = {desc_pauta: desc_pautaC}
        api.post(`conteudos/${id}/pautas`,pautaC).then(resp => {
            return resp.data;
        }).catch(console.log(`Error: ${console.error}`));

        const pautaD = {desc_pauta: desc_pautaD}
        api.post(`conteudos/${id}/pautas`,pautaD).then(resp => {
            return resp.data;
        }).catch(console.log(`Error: ${console.error}`));

        history.push('/conteudo');
    }  

    async function cancelar(event){
        event.preventDefault();

        history.push('/inicial');
    }

    return (
        <>
        <p>
          <strong>Cadastrar Conteúdo</strong>
        </p>
      
        <form onSubmit = {handleSubmit}> 
            <label>Selecionar Conteúdo já cadastrado:</label>
            <select id="listaConteudos">
                <option value = '0'>Selecione um Conteúdo</option>
                {conteudos.map(conteudo => (<option key={conteudo.id} value={conteudo.id}>
                    {conteudo.nome_conteudo}</option>))}
            </select>       
        </form>

        <form onSubmit = {handleSubmit}>
            <label>Novo Conteúdo</label>
            <input 
            id="nome_conteudo" 
            type="nome_conteudo" 
            placeholder="Adicione Novo Conteúdo"
            value = {nome_conteudo}
            onChange={ event => setNovoConteudo(event.target.value)}
            />               
        </form>
        
        <form onSubmit = {handleSubmit}> 
            <label htmlFor="desc_pauta">PAUTAS*</label>
            <input 
            id="desc_pauta" 
            type="desc_pauta" 
            placeholder="Cadastrar Pauta 01"
            value = {desc_pautaA}
            onChange={ event => setPautaA(event.target.value) }
            />        
        </form>

        <form onSubmit = {handleSubmit}>        
            <input 
            id="desc_pauta" 
            type="desc_pauta" 
            placeholder="Cadastrar Pauta 02"
            value = {desc_pautaB}
            onChange={ event => setPautaB(event.target.value) }
            />
        </form>

        <form onSubmit = {handleSubmit}>         
            <input 
            id="desc_pauta" 
            type="desc_pauta" 
            placeholder="Cadastrar Pauta 03"
            value = {desc_pautaC}
            onChange={ event => setPautaC(event.target.value) }
            />
        </form>

        <form onSubmit = {handleSubmit}> 
            <input 
            id="desc_pauta" 
            type="desc_pauta" 
            placeholder="Cadastrar Pauta 04"
            value = {desc_pautaD}
            onChange={ event => setPautaD(event.target.value) }
            />
        </form>
        
        <button className="btn" onClick={cadastrarConteudo}>Cadastrar</button>
        <button className="btn" onClick={cancelar}>Cancelar</button>
        
        </>

        )

}