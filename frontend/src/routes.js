import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Inicial from './pages/Inicial';
import CadastroAvaliados from './pages/CadastroAvaliados';
import CadastroAvaliadores from './pages/CadastroAvaliados';
import Conteudo from './pages/Conteudo';
import Curso from './pages/Curso';
import FichaAvaliacao from './pages/FichaAvaliacao';
import Perfil from './pages/Perfil';
import Relatorio from './pages/Relatorio';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path= "/" exact component={Login} />
                <Route path= "/inicial" component={Inicial} />
                <Route path= "/cadastroavaliados" component={CadastroAvaliados} />
                <Route path= "/cadastroavaliadores" component={CadastroAvaliadores} />
                <Route path= "/conteudo" component={Conteudo} />
                <Route path= "/curso" component={Curso} />
                <Route path= "/fichaavaliacao" component={FichaAvaliacao} />
                <Route path= "/perfil" component={Perfil} />
                <Route path= "/relatorio" component={Relatorio} />
            </Switch>
        </BrowserRouter>
    );
}