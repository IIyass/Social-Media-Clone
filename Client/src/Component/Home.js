import React from 'react';
import PostList from './Posts/PostList';
import {connect} from 'react-redux';
import history from './history';

class Home extends React.Component{
componentDidMount(){

if (!this.props.IsAuthenticate) {
    history.push("/login")
}}

render(){
return <PostList/>
}
}





const mapStateToProps=(state)=>{
    return { IsAuthenticate:state.Auth.IsAuthenticate }
    }

export default connect(
        mapStateToProps,
) (Home); 








