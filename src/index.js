import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './store/reducers';
import {createFirestoreInstance, reduxFirestore, getFirestore} from 'redux-firestore';
import {   ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import fbConfig from './apis/fbConfig';
import firebase from 'firebase/app'

import './index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, 
  composeEnhancers(
    applyMiddleware(reduxThunk.withExtraArgument({ getFirebase, getFirestore }) ),
    reduxFirestore(fbConfig),
    ),
    )

  const rrfProps = {
      firebase,
      config: fbConfig,
      dispatch: store.dispatch,
      createFirestoreInstance
  }
ReactDOM.render(
  
  <Provider store ={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
