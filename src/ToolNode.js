import React from 'react';

function ToolNode({name}) {
    
    return (
        <div className="tool-node">
            <div className='tool-node-container'>
                <div className='tool-icon'></div>
                <h2>{name}</h2>
            </div>
        </div>
    )
}

export default ToolNode;