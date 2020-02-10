import React, { Component } from 'react';
import api from '../services/api';

import Tweet from '../components/Tweet';

import './Timeline.css';

import logoTwitter from './img/twitter.png';

export default class Timeline extends Component {
    state = {
        tweets: [],
        newTweet: ''
    };

    async componentDidMount() {
        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
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