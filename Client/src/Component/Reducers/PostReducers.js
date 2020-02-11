const Initialize={
    List: [],
    loading:false,
    likes:[]
}


export default (state= Initialize ,action)=>{

    switch(action.type){
         case 'ADD_POST': 
                           return {
                               ...state,
                               List:[action.payload,...state.List]
                           }          
         case 'GET_POSTS':
             return{
                 ...state,
                 loading:false,
                 List:action.payload
             }
         case 'LOADING_POSTS':
                 return{
                     ...state,
                     loading:true
                 }
         case 'GET_PROFIL_POSTS':
                          return{ 
                                 ...state,
                                List:action.payload,
                                 loading:false
                          }
//                  case 'LIKES':
// return{
//     ...state,
//     likes:[...state.likes,action.payload]
// }
// case 'Dislike':
//     return{
//     ...state,
//     likes:state.likes.filter(item=> item !== action.payload)
// }
         default:
             return state;                       
    }};