import React from 'react';
import {connect} from "react-redux";
import {SearchUser} from "../Action"




class Search extends React.Component{

    constructor(props){
        super(props);
        this.state={term:''}
     
    }

Onsubmit =(e)=>{

e.preventDefault();
this.props.SearchUser(this.state.term, this.props.history)
this.setState({term:""})
}


render(){

return(


    <div className="ui container" style={{width:"50%",paddingTop:"10px"}}>
         <div className="ui  loading search">
              <form onSubmit={this.Onsubmit} >
                   <div  className="ui fluid icon input">                     
                         <input 
                         onChange= {e=>this.setState({term:e.target.value})} 
                         value={this.state.term} 
                         className="prompt"
                          type="text" 
                          placeholder="Search..."/>
                   </div>
              </form>
         </div>
    </div>
);
}}


export default connect(
    null,{SearchUser}
    ) (Search); 
