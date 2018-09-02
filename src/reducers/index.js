import { combineReducers } from 'redux';
import mealsReducer from './meals';

export default combineReducers({
    meals: mealsReducer
});