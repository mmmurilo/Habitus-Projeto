import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';

import api from '../../services/api';
import './styles.css';


export const ConteudoList = () => {
    const [conteudos, setConteudos] = useState([]);

    useEffect(() => {
        api.get('conteudos').then(response => {
            setConteudos(response.data);
        });
    }, []);

    return (
        <div className="conteudo-list">
            <h3>Conteúdos</h3>

            <Link to="/perfil">
                
            </Link>

            <Link to="/conteudo/novo">
                <button className="btn">Novo Conteúdo</button>
            </Link>


            <table className="table table-striped table-hover">
                <thead>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Acoes</th>
                </thead>
                <tbody>
                    {conteudos.map(conteudo => (
                        <tr key={conteudo.id}>
                            <td>{conteudo.id}</td>
                            <td>{conteudo.nome_conteudo}</td>
                            <td>
                                <Link to={`/conteudo/${conteudo.id}`}><i className="fa fa-pencil"></i></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export const ConteudoEdit = () => {
    const [nomeConteudo, setNomeConteudo] = useState();
    const [pautas, setPautas] = useState([]);
    const [novaPauta, setNovaPauta] = useState('');
    const {conteudoId} = useParams();

    useEffect(() => {
        if (conteudoId) {
            api.get(`/conteudos/${conteudoId}`).then(response => {
                if (response.data) {
                    setNomeConteudo(response.data.nome_conteudo);
                    setPautas(response.data.pautas);
                }
            });
        }
    }, [conteudoId]);

    const salvarConteudo = () => {
        if (conteudoId !== 'novo') {
            api.post(`/conteudos/${conteudoId}`, {
                nome_conteudo: nomeConteudo
            }).then(() => {
                alert('Salvo!');
            });
        } else {
            api.post(`/conteudos`, {
                nome_conteudo: nomeConteudo
            }).then(response => {
                window.location = `/conteudo/${response.data.id}`;
            });
        }
    };

    const handleSubmitNovaPauta = (evt) => {
        evt.preventDefault();
        api.post(`/conteudos/${conteudoId}/pautas`, {
            desc_pauta: novaPauta
        }).then((response) => {
            setNovaPauta('');

            if (response.data) {
                setPautas(response.data.pautas);
            }
        })
    };

    const deletaPauta = (pautaId) => {
        api.delete(`/conteudos/${conteudoId}/pautas/${pautaId}`).then(response => {
            if (response.data) {
                setPautas(response.data.pautas);
            }
        });
    };

    return (
        <div className="conteudo-list">
            <h3>Conteúdo</h3>

            <div className="form-group">
                <h6>Nome: </h6>
                <input
                    className="form-control"
                    type="text"
                    value={nomeConteudo}
                    onChange={evt => setNomeConteudo(evt.currentTarget.value)}
                />
            </div>

            <button className="btn btn-success" onClick={salvarConteudo}>
                Salvar
            </button>

            {!!conteudoId && conteudoId !== 'novo' && (
                <div>
                    <hr />
                    <h4>Pautas</h4>
                    <table className="table table-striped table-hover">
                        <thead>
                            <th>Nome</th>
                            <th>Ações</th>
                        </thead>
                        <tbody>
                            {pautas.map(pauta => (
                                <tr key={pauta.id}>
                                    <td>{pauta.desc_pauta}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deletaPauta(pauta.id)}>
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <form onSubmit={handleSubmitNovaPauta}>
                        <div className="form-group">
                            <h4>Nova pauta:</h4>
                            <input
                                className="form-control"
                                type="text"
                                value={novaPauta}
                                onChange={evt => setNovaPauta(evt.currentTarget.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Adicionar</button>
                    </form>
                </div>
            )}
        </div>
    );
};
export default ConteudoList;