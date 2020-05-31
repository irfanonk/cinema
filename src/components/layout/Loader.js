import React from 'react'

export default function Loader() {
    return (
        <React.Fragment>
            <div className="ui segment">
                <div className="ui active dimmer">
                    <div className="ui huge text loader">Preparing Movies</div>
                </div>
                <p></p>
            </div>
        </React.Fragment>
    )
}
