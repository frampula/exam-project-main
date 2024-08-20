import React from 'react';
import styles from './MatchingUrl.css'

const MatchingUrl = () => {
    return (
        <>
        <span className='urlContainer'>
        <div className='urlText'>
            Do you want a matching domain (.com URL) with your name?
        </div>
        </span>
        <span className='urlButtonsContainer'>
        <div className='urlButton'>Yes but minor variations are allowed</div>
        <div className='urlButton'>Yes The Domain should exactly match the name</div>
        <div className='urlButton'>No I am only looking for a name, not a Domain</div>
        </span>
        </>
    );
}

export default MatchingUrl;
