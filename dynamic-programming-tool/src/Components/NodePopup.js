//https://youtu.be/i8fAO_zyFAM?si=ShFNhiin4GUyrc4t
import React from 'react';
import "../Styles/Popup.css"

function Popup(props){
    return(props.trigger) ? ( 
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;