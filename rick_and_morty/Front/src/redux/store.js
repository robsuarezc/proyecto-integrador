import { createStore,combineReducers,compose,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer, { restoreSesion } from './userDuck.js';
// import charsReducer,{ getCharacters,reloadFavs,getCharactersGraphQL,loadStorage } from './charsDuck.js';
import charsReducer,{ reloadFavs,getCharactersGraphQL } from './charsDuck.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let rootReducer = combineReducers({
  user: userReducer,
  characters: charsReducer
})

const generateStore = () =>{
  let store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunk))
  )
  // getCharacters()(store.dispatch, store.getState)
  getCharactersGraphQL()(store.dispatch, store.getState)
  restoreSesion()(store.dispatch)
  reloadFavs()(store.dispatch, store.getState)
  return store
}

export default generateStore;
