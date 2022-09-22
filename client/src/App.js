import React, { Component } from 'react';
import { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";
//import HorizontalScroll from 'react-scroll-horizontal'

function App() {
  const [listOfPeople, setListOfPeople] = useState([]);
  const [name, setName] = useState("");
  const [statement, setStatement] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getPeople").then((response) => {
      setListOfPeople(response.data);
    })
  }, []);

  const createPerson = () => {
    Axios.post("http://localhost:3001/createPerson",
     {name, statement})
    .then((response) => {
        setListOfPeople([...listOfPeople, {name, statement}])
        document.getElementById("user-input").style.display = "none";
    })
  } 

  return (
    <>
    <h1 className="title">Array of Advice</h1>
    {/* <HorizontalScroll className="scroll-box" reverseScroll="true"> */}
    <div className="App" id="wrapper"> {/* useState hook will handle our data */ }       
        
        
        <div className="people">
        <div className="">
          <h1 className="array-bracket">[</h1>
        </div>
            {listOfPeople.map((person) => { {/*map runs this function for each person*/}
                return (
                  <>
                  <div className="person-advice">
                    <h2 className="advice">"{person.statement}"</h2>
                    <h3 className="person">- {person.name}</h3>                    
                  </div>
                  <h1 className="array-comma">,</h1>
                  </>
                )
            })}
        
          <div className="person-advice" id="user-input">
            <input className="input-statement" type="text" placeholder="Your advice (no quotes)" onChange={(event) =>{ setStatement(event.target.value); }}/> 
            <input className="input-name" type="text" placeholder="Your Name" onChange={(event) =>{ setName(event.target.value); }}/>            
            <button className="input-submit" onClick={createPerson}>Add Your Advice</button>
        </div>
        <div className="">
          <h1 className="array-bracket">]</h1>
        </div> 
        </div>
            
        
    </div>
    {/* </HorizontalScroll>  */}
    </>  
  );
}

export default App;
