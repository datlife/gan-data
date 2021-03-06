// Reducers ALl reducers have two arguments: states, actions Ref:
// https://hackernoon.com/redux-patterns-add-edit-remove-objects-in-an-array-6ee7
// 0cab2456

import * as types from '../constants';
import {combineReducers} from 'redux';

export default combineReducers({byId: byId, allIds: allIds})

function byId(state = {}, action) {
  switch (action.type) {
    case types.UPLOAD_IMAGE:
      {         
        return  action.new_images.reduce(function (state, image) {    
          const img_id = image.preview.split("/").pop();
          return {
            ...state,
            [img_id]: {
              ...state[img_id],
              id: img_id,
              file: image,
              original: image.preview,
              generated: image.preview,
              debug: null,
              isDebugging: false
            }
          };
        }, state);
      }

    case types.DELETE_IMAGE:{
        let {[action.id]: any, ...new_state} = state;
        return new_state;
      }

    case 'TOGGLE_DEBUG':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          debug: action.mask,
          isDebugging: action.debug
        }
      }
    default:
      return state
  }
}

function allIds(state = [], action) {

  switch (action.type) {
    case types.UPLOAD_IMAGE:
      {
        let new_images = action.new_images;        
        return new_images.reduce(function (state, image) {
          const img_id = image.preview.split("/").pop(); // get the last element of array
          return [
            ...state,
            img_id
          ]
        }, state);
      }
    case types.DELETE_IMAGE:
    {
      return state.filter(id => id !== action.id);
    }

    default:
      return state
  }
}
