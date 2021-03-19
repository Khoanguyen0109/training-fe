export const SET_USER_DATA = "SET_USER_DATA";
export const REMOVE_USER_DATA = "REMOVE_USER_DATA";

export const LOGIN = 'LOGIN'
export const LOGIN_FAILED='LOGIN_FAILED'


export const loginFailed =(payload) =>{
   return {
    type:LOGIN_FAILED,
    payload
   } 
}

export const loginSuccess =(payload) =>{
    return {
     type:SET_USER_DATA,
     payload
    } 
 }