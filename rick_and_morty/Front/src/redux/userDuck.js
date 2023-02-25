import { loginWithGoogle, signOutGoogle } from '../firebase.js';
import { retrieveFavs } from './charsDuck.js'

//constants
let initialState = {
  loggedIn: false,
  fetching: false,
}

let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_FAILURE = "LOGIN_FAILURE";

let LOGOUT = "LOGOUT"

//reducer
const reducer = (state = initialState, action) => {
  switch(action.type){
    case LOGIN:
      return {
        ...state,
        fetching: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        ...action.payload,
        loggedIn: true
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case LOGOUT:
      return {
        ...state
      }
    default:
      return state;
  }
}

//actionsCreator
export const doLoginGoogle = () => {
  return (dispatch,getState) => {
    dispatch({
      type: LOGIN,
    })
    loginWithGoogle()
    .then(async(user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          id: user.id,
          name: user.name,
          email: user.email,
          photo: user.photo
        }
      })
      await retrieveFavs()(dispatch, getState)
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.message
      })
    })
  }
}

export const restoreSesion = () => {
  return (dispatch) => {
    let storage = JSON.parse(localStorage.getItem('user'))
    if(storage && storage.user){
      dispatch({
        type: LOGIN_SUCCESS,
        payload: storage.user
      })
    }
  }
}

export const logOutSesion = () => {
  return (dispatch) => {
    signOutGoogle()
    dispatch({
      type: LOGOUT
    })
    localStorage.clear()
    window.location.reload()
  }
}

export default reducer;
