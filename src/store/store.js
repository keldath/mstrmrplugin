

import { createStore} from 'redux';

import rootReducer from './reducers';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 //const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
              //            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) /*|| compose*/;
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//const store  = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace: true, traceLimit: 25}));


const actionSanitizer = (action) => (
    action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
    { ...action, data: '<<LONG_BLOB>>' } : action
  );
  const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    actionSanitizer,
    serialize: true,
    stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
  }));

export default store;

console.log(store.getState())