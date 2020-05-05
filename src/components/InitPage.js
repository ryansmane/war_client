import React from 'react';

function InitPage(props) {
    return (
        <>
        <h1>{props.host}</h1>
        <button onClick={() => props.initMyself()}>Ready</button>
        </>
    )
}

export default InitPage;