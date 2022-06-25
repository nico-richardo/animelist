import { createContext, useContext, useReducer } from "react";

const CollectionContext = createContext();


let initialItems = JSON.parse(localStorage.getItem('collection'));

if (!initialItems) {
    initialItems = {
        "yrs": [{
            bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/11061-8WkkTZ6duKpq.jpg'
        }, {
            bannerImage: ''
        }],
        "bb": [{

            bannerImage: ''
        }, {
            bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/11061-8WkkTZ6duKpq.jpg'
        }],
        "cc": []
    }
}

// Actions
export const ADD_COLLECTION = "ADD_COLLECTION";
export const REMOVE_COLLECTION = "REMOVE_COLLECTION";
export const CLEAR_ALL = "CLEAR_ALL";

// Action creators
export function addCollection(text) {
    return { type: ADD_COLLECTION, text };
}

export function removeCollection(label) {
    return { type: REMOVE_COLLECTION, label };
}

export function clearAll() {
    return { type: CLEAR_ALL };
}

// Reducer
export function collectionReducer(state, action) {
    switch (action.type) {
        case ADD_COLLECTION:
            let newItem = { ...state, [action.text]: [] };
            localStorage.setItem("collection", JSON.stringify(newItem));
            return newItem;
        case REMOVE_COLLECTION:
            const copy = { ...state };
            delete copy[action.label];
            localStorage.setItem("collection", JSON.stringify(copy));
            console.log('delete',copy)
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


export { CollectionProvider, useCollectionContext };