import React,{useState}from 'react';
import {connect} from "react-redux";
import {SearchUser} from "../Action"




const Search=(props)=>{
const [term,Setterm]=useState('');
let Onsubmit =(e)=>{
    e.preventDefault();
    props.SearchUser(term, props.history)
    Setterm('');
    }

return(
        <div className="ui  loading search">
              <form onSubmit={Onsubmit} >
                   <div  className="ui fluid icon input">                     
                         <input 
                         onChange= {e=>Setterm(e.target.value)} 
                         value={term} 
                         className="prompt"
                          type="text" 
                          placeholder="Search..."/>
                   </div>
              </form>
         </div>
    
);
}


export default connect(
    null,{SearchUser}
    ) (Search); 
