export const unreadMessageReducer = (state, action) => {
    switch(action.type) {
        case "increment": {
            return {
                ...state,
                count: state.count + 1
            }
        }
        case "reset": {
            return {
                ...state,
                count: 0
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}