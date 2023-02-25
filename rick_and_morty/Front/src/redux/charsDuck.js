import axios from 'axios';
import { updateDB,getFavs } from '../firebase.js';
import ApolloClient, { gql } from 'apollo-boost';

//constants
let initialState = {
  array: [],
  loadingChars: true,
  errorChars: "",
  favorites: [],
  loadingFavs: true,
  errorFavs: "",
  nextPage: 1
}

let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_FAILURE = "GET_CHARACTERS_FAILURE";

let REMOVE_CHARACTER = "REMOVE_CHARACTER";

let ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

let GET_FAVORITES_DB = "GET_FAVORITES_DB";
let GET_FAVORITES_DB_SUCCESS = "GET_FAVORITES_DB_SUCCESS";
let GET_FAVORITES_DB_FAILURE = "GET_FAVORITES_DB_FAILURE";

let GET_FAVORITES = "GET_FAVORITES";

let UPDATE_PAGE = "UPDATE_PAGE";

let URL = "https://rickandmortyapi.com/api/character"

let client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
})

let query = gql`
  query ($page:Int){
    characters(page:$page){
      info{
        count
        pages
        next
        prev
      }
      results{
        name
        image
        id
      }
    }
  }
`
//reducer
const reducer = (state = initialState, action) => {
  switch(action.type){
    case GET_CHARACTERS:
      return {
        ...state,
        loadingChars:false
      }
    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        array: action.payload,
        loadingChars: true
      }
    case GET_CHARACTERS_FAILURE:
      return {
        ...state,
        errorChars: action.payload,
        loadingChars:true
      }
    case REMOVE_CHARACTER:
      return {
        ...state,
        array: action.payload
      }
    case ADD_TO_FAVORITES:
      return {
        ...state,
        ...action.payload
      }
    case GET_FAVORITES_DB:
      return {
        ...state,
        loadingFavs: false
      }
    case GET_FAVORITES_DB_SUCCESS:
    return {
      ...state,
      loadingFavs: true,
      favorites: action.payload
    }
    case GET_FAVORITES_DB_FAILURE:
      return {
        ...state,
        loadingFavs: true,
        errorFavs: action.payload
      }
    case UPDATE_PAGE:
      return {
        ...state,
        nextPage: action.payload
      }
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      }
    default:
      return state;
  }
}
//actionsCreator
export const getCharacters = () => {
    return async (dispatch,getState) => {
      dispatch({
        type:GET_CHARACTERS
      })
      await axios.get(URL)
      .then(res => {
        dispatch({
          type: GET_CHARACTERS_SUCCESS,
          payload: res.data.results
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: GET_CHARACTERS_FAILURE,
          payload: err.message
        })
      })
    }
}

export const getCharactersGraphQL = () => {
    return async (dispatch,getState) => {
      dispatch({
        type:GET_CHARACTERS
      })
      let { nextPage } = getState().characters
      await client.query({
        query,
        variables:{
          page: nextPage
        }
      })
      .then(res => {
        dispatch({
          type: GET_CHARACTERS_SUCCESS,
          payload: res.data.characters.results
        })
        dispatch({
          type: UPDATE_PAGE,
          payload: res.data.characters.info.next ? res.data.characters.info.next : 1
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: GET_CHARACTERS_FAILURE,
          payload: err.message
        })
      })
    }
}

export const removeCharacter = () => {
  return (dispatch,getState) => {
    //getState te trae todo el store del combineReducers
    let { array } = getState().characters;
    array.shift()
    if(!array.length){
      getCharactersGraphQL()(dispatch,getState)
      return
    }
    dispatch({
      type: REMOVE_CHARACTER,
      payload: [...array]
    })
  }
}

export const addToFavorites = () => {

  return (dispatch,getState) => {
    let { array,favorites } = getState().characters
    let char = array.shift()
    // for(let i = 0; i < favorites.length; i++){
    //   if(char.name !== favorites[i].name){
        favorites.push(char)
        let { id } = getState().user
        updateDB(favorites,id)
        localStorage.setItem('user',JSON.stringify(getState()))
        dispatch({
          type: ADD_TO_FAVORITES,
          payload: { array: [...array], favorites: [...favorites]}
        })
    //   }
    // }
  }
}
//auxiliar
export const saveStorage = (storage) => {
  localStorage.setItem('user',JSON.stringify(storage))
}

export const retrieveFavs = () => {
  return (dispatch,getState) => {
      dispatch({
        type: GET_FAVORITES_DB
      })
      let { id } = getState().user
      getFavs(id)
      .then(array => {
        dispatch({
          type: GET_FAVORITES_DB_SUCCESS,
          payload: [...array]
        })

        saveStorage(getState())
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: GET_FAVORITES_DB_FAILURE,
          payload: err.message
        })
      })
  }
}

export const changeFavsRedux = (favs) => {
  return (dispatch,getState) => {
    dispatch({
      type: GET_FAVORITES,
      payload: favs
    })
    saveStorage(getState())
  }
}

export const reloadFavs = () => {
  return (dispatch,getState) => {
    let storage = JSON.parse(localStorage.getItem('user'))
    console.log(storage)
    if(storage && storage.characters){
      return dispatch({
          type: GET_FAVORITES_DB_SUCCESS,
          payload: storage.characters.favorites
        })
    }
  }
}

export default reducer;
