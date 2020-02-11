const INIT_STATE ={
    IsAuthenticate :false,
   CurrentUser:null,

}

export default (state=INIT_STATE,action)=>{

    switch(action.type){
         case 'SET_CURRENT_USER': 
                           return {
                            ...state,
                            // IsAuthenticate: Object.keys(action.payload).length !== 0,
                            IsAuthenticate: typeof Object.keys(action.payload) !== 'undefined' && Object.keys(action.payload).length > 0,
                            CurrentUser:action.payload 
                                 }
        case 'SIGN_OUT':
                    return{
                        ...state,IsAuthenticate:false,CurrentUser:null
                          }
        case 'GET_FOLLOWERS':
                    return{
                          ...state,
                                    CurrentUser:{
                                     ...state.CurrentUser,
                                     following:[...state.CurrentUser.following,action.payload]
                                    }
                         }

        case 'GET_UNFOLLOWERS':
            return{
                ...state,
             CurrentUser:{
                 ...state.CurrentUser,
                 following: state.CurrentUser.following.filter(item=> item !== action.payload)
                         }
                  }
            
        // case 'GET_ERRORS':
        //     return{
        //         ...state,IsAuthenticate:false,CurrentUser:null,Errors:action.payload
        //         }
            
         default:
             return state;                       
    }};