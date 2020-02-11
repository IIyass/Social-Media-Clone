import React from 'react';
import {connect} from 'react-redux';
import {PostCreated} from '../Action';

class AddPost extends React.Component{


constructor(props){
    super(props);
    this.state={
      text:''
    };
       this.Onsubmit =this.Onsubmit.bind(this);
       this.handleChange = this.handleChange.bind(this);
} 



Onsubmit=(e)=>{
e.preventDefault();
const fo ={
    text:this.state.text
}
    this.props.PostCreated(fo);
    this.setState({text:""});
    };


handleChange=(e)=>{
    this.setState({text:e.target.value});
    }


    render(){
       
        return(
            <div className="ui container">
                <form onSubmit={this.Onsubmit}  className="ui form">
                      <div className="field">
                     <label className="label1">
                           Add a Statut
                     </label>
                   
                     <textarea placeholder="What's New" rows="2" 
                           value={this.state.text} 
                           onChange= {this.handleChange}  >
                     </textarea>
                     <button  className="ui primary button" type="submit" >
                            Share
                     </button>
              

                       </div>
                </form >
            </div>
            );
}}


export default connect(
 null,{PostCreated}
) (AddPost); 
          
          
          