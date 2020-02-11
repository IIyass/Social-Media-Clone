import {combineReducers} from 'redux';
import {reducer} from 'redux-form';
import ImageReducer from './ImageReducer'
import AuthReducers from './AuthReducers';
import PostReducers from './PostReducers';
import ProfilReducer from './ProfilReducer';


export default combineReducers({
   
    form: reducer,
    Auth:AuthReducers,
    PostReducer :PostReducers,
    Profil:ProfilReducer,
    Image:ImageReducer
 
});