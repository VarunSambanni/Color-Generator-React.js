import React, { useState,useEffect } from 'react'
import SingleColor from './SingleColor'
import Values from 'values.js' 

let x = 2 ;
const div_arr = [];
for(var i = 1; i <= 100; i++)
{
  div_arr.push(i);
}

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [divider, setDivider] = useState();
  const [list, setList] = useState(new Values("#6d51db").all(2));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Divider: " + divider);
    try{
          if (divider >= 100){
            x = 100;
          }
          else if (divider <= 1){
            x = 1 ;
          }
          else{
          x = div_arr[divider-1];
          }
          console.log("x: " + x);
          var colors = new Values(color).all(x);
          console.log(colors.length);
          setList(colors);
          setError(false);
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
      <input type="text" value={color} onChange ={(e) => setColor(e.target.value)} placeholder="#6d51db" className={`${error ? 'error' : null}`} style={{marginLeft: '140px', width:'200px'}}></input>
    <button className="btn" type="submit">Generate</button>
    <input type="text" value={divider} onChange ={(e) => setDivider(e.target.value)} placeholder="2" style={{marginLeft: '160px', width:'100px'}}></input>
    <label className="divider_btn">Step</label>
    </form>
  </section>

  <section className="colors">
    {list.map((color, index)=> {
    return <SingleColor key={index} {...color} index={index} x={x} error={error}/>})}
  </section>
  </>
  );
}

export default App
