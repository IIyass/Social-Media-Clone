const Initialize={
    url:""
}


export default (state=Initialize,action)=>{

    switch(action.type){
         case 'GET_IMAGEURL': 
                           return {
                                   ...state,
                                   url:[...state.url,action.payload]
                                 }
                           
         default:
            return state; 
}}
