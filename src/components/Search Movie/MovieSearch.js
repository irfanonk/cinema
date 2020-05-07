import React, { Component } from 'react'

export default class movieSearch extends Component {
    render() {
        return (
            <div>
                <div className="ui purple center aligned segment">
                    <h1 className="header">Search a Movie</h1>
                </div>
                <input placeholder="type to search movie" />
            </div>
        )
    }
}
