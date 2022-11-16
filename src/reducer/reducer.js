export const initialState = {
    userIDs: [],
};
export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_USER":
            state.userIDs.some(item => item !== action.payload)
            return (state = {
                ...state,
                userIDs: [...state.userIDs, action.payload],
            });
        // console.log(action.payload)
        case "DELETE_USER":
            return (
                state = {
                    ...state,
                    userIDs: state.userIDs.filter(item => item !== action.payload)
                }
            )
        case "CLEAR":
            return (
                state = {
                    ...state,
                    userIDs: []
                }
            )
        default:
            return state;
    }
};
