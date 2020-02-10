import React, { Component } from 'react';

import './Login.css';

import logoTwitter from './img/twitter.png';

export default class Login extends Component {
    state = {
        username: '',
    };

    handleSubmit = (event) => {
        event.preventDefault();
        
        const { username } = this.state;

        if (!username) return;

        localStorage.setItem('@GoTwitter:username', username);

        this.props.history.push('/timeline');
    }

    handleInputChange = (event) => {
        this.setState({ username: event.target.value });
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={logoTwitter} alt="twitter"/>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        placeholder="Nome de usuário" 
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}