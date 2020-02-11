import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {LogOutProfil} from '../Action';




class Header extends React.Component{


  LogOut =()=>{
    this.props.LogOutProfil();
    };


RenderMethode(){
        
      if(this.props.IsAuthenticate===true) {
          return(
              <div class="ui secondary pointing menu">
                    <a class="item active">
                       <Link to ="/">Home</Link>
                    </a>
                    <div class="right menu">
                        <a class="item active">
                              <Link   to ={`/Profil/${this.props.user._id}`}>Profil</Link>
                        </a> 
                      <a onClick={this.LogOut}  class="ui item">
                            <i class="user icon"></i>
                      Logout
                      </a>
                    </div>
              </div>
);  
          }else {
            return(
              <div class="ui secondary pointing menu">
                             <a class="active item">
                                 <Link to='/' className='item'>
                                             Home
                                 </Link>
                             </a>
                             <a class="item">
                                <Link to='/Register' className='item'>
                                            Register
                                </Link>
                             </a>
                             <a class="item">
                                <Link to='/Login' className='item'>
                                            Login
                                </Link>
                              </a>
              </div>
);
}};


render(){
  return <div>{this.RenderMethode()}</div>;
}

}

const mapStateToProps=(state)=>{
  return { IsAuthenticate:state.Auth.IsAuthenticate,
  user:state.Auth.CurrentUser }
  }
export default connect(
      mapStateToProps,
      {LogOutProfil}
      ) (Header); 


