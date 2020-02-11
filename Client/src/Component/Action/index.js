import axios from 'axios';
import setAuthHeader from '../utils/setAuthHeader'
import history from '../history';
import {storage} from '../firebase'
import {getProfilePictureUrl}  from '../firebase/importfirebase'


export const Profilcreated = Formvalue =>async( dispatch)=> {
  
 axios.post("http://localhost:5000/api/users/register",Formvalue)
  .then(Resuser=>{
    dispatch({
      type: "ADD_PROFIL",
      payload:Resuser.data

});
history.push('/')
});
}

export const LoginProfil = Formvalue =>dispatch=> {
   
  axios.post("http://localhost:5000/api/users/login",Formvalue)
  .then(res=>{
  const { token } = res.data
  localStorage.setItem('jwtToken', token)
  setAuthHeader(token)
  dispatch(GetCurrentUser())
} 
)};
    
export const GetCurrentUser = () => dispatch=> {
   
axios.get("http://localhost:5000/api/users")
.then(res=>dispatch(SetCurrentUser(res.data)))
};


export const SetCurrentUser = (data)=> {  
return{
        type: 'SET_CURRENT_USER',
        payload:data   
}};


export const LogOutProfil = () => dispatch=> {
   
     localStorage.removeItem('jwtToken')
     setAuthHeader()
      dispatch(signOut())
      history.push("/login");
};


export  const signOut =()=>{
  return{
      type:'SIGN_OUT'  
      };};
  

export const PostCreated = Formvalue =>dispatch=> { 
        
   axios.post("http://localhost:5000/api/posts/add",Formvalue)
  .then(res=>
   dispatch({
      type: 'ADD_POST',
      payload:res.data     
      })).catch(err=>console.log(err))
       };


export const GetPost = ()=> dispatch =>{

   axios.get("http://localhost:5000/api/posts")
   .then(res=>
     dispatch({
      type: 'GET_POSTS',
      payload:res.data
        })).catch(err=>console.log(err))
    };


export const RefreshProfil = (UserId) => dispatch =>{

  axios.get(`http://localhost:5000/api/users/${UserId}`)
  .then(res=>
    dispatch({
      type: 'GET_PROFIL',
      payload:res.data
  
})).catch(err=>console.log(err))
};


export const GetUserProfil = (UserId) => dispatch =>{

      axios.get(`http://localhost:5000/api/users/${UserId}`)
      .then(res=>
        dispatch({
          type: 'GET_PROFIL',
          payload:res.data
      
  })).catch(err=>console.log(err))
  };
    

export const GetUserPosts = (UserId) => dispatch =>{
 axios.get(`http://localhost:5000/api/posts/${UserId}`)
    .then(res=>
      dispatch({
        type: 'GET_PROFIL_POSTS',
        payload:res.data
    })).catch(err=>console.log(err))
};



export const FolloweUser = (UserId) => dispatch =>{
  axios.post("http://localhost:5000/api/users/follow",{UserId})
  .then(res=>
    dispatch({
      type: 'GET_FOLLOWERS',
      payload:res.data.UserId
  
})).catch(err=>console.log(err))
};



export const UnFolloweUser = (UserId) => dispatch =>{
  axios.post("http://localhost:5000/api/users/unfollow",{UserId})
  .then(res=>
    dispatch({
      type: 'GET_UNFOLLOWERS',
      payload:res.data.UserId
  
})).catch(err=>console.log(err))
};


export const SearchUser = (term)=> dispatch =>{

axios.post("http://localhost:5000/api/users/search", {term})
.then(res=>
  history.push(`/Profil/${res.data.UserId}`)
)
.catch(err=>history.push(`/search`))
}
  


export const likeAction = (UserId,postId)=> dispatch =>{
axios.post("http://localhost:5000/api/posts/like",{UserId,postId})
  .then(res=>
    dispatch({
      type: 'LIKES',
      payload:res.data.UserId
  }))
  .catch(err=>console.log(err))
  }


export const DisLikeAction = (UserId,postId)=> dispatch =>{
 axios.post("http://localhost:5000/api/posts/Dislike",{UserId,postId})
    .then(res=>
      dispatch({
        type: 'Dislike',
        payload:res.data.UserId
    }))
    .catch(err=>console.log(err))
    }



export const actionimage = (image,UserId) =>dispatch=>{

const UploadTask=storage.ref(`images/${UserId}`).put(image);
UploadTask.on('state_changed',
(snapshot)=>{
},
(error)=>{
    console.log(error)
},
()=>{

  storage.ref('images').child(UserId).getDownloadURL().then(url=>{
    storage.ref('images').child(UserId).getDownloadURL().then(url=>{
      dispatch({
        type: 'GET_IMAGEURL',
        payload:url
      })})

    })})}
    



export  const ProfilPicture=(uid)=>dispatch=> {

  getProfilePictureUrl(uid, (url) => {
   dispatch({
       type: 'GET_IMAGEURL',
        payload:url
        })
    })
  }
