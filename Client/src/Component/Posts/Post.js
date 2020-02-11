import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {likeAction,DisLikeAction,GetPost} from '../Action'
import {getProfilePictureUrl} from '../firebase/importfirebase'

class Post extends React.Component{
constructor(props){
  super(props)
this.state={
  url:"",
  postId:""
}}


componentDidMount(){
  this.props.GetPost();
}



// HandleDislike=()=>{
 
// this.props.DisLikeAction(this.props.user.CurrentUser._id,this.state.postId)

// }

// HandleLikes=()=>{
 
// this.props.likeAction(this.props.user.CurrentUser._id,this.state.postId)

// }
// getPostid(e){

//   const postId = e.target.getAttribute("id")
// this.setState({postId:postId})
 
// }



render(){

 

  // let LikeBtn;
  // if (this.props.user.IsAuthenticate) {
  //   this.props.list.map(post=>{
  //   // if (this.props.el.likes.indexOf(this.props.user.CurrentUser._id) === -1) {
  //     if (post.likes.indexOf(this.props.user.CurrentUser._id) === -1  ) {
        
  //  LikeBtn=(   
    
  //   <span  id={post.id} onClick={this.getPostid}>
  //    Like  
   
  //   <i onClick={this.HandleLikes}   id={post.id} className="heart outline icon"  > 
  //   {post.likes.length}
  //     </i>
    
    
  //   </span>
   
        
  //     )
   
  //  }else{
  //   LikeBtn= (
  //     <span  id={post.id} onClick={this.getPostid} >
  //     <i onClick={this.HandleDislike} className="heart icon"  > {post.likes.length} Dislike </i>
     
      
  //     </span>
      
  //   )}

        
  //   })}

  






  var  profilePictureUrl=  getProfilePictureUrl(this.props.el.user.id, (url) => {
    console.log(url); // The console.log(url) returns a valid and working url for the image. So I know my imports are correct
     this.setState({url:url});
  });



return(
 
    <div  className="ui container" style={{backgroundColor:"#F5DEB3",marginBottom:"20px",width:"70%",borderRadius:"5px"}}>
    <div className="ui comments">
    <div className="comment">
      <a className="avatar">
       <img style={{borderRadius:"10px"}} src={this.state.url}/>
      </a>
      <div className="content">
          <Link className="author" to ={`/Profil/${this.props.el.user.id}`} >{this.props.el.user.firstname}</Link>
        <div className="metadata">
          <div className="date" style={{color:"#800000" }}>{this.props.el.Date}</div>
        </div>
        <div className="text">
         
          <p>{this.props.el.text}</p>
        </div>
        <div className="actions">
 <span  class="ui left floated ">
 <i  className="heart icon"  >  </i>
 </span>
        </div>
      </div>
    </div>
    </div>
    </div>
   
    
    
);
}
}

const  mapStateToProps=(state)=>{
    
  return ({
           likes:state.PostReducer.likes,
           list:state.PostReducer.List,
           user:state.Auth

  });
  
  }
export default connect(mapStateToProps,

{likeAction,DisLikeAction,GetPost}

)(Post);
