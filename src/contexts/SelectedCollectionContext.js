import { createContext, useContext, useReducer } from "react";

const SelectedCollectionContext = createContext();


let initialItems = JSON.parse(localStorage.getItem('currCollection'));

if (!initialItems) {
  initialItems = {
    label: '',
    data: ''
  };
}

// Actions
export const SET_SELECTED_COLLECTION = "SET_SELECTED_COLLECTION";

// Action creators
export function setSelectedCollection(data) {
  return { type: SET_SELECTED_COLLECTION, ...data };
}

// Reducer
export function selectedCollectionReducer(state, action) {
  switch (action.type) {
    case SET_SELECTED_COLLECTION:
        let currData = {
            label : action.label,
            data: action.data
        }
      localStorage.setItem("currCollection", JSON.stringify(currData));
      return currData;
    default:
      return state;
  }
}


function SelectedCollectionProvider(props) {
  const [items, dispatch] = useReducer(selectedCollectionReducer, initialItems);

  const selectedCollectionData = { items, dispatch };

  return <SelectedCollectionContext.Provider value={selectedCollectionData} {...props} />;
}

function useSelectedCollectionContext() {
  return useContext(SelectedCollectionContext);
}


export { SelectedCollectionProvider, useSelectedCollectionContext };