import React from 'react';
import {connect} from 'react-redux';
import {GetUserPosts,GetUserProfil,FolloweUser,UnFolloweUser,RefreshProfil,actionimage,ProfilPicture} from '../Action'
import Post from '../Posts/Post';
import DisplayPicture from '../DisplayPicture';
import {getProfilePictureUrl} from '../firebase/importfirebase'




class Profil extends React.Component{


constructor(props){
    

    super(props);
    this.state = {
        image: null,
        url:"",
       };
   this.HandleFollowers= this.HandleFollowers.bind(this);
   this.HandleUnFollowers=this.HandleUnFollowers.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleupload=this.handleupload.bind(this);  
}


handleChange =e=>{
  if (e.target.files[0]) {
      const image=e.target.files[0];
      this.setState(()=>({image}))
  }
};


componentDidMount(){
    this.props.GetUserPosts(this.props.match.params.UserId);
    this.props.GetUserProfil(this.props.match.params.UserId);
    // this.props.ProfilPicture(this.props.match.params.UserId);
};


componentDidUpdate(prevProps){
  if(this.props.Auth){
        if (prevProps.user && prevProps.user.following !== this.props.user.following) {
               this.props.RefreshProfil(this.props.match.params.UserId)
  }
}
};



HandleFollowers=()=>{
this.props. FolloweUser(this.props.match.params.UserId)
};

HandleUnFollowers=()=>{
    this.props.UnFolloweUser(this.props.match.params.UserId)
};

handleupload =()=>{
    this.props.actionimage(this.state.image,this.props.match.params.UserId);   
};


    render(){

        let items;
        items = this.props.list.map(post=>{
            if(post.user.id===this.props.match.params.UserId){
                  return <Post   key={post._id}  el={post} />
            }
        });
        items =  items.filter(item => (item!=undefined));
       
        
        let FollowBtn;

          if (this.props.Auth) {

              if (this.props.user.following.indexOf(this.props.match.params.UserId) === -1) {
                 FollowBtn=( 
                     <div className="Followers" >
                        <button onClick={this.HandleFollowers} class="ui right floated button">
                          <i class="user icon"></i>
                                               Follow
                       </button>
                       </div>
                       );
             }else{

                 FollowBtn= (
                   <div  className="Followers">
                         <button class="ui disabled button">
                             <i class="user icon"></i>
                                     followed
                         </button>


                         <button
                         onClick={this.HandleUnFollowers} 
                         class="ui right floated button">
                                     Unfollow
                        </button>

                   </div>
                        );
}
}
    

    var  profilePictureUrl=  getProfilePictureUrl(this.props.match.params.UserId, (url) => {
       console.log(url); // The console.log(url) returns a valid and working url for the image. So I know my imports are correct
        this.setState({url:url});
     });



     let ImageSetting;

     if(this.props.Auth && (this.props.user._id==this.props.match.params.UserId) ){
  
      ImageSetting=(
          
        <div className="ui container" >
             <input
            
               className="ui inverted red basic button"
                type="file" 
                 onChange={this.handleChange} />
  
             <button 
           
              className="ui inverted secondary button" 
               onClick={this.handleupload}>
                   upload
             </button> 
        </div>
      );
     }



    let profilInfo;

          if (this.props.profil && items ) {
                  profilInfo= (
                    <div className="ui container">
                           <div className="Info">
                               <h1> 
                                    {this.props.profil.firstname} 
                                    {this.props.profil.lastname} 
                               </h1>
                                {FollowBtn}

                                   <div class="blue ui buttons"            >
                                           <button class="ui button"> {items.length} Posts</button>
                                           <button class="ui button"> {this.props.profil.followers.length} followers</button>
                                           <button class="ui button"> {this.props.profil.following.length} following</button> 
                                  </div>
                           </div>
                       <div>
                               <br/>
                          <DisplayPicture url={this.state.url}/>  
                       </div> 
                    </div>
);
}

return(
    <div className="ui container">     
                {profilInfo}
                {ImageSetting}
                {items}     
      </div>
);
}}

const  mapStateToProps=(state)=>{
    
    return ({
              list:state.PostReducer.List,
              profil:state.Profil.profil,
              Auth:state.Auth.IsAuthenticate,
              user:state.Auth.CurrentUser,
              loading:state.PostReducer.loading,
              Image:state.Image.url
    }); 
    }

export default connect(mapStateToProps,
{GetUserPosts,GetUserProfil,UnFolloweUser,FolloweUser,RefreshProfil,actionimage,ProfilPicture}
 )(Profil);
