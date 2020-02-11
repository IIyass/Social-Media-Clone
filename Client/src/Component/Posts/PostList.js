import React from 'react';
import {GetPost} from '../Action';
import AddPost from './AddPost';
import {connect} from 'react-redux';
import Post from './Post';
import _ from 'lodash'
  

class PostList extends React.Component{

componentDidMount(){
    this.props.GetPost();
}

render(){

    const items= this.props.list.map(post=>{
                    return <Post  id={post._id} key={post._id}  el={post}/> 
     });

    const item= items.filter(result =>(this.props.user.following.indexOf(result.props.el.user.id)) !=-1)


if(this.props.loading){
    return ( 
        <>
    <AddPost/>
    Loading
        </>
);
}
return(   
   <div> 
      <AddPost/>
      {item}  
   </div>
);
}
}


const  mapStateToProps=(state)=>{
    
    return ({
       list:state.PostReducer.List,
       loading:state.PostReducer.loading,
       user:state.Auth.CurrentUser
    }); 
    }


export default connect(mapStateToProps,
{GetPost}
)(PostList);
