const Initialize={
    profil: null,
    loading:false,
 
}


export default (state={},action)=>{

    switch(action.type){
         case 'GET_PROFIL': 
                           return {...state,
                            profil:action.payload,
                            loading:false
                          }
         default:
             return state;                       
    }};