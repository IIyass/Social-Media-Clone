import React from 'react';

const DisplayPicture =(props)=>{
    const {url} = props
    return(
<img src={url}    style={{borderStyle:"solid" ,borderRadius:"30px",borderWidth:"5px",borderColor:"#1E90FF"}} alt="Upload image" height="300" width="400"/>
    );
}

export default DisplayPicture;