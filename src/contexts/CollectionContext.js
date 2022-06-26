import { createContext, useContext, useReducer } from "react";

const CollectionContext = createContext();


let initialItems = JSON.parse(localStorage.getItem('collections'));

if (!initialItems) {
    initialItems = {}
}

// Actions
export const ADD_COLLECTION = "ADD_COLLECTION";
export const REMOVE_COLLECTION = "REMOVE_COLLECTION";
export const ADD_SHOW_COLLECTION = "ADD_SHOW_COLLECTION";
export const CLEAR_ALL = "CLEAR_ALL";

// Action creators
export function addCollection(text) {
    return { type: ADD_COLLECTION, text };
}

export function removeCollection(label) {
    return { type: REMOVE_COLLECTION, label };
}

export function addShowCollection(data) {
    return { type: ADD_SHOW_COLLECTION, ...data };
}

export function clearAll() {
    return { type: CLEAR_ALL };
}

// Reducer
export function collectionReducer(state, action) {
    let copy = { ...state };
    switch (action.type) {
        case ADD_COLLECTION:
            let newItem = { ...state, [action.text]: [] };
            localStorage.setItem("collections", JSON.stringify(newItem));
            return newItem;
        case REMOVE_COLLECTION:
            delete copy[action.label];
            localStorage.setItem("collections", JSON.stringify(copy));
            return copy;
        case ADD_SHOW_COLLECTION:
            let arrKeys = action.arrNewCollection;
            arrKeys.forEach((key) => {
                copy[key] = copy[key] ? [...copy[key]] : [];
                copy[key].push(action.data);
            });
            return copy;
        case CLEAR_ALL:
            return {};
        default:
            return state;
    }
}


function CollectionProvider(props) {
    const [items, dispatch] = useReducer(collectionReducer, initialItems);

    const collectionData = { items, dispatch };

    return <CollectionContext.Provider value={collectionData} {...props} />;
}

function useCollectionContext() {
    return useContext(CollectionContext);
}


export function getCollection(showsId, collections, isObject = true) {
    let collectionByShow = {};
    if (!isObject) {
        collectionByShow = []
    }
    Object.keys(collections).forEach(function (collection) {
        const currCollection = collections[collection];
        const arrShowId = currCollection.reduce(function (newArr, show) {
            newArr.push(show.id);
            return newArr;
        }, []);

        if (arrShowId.includes(showsId)) {
            if (isObject) {
                collectionByShow[collection] = currCollection
            }
            else {
                collectionByShow.push(collection);
            }
        }
    });

    return collectionByShow
}

export { CollectionProvider, useCollectionContext };