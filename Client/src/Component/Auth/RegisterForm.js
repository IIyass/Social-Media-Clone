
import React from 'react';
import {connect} from 'react-redux';
import {Profilcreated} from '../Action'
import {Field,reduxForm} from 'redux-form';
import {length,email,required,confirmation} from 'redux-form-validators';



class RegisterForm extends React.Component{


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
    <input  {...input} type={type}   autoComplete="off" />
    {this.renderError(meta)}
    </div>
    );
  }


onsubmit=(formValues)=>{
    this.props.Profilcreated(formValues);
}


render(){


return(
<>
    <form 
     className="ui form error" 
     onSubmit={this.props.handleSubmit(this.onsubmit)}
      >
         <div className="Login-Register-Form">
    <Field 
     validate={email()} 
       type="email"  
         name='Email' 
         component={this.renderInput}  
          label="Enter Your E-mail"
           />
    <Field  
      validate={required()}
       name='firstname'
        component={this.renderInput}   
            label="Enter Your First-Name"
             />
    <Field 
      validate={required()} 
       name='lastname'
        component={this.renderInput}   
            label="Enter Your Last-Name" 
            />
    <Field   
       validate={length({min:6,max:20})} 
        type="password"  
         name='Password'  
           component={this.renderInput} 
             label="Enter Your Password"
              />
    <Field  
      name="confirmation" 
      type="password"
       label="Confirmation"
        component={this.renderInput} 
    validate={confirmation({ field: 'Password', fieldLabel: 'Entre Your Password' })} 
    />
    <button className="ui button" >Submit</button>
    </div>
    </form>

</>
);
}};


const FormWrapped=reduxForm({
     form:'RegisterForm',
  })(RegisterForm);

export default connect(null,{Profilcreated})(FormWrapped);


