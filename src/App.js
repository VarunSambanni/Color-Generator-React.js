import React, { useState,useEffect } from 'react'
import SingleColor from './SingleColor'
import Values from 'values.js' 

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [divider, setDivider] = useState(2);
  const [list, setList] = useState(new Values("#6d51db").all(2));
  const handleSubmit = (e) => {
    console.log("Divider: " + divider);
    e.preventDefault();
    try{

         var colors = new Values(color).all(2);
         console.log(colors.length);
         setList(colors);
    }
    catch (error){
      console.log("Error: " + error);
      setError(true);
    }

  }


  return(
  <>
  <section className="container">
    <h3>Color generator</h3>
    <form onSubmit={handleSubmit}>
      <input type="text" value={color} onChange ={(e) => setColor(e.target.value)} placeholder="#f15025" className={`${error ? 'error' : null}`}></input>
    <button className="btn" type="submit">Generate</button>
    <input type="text" value={divider} onChange ={(e) => setDivider(e.target.value)} placeholder="2" style={{marginLeft: '160px', width:'100px'}}></input>
    <label className="btn">Divider</label>
    </form>
  </section>

  <section className="colors">
    {list.map((color, index)=> {
    return <SingleColor key={index} {...color} index={index} divider={divider}/>})}
  </section>
  </>
  );
}

export default App
