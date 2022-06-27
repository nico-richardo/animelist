import { createContext, useContext, useReducer } from "react";
import { getCollection } from "./CollectionContext";

const SelectedShowContext = createContext();


let initialItems = JSON.parse(localStorage.getItem('currShow'));

if (!initialItems) {
  initialItems = {
    data: {},
    collections: {}
  };
}

// Actions
export const SET_SELECTED_SHOW = "SET_SELECTED_SHOW";
export const SET_COLLECTION_SELECTED_SHOW = "SET_COLLECTION_SELECTED_SHOW";

// Action creators
export function setSelectedShow(data) {
  return { type: SET_SELECTED_SHOW, ...data };
}

export function setCollectionSelectedShow(collections) {
  return { type: SET_COLLECTION_SELECTED_SHOW, collections };
}

// Reducer
export function selectedshowReducer(state, action) {
  switch (action.type) {
    case SET_SELECTED_SHOW:
      let currSelected =  {
        ...state,
        data: action.data,
        collections: getCollection(action.data.id, action.collections)
      };
      localStorage.setItem("currShow", JSON.stringify(currSelected));
      return currSelected;
    case SET_COLLECTION_SELECTED_SHOW:
      const currSelected2 =  {
        ...state,
        collections: getCollection(state.data.id, action.collections)
      };
      localStorage.setItem("currShow", JSON.stringify(currSelected2));
      return currSelected2;
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