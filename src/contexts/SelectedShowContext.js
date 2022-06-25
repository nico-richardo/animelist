import { createContext, useContext, useReducer } from "react";

const SelectedShowContext = createContext();


let initialItems = {};

// Actions
export const ADD_SELECTED_SHOW = "ADD_SELECTED_SHOW";
export const REMOVE_SELECTED_SHOW = "REMOVE_SELECTED_SHOW";
export const CLEAR_ALL = "CLEAR_ALL";

// Action creators
export function addSelectedShow(text) {
    return { type: ADD_SELECTED_SHOW, text };
  }
  
  export function removeSelectedShow(index) {
    return { type: REMOVE_SELECTED_SHOW, index };
  }
  
  export function clearAll() {
    return { type: CLEAR_ALL };
  }
  
  // Reducer
  export function selectedshowReducer(state, action) {
    switch (action.type) {
      case ADD_SELECTED_SHOW:
        //TODO:add error and checking
        return {...state, [action.text]: []};
      case REMOVE_SELECTED_SHOW:
        const copy = {...state};
        delete copy[action.text];
        return copy;
      case CLEAR_ALL:
        return {};
      default:
        return state;
    }
  }
  

function SelectedShowProvider(props) {
    const [items, dispatch] = useReducer(selectedshowReducer, initialItems);
  
    const selectedshowData = { items, dispatch };

    return <SelectedShowContext.Provider value={selectedshowData} {...props} />;
}

function useSelectedShowContext() {
    return useContext(SelectedShowContext);
}


export { SelectedShowProvider, useSelectedShowContext };