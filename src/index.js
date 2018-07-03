import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import { takeEvery, put, call} from 'redux-saga/effects';

function* rootSaga(){
      yield takeEvery('FETCH_ELEMENTS',fetchElements);
    //   yield takeEvery('SET_ELEMENTS', firstSaga);
      yield takeEvery('ADD_ELEMENTS', postElement);
    }

const sagaMiddleware = createSagaMiddleware();

function* firstSaga(action){
console.log('in my first Saga');

}

function* fetchElements(action){
    console.log('in my first Saga');
    
        try{
            const elementsResponse = yield call(axios.get, '/api/element');
                yield put( {type:'SET_ELEMENTS', payload: elementsResponse.data });
        } catch (error) {
            console.log('bad things in the try')
        }

    }
// const firstReducer = (state = 0, action) => {
//     if (action.type === 'BUTTON_ONE') {
//         console.log('firstReducer state', state);
//         console.log('Button 1 was clicked!');
//         return state + 1;
//     }
//     return state;
// };

// const secondReducer = (state = 100, action) => {
//     if (action.type === 'BUTTON_TWO') {
//         console.log('secondReducer state', state);
//         console.log('Button 2 was clicked!');
//         return state - 1;
//     }
//     return state;
// };

function* postElement(action) {
    try{
        yield call(axios.post, '/api/element', action.payload);
        yield put( {type: 'FETCH_ELEMENTS' } );

    } catch (error){
        console.log('Bad things are a brewin in the postElement', error);
    }
}

const elementListReducer = (state = [], action) => {
    // if (action.type === 'ADD_ELEMENT') {
    //     console.log(`The element was ${action.payload}`);
    // }
    switch (action.type) {
        case 'SET_ELEMENTS':
        return action.payload;
        //refactoring this to a saga that does the POST
        // case 'ADD_ELEMENT':
        //     return [ ...state, action.payload ];
        default:
            return state;
    }
};

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
       
        elementListReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
