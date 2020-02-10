import React, { Component } from 'react';

import './Timeline.css';

import logoTwitter from './img/twitter.png';

export default class Timeline extends Component {
    state = {
        newTweet: ''
    };

    handleNewTweet = (e) => {
        if (e.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');

        console.log(content, author);
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
                    ></textarea>
                </form>
            </div>
        );
    }
}