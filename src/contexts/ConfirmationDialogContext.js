import { createContext, useContext, useReducer } from "react";

const ConfirmationDialogContext = createContext();


let initialConfirmationDialog = {
    show: false,
    data: undefined,
    title: 'DELETE',
    description: 'Are you sure to delete this collection?',
    callback: () => { }
};

// Actions
export const SHOW_CONFIRMATION_DIALOG = "SHOW_CONFIRMATION_DIALOG";
export const HIDE_CONFIRMATION_DIALOG = "HIDE_CONFIRMATION_DIALOG";

// Action creators
export function showConfirmationDialog(data) {
    return { type: SHOW_CONFIRMATION_DIALOG, ...data};
}

export function hideConfirmationDialog() {
    return { type: HIDE_CONFIRMATION_DIALOG };
}

// Reducer
export function confirmationDialogReducer(state, action) {
    switch (action.type) {
        case SHOW_CONFIRMATION_DIALOG:
            console.log('show confirm',action)
            return {
                data: action.data,
                title: action.title, 
                description: action.description,
                callback: action.callback, 
                show: true
            };
        case HIDE_CONFIRMATION_DIALOG:
            return {...state, show: false};
        default:
            return state;
    }
}


function ConfirmationDialogProvider(props) {
    const [items, dispatch] = useReducer(confirmationDialogReducer, initialConfirmationDialog);

    const confirmationDialogData = { items, dispatch };

    return <ConfirmationDialogContext.Provider value={confirmationDialogData} {...props} />;
}

function useConfirmationDialogContext() {
    return useContext(ConfirmationDialogContext);
}


export { ConfirmationDialogProvider, useConfirmationDialogContext };