import React, { Component } from 'react';

import './Timeline.css';

import logoTwitter from './img/twitter.png';

export default class Timeline extends Component {
    state = {
        newTweet: ''
    };

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
                    ></textarea>
                </form>
            </div>
        );
    }
}