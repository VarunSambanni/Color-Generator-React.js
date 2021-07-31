import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({rgb, weight, index, x, error }) => {   //Applying CSS Inline styilng
  const [alert, setAlert] = useState(false);
  const hex = rgbToHex(...rgb);
  const bcg = rgb.join(',');
  
  useEffect(()=>{
    const timeout = setTimeout(()=>{setAlert(false)}, 2000);
    return ()=>{clearTimeout(timeout)};
  },[alert]);
  return <article className={`color ${(index > (100 / x) && error == false) && 'color-light'}`} style={{backgroundColor: `rgb(${bcg})`}} // Apply dark color for tints, and light for shades
  onClick={()=> {
    setAlert(true);
    navigator.clipboard.writeText(hex); // Copy to clipboard
  }}>
    <p className="percent-value">{weight}%</p>
    <p className="color-value">{hex}</p>
    {alert && <p className="alert">copied to clipboard</p>}
  </article>  
}

export default SingleColor
