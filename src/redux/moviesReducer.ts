import { combineReducers } from 'redux';
import {
  SET_TITLE_FILTER,
  SET_YEAR_FILTER,
  SET_TYPE_FILTER,
} from './actions';

const initialState = {
  titleFilter: 'Pokemon',
  yearFilter: '',
  typeFilter: '',
};

const moviesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TITLE_FILTER:
      return {
        ...state,
        titleFilter: action.payload,
      };
    case SET_YEAR_FILTER:
      return {
        ...state,
        yearFilter: action.payload,
      };
    case SET_TYPE_FILTER:
      return {
        ...state,
        typeFilter: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
