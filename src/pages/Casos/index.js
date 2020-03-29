import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import './style.css';
import api from '../../services/api';

export default function Casos() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory(); 

    const ongId = localStorage.ongId;
    const ongName = localStorage.ongName;

    useEffect(() => {
        api.get('incidents').then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function TopHeader(props) {
        if (ongId) {
          return headerUser();
        }
        return headerVisitor();
    }
    
    function headerUser(){
        return(
            <React.Fragment>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </React.Fragment>
        );
    }

    function headerVisitor() {
        return(
            <React.Fragment>
                <Link className="button" to="/">Login</Link>
            </React.Fragment>
        );
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <TopHeader/>
            </header>
            <h1>Todos os Casos</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>
                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}