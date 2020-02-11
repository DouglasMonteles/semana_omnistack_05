import React, { Component } from 'react';

import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';

import './Timeline.css';

import logoTwitter from './img/twitter.png';

export default class Timeline extends Component {
    state = {
        tweets: [],
        newTweet: ''
    };

    async componentDidMount() {
        this.subscribeToEvents();

        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3002'); //porta que o socket.io ouve 

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets]});
        });

        io.on('like', data => {
            this.setState({ 
                tweets: this.state.tweets.map(
                    // percoro cada tweet, se id do tweet do state for igual ao id do tweet que 
                    //vem no evendo data entao retorne data, o novo tweet atualizado, senao retorne o 
                    //tweet padrao 
                    tweet => (tweet._id === data._id ? data : tweet)
                )
            });
        });
    }

    handleNewTweet = async e => {
        if (e.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');
        
        await api.post('tweets', { content, author });

        this.setState({ newTweet: '' })
    }

    handleInputChange = (e) => {
        this.setState({ newTweet: e.target.value });
    }
    
    render() {
        return (
            <div className="timeline-wrapper">
                <img height={40} src={logoTwitter} alt="twitter"/>

                <form>
                    <textarea 
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está acontecendo?"
                        wrap="off"
                    ></textarea>
                </form>

                <ul className="tweet-list">
                { this.state.tweets.map(tweet => (
                    <Tweet key={tweet._id} tweet={tweet} />
                ))}
                </ul>
            </div>
        );
    }
}