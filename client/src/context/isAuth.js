import React, {useReducer, createContext, useEffect} from 'react';
import axios from 'axios';
import { isAuthReducer } from './reducer/isAuthReducer';

export const IS_AUTH = createContext();

const IsAuth = (props) => {
    const isAuth = async() => {
        if(JSON.parse(localStorage.getItem('blogToken'))){
          try{
            const verify_is_auth = await axios.get('/dashboard/isVerify', {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}})
            if(verify_is_auth){
                is_auth_dispatch({type : 'IS_AUTH'})
            }else{
                is_auth_dispatch({type : 'NOT_AUTH'})
            }
          }catch(err){
            is_auth_dispatch({type : 'NOT_AUTH'})
          }
        }else{
            is_auth_dispatch({type : 'NOT_AUTH'})
        }
    }
    const [is_auth, is_auth_dispatch] = useReducer(isAuthReducer, false);
    useEffect(isAuth,[])
    useEffect(() => {
        console.log(is_auth);
    },[is_auth])
    
    return ( 
        <IS_AUTH.Provider value={{is_auth, is_auth_dispatch}}>
            {props.children}
        </IS_AUTH.Provider>
     );
}
 
export default IsAuth;