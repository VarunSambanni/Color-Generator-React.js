import React, { useState,useEffect } from 'react'
import SingleColor from './SingleColor'
import Values from 'values.js' 

let x = 2 ;
let temp_color ="#6d51db";
const div_arr = [];
for(var i = 1; i <= 100; i++)
{
  div_arr.push(i);
}

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [divider, setDivider] = useState(2);
  const [prevdivider, setPrevDivider] = useState(1);  // Keeps track of the previous step or divider.
  const [prevcolor, setPrevColor] = useState("#6d51db");  // Keeps track of the previous color.
  const [error2, setError2]  = useState(false);
  const [list, setList] = useState(new Values("#6d51db").all(2));
  const handleSubmit = (e) => {
    e.preventDefault();
    const step = parseInt(divider);
    console.log("Step : " + step);
    x = -1;
          if (step >= 100){
            x = 100;
          }
          else if (step <= 1){
            x = 1 ;
          }
          else{
          x = div_arr[step-1];
          }
    try{
          if (x === undefined){
            setError2(true);
            x = div_arr[prevdivider];
            console.log("x: " + x);
            var colors = new Values(color).all(x);
            console.log(colors.length);
            setList(colors);
          }
          else{
            setError2(false);
            setPrevDivider(x-1);
            console.log("x: " + x);
            var colors = new Values(color).all(x);
            console.log(colors.length);
            setList(colors);
            setError(false);
          }
          if (color !== undefined){
          temp_color = color;
          setPrevColor(temp_color);
          }
        
    }
    catch (error){
      setError(true);
      console.log("Error: " + error);
      console.log(temp_color);
      
      if (x === undefined){
            console.log("Yes");
            setError2(true);
            x = div_arr[prevdivider];
            console.log("x: " + x);
            var colors = new Values(temp_color).all(x);
            console.log(colors.length);
            setList(colors);
          }
          else{
            setError2(false);
            setPrevDivider(x-1);
            console.log("x: " + x);
            var colors = new Values(prevcolor).all(x);
            console.log(colors.length);
            setList(colors);
            
          }

    }

  }


  return(
  <>
  <section className="container">
    <h3>Color generator</h3>
    <form onSubmit={handleSubmit}>
      <input type="text" value={color} onChange ={(e) => setColor(e.target.value)} placeholder="#6d51db" className={`${error ? 'error' : null}`} style={{marginLeft: '140px', width:'200px'}}></input>
    <button className="btn" type="submit">Generate</button>
    <input type="text" value={divider} onChange ={(e) => setDivider(e.target.value)} placeholder="2" style={{marginLeft: '160px', width:'100px'}} className={`${error2 ? 'error' : null}`}></input>
    <label className="divider_btn">Step</label>
    </form>
  </section>

  <section className="colors">
    {list.map((color, index)=> {
    return <SingleColor key={index} {...color} index={index} x={x} error={error} error2 ={error2}/>})}
  </section>
  </>
  );
}

export default App
