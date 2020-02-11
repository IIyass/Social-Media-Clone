import React from 'react';
import {connect} from 'react-redux';
import {LoginProfil} from '../Action'
import {Field,reduxForm} from 'redux-form';
import {length,email} from 'redux-form-validators';
import history from '../history';


class LoginForm extends React.Component{

componentDidMount(){
if(this.props.auth.IsAuthenticate){
  history.push("/")
}};

UNSAFE_componentWillReceiveProps(NextProps){
      if(NextProps.auth.IsAuthenticate){
          this.props.history.push("/");
          }};

renderError({error,touched}){
if(error&&touched){
    return (
           <div className="ui error message">
           <div className="header">{error}</div>
           </div>
          );
}}

renderInput =({input,label,type,meta})=>{
 return (
    <div className="field">
    <label>{label}</label>
    <input  {...input} type={type} autoComplete="off" />
    
    {this.renderError(meta)}
    </div>
    );
 }

onsubmit=(formValues)=>{
    this.props.LoginProfil(formValues);
}




render(){
return(
    <form
      className="ui form error" 
      onSubmit={this.props.handleSubmit(this.onsubmit)}
       >
    <Field 
     validate={email()} 
     type="email"  
     name='Email'
     component={this.renderInput}  
     label="Entre Your E-mail" 
     />
    
    <Field 
         validate={length({min:6,max:20})} 
         type="password"   
         name='Password'   
         component={this.renderInput}  
         label="Entre Your Password" />
   
    <button className="ui button" >Submit</button>
   
    </form>
);
}};



 const mapStateToProps=(state)=>{
    return { auth:state.Auth }
    }


const FormWrapped=reduxForm({
     form:'LoginForm'
  })(LoginForm);

export default connect(mapStateToProps,{LoginProfil})(FormWrapped);
